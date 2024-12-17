'use client'

import { useEffect, useState } from 'react';
import { packageService } from '@/services/package.service';
import { userService } from '@/services/user.service';
import PackagesTable from '@/cmps/packages/PackagesMainTable/PackagesTable.jsx'
import RemovePackage from '@/cmps/packages/RemovePackages/RemovePackages';
import Pagination from '@/cmps/general/Pagination/Pagination';
import ExportButton from '@/cmps/general/Buttons/ExportButton/ExportButton';
import RouteButton from '@/cmps/general/Buttons/RouteButton/RouteButton';
import { useAuth } from '@/context/AuthContext';
import { useLoader } from '@/context/LoaderContext'


export default function PackageView() {
    const [filterBy, setFilterBy] = useState(packageService.getDefaultFilter());
    const [sortBy, setSortBy] = useState(packageService.getDefaultSort());
    const [packages, setPackages] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [showRemovePackages, setShowRemovePackages] = useState(false);
    const { admin } = useAuth();
    const { setLoading } = useLoader()

    // Pagination
    const [numOfPages, setNumOfPages] = useState(null)
    const [currPage, setCurrPage] = useState(1)
    const packagesPerPage = 25

    useEffect(() => {
        async function loadPackages() {
            setLoading(true)
            try {
                const data = await packageService.query(filterBy, sortBy)
                if (data) {
                    setPackages(data.filter(p => !p.isCollected))
                    setNumOfPages(Math.ceil(data.filter(p => !p.isCollected).length / packagesPerPage))
                    setLoading(false)
                }
            } catch (error) {
                console.error('Error loading packages:', error)
                setLoading(false)
            }
        }
        loadPackages()
    }, [filterBy, sortBy, currPage])


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

    function filterPackages(e) {
        setCurrPage(1)
        setFilterBy(prevFilterBy => ({ ...prevFilterBy, receivingTenantFullTenantDesc: e.target.value }));
    }

    function handleSortChange(by) {
        const updatedSort = { ...sortBy, sortBy: by, ...sortBy.sortOrder === 1 ? { sortOrder: -1 } : { sortOrder: 1 } };
        setSortBy(updatedSort)
    }
    async function onDeletePackage(packageId) {
        await packageService.remove(packageId)
        setPackages(packages.filter(p => p._id !== packageId))
    }

    async function onSingleRemoval(id) {
        setSelectedItems([id])
        setPackages(packages)
        setShowRemovePackages(!showRemovePackages)
    }

    function onMultipleRemoval() {
        setShowRemovePackages(!showRemovePackages)
    }

    const handleSelectAllChange = () => {
        const filteredPackages = packages.filter(p => p.isCollected === false);
        if (selectedItems.length === filteredPackages.length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(filteredPackages.map(p => p._id));
        }
    };

    if (!packages) return
    else return (
        <>
            <section>
                {showRemovePackages && <RemovePackage setShowRemovePackages={setShowRemovePackages} selectedItems={selectedItems} setSelectedItems={setSelectedItems} setPackages={setPackages} packages={packages} />}
                <div className='table-section'>
                    <div>
                        <RouteButton content={'הוסף'} linkedRoute={'/packages/edit'} />
                        <button disabled={selectedItems.length === 0} onClick={() => onMultipleRemoval()}>מסירה</button>
                        <input type="text" onChange={(e) => filterPackages(e)} />
                        <div className='baseline'>יש {packages ? packages.length : 0} חבילות</div>
                    </div>
                    {packages &&
                        packages.length > packagesPerPage &&
                        <Pagination handlePageNumberChange={handlePageNumberChange} numOfPages={numOfPages} currPage={currPage} />
                    }
                    <div>
                        {admin.isAdmin && <ExportButton />}
                        <RouteButton content={'ארכיון'} linkedRoute={'packages/archive'} />
                    </div>
                </div>
                < PackagesTable packages={packages} currPage={currPage} packagesPerPage={packagesPerPage} selectedItems={selectedItems} handleCheckboxChange={handleCheckboxChange} onSingleRemoval={onSingleRemoval} handleSelectAllChange={handleSelectAllChange} handleSortChange={handleSortChange} onDeletePackage={onDeletePackage} />
            </section >
        </>
    )
}
