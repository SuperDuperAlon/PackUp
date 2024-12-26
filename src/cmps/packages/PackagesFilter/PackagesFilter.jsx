'use client'
import React, { useEffect, useState } from 'react'
import { packageService } from '@/services/package.service'

const PackagesFilter = ({ onSetFilter, filterBy }) => {

    const [filterByToEdit, setFilterByToEdit] = useState(packageService.getDefaultFilter());
    function handleChange(e) {
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, receivingTenantFullTenantDesc: e.target.value }));
    }

useEffect(() => {
if (filterByToEdit.receivingTenantFullTenantDesc !== filterBy.receivingTenantFullTenantDesc) {
    setFilterByToEdit(packageService.getDefaultFilter());
}
}, [filterBy]);

    useEffect(() => {
        onSetFilter(filterByToEdit);
    }, [filterByToEdit]);
    
    return (
        <input type="text" onChange={(e) => handleChange(e)} value={filterByToEdit.receivingTenantFullTenantDesc} />
    )
}

export default PackagesFilter


