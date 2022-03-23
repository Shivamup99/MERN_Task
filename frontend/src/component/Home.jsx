import React, { useState,useEffect} from 'react'
import Footer from './Footer'
import axios from 'axios'
import _, { reverse } from 'lodash'
import Pagination from '../common/Pagination'
import Search from '../common/Search'
import Read from '../common/Read'

function Home() {
  const token = localStorage.getItem('token');
  const [post , setPost] = useState([]);
  const [search,setSearch] = useState('');
  const [filteredBlog, setFilteredBlog] = useState([]);
  const [showPerPage, setShowPerPage] = useState(6);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  useEffect(()=>{
    
    fetchPost()
  },[]);

  const fetchPost = async()=>{
    const post = await axios.get(`http://localhost:2000/api/data/getBlog`) 
    setPost(reverse(post.data))
  };

  useEffect(() => {
    setFilteredBlog(
      post.filter((posts) =>
        posts.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, post]);

  //console.log(post.length)

  return (  
  <>
  {/*Main layout*/}
  <main className="my-5">
    <div className="container">
      {/*Section: Content*/}
      <section className="text-center">
        <h2 className="mb-5"><p className="blog">Latest posts</p></h2>
        <Search  setSearch={setSearch}/>
        <div className="row">
        {filteredBlog.slice(pagination.start, pagination.end).map((posts,index)=>(
        
          <div className="col-lg-4 col-md-12 mb-4" key={index}>
         
            <div className="card">
              <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                <img src={`http://localhost:2000/${posts.image}`} className="img-fluid" height="200px" width="350px" />
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
          
          ))}
        </div>
        
      </section>
      {/*Section: Content*/}
      {/* Pagination */}
      <Pagination showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={filteredBlog.length}/>
    </div>
  </main>

  <Footer />
</>

    )
}

export default Home
