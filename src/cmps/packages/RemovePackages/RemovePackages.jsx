import React, { useEffect, useState } from 'react'
import styles from './RemovePackage.module.css'
import { packageService } from '@/services/package.service'
import { utilService } from '@/services/util.service'
import { userService } from "@/services/user.service";
import { useRouter } from 'next/navigation'
import { showToast } from '@/lib/reactToastify/index.js'
const RemovePackages = ({ setShowRemovePackages, selectedItems, setPackages, packages }) => {

    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const [users, setUsers] = useState([])
    const [selectedUser, setSelectedUser] = useState(null)
    const router = useRouter()

    async function loadPackagesToRemove() {
        const packagesById = []
        for (const item of selectedItems) {
            const pack = await packages.find(pack => pack._id === item && pack.isCollected === false)
            packagesById.push(pack)
        }
        return packagesById
    }

    const handleUserChange = (e) => {
        const selectedValue = e.target.value;

        // Find the user object based on the selected value
        const user = users.find(user =>
            selectedValue.includes(user.apartmentNumber) &&
            selectedValue.includes(user.firstName) &&
            selectedValue.includes(user.lastName)
        );

        // Set the selectedUser to the full user object
        setSelectedUser(user || null); // Set to null if no match is found
    };


    function closeForm(ev) {
        if (!ev.target.closest(`.${styles.remove_packages__form_container}`)) setShowRemovePackages(false)
        // setSelectedItems([])
    }

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers();
            setUsers(users)
            // return users
        } catch (err) {
            console.log("Had issues in users", err);
        }
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
                const packageToSave = {
                    ...p, dateCollected: Date.now(), lobbyPackGivenBy: 'אלון', isCollected: true, notesOnCollection: packageToEdit.notesOnCollection,
                    collectingTenantFullTenantDesc: packageToEdit.collectingTenantFullTenantDesc
                };
                try {
                    await packageService.save(packageToSave);
                    await showToast('success', 'פעולה בוצעה בהצלחה')
                } catch (saveError) {
                    console.error('Error saving package:', saveError);
                    await showToast('error', 'פעולה נכשלה')

                }
            }

            setPackages(packages.filter(p => !selectedItems.includes(p._id)))
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
                            <input type="text" list="tenants"
                                id="name"
                                name="collectingTenantFullTenantDesc"
                                value={packageToEdit.receivingTenantFullTenantDesc}
                                onChange={handleChange} />
                            <datalist id="tenants">
                                {
                                    users.map(user => <option key={user.id} value={user.apartmentNumber + ' - ' + user.firstName + ' ' + user.lastName}></option>)
                                }
                            </datalist>
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