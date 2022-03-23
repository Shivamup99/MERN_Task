import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios from 'axios'
import { useHistory,Link} from 'react-router-dom';
import Footer from './Footer'
function About() {
    let history = useHistory()
    let token = localStorage.getItem('token')
    const validation = Yup.object().shape({
        title:Yup.string().required('This is required').min(4,'write atleast 4 char'),
        desc: Yup.string().required('This is required').min(6,'write atleast 6 char'),
        blog_creator: Yup.string().required('This is required').min(4,'write atleast 4 char')
      });
  const formOption = {resolver:yupResolver(validation)}
  const {register , handleSubmit , formState} = useForm(formOption)
  const {errors} = formState

    const [text , setText] = useState({title:'',desc:'',blog_creator:''})
    const [image,setImage] = useState("")
    const [error,setError] = useState([]);

    let userId = localStorage.getItem('_id')
    console.log(userId)
  const handleChange = event => {
    setText({
      ...text,
      [event.target.name]: event.target.value
    });
  };

  const imageChange=e=>{
      setImage(e.target.files[0])
  }

    const onSubmit=async()=>{
   try {
    let formData = new FormData()
    formData.append("title",text.title)
    formData.append("desc",text.desc)
    formData.append("blog_creator",text.blog_creator)
    formData.append("image",image)
    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }
    await axios.post("http://localhost:2000/api/data/postBlog",formData,{
        headers:{ Authorization:`Bearer ${token}`}
    })
    history.push("/")

   } catch (error) {
       setError(<p className="alert alert-danger">something went wrong</p>)
   }    
    }

    return (
        <>
        <div className="registration-forms">
        <h1 className="blog">Create Blog</h1>  
        <div className="col-md-3 ml-auto mb-2">
        <Link to='/myblog'> <input type="submit" className="profile-edit-btn btn-info"  value="Posted Blog"/></Link>
        </div>
        <form onSubmit={handleSubmit(e=>onSubmit(e))} autoComplete="off" >
        <div>{error?error:''}</div>
        <div className="form-group">
       <input type="text" name="title" placeholder="write title of blog" value={text.title} 
        {...register('title')} className={`form-control item ${errors.title ? 'is-invalid' : ''}`}
        onChange={e=>handleChange(e)}/>
        <small className="invalid-feedback">{errors.title?.message}</small>
        </div>
        <div className="form-group">
        <textarea type="text" name="desc" placeholder="write about your blog" value={text.desc} 
        {...register('desc')} className={`form-control item ${errors.desc ? 'is-invalid' : ''}`}
        onChange={e=>handleChange(e)}/>
        <small className="invalid-feedback">{errors.desc?.message}</small>
        </div>
        <div className="form-group">
        <input type="text" name="blog_creator" placeholder="write your bloger name" value={text.blog_creator} 
        {...register('blog_creator')} className={`form-control item ${errors.blog_creator ? 'is-invalid' : ''}`}
        onChange={e=>handleChange(e)}/>
        <small className="invalid-feedback">{errors.blog_creator?.message}</small>
        </div>
        
        <label className="custom-file-upload">
     <input type="file" name="image" onChange={e=>imageChange(e)}/>
     <i className="fas fa-cloud-upload-alt"></i> Upload releted file or image
    </label>
            <button type="submit" className="btn btn-block create-account">Create Blog</button>
        </form>
        </div>
       <Footer/>
         
        </>
    )
}

export default About
