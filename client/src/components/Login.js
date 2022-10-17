import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import *as infoServices from '../services/auth'
import Joi from 'joi-browser';


function Login() {
    const images = require.context("../assets/images", true);

    const [loginData, setLoginData] = useState({
        email : "",
        password : ""
    })

    const schema={
        email : Joi.string().email().required(),
        password : Joi.string().required()
    }

    const [message, setMessage] = useState("")
    const [errors, setErrors] = useState({})


    const validateProperty=(e)=>{
        let {name, value} = e.target;
        const obj={[name] : value};
        // console.log("the obj ------", obj);
        const subSchema = {[name] : schema[name]};
        // console.log("the subschema-----", subSchema);
        const result = Joi.validate(obj , subSchema);
        // console.log("result----", result);
        const error = result.error;
        return error? error.details[0].message : null
    }


    const getData = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        let errorData = {...errors};
        const errorMessage = validateProperty(e);
        // console.log("error----", errorMessage);
        if(errorMessage){
            errorData[name]= errorMessage;
        }
        else{
            delete  errorData[name];
        }
        setErrors(errorData);

        const prevData = {...loginData};
        prevData[name]= value;
        setLoginData(prevData);
    }

    const loginAccount = (e)=>{
        e.preventDefault();
        const result = Joi.validate(loginData, schema);
        const error= result.error;
        if(!error){
            return login();
        }
        else{
            const errorDatas = {};
            for(let item of error.details){
                const name= item.path[0];
                const message = item.message;
                errorDatas[name]= message;
            }
            setErrors(errorDatas);
            // console.log(errors);
            // return errorData;
        }

    }

    const login = async() =>{
        const result = await infoServices.login(loginData);
        if(result.data.status === 1){
            const login_token = result.data.token;
            localStorage.setItem("user_token", login_token)
        }else{
            setMessage(result.data.message)
        }
        }


  return (
    <div>
        <div className='login-section login-section-1'>
            <div className='foot-heading'><h2>Footprint</h2></div>
            <div className='login-section-1-1 login-section-1-2'>
            <div className='login-heading'>
                <h1>Login</h1>
                <p>Don’t have an account? <Link to="/register" className='link'>Create one here</Link></p>
            </div>
            <div className='login-form'>
                <div>
                    <input type="email" className='form-field' placeholder='Email' name = "email" onChange={getData}></input>
                    <p className='errormsg'>{errors.email}</p>
                </div>
                <div>
                    <input type="password" className='form-field' placeholder='Password' name = "password" onChange={getData}></input>
                    <p className='errormsg'>{errors.password}</p>
                </div>
                <p className='errormsg'>{message}</p>
                <div>
                    <button className='form-field login-field' onClick={loginAccount}>Login</button>
                </div>
            </div>

            </div>
        </div>
        <div className='login-section login-section-2'>
            <div className='login-section-main'>
                <div className='login-section-2-1'>
                    <img className='image-section' src={images('./login.png')} alt= "banner"></img>
                </div>
                <div className='login-section-new'>
                    <div className='login-section-2-2'>
                        <h2>
                            We'll handle your online digital footprint. Our pricing will not be beat.
                        </h2>
                    </div>
                    <div className='login-section-2-3'>
                        <p>
                             Wholesale Development Pricing, White-Labelling, Graphic Design, SEO & PPC.
                             Footprint is the all-in-one digital toolkit your business can count on.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default Login