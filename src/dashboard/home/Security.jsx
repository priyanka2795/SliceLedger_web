import React, { useContext,useEffect,useState } from 'react'
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import { Container, Row, Col, Tabs, Tab ,Modal, Button} from 'react-bootstrap'
import myContext from '../../context/MyContext'
import {MdOutlineComputer} from 'react-icons/md'
import { decryptData } from '../../Helper'
import Geocode from "react-geocode";

export default function Security() {
    const showNav = useContext(myContext)
    const [loginActivity, setLoginActivity] = useState([]);
    const [location, setLocation] = useState("");
    const accessToken =  localStorage.getItem('accessToken')
    Geocode.setApiKey("AIzaSyBH5ghTGEWkN7OBzMOBkr3gUeGc8RhYBNo");
    Geocode.enableDebug();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showAllDevice, setAllDeviceShow] = useState(false);

    const handleAllDeviceClose = () => setAllDeviceShow(false);
    const handleAllDeviceShow = () => setAllDeviceShow(true);
    console.log("location",location);
    useEffect( ()=>{
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/loginActivity", {
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
            console.log("loginActivity",res.result)
            setLoginActivity(res.result)
            if (parseInt(res.status) === 401) {
                History('/login');
            }
         }).catch(err => {
            console.log(err);
          });
     },[])

function signoutAllDevice(){
    fetch("https://bharattoken.org/sliceLedger/admin/api/auth/allLogout", {
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
      console.log("allDevice",res);
      })
      .catch(err => {
        console.log(err);
        console.log(err);
      });
}

function getLocation(params) {
    Geocode.fromLatLng(params.latitude, params.longitude).then(
        (response) => {
          const address = response.results[0].formatted_address;
          setLocation(address)
        console.log("address",address);
        },
        (error) => {
          console.error(error);
        }
      )
}


    const signOut = event => {
     
      var access_id = event.target.dataset.id;
    
      fetch("https://bharattoken.org/sliceLedger/admin/api/auth/deviceLogout", {
        "method": "POST",
        "headers": {
            "content-type": "application/json",
            "accept": "application/json",
            Authorization: accessToken
        },
         "body": JSON.stringify({
            access_id:access_id
          })
       })
      .then(response => response.json())
      .then(response => {
        const res  = decryptData(response)
        console.log("deviceLogout", res);
        })
       .catch(err => {
           console.log(err);
       });
    }
  
    return (
        <>
            <Header />
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>

                <div className="user_security_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                    <Container>
                        <Row className='justify-content-center'>
                            <Col lg={11}>
                                <div className='slice_security_div'>
                                    <div className='slice_security_head'>
                                        <h1>Login Activity</h1>
                                        <button onClick={handleAllDeviceShow}>SignOut from all Devices</button>
                                    </div>
                                    <div className='slice_security_body mt-3'>
                                        <Tabs defaultActiveKey="signIn" id="uncontrolled-tab-example" className="mb-3">
                                            <Tab eventKey="signIn" title="Sign In">
                                                <Container>
                                                    <Row>
                                                    {loginActivity.map((e)=>{
                                                       
                                                        return(
                                                          <Col lg={6}>
                                                            <div className='slice_signIn_details mb-3'>
                                                                {/* <FontAwesomeIcon className='signIn_computer_icon' icon={faComputer}/> */}
                                                                <MdOutlineComputer className='signIn_computer_icon'/>
                                                                <div className='slice_signIn_status'>
                                                                        Active
                                                                </div>
                                                                <b>{e.deviceName?e.deviceName:""}</b>
                                                                <p style={{wordBreak: "break-word"}}>Signed in {e.loginTime?e.loginTime:""} </p>
                                                                <p> {getLocation(e)}{ location?location:"India" } </p>
                                                                <p style={{wordBreak: "break-word"}}>IP address {e.IpAdderss?e.IpAdderss:""}</p>
                                                                <div className='signIn_actionBtns'>
                                                                    <button data-id={e.access_id} onClick={handleShow} >Sign Out</button>
                                                                </div>
                                                            </div>
                                                            <Modal show={show} onHide={handleClose}>
                                                                <Modal.Header closeButton>
                                                                    <Modal.Title className='w-100 text-center'>SignOut</Modal.Title>
                                                                        </Modal.Header>
                                                                            <Modal.Body className='w-100 text-center'>Are you sure you want to sign out !</Modal.Body>
                                                                            <Modal.Footer>
                                                                            <Button variant="secondary" onClick={handleClose}>
                                                                                No
                                                                            </Button>
                                                                            <Button type='button' data-id={e.access_id} variant="primary" onClick={signOut}>
                                                                            yes
                                                                            </Button>
                                                                </Modal.Footer>
                                                            </Modal>
                                                        </Col>
                                                        )
                                                    })}
                                                     
                                                    </Row>
                                                </Container>
                                            </Tab>
                                          
                                        </Tabs>
                                    </div>
                                </div>
                            </Col>
                        </Row>

                    </Container>
                </div>
            </div>
            <Modal show={showAllDevice} onHide={handleAllDeviceClose}>
            <Modal.Header closeButton>
                <Modal.Title className='w-100 text-center'>SignOut</Modal.Title>
                    </Modal.Header>
                        <Modal.Body className='w-100 text-center'>Are you sure you want to all device sign out !</Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleAllDeviceClose}>
                            No
                        </Button>
                        <Button type='button'  variant="primary" onClick={signoutAllDevice} >
                        yes
                        </Button>
            </Modal.Footer>
        </Modal> 
        </>
    )
}
