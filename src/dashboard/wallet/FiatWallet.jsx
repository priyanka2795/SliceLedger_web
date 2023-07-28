import React, { useState, useContext, useEffect } from 'react'
import CurrencyFormat from 'react-currency-format';
import { Container, Row, Col, Modal, Spinner } from 'react-bootstrap'
import { HiOutlineArrowDown,HiOutlineArrowUp } from 'react-icons/hi'
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import AddFundPopup from '../components/AddFundPopup';
import AddKycPopup from '../components/AddKycPopup';
import AddBankPopup from '../components/AddBankPopup';
import WithdrawalPopup from '../components/WithdrawalPopup'
import myContext from '../../context/MyContext'
import { useNavigate } from 'react-router-dom'
import { decryptData } from '../../Helper'
import ReactPaginate from 'react-paginate';

export default function FiatWallet() {
    const showNav = useContext(myContext)
    const [loading, setLoading] = useState(true)
    const [walletData, setWalletData] = useState([]);
    const [transaction, setTransaction] = useState([]);
    let History = useNavigate();
    const accessToken = localStorage.getItem('accessToken')
    const auth = JSON.parse(localStorage.getItem('auth'))
    const bankDetails = auth.bankAcount
    const currency_type = auth.currency.toLowerCase()

    // ==================== AddFundPopup =======================
    const [addFund, setAddFund] = useState(false);
    const addFundClose = () => setAddFund(false);
    const addFundShow = () => setAddFund(true);
    // ==================== WithdrawalPopup =======================
    const [withDraw, setWithDraw] = useState(false);
    const withDrawClose = () => setWithDraw(false);
    const withDrawShow = () => setWithDraw(true);

    // ==================== Add Bank Popup =======================
    const [addBank, setAddBank] = useState(false);
    const addBankClose = () => setAddBank(false);
    const addBankShow = () => setAddBank(true);

    // ==================== Add KYC Popup =======================
    const [addKyc, setAddKyc] = useState(false);
    const addKycClose = () => setAddKyc(false);
    const addKycShow = () => setAddKyc(true);

    // ==========state for update component whem add fund or withdraw=========
    const [updateFundComponent, setUpdateFundComponent] = useState(false)
    const [updateWithdrawComponent, setUpdateWithdrawComponent] = useState(false)

    useEffect(() => {
        walletDetail()
    }, [updateFundComponent, updateWithdrawComponent])

    function walletDetail() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/walletDetail", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            },
        })
            .then(response => response.json())
            .then(response => {
                setLoading(false)
                const res = decryptData(response);

                if (parseInt(res.status) === 401) {
                    History('/login');
                } else {
                    setWalletData(res.result)
                    setTransaction(res.result.transaction)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    // =============pagination===============
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

   
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10
    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(transaction.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(transaction.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, transaction]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % transaction.length;
        setItemOffset(newOffset);
    };
  
    return (
        <>
            <Header />
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>

                <div className="fiat_wallet_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="fiat_wallet_head mt-4">
                                    <h5>Fiat Wallet</h5>
                                </div>
                            </Col>
                        </Row>
                        <div className="fiat_content">
                            <Row>
                                <Col lg={5}>
                                    <div className="total_wallet_balance_div">
                                        <div className="total_wallet_balance_title">WALLET BALANCE</div>
                                        <div className="total_wallet_balance">
                                            <span>
                                                {loading ? <span>....</span> : <CurrencyFormat value={walletData.faitWalletBalance} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} />}
                                            </span>

                                        </div>
                                    </div>
                                </Col>
                                <Col lg={7}>
                                    <div className="fiat_wallet_btn">
                                        {auth.bankAcount ?
                                            <div className="wallet_btn">
                                                <button className='deposit_btn' onClick={addFundShow}>DEPOSITE INR TO WALLET</button>
                                            </div> :
                                            <div className="wallet_btn">
                                                <button className='deposit_btn' onClick={addBankShow}>DEPOSITE INR TO WALLET</button>
                                            </div>
                                        }
                                        {
                                            (() => {
                                                if (!auth.bankAcount) {
                                                    return (
                                                        <div className="wallet_btn">
                                                            <button className='withdraw_btn' onClick={addBankShow}>WITHDRAW INR TO BANK</button>
                                                        </div>
                                                    )
                                                }else if (!auth.kyc || (auth.kyc.status === "pending" || auth.kyc.status === "rejected")) {
                                                    return (
                                                        <div className="wallet_btn">
                                                            <button className='withdraw_btn' onClick={addKycShow}>WITHDRAW INR TO BANK</button>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <div className="wallet_btn">
                                                            <button className='withdraw_btn' onClick={withDrawShow}>WITHDRAW INR TO BANK</button>
                                                        </div>
                                                    )
                                                }
                                            })()
                                        }
                                       
                                    </div>
                                </Col>

                                <Col lg={12}>
                                    <div className="fiat_deposit_withdraw_history">
                                        <div className='fiat_deposit_withdraw_history_title'>DEPOSITE / WITHDRAW HISTORY</div>
                                        <div className="fiat_deposit_withdraw_history_table table-responsive" style={{minHeight: "524px"}}>
                                            <table className='table table-borderless'>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            <div className="fiat_amount_head">AMOUNT</div>
                                                        </th>
                                                        <th>
                                                            <div className="fiat_action_head">ACTION</div>
                                                        </th>
                                                        <th>
                                                            <div className="fiat_data_time_head">DATE AND TIME</div>
                                                        </th>
                                                        <th>
                                                            <div className="fiat_status_head">PAYMENT STATUS</div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ?
                                                        <tr className='loader text-center'>

                                                            <td colSpan={4}><Spinner animation="border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </Spinner></td>
                                                        </tr>
                                                        :

                                                        (
                                                            currentItems ?

                                                                currentItems.map((e) => {
                                                                    return (
                                                                        <tr key={e.id}>
                                                                            <td>
                                                                                <div className="fiat_amount">
                                                                                <div className="amount_icon">{e.type === 'add' ? <HiOutlineArrowDown /> : <HiOutlineArrowUp/>}</div>
                                                                                    <div className="amount_price"> <CurrencyFormat value={e.amount} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} /></div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                {(e.type === 'add') ?
                                                                                    <div className="fiat_action">
                                                                                        <div className="text">{currency_type === "inr" ? <span>INR</span> : <span>USD</span>} Deposited </div>
                                                                                    </div>

                                                                                    : <div className="fiat_action_with">
                                                                                        <div className="text">{currency_type === "inr" ? <span>INR</span> : <span>USD</span>} Withdraw</div>
                                                                                    </div>}
                                                                            </td>
                                                                            <td>
                                                                                <div className="fiat_date_time">
                                                                                    <div className="date">
                                                                                        <span>{e.date} </span>&nbsp; &nbsp;<span>{e.time}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="fiat_status">
                                                                                    {(() => {
                                                                                        if (e.status === "cancelled") {
                                                                                            return (
                                                                                                <div className="status_title_failed">Cancelled</div>
                                                                                            )
                                                                                        } else if (e.status === 'completed') {
                                                                                            return (
                                                                                                <div className="status_title_completed">Completed</div>
                                                                                            )
                                                                                        } else if (e.status === 'pending') {
                                                                                            return (
                                                                                                <div className="status_title_pending">Pending</div>
                                                                                            )
                                                                                        } else {
                                                                                            return (
                                                                                                <div className="status_title_cancelled">Failed</div>
                                                                                            )
                                                                                        }
                                                                                    })()}
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })

                                                                :
                                                                <tr>
                                                                    <td colSpan={4}>
                                                                        <h5 className='text-center'>No Transactions</h5>
                                                                    </td>
                                                                </tr>
                                                        )




                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="paginate">
                                            <ReactPaginate
                                                breakLabel="..."
                                                nextLabel=" >>"
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={3}
                                                marginPagesDisplayed={2}
                                                pageCount={pageCount}
                                                previousLabel="<< "
                                                containerClassName='pagination justify-content-end'
                                                pageClassName='page-item'
                                                pageLinkClassName='page-link'
                                                previousClassName='page-item'
                                                previousLinkClassName='page-link'
                                                nextClassName='page-item'
                                                nextLinkClassName='page-link'
                                                breakClassName='page-item'
                                                breakLinkClassName='page-link'
                                                activeClassName='active'

                                            />
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                        </div>
                    </Container>
                </div>
            </div>
            <AddFundPopup show={addFund} handleClose={addFundClose} bankDetails={bankDetails} accessToken={accessToken} renderFundComp={updateFundComponent} reRenderFund={setUpdateFundComponent} walletData={walletData} />
            <AddBankPopup show={addBank} handleClose={addBankClose} />
            <AddKycPopup show={addKyc} handleClose={addKycClose} />
            <WithdrawalPopup show={withDraw} handleClose={withDrawClose} bankDetails={bankDetails} walletData={walletData} accessToken={accessToken} renderWithdrawComp={updateWithdrawComponent} reRenderWithdraw={setUpdateWithdrawComponent} />
        </>
    )
}

