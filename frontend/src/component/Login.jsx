import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios'
import { useHistory,Link} from 'react-router-dom';
import Lodar from '../common/Lodar';

function Login() {
  let history = useHistory()
  const validation = Yup.object().shape({
    email:Yup.string().required('This is required').email('Invalid email'),
    password: Yup.string().required('This is required').min(5,'Atleast 5 char')
  });

  const formOption = {resolver:yupResolver(validation)}
  const {register , handleSubmit , formState} = useForm(formOption)
  const {errors} = formState

  const [user,setUser] = useState({
    email:'',password:''
  });

  const [error,setError] = useState([]);
  const [loading , setLoading] = useState(false)

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };
  const onSubmit =async()=>{
    try {
      const {data} = await axios.post('http://localhost:2000/api/data/userLogin',user)
      localStorage.setItem("token",data.token)
      localStorage.setItem("_id",data._id)
      console.log(data)
      history.push("/")
    } catch (error) {
      setError(<p className="alert alert-danger">something went wrong</p>)
    }
  }
    return (
        <>
        <div className="registration-form">
        <form onSubmit={handleSubmit(e=>onSubmit(e))} autoComplete="off" >
        <div className="form-icon">
        <span><i className="icon icon-user"/></span>
        </div>
        <div>{error?error:''}</div>
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
        
      <button type="submit" className="btn btn-block create-account">Sign In</button>
      <Link to="/register" className="btn btn-link">create an account</Link>
      <Link to="/forgetPass" className="btn btn-link">Forget Password</Link>
    </div>
   </form>
   </div>
    </>
    )
}
export default Login
