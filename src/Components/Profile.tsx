import React, { useState, useEffect } from 'react'
import { profile } from '../Services/userData'
import { UserType} from '../Models/userModel'
import { useNavigate } from 'react-router-dom'
import EditProfile from './EditProfile'
import { Link } from 'react-router-dom'
import { logoutUser } from '../Redux/userSlice'
import { useDispatch } from 'react-redux'

function Profile() {
  const [user, setUser] = useState<UserType | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    const UserProfile = async () => {
      const User = await profile();
      console.log(User, "userData");
      setUser(User);
    
    };
    UserProfile();
  }, []);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }
 
  const handleSignOut = () => {
    
    dispatch(logoutUser({}))

    navigate('/admin/login');
  };
  return (
    <>
      <div className={isModalOpen ? 'blur' : ''}>
       
        <section className="pt-20 bg-blueGray-50 ">
        <div className="flex mx-60 rounded-xl  border-gray-100 border-2 " style={{ marginTop: "30px", overflow: "hidden" }}>
            <div className="flex  ml-16  mt-16 justify-between items-center">
            
              <div className="m-10">
                <h2 className="form-title text-lavender">PROFILE</h2>
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <p className="profile-field">Name: {user?.name}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="name">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <p className="profile-field">Email: {user?.email}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="email">
                    <i className="zmdi zmdi-email"></i>
                  </label>
                  <p className="profile-field">Phone: {user?.phone}</p>
                </div>
              
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12  font-normal text-pink-500 cursor-pointer" onClick={openModal}>
                      <i className='fas fa-edit mr2 text-lg'></i>
                      Edit Profile
                    </div>
                      
                  </div>
                </div>
                 
                <div>
               
       
    
        <Link to={''} onClick={handleSignOut}
                         
                          className="w-full ml-20 text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#0F5762]"
                            >
                         LOGOUT
                         </Link>
                </div>
              </div>
               
            </div>
            <div className=" w-1/2 mt-32 ml-20"> 
                        <img src="https://c4.wallpaperflare.com/wallpaper/461/18/546/disney-disney-pixar-movies-animated-movies-wallpaper-preview.jpg" className="img-fluid" alt="Sample image" />
                </div>
           
          </div>

        </section>
      </div>
      <EditProfile isOpen={isModalOpen} closeModal={closeModal} setUser={setUser} userData={user} />
    </>
  );
}

export default Profile;

