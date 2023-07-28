import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Accordion } from 'react-bootstrap'
import { decryptData } from '../Helper'

export default function Faq() {
    const [faqs, setFaqs] = useState([]);

    console.log("faqsqqqqqq", faqs);
    useEffect(() => {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/faqs", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
            },
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response);
                setFaqs(res.result)

            }).catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <section className='slice_faq_section' id='faq'>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="faq_div">
                                <div className='faq_title'>FAQ</div>
                                <h2 className='faq_subtitle'>Most Asked Question</h2>
                                <Accordion defaultActiveKey="0">
                                    {
                                        faqs ?

                                        faqs.map((e,index) => {
                                                return (
                                                    <Accordion.Item eventKey={index}>
                                                        <Accordion.Header>{e.questions}</Accordion.Header>
                                                        <Accordion.Body>
                                                            {e.answers}
                                                        </Accordion.Body>
                                                    </Accordion.Item>
                                                )
                                            })

                                            :
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Accordion Item #1</Accordion.Header>
                                                <Accordion.Body>
                                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                    velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                                    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                                    est laborum.
                                                </Accordion.Body>
                                            </Accordion.Item>
                                    }
                                    

                                </Accordion>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
