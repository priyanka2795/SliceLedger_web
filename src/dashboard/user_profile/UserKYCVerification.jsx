import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import myContext from '../../context/MyContext'
import { decryptData } from '../../Helper'
import { toast } from 'react-toastify'
import axios from 'axios'
import $ from 'jquery'


export default function UserKYCVerification() {
    const showNav = useContext(myContext)

    const accessToken = localStorage.getItem('accessToken')
    const [backImageFile, setBackImageFile] = useState(true)
    const [isChecked, setIsChecked] = useState(true);
  
    const [docType, setSelectDocs] = useState("adhar")
    const [frontFile, setFrontFile] = useState();
    const [backFile, setBackFile] = useState();
    const [selfieFile, setSelfieFile] = useState();
    const [kycStatus, setKYCStatus] = useState();
  
    const [frontPrevFile, setFrontPrevFile] = React.useState();
    const [backPrevFile, setBackPrevFile] = React.useState();
    const [selfiePrevFile, setSelfiePrevFile] = React.useState();
    const [kyc_id, setKycId] = useState("");
    const [documents, setDocuments] = useState({});
  
    const kyc_detail = JSON.parse(localStorage.getItem('kyc_detail'));
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



  
    function selectDocFile(e) {
      setIsChecked(!isChecked);
      if (e.target.value == "pan") {
        setBackImageFile(false)
      } else {
        setBackImageFile(true)
      }
      setSelectDocs(e.target.value);
      hideValidation()
    }

    useEffect( () => {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/getKYCDetail", {
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
            if (parseInt(res.status) === 401) {
            History('/login');
            }
            if (res.result) {
              setKycId(res.result.id)
              setSelectDocs(res.result.doc_type)
              setKYCStatus(res.result.status)
              setDocuments(res.result.document)

              if (res.result.doc_type == "pan") {
                setBackImageFile(false);
              }
            }
            
        })
        .catch(err => {
            console.log(err);
        });
        hideValidation()
    }, [])

    function hideValidation() {
        $("#frontImgError").hide()
        $("#backImgError").hide()
        $("#selfieImgError").hide()

        setFrontFile('')
        setFrontPrevFile('')
        setBackFile('')
        setBackPrevFile('')
    }
  
    async function KycApprove() {
    
        if (!selfieFile || selfieFile.length === 0) {
            $("#selfieImgError").show()
        }else{
          $("#selfieImgError").hide()
        }
        if (!frontFile || frontFile.length === 0) {
          $("#frontImgError").show()
        }else{
          $("#frontImgError").hide()
        }
        if (docType === "adhar") {
            if (!backFile || backFile.length === 0) {
                $("#backImgError").show()
                return
            }else{
              $("#backImgError").hide()
            }
        }
        if (!frontFile || frontFile.length === 0 || !selfieFile || selfieFile.length === 0) {
            return
        }
  
      const formData = new FormData();
      formData.append("front_doc", frontFile, frontFile.name);
      formData.append("selfie", selfieFile, selfieFile.name);
      formData.append("doc_type", docType);
      if (docType === "adhar") {
        formData.append("back_doc", backFile, backFile.name);
      }
      if (kyc_id) { formData.append("kyc_id", kyc_id); } else { formData.append("kyc_id", ''); }
  
      await axios.post("https://bharattoken.org/sliceLedger/admin/api/auth/kyc", formData, {
        "method": "POST",
        "mode": 'cors',
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': accessToken
        },
  
      })
      .then(response => {
        const res = decryptData(response.data)
        if (parseInt(res.status) === 200) {
          toast.success(res.message)
          setSelectDocs("")
          setFrontFile(null)
          setBackFile(null)
          setSelfieFile(null)
          window.location.reload();
        } else {
          toast.error(res.message)
        }
        if (parseInt(res.status) === 401) {
          History('/login');
        }
      })
      .catch(err => {
        const error = decryptData(err.response.data)
        if (parseInt(error.status) === 422) {
          toast.error(error.message, { autoClose: 5000 })
          window.location.reload();
        }
        console.log(error);
      });
    };
  
  
      var selfieurl 
      var frontdocurl
      var backdocurl
      if(documents)
      {
        for (let x in documents) {
          if(documents[x].doc_type === "selfie"){
            selfieurl = documents[x];
          }
          if(documents[x].doc_type === "front_doc"){
            frontdocurl = documents[x]
          }
          if(documents[x].doc_type === "back_doc"){
            backdocurl = documents[x]
          }
      
        }  
      }



  async function reSubmitKyc(){

    const formData = new FormData();
    for (let x in documents) {
      if(documents[x].doc_type === "selfie" && documents[x].status == "rejected"){
        if (!selfieFile || selfieFile.length === 0) {
          $("#selfieImgError").show()
          return
        }
        formData.append("selfie", selfieFile, selfieFile.name);
     
      }else{
        $("#selfieImgError").hide()
      }
      if(documents[x].doc_type === "front_doc" && documents[x].status == "rejected"){
        if (!frontFile || frontFile.length === 0) {
          $("#frontImgError").show()
          return
        }
        formData.append("front_doc", frontFile, frontFile.name);
      }else{
        $("#frontImgError").hide()
      }
      if(documents[x].doc_type === "back_doc" && documents[x].status == "rejected"){
        if (docType === "adhar") {
            if (!backFile || backFile.length === 0) {
                $("#backImgError").show()
                return
            }
        }
        formData.append("back_doc", backFile, backFile.name);
      }else{
        $("#backImgError").hide()
      }
    }  
      
      
      formData.append("kyc_id", kyc_id)
      formData.append("doc_type", docType);

      await axios.post("https://bharattoken.org/sliceLedger/admin/api/auth/kyc", formData, {
        "method": "POST",
        "mode": 'cors',
        "headers": {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': accessToken
        },
  
      })
      .then(response => {
        const res = decryptData(response.data)
        if (parseInt(res.status) === 200) {
          toast.success(res.message, { autoClose: 5000 })
          setSelectDocs("")
          setFrontFile(null)
          setBackFile(null)
          setSelfieFile(null)
          window.location.reload();
        } else {
          toast.error(res.message)
        }
        if (parseInt(res.status) === 401) {
          History('/login');
        }
      })
      .catch(err => {
        const error = decryptData(err.response.data)
        if (parseInt(error.status) === 422) {
          toast.error(error.message)
          window.location.reload();
        }
        console.log(error);
      });
  }


    return (
        <>
          <Header />
            <div className="main-section d-flex">
              <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                <SideNavbar />
              </div>
              <section className='slice_user_kyc_verification' style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }} >
                <Container>
                  <Row className='justify-content-center'>
                    <Col lg={8} md={12}>
                      <div className="kyc_verification_div">
                        
                        <div className="head">
                          <div>Upload Your ID</div>
                        </div>
    
                        <div className="kyc_verification_fields">
    
                          { !kyc_id   ? 
                            <div className="select_document_div row">
                              <div className='col-md-6'>
                                <input type="radio" name="doc_type" id='adhar' value="adhar" checked={isChecked} onClick={selectDocFile}/>
                                <label htmlFor="adhar">&nbsp; Aadhaar Card</label>
                              </div>
                              <div className='col-md-6'>
                                <input type="radio" name="doc_type" id='pan' value="pan" onClick={selectDocFile} />
                                <label htmlFor="pan">&nbsp; Pan Card</label>
                              </div>
                            </div>
                          :
                            <div className="select_document_div row">
                              <div className='col-md-6'>
                                <input type="radio" name="doc_type" id='adhar' value={docType} checked={isChecked}/>
                                <label htmlFor="adhar">&nbsp; { (docType == "pan") ? "Pan Card" : "Aadhaar Card" }</label>
                              </div> 
                            </div> 
                        }
                                
                          <div className="upload_document_div">
                            <div className="head">
                              <div>Upload Your ID</div>
                            </div>
                            <div className="upload_file mt-2">
    
                              <div className="front_image mb-3">
                                <p> Front</p>
                                <div className="front" style={{ position: "relative" }}>
                                  <div className="document_response">
                                    <div className='document_image'>
                                      {frontPrevFile ?
                                        <div>
                                          <img className="aadhar_preview" id="frontImg" src={frontPrevFile} alt="front"></img>
                                        </div>
                                        :
                                        <div>
                                          {!frontdocurl ?
                                            <div htmlFor="file-upload" className={docType === "pan" ? "custom-file-upload_pan" : "custom-file-upload_front"}></div>
                                            :
                                            <div>
                                              <img className="aadhar_preview" id="frontImg" src={frontdocurl.document} alt="front" width="240" height="150"></img>
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                    {!kyc_id ? "" :
                                    <div className="document_status">
                                      <div className="message_warning">
                                      <div className="message_title_warning">{frontdocurl? frontdocurl.status:'Pending'}</div>
                                      <div className="message_text_warning">{frontdocurl? frontdocurl.comment:'Your Document Status is Pending'}</div>
                                      </div>
                                    </div>
                                    }
                                  </div>
                                  {frontdocurl && (frontdocurl.status != "rejected")?
                                  " "
                                    :
                                    <div className='mt-2 '>
                                      <input type="file" name='front_doc' onChange={(e) => {
                                        setFrontFile(e.target.files[0]);
                                        setFrontPrevFile(URL.createObjectURL(e.target.files[0]))
                                      }} style={{ marginLeft: "60px" }} className="validate" id='front_doc'  />
                                      <label htmlFor="front_doc" className="btn-2">upload file</label>
                                    </div>
                                  }
                                    
                                  
                                </div>
                              </div>
                              <p className='docs_image' id='frontImgError'>Please upload Front image</p>
    
                              {(backImageFile == true) ? 
                                <div className="back_image" id="back_images">
                                    <p>Back</p>
                                    <div className="back" style={{ position: "relative" }}>
                                    <div className="document_response">
                                        <div className="document_image">
                                        {backPrevFile ?
                                            <div>
                                            <img className="aadhar_preview" src={backPrevFile} alt="back"></img>
                                            </div>
                                            :
                                            <div>
                                            {!backdocurl ?
                                                <div htmlFor="file-upload" className="custom-file-upload_back"> </div>
                                                :
                                                <div>
                                                <img className="aadhar_preview" id="frontImg" src={backdocurl.document} alt="front" width="240" height="150"></img>
                                                </div>
                                            }
                                            </div>

                                        }</div>
                                        {!kyc_id ? "" :
                                        <div className="document_status">
                                        <div className="message_warning">
                                        <div className="message_title_warning">{backdocurl? backdocurl.status:'Pending'}</div>
                                        <div className="message_text_warning">{backdocurl? backdocurl.comment:'Your Document Status is Pending'}</div>
                                        </div>
                                        </div>
                                      }
                                    </div>
                                    {
                                        backdocurl && (backdocurl.status != "rejected")?
                                        " "
                                        :
                                        <div className='mt-2'>
                                            <input type="file" name='back_doc' onChange={(e) => {
                                            setBackFile(e.target.files[0]);
                                            setBackPrevFile(URL.createObjectURL(e.target.files[0]))
                                            }} style={{ marginLeft: "60px" }} className="validate" id='back_doc' />
                                            <label htmlFor="back_doc" className="btn-2">upload file</label>
                                        </div>
                                    }
                                    
                                    </div>
                                </div>
                                : " "}
                              <p className='docs_image' id='backImgError'>Please upload Back image</p>
    
                              <div className="selfie_image mt-3">
                                <p>Selfie</p>
                                <div className="selfie" style={{ position: "relative" }}>
                                  <div className="document_response">
                                    <div className="document_image">
                                      {selfiePrevFile ?
                                        <div>
                                          <img className="selfie_preview" src={selfiePrevFile} alt="selfie"></img>
                                        </div>
                                        :
                                        <div>
                                          {!selfieurl ?
                                            <div htmlFor="file-upload" className="custom-file-upload_selfie"> </div>
                                            :
                                            <div>
                                              <img className="aadhar_preview" id="frontImg" src={selfieurl.document} alt="front" width="180" height="150"></img>
                                            </div>
                                          }
                                        </div>
    
                                      }</div>
                                      {!kyc_id ? "" :
                                    <div className="document_status">
                                      <div className="message_warning">
                                      <div className="message_title_warning">{selfieurl? selfieurl.status:'Pending'}</div>
                                      <div className="message_text_warning">{selfieurl? selfieurl.comment:'Your Document Status is Pending'}</div>
                                      </div>
                                    </div>
                                      }
                                  </div>
                                  {selfieurl && (selfieurl.status != "rejected")?
                                    " "
                                    :
                                    <div className='mt-2'>
                                      <input type="file" name='selfie' id='selfie' onChange={(e) => {
                                        setSelfieFile(e.target.files[0]);
                                        setSelfiePrevFile(URL.createObjectURL(e.target.files[0]))
      
                                      }} style={{ marginLeft: "20px" }} className="validate selfie"  />
                                      <label htmlFor="selfie" className="btn-2">upload file</label>
                                    </div>
                                 
                                  }
                            </div>
                              </div>
                              <p className='docs_image' id='selfieImgError'>Please upload selfie image</p>
                            </div>
                          </div>
    
                        
                          {kyc_id ? " " :
                            <div className="warning_msg">
                              <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} /></div>
                              <p>Upload your selfie with current date and signature on blank page</p>
                            </div>}
                          
                          <div className="kyc_verification_btn">
                            {kyc_id ?
                              kycStatus != "rejected" ? "" :
                              <button className='done_btn' onClick={reSubmitKyc}>Done</button>
                            :
                              <button className='done_btn' onClick={KycApprove}>Done</button>
                            }
                           
                          </div>
    
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>
    
                {/* ===============successful modal start================== */}
                <Modal show={show} onHide={handleClose}>
    
                  <Modal.Body>
                    <Container fluid>
                      <Row>
                        <Col lg={12}>
                          <div className="success_msg_div">
                            <div className="icon">
                              <FontAwesomeIcon icon={faCircleCheck} />
                            </div>
                            <h5>Congratulations Your KYC Approved</h5>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </Modal.Body>
    
                </Modal>
                {/* ===============successful modal end================== */}
              </section>
            </div>
        </>
      )
}