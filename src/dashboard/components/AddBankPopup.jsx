import React from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function AddBankPopup(props) {
const btnStyle = {
    background: "#5965f9",
    padding: "5px 10px",
    borderRadius: "3px",
    color: "#fff",
    textDecoration: "none"
}
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                keyboard={false}
                centered
            >
                <Modal.Header closeButton className="addFund_modal_header" style={{borderBottom:"none"}}>
                    <Modal.Title className="w-100 text-center">Add Bank Account </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='slice_addFund_section'>
                        <div className='addFund_btn' style={{marginTop:"-40px"}}>
                            <div className="form-check my-4 text-center"> 
                                <label className="form-check-label" for="flexCheckDefault">
                                   Please Add first your bank Account.
                                </label>
                            </div>
                           <div className="continue_btn d-flex justify-content-end">
                              <Link to="/account_details" style ={btnStyle}>Continue</Link>
                           </div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
