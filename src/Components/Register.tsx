
import React, { useState } from 'react'
import userAxios from '../Axios/userAxios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './style.css'
import * as Yup from 'yup';
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

import { Link } from 'react-router-dom';


type initialValueType = {
  name: string
  email: string
  phone: number|undefined
  password: string
  confirmPassword:string
}


const Register: React.FC = () => {

  
  const [respSuccess, setResSuccess] = useState<string | undefined>(undefined);
  const [resError, setResError] = useState<string | undefined>(undefined);
  const [showModal, setShowModal] = useState<boolean>(false);
 
  const initialValues: initialValueType = {
    name: '',
    email: '',
    phone: undefined,
    password: '',
    confirmPassword:''
  }
  
  const validationSchema = Yup.object({
    name: Yup.string()
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Invalid name format')
    .min(3, 'Name must be at least 3 characters')
    .required('Please enter your name'),
    email: Yup.string().email('Invalid email format')
    .required('Please enter your email'),
    phone:  Yup.string()
    .test('is-ten-digits', 'Phone number must have 10 digits', (value) => {

      const digits = value?.replace(/\D/g, '');
  
      if (digits?.length !== 10) {
        return false;
      }
    
  
      return true;
    })
    .required('Please enter your phone number')
    .test('is-valid', 'Invalid phone number', (value) => {
      const digits = value.replace(/\D/g, '');
  
      if (digits.length !== 10) {
        return true; 
      }
  
  
      const firstDigit = digits[0];
      if (digits.split('').every((digit) => digit === firstDigit)) {
        return false; 
      }
      return true;
    }),
    password: Yup.string()
      .min(6, 'Password must be at least 6 digits')
      .matches(/^[a-zA-Z0-9]*$/, 'Password can only contain letters and numbers')
      .required('Please enter your password'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'),],'passwords must match')
    .required('please confirm your password')
  });

  const onSubmit = (values: initialValueType) => {

    console.log(values.name, values.email)
  
    userAxios.post('/signup', { name: values.name, email: values.email, phone: values.phone, password: values.password }).then((res) => {
        console.log("signup response in server side", res.data.message);
        
        setResSuccess(res.data.message)
        setResError(undefined)
        setShowModal(true)
        toast.success('🦄 User signup successfull please verify your mail', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        
    }).catch((err:any)=>{
      console.log(err?.response?.data?.message);
      
      setResError(err?.response?.data?.message)
      setResSuccess(undefined)
      toast.error(resError, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    })
  
  
  }
  

  return (
   
    <Formik
initialValues={initialValues}
validationSchema={validationSchema}
onSubmit={onSubmit}
>
<div className='h-screen w-fulltop-0 flex items-center justify-center' >
<section className=""  >
    <div className="">
        <div className="signUp-content  ">
            <div className="signUp-form ">
                <h2 className="form-title text-lavender">Sign up</h2>
                <Form method="POST" className="register-form" id="register-form">
                    <div className="form-group">
                    <label htmlFor="name" className='pl-1'>
                            <i className="fa-sharp fa-solid fa-user"></i>
                        </label>
                        <Field
                            type="text"
                            name="name"
                            id="name"
                            className="pl-5"
                            placeholder="Your Name"
                        />
                        <ErrorMessage  name='name'>
                                   {
                                    (errorMsg)=><div className='error text-red'>{errorMsg}</div>
                                   }              
                        </ErrorMessage>
                    </div>
                    <div className="form-group" >
                    <label htmlFor="email" className='pl-1' >
                            <i className="fa-sharp fa-solid fa-envelope "></i>
                        </label>
                        <Field
                            type="email"
                            name="email"
                            id="email"
                            className="pl-5"
                            placeholder="Your Email"
                        />
                        <ErrorMessage name='email'>
                           {
                            (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                           }    
                        </ErrorMessage>
                    </div>
                    <div className="form-group">
                        <label htmlFor="num" className='pl-1'>
                            <i className="fa-sharp fa-solid fa-address-book"></i>
                        </label>
                        <Field
                            type="number"
                            name="phone"
                            id="phone"
                            className="pl-5"
                            placeholder="Your Dial number"
                        />
                        <ErrorMessage name='phone'>
                           {
                            (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                           }    
                        </ErrorMessage>
                    </div>
                    <div className="form-group" >
                    <label htmlFor="pass"className='pl-1'>
                            <i className="fa-sharp fa-solid fa-lock"></i>
                        </label>
                        <Field
                            type="password"
                            name="password"
                            id="password"
                            className="pl-5"
                            placeholder="Enter your Password"
                        />
                        <ErrorMessage name='password'>
                           {
                            (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                           }    
                        </ErrorMessage>
                    </div>
                    <div className="form-group">
                    <label htmlFor="re-pass" className='pl-1'>
                            <i className="fa-sharp fa-solid fa-key"></i>
                        </label>
                        <Field
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            className="pl-5"
                            placeholder="Confirm your Password"
                        />
                        <ErrorMessage name='confirmPassword'>
                           {
                            (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                           }    
                        </ErrorMessage>
                    </div>
                    
                    <div className="form-group form-button">
                    <button
                     type="submit"
                    className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#0F5762]"
                      >
                    Sign Up
                   </button>


                   <div className="ml-10 mt-10 text-sm font-medium text-gray-500 dark:text-gray-300">
       I'm already member <Link to={'/login'} className="text-blue-700 hover:underline dark:text-blue-500">Sign in</Link>
         </div>

                    </div>
                </Form>

            </div>
            <div className="signUp-image hidden md:block">
                <figure>
                    <img src='https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7862.jpg?size=626&ext=jpg&ga=GA1.1.589938631.1675981701&semt=ais' alt="sing up image" />
                </figure>
                 <ToastContainer/>
            </div>
        </div>
    </div>
    
</section>

</div>


</Formik>

    
  )
}

export default Register;

