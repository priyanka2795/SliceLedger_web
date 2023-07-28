import React, { useEffect, useState, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone, faLocation, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"
import { decryptData } from '../Helper'
import validate from '../validation/ContactForm'
import { ContactForm } from '../Form'

export default function ContactSection() {

    const [contact_us, setContactInformation] = useState([]);
    const [errorMsg, setErrorMsg] = useState(false);
    const [errorMessage, setErrorMessage] = useState();
    const [successMessage, setSuccessMessage] = useState();
    const [successMsg, setSuccessMsg] = useState(false);
    const form = useRef(null);
    const {
        values,
        errors,
        handleChange,
        handleSubmit
      } = ContactForm(contact, validate);

       // =======================Contact Form Api Call=====================================
    function contact() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/contact-form", {
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "accept": "application/json"
        },
        "body": JSON.stringify({
          name:values.name,
          email:values.email,
          subject:values.subject,
          message:values.message,
        })
      })
      .then(response => response.json())
      .then(response => {
        const res  = decryptData(response)
        if (parseInt(res.status) == 200) {
            form.current.reset();
            setSuccessMsg(true)
            setSuccessMessage(res.message)
        }else{
            setErrorMsg(true)
            setErrorMessage(res.message)
        }
        
        setTimeout(() => {
            setSuccessMsg(false)
            setErrorMsg(false)
            setErrorMessage('')
            setSuccessMessage('')
            
        }, 3000);

      })
      .catch(err => {
        console.log(err);
      });
    }

    console.log("contact_us", contact_us);
    useEffect(() => {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/contact_information", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
            },
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response);
                setContactInformation(res.result[0])

            }).catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <section className="slice_contact_section" id='contact'>
                <Container>
                    <Row>
                        <Col lg={6} md={6}>
                            <div className="slice_contact_details">
                                <div className="slice_contact_content">
                                    <div className='contact_us_text'>Contact Us</div>
                                    <h2>Get In Touch</h2>
                                    <hr />
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, aspernatur quae cumque recusandae rerum nulla temporibus, ipsam explicabo maxime vel tempore voluptatum! Dignissimos magni quam repellat sit. Labore, quos hic.</p>
                                    <div className='slice_envelop'>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        <a href={"mailto:"+contact_us.email}> {contact_us?contact_us.email:"info@infograins.com"}</a>
                                    </div>
                                    <div className='slice_phone'>
                                        <FontAwesomeIcon icon={faPhone} />
                                        <a href={"tel:"+contact_us.contact_no}> +91-{contact_us?contact_us.contact_no:"+91 9770477239"} </a>
                                    </div>
                                    <div className='slice_location'>
                                        <FontAwesomeIcon icon={faLocation} />
                                        <a href='/'>{contact_us?contact_us.address:"Indore, India,452010"}</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={6} md={6}>
                            {(errorMsg == false)? "" :
                            <div className="error_msg">
                                <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} />
                                        {errorMessage}
                                </div>
                            </div>}
                            {(successMsg == false)? "" :
                            <div className="success_msg">
                                <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} />
                                    {successMessage}
                                </div>
                            </div>}
                            <div className='slice_get_in_touch_form'>
                                <form onSubmit={handleSubmit} noValidate ref={form}>
                                    <input className='col-12 my-2 form_name_field' type="text" placeholder='Name'
                                     name='name'
                                     autoComplete='off'
                                     onChange={handleChange} />
                                     {errors.name && (
                                        <span className="error invalid-feedback">{errors.name}</span>
                                    )}
                                    <input className='col-12 my-2 form_email_field' type="text" placeholder='Email'
                                     name='email' 
                                     autoComplete='off'
                                     onChange={handleChange} />
                                     {errors.email && (
                                        <span className="error invalid-feedback">{errors.email}</span>
                                    )}
                                    <input className='col-12 my-2 form_subject_field' type="text" placeholder='Subject'
                                     name='subject'
                                     autoComplete='off'
                                     onChange={handleChange} />
                                    {errors.subject && (
                                        <span className="error invalid-feedback">{errors.subject}</span>
                                    )}
                                    <textarea className='col-12 my-2 form_message_field' cols="30" rows="6"
                                     placeholder='Message'
                                     name='message'
                                     autoComplete='off'
                                     onChange={handleChange} ></textarea>
                                     {errors.message && (
                                        <span className="error invalid-feedback">{errors.message}</span>
                                    )}
                                    <input className='form_submit_field' type="submit" />
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
