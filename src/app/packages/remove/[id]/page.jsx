'use client'
import { packageService } from '@/services/package.service'
import { utilService } from '@/services/util.service'
import { userService } from '@/services/user.service'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const RemovePackage = () => {

    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const [selectedUser, setSelectedUser] = useState(null)
    const pathname = usePathname()
    const router = useRouter()
    const idFromPath = pathname.split('/').pop()

    useEffect(() => {
        if (!idFromPath) return;
        loadPackage();
    }, []);

    async function loadUsers() {
        try {
            const users = await userService.getUsers();
            setUsers(users)
        } catch (err) {
            console.log("Had issues in users", err);
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadPackage() {
        try {
            const pack = await packageService.get(idFromPath);
            setPackageToEdit(pack);
        } catch (err) {
            console.log("Had issues in pack details", err);
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setPackageToEdit((prevPackage) => ({ ...prevPackage, [field]: value }))
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

    async function onSavePackage(ev) {
        ev.preventDefault()
        try {
            packageToEdit.dateCollected = utilService.parseDate()
            packageToEdit.lobbyPackGivenBy = 'אלון'
            packageToEdit.isCollected = true
            packageToEdit.apartmentCollected
            await packageService.save(packageToEdit)
            router.push('/')
        } catch (err) {
            console.error(err)
        }
    }
    
    return (
        <>
            <form onSubmit={onSavePackage}>
                <div>
                    <label htmlFor="name">דירה</label>
                    <input list="tenants"
                        id="name"
                        name="apartmentCollected"
                        value={selectedUser ? `${selectedUser.apartmentNumber} - ${selectedUser.firstName} ${selectedUser.lastName}` : ''}
                        onChange={handleUserChange} />
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
        </>
    )
}

export default RemovePackage