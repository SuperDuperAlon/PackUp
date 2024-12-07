'use client'

import { useState, useEffect } from 'react'
import { adminService } from '@/services/admin.service'

const EditAdmin = ({ adminIdToEdit, onCloseEditForm }) => {
    const [adminToEdit, setAdminToEdit] = useState(adminService.getEmptyAdmin())

    useEffect(() => {
        if (!adminIdToEdit) return;
        loadAdmin();
    }, [adminIdToEdit]);

    async function loadAdmin() {
        try {
            const admin = await adminService.getAdminById(adminIdToEdit);
            setAdminToEdit(admin);
        } catch (err) {
            console.log("Had issues in admin details", err);
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setAdminToEdit((prev) => ({ ...prev, [field]: value }))
    }

    function handleRadioChange({ target }) {
        let { value, name: field } = target
        setAdminToEdit((prev) => ({ ...prev, [field]: JSON.parse(value) }))
    }

    async function onSaveAdmin(ev) {
        console.log(adminToEdit, 'admin to edit');
        ev.preventDefault()
        try {
            adminToEdit.username,
                // adminToEdit.password = password,
                await adminService.save(adminToEdit)
            closeForm()
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeForm();
            }
        };
        window.addEventListener('keydown', handleEscape);
        return () => {
            window.removeEventListener('keydown', handleEscape);
        };
    }, []);

    function closeForm() {
        onCloseEditForm()
    }

    if (!adminToEdit) return console.log('no id')
    return (
        <>
            <section className='edit_class__section'>
                <form className='edit_class__form' onSubmit={onSaveAdmin}>
                    <button onClick={closeForm} className="close-btn-x">X</button>
                    <div className='edit_class__form_container'>
                        <label htmlFor="username">שם משתמש</label>
                        <input type='text'
                            id="username"
                            name="username"
                            value={adminToEdit.username}
                            onChange={handleChange} />
                    </div>
                    <div className='edit_class__form_container'>
                        <label>
                            <input
                                type="radio"
                                name="isAdmin"
                                value="true"
                                checked={adminToEdit.isAdmin}
                                onChange={handleRadioChange}
                            />
                            מנהל
                        </label>
                    </div>
                    <div>
                        <label>
                            <input
                                type="radio"
                                name="isAdmin"
                                value="false"
                                checked={!adminToEdit.isAdmin}
                                onChange={handleRadioChange}
                            />
                            לא מנהל                        </label>
                    </div>
                    <div className="flex-row">
                        <button>{adminToEdit._id ? "שמור" : "הוסף"}</button>
                        <button type='button' onClick={closeForm}>סגור</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EditAdmin