import { packageService } from "@/services/package.service";
import { utilService } from "@/services/util.service";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import { userService } from "@/services/user.service";

const EditPackage = () => {
    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const pathname = usePathname()
    const router = useRouter()
    const idFromPath = pathname.split('/').pop()
    // const currUser = userService.getloggedInUser().username


    useEffect(() => {
        if (!idFromPath) return;
        loadPackage();
    }, []);

    async function loadPackage() {
        try {
            const pack = await packageService.get(idFromPath);
            setPackageToEdit(pack);
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

    async function onSavePackage(ev) {
        ev.preventDefault()
        try {
            packageToEdit.dateReceived = Date.now(),
                packageToEdit.lobbyPackReceivedBy = 'אלון'
            packageToEdit.fullPackageDescription = utilService.getFullPackageDescription(packageToEdit.amount, packageToEdit.type, packageToEdit.color, packageToEdit.size)
            packageToEdit.isCollected = false
            await packageService.save(packageToEdit)
            router.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    function closeForm() {
        router.push('/')
    }

    if (!packageToEdit) return console.log('no package to edit')
    else return (
        <section className='edit_class__section'>
            <form className='edit_class__form' onSubmit={onSavePackage}>
                <div className='edit_class__form_container'>
                    <h4>{packageToEdit.id ? "ערוך חבילה קיימת" : "הוסף חבילה חדשה"}</h4>
                    <label htmlFor="name">דירה</label>
                    <input type="text"
                        name="apartmentReceiver"
                        id="name"
                        placeholder=""
                        value={packageToEdit.apartmentReceiver}
                        onChange={handleChange}
                        required
                    />
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
                            <option value="אדום">אדום</option>
                            <option value="כחול">כחול</option>
                            <option value="ירוק">ירוק</option>
                            <option value="צהוב">צהוב</option>
                            <option value="כתום">כתום</option>
                            <option value="סגול">סגול</option>
                            <option value="ורוד">ורוד</option>
                            <option value="חום">חום</option>
                            <option value="שחור">שחור</option>
                            <option value="לבן">לבן</option>
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
                    <button>{packageToEdit.id ? "שמור" : "הוסף"}</button>
                    <button type='button' onClick={() => closeForm()}>סגור</button>
                </div>
            </form>
        </section >

    )
}

export default EditPackage