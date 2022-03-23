import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios'
import { useHistory,Link, useParams} from 'react-router-dom';
function ResetPass() {
  let token = useParams()
  let history = useHistory()
  const validation = Yup.object().shape({
    password: Yup.string().required('This is required').min(5,'Atleast 5 char'),
    cpassword: Yup.string().required('This is required').oneOf([Yup.ref("password"), 'password does not match']),

  });

  const formOption = {resolver:yupResolver(validation)}
  const {register , handleSubmit , formState} = useForm(formOption)
  const {errors} = formState

  const [user,setUser] = useState({
    password:'',cpassword:''
  });

  const [error,setError] = useState([]);

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit =async()=>{
    try {
      const response = await axios.put('http://localhost:2000/api/data/resetpassword',({password:user.password, token:token.token}))
      console.log(response)
      history.push('/login')
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
            <h2 className="text-center">Reset Password?</h2>
            <p>Enter your new password here.</p>
            <div className="panel-body">
              <div>{error?error:''}</div>
              <form autoComplete="off" className="form" onSubmit={handleSubmit(e=>onSubmit(e))} >
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                    <input name="password" placeholder="new password" type="password" value={user.password}
                    {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      onChange={e=>handleChange(e)} />
                      <small className="invalid-feedback">{errors.password?.message}</small>
                  </div>
                  <div className="input-group mt-2">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue" /></span>
                    <input name="password" placeholder="confirm password" type="password"  value={user.cpassword}
                     {...register('cpassword')} className={`form-control ${errors.cpassword ? 'is-invalid' : ''}`}
                     onChange={e=>handleChange(e)}/>
                    <small className="invalid-feedback">{errors.cpassword?.message}</small>
                  </div>
                </div>
                <div className="form-group">
                  <button name="recover-submit" className="btn btn-lg btn-primary btn-block" type="submit" >Reset Password</button>
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

export default ResetPass
