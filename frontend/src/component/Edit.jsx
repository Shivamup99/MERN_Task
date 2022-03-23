import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios'


function Edit() {
    let token = localStorage.getItem('token')
    let _id = localStorage.getItem('_id')
    const validation = Yup.object().shape({
        name:Yup.string().required('This is required').min(4,'atleast 4 char').max(30,'max limit 30'),
        email:Yup.string().required('This is required').email('Invalid email'),
        mobile: Yup.string().required('This is required').max(10,'Invalid Number').min(10,'Invalid number'),
        profession:Yup.string().required('This is required').min(4,'atleast 4 char').max(30,'max limit 30'),
      });
    
      const formOption = {resolver:yupResolver(validation)}
      const {register , handleSubmit , formState} = useForm(formOption)
      const {errors} = formState
    
      const [user,setUser] = useState({
        name:'',email:'',mobile:'',profession:''
      });
    
      const [profile,setProfile] = useState('')
    
      const [error,setError] = useState([])
    
      const handleChange = event => {
        setUser({
          ...user,
          [event.target.name]: event.target.value
        });
      };
    
      const profileChange =e=>{
        setProfile(e.target.files[0])
      }

      useEffect(()=>{
        loadUser();
      },[])

      const loadUser = async()=>{
        try {
          let response = await axios.get(`http://localhost:2000/api/data/getUserID/${_id}`,{
            headers:{Authorization :`Bearer ${token}`}
          })
          console.log(response.data)
          setUser(response.data)
          setProfile(profile)
        } catch (error) {
          console.log(error)
        }
      }

      const onSubmit =async()=>{
        try {
          let formData = new FormData()
          formData.append("name",user.name)
          formData.append("email",user.email)
          formData.append("mobile",user.mobile)
          formData.append("profession",user.profession)
          formData.append("profile",profile)

          const putData = await axios.put(`http/localhost:2000/api/data/putUser/${_id}`,formData,{
            headers:{Authorization:`Bearer ${token}`}
          })
         // setUser(putData)
         // setProfile(profile)
          console.log(putData.data)
          console.log(profile)
          
        } catch (error) {
          setError(<p className="alert alert-danger">something went wrong</p>)
        }
      }
    return (
        <>
<div className="modal-header">
  <h5 className="modal-title">Update Profile</h5>
  <Link to="/profile"> <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" /></Link>
</div>

                <div className="registration-form">
      
        <form onSubmit={handleSubmit(e=>onSubmit(e))} >
        {/* <div className="form-icon"> */}
        <span>
        <div className="profile-img mb-3">
                            <img src={`http://localhost:2000/${user.profile}`} alt="" style={{height:'80px'},{width:'100px'}}/>
                            
                        </div>
                        <div className="btn btn-info mb-2 ml-5">
                              
                                <input type="file" name="file" onChange={e=>profileChange(e)}/>
                            </div> 
        </span>
        {/* </div> */}
        <div>{error?error:''}</div>
        <div className="form-group">
       <input type="text" name="name" placeholder="Full Name" value={user.name} 
      //  {...register('name')} className={`form-control item ${errors.name ? 'is-invalid' : ''}`}
      className="form-control item"
       onChange={e=>handleChange(e)} />
       <small className="invalid-feedback">{errors.name?.message}</small>
        </div>
        <div className="form-group">
       <input type="text" name="email" placeholder="Email" value={user.email} 
        //{...register('email')} className={`form-control item ${errors.email ? 'is-invalid' : ''}`}
        className="form-control item"
        onChange={e=>handleChange(e)}/>
        <small className="invalid-feedback">{errors.email?.message}</small>
        </div>

      <div className="form-group">
      <input type="text" name="mobile" placeholder="Phone Number" value={user.mobile} 
 //  {...register('mobile')} className={`form-control item ${errors.mobile ? 'is-invalid' : ''}`}
     className="form-control item"
     onChange={e=>handleChange(e)}/>
     <small className="invalid-feedback">{errors.mobile?.message}</small>
      </div>

      <div className="form-group">
      <input type="text" name="profession" placeholder="Profession" value={user.profession} 
     //{...register('profession')} className={`form-control item ${errors.profession ? 'is-invalid' : ''}`}
     className="form-control item"
     onChange={e=>handleChange(e)}/>
     <small className="invalid-feedback">{errors.profession?.message}</small>
      </div>

    <div className="form-group">
      <button type="submit" className="btn btn-block create-account">Update User</button>
    </div>
   </form>
   </div>
        </>
    )
}

export default Edit
