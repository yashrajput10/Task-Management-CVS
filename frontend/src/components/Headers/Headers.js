import React from 'react'


const Headers = () => {
  return (
    <><nav className="navbar navbar-expand-lg bg-primary">
    <div className="container-fluid">
      {/* Brand Name */}
      <a className="navbar-brand text-white fw-bold" href="/" style={{ fontSize: '1.5rem' }}>
        Task Manager
      </a>
  
      {/* Toggler for Mobile View */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" style={{ color: '#fff' }}></span>
      </button>
  
      {/* Navbar Links */}
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav ms-auto">
          <a className="nav-link active text-white px-3" aria-current="page" href="/">
            Home
          </a>
          <a className="nav-link text-white px-3" href="#">
            Features
          </a>
          <a className="nav-link text-white px-3" href="#">
            Pricing
          </a>
          <a className="nav-link disabled text-white px-3" aria-disabled="true">
            Disabled
          </a>
        </div>
      </div>
    </div>
  </nav>
  
    </>
  )
}

export default Headers