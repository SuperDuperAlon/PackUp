import React from 'react'

const AdminList = ({ admins, onRemoveAdmin, onEditAdmin }) => {
    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>פעולות</th>
                        <th>שם</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td className='table-actions'>
                                <button onClick={() => onRemoveAdmin(admin.id)}>מחק</button>
                                <button onClick={() => onEditAdmin(admin.id)}>ערוך</button>
                            </td>
                            <td>{admin.username}</td>
                            <td>
                                {admin.isManager ? 'מנהל' : 'משתמש'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default AdminList