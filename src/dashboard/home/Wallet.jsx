import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faGauge, faUser, faPenToSquare, faSliders, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { Col, Container, Row, Accordion } from 'react-bootstrap'

import Header from '../common/Header'
import WithdrawalPopup from '../components/WithdrawalPopup'
import AddFundPopup from '../components/AddFundPopup';
import ViewDetailsPopup from '../components/ViewDetailsPopup'
import BuyTokenPopup from '../components/BuyTokenPopup'
import { Link } from 'react-router-dom'

export default function Wallet() {
    // ==================== WithdrawalPopup =======================
    const [withDraw, setWithDraw] = useState(false);
    const withDrawClose = () => setWithDraw(false);
    const withDrawShow = () => setWithDraw(true);
    // ==================== AddFundPopup =======================
    const [addFund, setAddFund] = useState(false);
    const addFundClose = () => setAddFund(false);
    const addFundShow = () => setAddFund(true);
    // ==================== ViewDetailsPopup =======================
    const [viewDetails, setViewDetails] = useState(false);
    const viewDetailsClose = () => setViewDetails(false);
    const viewDetailsFundShow = () => setViewDetails(true);
    // ==================== BuyTokenPopup =======================
    const [buyToken, setBuyToken] = useState(false);
    const buyTokenClose = () => setBuyToken(false);
    const buyTokenShow = () => setBuyToken(true);
    return (
        <>
            <Header />

            <div className="main-section">
                <div className="sideNav_section">
                    <div className="slice_dash_sideNav">
                        <Container>
                            <Row>
                                <Col lg={12} className="px-0">
                                    <div className="sideNav_header">
                                        <div className="slice_logo">
                                            <a href="#" className='navbar-brand'>SliceLedger</a>
                                        </div>
                                    </div>
                                    <div className="sideNav_body">
                                        <div className="sideNav_menu">
                                            <ul>
                                                <li>
                                                    <div className='menu'>
                                                        <div className='menu_icon'>
                                                            <FontAwesomeIcon icon={faGauge} />
                                                        </div>
                                                        <div className='title'><Link to='/dashboard'>Dashboard</Link></div>
                                                    </div>

                                                </li>
                                                <li>
                                                    <Accordion>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>
                                                                <div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faUser} />
                                                                    </div>
                                                                    <div className='title'>Profile</div>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faUser} />
                                                                    </div>
                                                                    <div className='title'><Link to=''>My Profile</Link></div>
                                                                </div>
                                                                <div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faPenToSquare} />
                                                                    </div>
                                                                    <div className='title'><Link to=''>Edit Profile</Link></div>
                                                                </div>
                                                                <div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faSliders} />
                                                                    </div>
                                                                    <div className='title'><Link to=''>Account Setting</Link></div>
                                                                </div>
                                                                <div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                                                    </div>
                                                                    <div className='title'><Link to=''>Logout</Link></div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>


                                                    </Accordion>
                                                </li>
                                                <li>
                                                    <Accordion>
                                                        <Accordion.Item eventKey="0">
                                                            <Accordion.Header>
                                                                <div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faWallet} />
                                                                    </div>
                                                                    <div className='title'>Wallet</div>
                                                                </div>
                                                            </Accordion.Header>
                                                            <Accordion.Body>
                                                                <div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faWallet} />
                                                                    </div>
                                                                    <div className='title'><Link to='/wallet'>Withdraw Funds</Link></div>
                                                                </div>
                                                                <div className='menu'>
                                                                    <div className='menu_icon'>
                                                                        <FontAwesomeIcon icon={faWallet} />
                                                                    </div>
                                                                    <div className='title'><Link to='/wallet'>Add Funds</Link></div>
                                                                </div>
                                                            </Accordion.Body>
                                                        </Accordion.Item>


                                                    </Accordion>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
                <div className='slice_wallet_section'>
                    <Container>
                        <Row >
                            <Col lg={4}>
                                <div className="slice_transaction_history d-none">
                                    <h5>Transaction History</h5>
                                    <ul>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Deposite</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status'>REJECTED</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Deposite</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status completed'>Completed</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Withdraw</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status'>REJECTED</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Deposite</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status completed'>Completed</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Withdraw</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status'>REJECTED</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Deposite</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status completed'>Completed</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Withdraw</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status'>REJECTED</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Deposite</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status'>REJECTED</div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className='transaction_history_details'>
                                                <div className='transaction_history_text'>
                                                    <div className='head'>Withdraw</div>
                                                    <button onClick={viewDetailsFundShow}>View Details</button>
                                                </div>
                                                <div className='transaction_history_amount'>
                                                    <div className='amount_text'>₹3,171</div>
                                                    <div className='status completed'>Completed</div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </Col>

                            <Row className='justify-content-center'>
                                <Col lg={12}>
                                    <div className='flat_wallet_head'>Flat Wallet</div>
                                </Col>
                              
                                    <Col lg={4}>
                                        <div className="slice_flat_wallet">

                                            <div className="flat_wallet_subHead">Withdraw Funds</div>

                                            <div className="withdraw_input_field">
                                                <label>Enter Your Amount</label>
                                                <div className="amount_input">
                                                    <div class="input-group mb-3">
                                                        <input type="number" class="form-control" placeholder="" />
                                                        <div class="input-group-text">INR</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flat_wallet_total_balance'>
                                                <div className='flat_wallet_total_title'>
                                                    <div><FontAwesomeIcon icon={faWallet} /></div>
                                                    <h6>Total Wallet Balance</h6>
                                                </div>
                                                <div className='flat_wallet_total_value'>
                                                    <h6>20,00,000.00</h6>
                                                    <div className='flat_wallet_total_value_text'>INR</div>
                                                </div>
                                            </div>

                                            <div className='flat_wallet_Btn'>
                                                <button className='withdraw_btn' onClick={withDrawShow}>Withdraw Funds</button>

                                            </div>
                                        </div>
                                    </Col>
                                    <Col lg={4}>
                                        <div className="slice_flat_wallet ">

                                            <div className="flat_wallet_subHead">Add Funds</div>

                                            <div className="withdraw_input_field">
                                                <label>Enter Your Amount</label>
                                                <div className="amount_input">
                                                    <div class="input-group mb-3">
                                                        <input type="number" class="form-control" placeholder="" />
                                                        <div class="input-group-text">INR</div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className='flat_wallet_total_balance'>
                                                <div className='flat_wallet_total_title'>
                                                    <div><FontAwesomeIcon icon={faWallet} /></div>
                                                    <h6>Total Wallet Balance</h6>
                                                </div>
                                                <div className='flat_wallet_total_value'>
                                                    <h6>20,00,000.00</h6>
                                                    <div className='flat_wallet_total_value_text'>INR</div>
                                                </div>
                                            </div>

                                            <div className='flat_wallet_Btn'>

                                                <button className='add_fund_btn' onClick={addFundShow}>Add Funds</button>
                                            </div>
                                        </div>
                                    </Col>
                             

                            </Row>

                            <Row>
                                <Col lg={4}>
                                    <div className="slice_flat_wallet">
                                        <div className='flat_wallet_head'>Slice Wallet</div>
                                        <div className="flat_wallet_subHead">Buy</div>

                                        <div className="withdraw_input_field">

                                            <div className="amount_input">
                                                <label>Enter Your Amount</label>
                                                <div class="input-group mb-3">
                                                    <input type="number" class="form-control" placeholder="" />
                                                    <div class="input-group-text">INR</div>
                                                </div>
                                                <label>Your INR Amount Converted to</label>
                                                <div class="input-group mb-3">

                                                    <input type="number" class="form-control" placeholder="" />
                                                    <div class="input-group-text">SLC</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flat_wallet_total_balance'>
                                            <div className='flat_wallet_total_title'>
                                                <div><FontAwesomeIcon icon={faWallet} /></div>
                                                <h6>Total Wallet Balance</h6>
                                            </div>
                                            <div className='flat_wallet_total_value'>
                                                <h6>20,00,000.00</h6>
                                                <div className='flat_wallet_total_value_text'>SLC</div>
                                            </div>
                                        </div>

                                        <div className='flat_wallet_Btn'>
                                            <button className='withdraw_btn' onClick={buyTokenShow}>Buy</button>

                                        </div>
                                    </div>
                                </Col>
                                <Col lg={4}>
                                    <div className="slice_flat_wallet">
                                        <div className='flat_wallet_head'>Slice Wallet</div>
                                        <div className="flat_wallet_subHead">Sell</div>

                                        <div className="withdraw_input_field">

                                            <div className="amount_input">
                                                <label>Enter Your Amount</label>
                                                <div class="input-group mb-3">
                                                    <input type="number" class="form-control" placeholder="" />
                                                    <div class="input-group-text">INR</div>
                                                </div>
                                                <label>Your INR Amount Converted to</label>
                                                <div class="input-group mb-3">
                                                    <input type="number" class="form-control" placeholder="" />
                                                    <div class="input-group-text">SLC</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flat_wallet_total_balance'>
                                            <div className='flat_wallet_total_title'>
                                                <div><FontAwesomeIcon icon={faWallet} /></div>
                                                <h6>Total Wallet Balance</h6>
                                            </div>
                                            <div className='flat_wallet_total_value'>
                                                <h6>20,00,000.00</h6>
                                                <div className='flat_wallet_total_value_text'>SLC</div>
                                            </div>
                                        </div>

                                        <div className='flat_wallet_Btn'>

                                            <button className='add_fund_btn'>Sell</button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>


                        </Row>
                    </Container>
                </div>
                <WithdrawalPopup show={withDraw} handleClose={withDrawClose} />
                <AddFundPopup show={addFund} handleClose={addFundClose} />
                <ViewDetailsPopup show={viewDetails} handleClose={viewDetailsClose} />
                <BuyTokenPopup show={buyToken} handleClose={buyTokenClose} />
                {/* <Footer /> */}

            </div>
        </>
    )
}
