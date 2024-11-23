'use client'

import React, { useEffect, useState } from 'react'
import { adminService } from '@/services/admin.service'

const AdminPage = () => {


  useEffect(() => {
    const fetchAdmins = async () => {
      const admins = await adminService.getAdmins();
      setAdmins(admins);
    };
    fetchAdmins();
  })
  const [admins, setAdmins] = useState([]);

  async function onRemoveAdmin(adminId) {
    return adminService.removeAdmin(adminId)
  }

  async function onAddAdmin() {
    return adminService.save()
  }

  // TODO: map all users
  // TODO: Add new user
  // TODO: Edit new user
  // TODO: Remove user
  // TODO: Filter user

  return (

    <>
    <button onClick={() => onAddAdmin()}>Add</button>
      <div>
        {admins.map((admin) => (
          <>
            <div key={admin.id}>{admin.username}</div>
            <button onClick={() => onRemoveAdmin(admin.id)}>Remove</button>
          </>
        ))}
      </div>
    </>
  )
}

export default AdminPage