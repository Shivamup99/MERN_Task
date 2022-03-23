import React from 'react'
import {Link , NavLink, useLocation} from 'react-router-dom'
function Navbar() {
    let location = useLocation()
   if(location.pathname==="/login" || location.pathname==="/register"||location.pathname==="/404"||location.pathname==='/forgetPass'||location.pathname==='/resetpassword/:token'){
      return <h1 style={{textAlign:'center'}}> Wellcome to World </h1>
    }
    let _id = localStorage.getItem('_id')
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
        <Link className="navbar-brand" to="/profile">
       <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvxMUkZzYHg5hKJczLNvEEprzIVDTQeRlzjg&usqp=CAU" className="img" alt="shivam" />
       </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarResponsive">
       <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/">Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/about">Blogs</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/news">News</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/contact">Contact</NavLink>
        </li>
        {localStorage.getItem('token')?(
          <li className="nav-item">
          <NavLink className="nav-link" to="/logout">Logout</NavLink>
          </li>):
           <li className="nav-item">
           <NavLink className="nav-link" to="/login">Login</NavLink>
           </li>
        }

      </ul>
    </div>
   </div>
  </nav>
 </>
    )
}

export default Navbar
