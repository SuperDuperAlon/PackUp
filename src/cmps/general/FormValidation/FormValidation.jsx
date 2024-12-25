import { useState } from 'react'

const FormValidation = ({ dataToValidate, formData }) => {
    const [errors, setErrors] = useState('')

    const formSchema = addPackageFormSchema(dataToValidate);
    try {
        formSchema.parse(formData);
        setErrors({}); // Clear errors if validation passes
        return true;
    } catch (error) {
        console.log(error, 'errors')
        if (error.errors) {
            const fieldErrors = {};
            error.errors.forEach((err) => {
                fieldErrors[err.path[0]] = err.message;
            });
            setErrors(fieldErrors);
        }
    }
    return
};

export default FormValidation