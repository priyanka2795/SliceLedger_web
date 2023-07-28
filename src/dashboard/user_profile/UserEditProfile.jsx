import React, { useContext } from 'react'
import { Container, Row, Col, Image, Form } from 'react-bootstrap'
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import myContext from '../../context/MyContext'
import {BsCameraFill} from 'react-icons/bs'
export default function UserEditProfile() {
    const showNav = useContext(myContext)
    const auth =  JSON.parse(localStorage.getItem('auth'));

    return (
        <>
            <Header />
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>
                <section className='slice_user_profileHome_section' style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                    <Container>

                        <Row className='justify-content-center'>
                            <Col lg={8}>
                                <div className="user_profileHome_container">
                                    <div className="user_profile_details">
                                        <Row>
                                            <Col lg={12}>
                                                <div className="my_profile_title">
                                                    <h5>Edit Profile</h5>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mt-3">
                                            <div className="edit_profile_img">
                                            <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" fluid />
                                           <div class="wrapper">
                                               <div class="file-upload">
                                                   <input type="file" />
                                                   <BsCameraFill />
                                               </div>
                                           </div>
                                       </div>
                                            </Col>

                                            <Col lg={8} className="mt-3">
                                                <div className="personal_section">
                                                    <div className="person_info_title">
                                                        <h6>Personal Information</h6>
                                                        <button className='btn btn-primary update_btn'>Update</button>
                                                    </div>

                                                    <div className="person_details">
                                                        <Row>

                                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                                <Form.Label column sm="4">
                                                                    First Name
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control type="password" placeholder="Priyanka" />
                                                                </Col>
                                                            </Form.Group>

                                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                                <Form.Label column sm="4">
                                                                    Last Name
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control type="password" placeholder="Varma" />
                                                                </Col>
                                                            </Form.Group>

                                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                                <Form.Label column sm="4">
                                                                    Email Id
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control type="password" placeholder="user@gmail.com" />
                                                                </Col>
                                                            </Form.Group>


                                                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                                                <Form.Label column sm="4">
                                                                    Mobile No
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control type="password" placeholder="9999999999" />
                                                                </Col>
                                                            </Form.Group>




                                                        </Row>
                                                    </div>
                                                </div>

                                                

                                                <div className="account_section">
                                                    <div className="account_info_title">
                                                        <h6>Account Information</h6>
                                                    </div>

                                                    <div className="account_details">
                                                        <Row>

                                                            <Col lg={6} md={6}>
                                                                <p className='title color'>Current Balance</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                                <p className='text color'>10,000 INR</p>
                                                            </Col>

                                                            <Col lg={6} md={6}>
                                                                <p className='title'>Account Name	</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                                <p className='text'>Demo</p>
                                                            </Col>

                                                            <Col lg={6} md={6}>
                                                                <p className='title'>Account No</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                                <p className='text'>XXXX-XXXXX-XXXX-XXX</p>
                                                            </Col>

                                                            <Col lg={6} md={6}>
                                                                <p className='title'>IFSC Code</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                                <p className='text'>AEFD50254</p>
                                                            </Col>

                                                            <Col lg={6} md={6}>
                                                                <p className='title'>Account Type</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                                <p className='text'>Salary</p>
                                                            </Col>
                                                        </Row>
                                                    </div>

                                                </div>
                                               
                                            </Col>
                                        </Row>
                                    </div>
                                </div>

                            </Col>
                        </Row>

                    </Container>
                </section>
            </div>

        </>
    )
}

