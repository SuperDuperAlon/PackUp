import { packageService } from '@/services/package.service'
import { utilService } from '@/services/util.service'
import React, { useState } from 'react'
import styles from './AddPackage.module.css'

const AddPackage = ({ onAddPackage, toggleAddPackageForm }) => {

    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())

    function handleChange({ target }) {
        let { value, type, name: field } = target
        console.log(value, type, field);
        value = type === 'number' ? +value : value
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
    }

    const handleSelectChange = ({ target }) => {
        let { value, type, name: field } = target
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
    };

    function onSavePackage(ev) {
        ev.preventDefault()
        const packageToAdd = {
            id: utilService.generateId(),
            date: utilService.parseDate(),
            lobbyReceiver: 'אלון',
            apartmentReceiver: packageToEdit.apartmentReceiver,
            description: `${packageToEdit.amount} - ${packageToEdit.type} בגודל ${packageToEdit.size} בצבע ${packageToEdit.color}`,
            notes: packageToEdit.notes
        }
        packageService.save(packageToAdd)
        onAddPackage(packageToAdd)
        toggleAddPackageForm()
    }

    return (
        <section className={styles.add_class__section}>
            <form className={styles.add_class__form} onSubmit={onSavePackage}>
                <div className={styles.add_class__form_container}>
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
                <div className={styles.add_class__form_container}>
                    <label htmlFor="amount">כמות</label>
                    <select id="amount" name="amount" value={packageToEdit.amount} required onChange={handleSelectChange} >

                        <option value="" hidden>בחר כמות:</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </div>
                <div className={styles.add_class__form_container}>
                    <label htmlFor="name"> בחר סוג חבילה:</label>
                    <select id="type" name="type" value={packageToEdit.type} required onChange={handleSelectChange} >
                        <option value="" hidden>בחר סוג</option>
                        <option value="חבילה">חבילה</option>
                        <option value="שקית">שקית</option>
                        <option value="קרטון">קרטון</option>
                        <option value="אחר">אחר</option>
                    </select>
                </div>
                <div className={styles.add_class__form_container}>
                    <label htmlFor="name">בחר גודל:</label>
                    <select id="size" name="size" value={packageToEdit.size} required onChange={handleSelectChange} >
                        <option value="" hidden>בחר גודל</option>
                        <option value="קטן">קטן</option>
                        <option value="בינוני">בינוני</option>
                        <option value="גדול">גדול</option>
                        <option value="ענק">ענק</option>
                    </select>
                </div>
                <div className={styles.add_class__form_container}>
                    <label for="color">בחר צבע:</label>
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
                <div className={styles.add_class__form_container}>
                    <label htmlFor="name">הערות</label>
                    <input type="text"
                        name="notes"
                        id="notes"
                        placeholder="הערות"
                        value={packageToEdit.notes}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <button>הוסף</button>
                </div>
            </form>
        </section >
    )
}

export default AddPackage