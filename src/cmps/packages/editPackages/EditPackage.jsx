import { packageService } from "@/services/package.service";
import { utilService } from "@/services/util.service";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { userService } from "@/services/user.service"
import { useAuth } from '@/context/AuthContext';
import { showToast } from '@/lib/reactToastify';

const EditPackage = () => {

    const { admin } = useAuth()

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const pathname = usePathname()
    const router = useRouter()
    const idFromPath = pathname.split('/').pop()
    // const currUser = userService.getloggedInUser().username


    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers();
            setUsers(users)
        } catch (err) {
            console.log("Had issues in users", err);
        }
    }

    useEffect(() => {
        if (!idFromPath) return;
        loadPackage();
    }, [users]);

    async function loadPackage() {
        try {
            const pack = await packageService.get(idFromPath);
            setPackageToEdit(pack);
            setSelectedUser(users.find(u => pack.receivingTenantId === u.id))
        } catch (err) {
            console.log("Had issues in package details", err);
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
    }

    const handleSelectChange = ({ target }) => {
        let { value, type, name: field } = target
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
    };

    const handleUserChange = (e) => {
        const selectedValue = e.target.value;

        const user = users.find(user =>
            selectedValue.includes(user.apartmentNumber) &&
            selectedValue.includes(user.firstName) &&
            selectedValue.includes(user.lastName)
        );

        setSelectedUser(user || null);
    };

    async function onSavePackage(ev) {
        ev.preventDefault()
        if (!selectedUser.id) return
        try {
            packageToEdit.dateReceived = Date.now(),
                packageToEdit.lobbyPackReceivedBy = admin.username
            packageToEdit.fullPackageDescription = utilService.getFullPackageDescription(packageToEdit.amount, packageToEdit.type, packageToEdit.color, packageToEdit.size)
            packageToEdit.isCollected = false
            packageToEdit.receivingTenantApt = selectedUser.apartmentNumber
            packageToEdit.receivingTenantFname = selectedUser.firstName
            packageToEdit.receivingTenantLname = selectedUser.lastName
            packageToEdit.receivingTenantId = selectedUser.id
            packageToEdit.receivingTenantFullTenantDesc = selectedUser.apartmentNumber + ' - ' + selectedUser.firstName + ' ' + selectedUser.lastName
            await packageService.save(packageToEdit)
            await showToast('success', 'פעולה בוצעה בהצלחה')
            router.push('/packages')
        } catch (err) {
            console.error(err)
            await showToast('error', 'פעולה נכשלה')

        }
    }

    function closeForm() {
        router.push('/packages')
    }

    if (!packageToEdit && !users) return console.log('no package to edit')
    else return (
        <section className='edit_class__section'>
            <form className='edit_class__form' onSubmit={onSavePackage}>
                <div className='edit_class__form_container'>
                    <label htmlFor="name">דירה</label>
                    <input list="tenants"
                        id="name"
                        name="receivingTenantFullTenantDesc"
                        value={packageToEdit.receivingTenantFullTenantDesc}
                        onChange={handleUserChange} />
                    <datalist id="tenants">
                        {
                            users.map(user => <option key={user.id} value={user.apartmentNumber + ' - ' + user.firstName + ' ' + user.lastName}></option>)
                        }
                    </datalist>
                </div>
                <div className="edit_class__form_to_row">

                    <div className='edit_class__form_container'>
                        <label htmlFor="amount">כמות</label>
                        <select id="amount" name="amount" value={packageToEdit.amount} required onChange={handleSelectChange} >
                            <option value="" hidden>כמות </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="name"> סוג</label>
                        <select id="type" name="type" value={packageToEdit.type} required onChange={handleSelectChange} >
                            <option value="" hidden> סוג</option>
                            <option value="חבילה">חבילה</option>
                            <option value="שקית">שקית</option>
                            <option value="קרטון">קרטון</option>
                            <option value="אחר">אחר</option>
                        </select>
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="name"> גודל</label>
                        <select id="size" name="size" value={packageToEdit.size} required onChange={handleSelectChange} >
                            <option value="" hidden> גודל</option>
                            <option value="קטן">קטן</option>
                            <option value="בינוני">בינוני</option>
                            <option value="גדול">גדול</option>
                            <option value="ענק">ענק</option>
                        </select>
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="color"> צבע</label>
                        <select id="color" name="color" value={packageToEdit.color} onChange={handleSelectChange} required>
                            <option value="" hidden> צבע</option>
                            <option value="אדום">🔴 אדום</option>
                            <option value="כחול">🔵 כחול</option>
                            <option value="ירוק">🟢 ירוק</option>
                            <option value="צהוב">🟡 צהוב</option>
                            <option value="כתום">🟠 כתום</option>
                            <option value="סגול">🟣 סגול</option>
                            <option value="חום">🟤 חום</option>
                            <option value="שחור">⚫ שחור</option>
                            <option value="לבן">⚪ לבן</option>
                            <option value="מנומר">🐯 מנומר</option>
                        </select>
                    </div>
                </div>
                <div className='edit_class__form_container'>
                    <label htmlFor="name">הערות</label>
                    <input type="textarea"
                        name="notesOnArrival"
                        id="notes"
                        placeholder="הערות"
                        value={packageToEdit.notesOnArrival}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex-row">
                    <button>{packageToEdit._id ? "שמור" : "הוסף"}</button>
                    <button type='button' onClick={() => closeForm()}>סגור</button>
                </div>
            </form>
        </section >

    )
}

export default EditPackage