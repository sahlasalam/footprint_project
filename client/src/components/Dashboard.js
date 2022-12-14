import React, { useState, useEffect } from 'react'
import Joi from 'joi-browser';
import *as infoServices from '../services/auth'
import {useNavigate, Link} from 'react-router-dom'


function Dashboard() {
    const images = require.context("../assets/images", true)

    const navigate= useNavigate();

    const [message, setMessage] = useState("")

    const [data, setData] = useState({
        fname : "",
        lname : "",
        email : "",
        address : "",
        number : "",
        country : "",
        pin : ""
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        fetchData();

    }, [])
    

    const fetchData= async ()=>{
        const customertoken = localStorage.getItem("user_token");
        var result = await infoServices.fetchdetails({token : customertoken})
        // console.log(result.data.output);
        setData(result.data.output)
    }

    const schema = {
        fname : Joi.string().required(),
        lname : Joi.string().required(),
        email : Joi.string().email().required(),
        address : Joi.string().required(),
        number : Joi.number().min(10).required(),
        country : Joi.string().required(),
        pin : Joi.string().min(6).max(6).required()
    }

    const validateProperty=(e)=>{
        let {name, value} = e.target;
        const obj={[name] : value};
        const subSchema = {[name] : schema[name]};
        const result = Joi.validate(obj , subSchema);
        const error = result.error;
        return error? error.details[0].message : null
    }

    const getDetails= (e)=>{
        var fieldName = e.target.name;
        var fieldValue = e.target.value;
        let errorData = {...errors};
        const errorMessage = validateProperty(e);
        if(errorMessage){
            errorData[fieldName]= errorMessage;
        }
        else{
            delete  errorData[fieldName];
        }
        setErrors(errorData);
        var prevState = {...data};
        prevState[fieldName] = fieldValue;
        setData(prevState)
    }

    const saveDetails= (e)=>{
        e.preventDefault();
        const result = Joi.validate(data, schema);
        const error= result.error;
        // console.log(error);
        if(!error){
            return submit();
        }
        else{
            const errorDatas = {};
            for(let item of error.details){
                const name= item.path[0];
                const message = item.message;
                errorDatas[name]= message;
            }
            setErrors(errorDatas);
        }
    }

    const submit = async()=>{
        var response = await infoServices.submitData(data);
        setData(response.data.output)
        setMessage(response.data.message)
        // console.log("new values---------",data);
    }

    const logout = () =>{
        localStorage.removeItem("user_token");
        navigate('/')
      }
  

  return (
    <div>
        <div className='login-section login-section-1'>
            <div className='foot-heading'><h2>Footprint</h2></div>
            <div className='login-section-1-1'>
                <div className='login-heading'>
                    <h1>Dashboard</h1>
                </div>
                <div className='login-form'>
                    <div className='form-first-field'>
                        <input type="text" className='form-field-1' placeholder='First Name' name="fname" defaultValue={data.fname} onChange={getDetails}></input>
                        <input type="text" className='form-field-1' placeholder='Last Name' name="lname" defaultValue={data.lname} onChange={getDetails}></input>
                    </div>
                    <p className='errormsg'>{errors.fname}</p>
                    <p className='errormsg'>{errors.lname}</p>

                    <div>
                        <input type="text" className='form-field' placeholder='Email' name="email" defaultValue={data.email} onChange={getDetails}></input>
                        <p className='errormsg'>{errors.email}</p>
                    </div>
                    <div>
                        <input type="text" className='form-field' placeholder='Address' name="address" defaultValue={data.address} onChange={getDetails}></input>
                        <p className='errormsg'>{errors.address}</p>
                    </div>
                    <div>
                        <input type="number" className='form-field' placeholder='Phone Number' name="number" defaultValue={data.number} onChange={getDetails}></input>
                        <p className='errormsg'>{errors.number}</p>
                    </div>
                    <div>
                        <input type="text" className='form-field' placeholder='Country' name="country" defaultValue={data.country} onChange={getDetails}></input>
                        <p className='errormsg'>{errors.country}</p>
                    </div>
                    <div>
                        <input type="string" className='form-field' placeholder='Pincode' name="pin" defaultValue={data.pin} onChange={getDetails}></input>
                        <p className='errormsg'>{errors.pin}</p>
                    </div>
                    <div className='form-first-field'>
                        <button className='form-field login-field' onClick={saveDetails}>Submit</button>
                        <button className='form-field login-field' onClick={logout}>Logout</button>
                    </div>
                    <p>{message}</p>
                    <Link to='/password' className='linktopaswd'>Change Password?</Link>

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

export default Dashboard