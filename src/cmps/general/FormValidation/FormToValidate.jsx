import React from 'react'

const FormToValidate = ({ input, condition, successMessage, errorMessage }) => {
    if (!input) return <div className='validation'></div>
    else return (
        <div className={`validation ${condition ? 'success' : 'error'}`}>
            {condition ? successMessage : errorMessage}
        </div>
    )
}

export default FormToValidate