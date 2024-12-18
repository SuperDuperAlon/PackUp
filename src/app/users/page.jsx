'use client'

import React, { useEffect, useState } from 'react'
import { userService } from '@/services/user.service'
import UserList from '../../cmps/users/UserList'
import EditUser from '../../cmps/users/EditUser'
import UserFilter from '../../cmps/users/UserFilter'

const UserView = () => {
    const [users, setUsers] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [userIdToEdit, setUserIdToEdit] = useState(null);
    const [filterBy, setFilterBy] = useState(userService.getDefaultFilter());

    useEffect(() => {
        fetchUsers();
    }, [filterBy])

    async function fetchUsers() {
        const users = await userService.getUsers(filterBy);
        setUsers(users);
    }

    async function onRemoveUser(userId) {
        await userService.removeUser(userId)
        fetchUsers()
    }

    async function onEditUser(userId) {
        setUserIdToEdit(userId)
        setShowEditForm(true)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function closeEditForm() {
        setShowEditForm(false)
        setUsers(users)
        fetchUsers()
    }

    return (
        <>
            <div className='admin-view'>
                <button onClick={() => onEditUser('')}>הוסף</button>
                {showEditForm && <EditUser userIdToEdit={userIdToEdit} onCloseEditForm={closeEditForm} />}
                <UserFilter onSetFilter={onSetFilter} />
            </div>
            <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser} />
        </>
    )
}

export default UserView