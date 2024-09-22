import React, { useContext, useEffect, useState } from 'react'
import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Select from 'react-select';
import Spiner from "../../components/Spiner/Spiner"
import {registerfunc} from "../../services/Apis"
import { ToastContainer, toast } from "react-toastify"
import {useNavigate} from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

import { addData } from '../../components/context/ContextProvider';

const Register = () => {

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  });

  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  const [showspin, setShowSpin] = useState(true);

  const navigate = useNavigate();

  const { useradd, setUseradd } = useContext(addData);

  // status optios
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  }

  // status set
  const setStatusValue = (e) => {
    setStatus(e.value)
  }

  // profile set
  const setProfile = (e) => {
    setImage(e.target.files[0])
  }

  //submit userdata
  const submitUserData = async(e) => {
    e.preventDefault();

    const { fname, lname, email, mobile, gender, location } = inputdata;

    if (fname === "") {
      toast.error("First name is Required !")
    } else if (lname === "") {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (image === "") {
      toast.error("Prfile is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {
      console.log(image);

      const data = new FormData();
      data.append("fname",fname)
      data.append("lname",lname)
      data.append("email",email)
      data.append("mobile",mobile)
      data.append("gender",gender)
      data.append("status",status)
      data.append("user_profile",image)
      data.append("location",location)

      const config = {
        "Content-Type":"multipart/form-data"
      }

      const response = await registerfunc(data,config);
      
      if(response.status === 200){
        setInputData({
          ...inputdata,
          fname:"",
          lname: "",
          email: "",
          mobile: "",
          gender: "",
          location: ""
        });
        setStatus("");
        setImage("");
        setUseradd(response.data)
        navigate("/");
      }else{
        toast.error("Error!")
      }

    }

  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }

    setTimeout(() => {
      setShowSpin(false)
    }, 1200)
  }, [image])


  return (
    <>
     {
  showspin ? (
    <Spiner />
  ) : (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Register Your Details</h2>

      <Card className="shadow-lg p-4">
        <div className="profile_div text-center mb-4">
          <img
            src={preview ? preview : "/man.png"}
            alt="Profile"
            className="rounded-circle"
            style={{ width: "120px", objectFit: "cover", border: "2px solid #007bff" }}
          />
        </div>

        <Form>
          <Row>
            {/* First Name */}
            <Form.Group className="mb-3 col-lg-6" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="fname"
                value={inputdata.fname}
                onChange={setInputValue}
                placeholder="Enter First Name"
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group className="mb-3 col-lg-6" controlId="formLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lname"
                value={inputdata.lname}
                onChange={setInputValue}
                placeholder="Enter Last Name"
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-3 col-lg-6" controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={inputdata.email}
                onChange={setInputValue}
                placeholder="Enter Email"
              />
            </Form.Group>

            {/* Mobile */}
            <Form.Group className="mb-3 col-lg-6" controlId="formMobile">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                name="mobile"
                value={inputdata.mobile}
                onChange={setInputValue}
                placeholder="Enter Mobile"
              />
            </Form.Group>

            {/* Gender */}
            <Form.Group className="mb-3 col-lg-6" controlId="formGender">
              <Form.Label>Select Your Gender</Form.Label>
              <div className="d-flex">
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                  onChange={setInputValue}
                  className="me-3"
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  onChange={setInputValue}
                />
              </div>
            </Form.Group>

            {/* Status */}
            <Form.Group className="mb-3 col-lg-6" controlId="formStatus">
              <Form.Label>Select Your Status</Form.Label>
              <Select options={options} onChange={setStatusValue} className="basic-select" />
            </Form.Group>

            {/* Profile Upload */}
            <Form.Group className="mb-3 col-lg-6" controlId="formProfile">
              <Form.Label>Select Your Profile Picture</Form.Label>
              <Form.Control type="file" name="user_profile" onChange={setProfile} />
            </Form.Group>

            {/* Location */}
            <Form.Group className="mb-3 col-lg-6" controlId="formLocation">
              <Form.Label>Enter Your Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={inputdata.location}
                onChange={setInputValue}
                placeholder="Enter Your Location"
              />
            </Form.Group>
          </Row>

          <div className="text-center">
            <Button variant="primary" type="submit" onClick={submitUserData} className="mt-3">
              Submit
            </Button>
          </div>
        </Form>
      </Card>

      <ToastContainer position="top-center" />
    </div>
  )
}


    </>
  )
}

export default Register