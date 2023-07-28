import React from 'react'
import { Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

export default function BuyTokenPopup(props) {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const currency_type = auth.currency.toLowerCase()
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
                    <Modal.Title>Buy Token</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='slice_buyToken_section'>
                        <div className='buyToken_balance'>
                            <div className="buyToken_text">Estimated Buying Price</div>
                            <div className="buyToken_value">₹10,000</div>
                            <p>Add Amount below to Buy</p>
                        </div>
                        <div className="buyToken_user_amount">
                            <div className="col-12 buyToken_rupees">
                                <label>In Rupees</label>
                                <input type="number" placeholder='00.00'/>
                            </div>
                            <span>To</span>
                            <div className="col-12 buyToken_SLC">
                                <label>In SLC</label>
                                <input type="number" placeholder='00.00'/>
                            </div>
                        </div>
                        <div className="buyToken_btn">
                            <div className="insufficient_balance_error">
                                <div className='exclamation_mark_icon'><FontAwesomeIcon icon={faExclamationCircle}/></div>
                                <div className='error_message'>Insufficient balance. Please add more funds
                                    or reduce your order value</div>
                            </div>
                            <button>Buy</button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
