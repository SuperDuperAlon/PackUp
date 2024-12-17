import { packageService } from "@/services/package.service";
import { utilService } from "@/services/util.service";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { userService } from "@/services/user.service"
import { useAuth } from '@/context/AuthContext';
import { useLoader } from "@/context/LoaderContext";
import { showToast } from '@/lib/reactToastify';
import addPackageFormSchema from '@/lib/zod/addPackageFormSchema';

const EditPackage = () => {

    const { admin } = useAuth()
    const { setLoading } = useLoader()

    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const [filterBy, setFilterBy] = useState(userService.getDefaultFilter())
    const [errors, setErrors] = useState({});
    const pathname = usePathname()
    const router = useRouter()

    const match = pathname.match(/^\/packages\/edit\/([\w-]+)$/);
    const idFromPath = match ? match[1] : null;

    useEffect(() => {
        if (!idFromPath) return;
        loadPackage();
    }, [idFromPath]);

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

    async function loadSelectedUser(id) {
        try {
            const user = await userService.getUserById(id);
            setSelectedUser(user);
        } catch (err) {
            console.log("Had issues in user details", err);
        }
    }

    async function loadPackage() {
        setLoading(true)
        try {
            if (!idFromPath) {
                setLoading(false)
                return setPackageToEdit(packageService.getEmptyPackage());
            }
            else {
                const pack = await packageService.get(idFromPath);
                loadSelectedUser(pack.receivingTenantId)
                setPackageToEdit(pack);
                setLoading(false)
            }
        } catch (err) {
            console.log("Had issues in package details", err);
        }
    }

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
        if (!validateForm()) return
        if (!selectedUser._id) return
        try {
            packageToEdit.dateReceived = Date.now(),
                packageToEdit.lobbyPackReceivedBy = admin.username
            packageToEdit.fullPackageDescription = utilService.getFullPackageDescription(packageToEdit.amount, packageToEdit.type, packageToEdit.color, packageToEdit.size)
            packageToEdit.isCollected = false
            packageToEdit.receivingTenantApt = selectedUser.apartmentNumber
            packageToEdit.receivingTenantFname = selectedUser.firstName
            packageToEdit.receivingTenantLname = selectedUser.lastName
            packageToEdit.receivingTenantId = selectedUser._id
            packageToEdit.receivingTenantFullTenantDesc = selectedUser.fullUserDescription
            await packageService.save(packageToEdit)
            router.push('/packages')
        } catch (err) {
            console.error(err)
            await showToast('error', 'פעולה נכשלה')
        }
    }

    const validateForm = () => {
        const formSchema = addPackageFormSchema(users);
        try {
            formSchema.parse(packageToEdit);
            setErrors({}); // Clear errors if validation passes
            return true;
        } catch (error) {
            console.log(error, 'errors')
            if (error.errors) {
                const fieldErrors = {};
                error.errors.forEach((err) => {
                    fieldErrors[err.path[0]] = err.message;
                });
                setErrors(fieldErrors);
            }
            return false;
        }
    };

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

    const getErrorClass = (field) => (errors[field] ? 'error' : '');

    if (!packageToEdit && !users) return console.log('no package to edit')
    else return (
        <section className='edit_class__section'>
            <form className='edit_class__form' onSubmit={onSavePackage} autoComplete="off" role="presentation">
                <button type="button" onClick={closeForm} className="close-btn-x">X</button>
                <div className='edit_class__form_container form-group'>
                    <label htmlFor="name">דירה</label>
                    <input
                        type="text"
                        list="tenants"
                        id="name"
                        name="receivingTenantFullTenantDesc"
                        value={packageToEdit.receivingTenantFullTenantDesc}
                        onChange={handleChange}
                        className={getErrorClass('receivingTenantFullTenantDesc')}
                    />
                    {errors.receivingTenantFullTenantDesc &&
                        <span className="error-message">{errors.receivingTenantFullTenantDesc}</span>
                    }
                    <datalist id="tenants">
                        {users.map((user) => (
                            <option
                                key={user._id}
                                value={`${user.fullUserDescription}`}
                            />
                        ))}
                    </datalist>
                </div>
                <div className="edit_class__form_to_row">
                    <div className="flex-row">
                        <div className='edit_class__form_container  form-group'>
                            <label htmlFor="amount">כמות</label>
                            <select id="amount" name="amount" value={packageToEdit.amount} onChange={handleSelectChange} className={getErrorClass('amount')}>
                                <option value="" hidden>כמות </option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                            {errors.amount && <span className="error-message">{errors.amount}</span>}
                        </div>
                        <div className='edit_class__form_container  form-group'>
                            <label htmlFor="name"> סוג</label>
                            <select id="type" name="type" value={packageToEdit.type} onChange={handleSelectChange} className={getErrorClass('type')}>
                                <option value="" hidden> סוג</option>
                                <option value="חבילה">חבילה</option>
                                <option value="שקית">שקית</option>
                                <option value="קרטון">קרטון</option>
                                <option value="אחר">אחר</option>
                            </select>
                            {errors.type && <span className="error-message">{errors.type}</span>}
                        </div>
                        <div className='edit_class__form_container form-group'>
                            <label htmlFor="name"> גודל</label>
                            <select id="size" name="size" value={packageToEdit.size} onChange={handleSelectChange} className={getErrorClass('size')} >
                                <option value="" hidden> גודל</option>
                                <option value="קטן">קטן</option>
                                <option value="בינוני">בינוני</option>
                                <option value="גדול">גדול</option>
                                <option value="ענק">ענק</option>
                                <option value="אחר">אחר</option>
                            </select>
                            {errors.size && <span className="error-message">{errors.size}</span>}
                        </div>
                        <div className='edit_class__form_container form-group'>
                            <label htmlFor="color"> צבע</label>
                            <select id="color" name="color" value={packageToEdit.color} onChange={handleSelectChange} className={getErrorClass('color')} >
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
                            {errors.color && <span className="error-message">{errors.color}</span>}
                        </div>
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
                    <button type='button' onClick={closeForm}>סגור</button>
                </div>
            </form>
        </section >
    )
}

export default EditPackage