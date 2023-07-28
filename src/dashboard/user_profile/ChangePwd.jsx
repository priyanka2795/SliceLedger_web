import React,{useState,useContext} from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEyeSlash,faEye, faShieldVirus} from '@fortawesome/free-solid-svg-icons'
import { useNavigate  } from 'react-router-dom'
import { decryptData } from '../../Helper'
import { ChangePForm } from '../../Form'
import { toast } from 'react-toastify'
import SideNavbar from '../common/SideNavbar'
import validate from '../../validation/ChangePassword'
import myContext from '../../context/MyContext'
import Header from '../common/Header'

export default function ChangePwd() {
  const showNav = useContext(myContext)
  const [oldPasswordError, setoldPasswordError] = useState();
  const History = useNavigate();
  const accessToken =  localStorage.getItem('accessToken')
  const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = ChangePForm(changePassword, validate);

  // =======================SignUp Api Call=====================================
  function changePassword() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/changePassword", {
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json",
          "Authorization": accessToken
        },
        "body": JSON.stringify({
          oldPassword:values.oldPassword,
          newPassword:values.password
        })
      })
      .then(response => response.json())
      .then(response => {
        const res  = decryptData(response)
        if (parseInt(res.status) == 200) {
            toast.success(res.message)
            document.getElementById("changePassword").reset();
        }else{
          toast.error(res.message)
            // setoldPasswordError(res.message);
        }

        if (parseInt(res.status) == 401) {
            History('/login');
        }

      })
      .catch(err => {
        console.log(err);
      });
  }

  // =======password hide show on toggle icon function =========
  const [togglePwdOld, setTogglePwdOld] = useState(false)
  const [togglePwdNew, setTogglePwdNew] = useState(false)
  const [togglePwdConfirm, setTogglePwdConfirm] = useState(false)

  const [passwordShownOld, setPasswordShownOld] = useState(false);
  const [passwordShownNew, setPasswordShownNew] = useState(false);
  const [passwordShownConfirm, setPasswordShownConfirm] = useState(false);

  const handleCheckPasswordOld =()=>{
      setTogglePwdOld(!togglePwdOld)
      setPasswordShownOld(!passwordShownOld)
  }
  const handleCheckPasswordNew =()=>{
    setTogglePwdNew(!togglePwdNew)
    setPasswordShownNew(!passwordShownNew)
  }
  const handleCheckPasswordConfirm =()=>{
    setTogglePwdConfirm(!togglePwdConfirm)
    setPasswordShownConfirm(!passwordShownConfirm)
}
// =======password hide show on toggle icon function =========

  return (
    <>

      <Header/>
    <div className="main-section d-flex">
    <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar/>
                </div>
      <section className='slice_user_change_pwd' style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={6} md={9}>
              <div className="change_pwd_form">
              <div className="head">
                  <h4>Change Password</h4>
              </div>
              <div className="text">
                <p>Enter a new password for your Sliceledger account below</p>
              </div>
              <form onSubmit={handleSubmit} noValidate id="changePassword">
                <div className="change_pwd_inputs">
                  <div className="old_pwd_div">
                    <input type={passwordShownOld ? "text" : "password"} placeholder='Old Password'
                      name='oldPassword'
                      autoComplete="off"
                      onChange={handleChange}
                      
                    />
                    <div className="icon" onClick={handleCheckPasswordOld}>
                      <FontAwesomeIcon icon={togglePwdOld ? faEye : faEyeSlash} />
                    </div>
                  </div>
                  {errors.oldPassword && (
                      <span className="error invalid-feedback">{errors.oldPassword}</span>
                  )}
                  { oldPasswordError && (
                      <span className="error invalid-feedback">{oldPasswordError}</span>
                  )}
                  <div className="new_pwd_div">
                    <input type={passwordShownNew ? "text" : "password"} placeholder='New Password' 
                    name='password'
                    autoComplete="off"
                    onChange={handleChange}
                    
                    />
                      <div className="icon" onClick={handleCheckPasswordNew}>
                      <FontAwesomeIcon icon={togglePwdNew ? faEye : faEyeSlash} />
                      </div>
                  </div>
                  {errors.password && (
                      <span className="error invalid-feedback">{errors.password}</span>
                  )}
                  <div className="confirm_new_pwd_div">
                    <input type={passwordShownConfirm ? "text" : "password"} placeholder='Confirm New Password' 
                      name='cpassword'
                      autoComplete="off"
                      onChange={handleChange}
                      
                    />
                      <div className="icon" onClick={handleCheckPasswordConfirm}>
                      <FontAwesomeIcon icon={togglePwdConfirm ? faEye : faEyeSlash} />
                      </div>
                  </div>
                  {errors.cpassword && (
                      <span className="error invalid-feedback">{errors.cpassword}</span>
                  )}
                 
                  <div className='user_changePwd_Btn'>
                      <button className='pwd_btn'>Change Password</button>
                  </div>
                </div>
              </form>
              </div>
             
            </Col>
          </Row>
        </Container>
      </section>
    </div>
 
    </>
  )
}
