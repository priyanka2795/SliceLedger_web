import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope, faEye,faCircleExclamation, faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import React, { useState, useContext, useEffect } from 'react'
import { Col, Container, Row, Image } from 'react-bootstrap'
import myContext from '../context/MyContext'
import validate from '../validation/Login'
import validation from '../validation/VerifyOtp'
import { Link, useNavigate } from 'react-router-dom'
import Login_img from '../assets/images/login.png'
import { decryptData } from '../Helper'
import { LoginForm, LoginOtpForm } from '../Form'
import { toast } from 'react-toastify';
import axios from 'axios'
import platform from 'platform';

export default function Login() {
    // ============================ Hide and Show Password Start ================================
    const [passwordShow, setPasswordShow] = useState(false)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    let History = useNavigate();
    const data = useContext(myContext);
    const [ipAddress, setIP] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [message, setMessageShow] = useState('');
    const userEmail = window.sessionStorage.getItem("email");
    function passwordEye() {
        setPasswordShow(!passwordShow)
    }
   
    
    const {
        values,
        errors,
        handleChange,
        handleSubmit
      } = LoginForm(Login, validate);

    const {
        values1,
        errors1,
        handleOTPChange,
        handleOTPSubmit
      } = LoginOtpForm(otpSubmit, validation);

    // ===============================Get IP Adsress ========================================
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        setIP(res.data.IPv4)
      }
      useEffect( () => {
        getData()
        navigator.geolocation.getCurrentPosition(showPosition);
      }, [])

      function showPosition(position) {
        setLatitude(position.coords.latitude)
        setLongitude(position.coords.longitude)
      }

 // =======================SignUp Api Call=====================================
    function Login() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/login", {
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify({
          email:values.email,
          password:values.password
        })
      })
      .then(response => response.json())
      .then(response => {
        const res  = decryptData(response)
        if (parseInt(res.status) === 200) {
            const email = res.result.email;
            sessionStorage.setItem("email", email);
            data.setLoginapi(res)
            setisLoggedIn(!isLoggedIn)
            toast.success(res.message)  
        }else{
            toast.error(res.message)
        }

      })
      .catch(err => {
        console.log(err);
      });
    }

    // =======================SignUp Api Call=====================================

     function otpSubmit() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/verifyOtp", {
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "accept": "application/json"
            },
            "body": JSON.stringify({
              email:userEmail,
              otp:values1.otp,
              deviceName:platform.name+" "+platform.version+" "+platform.os.family+" "+platform.os.architecture,
              IpAdderss:ipAddress,
              latitude:latitude,
              longitude:longitude
            })
          })
          .then(response => response.json())
          .then(response => {       
            const res  = decryptData(response)
            if (parseInt(res.status) == 200) {
                localStorage.setItem('accessToken', `Bearer ${res.result.accessToken}`);
                localStorage.setItem('auth', JSON.stringify(res.result));
                toast.success(res.message)
                History('/dashboard');
            }else{
                toast.error(res.message)
            }
            
          })
          .catch(err => {
            console.log(err);
          });
    }
    // ===============================End Verify OTP Api Call ========================================
    // =======================Resend Otp Api Call=====================================
    function resendOtp() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/reSendLoginOtp", {
            "method": "POST",
            "headers": {
            "content-type": "application/json",
            "accept": "application/json"
            },
            "body": JSON.stringify({
            email:userEmail,
            })
        })
        .then(response => response.json())
        .then(response => {
        const res  = decryptData(response)
            if (parseInt(res.status) == 200) {
                toast.success(res.message)
            }else{
                toast.error(res.message)
            }
            
        })
        .catch(err => {
            console.log(err);
        });
    }
    // ===============================End Resend Otp Api Call ========================================
    return (
        <>
        { !isLoggedIn
            ?  
            <section className='slice_login_section'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={12} className="login_form_left_bg">
                            <div className='slice_login_form_left'>
                                {/* <h1>Sliceledger</h1> */}
                                <Image src={Login_img} fluid />
                                {/* <h2>Your Headline Text Here</h2> */}
                                {/* <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut fugiat quas repellendus ullam, illum magni ea doloremque nulla. Cumque sint, explicabo et necessitatibus accusamus quisquam reiciendis atque neque modi earum!</p> */}
                            </div>
                        </Col>
                        <Col lg={6} md={12} className="login_form_right_bg">
                            <div className="slice_login_form">
                                <div className='welcome_back_text'>Welcome Back</div>
                                <p className='login_subtitle'>Login into your Sliceledger Dashboard</p>
                                {/* <div className='slice_login_form_head'>Login</div> */}
                                <div className='slice_loginForm'>
                                    <form onSubmit={handleSubmit} noValidate>
                                        <div className='email_field_div'>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <input className={`col-12 user_email ${errors.email && 'is-invalid'}`} type="email" placeholder='Email' required
                                            name='email'
                                            autoComplete="off"
                                            onChange={handleChange} 
                                            />
                                        </div>
                                        {errors.email && (
                                            <span className="error invalid-feedback">{errors.email}</span>
                                        )}
                                        <div className='password_field_div'>
                                            <FontAwesomeIcon icon={faLock} />
                                            <input className={`col-12 ${errors.password && 'is-invalid'}`}  type={passwordShow ? "text" : "password"} placeholder='Password'
                                            name='password'
                                            autoComplete="off"
                                            onChange={handleChange} 
                                            required/>
                                            <FontAwesomeIcon onClick={passwordEye} className='eye_icon' icon={passwordShow ? faEye : faEyeSlash} />
                                            {/* <FontAwesomeIcon className='eye_icon' icon={faEye} /> */}
                                        </div>
                                        {errors.password && (
                                            <span className="error invalid-feedback">{errors.password}</span>
                                        )}
                                        {/* <input className='login_submit' type="submit" value="Login" disabled /> */}
                                        {/* ========= remove below anchor tag ========== */}
                                        <input type="submit" value="Login"/>
                                    </form>
                                </div>
                                <div className='slice_login_form_foot'>
                                    <Link to="/signup">Don't have an account? <span>SignUp</span></Link>
                                    <Link to="/forget_password">Forgot Password ?</Link>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            :  
            <section className='slice_forgetPassword_section'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} className="forget_form_left_bg">
                            <div className='slice_forget_form_left'>
                                <Image src={Login_img} fluid />
                            </div>
                        </Col>
                        <Col lg={6} className="forget_form_right_bg">
                            <div className="slice_forgetPassword_form">
                                <div className='slice_forgetPassword_form_head'>Verify OTP</div>
                                <div className="warning_msg">
                                    <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} />
                                         Please check mail for OTP!
                                    </div>
                                 </div>
                                
                                <div className='slice_forgetPasswordForm'>
                                    <form onSubmit={handleOTPSubmit} noValidate>
                                    <div className='email_field_div'>
                                        <input className='col-12' type="text" placeholder='OTP'
                                        name='otp'
                                        autoComplete="off"
                                        onChange={handleOTPChange} 
                                        style={{ background:"transparent" , border:"none",color:"white"}}
                                        />
                                    </div>
                                    {errors1.otp && (
                                        <span className="error invalid-feedback">{errors1.otp}</span>
                                    )}
                                        <input type="submit" value="Continue" />
                                    </form>
                                </div>
                                <div className='slice_resend_otp_foot'>
                                <button  onClick={resendOtp}>Resend otp?</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
          }
  
        </> 
    )
}