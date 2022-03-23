import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import {Link} from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios'

function Register() {
  const validation = Yup.object().shape({
    name:Yup.string().required('This is required').min(4,'atleast 4 char').max(30,'max limit 30'),
    email:Yup.string().required('This is required').email('Invalid email'),
    mobile: Yup.string().required('This is required').max(10,'Invalid Number').min(10,'Invalid number'),
    password: Yup.string().required('This is required').min(5,'Atleast 5 char'),
    profession:Yup.string().required('This is required').min(4,'atleast 4 char').max(30,'max limit 30'),
  });

  const formOption = {resolver:yupResolver(validation)}
  const {register , handleSubmit , formState} = useForm(formOption)
  const {errors} = formState

  const [user,setUser] = useState({
    name:'',email:'',password:'',mobile:'',profession:''
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
  const onSubmit =async()=>{
    try {
      let formData = new FormData()
      formData.append("name",user.name)
      formData.append("email",user.email)
      formData.append("password",user.password)
      formData.append("mobile",user.mobile)
      formData.append("profession",user.profession)
      formData.append("profile",profile)
      const response = await axios.post('http://localhost:2000/api/data/postUser',formData)
      console.log(response)
      
    } catch (error) {
      setError(<p className="alert alert-danger">something went wrong</p>)
    }
  }
    return (
        <>
        <div className="registration-form">
        <form onSubmit={handleSubmit(e=>onSubmit(e))} autoComplete="off" >
        {/* <div className="form-icon"> */}
        <span>
        <div className="profile-img">
         <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0qEV_mEF19gs68CDaSmZ4e0kssbxyOAMbw&usqp=CAU" height="100px" alt=""/>
          <div className="file btn btn-lg btn-primary">
            Post Photo
            <input type="file" name="profile" onChange={e=>profileChange(e)}/>
           </div>
          </div>
        </span>
        {/* </div> */}
        <div>{error?error:''}</div>
        <div className="form-group">
       <input type="text" name="name" placeholder="Full Name" value={user.name} 
       {...register('name')} className={`form-control item ${errors.name ? 'is-invalid' : ''}`}
       onChange={e=>handleChange(e)} />
       <small className="invalid-feedback">{errors.name?.message}</small>
        </div>
        <div className="form-group">
       <input type="text" name="email" placeholder="Email" value={user.email} 
        {...register('email')} className={`form-control item ${errors.email ? 'is-invalid' : ''}`}
        onChange={e=>handleChange(e)}/>
        <small className="invalid-feedback">{errors.email?.message}</small>
        </div>
        <div className="form-group">
        <input type="password" name="password" placeholder="Password" value={user.password} 
        {...register('password')} className={`form-control item ${errors.password ? 'is-invalid' : ''}`}
        onChange={e=>handleChange(e)}/>
        <small className="invalid-feedback">{errors.password?.message}</small>
        </div>

      <div className="form-group">
      <input type="text" name="mobile" placeholder="Phone Number" value={user.mobile} 
     {...register('mobile')} className={`form-control item ${errors.mobile ? 'is-invalid' : ''}`}
     onChange={e=>handleChange(e)}/>
     <small className="invalid-feedback">{errors.mobile?.message}</small>
      </div>

      <div className="form-group">
      <input type="text" name="profession" placeholder="Profession" value={user.profession} 
     {...register('profession')} className={`form-control item ${errors.profession ? 'is-invalid' : ''}`}
     onChange={e=>handleChange(e)}/>
     <small className="invalid-feedback">{errors.profession?.message}</small>
      </div>

    <div className="form-group">
      <button type="submit" className="btn btn-block create-account">Create Account</button>
      <Link to="/login" className="btn btn-link">have an account </Link>
    </div>
   </form>
   </div>

    </>
    )
}

export default Register
