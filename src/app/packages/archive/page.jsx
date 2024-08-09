'use client'
import { packageService } from '@/services/package.service';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const PackageArchive = () => {

    const [packages, setPackages] = useState(null);
    const router = useRouter()

    useEffect(() => {
        async function loadPackages() {
            try {
                const data = await packageService.query()
                if (data) setPackages(data)
            } catch (error) {
                console.error('Error loading flowers:', error)
            }
        }
        loadPackages()
    }, [])

    if (!packages || !packages.length) console.log('no packages')
    else return (
        <section>
            <h1>ארכיון חבילות ודואר</h1>
            {/* TODO: spacing */}
            <button type='button' onClick={() => router.push('/')}>חזור</button>
            <table>
                <thead>
                    <tr>
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
                                <td>{p.dateReceived}</td>
                                <td className='capitalize'>{p.lobbyPackReceivedBy}</td>
                                <td>{p.apartmentReceiver}</td>
                                <td>{p.fullPackageDescription}</td>
                                <td>{p.notesOnArrival}</td>
                                <td>{p.dateCollected}</td>
                                <td>{p.collectedBy}</td>
                                <td>{p.apartmentCollected}</td>
                                <td>{p.notesOnCollection}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </section>
    )
}

export default PackageArchive