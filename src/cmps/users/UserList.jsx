import React from 'react'

const UserList = ({ users, onRemoveUser, onEditUser }) => {

console.log(users);


    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>פעולות</th>
                        <th>שם</th>
                        <th>מספר דירה</th>
                        <th>email</th>
                        <th>טלפון</th>
                        <th>תאריך לידה</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td className='table-actions'>
                                <button onClick={() => onRemoveUser(user._id)}>מחק</button>
                                <button onClick={() => onEditUser(user._id)}>ערוך</button>
                            </td>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.apartmentNumber}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.dateOfBirth}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </>
    )
}

export default UserList