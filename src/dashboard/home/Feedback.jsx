import React, { useState,useContext } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import Header from '../common/Header'
import { toast } from 'react-toastify';
import SideNavbar from '../common/SideNavbar'
import myContext from '../../context/MyContext'
import {CurrencyConvert, decryptData, exchangeCurrency} from '../../Helper'

export default function Feedback() {
    const showNav = useContext(myContext)
    const accessToken = localStorage.getItem('accessToken')
    const auth = JSON.parse(localStorage.getItem('auth'))
    const [textError, setTextError] = useState(false);
    const [description, setDescription] = useState();
    const [errormsg, setErrormsg] = useState();
   
    
    function handleChange(e){
        let value = e.target.value;
        setDescription(value)
        if (value.length < 4 || value.length > 500) {
            setTextError(true)
            setErrormsg('Please enter greater than 4 and less than 500 character!');
        }else{
            setTextError(false)
        }
        if (value.length === 0) {
            setTextError(true)
            setErrormsg('');
        }
    }
    
    function sendFeedback(){
    
        if (!description) {
            setTextError(true)
            setErrormsg('');
            return
        }
        if (description.length < 4 || description.length > 500) {
            return
        }
        
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/feedback", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Authorization": accessToken
                },
                "body": JSON.stringify({
                    description: description,
                })
            })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response)

                if (res.status === 200) {
                    toast.success(res.message)
                    setDescription('')
                }
                if (parseInt(res.status) === 401) {
                    History('/login');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <Header/>
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px",transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>

                <div className="user_feedback_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw",transition: "all 0.5s ease" }}>
                    <Container>
                        <Row className='justify-content-center'>
                            <Col lg={8}>
                                <div className="user_feedback_div">
                                    <div className="feedback_content">
                                        <div className="feedback_title">
                                            <h5>Feedback/Suggestions</h5>
                                        </div>

                                        <div className="feedback_text">
                                            <p>Tell Us What you love about Slice Ledger, Or what we could be doing Better</p>

                                        </div>

                                        <div className="feedback_msg_input">
                                            <textarea className='form-control' rows={6}
                                            placeholder='Write your feedback/suggestions'
                                            onChange={handleChange}
                                            value={description}
                                            >
                                            </textarea>
                                        </div>
                                        { (textError === true) ? 
                                            <p className='text-danger'>{(errormsg != '') ? errormsg : 'The text field is required!' }</p>
                                            : ""
                                        }
                                        <div className="feedback_btn">
                                            <button className='submit_btn' onClick={sendFeedback}>Submit</button>
                                        </div>
                                    </div>
                                </div>

                            </Col>
                        </Row>

                    </Container>
                </div>
            </div>
        </>
    )
}

