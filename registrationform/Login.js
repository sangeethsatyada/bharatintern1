import React, { useState } from "react";
import "./Regformstyle.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { HiMiniEye ,HiEyeSlash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import axios from "axios";
function Login()
{
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevVisibility) => !prevVisibility);
        let pass=document.getElementById("pass");
        if(pass.type==='password')
        pass.type='text';
        else
        pass.type='password';
      };
      const [data,setData]=useState({
        username:'',
        password:''
      });
      const {username,password}=data;
      function change(e){
        setData({...data,[e.target.name]:e.target.value});
      }
      function submit(e)
      {
        e.preventDefault();
        console.log(data);
        axios.post("http://127.0.0.1:3003/Login",({username,password})).then(()=>console.log("username is shared")).catch((msg)=>console.log("Not shared"+msg));
      }
    return(
        <form className="form1">
        <h3>Login</h3>
        <input type="email"placeholder="Email" name="username" value={username} onChange={change}/><br></br><br></br>
        <input type="password" placeholder="Password" id="pass" name="password" value={password} onChange={change}/><br></br><br></br>
        <div id="eye" onClick={togglePasswordVisibility}><h6 id="show">show</h6>{isPasswordVisible ?<HiMiniEye id="eyes"/>:<HiEyeSlash  id="eyes"/>}</div>
        <p id="log">Don't you have an Account?</p><Link to="/" id="rrr">Sign Up</Link>
        <Button variant="success" onClick={submit}>Success</Button>{' '}
        </form>
    )
}
export default Login;