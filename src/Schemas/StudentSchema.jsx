import * as Yup from 'yup'



export const studentSchema = Yup.object({
    Student_Name : Yup.string().min(2,'Minimum 2 Character required').max(55,'Maximum 55 Characters Only').required('*Student Name required'),
    Father_Name : Yup.string().min(2,'Minimum 2 Character required').max(55,'Maximum 55 Characters Only').required("*Father's Name required"),
    Mother_Name : Yup.string().min(2).max(55).required("*Mother's Name required"),
    Aadhaar : Yup.number().required('*Aadhaar required').test('len', 'Aadhaar must be 12 digits', val => val && val.toString().length===12).typeError('Invalid Aadhaar ID'),
    Phone : Yup.number().required('*Phone required').test('len', 'Phone must be 10 digits', val => val && val.toString().length === 10).typeError('Invalid Phone Number'),
    DOB : Yup.string().required('*DOB required'),
    Course : Yup.string(),
    Branch : Yup.string(),
    Email : Yup.string().email().optional()
})