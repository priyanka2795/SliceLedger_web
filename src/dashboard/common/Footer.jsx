import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

export default function Footer() {
    return (
        <>
            <section className='slice_dash_footer_section'>
                <Container>
                    <Row>
                        <Col lg={3}>
                            <div className="slice_dash_footer_about">
                                <h2>SliceLedger</h2>
                                <hr />
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam soluta ipsum nisi hic molestias voluptatem aliquid quidem eveniet, error consequatur iure ad quia enim pariatur eum iusto ratione natus esse.</p>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="slice_direct_links">
                                <h4>Direct Links</h4>
                                <hr />
                                <ul>
                                    <li><a href="/"> Home</a></li>
                                    <li><a href="/"> Service</a></li>
                                    <li><a href="/"> About</a></li>
                                    <li><a href="/"> Team</a></li>
                                    <li><a href="/"> RoadMap</a></li>
                                    <li><a href="/"> Faq</a></li>
                                    <li><a href="/"> Graph</a></li>
                                    <li><a href="/"> Contact</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="slice_social_links">
                                <h4>Social Links</h4>
                                <hr />
                                <ul>
                                    <li><a href="/"> Twitter</a></li>
                                    <li><a href="/"> Facebook</a></li>
                                    <li><a href="/"> Instagram</a></li>
                                    <li><a href="/"> Discord</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={3}>
                            <div className="slice_contact_us">
                                <h4>Contact Us</h4>
                                <hr />
                                <ul>
                                    <li><a href="/">+91-00000-00000</a> </li>
                                    <li><a href="/">New York, US, 4220101</a> </li>
                                    <li><a href="/">demo@gmail.com</a> </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div className="slice_copyright_section">
                                Copyright@2022 All Right Reserved
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
