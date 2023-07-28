import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import TeamMember from './sub_component/TeamMember';

const options = {
    nav: false,
    items: 1,
    margin: 20,
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
            items: 3,

        }
    }
}

export default function TeamSection() {
    return (
        <>
            <section className='slice_team_section' id='team'>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className='slice_team_Head'>
                                <div className='our_team_text'>Our Team</div>
                                <h2>Meet Our Experts</h2>
                                <hr />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <div>
                                <OwlCarousel className='owl-theme slice_team_carousel' loop margin={10} {...options}>
                                    <div className='item'>
                                        <TeamMember/>
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
