'use client'

import React, { useEffect, useState } from 'react'
import { adminService } from '@/services/admin.service'
import EditAdmin from '@/cmps/admins/EditAdmin'
import AdminFilter from '@/cmps/admins/AdminFilter'

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
      <AdminFilter onSetFilter={onSetFilter} />
      {showEditForm && <EditAdmin adminIdToEdit={adminIdToEdit} onCloseEditForm={closeEditForm} />}
      <button onClick={() => onEditAdmin('')}>Add</button>
      {admins.map((admin) => (
        <div key={admin.id}>
          <div>{admin.username}</div>
          <button onClick={() => onRemoveAdmin(admin.id)}>Remove</button>
          <button onClick={() => onEditAdmin(admin.id)}>Edit</button>
        </div>
      ))}
    </>
  )
}

export default AdminView