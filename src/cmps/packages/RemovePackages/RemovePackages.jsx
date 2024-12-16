import React, { useEffect, useState } from 'react'
import { packageService } from '@/services/package.service'
import { userService } from "@/services/user.service";
import { useRouter } from 'next/navigation'
import { showToast } from '@/lib/reactToastify/index.js'
const RemovePackages = ({ setShowRemovePackages, setSelectedItems, selectedItems, setPackages, packages }) => {

    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const [users, setUsers] = useState([])
    const [filterBy, setFilterBy] = useState(userService.getDefaultFilter())
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

    function closeForm(ev) {
        setShowRemovePackages(false)
        setSelectedItems([])
    }

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers(filterBy);
            setUsers(users)
        } catch (err) {
            console.log("Had issues in users", err);
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, text: value }))
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
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

    console.log('packageToEdit', packageToEdit)

    return (
        <>
            <section className='edit_class__section'>
                <form className='edit_class__form' onSubmit={onSavePackage} autoComplete="off" role="presentation">
                    <button onClick={closeForm} className="close-btn-x">X</button>
                    <div className='edit_class__form_container'>
                        <label htmlFor="name">הזן פרטי דייר</label>
                        <input
                            type="text"
                            list="tenants"
                            id="name"
                            name="collectingTenantFullTenantDesc"
                            value={packageToEdit.collectingTenantFullTenantDesc}
                            onChange={handleChange}
                            required
                        />
                        <datalist id="tenants">
                            {
                                users.map(user => <option key={user._id} value={user.fullUserDescription}></option>)
                            }
                        </datalist>
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="name">הערות</label>
                        <input type="text"
                            name="notesOnCollection"
                            id="notes"
                            placeholder="הוסף הערה"
                            value={packageToEdit.notesOnCollection}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex-row">
                        <button type="submit">בצע מסירה</button>
                        <button type='button' onClick={() => closeForm()}>סגור</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default RemovePackages