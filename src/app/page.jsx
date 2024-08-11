'use client'

import { useEffect, useState } from 'react';
import { packageService } from '../services/package.service'
import { userService } from '@/services/user.service';
import EmailReminder from '../cmps/packages/EmailReminder';
import { useRouter } from 'next/navigation'
export default function Home() {

  // const [filterBy, setFilterBy] = useState(packageService.getDefaultFilter());
  const [packages, setPackages] = useState(null);
  const router = useRouter()

  // TODO: Filter packages
  // TODO: Sort packages

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

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const storedUser = userService.getLoggedinUser();
      if (storedUser) {
        setUser(storedUser);
        router.push('/')
      }
    };
    loadUser();
  }, []);

  function countNotCollected() {
    return packages.filter(p => !p.isCollected).length
  }

  // if (!user) return router.push('/users/signup')
  if (!packages || !packages.length) console.log('no packages')
  else return (
    <>
      <section>
        <div className='table-section'>
          <div>
            <button onClick={() => router.push('packages/edit')}>הוסף</button>
            <div className='baseline'>יש {countNotCollected()} חבילות</div>
          </div>
          <div>
            <button onClick={() => router.push('packages/archive')}>ארכיון</button>
          </div>
        </div>
        {/* TODO: spacing */}

        <table>
          <thead>
            <tr>
              <th></th>
              <th>תאריך קבלה</th>
              <th>מקבל החבילה</th>
              <th>עבור</th>
              <th>תיאור החבילה</th>
              <th>הערות</th>
            </tr>
          </thead>
          <tbody>
            {packages &&
              packages.filter(p => !p.isCollected).map((p) => (
                <tr key={p.id}>
                  <td>
                    <button onClick={() => router.push(`/packages/remove/${p.id}`)}>מסירה</button>
                    <button onClick={() => router.push(`/packages/edit/${p.id}`)}>עריכה</button>
                    <EmailReminder />
                  </td>
                  <td>{p.dateReceived}</td>
                  <td className='capitalize'>{p.lobbyPackReceivedBy}</td>
                  <td>{p.apartmentReceiver}</td>
                  <td>{p.fullPackageDescription}</td>
                  <td>{p.notesOnArrival}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section >
    </>
  )
}
