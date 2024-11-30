import React from 'react'

const UserList = ({ users, onRemoveUser, onEditUser }) => {

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>פעולות</th>
                        <th>שם</th>
                        <th>מספר דירה</th>
                        <th>email</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className='table-actions'>
                                <button onClick={() => onRemoveUser(user.id)}>מחק</button>
                                <button onClick={() => onEditUser(user.id)}>ערוך</button>
                            </td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.apartmentNumber}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default UserList