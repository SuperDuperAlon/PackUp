import { userService } from '@/services/user.service';
import { useEffect, useState } from 'react';

const UserFilter = ({ onSetFilter }) => {
    const [filterByToEdit, setFilterByToEdit] = useState(userService.getDefaultFilter());
    function handleChange(e) {
        setFilterByToEdit(prevFilterBy => ({ ...prevFilterBy, text: e.target.value }));
    }


    useEffect(() => {
        onSetFilter(filterByToEdit);
    }, [filterByToEdit]);

    return (
        <>
            <input type="text" onChange={(e) => handleChange(e)} />
        </>

    )
}

export default UserFilter