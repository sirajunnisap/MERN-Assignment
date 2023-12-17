
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../Services/userLogin';
import { useAppDispatch } from '../Redux/hooks';
import { updateUserCredentials } from '../Redux/userSlice';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import './style.css';
import { ToastContainer,toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"

type initialValueType = {
  email: string
  password: string
}

const Login: React.FC = () => {


   
  const [respSuccess, setResSuccess] = useState<string | undefined>(undefined);
  const [resError, setResError] = useState<string | undefined>(undefined);
  const [isModalOpen,setIsModalOpen] = useState(false)

  const initialValues: initialValueType = {
    email: '',
    password: '',
  }

   const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Please enter your email'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 digits')
      .matches(/^[a-zA-Z0-9]*$/, 'Password can only contain letters and numbers')
      .required('Please enter your password')
  });

  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
 

  const onSubmit =async (values:initialValueType)=>{

    try {
      const User = await userLogin(values.email,values.password)
      console.log(User,"userData in Login ");
      
      if(User){
        
        const {token,userData} = User
      console.log(token,userData);

  
        dispatch(updateUserCredentials({accessToken:token,userData:userData?.name}))
    
         setResError(undefined)
 
       
        navigate('/profile');
      }
    } catch (err:any) {
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
    }
  }
  
  return (
    <>
      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      >
      <div className='mt-10 w-full flex items-center justify-center' >
      <section className=""  >
          <div className="">
              <div className="signUp-content  ">
                  <div className="signUp-form ">
                  

                      <h2 className="form-title text-lavender ml-28">Sign In </h2>
                      <Form method="POST" className="register-form" id="register-form">
                          <div className="form-group ">
                              <label htmlFor="name" className='pl-1'>
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
                              <label htmlFor="pass" className='pl-1'>
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
                          
                       
            
                        
                          <div className="form-group form-button">
                          <button
                           type="submit"
                          className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#0F5762]"
                            >
                         LOGIN
                         </button>
                          </div>

                    
                          <div className="inline-flex items-center justify-center ">
    <hr className="w-[370px] h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 "/>
    <span className="absolute px font-medium text-gray-900 -translate-x-1/2 bg-white  dark:text-white dark:bg-gray-900">or</span>
</div>


                          <div className="text-sm font-medium text-gray-500 dark:text-gray-300 ml-16 mt-6">
           Not registered? <Link to={'/signup'} className="text-blue-700 hover:underline dark:text-blue-500">Create account</Link>
       </div>
                      </Form>
      
                  </div>
                  <div className="signUp-image hidden md:block">
                      <figure>
                          <img src='https://img.freepik.com/free-vector/sign-concept-illustration_114360-5267.jpg' alt="sing up image" />
                      </figure>
                       <ToastContainer/>
                  </div>
              </div>
          </div>
          
      </section>
      {/* {resError && <p className="fonts text-green text-lg">{resError}</p>} */}
      </div>
      
      
      </Formik>
        </> 
  );
};

export default Login;

