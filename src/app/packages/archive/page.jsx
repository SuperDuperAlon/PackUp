'use client'
import React, { useEffect, useState } from 'react'
import { packageService } from '@/services/package.service';
import { utilService } from '@/services/util.service';
import { useRouter } from 'next/navigation';
import { showToast } from '@/lib/reactToastify';
import { useLoader } from '@/context/LoaderContext'

const PackageArchive = () => {
    // TODO: add filter and sorting
    const [filterBy, setFilterBy] = useState(packageService.getDefaultFilter());
    const [sortBy, setSortBy] = useState(packageService.getDefaultSort());
    const [packages, setPackages] = useState(null);
    const router = useRouter()
    const { setLoading } = useLoader()

    useEffect(() => {
        async function loadPackages() {
            if (!packages || !packages.length) setLoading(true)
            try {
                const data = await packageService.query(filterBy, sortBy)
                if (data) setPackages(data.filter(p => p.isCollected))
            } catch (error) {
                console.error('Error loading flowers:', error)
            }
            setLoading(false)
        }
        loadPackages()
    }, [filterBy, sortBy])



    async function onUndoRemovePackage(id) {
        const packageToUndo = packages.find(p => p._id === id)
        try {
            const p = {
                ...packageToUndo, dateCollected: null, lobbyPackGivenBy: null, isCollected: false,
                collectingTenantApt: null, collectingTenantFname: null, collectingTenantFullTenantDesc: null, collectingTenantId: null, collectingTenantLname: null
            }
            await packageService.save(p)
            setPackages(prev => prev.filter(p => p._id !== id))
        }
        catch (err) {
            console.error(err)
            await showToast('error', 'פעולה נכשלה')
        }
    }

    if (!packages) console.log('no packages')
    else return (
        <section className='archive-section'>
            <div className='flex-row justify-between'>
                <div>ארכיון חבילות ודואר</div>
                <button type='button' onClick={() => router.push('/packages')}>חזור</button>
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
                    {packages && packages
                        .filter(p => p.isCollected)
                        .map((p) => (
                            <tr key={p._id}>
                                <td><button onClick={() => onUndoRemovePackage(p._id)}>החזר</button></td>
                                <td>{utilService.parseDate(p.dateReceived)}</td>
                                <td className='capitalize'>{p.lobbyPackReceivedBy}</td>
                                <td>{p.receivingTenantFullTenantDesc}</td>
                                <td>{p.fullPackageDescription}</td>
                                <td>{p.notesOnArrival}</td>
                                <td>{utilService.parseDate(p.dateCollected)}</td>
                                <td>{p.lobbyPackGivenBy}</td>
                                <td>{p.collectingTenantFullTenantDesc}</td>
                                <td>{p.notesOnCollection}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    )
}

export default PackageArchive