import React from 'react'
import {Link} from 'react-router-dom'

function Login() {
    const images = require.context("../assets/images", true);


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
                    <input type="email" className='form-field' placeholder='Email'></input>
                </div>
                <div>
                    <input type="passwod" className='form-field' placeholder='Password'></input>
                </div>
                <div>
                    <button className='form-field login-field'>Login</button>
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