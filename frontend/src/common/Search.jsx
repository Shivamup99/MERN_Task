import React from 'react'

function Search({setSearch}) {
  const handleSearch=e=>{
    setSearch(e.target.value)
  }
    return (
        <>
        <div className="row justify-content-center mb-3">
      <div className="col-12 col-md-10 col-lg-8">
    <form className="card card-sm">
      <div className="card-body row no-gutters align-items-center">

        {/*end of col*/}
        <div className="col">
          <input className="form-control form-control-lg form-control-borderless" type="search" placeholder="Search topics or keywords" 
           onChange={e=>handleSearch(e)}/>
        </div>
        {/*end of col*/}
        <div className="col-auto">
          <button className="btn btn-lg btn-info ml-2" type="submit">Search</button>
        </div>
        {/*end of col*/}
      </div>
    </form>
  </div>
  {/*end of col*/}
</div>

            
        </>
    )
}

export default Search
