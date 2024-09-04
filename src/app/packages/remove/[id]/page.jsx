'use client'
import { packageService } from '@/services/package.service'
import { utilService } from '@/services/util.service'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const RemovePackage = () => {

    const [packageToEdit, setPackageToEdit] = useState(packageService.getEmptyPackage())
    const pathname = usePathname()
    const router = useRouter()
    const idFromPath = pathname.split('/').pop()

    useEffect(() => {
        if (!idFromPath) return;
        loadPackage();
    }, []);

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


    async function onSavePackage(ev) {
        ev.preventDefault()
        try {
            packageToEdit.dateCollected = utilService.parseDate()
            packageToEdit.lobbyPackGivenBy = 'אלון'
            packageToEdit.isCollected = true
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
        </>
    )
}

export default RemovePackage