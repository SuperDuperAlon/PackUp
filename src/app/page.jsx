'use client'

import { useEffect, useState } from 'react';
import { packageService } from '../services/package.service'
import { userService } from '@/services/user.service';
import EmailReminder from '../cmps/packages/EmailReminder';
import { useRouter } from 'next/navigation'
import { utilService } from '@/services/util.service';
import RemovePackage from '../cmps/packages/RemovePackages/RemovePackages';
import Pagination from '../cmps/general/Pagination/Pagination';
import { CiEdit } from "react-icons/ci";
export default function Home() {

  const [filterBy, setFilterBy] = useState(packageService.getDefaultFilter());
  const [sortBy, setSortBy] = useState(packageService.getDefaultSort());
  const [packages, setPackages] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showRemovePackages, setShowRemovePackages] = useState(false);

  // Pagination
  const [numOfPages, setNumOfPages] = useState(null)
  const [currPage, setCurrPage] = useState(1)
  
  const packagesPerPage = 25
  const router = useRouter()

  useEffect(() => {
    async function loadPackages() {
      try {
        const data = await packageService.query(filterBy, sortBy)
        if (data) {
          setPackages(data.filter(p => !p.isCollected))
          setNumOfPages(Math.ceil(data.filter(p => !p.isCollected).length / packagesPerPage))
        }
      } catch (error) {
        console.error('Error loading packages:', error)
      }
    }
    loadPackages()
  }, [filterBy, sortBy, currPage])

  useEffect(() => {
    const loadUser = () => {
      const storedUser = userService.getloggedInUser();
      if (storedUser) {
        setUser(storedUser);
        router.push('/')
      }
    };
    loadUser();
  }, []);


  function handlePageNumberChange(num) {
    if (num < 1 || num > numOfPages) return
    setCurrPage(num)
  }

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedItems(prevSelectedItems =>
      prevSelectedItems.includes(value)
        ? prevSelectedItems.filter(item => item !== value)
        : [...prevSelectedItems, value]
    );
  };

  const handleSelectAllChange = () => {
    const filteredPackages = packages.filter(p => p.isCollected === false);
    if (selectedItems.length === filteredPackages.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredPackages.map(p => p.id));
    }
  };

  function filterPackages(e) {
    setCurrPage(1)
    setFilterBy(prevFilterBy => ({ ...prevFilterBy, apartmentReceiver: e.target.value }));
  }

  console.log(filterBy);
  

  function handleSortChange(by) {
    const updatedSort = { ...sortBy, by, asc: !sortBy.asc }
    setSortBy(updatedSort)
  }

  function onSingleRemoval(id) {
    setSelectedItems([id])
    setPackages(packages)
    setShowRemovePackages(!showRemovePackages)
  }

  function onMultipleRemoval() {
    if (selectedItems.length === 0) return
    setShowRemovePackages(!showRemovePackages)
  }

  // if (!user) return router.push('/users/signup')
  if (!packages) console.log('no packages')
  else return (
    <>
      <section>
        {showRemovePackages && <RemovePackage setShowRemovePackages={setShowRemovePackages} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setPackages={setPackages} packages={packages} />}
        <div className='table-section'>
          <div>
            <button onClick={() => router.push('packages/edit')}>הוסף</button>
            <button onClick={() => onMultipleRemoval()}>מחק</button>
            <button onClick={() => handleSelectAllChange()}>בחר בכל</button>
            <input type="text" onChange={(e) => filterPackages(e)} />
            <div className='baseline'>יש {packages.length} חבילות</div>
          </div>
          {
            packages.length > packagesPerPage &&
            <Pagination handlePageNumberChange={handlePageNumberChange} numOfPages={numOfPages} currPage={currPage} />
          }
          <div>
            <button onClick={() => router.push('packages/archive')}>ארכיון</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th onClick={() => handleSortChange('apartmentReceiver')}>
                עבור</th>
              <th onClick={() => handleSortChange('fullPackageDescription')}>
                תיאור החבילה</th>
              <th onClick={() => handleSortChange('dateReceived')}>
                תאריך קבלה
              </th>
              <th onClick={() => handleSortChange('lobbyPackReceivedBy')}>
                מקבל החבילה</th>
              <th onClick={() => handleSortChange('notesOnArrival')}>
                הערות</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {packages &&
              packages.slice((currPage - 1) * packagesPerPage, currPage * packagesPerPage).map((p) => (
                <tr key={p.id}>
                  <td><input type="checkbox"
                    value={p.id}
                    onChange={handleCheckboxChange}
                    checked={selectedItems.includes(p.id)}
                  /></td>
                  <td>
                    <button onClick={() => onSingleRemoval(p.id)}>מסירה</button>
                  </td>
                  <td>
                    <button className='round-btn' onClick={() => router.push(`/packages/edit/${p.id}`)}><CiEdit /></button>
                  </td>
                  <td>{p.apartmentReceiver}</td>
                  <td>{p.fullPackageDescription}</td>
                  <td>{utilService.parseDate(p.dateReceived)}</td>
                  <td className='capitalize'>{p.lobbyPackReceivedBy}</td>
                  <td>{p.notesOnArrival}</td>
                  <td ><EmailReminder /></td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </section >
    </>
  )
}
