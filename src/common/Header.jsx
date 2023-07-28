import React from 'react'
import { Container, Navbar, Nav } from "react-bootstrap"
import { Link } from 'react-router-dom'
import logo from '../assets/images/1logo_slice.png'

export default function Header() {
    return (
        <>
            <header className='slice_header'>
                <Navbar expand="lg" className='slice_Nav'>
                    <Container fluid>
                        <Navbar.Brand href="#"><img src={logo} alt="logo" className='img-fluid me-2' style={{width: "50px"}} /> SliceLedger</Navbar.Brand>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll" className='justify-content-end'>
                            <Nav
                                className='slice_link_div'
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link className='slice_navLink' href="#home">Home</Nav.Link>
                                <Nav.Link className='slice_navLink' href="#about">About</Nav.Link>
                                <Nav.Link className='slice_navLink' href="#services">Services</Nav.Link>
                                <Nav.Link className='slice_navLink' href="#tokenomics">Tokenomics</Nav.Link>
                                <Nav.Link className='slice_navLink' href="#team">Our Team</Nav.Link>
                                <Nav.Link className='slice_navLink' href="#roadmap">RoadMap</Nav.Link>
                                <Nav.Link className='slice_navLink' href="#faq">Faq</Nav.Link>
                                <Nav.Link className='slice_navLink' href="#contact">Contact Us</Nav.Link>
                                <Link to="/signup"className='nav-link signUp' >SignUp</Link>
                                <Link to="/login" className='nav-link login' >Login</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        </>
    )
}
