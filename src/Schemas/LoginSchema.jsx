import * as Yup from 'yup'


export const loginSchema = Yup.object({
    Email : Yup.string().email().required('*Email required'),
    Password : Yup.string().min(6).max(25).required('*Password required')
})