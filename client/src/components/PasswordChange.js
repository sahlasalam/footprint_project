import React from 'react'
import {useState} from 'react'
import Joi from 'joi-browser';
import *as infoServices from '../services/auth'
import {useNavigate} from 'react-router-dom'


function PasswordChange() {
    const images = require.context("../assets/images", true)

    const navigate = useNavigate();

    const [errors, setErrors] = useState({})

    const [message, setMessage] = useState("")

    const [pswd, setPswd] = useState({
        currentpswd : "",
        newpswd : "",
        conformpswd : ""})
    
    const schema = {
        currentpswd : Joi.string().required(),
        newpswd : Joi.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
        'newpswd').required(),
        conformpswd :  Joi.any().valid(Joi.ref("newpswd")).required().options({ language: { any: { allowOnly: 'must match password' } } })
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
        var prevState = {...pswd};
        prevState[fieldName] = fieldValue;
        setPswd(prevState)
    }

    const saveDetails= (e)=>{
        e.preventDefault();
        const result = Joi.validate(pswd, schema);
        const error= result.error;
        if(!error){
            return pswdChange();
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

    const pswdChange = async() =>{
        var result = await infoServices.changePassword(pswd);
        if(result.data.status===1){
            navigate('/dashboard')
        }else{
            setMessage(result.data.message)
        }
    }


  return (
    <div>
        <div className='login-section login-section-1'>
            <div className='foot-heading'><h2>Footprint</h2></div>
            <div className='login-section-1-1'>
                <div className='login-heading'>
                    <p>Change Password</p>
                </div>
                <div className='login-form'>
                    <div>
                        <input type="text" className='form-field' placeholder='Current Password' name="currentpswd" onChange={getDetails}></input>
                        <p className='errormsg'>{errors.currentpswd}</p>
                    </div>
                    <div>
                        <input type="password" className='form-field' placeholder='New Password' name="newpswd" onChange={getDetails}></input>
                        <p className='errormsg'>{errors.newpswd}</p>
                    </div>
                    <div>
                        <input type="password" className='form-field' placeholder='Conform Password' name="conformpswd" onChange={getDetails}></input>
                        <p className='errormsg'>{errors.conformpswd}</p>
                    </div>
                    <p className='errormsg'>{message}</p>
                    <div>
                        <button className='form-field login-field' onClick={saveDetails}>Set Password</button>
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

export default PasswordChange