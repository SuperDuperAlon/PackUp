'use client'
import React, { useEffect, useState } from 'react'
import {packageService} from '@/services/package.service'

const PackagesFilter = ({ onSetFilter }) => {

    const [filterByToEdit, setFilterByToEdit] = useState(packageService.getDefaultFilter());
    function handleChange(e) {
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, receivingTenantFullTenantDesc: e.target.value }));

    }

    useEffect(() => {
        onSetFilter(filterByToEdit);
    }, [filterByToEdit]);
    return (
        <input type="text" onChange={(e) => handleChange(e)} />
    )
}

export default PackagesFilter


