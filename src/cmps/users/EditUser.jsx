import { userService } from '@/services/user.service';
import React, { useEffect, useState } from 'react'

const EditUser = ({ userIdToEdit, onCloseEditForm }) => {
    const [userToEdit, setUserToEdit] = useState(userService.getEmptyUser())

    useEffect(() => {
        if (!userIdToEdit) return;
        loadUser();
    }, [userIdToEdit]);

    async function loadUser() {
        try {
            const user = await userService.getUserById(userIdToEdit);
            setUserToEdit(user);
        } catch (err) {
            console.log("Had issues in user details", err);
        }
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setUserToEdit((prev) => ({ ...prev, [field]: value }))
    }

    console.log(userToEdit);


    async function onSaveUser(ev) {
        ev.preventDefault()
        try {
            userToEdit.dateCreated = Date.now(),
                await userService.save(userToEdit)
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
    
    if (!userToEdit) return console.log('no id')
    return (
        <>
            <section className='edit_class__section'>
                <form className='edit_class__form' onSubmit={onSaveUser}>
                    <button onClick={closeForm} className="close-btn-x">X</button>
                    <div className='edit_class__form_container'>
                        <label htmlFor="firstName">שם פרטי</label>
                        <input type='text'
                            id="firstName"
                            name="firstName"
                            value={userToEdit.firstName}
                            onChange={handleChange} />
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="lastName">שם משפחה</label>
                        <input type='text'
                            id="lastName"
                            name="lastName"
                            value={userToEdit.lastName}
                            onChange={handleChange} />
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="apartmentNumber">מספר דירה</label>
                        <input type='number'
                            id="apartmentNumber"
                            name="apartmentNumber"
                            value={userToEdit.apartmentNumber}
                            onChange={handleChange} />
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="email">מייל</label>
                        <input type='email'
                            id="email"
                            name="email"
                            value={userToEdit.email}
                            onChange={handleChange} />
                    </div>
                    <div className='edit_class__form_container'>
                        <label htmlFor="phone">טלפון</label>
                        <input type='phone'
                            id="phone"
                            name="phone"
                            value={userToEdit.phone}
                            onChange={handleChange} />
                    </div>
                    <div className="flex-row">
                        <button>{userToEdit.id ? "שמור" : "הוסף"}</button>
                        <button type='button' onClick={closeForm}>סגור</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default EditUser