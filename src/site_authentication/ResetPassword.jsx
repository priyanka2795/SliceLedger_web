import React, {  useContext } from 'react'
import myContext from '../context/MyContext'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Row, Image } from 'react-bootstrap'
import validate from '../validation/VerifyOtp'
import Login_img from '../assets/images/login.png'
import { decryptData } from '../Helper'
import { ResetPForm } from '../Form'
import { toast } from 'react-toastify';

export default function ResetPassword() {
    const data = useContext(myContext);
    let History = useNavigate()
    const userEmail = window.sessionStorage.getItem("email");

    const {
        values,
        errors,
        handleChange,
        handleSubmit
      } = ResetPForm(Login, validate);

    // ===============================Get IP Adsress ========================================


     // =======================SignUp Api Call=====================================
     function Login() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/resetpassword", {
            "method": "POST",
            "headers": {
              "content-type": "application/json",
              "accept": "application/json"
            },
            "body": JSON.stringify({
              email:userEmail,
              otp:values.otp,
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
    
    return (
        <>
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
                                <div className='slice_forgetPassword_form_head'>Login</div>
                                <div className='slice_forgetPasswordForm'>
                                    <form onSubmit={handleSubmit} noValidate>
                                    <div className='email_field_div'>
                                        <input className='col-12' type="text" placeholder='OTP'
                                        name='otp'
                                        autoComplete="off"
                                        onChange={handleChange} 
                                        style={{ background:"transparent" , border:"none",color:"white"}}
                                        />
                                    </div>
                                    {errors.otp && (
                                        <span className="error invalid-feedback">{errors.otp}</span>
                                    )}
                                        <input type="submit" value="Continue" />
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
