import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faEnvelope, faUser, faPhone, faGlobe } from "@fortawesome/free-solid-svg-icons"
import { Col, Container, Row, Form, Image } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Login_img from '../assets/images/login.png'
import validate from '../validation/SignUp';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons'
import { decryptData } from '../Helper'
import { SignUpForm } from '../Form'
import { toast } from 'react-toastify'

export default function SignUp() {

    let History = useNavigate()
    const [countrys, setCountry] = useState([]);
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
      } = SignUpForm(SignUp, validate);

// get Country for signUp select .....................
    useEffect(() => {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/country", {
            "method": "GET",
            "headers": {
              "content-type": "application/json",
              "accept": "application/json"
            }
          })
          .then(response => response.json())
          .then(response => {
            const data  = decryptData(response)
            setCountry(data.result);
          })
          .catch(err => {
            console.log(err);
          });
      }, [])
// country select drop end..............................

// SignUp Api Call......................................
function SignUp() {
    fetch("https://bharattoken.org/sliceLedger/admin/api/auth/signUp", {
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify({
          first_name:values.first_name,
          last_name:values.last_name,
          email:values.email,
          phoneNumber:values.phoneNumber,
          password:values.password,
          country_id:values.country,
        })
      })
      .then(response => response.json())
      .then(response => {
        const res  = decryptData(response)
        if (parseInt(res.status) === 200) {
            toast.success(res.message)
            History('/login');
            } else {
            toast.error(res.message)
        }
      })
      .catch(err => {
        console.log(err);
      });
    }
// End SingUp Api Call..............................


    return (
        <>
            <section className='slice_signUp_section'>
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={6} md={12} className="signup_form_left_bg">
                            <div className='slice_signup_form_left'>
                                <Image src={Login_img} fluid />

                            </div>
                        </Col>
                        <Col lg={6} md={12} className="signup_form_right_bg">
                            <div className="slice_signUp_form">
                                <div className='slice_signUp_form_head'>SignUp</div>
                                <div className='slice_signUpForm'>
                                    <form onSubmit={handleSubmit} noValidate>
                                        <div className='email_field_div'>
                                            <FontAwesomeIcon icon={faUser} />
                                            <input className='col-12' type="text" placeholder='First Name'
                                            name='first_name'
                                            autoComplete="off"
                                            onChange={handleChange} 
                                            />
                                        </div>
                                        {errors.first_name && (
                                            <span className="error invalid-feedback">{errors.first_name}</span>
                                        )}
                                        <div className='email_field_div'>
                                            <FontAwesomeIcon icon={faUser} />
                                            <input className='col-12' type="text" placeholder='Last Name' 
                                            name='last_name'
                                            autoComplete="off"
                                            onChange={handleChange} 
                                            />
                                        </div>
                                        {errors.last_name && (
                                            <span className="error invalid-feedback">{errors.last_name}</span>
                                        )}
                                        <div className='email_field_div'>
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
                                        <div className='email_field_div'>
                                            <FontAwesomeIcon icon={faPhone} />
                                            <input className='col-12' type="tel" pattern='[0-9]{10}' title='xxxxx-xxxxx' placeholder='Phone Number' 
                                            name='phoneNumber'
                                            autoComplete="off"
                                            onChange={handleChange} 
                                            />
                                        </div>
                                        {errors.phoneNumber && (
                                            <span className="error invalid-feedback">{errors.phoneNumber}</span>
                                        )}
                                        <div className='password_field_div'>
                                            <FontAwesomeIcon icon={faLock} />
                                            <input className='col-12 showpasswordClass' type={passwordShown ? "text" : "password"} placeholder='Password' 
                                            name='password'
                                            autoComplete="off"
                                            onChange={handleChange} 
                                            style={{marginRight: "-30px"}}
                                            />
                                            <FontAwesomeIcon onClick={handleCheckPassword} icon={togglePwd ? faEye : faEyeSlash} />
                                          </div>
                                        {errors.password && (
                                            <span className="error invalid-feedback">{errors.password}</span>
                                        )}
                                        <div className='password_field_div'>
                                            <FontAwesomeIcon icon={faLock} />
                                            <input className='col-12 showpasswordClass' type={confirmpasswordShown ? "text" : "password"} placeholder='Confirm Password' 
                                            name='cpassword'
                                            autoComplete="off"
                                            onChange={handleChange} 
                                            style={{marginRight: "-30px"}}
                                            />
                                           <FontAwesomeIcon onClick={handleCheckConfirmPassword} icon={toggleConfirmPwd ? faEye : faEyeSlash} />
                                            </div>
                                        {errors.cpassword && (
                                            <span className="error invalid-feedback">{errors.cpassword}</span>
                                        )}
                                        <div className='select_country_field_div'>
                                            <FontAwesomeIcon icon={faGlobe} />
                                            {/* <input className='col-12' type="password" placeholder='Confirm Password' /> */}
                                            <Form.Select aria-label="Default select example"
                                            name='country'
                                            autoComplete="off"
                                            onChange={handleChange} 
                                            >
                                            <option>Select Country</option>
                                            {countrys.map((country) => ( 
                                                <option value={country.id}>{country.name}</option>
                                            ))}
                                            </Form.Select>
                                        </div>
                                        {errors.country && (
                                            <span className="error invalid-feedback">{errors.country}</span>
                                        )}
                                        <input type="submit" value="SignUp"/>
                                    </form>
                                </div>
                                <div className='slice_signUp_form_foot'>
                                    <Link to="/login">Already have an account? <span>Login</span></Link>
                                    {/* <a href="/">Forget Password ?</a> */}
                                    
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
