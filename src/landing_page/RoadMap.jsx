import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
// import Owl carousel
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import Phase from './sub_component/Phase';
import PhaseInverted from './sub_component/PhaseInverted';

const options = {
    nav: false,
    items: 1,
    margin: 0,
    rewind: true,
    autoplay: true,
    slideBy: 1,
    dots: false,
    dotsEach: false,
    dotData: false,
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 5,

        }
    }
}
export default function RoadMap() {
    return (
        <>
            <section className='slice_roadMap_Section'>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className='slice_roadMap_Head'>
                                <h2>RoadMap</h2>
                                <hr />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <OwlCarousel className='owl-theme slice_roadMap_carousel' loop margin={10} {...options}>
                                    <div className='item'>
                                        <Phase />
                                    </div>
                                    <div className='item'>
                                        <PhaseInverted />
                                    </div>
                                    <div className='item'>
                                        <Phase />
                                    </div>
                                    <div className='item'>
                                        <PhaseInverted />
                                    </div>
                                    <div className='item'>
                                        <Phase />
                                    </div>
                                    <div className='item'>
                                        <PhaseInverted />
                                    </div>
                                    <div className='item'>
                                        <Phase />
                                    </div>
                                    <div className='item'>
                                        <PhaseInverted />
                                    </div>
                                </OwlCarousel>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
