import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { decryptData } from '../Helper'
export default function Footer() {

    const [contact_us, setContactInformation] = useState([]);

    console.log("footerrrrrrrr", contact_us);
    useEffect(() => {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/contact_information", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
            },
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response);
                setContactInformation(res.result[0])

            }).catch(err => {
                console.log(err);
            });
    }, []);
    return (
        <>
            <section className='slice_footer_section'>
                <Container>
                    <Row>
                        <Col lg={4}>
                            <div className="slice_footer_about">
                                <h2>SliceLedger</h2>
                                <hr />
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam soluta ipsum nisi hic molestias voluptatem aliquid quidem eveniet, error consequatur iure ad quia enim pariatur eum iusto ratione natus esse.</p>
                            </div>
                        </Col>
                        {/* <Col lg={3}>
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
                        </Col> */}
                        <Col lg={4}>
                            <div className="slice_social_links">
                                <h4>Social Links</h4>
                                <hr />
                                <ul>
                                    <li><a href={contact_us?contact_us.twitter_link:"javascript:void(0)"} target="_blank">Twitter</a></li>
                                    <li><a href={contact_us?contact_us.facebook_link:"javascript:void(0)"} target="_blank">Facebook</a></li>
                                    <li><a href={contact_us?contact_us.instagram_link:"javascript:void(0)"} target="_blank">Instagram</a></li>
                                    <li><a href={contact_us?contact_us.discord_link:"javascript:void(0)"} target="_blank">Discord</a></li>
                                </ul>
                            </div>
                        </Col>
                        <Col lg={4}>
                            <div className="slice_contact_us">
                                <h4>Contact Us</h4>
                                <hr />
                                <ul>
                                    <li><a href={"tel:"+contact_us.contact_no}>+91-{contact_us?contact_us.contact_no:"+91 9770477239"}</a> </li>
                                    <li><a href="javascript:void(0)">{contact_us?contact_us.address:"Indore, India,452010"}</a> </li>
                                    <li><a href={"mailto:"+contact_us.email}>{contact_us?contact_us.email:"info@infograins.com"}</a> </li>
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
