import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import *as infoServices from '../services/auth'
import Joi from 'joi-browser';
import {useNavigate} from 'react-router-dom'

function Register() {
    const images = require.context("../assets/images", true)
    
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        email : "",
        password : "",
        password_confirmation : ""
    })

    const [errors, setErrors] = useState({})
    const [message, setMessage] = useState("")

    const schema = {
        email : Joi.string().email().required(),
        password : Joi.string().min(8).required(),
        // password_confirmation : Joi.string().required().valid(Joi.ref('password'))
        password_confirmation : Joi.any().valid(Joi.ref("password")).required().options({ language: { any: { allowOnly: 'must match password' } } })
    }

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

    const getData= (e)=>{
        var fieldName = e.target.name;
        var fieldValue = e.target.value;
        let errorData = {...errors};
        const errorMessage = validateProperty(e);
        // console.log("error----", errorMessage);
        if(errorMessage){
            errorData[fieldName]= errorMessage;
        }
        else{
            delete  errorData[fieldName];
        }
        setErrors(errorData);
        // console.log(errors);
        var prevState = {...details};
        prevState[fieldName] = fieldValue;
        setDetails(prevState)
    }




    const saveData= (e)=>{
        e.preventDefault();
        const result = Joi.validate(details, schema);
        const error= result.error;
        // console.log("error----",result);
        if(!error){
            return register();
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

    const register= async()=>{
        var response = await infoServices.saveDetails(details)
        if(response.data.status === 1){
            var reg_user_token = response.data.token;
            localStorage.setItem("user_token", reg_user_token)
            navigate('/');
        }
        else{
            setMessage(response.data.message)
        }
    }

  return (
    <div>
        <div className='login-section login-section-1'>
            <div className='foot-heading'><h2>Footprint</h2></div>
            <div className='login-section-1-1'>
                <div className='login-heading'>
                    <h1>Register</h1>
                    <p>Our Prices Will Not Be Beat</p> 
                    <p>Already have an account? <Link to='/' className='link'>Login</Link></p>
                </div>
                <div className='login-form'>
                        <div>
                            <input type="email" className='form-field' placeholder='Email' name="email" onChange={getData}></input>
                            <p className='errormsg'>{errors.email}</p>
                        </div>
                        <div>
                            <input  type='password' className='form-field' placeholder='Password' name="password" onChange={getData}></input>
                            <p className='errormsg'>{errors.password}</p>
                        </div>
                        <div>
                            <input type="password" className='form-field' placeholder='Conform Password' name="password_confirmation" onChange={getData}></input>
                            <p className='errormsg'>{errors.password_confirmation}</p>
                        </div>
                        <div className='ul-list'>
                            <ul>
                                <li>One lowercase character</li>
                                <li>One special character</li>
                                <li>One uppercase character</li>
                                
                            </ul>
                            <ul>
                                <li>8 characters minimum</li>
                                <li>One number</li>
                            </ul>
                        </div>
                        <div className='check-box'>
                            <input type="checkbox" ></input>
                            <label>I’d like to receive Footprint.io emails about new updates</label>
                        </div>
                        <p className='errormsg'>{message}</p>
                        <div>
                            <button className='form-field login-field' onClick={saveData}>Register Now</button>
                        </div>
                </div>
            </div>
        </div>
        <div className='login-section login-section-2'>
            <div className='login-section-main'>
                <div className='login-section-2-1'>
                    <img className='image-section' src={images('./register.png')} alt= "banner"></img>
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

export default Register