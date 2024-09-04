import React, { useEffect, useState } from 'react'
import styles from './RemovePackage.module.css'
import { packageService } from '@/services/package.service'
import { utilService } from '@/services/util.service'
import { useRouter } from 'next/navigation'
const RemovePackages = ({ setShowRemovePackages, selectedItems, setSelectedItems, setPackages, packages }) => {

    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const router = useRouter()

    async function loadPackagesToRemove() {
        const packagesById = []
        for (const item of selectedItems) {
            const pack = await packages.find(pack => pack.id === item && pack.isCollected === false)
            packagesById.push(pack)
        }
        return packagesById
    }


    function closeForm(ev) {
        if (!ev.target.closest(`.${styles.remove_packages__form_container}`)) setShowRemovePackages(false)
        // setSelectedItems([])
    }



    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
    }


    async function onSavePackage(ev) {
        ev.preventDefault()
        const packagesToSave = await loadPackagesToRemove()
        try {
            for (const p of packagesToSave) {
                const packageToSave = { ...p, dateCollected: Date.now(), lobbyPackGivenBy: ' ', isCollected: true };  
                try {
                    await packageService.save(packageToSave);
                } catch (saveError) {
                    console.error('Error saving package:', saveError);
                }
            }

            setPackages(packages.filter(p => !selectedItems.includes(p.id)))
            setShowRemovePackages(false)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <>
            <div className={styles.remove_packages} onClick={(ev) => closeForm(ev)}>
                <div className={styles.remove_packages__form_container}>
                    <form onSubmit={onSavePackage}>
                        <div>
                            <label htmlFor="name">דירה</label>
                            <input type="text"
                                name="apartmentCollected"
                                id="name"
                                placeholder=""
                                value={packageToEdit.apartmentCollected}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="name">הערות</label>
                            <input type="text"
                                name="notesOnCollection"
                                id="notes"
                                placeholder="הערות"
                                value={packageToEdit.notesOnCollection}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit">הסר</button>
                    </form>
                </div>

            </div>
        </>
    )
}

export default RemovePackages