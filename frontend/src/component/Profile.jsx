import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Edit from './Edit'
import Modal from 'react-modal'
import Footer from './Footer'
import './Profile.css'
function Profile() {
    let _id = localStorage.getItem('_id')
    let token = localStorage.getItem('token')
    const [user,setUser] = useState([])
    const [modalIsOpen,setModalIsOpen] = useState(false)
    console.log(_id)

    useEffect(()=>{
        loadUser()
    },[]);

    const loadUser = async()=>{
      try {
        let response = await axios.get(`http://localhost:2000/api/data/getUserID/${_id}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        setUser(response.data)
        console.log(response.data)
      } catch (error) {
          console.log(error)
      }
    }
    return (
        <>
         
     <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src={`http://localhost:2000/${user.profile}`} alt=""/>
                            {/* <div className="file btn btn-lg btn-primary">
                                Change Photo
                                <input type="file" name="file"/>
                            </div> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                                    <h5>
                                        {user.name}
                                    </h5>
                                    <h6>
                                        {user.profession?user.profession:'Unknown Profession'}
                                    </h6>
                                    <p className="proile-rating">RANKINGS : <span>{(user.mobile)%10}</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active"  data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">About me</a>
                                </li>
                                <li className="nav-item">
                                    <Link to="/address" className="nav-link active"  data-toggle="tab" role="tab" aria-controls="home" aria-selected="true">Address</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                      <Link to="/"> <input type="submit" className="profile-edit-btn btn-info"  value="Home Page"/></Link>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>WORK LINK</p>
                            <a href="https://www.blogger.com/">Blogging Page</a><br/>
                            <a href="https://resume-shivam.herokuapp.com/">My Resume</a><br/>
                            <a href="https://www.github.com/shivamup99/">Github Profile</a>
                            <p>SKILLS</p>
                            <a href="">Web Designer</a><br/>
                            <a href="">Web Developer</a><br/>
                            <a href="">GitHub , Heroku</a><br/>
                            <a href="">Node , React ,MongoDB</a><br/>
                        </div>
                       
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user._id}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Name</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.name}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Email</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.email}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Phone</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.mobile}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Profession</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.profession?user.profession:'Unknown Profession'}</p>
                                            </div>
                                        </div>
                            </div>
                        
                            <Link to={`/edit/user/${_id}`} className="btn btn-info">Edit Profile</Link> 
        
                        </div>
                       
                    </div>
                    
                </div>
            </form>     
                
        </div>
            <Footer />
          
        </>
    )
}

export default Profile
