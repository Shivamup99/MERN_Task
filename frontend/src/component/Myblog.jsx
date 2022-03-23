import React, { useState,useEffect} from 'react'
import Footer from './Footer'
import axios from 'axios'
import _, { reverse } from 'lodash'

function Home() {
  const token = localStorage.getItem('token');
  const _id = localStorage.getItem('_id')
  const [post , setPost] = useState([]);

  useEffect(()=>{
    
    fetchPost()
  },[]);

  const fetchPost = async()=>{
    let response = await axios.get(`http://localhost:2000/api/data/getUserID/${_id}`,{
      headers:{Authorization:`Bearer ${token}`}
  })
    //let id=localStorage.getItem('_id')
  //  const post = await axios.get(`http://localhost:2000/api/data/getBlog`) 
    // console.log(post.data[31].user._id)
    // const a=post.data.filter(u=>u.user?u.user._id===id:'')
    // console.log(a)
    // setPost(a)
    setPost(reverse(response.data.blog))
   // console.log(response.data.blog)
  };

  //console.log(post.length)

  return (  
  <>
  {/*Main layout*/}
  <main className="my-5">
    <div className="container">
      {/*Section: Content*/}
      <section className="text-center">
        <h2 className="mb-5"><p className="blog">My Blog posts</p></h2>
        {/* <Search  setSearch={setSearch}/> */}
        <div className="row">
          {post.length===0? <h1>No blog posted yet</h1>:(
       post.map((posts,index)=>(
        
          <div className="col-lg-4 col-md-12 mb-4" key={index}>
         
            <div className="card">
              <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={`http://localhost:2000/${posts.image}`} className="img-fluid" />
              </div>
                <div className="card-body">
                <small className="card-title">{posts.creted.split('T')[0]}</small>
                <h5 className="card-title">{posts.title}</h5>
                <p className="card-text">
                  {posts.desc.length>10?posts.desc:'' }
                </p>
                <p className="card-text">
                  {posts.blog_creator}
                </p>
                
                {/* <a className="btn btn-primary"> Read</a> */}
              </div>
            </div>
             
          </div>
          
          )))}
        </div>
        
      </section>
      {/*Section: Content*/}
      {/* Pagination */}
      {/* <Pagination showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={filteredBlog.length}/> */}
    </div>
  </main>

  <Footer />
</>

    )
}

export default Home
