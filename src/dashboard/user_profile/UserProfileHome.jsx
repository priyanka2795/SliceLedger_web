import React, {useContext,useState, useEffect} from 'react'
import CurrencyFormat from 'react-currency-format';
import { Container, Row, Col, Image,Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate  } from 'react-router-dom'
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import myContext from '../../context/MyContext'
import {CurrencyConvert, decryptData } from '../../Helper'
import {BsCameraFill} from 'react-icons/bs'
import { toast } from 'react-toastify'
import axios from 'axios'
import $ from 'jquery'

export default function UserProfileHome() {
    const [isEdit, setIsEdit] = useState(false)
    let History = useNavigate();
    const showNav = useContext(myContext)
    const accessToken =  localStorage.getItem('accessToken')
    const auth =  JSON.parse(localStorage.getItem('auth'));
    const [user, setUser] = useState([]);

    const [first_name, setFirstName] = useState("")
    const [last_name, setLastName] = useState("")
    const [phone_number, setPhoneNumber] = useState("")
    const [profilepic, setProfilePic] = useState()
    const [previewPrfile, setPreProfilePic] = React.useState("")

    const [fistNameError, setFirstNameError] = useState(" ")
    const [lastNameError, setLastNameError] = useState(" ")
    const [phoneError, setPhoneError] = useState(" ")

   useEffect( () => {
       userDetail()
    }, [])

    $('.validate').focus(function(){
        setFirstNameError(" ")
        setLastNameError(" ")
        setPhoneError(" ")
    })

    const handleEdit = ()=>{
        setIsEdit(true)
        setFirstName(user.first_name)
        setLastName(user.last_name)
        setPhoneNumber(user.phoneNumber)
       
    }

   async  function UpdateProfile(){
        
          let firstNameValid = false;
          let lastNameValid = false;
          let phoneNumberValid = false;

        if(first_name.length === 0 || !/^[a-zA-Z].*[\s\.]*$/g.test(first_name)){
            setFirstNameError("First Name is required!");
        }else{
     
            firstNameValid = true
        } 

        if(last_name.length === 0 || !/^[a-zA-Z].*[\s\.]*$/g.test(last_name)){
            setLastNameError("Last Name is required!");
        } else{
          
            lastNameValid = true
        }

        if(phone_number.length === 0){
            setPhoneError("Phone Number is required!");
        }else if (!phone_number.match(/^[0-9]+$/)) {
            setPhoneError("Please Enter only Number!");
        }else if (phone_number.length < 8 || phone_number.length > 15) {
            setPhoneError("Please enter no more than 8 and less than 15 digits!");
        }else{
           
            phoneNumberValid = true
        }
        
         
        const formData = new FormData();
        formData.append("first_name",first_name);
        formData.append("last_name", last_name);
        formData.append("phoneNumber", phone_number);
        if (profilepic) {
        formData.append("profilePic", profilepic, profilepic.name); 
        }
        
        await  axios.post("https://bharattoken.org/sliceLedger/admin/api/auth/updateProfile",formData, {
            "method": "POST",
            "mode":'cors',
            "headers": {
                'Accept':'application/json',
                'Content-Type':'multipart/form-data',
                'Authorization':accessToken
            },
            
          })
           .then(response => {
             const res  = decryptData(response.data)
             localStorage.setItem('auth', JSON.stringify(res.result));
             localStorage.setItem('bankaccount', JSON.stringify(res.result.bankAcount));
             localStorage.setItem('kyc_detail', JSON.stringify(res.result.kyc));
            console.log(res)
            if (parseInt(res.status) === 200) {
              toast.success(res.message) 
              setFirstName("")
              setLastName("")
              setPhoneNumber("")
              setProfilePic("")
              setPreProfilePic("") 
              setIsEdit(false)
              window.location.reload();
              }else{
                toast.error(res.message)
            }
          if (parseInt(res.status) === 401) {
                History('/login');
             }
            })
          .catch(err => {
            const error  = decryptData(err.response.data)
            // if (parseInt(error.status) === 422) {
            //   toast.error(error.message)
            //  }
            console.log(error);
          });
       

         
    }

  

    function userDetail() {
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
           // console.log("userDetail===", res)
            if (parseInt(res.status) === 401) {
                History('/login');
            }
            setUser(res.result);
          })
          .catch(err => {
            console.log(err);
          });
    }

    return (
        <>
            <Header/>
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>
                <section className='slice_user_profileHome_section' style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                    <Container>

                       {isEdit ? 
                            <Row className='justify-content-center' id='updateDiv' >
                            <Col lg={8}>
                                <div className="user_profileHome_container">
                                    <div className="user_profile_details">
                                        <Row>
                                            <Col lg={12}>
                                                <div className="my_profile_title">
                                                    <h5>Edit Profile</h5>
                                                </div>
                                            </Col>
                                            <Col lg={4} className="mt-3">
                                            <div className="edit_profile_img">
                                            {previewPrfile ? 
                                            <Image  src={previewPrfile} fluid /> : <Image  src={user.profilePic} fluid  /> 
                                            }
                                           <div class="wrapper">
                                               <div class="file-upload">
                                                   <input type="file" name='profilePic'  onChange={(e) => {
                                                    setProfilePic(e.target.files[0]);
                                                    setPreProfilePic(URL.createObjectURL(e.target.files[0]))
                                                    }} />
                                                   <BsCameraFill />
                                                   
                                               </div>
                                              </div>
                                            </div>
                                            </Col>
                                            
                                            <Col lg={8} className="mt-3">
                                           
                                                <div className="personal_section">
                                                    <div className="person_info_title">
                                                        <h6>Personal Information</h6>
                                                        <button className='btn btn-primary update_btn' id='updateButton' onClick={UpdateProfile}>Update</button>
                                                    </div>
                                       
                                                    <div className="person_details">
                                                    
                                                        <Row>
    
                                                            <Form.Group as={Row} className="mb-3"   >
                                                                <Form.Label column sm="4">
                                                                    First Name
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control type="text"  name='first_name' onChange={(e) => setFirstName(e.target.value)}   value={ first_name} className="validate" />
                                                                   
                                                                    {fistNameError.length > 0 &&
                                                                         <p className='errormsg' id='firstNameError'>{fistNameError}</p>
                                                                      }
                                                                </Col>
                                                                
                                                            </Form.Group>
                                                           
                                                            <Form.Group as={Row} className="mb-3" >
                                                                <Form.Label column sm="4">
                                                                    Last Name
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control type="text"  name='last_name' onChange={(e) => setLastName(e.target.value)} value={ last_name }  className="validate" />
                                                                    {lastNameError.length > 0 &&
                                                                         <p className='errormsg' id='firstNameError'>{lastNameError}</p>
                                                                      }
                                                                </Col>
                                                            </Form.Group>
                                                            
                                                            <Form.Group as={Row} className="mb-3" >
                                                                <Form.Label column sm="4">
                                                                    Email Id
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control type="text"  name='email' value={(user.email)?user.email:""} readOnly/>
                                                                </Col>
                                                            </Form.Group>
    
    
                                                            <Form.Group as={Row} className="mb-3" >
                                                                <Form.Label column sm="4">
                                                                    Mobile No
                                                                </Form.Label>
                                                                <Col sm="8">
                                                                    <Form.Control type="text"  name='phoneNumber' id='phoneNumber' onChange={(e) => setPhoneNumber(e.target.value)} value={ phone_number} className="validate"/>
                                                                    {phoneError.length > 0 &&
                                                                        <p className='errormsg' id='firstNameError'>{phoneError}</p>
                                                                      }
                                                                </Col>
                                                            </Form.Group>
                                                            
    
    
    
                                                        </Row>
                                                       
                                                    </div>
                                                    
                                                </div>
    
                                               
    
                                                <div className="account_section">
                                                    <div className="account_info_title">
                                                        <h6>Account Information</h6>
                                                    </div>
    
                                                    <div className="account_details">
                                                        <Row>
    
                                                            <Col lg={6} md={6}>
                                                                <p className='title color'>Current Balance</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                            <CurrencyFormat value={auth.wallet.fait_wallet_amount} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} />
                                                            </Col>
    
                                                             <Col lg={6} md={6}>
                                                                <p className='title'>Account No</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                                 <p className='text'>
                                                                 {(auth.bankAcount.acountNumber)?auth.bankAcount.acountNumber:"NA" }
                                                                 </p>
                                                             </Col>
    
                                                            <Col lg={6} md={6}>
                                                                <p className='title'>IFSC Code</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                            <p className='text'>
                                                            {(auth.bankAcount.ifsc)?auth.bankAcount.ifsc:"NA" }
                                                            </p>
                                                        </Col>
    
                                                            <Col lg={6} md={6}>
                                                                <p className='title'>Account Type</p>
                                                            </Col>
                                                            <Col lg={6} md={6}>
                                                                 <p className='text'>
                                                                 {(auth.bankAcount.acountType)?auth.bankAcount.acountType:"NA" }
                                                                 </p>
                                                             </Col>
                                                        </Row>
                                                    </div>
    
                                                </div>
                                               
                                            </Col>
                                           
                                        </Row>
                                    </div>
                                </div>
    
                            </Col>
                        </Row>
                             : 
                             <Row className='justify-content-center' id='editDiv'>
                             <Col lg={8}>
                                 <div className="user_profileHome_container">
                                     <div className="user_profile_details">
                                         <Row>
                                             <Col lg={12}>
                                                 <div className="my_profile_title">
                                                     <h5>My Profile</h5>
                                                 </div>
                                             </Col>
                                             <Col lg={4} className="mt-3">
                                                 <div className="userProfile_img">
                                                     <Image src={user.profilePic} fluid />
                                                 </div>
                                             </Col>
 
                                             <Col lg={8} className="mt-3">
                                                 <div className="personal_section">
                                                     <div className="person_info_title">
                                                         <h6>Personal Information</h6>
                                                         <button className='btn btn-primary update_btn' id='EditButton' onClick={handleEdit}>Edit</button>
                                                     </div>
 
                                                     <div className="person_details">
                                                     
                                                         <Row>
 
                                                             <Col lg={4} md={4}>
                                                                 <p className='title'>First Name</p>
                                                             </Col>
                                                             <Col lg={8} md={8}>
                                                                 <p className='text'> {user.first_name} </p>
                                                             </Col>
 
 
                                                             <Col lg={4} md={4}>
                                                                 <p className='title'>Last Name</p>
                                                             </Col>
                                                             <Col lg={8} md={8}>
                                                                 <p className='text'>{user.last_name}</p>
                                                             </Col>
 
                                                             <Col lg={4} md={4}>
                                                                 <p className='title'>Email Id</p>
                                                             </Col>
                                                             <Col lg={8} md={8}>
                                                                 <p className='text user_email'>{user.email}</p>
                                                             </Col>
 
                                                             <Col lg={4} md={4}>
                                                                 <p className='title'>Mobile No</p>
                                                             </Col>
                                                             <Col lg={8} md={8}>
                                                                 <p className='text'>{user.phoneNumber}</p>
                                                             </Col>
 
 
                                                         </Row>
                                                     </div>
                                                 </div>
 
                                                 <div className="account_section">
                                                     <div className="account_info_title">
                                                         <h6>Account Information</h6>
                                                     </div>
 
                                                     <div className="account_details">
                                                         <Row>
 
                                                             <Col lg={6} md={6}>
                                                                 <p className='title color'>Current Balance</p>
                                                             </Col>
                                                             <Col lg={6} md={6}>
                                                                 <p className='text color'><CurrencyFormat value={auth.wallet.fait_wallet_amount} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} />
                                                                 </p>
                                                             </Col>
 
                                                            <Col lg={6} md={6}>
                                                                 <p className='title'>Account No</p>
                                                             </Col>
                                                             <Col lg={6} md={6}>
                                                                 <p className='text'>
                                                                 {(auth.bankAcount.acountNumber)?auth.bankAcount.acountNumber:"NA" }
                                                                 </p>
                                                             </Col>
 
                                                             <Col lg={6} md={6}>
                                                                 <p className='title'>IFSC Code</p>
                                                             </Col>
                                                             <Col lg={6} md={6}>
                                                                 <p className='text'>
                                                                 {(auth.bankAcount.ifsc)?auth.bankAcount.ifsc:"NA" }
                                                                 </p>
                                                             </Col>
 
                                                             <Col lg={6} md={6}>
                                                                 <p className='title'>Account Type</p>
                                                             </Col>
                                                             <Col lg={6} md={6}>
                                                                 <p className='text'>
                                                                 {(auth.bankAcount.acountType)?auth.bankAcount.acountType:"NA" }
                                                                 </p>
                                                             </Col>
                                                         </Row>
                                                     </div>
                                                 </div>
                                             </Col>
                                         </Row>
                                     </div>
                                 </div>
 
                             </Col>
                         </Row>
                             }

                       

                    </Container>
                </section>
            </div>

        </>
    )
}

