'use client'

import { useEffect, useState } from 'react';
// import styles from "./page.module.css";
import { packageService } from '../services/package.service'
import { userService } from '@/services/user.service';
import EmailReminder from '../cmps/EmailReminder';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
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

  function logout() {
    userService.logout()
    setUser(null)
  }

  function onRemovePackage(id) {
    packageService.remove(id)
    setPackages(prevPackages => prevPackages && prevPackages.filter(p => p.id !== id));
  }

  if (!user) return router.push('/users/signup')
  if (!packages || !packages.length) console.log('no packages')
  else return (
    <>
      {user ? (
        <button onClick={() => logout()}>Logout</button>
      ) : (
        <Link href="/users/login">Login</Link>
      )}
      <section>
        <h1>חבילות ודואר</h1>
        <button onClick={() => router.push('/edit')}>הוסף</button>
        {/* TODO: spacing */}

        <table>
          <thead>
            <tr>
              <th>אפשרויות</th>
              <th>תאריך קבלה</th>
              <th>מקבל החבילה</th>
              <th>עבור</th>
              <th>תיאור החבילה</th>
              <th>הערות</th>
            </tr>
          </thead>
          <tbody>
            {
              packages.map((p) => (
                <tr key={p.id}>
                  <td>
                    <button onClick={() => onRemovePackage(p.id)}>מסירה</button>
                    <button onClick={() => router.push(`/edit/${p.id}`)}>עריכה</button>
                    <EmailReminder />
                  </td>
                  <td>{p.date}</td>
                  <td className='capitalize'>{p.lobbyReceiver}</td>
                  <td>{p.apartmentReceiver}</td>
                  <td>{p.amount} - {p.type} בגודל {p.size} בצבע {p.color}</td>
                  <td>{p.notes}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section >
    </>
  )
}
