import React, { useState ,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios'
import { useHistory,Link} from 'react-router-dom';
import Footer from './Footer'
function Address() {
    let token = localStorage.getItem('token')
    let _id = localStorage.getItem('_id')
    const validation = Yup.object().shape({
        house_location:Yup.string().required('This is required').min(4,'write atleast 4 char'),
        distric: Yup.string().required('This is required').min(4,'write atleast 6 char'),
        country: Yup.string().required('This is required').min(3,'write atleast 3 char'),
        state: Yup.string().required('This is required').min(3,'write atleast 3 char'),
        post_code: Yup.string().required('This is required').min(3,'write atleast 3 char')
      });
  const formOption = {resolver:yupResolver(validation)}
  const {register , handleSubmit , formState} = useForm(formOption)
  const {errors} = formState

    const [address,setAddress] = useState({})
    const [postAddress , setPostAddress] = useState({post_code:'',house_location:'',country:'',state:'',distric:''})
    const [error,setError] = useState([]);

    
  const handleChange = event => {
    setPostAddress({
      ...postAddress,
      [event.target.name]: event.target.value
    });
  };
  const onSubmit=async(data)=>{
   try {
    await axios.post("http://localhost:2000/api/data/postAddress",postAddress,{
        headers:{ Authorization:`Bearer ${token}`}
    })
    console.log(data)

   } catch (error) {
       setError(<p className="alert alert-danger">something went wrong</p>)
   }    
    }

    useEffect(()=>{
        loadUser()
    },[]);

    const loadUser = async()=>{
        let response = await axios.get(`http://localhost:2000/api/data/getUserID/${_id}`,{
            headers:{Authorization:`Bearer ${token}`}
        })
        
        setAddress(response.data.address)
        console.log(response.data.address)
    }
    return (
        <>
         <h1 className="blogs">My Address</h1>
          <div className="col-md-12 ">
               {Object.keys({address:address}).length==null?<h5>no addrees</h5>:(
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Street Address</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.house_location}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>City</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.distric}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>State</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.state}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Country</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.country}</p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <label>Zip Code</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{address.post_code}</p>
                                            </div>
                                        </div>
                            </div>
                        
                            </div>
              )} 




       <div className="ml-4 mr-4">
     <form onSubmit={handleSubmit(e=>onSubmit(e))}>
	
  <div className="form-group mt-2"> 
    <label htmlFor="house_location" className="control-label">Street Address </label>
    <input type="text" name="house_location" placeholder="Street address"  value={postAddress.house_location}
    {...register('house_location')} className={`form-control ${errors.house_location ? 'is-invalid' : ''}`}
        onChange={e=>handleChange(e)} />
  </div>						
  <div className="form-group"> 
    <label htmlFor="distric" className="control-label">City</label>
    <input type="text" name="distric" placeholder="City Name" value={postAddress.distric}
    {...register('distric')} className={`form-control ${errors.distric ? 'is-invalid' : ''}`}
    onChange={e=>handleChange(e)} />
  </div>									
  <div className="form-group">
    <label htmlFor="state" className="control-label">State</label>	
    <input type="text"  name="state" placeholder="State Name" value={postAddress.state}
    {...register('state')} className={`form-control ${errors.state ? 'is-invalid' : ''}`}
        onChange={e=>handleChange(e)}  />			
  </div>
  <div className="form-group"> 
    <label htmlFor="country" className="control-label">Country</label>	
    <input type="text" name="country" placeholder="India" value={postAddress.country}
    {...register('country')} className={`form-control ${errors.country ? 'is-invalid' : ''}`}
        onChange={e=>handleChange(e)}  />			
  </div>
  <div className="form-group"> 
    <label htmlFor="post_code" className="control-label">Zip Code</label>
    <input type="text" name="post_code" placeholder="ex-28834" value={postAddress.post_code}
    {...register('post_code')} className={`form-control ${errors.post_code ? 'is-invalid' : ''}`}
    onChange={e=>handleChange(e)} />
  </div>		
  <div className="form-group"> 
    <button type="submit" className="btn btn-primary ">Update Address</button>
  </div>     
</form>
</div>
       </div>
       </>
    )
}

export default Address
