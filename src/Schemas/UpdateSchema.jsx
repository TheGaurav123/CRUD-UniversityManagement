import * as Yup from 'yup'



export const updateSchema = Yup.object({
    Student_Name: Yup.string().min(2,'Minimum 2 Character required').max(55,'Maximum 55 Characters Only').required('*Student Name required'),
    Father_Name: Yup.string().min(2,'Minimum 2 Character required').max(55,'Maximum 55 Characters Only').required("*Father's Name required"),
    Mother_Name: Yup.string().min(2,'Minimum 2 Character required').max(55,'Maximum 55 Characters Only').required("*Mother's Name required"),
    Phone : Yup.number().test('len', 'Phone must be 10 digits', val => val && val.toString().length === 10).required('*Phone required').typeError('Invalid Phone Number'),
    DOB: Yup.string().required('*DOB required'),
    Branch: Yup.string().required("*Branch required"),
    Email : Yup.string().email()
})