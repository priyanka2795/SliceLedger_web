import React,{ useEffect,useState } from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import About from '../assets/images/about.webp'
import { decryptData } from '../Helper'
export default function AboutSection() {
    
    const [aboutUs, setAboutUs] = useState([]);
    useEffect( ()=>{
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/about_us", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
             },
           })
          .then(response => response.json())
          .then(response => {
            const res  = decryptData(response);
            setAboutUs(res.result[0])
            
         }).catch(err => {
            console.log(err);
          });
        },[])

    return (
        <>
            <section className='slice_about_section' id='about'>
                <Container>
                    <Row>
                        <Col lg={6} md={6}>
                            <div>
                                <Image className='w-100' src={About} alt="about" fluid />
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <div className='slice_about_content_div'>
                                <div className='slice_about_contents'>
                                    <div className='about_text'>About Us</div>
                                    <h2>Your Heading Text Here</h2>
                                    <hr />
                                    <p>{aboutUs?aboutUs.description:""}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
