import React from 'react'
import { adminService } from '@/services/admin.service'

const EditAdmins = () => {
    const [adminToEdit, setAdminToEdit] = useState(adminService.getEmptyAdmin())
    
    return (
        <div>EditAdmins</div>
    )
}

export default EditAdmins