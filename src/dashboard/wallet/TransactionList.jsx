import React, { useState,useContext } from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import ViewDetailsPopup from '../components/ViewDetailsPopup'
import myContext from '../../context/MyContext'

export default function TransactionList() {
    const showNav = useContext(myContext)
    // ==================== ViewDetailsPopup =======================
    const [viewDetails, setViewDetails] = useState(false);
    const viewDetailsClose = () => setViewDetails(false);
    const viewDetailsFundShow = () => setViewDetails(true);

  
  

    return (
        <>
            <Header />
           <div className="main-section d-flex">
           <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                <SideNavbar />
            </div>

            <div className="transaction_list_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className='slice_transaction_head mt-4'>
                                <h6>Fund Transactions</h6>
                            </div>
                        </Col>
                        <Col lg={12}>
                            <div className="transaction_detail_table">
                                <Table striped bordered hover size="sm" responsive>

                                    <thead>
                                        <tr>
                                            <td><div className="title_head">No.</div></td>
                                            <td><div className="title_head">Transaction</div></td>
                                            <td><div className="title_head">Price</div></td>
                                            <td><div className="title_head">Status</div></td>
                                            <td><div className="title_head">Action</div></td>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr>
                                            <td><div className="head">1</div></td>
                                            <td><div className='head'>Deposite</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td><div className='status completed'>Completed</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>
                                        <tr>
                                            <td><div className="head">2</div></td>
                                            <td><div className='head'>Deposite</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td> <div className='status'>REJECTED</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>
                                        <tr>
                                            <td><div className="head">3</div></td>
                                            <td><div className='head'>Withdrawal</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td><div className='status completed'>Completed</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>

                                        </tr>
                                        <tr>
                                            <td><div className="head">4</div></td>
                                            <td><div className='head'>Deposite</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td> <div className='status'>REJECTED</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>
                                        <tr>
                                            <td><div className="head">5</div></td>
                                            <td><div className='head'>Withdrawal</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td> <div className='status'>REJECTED</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>
                                        <tr>
                                            <td><div className="head">6</div></td>
                                            <td><div className='head'>Deposite</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td><div className='status completed'>Completed</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>
                                        <tr>
                                            <td><div className="head">7</div></td>
                                            <td><div className='head'>Deposite</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td><div className='status completed'>Completed</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>
                                        <tr>
                                            <td><div className="head">8</div></td>
                                            <td><div className='head'>Deposite</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td><div className='status completed'>Completed</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>
                                        <tr>
                                            <td><div className="head">9</div></td>
                                            <td><div className='head'>Deposite</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td><div className='status completed'>Completed</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>
                                        <tr>
                                            <td><div className="head">10</div></td>
                                            <td><div className='head'>Deposite</div></td>
                                            <td><div className='amount_text'>₹3,171</div></td>
                                            <td><div className='status completed'>Completed</div></td>
                                            <td><button onClick={viewDetailsFundShow}>View Details</button></td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <ViewDetailsPopup show={viewDetails} handleClose={viewDetailsClose} />
            </div>
           </div>
        </>
    )
}

