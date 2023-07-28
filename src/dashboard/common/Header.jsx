import React, {useState, useContext,useEffect,useRef} from 'react'
import { Container, Navbar, Nav, NavDropdown, Image , Row, Col,Modal, Button} from "react-bootstrap"
import { Link,useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders, faArrowRightFromBracket,faBarsStaggered, faXmark} from '@fortawesome/free-solid-svg-icons'
import {faUser, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import profilePic1 from '../../assets/images/member.png'
import myContext from '../../context/MyContext'
import { decryptData } from '../../Helper'
import $ from 'jquery'
import logo from '../../assets/images/1logo_slice.png'

export default function Header(props) {
    const [toggleProfile_card, setToggleProfile_card] = useState(false);
    const [userAuth, setAuth] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let History = useNavigate();
     const accessToken =  localStorage.getItem('accessToken')
     const auth =  localStorage.getItem('auth')
    
    function toggleProfile(params) {
        setToggleProfile_card(!toggleProfile_card)
    }
   
    document.addEventListener('mouseup', function(e) {
        var container = document.getElementById('profileContainer');
        if (!container.contains(e.target)) {
            container.style.display = 'none';
        }
    });
  const showNav = useContext(myContext)
    // console.log("first", first.count);
    // console.log("header",showNav.navOpen);
    useEffect( () => {
        setAuth(JSON.parse(auth))
     }, [])
    //  console.log("auth====",userAuth.profilePic);
    const toggleNav = ()=>{
        showNav.setNavOpen(!showNav.navOpen)
     }

     useEffect( ()=>{
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/user", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            },
           })
          .then(response => response.json())
          .then(response => {
            const res  = decryptData(response);
            localStorage.setItem('auth', JSON.stringify(res.result));
            localStorage.setItem('bankaccount', JSON.stringify(res.result.bankAcount));
            localStorage.setItem('kyc_detail', JSON.stringify(res.result.kyc));
            if (parseInt(res.status) === 401) {
                History('/login');
            }
         }).catch(err => {
            console.log(err);
          });
     },[])
   
    // =======================Logout Api Call=====================================
  function logout() {
    
     fetch("https://bharattoken.org/sliceLedger/admin/api/auth/logout", {
         "method": "GET",
         "headers": {
             "content-type": "application/json",
             "accept": "application/json",
             Authorization: accessToken
         },
        })
       .then(response => response.json())
       .then(response => {
         const res  = decryptData(response)
         localStorage.removeItem('accessToken');
         localStorage.clear();
         sessionStorage.clear()
         History('/login');
         })
        .catch(err => {
            console.log(err);
            localStorage.removeItem('accessToken');
            localStorage.clear();
            sessionStorage.clear()
            History('/login');
        });
 }
 // ===============================End Logout Api Call ========================================
    return (
        <>
             <header className='slice_dash_header'>
            
                <div className='slice_Nav'>
                    <Container fluid>
                        <Row>
                            <Col lg={12}>
                               <div className="nav-bar">
                               <div className="logo">
                                    <div className="brand_logo">
                                        <img src={logo} alt="logo" className='img-fluid' style={{width:"40px"}} /> &nbsp; SliceLedger
                                       </div>
                                    <div className="toggle" onClick={toggleNav}><FontAwesomeIcon icon={showNav.navOpen ? faBarsStaggered : faBarsStaggered}/></div>
                                </div>
                                <div className=' slice_navLink profile_pic_link' onClick={toggleProfile}>
                                    <Image src={userAuth.profilePic?userAuth.profilePic:profilePic1} fluid />
                                    <div className='profile_card' style={toggleProfile_card ? {display:"block"} : {display:"none"}}  id='profileContainer'>
                                        <div className='profile_card_top'>
                                            <Image src={userAuth.profilePic?userAuth.profilePic:profilePic1} fluid />
                                            <h5>{userAuth?userAuth.first_name+" "+userAuth.last_name:" "}</h5>
                                            <em>{userAuth?userAuth.email:" "}</em>
                                        </div>
                                        <div className='profile_card_bottom '>
                                            <ul>
                                                <li>
                                                    <div className='menu'>
                                                        <div><FontAwesomeIcon icon={faUser}/></div>
                                                        <div className='title'><Link to='/user_profile'>My Profile</Link></div>
                                                    </div>
                                                </li>
                                               
                                                {/* <li>
                                                    <div className='menu'>
                                                        <div><FontAwesomeIcon icon={faSliders}/></div>
                                                        <div className='title'><Link to="/user_account_setting">Account Setting</Link></div>
                                                    </div>
                                                </li> */}
                                                <li>
                                                    <div className='menu'>
                                                        <div><FontAwesomeIcon icon={faArrowRightFromBracket}/></div>
                                                        <div className='title' onClick={handleShow}>logOut</div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                               </div>

                            </Col>
                        </Row>
                    </Container>
                </div>
              
            </header>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <Modal.Title className='w-100 text-center'>Logout</Modal.Title>
                        </Modal.Header>
                            <Modal.Body className='w-100 text-center'>Are you sure you want to logout !</Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                No
                            </Button>
                            <Button variant="primary" onClick={logout}>
                            Yes
                        </Button>
                </Modal.Footer>
          </Modal>
        </>
    )
}