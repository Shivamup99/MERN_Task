import React from 'react'

function Footer() {
    return (
    <>
    <footer className="bg-light text-lg-start">
    <hr className="m-0" />
    <div className="text-center py-4 align-items-center">
      <p>Follow Shivam on social media</p>
      <a href="https://www.linkedin.com/in/shivamup/" className="btn btn-success m-1" role="button" rel="nofollow" target="_blank">
        <i className="fab fa-linkedin" />
      </a>
      <a href="https://www.facebook.com/shivamup99" className="btn btn-success m-1" role="button" rel="nofollow" target="_blank">
        <i className="fab fa-facebook-f" />
      </a>
      <a href="https://www.instagram.com/shivamup99" className="btn btn-success m-1" role="button" rel="nofollow" target="_blank">
        <i className="fab fa-instagram" />
      </a>
      <a href="https://github.com/shivamup99" className="btn btn-success m-1" role="button" rel="nofollow" target="_blank">
        <i className="fab fa-github" />
      </a>
    </div>
    {/* Copyright */}
    <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
      © 2021 Copyright:
      <a className="text-dark" href="https://resume-shivam.herokuapp.com/">Shivam Upadhyay</a>
    </div>
    {/* Copyright */}
  </footer>
    </>
    )
}

export default Footer
