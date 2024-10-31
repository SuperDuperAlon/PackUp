import React from 'react'

const FormValidation = ({ input, regex, successMessage, errorMessage }) => {

    const regexToTest = new RegExp(regex)
    const isRegexValid = regexToTest.test(input)

    if (!input) return <div className='validation'></div>
    else return (
        <div className={`validation ${isRegexValid ? 'success' : 'error'}`}>
            {isRegexValid ? successMessage : errorMessage}
        </div>
    )
}
export default FormValidation