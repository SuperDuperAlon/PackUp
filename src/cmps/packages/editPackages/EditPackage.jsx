import { packageService } from "@/services/package.service";
import { utilService } from "@/services/util.service";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { userService } from "@/services/user.service"
import { useAuth } from '@/context/AuthContext';
import { showToast } from '@/lib/reactToastify';
import FormToValidate from "../../general/FormValidation/FormToValidate";

const EditPackage = () => {

    const { admin } = useAuth()

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const [filterBy, setFilterBy] = useState(userService.getDefaultFilter())
    const pathname = usePathname()
    const router = useRouter()
    const idFromPath = pathname.split('/').pop()

    useEffect(() => {
        loadUsers()
    }, [filterBy])

    async function loadUsers() {
        try {
            const users = await userService.getUsers(filterBy);
            setUsers(users)
        } catch (err) {
            console.log("Had issues in users", err);
        }
    }

    console.log(users);


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

    console.log(filterBy);


    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, text: value }))
        setSelectedUser(users.find(u =>
            `${u.apartmentNumber} - ${u.firstName} ${u.lastName}` === value));
    }

    const handleSelectChange = ({ target }) => {
        let { value, type, name: field } = target
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
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
            packageToEdit.receivingTenantFullTenantDesc = selectedUser.fullUserDescription
            await packageService.save(packageToEdit)
            await showToast('success', 'פעולה בוצעה בהצלחה')
            router.push('/packages')
        } catch (err) {
            console.error(err)
            await showToast('error', 'פעולה נכשלה')

        }
    }

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeForm();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    function closeForm() {
        router.push('/packages')
    }

    if (!packageToEdit && !users) return console.log('no package to edit')
    else return (
        <section className='edit_class__section'>
            <form className='edit_class__form' onSubmit={onSavePackage}>
                <button type="button" onClick={closeForm} className="close-btn-x">X</button>
                <div className='edit_class__form_container'>
                    <label htmlFor="name">דירה</label>
                    <input
                        type="text"
                        list="tenants"
                        id="name"
                        name="receivingTenantFullTenantDesc"
                        value={packageToEdit.receivingTenantFullTenantDesc}
                        onChange={handleChange}
                    />
                    <datalist id="tenants">
                        {users.map((user) => (
                            <option
                                key={user.id}
                                value={`${user.fullUserDescription}`}
                            />

                        ))}
                    </datalist>
                    {/* < FormToValidate
                        input={packageToEdit.receivingTenantFullTenantDesc}
                        condition={(users.map(user => user.apartmentNumber + ' - ' + user.firstName + ' ' + user.lastName)).includes(packageToEdit.receivingTenantFullTenantDesc)}
                        successMessage='משתמש קיים במערכת'
                        errorMessage='משתמש לא קיים'
                    /> */}
                </div>
                <div className="edit_class__form_to_row">
                    <div className="flex-row">
                        <div className='edit_class__form_container'>
                            <label htmlFor="amount">כמות</label>
                            <select id="amount" name="amount" value={packageToEdit.amount} required onChange={handleSelectChange} >
                                <option value="" hidden>כמות </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
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
                                <option value="אחר">אחר</option>
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
                                <option value="אחר">אחר</option>
                            </select>
                        </div>
                    </div>
                    {/* < FormToValidate
                        input={(packageToEdit.color && packageToEdit.size && packageToEdit.type)}
                        condition={(packageToEdit.color && packageToEdit.size && packageToEdit.type) || (packageToEdit.color !== "" || packageToEdit.size !== "" || packageToEdit.type !== "")}
                        successMessage='כל השדות תקינים'
                        errorMessage='יש למלא את כל השדות'
                    /> */}
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
                    <button type='button' onClick={closeForm}>סגור</button>
                </div>
            </form>
        </section >

    )
}

export default EditPackage