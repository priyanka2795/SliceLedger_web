import React, { useState } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default function TransferPayment() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <div className="transferPayment_section">
                <Container>
                    <Row className='justify-content-center'>
                        <Col lg={8}>
                            <div className="transfer_payment_steps">
                                <div className="payment_step">
                                    <div className="payment_step1">
                                        <div className="title">STEP 1</div>
                                        <div className="head">
                                            <h6>Transfer money to the below bank account</h6>
                                        </div>
                                        <div className="text">
                                            Open Your bank or payment app & transfer exactly 5000 from your registered bank account-<br />
                                            <span>(Bank Name *******123)</span>
                                        </div>
                                        <div className="transfer_payment_account_details">
                                            <div className="head">
                                                <h6>Transfer to the following bank account</h6>
                                            </div>
                                            <div className="account_details">
                                                <table className='table table-borderless'>
                                                    <tbody>
                                                        <tr>
                                                            <th>Account No</th>
                                                            <td>987654321123</td>
                                                        </tr>
                                                        <tr>
                                                            <th>IFSC Code</th>
                                                            <td>abc000123</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Beneficiary Name</th>
                                                            <td>abc Pvt lmt</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Account Type</th>
                                                            <td>Current</td>
                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="payment_step2">
                                        <div className="title">STEP 2</div>
                                        <div className="head">
                                            <h6>Enter Transaction ID of Your Payment</h6>
                                        </div>
                                        <div className="transactionId_input row">
                                            <div class="col-8">
                                                <input type="text" class="form-control" placeholder="Enter ID" />
                                            </div>
                                            <div class="col-auto">
                                                <button class="btn btn-success mb-3" onClick={handleShow}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="transfer_payment_note">
                                    <div className="title">Note :</div>
                                    <div className="text">
                                        <p>Always transfer from your registered bank account.</p>
                                         <p>Transfer from any other account will be Refunded in 7 days.</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>

                {/* ========transfer payment successfull modal========= */}
                <Modal show={show} onHide={handleClose}>

                    <Modal.Body>
                        <Container fluid>
                            <Row>
                                <Col lg={12}>
                                    <div className="success_msg_div">
                                        <div className="icon">
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </div>
                                        <h5>Payment Transfered Successfully</h5>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>

                </Modal>
            </div>


        </>
    )
}

