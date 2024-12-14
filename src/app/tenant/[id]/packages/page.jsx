'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { userService } from '@/services/user.service'
import { packageService } from '@/services/package.service'
import { utilService } from '@/services/util.service'

const UserPackages = () => {

  const [filterBy, setFilterBy] = useState(packageService.getDefaultFilter());
  const [sortBy, setSortBy] = useState(packageService.getDefaultSort());
  const [packages, setPackages] = useState(null);
  const [currUser, setCurrUser] = useState(null)
  const currUserId = usePathname().split('/')[2]

  useEffect(() => {
    async function loadUser(currUserId) {
      const user = await userService.getUserById(currUserId)
      setCurrUser(user)
    }
    loadUser(currUserId)
  }, [currUserId])

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await packageService.query(filterBy, sortBy)
        if (data) {
          setPackages(data)
        }
      } catch (error) {
        console.error('Error loading packages:', error)
      }
    }
    loadPackages()
  }, [filterBy, sortBy])

  if (!packages && !currUser) console.log('no packages')
  else return (
    <>
      <section className='tenant_packages_view'>
        {/* <div className='tenant_packages_view__title'>
          <div>
            שלום
          </div>
          <div>
            {currUser.firstName} {currUser.lastName}
          </div>
          <div>
            {currUser.apartmentNumber}
          </div>
        </div> */}
        <div className='tenant_packages_view__packages'>
          <div className='tenant_packages_view__title'>חבילות חדשות</div>
          {packages && packages.filter(p => p.isCollected === false && p.receivingTenantId === currUser._id).map(p => <div key={p._id} className='tenant_packages_view__package'>
            <div className='tenant_packages_view__package__info'>
              <div className='tenant_packages__date'>
                {utilService.parseDate(p.dateReceived)}
              </div>
              <div className='tenant_packages__desc'>
                {p.fullPackageDescription}
              </div>
            </div>
          </div>)}
        </div>
        <div className='tenant_packages_view__packages'>
          <div className='tenant_packages_view__title'>חבילות שנאספו</div>
          {packages && packages.filter(p => p.isCollected && p.receivingTenantId === currUser._id).map(p => <div key={p.id} className='tenant_packages_view__package'>
            <div className='tenant_packages_view__package__info'>
              <div className='tenant_packages__date'>
                {utilService.parseDate(p.dateReceived)}
              </div>
              <div className='tenant_packages__desc'>
                {p.fullPackageDescription}
              </div>
              <div className='tenant_packages__collection'>
                נאסף על ידי - {p.collectingTenantFullTenantDesc}
              </div>
              {p.notesOnCollection &&
                <div className='tenant_packages__collection_notes'>
                  {p.notesOnCollection}
                </div>
              }
            </div>
          </div>)}
        </div>
      </section>

    </>
  )
}

export default UserPackages