import { adminService } from '@/services/admin.service';
import { useEffect, useState } from 'react';

const AdminFilter = ({ onSetFilter }) => {
    const [filterByToEdit, setFilterByToEdit] = useState(adminService.getDefaultFilter());

    function handleChange(e) {
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, username: e.target.value }));
    }

    useEffect(() => {
        onSetFilter(filterByToEdit);
    }, [filterByToEdit]);


    return (
        <input type="text" onChange={(e) => handleChange(e)} />
    )
}

export default AdminFilter