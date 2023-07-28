import React, { useContext, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope,faEye, faCircleExclamation,faEyeSlash } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, Row, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Login_img from '../assets/images/login.png'
import validate from '../validation/ForgetPassword'
import { ForgetPasswordForm } from '../Form'
import myContext from '../context/MyContext'
import { decryptData } from '../Helper'
import { toast } from 'react-toastify'
import { ResetPForm } from '../Form'
import validation from '../validation/VerifyOtp'

export default function ForgetPassword() {
    const data = useContext(myContext);
    const [isPassword, setisPassword] = useState(false)
    let History = useNavigate()
    const userEmail = window.sessionStorage.getItem("email");
    const [togglePwd, setTogglePwd] = useState(false)
    const [toggleConfirmPwd, setToggleConfirmPwd] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    const [confirmpasswordShown, setConfirmPasswordShown] = useState(false);
    const handleCheckPassword = () => {
        setTogglePwd(!togglePwd)
        setPasswordShown(!passwordShown)
    }

    const handleCheckConfirmPassword = () => {
        setToggleConfirmPwd(!toggleConfirmPwd)
        setConfirmPasswordShown(!confirmpasswordShown)
    }
    const {
        values,
        errors,
        handleChange,
        handleSubmit
      } = ForgetPasswordForm(forget, validate);

     // =======================ForgetPassword Api Call=====================================
     function forget() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/forgetPassword", {
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
        if (parseInt(res.status) == 200) {
            const email = res.result.email;
            sessionStorage.setItem("email", email);
            data.setLoginapi(res)
            toast.success(res.message)
            setisPassword(!isPassword)
        } else {
            toast.error(res.message)
        }
        
      })
      .catch(err => {
        console.log(err);
      });
    }



    const {
        values1,
        errors1,
        handleResetChange,
        handleResetSubmit
      } = ResetPForm(reset, validation);

    // ===============================Get IP Adsress ========================================


     // =======================SignUp Api Call=====================================
     function reset() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/resetpassword", {
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "accept": "application/json"
            },
            "body": JSON.stringify({
              email:userEmail,
              otp:values1.otp,
            })
          })
          .then(response => response.json())
          .then(response => {
            const res  = decryptData(response)
            if (parseInt(res.status) == 200) {
                sessionStorage.clear()
                toast.success(res.message)
                History('/login');
            }else{
                toast.error(res.message)
            }
          })
          .catch(err => {
            console.log(err);
          });
    }
    // ===============================End SingUp Api Call ========================================
    
  // =======================Resend Otp Api Call=====================================
  function resendOtpForget() {
    fetch("https://bharattoken.org/sliceLedger/admin/api/auth/reSendOtp", {
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
            console.log(res);
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
        { !isPassword
            ?  
            <section className='slice_forgetPassword_section'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={12} className="forget_form_left_bg">
                            <div className='slice_forget_form_left'>
                                <Image src={Login_img} fluid />
                            </div>
                        </Col>
                        <Col lg={6} md={12} className="forget_form_right_bg">
                            <div className="slice_forgetPassword_form">
                                <div className='slice_forgetPassword_form_head'>Forgot Password</div>
                                <div className='slice_forgetPasswordForm'>
                                    <form onSubmit={handleSubmit} noValidate>
                                        <div className='email_field_div mt-5'>
                                            <FontAwesomeIcon icon={faEnvelope} />
                                            <input className='col-12' type="email" placeholder='Email' 
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
                                            <input className='col-12' type={passwordShown ? "text" : "password"} placeholder='New Password' 
                                            name='password'
                                            autoComplete="off"
                                            onChange={handleChange}
                                            />
                                            <div className="icon" onClick={handleCheckPassword} style={{marginLeft:"-26px" }}>
                                            <FontAwesomeIcon icon={togglePwd ? faEye : faEyeSlash} />
                                            </div>
                                        </div>
                                        {errors.password && (
                                            <span className="error invalid-feedback">{errors.password}</span>
                                        )}
                                        <div className='password_field_div'>
                                            <FontAwesomeIcon icon={faLock} />
                                            <input className='col-12' type={confirmpasswordShown ? "text" : "password"} placeholder='Confirm New Password' 
                                            name='cpassword'
                                            autoComplete="off"
                                            onChange={handleChange}
                                            />
                                            <div className="icon" onClick={handleCheckConfirmPassword} style={{marginLeft:"-26px" }}>
                                            <FontAwesomeIcon icon={toggleConfirmPwd ? faEye : faEyeSlash} />
                                            </div>
                                        </div> 
                                        {errors.cpassword && (
                                            <span className="error invalid-feedback">{errors.cpassword}</span>
                                        )}
                                        <input type="submit" value="Continue" />
                                        <div>
                                    </div>
                                    </form>
                                </div>
                                <div className='slice_forgetPassword_form_foot'>
                                
                                <Link to="/login">Back to <span>Login</span></Link>
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
                                <div className='slice_forgetPassword_form_head'>Forget Password OTP Verify</div>
                                <div className="warning_msg">
                                    <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} />
                                         Please check mail for OTP!
                                    </div>
                                 </div>
                                <div className='slice_forgetPasswordForm'>
                                    <form onSubmit={handleResetSubmit} noValidate>
                                    <div className='email_field_div'>
                                        <input className='col-12' type="text" placeholder='OTP'
                                        name='otp'
                                        autoComplete="off"
                                        onChange={handleResetChange} 
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
                                <button  onClick={resendOtpForget}>Resend otp?</button>
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
