import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Tables from '../../components/Tables/Tables';
import Spiner from "../../components/Spiner/Spiner"
import { useNavigate } from "react-router-dom"
import { addData , dltdata, updateData} from '../../components/context/ContextProvider';
import {usergetfunc,deletfunc,exporttocsvfunc} from "../../services/Apis";


import { toast } from 'react-toastify';


const Home = () => {

  const [userdata,setUserData] = useState([]);
  const [showspin,setShowSpin] = useState(true);
  const [search,setSearch] = useState("");
  const [gender,setGender] = useState("All");
  const [status,setStatus] = useState("All");
  const [sort,setSort] = useState("new");
  const [page,setPage] = useState(1);
  const [pageCount,setPageCount] = useState(0);

  const { useradd, setUseradd } = useContext(addData);
  
  const {update,setUpdate} = useContext(updateData);
  const {deletedata, setDLtdata} = useContext(dltdata);

  const navigate = useNavigate();

  const adduser = () => {
    navigate("/register")
  }

  // get user
  const userGet = async()=>{
    const response = await usergetfunc(search,gender,status,sort,page);
    if(response.status === 200){
      setUserData(response.data.usersdata);
      setPageCount(response.data.Pagination.pageCount)
    }else{
      console.log("error for get user data")
    }
  }

  // user delete
  const deleteUser = async(id)=>{
    const response = await deletfunc(id);
    if(response.status === 200){
      userGet();
      setDLtdata(response.data)
    }else{
      toast.error("error")
    }
  }

  // export user
  const exportuser = async()=>{
    const response = await exporttocsvfunc();
    if(response.status === 200){
      window.open(response.data.downloadUrl,"blank")
    }else{
      toast.error("error !")
    }
  }

  // handle prev btn
  const handlePrevious = ()=>{
    setPage(()=>{
      if(page === 1) return page;
      return page - 1
    })
  }

  // handle next btn
  const handleNext = ()=>{
    setPage(()=>{
      if(page === pageCount) return page;
      return page + 1
    })
  }

  useEffect(()=>{
    userGet();
    setTimeout(()=>{
        setShowSpin(false)
    },1200)
  },[search,gender,status,sort,page])

  return (
    <>
      <div className="container mt-5">
  <div className="d-flex justify-content-between mb-3">
    <Button variant="primary" onClick={adduser}>
      <i className="fa-solid fa-plus"></i>&nbsp; Add User
    </Button>
    <Button className="btn btn-success" onClick={exportuser}>Export To Csv</Button>
  </div>
  
  <div className="row mb-4">
    <div className="col-lg-4 col-md-6 mb-3">
      <Form className="d-flex">
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="success">Search</Button>
      </Form>
      
    </div>
  </div>

  <div className="row mb-4">
    <div className="col-lg-3 col-md-4">
      <h4>Filter By Gender</h4>
      <Form.Check type="radio" label="All" name="gender" value="All" onChange={(e) => setGender(e.target.value)} defaultChecked />
      <Form.Check type="radio" label="Male" name="gender" value="Male" onChange={(e) => setGender(e.target.value)} />
      <Form.Check type="radio" label="Female" name="gender" value="Female" onChange={(e) => setGender(e.target.value)} />
    </div>

    <div className="col-lg-3 col-md-4">
      <h4>Sort By</h4>
      <Dropdown>
        <Dropdown.Toggle variant="secondary">
          <i className="fa-solid fa-sort"></i> Sort
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setSort("new")}>Newest</Dropdown.Item>
          <Dropdown.Item onClick={() => setSort("old")}>Oldest</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>

    <div className="col-lg-3 col-md-4">
      <h4>Filter By Status</h4>
      <Form.Check type="radio" label="All" name="status" value="All" onChange={(e) => setStatus(e.target.value)} defaultChecked />
      <Form.Check type="radio" label="Active" name="status" value="Active" onChange={(e) => setStatus(e.target.value)} />
      <Form.Check type="radio" label="Inactive" name="status" value="Inactive" onChange={(e) => setStatus(e.target.value)} />
    </div>
  </div>

  {showspin ? (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spiner />
    </div>
  ) : (
    <Tables
      userdata={userdata}
      deleteUser={deleteUser}
      userGet={userGet}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
      page={page}
      pageCount={pageCount}
      setPage={setPage}
    />
  )}
</div>

    </>
  )
}

export default Home