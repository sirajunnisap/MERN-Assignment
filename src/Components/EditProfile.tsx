import React from 'react'
import { UserType } from '../Models/userModel'
import { updateProfile } from '../Services/userData'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal'

type initialValueType = {
    name: string
    email: string
    phone: number|null
  }

  type EditProfileProps = {
    isOpen: boolean;
    closeModal: () => void;
    setUser:React.Dispatch<React.SetStateAction<UserType | undefined>>;
    userData:UserType|undefined
  };


const EditProfile: React.FC<EditProfileProps> = ({ isOpen, closeModal,setUser,userData }) => {


   const initialValues: initialValueType = {
    name: userData?.name || '',
    email: userData?.email || '',
    phone: userData?.phone || null
  }
  

  const validationSchema = Yup.object({
    name: Yup.string()
    .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Invalid name format')
    .min(3, 'Name must be at least 3 characters')
    .required('Please enter your name'),
    email: Yup.string().email('Invalid email format').required('Please enter your email'),
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
  });

  
  const onSubmit = async (values:initialValueType)=>{
        
    console.log(values,"name updated");

    const updatedUser = await updateProfile(values)
    console.log(updatedUser,"updated user");


    closeModal();
        setUser(updatedUser)
      }


  return (
    
<Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit Profile Modal"
      className="modal" 
      overlayClassName="modal-overlay" 
    >
<Formik
initialValues={initialValues}
validationSchema={validationSchema}
onSubmit={onSubmit}
>
       <div className="fixed top-36 left-96 right- flex items-center justify-center px-5 py-5">
        

    <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl " >
        <div className="md:flex">
           
           
            <div className="w-full py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-teal-700">Edit Profile</h1>
                    <p>Update your profile information</p>
                </div>
                <div>
                <Form method="POST" className="register-form" id="register-form">
                    <div className="flex -mx-3">
                        <div className="w-1/2 px-3 mb-5">
                           
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <Field type="text" name="name"
                            id="name" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Enter Name"/> <ErrorMessage  name='name'>
                            {
                             (errorMsg)=><div className='error text-red'>{errorMsg}</div>
                            }              
                 </ErrorMessage>
                            </div>
                        </div>
                        <div className="w-1/2 px-3 mb-5">
                            
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-account-outline text-gray-400 text-lg"></i></div>
                                <Field type="text"  name="email"
                            id="email"
                                 className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Email"/>
                                 <ErrorMessage name='email'>
                           {
                            (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                           }    
                        </ErrorMessage>
                            </div>
                        </div>
                    </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            
                            <div className="flex">
                                <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center"><i className="mdi mdi-email-outline text-gray-400 text-lg"></i></div>
                                <Field type="text" name="phone"
                            id="phone" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Phone"/>
                            <ErrorMessage name='phone'>
                           {
                            (errorMsg)=> <div className='error text-red'>{errorMsg}</div>
                           }    
                        </ErrorMessage>
                            </div>
                        </div>
                    </div>
                    <div className='form-group'>
             
       
      </div>
                    <div className="flex -mx-3">
                        <div className="w-full px-3 mb-5">
                            <button type='submit' className="block w-full max-w-xs mx-auto bg-teal-500 hover:bg-teal-700 focus:bg-teal-700 text-white rounded-lg px-3 py-3 font-semibold">Save Changes</button>
                        </div>
                    </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
    
    
</div>

</Formik> 
</Modal>
  )
}

export default EditProfile

