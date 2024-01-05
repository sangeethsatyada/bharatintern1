import React, { useEffect, useState } from "react";
import "./Regformstyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { HiMiniEye ,HiEyeSlash } from "react-icons/hi2";
import {Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
function Regform()
{
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevVisibility) => !prevVisibility);
        let pass=document.getElementById("pass");
        let pass1=document.getElementById("pass1");
        if(pass.type==='password' && pass1.type==='password'){
            pass.type='text';
            pass1.type='text';
        }
        else
        {
            pass.type='password';
            pass1.type='password';
        }
      };
      const [data,setData]=useState({
        fname:'',
        sname:'',
        phone:'',
        email:'',
        password:'',
        cpassword:''
      })
      
      const [gender,setGender]=useState('');
      const {fname,sname,phone,email,password,cpassword}=data;
      function handlechange(e)
      {
        setData({...data,[e.target.name]:e.target.value});
      }
      const handleGenderChange = (e) => {
        setGender(e.target.value);
      };
      function submitForm(e)
      {
        e.preventDefault();
        if(fname==='' || sname==='' || phone==='' || email==='' || password==='' || cpassword==='' || gender===''){
            toast.error('Enter required Fields');
        }
        if(password!==cpassword)
        {
            toast.error('Password Missmatch');
        }
        else
        {
            toast.success('successfully registered');
            axios.post("http://127.0.0.1:3003",({fname,sname,phone,email,password,cpassword,gender}))
            .then((msg)=>console.log("Sucessfully shared"+msg.data))
            .catch((err)=>console.log("Error to shared"+err));
        }
      }
      useEffect(()=>{
        fetch('http://127.0.0.1:3003').then((res)=>res.json()).then((res)=>console.log(res)).catch((err)=>console.log(err));
      },[]);
    return(
    <>
    <form className="form">
        <h3>Registration Form</h3>
        <input type="text" placeholder="First Name" name="fname" value={fname} onChange={handlechange}/><br></br><br></br>
        <input type="text" placeholder="Last Name" name="sname" value={sname} onChange={handlechange}/><br></br><br></br>
        <input type="text" placeholder="Phone Number" value={phone} onChange={handlechange} name="phone"/><br></br><br></br>
        <input type="email"placeholder="Email" value={email} onChange={handlechange} name="email"/><br></br><br></br>
        <input type="password" placeholder="Password" id="pass" value={password} onChange={handlechange} name="password"/><br></br><br></br>
        <input type="password" placeholder="Confirm Password" id="pass1" onChange={handlechange} name="cpassword" value={cpassword}/><div id="eye" onClick={togglePasswordVisibility}><h6 id="show">show</h6>{isPasswordVisible ? <HiMiniEye id="eyes"/>:<HiEyeSlash  id="eyes"/>}</div>
        <div id="genders">
        <input type="radio" name="gender" onChange={handleGenderChange} checked={gender === "Male"} value="Male"/> <p id="ss">male</p>
        <input type="radio" name="gender" onChange={handleGenderChange} checked={gender === "Female"} value="Female"/> <p id="ss">female</p>
        <input type="radio" name="gender" onChange={handleGenderChange} checked={gender === "Others"} value="Others"/> <p id="ss">prefer not to say</p>
        </div>
        <p id="log">Already Haven an Account?</p><Link to="/Login" id="rrr">log in</Link>
        <Button variant="success" onClick={submitForm}>Submit</Button>{' '}
    </form>
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    />
    </>
    
    )
}
export default Regform;