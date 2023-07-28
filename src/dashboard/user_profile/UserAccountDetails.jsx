import React, { useState,useContext,useRef,useEffect } from 'react'
import { useForm } from "react-hook-form";
import { Container, Row, Col, Accordion } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash, faCircleExclamation, faEye } from '@fortawesome/free-solid-svg-icons'
import Header from '../common/Header'
import { toast } from 'react-toastify'
import SideNavbar from '../common/SideNavbar'
import myContext from '../../context/MyContext'
import validate from '../../validation/AddBank'
import { decryptData } from '../../Helper'
import { AddBankForm } from '../../Form'


export default function User_Account_details() {
    const showNav = useContext(myContext)
    const accessToken =  localStorage.getItem('accessToken')
    const auth =  JSON.parse(localStorage.getItem('auth'));
    const bankaccount =  JSON.parse(localStorage.getItem('bankaccount'));
    
    const name = auth.first_name+" "+ auth.last_name;
    const [togglePwd, setTogglePwd] = useState(false)
    const [passwordShown, setPasswordShown] = useState(false);
    const handleCheckPassword = () => {
        setTogglePwd(!togglePwd)
        setPasswordShown(!passwordShown)
    }

    const [toggleRePwd, setToggleRePwd] = useState(false)
    const [repasswordShown, setRePasswordShown] = useState(false);
    const handleCheckRePassword = () => {
        setToggleRePwd(!toggleRePwd)
        setRePasswordShown(!repasswordShown)
    }
     
    // Add Bank Api Call......................................
function AddBank() {
   
    fetch("https://bharattoken.org/sliceLedger/admin/api/auth/addBank", {
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json",
          "Authorization": accessToken
        },
        
        "body": JSON.stringify({
            name:name,
            bankName:values.bankName,
            acountNumber:values.acountNumber,
            ifsc:values.ifsc,
            acountType:values.acountType
         
        })
      })
      .then(response => response.json())
      .then(response => {
        const res  = decryptData(response)
        //console.log(res);
        if (parseInt(res.status) === 200) {
           toast.success(res.message)  
           window.location.reload();
        }else{
            toast.error(res.message)
        }
       if (parseInt(res.status) === 401) {
            History('/login');
    }
         })
      .catch(err => {
        console.log(err);
      });
    }
// End Add bank Api Call..............................
const {
    values,
    errors,
    handleChange,
    handleSubmit
  } = AddBankForm(AddBank, validate);

 
    return (
        <>
            <Header/>
            <div className="main-section d-flex">

                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>
                <section className='slice_user_account_details' style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                    <Container>
                        <Row className='justify-content-center'>
                        {!bankaccount? 
                            <Col lg={8}>
                            <div className="account_details_div">
                                <div className="head">
                                    <div>Add your bank account to enable {auth.currency} deposits and withdrawals</div>
                                </div>

                                <div className="text">
                                    <div>Bank Account should belong to</div>
                                </div>
                                <div className="username">
                                    <p>{name}</p>
                                </div>
                                <form  onSubmit={handleSubmit} noValidate>
                               
                                <div className="account_number_fields">
                                    <div className="bank_name_div">
                                        <input type="text" placeholder="Enter Bank Name"
                                               name="bankName"
                                               onChange={handleChange}  />
                                    </div>
                                    {errors.bankName && (
                                        <span className="error invalid-feedback">{errors.bankName}</span>
                                    )}
                                    <div className="account_number_div">
                                        <input type={passwordShown ? "text" : "password"} placeholder='Enter Account Number'  
                                        onChange={handleChange} 
                                        name="acountNumber"/>
                                        <div className="icon" onClick={handleCheckPassword}>
                                            <FontAwesomeIcon icon={togglePwd ? faEye : faEyeSlash} />
                                        </div>
                                    </div>
                                    {errors.acountNumber && (
                                        <span className="error invalid-feedback">{errors.acountNumber}</span>
                                    )}
                                    <div className="re-account_number_div">
                                        <input type={repasswordShown ? "text" : "password"} placeholder='Re-Enter Account Number' 
                                        onChange={handleChange} 
                                        name="re_acountNumber"/>
                                        <div className="icon" onClick={handleCheckRePassword}>
                                           <FontAwesomeIcon icon={toggleRePwd ? faEye : faEyeSlash} />
                                        </div>
                                    </div>
                                    {errors.re_acountNumber && (
                                        <span className="error invalid-feedback">{errors.re_acountNumber}</span>
                                    )}
                                    <div className="ifsc_code_div">
                                        <input type="text" placeholder='IFSC Code' 
                                        onChange={handleChange} 
                                        name="ifsc"/>
                                    </div>
                                    {errors.ifsc && (
                                        <span className="error invalid-feedback">{errors.ifsc}</span>
                                    )} 
                                    <div className="account_type_div">
                                    <select  onChange={handleChange} name="acountType" id='select'>
                                        <option value=" ">Select Account Type</option>
                                        <option value="Saving">Savings Account</option>
                                        <option value="Current">Current Account </option>
                                     </select>
                                     </div>
                                     {errors.acountType && (
                                        <span className="error invalid-feedback">{errors.acountType}</span>
                                    )} 
                                    <div className="warning_msg">
                                        <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} /></div>
                                        <p>The above bank account must belong to you. Any other bank account will be rejected.</p>
                                    </div>

                                    <div className="account_details_btn">
                                        <button className='proceed_button' type="submit">Proceed</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </Col>
                            :
                            <Col lg={8}>
                            <div className="account_details_div">
                                <div className="head">
                                    <div className='text-center'>Your Bank Account Details</div>
                                </div>

                                    <div className="text account_number_fields">
                                        <p className='text_holder_name'>Account Holder Name : <b>{name}</b></p>
                                        
                                    </div>
                                    
                               <div className="account_number_fields">
                                 <Row>
                                 <Col lg={4} md={4}>
                                    <p className='title mt-4'>Bank Name</p>
                                   </Col>
                                   <Col lg={8} md={8}>
                                    <div className="account_number_div">
                                    <input type="text" value={bankaccount.bankName?bankaccount.bankName:""} readOnly />  
                                </div>
                                </Col>
                                    <Col lg={4} md={4}>
                                        <p className='title mt-4'>Account Number</p>
                                    </Col>
                                    <Col lg={8} md={8}>
                                        <div className="account_number_div">
                                            <input type={passwordShown ? "text" : "password"} value={bankaccount.acountNumber?bankaccount.acountNumber:""} readOnly />  
                                            <div className="icon" onClick={handleCheckPassword}>
                                                <FontAwesomeIcon icon={togglePwd ? faEye : faEyeSlash} />
                                            </div>
                                        </div>
                                    </Col>
                                   <Col lg={4} md={4}>
                                    <p className='title mt-4'>IFSC</p>
                                   </Col>
                                   <Col lg={8} md={8}>
                                    <div className="account_number_div">
                                    <input type="text" value={bankaccount.ifsc?bankaccount.ifsc:""} readOnly />  
                                </div>
                                </Col>
                                <Col lg={4} md={4}>
                                    <p className='title mt-4'>Account Type</p>
                                </Col>
                                <Col lg={8} md={8}>
                                    <div className="account_number_div">
                                    <input type="text" value={bankaccount.acountType?bankaccount.acountType:""}  readOnly />  
                                    </div>
                                </Col>
                            </Row>
                               </div>
                                </div>
                           </Col>
                        }
                            
                        </Row>
                    </Container>
                </section>
            </div>
        </>
    )
}
