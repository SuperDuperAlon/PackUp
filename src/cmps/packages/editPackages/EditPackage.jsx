import { packageService } from "@/services/package.service";
import { utilService } from "@/services/util.service";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from 'next/navigation'
import styles from './EditPackage.module.css'
import { userService } from "@/services/user.service";

const EditPackage = ({ toggleEditPackageForm }) => {
    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const pathname = usePathname()
    const router = useRouter()
    const idFromPath = pathname.split('/').pop()
    // const currUser = userService.getLoggedinUser().username


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
            packageToEdit.dateReceived = utilService.parseDate()
            packageToEdit.lobbyPackReceivedBy = 'אלון'
            packageToEdit.fullPackageDescription = utilService.getFullPackageDescription(packageToEdit.amount, packageToEdit.type, packageToEdit.color, packageToEdit.size)
            packageToEdit.isCollected = false
            await packageService.save(packageToEdit)
            router.push('/')
        } catch (err) {
            console.error(err)
        }
    }

    if (!packageToEdit) return console.log('no package to edit')
    else return (
        <section className={styles.edit_class__section}>
            <h2>{packageToEdit.id ? "Edit this package" : "Add a new package"}</h2>
            <form className={styles.edit_class__form} onSubmit={onSavePackage}>
                <div className={styles.edit_class__form_container}>
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
                <div className={styles.edit_class__form_container}>
                    <label htmlFor="amount">כמות</label>
                    <select id="amount" name="amount" value={packageToEdit.amount} required onChange={handleSelectChange} >
                        <option value="" hidden>בחר כמות: </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className={styles.edit_class__form_container}>
                    <label htmlFor="name"> בחר סוג חבילה:</label>
                    <select id="type" name="type" value={packageToEdit.type} required onChange={handleSelectChange} >
                        <option value="" hidden>בחר סוג</option>
                        <option value="חבילה">חבילה</option>
                        <option value="שקית">שקית</option>
                        <option value="קרטון">קרטון</option>
                        <option value="אחר">אחר</option>
                    </select>
                </div>
                <div className={styles.edit_class__form_container}>
                    <label htmlFor="name">בחר גודל:</label>
                    <select id="size" name="size" value={packageToEdit.size} required onChange={handleSelectChange} >
                        <option value="" hidden>בחר גודל</option>
                        <option value="קטן">קטן</option>
                        <option value="בינוני">בינוני</option>
                        <option value="גדול">גדול</option>
                        <option value="ענק">ענק</option>
                    </select>
                </div>
                <div className={styles.edit_class__form_container}>
                    <label htmlFor="color">בחר צבע:</label>
                    <select id="color" name="color" value={packageToEdit.color} onChange={handleSelectChange} required>
                        <option value="" hidden>בחר צבע</option>
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
                <div className={styles.edit_class__form_container}>
                    <label htmlFor="name">הערות</label>
                    <input type="text"
                        name="notesOnArrival"
                        id="notes"
                        placeholder="הערות"
                        value={packageToEdit.notesOnArrival}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button>{packageToEdit.id ? "Save" : "Add"}</button>
                    <button onClick={toggleEditPackageForm}>סגור</button>
                </div>
            </form>
        </section >

    )
}

export default EditPackage