'use client'
import { packageService } from '@/services/package.service';
import { userService } from '@/services/user.service';
import { utilService } from '@/services/util.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const PackageArchive = () => {
    const [filterBy, setFilterBy] = useState(packageService.getDefaultFilter());
    const [sortBy, setSortBy] = useState(packageService.getDefaultSort());
    const [packages, setPackages] = useState(null);
    const [users, setUsers] = useState(null);
    const router = useRouter()

    useEffect(() => {
        async function loadPackages() {
            try {
                const data = await packageService.query(filterBy, sortBy)
                if (data) setPackages(data)
            } catch (error) {
                console.error('Error loading flowers:', error)
            }
        }
        loadPackages()
    }, [filterBy, sortBy])

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

    async function onUndoRemovePackage(id) {
        const packageToUndo = packages.find(p => p.id === id)
        console.log(packageToUndo);

        try {
            const p = { ...packageToUndo, dateCollected: null, lobbyPackGivenBy: null, isCollected: false }
            await packageService.save(p)
        }
        catch (err) { console.error(err) }
    }

    function getUserNameByID(id) {
        console.log(id)
        const user = users.find(u => u.id === id)
        if (!user) return 'No user found'
        else return `${user.apartmentNumber} - ${user.firstName} ${user.lastName}`
    }
console.log(users);

    if (!packages && !users) console.log('no packages')
    else return (
        <section className='archive-section'>
            <div className='flex-row justify-between'>
                <div>ארכיון חבילות ודואר</div>
                {/* TODO: spacing */}
                <button type='button' onClick={() => router.push('/')}>חזור</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>תאריך קבלה</th>
                        <th>הוזן על ידי</th>
                        <th>עבור</th>
                        <th>תיאור החבילה</th>
                        <th>הערות קבלה</th>
                        <th>תאריך מסירה</th>
                        <th>נמסר על ידי</th>
                        <th>מקבל מסירה</th>
                        <th>הערות מסירה</th>
                    </tr>
                </thead>
                <tbody>
                    {packages
                        .filter(p => p.isCollected)
                        .map((p) => (
                            <tr key={p.id}>
                                <td><button onClick={() => onUndoRemovePackage(p.id)}>החזר</button></td>
                                <td>{utilService.parseDate(p.dateReceived)}</td>
                                <td className='capitalize'>{p.lobbyPackReceivedBy}</td>
                                <td>{getUserNameByID(p.apartmentReceiver)}</td>
                                <td>{p.fullPackageDescription}</td>
                                <td>{p.notesOnArrival}</td>
                                <td>{utilService.parseDate(p.dateCollected)}</td>
                                <td>{p.lobbyPackGivenBy}</td>
                                <td>{getUserNameByID(p.apartmentCollected)}</td>
                                <td>{p.notesOnCollection}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    )
}

export default PackageArchive