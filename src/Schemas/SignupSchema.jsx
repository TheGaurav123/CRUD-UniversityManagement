import * as Yup from 'yup';


export const signupSchema = Yup.object({
    Employee_ID : Yup.number().required('*Employee ID required').test('len', 'Invalid Employee ID', val => val && val.toString().length === 6 ).typeError('Invalid Employee ID (Number Only)'),
    Phone : Yup.number().min(0).required('*Phone required').test('len', 'Phone must be 10 digit', val => val && val.toString().length===10).typeError('Invalid Phone (Number Only)'),
    Email : Yup.string().email().required('*Email required'),
    Password : Yup.string().min(6).max(25).required('*Password required'),
    Confirm_Password : Yup.string().required('*Confirm Password required').oneOf([Yup.ref('Password'), null], '*Password not matching')
})