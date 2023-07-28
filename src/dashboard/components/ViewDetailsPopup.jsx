import React from 'react'
import { Modal, Table } from 'react-bootstrap'

export default function ViewDetailsPopup(props) {
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Indian Rupee</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='slice_viewDetails_section'>
                        <div className='deposit_amount'>
                            <div className="deposit_text">Deposite Amount</div>
                            <div className="deposit_value">200.00 INR</div>
                        </div>
                        <div className="deposit_details">
                            <Table bordered hover>
                                <tbody>
                                    <tr>
                                        <td>Status</td>
                                        <td>Completed</td>
                                    </tr>
                                    <tr>
                                        <td>Payment Method</td>
                                        <td>Razorpay</td>
                                    </tr>
                                    <tr>
                                        <td>Reference Number</td>
                                        <td>ZP5d6f86427a883</td>
                                    </tr>
                                    <tr>
                                        <td>Created At</td>
                                        <td>1 Feb 22, 11:10 PM</td>
                                    </tr>
                                    <tr>
                                        <td>Updated At</td>
                                        <td>1 Feb 22, 11:20 PM</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
