import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios'
import { Link } from 'react-router-dom'

function ForgetPass() {
    const validation = Yup.object().shape({
        email:Yup.string().required('This is required').email('Invalid email')
      });
      const formOption = {resolver:yupResolver(validation)}
      const {register , handleSubmit , formState} = useForm(formOption)
      const {errors} = formState

    const[user,setUser] = useState({email:''})
    const [error,setError] = useState([])

    
  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };
  const onSubmit =async()=>{
    try {
      const response = await axios.put('http://localhost:2000/api/data/forgotPassword',user)
      console.log(response)
    } catch (error) {
      setError(<p className="alert alert-danger">something went wrong</p>)
    }
  }

    return (
      <>
 <div className="container-div">
  <div className="row">
    <div className="col-md-5 col-md-offset-4">
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="text-center">
            <h3><i className="fa fa-lock fa-4x" /></h3>
            <h2 className="text-center">Forgot Password?</h2>
            <p>You can reset your password here.</p>
            <div className="panel-body">
                <div>{error?error:''}</div>
              <form id="register-form"  autoComplete="off" className="form" onSubmit={handleSubmit(e=>onSubmit(e))} >
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                    <input  name="email" placeholder="email address" className="form-control" type="text" value={user.email}
                     {...register('email')} className={`form-control item ${errors.email ? 'is-invalid' : ''}`}
                     onChange={e=>handleChange(e)}/>
                     <small className="invalid-feedback">{errors.email?.message}</small>
                  </div>
                </div>
                <div className="form-group">
                  <input name="recover-submit" className="btn btn-lg btn-primary btn-block" type="submit" />
                </div>
                {/* <input type="hidden" className="hide" name="token" id="token" defaultValue />  */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
 </>
 )
}

export default ForgetPass
