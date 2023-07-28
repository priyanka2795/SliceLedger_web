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
  console.log(accessToken);
  const [document, setDocument] = useState("")
  const [selectedDoc, setSelectedDoc] = useState(false)
  const [backImageFile, setBackImageFile] = useState(true)

  const [docType, setSelectDocs] = useState("")
  const [frontFile, setFrontFile] = useState();
  const [backFile, setBackFile] = useState();
  const [selfieFile, setSelfieFile] = useState();

  const [frontPrevFile, setFrontPrevFile] = React.useState();
  const [backPrevFile, setBackPrevFile] = React.useState();
  const [selfiePrevFile, setSelfiePrevFile] = React.useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [doctype, setDocType] = useState("");
  const [kyc_id, setKycId] = useState("");
  const [documents, setDocuments] = useState({});

  const kyc_detail = JSON.parse(localStorage.getItem('kyc_detail'));

  console.log("doctype1111", doctype);
  console.log("docType2222", docType);

  console.log("docType",doctype);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const selectDocFile = (e) => {

    setDocument(e.target.value)
    setSelectedDoc(true)
    if (document === "pan") {
      setBackImageFile(false)
    } else {
      setBackImageFile(true)
    }
    $("#documentError").hide()
    setIsDisabled(false)
  }
console.log("document", document,backImageFile)
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
            console.log("kycDetail",res.result);
            setDocType(res.result.doc_type)
            setKycId(res.result.id)
            setSelectDocs(res.result.doc_type)
            setDocuments(res.result.document)
  
            
          })
          .catch(err => {
            console.log(err);
          });
    
    }, [])

  useEffect(() => {

    $("#documentError").hide()
    $("#frontImgError").hide()
    $("#backImgError").hide()
    $("#selfieImgError").hide()
    
    $("#frontImgError1").hide()
    $("#backImgError1").hide()
    $("#selfieImgError1").hide()
  }, [])



  $(".validate").focus(function () {
    $("#documentError").hide()
    $("#frontImgError").hide()
    $("#backImgError").hide()
    $("#selfieImgError").hide()
   
    $("#frontImgError1").hide()
    $("#backImgError1").hide()
    $("#selfieImgError1").hide()
  })


  async function KycApprove() {
    if (docType === "") {
      $("#documentError").show()
      return
    }
    if (docType === "adhar") {
      if (!selfieFile || selfieFile.length === 0) {
        $("#selfieImgError").show()
        return
      }
      if (!frontFile || frontFile.length === 0) {
        $("#frontImgError").show()
        return

      }
      if (!backFile || backFile.length === 0) {
        $("#backImgError").show()
        return
      }
    } else {
      if (!frontFile || frontFile.length === 0) {
        $("#frontImgError").show()
        return

      }
      if (!selfieFile || selfieFile.length === 0) {
        $("#selfieImgError").show()
        return
      }
    }



    const formData = new FormData();
    if (kyc_id) {
      if (docType === "adhar") {
        formData.append("front_doc", frontFile, frontFile.name);
        formData.append("back_doc", backFile, backFile.name);
        formData.append("selfie", selfieFile, selfieFile.name);
        formData.append("doc_type", docType);
        formData.append("kyc_id", kyc_id);
      } else {
        formData.append("front_doc", frontFile, frontFile.name);
        formData.append("selfie", selfieFile, selfieFile.name);
        formData.append("doc_type", docType);
        formData.append("kyc_id", kyc_id);
      }
    }else{
      if (docType === "adhar") {
        formData.append("front_doc", frontFile, frontFile.name);
        formData.append("back_doc", backFile, backFile.name);
        formData.append("selfie", selfieFile, selfieFile.name);
        formData.append("doc_type", docType);
      } else {
        formData.append("front_doc", frontFile, frontFile.name);
        formData.append("selfie", selfieFile, selfieFile.name);
        formData.append("doc_type", docType);
      }
    }
    
    console.log("form data", formData)

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
        console.log(res)
        if (parseInt(res.status) === 200) {
          toast.success(res.message, { autoClose: 5000 })
          setSelectDocs("")
          setFrontFile(null)
          setBackFile(null)
          setSelfieFile(null)
          window.location.reload();
        } else {
          toast.error(res.message, { autoClose: 5000 })
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
          //  setUpdateSelfie(documents[x].document)
          selfieurl = documents[x];
            console.log("selfie",selfieurl)
         }
         if(documents[x].doc_type === "front_doc"){
          //  setUpdateFront(documents[x].document)
          frontdocurl = documents[x]
           console.log("frontdocurl",frontdocurl)
      }
      if(documents[x].doc_type === "back_doc"){
        //  setUpdateBack(documents[x].document)
        backdocurl = documents[x]
         console.log("backdocurl",backdocurl)
      }
    
      }  
    }


  

  
  return (
    <>
      <Header />
    {!doctype ?
        <div className="main-section d-flex">
          <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
            <SideNavbar />
          </div>
          <section className='slice_user_kyc_verification' style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }} >
            <Container>
              <Row className='justify-content-center'>
                <Col lg={8} md={12}>
                  <div className="kyc_verification_div">
                    <div className="status_message_warning d-none">
                      <div className="message_title_warning">Pending</div>
                      <div className="message_text_warning">Your Document Status is Pending</div>
                    </div>
                    <div className="head">
                      <div>Scan Your ID/Password Number</div>
                    </div>

                    <div className="kyc_verification_fields">

                      <div className="select_document_div">
                        <select id="select" onClick={selectDocFile} name="doc_type" onChange={(e) => setSelectDocs(e.target.value)} >
                          <option value=" ">Select Your Document </option>
                          <option  value='adhar' >Aadhar Card</option>
                          <option  value='pan' >Pan Card</option>
                        </select> 
                        
                      </div>
                      <p className='docs_image' id='documentError'>Please select document type</p>

                      <div className="upload_document_div">
                        <div className="head">
                          <div>Upload Your ID/Password</div>
                        </div>
                        <div className="upload_file mt-2">

                          <div className="front_image mb-3">
                            <p>{document} Front</p>
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
                                        <div for="file-upload" className={document === "pan" ? "custom-file-upload_pan" : "custom-file-upload_front"}></div>
                                        :
                                        <div>
                                          <img className="aadhar_preview" id="frontImg" src={frontdocurl.document} alt="front" width="240" height="150"></img>
                                        </div>
                                      }
                                    </div>
                                  }</div>
                                <div className="document_status">
                                  <div className="message_warning">
                                  <div className="message_title_warning">{frontdocurl? frontdocurl.status:'Pending'}</div>
                                  <div className="message_text_warning">{frontdocurl? frontdocurl.comment:'Your Document Status is Pending'}</div>
                                  </div>
                                </div>
                              </div>
                              {frontdocurl?
                                (frontdocurl.status === "approved")?
                              " "
                                :
                                <div className='mt-2 '>
                              <input type="file" name='front_doc' onChange={(e) => {
                                setFrontFile(e.target.files[0]);
                                setFrontPrevFile(URL.createObjectURL(e.target.files[0]))
                              }} style={{ marginLeft: "60px" }} className="validate"  />
                            </div>
                              :
                              <div className='mt-2 '>
                              <input type="file" name='front_doc' onChange={(e) => {
                                setFrontFile(e.target.files[0]);
                                setFrontPrevFile(URL.createObjectURL(e.target.files[0]))
                              }} style={{ marginLeft: "60px" }} className="validate"  />
                            </div>
                              }
                                

                            </div>

                          </div>
                          <p className='docs_image' id='frontImgError'>Please select Front image</p>


                          {!backImageFile ? <div className="back_image" id="back_images">
                            <p>{` ${document} Back`}</p>
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
                                        <div for="file-upload" className="custom-file-upload_back"> </div>
                                        :
                                        <div>
                                          <img className="aadhar_preview" id="frontImg" src={backdocurl.document} alt="front" width="240" height="150"></img>
                                        </div>
                                      }
                                    </div>

                                  }</div>
                                <div className="document_status">
                                  <div className="message_warning">
                                  <div className="message_title_warning">{backdocurl? backdocurl.status:'Pending'}</div>
                                  <div className="message_text_warning">{backdocurl? backdocurl.comment:'Your Document Status is Pending'}</div>
                                  </div>
                                </div>
                              </div>
                              {backdocurl?
                                (backdocurl.status === "approved")?
                              " "
                                :
                                <div className='mt-2'>
                                <input type="file" name='back_doc' onChange={(e) => {
                                  setBackFile(e.target.files[0]);
                                  setBackPrevFile(URL.createObjectURL(e.target.files[0]))
                                }} style={{ marginLeft: "60px" }} className="validate"  />
                              </div>
                              :
                              <div className='mt-2'>
                                <input type="file" name='back_doc' onChange={(e) => {
                                  setBackFile(e.target.files[0]);
                                  setBackPrevFile(URL.createObjectURL(e.target.files[0]))
                                }} style={{ marginLeft: "60px" }} className="validate"  />
                              </div>
                              }
                            

                            </div>

                          </div> : " "}

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
                                        <div for="file-upload" className="custom-file-upload_selfie"> </div>
                                        :
                                        <div>
                                          <img className="aadhar_preview" id="frontImg" src={selfieurl.document} alt="front" width="240" height="150"></img>
                                        </div>
                                      }
                                    </div>

                                  }</div>
                                <div className="document_status">
                                  <div className="message_warning">
                                  <div className="message_title_warning">{selfieurl? selfieurl.status:'Pending'}</div>
                                  <div className="message_text_warning">{selfieurl? selfieurl.comment:'Your Document Status is Pending'}</div>
                                  </div>
                                </div>
                              </div>
                              {selfieurl?
                                (selfieurl.status === "approved")?
                              " "
                                :
                                <div className='mt-2'>
                                <input type="file" name='selfie' onChange={(e) => {
                                  setSelfieFile(e.target.files[0]);
                                  setSelfiePrevFile(URL.createObjectURL(e.target.files[0]))

                                }} style={{ marginLeft: "20px" }} className="validate"  />
                              </div>
                              :
                              <div className='mt-2'>
                              <input type="file" name='selfie' onChange={(e) => {
                                setSelfieFile(e.target.files[0]);
                                setSelfiePrevFile(URL.createObjectURL(e.target.files[0]))

                              }} style={{ marginLeft: "20px" }} className="validate" />
                            </div>
                              }
                        </div>
                      </div>
                          <p className='docs_image' id='selfieImgError'>Please select selfie image</p>
                        </div>
                      </div>

                      <div className="warning_msg">
                        <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} /></div>
                        <p>Upload your selfie with current date and signature on blank page</p>
                      </div>
                      <div className="kyc_verification_btn">
                        <button className='done_btn' onClick={KycApprove}>Done</button>
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
      :
      <div className="main-section d-flex">
        <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
          <SideNavbar />
        </div>
        <section className='slice_user_kyc_verification' style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }} >
          <Container>
            <Row className='justify-content-center'>
              <Col lg={8} md={12}>
                <div className="kyc_verification_div">
                  <div className="status_message_warning d-none">
                    <div className="message_title_warning">Pending</div>
                    <div className="message_text_warning">Your Document Status is Pending</div>
                  </div>
                  <div className="head">
                    <div>Scan Your ID/Password Number</div>
                  </div>

                  <div className="kyc_verification_fields">

                    <div className="select_document_div">
                      <select id="select" name="doc_type" >
                        <option  value={doctype} selected > {(doctype=="pan") ? "Pan Card" : "Aadhar Card"}</option>
                      </select>
                    </div>

                    <div className="upload_document_div">
                      <div className="head">
                        <div>Upload Your ID/Password</div>
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
                                      <div for="file-upload" className={document === "pan" ? "custom-file-upload_pan" : "custom-file-upload_front"}></div>
                                      :
                                      <div>
                                        <img className="aadhar_preview" id="frontImg" src={frontdocurl.document} alt="front" width="240" height="150"></img>
                                      </div>
                                    }
                                  </div>
                                }</div>
                              <div className="document_status">
                                <div className="message_warning">
                                <div className="message_title_warning">{frontdocurl? frontdocurl.status:'Pending'}</div>
                                <div className="message_text_warning">{frontdocurl? frontdocurl.comment:'Your Document Status is Pending'}</div>
                                </div>
                              </div>
                            </div>
                            {frontdocurl?
                              (frontdocurl.status === "approved")?
                            " "
                              :
                              <div className='mt-2 '>
                            <input type="file" name='front_doc' onChange={(e) => {
                              setFrontFile(e.target.files[0]);
                              setFrontPrevFile(URL.createObjectURL(e.target.files[0]))
                            }} style={{ marginLeft: "60px" }} className="validate"  />
                          </div>
                            :
                            <div className='mt-2 '>
                            <input type="file" name='front_doc' onChange={(e) => {
                              setFrontFile(e.target.files[0]);
                              setFrontPrevFile(URL.createObjectURL(e.target.files[0]))
                            }} style={{ marginLeft: "60px" }} className="validate"  />
                          </div>
                            }
                              

                          </div>

                        </div>
                        <p className='docs_image' id='frontImgError1'>Please select Front image</p>

                   {backImageFile ? <div className="back_image" id="back_images">
                          <p> Back</p>
                          <p>{` ${document} Back`}</p>

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
                                      <div for="file-upload" className="custom-file-upload_back"> </div>
                                      :
                                      <div>
                                        <img className="aadhar_preview" id="frontImg" src={backdocurl.document} alt="front" width="240" height="150"></img>
                                      </div>
                                    }
                                  </div>

                                }</div>
                              <div className="document_status">
                                <div className="message_warning">
                                <div className="message_title_warning">{backdocurl? backdocurl.status:'Pending'}</div>
                                <div className="message_text_warning">{backdocurl? backdocurl.comment:'Your Document Status is Pending'}</div>
                                </div>
                              </div>
                            </div>
                            {backdocurl?
                              (backdocurl.status === "approved")?
                            " "
                              :
                              <div className='mt-2'>
                              <input type="file" name='back_doc' onChange={(e) => {
                                setBackFile(e.target.files[0]);
                                setBackPrevFile(URL.createObjectURL(e.target.files[0]))
                              }} style={{ marginLeft: "60px" }} className="validate"  />
                            </div>
                            :
                            <div className='mt-2'>
                              <input type="file" name='back_doc' onChange={(e) => {
                                setBackFile(e.target.files[0]);
                                setBackPrevFile(URL.createObjectURL(e.target.files[0]))
                              }} style={{ marginLeft: "60px" }} className="validate"  />
                            </div>
                            }
                        
                          </div>
                            <p className='docs_image' id='backImgError1'>Please select Back image</p>
                          </div> : " "
                        }

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
                                      <div for="file-upload" className="custom-file-upload_selfie"> </div>
                                      :
                                      <div>
                                        <img className="aadhar_preview" id="frontImg" src={selfieurl.document} alt="front" width="240" height="150"></img>
                                      </div>
                                    }
                                  </div>

                                }</div>
                              <div className="document_status">
                                <div className="message_warning">
                                <div className="message_title_warning">{selfieurl? selfieurl.status:'Pending'}</div>
                                <div className="message_text_warning">{selfieurl? selfieurl.comment:'Your Document Status is Pending'}</div>
                                </div>
                              </div>
                            </div>
                            {selfieurl?
                              (selfieurl.status === "approved")?
                            " "
                              :
                              <div className='mt-2'>
                              <input type="file" name='selfie' onChange={(e) => {
                                setSelfieFile(e.target.files[0]);
                                setSelfiePrevFile(URL.createObjectURL(e.target.files[0]))

                              }} style={{ marginLeft: "20px" }} className="validate"  />
                            </div>
                            :
                            <div className='mt-2'>
                            <input type="file" name='selfie' onChange={(e) => {
                              setSelfieFile(e.target.files[0]);
                              setSelfiePrevFile(URL.createObjectURL(e.target.files[0]))

                            }} style={{ marginLeft: "20px" }} className="validate" />
                          </div>
                            }
                      </div>
                          </div>
                            <p className='docs_image' id='selfieImgError1'>Please select selfie image</p>
                          </div>
                        </div>

                    <div className="warning_msg">
                      <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} /></div>
                      <p>Upload your selfie with current date and signature on blank page</p>
                    </div>
                    <div className="kyc_verification_btn">
                      <button className='done_btn' onClick={KycApprove}>Done</button>
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
      
    }
    </>
  )
}
