import React from 'react'
import { Col, Container, Image, Row } from 'react-bootstrap'
import BestSecurity from '../assets/images/bestSecurity.webp'
import MarketActivity from '../assets/images/marketActivity.webp'

export default function HeroSection() {
    return (
        <>
            <section className='slice_hero_section' id='home'>
                <Container>
                    <Row>
                        <Col lg={6} md={6}>
                            <div className='slice_hero_content_div'>
                                <div className='slice_hero_contents'>
                                    <h1>Slice Ledger Token <br /> Your Head Title Text Here</h1>
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minus illum labore voluptatum facilis dolorem dicta a accusamus soluta tenetur fuga quis placeat odit quod, cum vero asperiores? Iure, cum earum.</p>
                                    <button>Learn More</button>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            <div className='heroSection_imgDiv'>
                                {/* <Image className='w-100' src={Hero} alt="hero" fluid/> */}
                                <div className='BestSecurity_Div'>
                                    <Image className="BestSecurity_img" src={BestSecurity} fluid />
                                </div>
                                <div className='MarketActivity_Div'>
                                    <Image className="MarketActivity_img" src={MarketActivity} fluid />
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
