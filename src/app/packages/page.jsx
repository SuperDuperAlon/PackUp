'use client'

import { useEffect, useState } from 'react';
import { packageService } from '@/services/package.service';
import { userService } from '@/services/user.service';
import EmailReminder from '@/cmps/packages/EmailReminder';
import PackagesTableBody from '@/cmps/packages/PackagesMainTable/PackagesTableBody.jsx'
import PackagesTableHead from '@/cmps/packages/PackagesMainTable/PackagesTableHead.jsx'
import { useRouter } from 'next/navigation'
import { utilService } from '@/services/util.service';
import RemovePackage from '@/cmps/packages/RemovePackages/RemovePackages';
import Pagination from '@/cmps/general/Pagination/Pagination';
import ExportButton from '@/cmps/general/Buttons/ExportButton/ExportButton';
import { CiEdit } from "react-icons/ci";


export default function PackageView() {

    const [filterBy, setFilterBy] = useState(packageService.getDefaultFilter());
    const [sortBy, setSortBy] = useState(packageService.getDefaultSort());
    const [packages, setPackages] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [users, setUsers] = useState(null);
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
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const users = await userService.getUsers();
            setUsers(users)
        } catch (err) {
            console.log("Had issues in users", err);
        }
    }

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
            setSelectedItems(filteredPackages.map(p => p._id));
        }
    };

    function filterPackages(e) {
        setCurrPage(1)
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, receivingTenantFullTenantDesc: e.target.value }));
    }

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, sortBy: by, ...sortBy.sortOrder === 1 ? { sortOrder: -1 } : { sortOrder: 1 } };
        setSortBy(updatedSort)
    }

    async function onSingleRemoval(id) {
        setSelectedItems([id])
        setPackages(packages)
        setShowRemovePackages(!showRemovePackages)
    }

    function onMultipleRemoval() {
        setShowRemovePackages(!showRemovePackages)
    }

    console.log(packages);


    if (!packages && !users) console.log('no packages')
    else return (
        <>
            <section>
                {showRemovePackages && <RemovePackage setShowRemovePackages={setShowRemovePackages} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setPackages={setPackages} packages={packages} />}
                <div className='table-section'>
                    <div>
                        <button onClick={() => router.push('packages/edit')}>הוסף</button>
                        <button disabled={selectedItems.length === 0} onClick={() => onMultipleRemoval()}>מחק</button>
                        <input type="text" onChange={(e) => filterPackages(e)} />
                        <div className='baseline'>יש {packages ? packages.length : 0} חבילות</div>
                    </div>
                    {packages &&
                        packages.length > packagesPerPage &&
                        <Pagination handlePageNumberChange={handlePageNumberChange} numOfPages={numOfPages} currPage={currPage} />
                    }
                    <div>
                        <ExportButton />
                        <button onClick={() => router.push('packages/archive')}>ארכיון</button>
                    </div>
                </div>
                <table>
                    <PackagesTableHead handleSortChange={handleSortChange} handleSelectAllChange={handleSelectAllChange} />
                    < PackagesTableBody packages={packages} currPage={currPage} packagesPerPage={packagesPerPage} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} onSingleRemoval={onSingleRemoval} router={router}/>
                </table>
            </section >
        </>
    )
}
