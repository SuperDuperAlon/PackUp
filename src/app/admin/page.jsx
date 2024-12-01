'use client'

import React, { useEffect, useState } from 'react'
import { adminService } from '@/services/admin.service'
import EditAdmin from '@/cmps/admins/EditAdmin'
import AdminFilter from '@/cmps/admins/AdminFilter'
import AdminList from '@/cmps/admins/AdminList'

const AdminView = () => {
  const [admins, setAdmins] = useState([]);
  const [filterBy, setFilterBy] = useState(adminService.getDefaultFilter());
  const [showEditForm, setShowEditForm] = useState(false);
  const [adminIdToEdit, setAdminIdToEdit] = useState(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      const admins = await adminService.getAdmins(filterBy);
      setAdmins(admins);
    };
    fetchAdmins();
  }, [filterBy])


  async function onRemoveAdmin(adminId) {
    return adminService.removeAdmin(adminId)
  }

  async function onEditAdmin(adminId) {
    setAdminIdToEdit(adminId)
    setShowEditForm(true)
  }

  function onSetFilter(filterBy) {
    setFilterBy(filterBy)
  }

  function closeEditForm() {
    setShowEditForm(false)
    setAdmins(admins)
  }
  return (
    <>
      <div className='admin-view'>
        <button onClick={() => onEditAdmin('')}>הוסף</button>
        {showEditForm && <EditAdmin adminIdToEdit={adminIdToEdit} onCloseEditForm={closeEditForm} />}
        <AdminFilter onSetFilter={onSetFilter} />
      </div>
      <AdminList admins={admins} onRemoveAdmin={onRemoveAdmin} onEditAdmin={onEditAdmin} />
    </>
  )
}

export default AdminView