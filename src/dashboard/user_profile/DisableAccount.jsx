import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Col, Container, Row, Modal, Button } from 'react-bootstrap'
import Header from '../common/Header'
import { decryptData } from '../../Helper'
import { toast } from 'react-toastify'
import SideNavbar from '../common/SideNavbar'
import myContext from '../../context/MyContext'

const DisableAccount = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showAllDevice, setAllDeviceShow] = useState(false);

    const handleAllDeviceClose = () => setAllDeviceShow(false);
    const handleAllDeviceShow = () => setAllDeviceShow(true);
    const showNav = useContext(myContext)
    const History = useNavigate()
    const accessToken = localStorage.getItem('accessToken')

    // =======================Logout Api Call=====================================
    function disable() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/disable", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            }
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response);
                if (parseInt(res.status) == 200) {
                    localStorage.removeItem('accessToken');
                    localStorage.clear();
                    sessionStorage.clear()
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
    // ===============================End Logout Api Call ========================================

    return (
        <>
            <Header />
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>

                <div className="disable_account_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                    <Container>
                        <Row className='justify-content-center'>
                            <Col lg={8}>
                                <div className="disable_account_div">
                                    <div className="disable_head">
                                        <h5>Suspicious Activity?</h5>
                                    </div>
                                    <div className="disable_text">
                                        <div className="title">
                                            <p>Please disable your account to secure your funds.</p>

                                        </div>
                                    </div>
                                    <div className="disable_btn">
                                        <button className='btn btn-danger' onClick={handleAllDeviceShow}>Disable Your Account</button>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Modal show={showAllDevice} onHide={handleAllDeviceClose} centered>

                <Modal.Body className='w-100 text-center'>
                    <div className='container mt-3'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h4 className='mb-1'>Are you sure?</h4>
                                <p>You will be logged out of your account on all devices. To re-enable your account please contact our support team.</p>
                                <div>
                                    <Button type='button' className='mb-3 mt-2' onClick={disable} style={{ backgroundColor: "#dc3545", border: "none", padding: "7px 70px" }} >
                                        Continue
                                    </Button>
                                </div>
                                <div>
                                    <Button onClick={handleAllDeviceClose} style={{ color: "blue", backgroundColor: "transparent", border: "none" }}>
                                        Cancel
                                    </Button></div>
                            </div>
                        </div>
                    </div>
                </Modal.Body>

            </Modal>
        </>
    )
}

export default DisableAccount