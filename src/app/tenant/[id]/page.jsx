'use client'

import React, { useEffect, useState } from 'react'
import avatar from '@/app/styles/assets/avataaars.png'
import Image from 'next/image'
import { LuPackageCheck } from "react-icons/lu";
import { useRouter } from 'next/navigation'
import { boxes } from '@/arrays.js'
import { usePathname } from 'next/navigation'
import { userService } from '@/services/user.service';

const TenantView = () => {

    const [currUser, setCurrUser] = useState(null)
    const currUserId = usePathname().split('/')[2]
    console.log(currUserId);
    console.log(currUser);



    const router = useRouter()

    useEffect(() => {
        async function loadUser(currUserId) {
            if (!currUserId) return
            const user = await userService.getUserById(currUserId)
            setCurrUser(user)
        }
        loadUser(currUserId)
    }, [])

    if (!currUser) {
        return null
    }
    return (
        <>
            <section className='tenant_view'>
                <div className='tenant__profile'>
                    <div className='tenant__profile__info'>
                        <div>שלום</div>
                        <div className='tenant__name'>{currUser?.firstName} {currUser?.lastName}</div>
                        <div>{currUser?.apartmentNumber}</div>
                    </div>
                    <Image src={avatar} className='tenant__profile__img' alt="profile" />
                </div>
                <div className='tenant__boxes'>
                    {boxes.map(box => <div key={box.idx} onClick={() => router.push(currUserId + '/' + box.link)}>
                        <div className='tenant__boxes__icon'>
                            {box.icon}
                        </div>
                        <div>
                            {box.name}
                        </div>
                    </div>)}
                </div>
            </section>
        </>
    )
}

export default TenantView