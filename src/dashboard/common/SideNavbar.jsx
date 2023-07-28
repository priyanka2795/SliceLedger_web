import React, { useState } from 'react'
import { Container, Row, Col, Accordion, Modal, Button } from "react-bootstrap"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faGauge, faUser, faPenToSquare, faSliders, faUserXmark, faKey, faFileInvoice, faUserCheck, faMoneyBillTransfer, faMessage, faArrowRightFromBracket, faLock } from '@fortawesome/free-solid-svg-icons'
// import { faWallet} from '@fortawesome/free-regular-svg-icons'
import { decryptData } from '../../Helper'
import { ReactSession } from 'react-client-session'


export default function SideNavbar() {
    ReactSession.setStoreType("localStorage");
    let History = useNavigate();
    const location = useLocation();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    const accessToken = localStorage.getItem('accessToken')
   

    // =======================Logout Api Call=====================================
    function logout() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/logout", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                Authorization: accessToken
            },
        })
            .then(response => response.json())
            .then(response => {

                const res = decryptData(response)
                localStorage.removeItem('accessToken');
                localStorage.clear();
                sessionStorage.clear()
                History('/login');

            })
            .catch(err => {
                console.log(err);
                localStorage.removeItem('accessToken');
                localStorage.clear();
                sessionStorage.clear()
                History('/login');
            });
    }
    // ===============================End Logout Api Call ========================================
    return (
        <>
            <div className="slice_dash_sideNav">
                <Container>
                    <Row>
                        <Col lg={12} className="px-0">
                            <div className="sideNav_header d-none">
                                <div className="slice_logo">
                                    <a href="#" className='navbar-brand'>SliceLedger</a>
                                </div>
                            </div>
                            <div className="sideNav_body">
                                <div className="sideNav_menu">
                                    <ul>
                                        <li>
                                            <div className='menu'>
                                                <div className='title'><a href='https://testnet.bscscan.com/address/0xc1bac8d2bf9e2bd65fae82f1061d4ab2ff3c29a0' target='_blank'>View BSC Scan</a></div>
                                            </div>
                                        </li>
                                        <li className={splitLocation[1] === "dashboard" ? "active" : ""}>
                                            <Link to='/dashboard'> <div className='menu'>
                                                <div className='menu_icon'>
                                                    <FontAwesomeIcon icon={faGauge} />
                                                </div>
                                                <div className='title'>Dashboard</div>
                                            </div>
                                            </Link>

                                        </li>
                                        <li>
                                            <Accordion defaultActiveKey={(()=>{
                                                  if(splitLocation[1] ===  "user_profile"){
                                                    return "0"
                                                }
                                                if(splitLocation[1] ===  "account_details"){
                                                    return "0"
                                                }
                                                if(splitLocation[1] ===  "disable_account"){
                                                    return "0"
                                                }
                                                if(splitLocation[1] ===  "user_change_pwd"){
                                                    return "0"
                                                }
                                            })()
                                             }>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <div className='menu'>
                                                            <div className='menu_icon'>
                                                                <FontAwesomeIcon icon={faUser} />
                                                            </div>
                                                            <div className='title'>Profile</div>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul style={{ marginLeft: "-30px" }}>
                                                            <li className={splitLocation[1] === "user_profile" ? "active" : ""}>
                                                                <Link to='/user_profile'><div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faUser} />
                                                                    </div>
                                                                    <div className='title'>My Profile</div>
                                                                </div>
                                                                </Link>
                                                            </li>

                                                            <li className={splitLocation[1] === "account_details" ? "active" : ""}>
                                                                <Link to='/account_details'><div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faSliders} />
                                                                    </div>
                                                                    <div className='title'>Account Details</div>
                                                                </div>
                                                                </Link>
                                                            </li>
                                                            <li className={splitLocation[1] === "disable_account" ? "active" : ""}>
                                                                <Link to='/disable_account'><div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faUserXmark} />
                                                                    </div>
                                                                    <div className='title'>Disable Account</div>
                                                                </div>
                                                                </Link>
                                                            </li>
                                                            <li className={splitLocation[1] === "user_change_pwd" ? "active" : ""}>
                                                                <Link to='/user_change_pwd'><div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faKey} />
                                                                    </div>
                                                                    <div className='title'>Change Password</div>
                                                                </div>
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>


                                            </Accordion>
                                        </li>
                                        <li>
                                        <Accordion defaultActiveKey={(()=>{
                                                  if(splitLocation[1] ===  "fiat_wallet"){
                                                    return "0"
                                                }
                                                if(splitLocation[1] ===  "slice_wallet"){
                                                    return "0"
                                                }
                                                if(splitLocation[1] ===  "internal_transfer"){
                                                    return "0"
                                                }
                                               
                                            })()
                                             }>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <div className='menu'>
                                                            <div className='menu_icon'>
                                                                <FontAwesomeIcon icon={faWallet} />
                                                            </div>
                                                            <div className='title'>Wallet</div>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul style={{ marginLeft: "-25px" }}>
                                                            <li className={splitLocation[1] === "fiat_wallet" ? "active" : ""}>
                                                                <Link to='/fiat_wallet'><div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faWallet} />
                                                                    </div>
                                                                    <div className='title'>Fiat Wallet</div>
                                                                </div>
                                                                </Link>
                                                            </li>
                                                            <li className={splitLocation[1] === "slice_wallet" ? "active" : ""}>
                                                                <Link to='/slice_wallet'><div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faWallet} />
                                                                    </div>
                                                                    <div className='title'>Slice Wallet</div>
                                                                </div>
                                                                </Link>
                                                            </li>
                                                            <li className={splitLocation[1] === "internal_transfer" ? "active" : ""}>
                                                                <Link to='/internal_transfer'><div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faMoneyBillTransfer} />
                                                                    </div>
                                                                    <div className='title'>Internal Transfer</div>
                                                                </div>
                                                                </Link>
                                                            </li>

                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>


                                            </Accordion>

                                        </li>
                                        <li className={splitLocation[1] === "kyc_verification" ? "active" : ""}>
                                            <Link to='/kyc_verification'> <div className='menu'>
                                                <div className='menu_icon'>
                                                    <FontAwesomeIcon icon={faUserCheck} />
                                                </div>
                                                <div className='title'>KYC Verification</div>
                                            </div>
                                            </Link>
                                        </li>

                                        <li className={splitLocation[1] === "feedback" ? "active" : ""}>
                                            <Link to='/feedback'> <div className='menu'>
                                                <div className='menu_icon'>
                                                    <FontAwesomeIcon icon={faMessage} />
                                                </div>
                                                <div className='title'>Feedback</div>
                                            </div>
                                            </Link>
                                        </li>
                                        <li className={splitLocation[1] === "security" ? "active" : ""}>
                                            <Link to='/security'><div className='menu'>
                                                <div className='menu_icon'>
                                                    <FontAwesomeIcon icon={faLock} />
                                                </div>
                                                <div className='title'>Security</div>
                                            </div>
                                            </Link>
                                        </li>
                                        <li  onClick={handleShow}>
                                            <div className='menu logout'>
                                                <div className='menu_icon'>
                                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                                </div>
                                                <div className='title '>Logout</div>
                                            </div>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='w-100 text-center'>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body className='w-100 text-center'>Are you sure you want to logout !</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={logout}>
                        yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
