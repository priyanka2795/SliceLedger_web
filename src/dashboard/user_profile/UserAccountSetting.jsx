import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Container, Row, Col, Tab, Nav } from 'react-bootstrap'
import UserKYCVerification from './UserKYCVerification'
import UserAccountDetails from './UserAccountDetails'


export default function UserAccountSetting() {
    return (
        <>
            <Header />

            <section className="slice_user_account_setting">
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={10}>
                            <div className="user_account_setting_div">
                                <div className="user_account_head">
                                    <h5>Account Setting</h5>
                                </div>

                                <div className="user_account_setting_tabs">
                                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                                        <Row>
                                            <Col sm={5}>
                                                <Nav variant="pills" className="flew-row">
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="first">KYC Varification</Nav.Link>
                                                    </Nav.Item>
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="second">Account Details</Nav.Link>
                                                    </Nav.Item>
                                                </Nav>
                                            </Col>
                                            <Col sm={12} className="mt-5">
                                                <Tab.Content>
                                                    <Tab.Pane eventKey="first">
                                                       <UserKYCVerification/>
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="second">
                                                        <UserAccountDetails/>
                                                    </Tab.Pane>
                                                </Tab.Content>
                                            </Col>
                                        </Row>
                                    </Tab.Container>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>

            <Footer/>
        </>
    )
}
