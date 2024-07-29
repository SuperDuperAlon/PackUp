'use client'

import { useEffect, useState } from 'react';
// import styles from "./page.module.css";
import { packageService } from '../services/package.service'
import AddPackage from '../cmps/AddPackage';
export default function Home() {

  // const [filterBy, setFilterBy] = useState(packageService.getDefaultFilter());
  const [packages, setPackages] = useState(null);
  const [openAddPackageForm, setOpenAddPackageForm] = useState(false);

  function toggleAddPackageForm() {
    setOpenAddPackageForm(prev => !prev);
  }

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

  function onAddPackage(newPackage) {
    setPackages([...packages, newPackage])
  }

  function onRemovePackage(id) {
    packageService.remove(id)
    setPackages(prevPackages => prevPackages && prevPackages.filter(p => p.id !== id));
  }

  return (
    <>
      <section>
        <h1>חבילות ודואר</h1>
        <button onClick={() => setOpenAddPackageForm(true)}>הוספת חבילה</button>
        {openAddPackageForm &&
          <AddPackage onAddPackage={onAddPackage} toggleAddPackageForm={toggleAddPackageForm} />
        }
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
              packages && packages.map((p) => (
                <>
                  <tr key={p.id}>
                    <td>
                      <button onClick={() => onRemovePackage(p.id)}>מסירה</button>
                      <button>עריכה</button>
                      <button>תזכורת</button>
                    </td>
                    <td>{p.date}</td>
                    <td>{p.lobbyReceiver}</td>
                    <td>{p.apartmentReceiver}</td>
                    <td>{p.description}</td>
                    <td>{p.notes}</td>
                  </tr>
                </>
              ))
            }


          </tbody>
        </table>

      </section >
    </>
  )
}
