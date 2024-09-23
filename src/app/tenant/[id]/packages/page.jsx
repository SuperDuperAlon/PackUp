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
      const user = await userService.getById(+currUserId)
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

  console.log(packages)
  console.log(currUser)

  if (!packages && !currUser) console.log('no packages')
  else return (
    <>
      <section className='tenant_packages_view'>
        <div className='tenant_packages_view__title'>
          <div>
            שלום
          </div>
          <div>
            {currUser.firstName} {currUser.lastName}
          </div>
          <div>
            {currUser.apartmentNumber}
          </div>
        </div>
        <div>
          {packages.filter(p => p.receivingTenantId === currUser.id).map(p => <div key={p.id} className='tenant_packages_view__package'>
            <div className='tenant_packages_view__package__info'>
              <div>
                <div>
                  {utilService.parseDate(p.dateReceived)}
                </div>
                <div>
                  {p.fullPackageDescription}
                </div>
              </div>
              <div className={`tenant_packages_view__package__info__status ${p.isCollected ? 'old' : 'new'}`}>
                חדש
              </div>
            </div>
            <div>

            </div>
          </div>)}
        </div>
      </section>

    </>
  )
}

export default UserPackages