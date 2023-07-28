import React, { useState,useContext, useEffect } from 'react'
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import { Container, Row, Col } from 'react-bootstrap'
import razorPay from '../../assets/images/razorpay.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
import TransferPayment from './TransferPayment'
import myContext from '../../context/MyContext'

export default function PaymentMethod() {
    const showNav = useContext(myContext)

    const [paymentSelected, setPaymentSelected] = useState(true)
    const handleSelect = () => {
        setPaymentSelected(false)
    }

    const options = {
        key: "rzp_test_HJG5Rtuy8Xh2NB",
        amount: "100", //  = INR 1
        name: "Acme shop",
        description: "some description",
        image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
        handler: function(response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: "Gaurav",
          contact: "9999999999",
          email: "demo@demo.com"
        },
        notes: {
          address: "some address"
        },
        theme: {
          color: "#F37254",
          hide_topbar: false
        }
      };
    
      const openPayModal = options => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
      };
      useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);

    return (
        <>
            <Header />
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>

                <div className="payment_method_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                    {paymentSelected ?
                        <Container>
                            <Row className="justify-content-center">
                                <Col lg={8}>
                                    <div className="payment_content">
                                        <div className="payment_head">
                                            <h5>Select Payment Method</h5>
                                        </div>

                                        <div className="available_balance_div">
                                            <div className="text">Available Balance</div>
                                            <div className="amount">5000 INR</div>
                                        </div>

                                        <div className="select_method">
                                            <div className="razorPay">
                                                <div className="razorPay_input">
                                                    <input type="radio" name='payment' value="razorPay" />
                                                </div>
                                                <div className="razorPay_image">
                                                    <img src={razorPay} alt="razorPay_img" className='img-fluid' />
                                                    <div className="payment_limit">
                                                        Limit: Min 100 to Max 10,000
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="transfer_bank">
                                                <div className="transfer_bank_input">
                                                    <input type="radio" name='payment' value="transfer_bank" />
                                                </div>
                                                <div className="transfer_bank_image">
                                                    <div className="bank_icon">
                                                        <FontAwesomeIcon icon={faBuildingColumns} />
                                                        <div className="title">Transfer to Any Bank</div>
                                                    </div>
                                                    <div className="payment_limit">
                                                        Limit: Min 1000 to Max 50 Lak
                                                    </div>
                                                    <div className="payment_limit">
                                                        Fees: 0%
                                                    </div>
                                                    <div className="payment_limit">
                                                        Processing time: Upto 12 hours
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="payment_continue_btn">
                                            <button className='continue_btn btn btn-success' onClick={() => openPayModal(options)} >Continue</button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                        :
                        <div className="transferPayment_method">
                            <TransferPayment />
                        </div>
                    }


                </div>
            </div>


        </>
    )
}


