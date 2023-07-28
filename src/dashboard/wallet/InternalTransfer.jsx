import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Modal, Spinner, Image } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format';
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faWallet,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import myContext from '../../context/MyContext'
import { CurrencyConvert, decryptData } from '../../Helper'
import $ from 'jquery'
import coin from '../../assets/images/coin.png'
import { FaRegCopy } from 'react-icons/fa'
import ReactPaginate from 'react-paginate';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import icon from '../../assets/images/transferIcon.png'

export default function InternalTransfer() {
    const showNav = useContext(myContext)
    const [loading, setLoading] = useState(true)
    const [showOtpDiv, setShowOtpDiv] = useState(false)
    const accessToken = localStorage.getItem('accessToken')
    const auth = JSON.parse(localStorage.getItem('auth'))
    const [updateToken, setUpdateToken] = useState(false)
    const [search, setSearch] = useState("")

    const [walletData, setWalletData] = useState([]);
    // ======input field state and error message state=====
    const [address, setAddress] = useState("")
    const [slice, setSlice] = useState("")
    const [otp, setOtp] = useState("")
    const [addressErr, setAddressErr] = useState("")
    const [sliceErr, setSliceErr] = useState("")
    const [otpErr, setOtpErr] = useState("")



    $(".validate").focus(function () {
        setAddressErr("")
        setSliceErr("")
        setOtpErr("")
    })
    // ==============wallet data start===========
    useEffect(() => {
        walletDetail()
    }, [])
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
                setWalletData(res.result)

            })
            .catch(err => {
                console.log(err);
            });
    }
    // ==============wallet data end===========

    //====================================== transfer token modal start =============================
    const [showTransferModal, setShowTransferModal] = useState(false);

    const handleTransferClose = () => {
        setShowTransferModal(false);
        setAddress("")
        setSlice("")
    }
    const transferToken = () => setShowTransferModal(true);
    //====================================== transfer token modal end ===============================

    //====================================== share token modal start ===============================
    const [showShareModal, setShowShareModal] = useState(false);

    const handleShareClose = () => setShowShareModal(false);
    const shareToken = () => setShowShareModal(true)

    //====================================== share token modal end ===============================

    //====================================== share token modal start ===============================
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const closeSuccessModal = () => {
        setShowSuccessModal(false);
        setAddress("")
        setSlice("")
        setShowOtpDiv(false)
        setUpdateToken(!updateToken)
    }

    console.log("rerender componer")
    //====================================== share token modal end ===============================

    //=========================================== send otp function start================================
    function sendOtp() {
        console.log(slice, address)
        if (!address.length) {
            setAddressErr("please enter valid wallet address")

        }
        if (slice.length<2) {
            console.log("slice", slice.length)
            setSliceErr("please enter slice minimum or more than 10 ")
            return
        }

        if (slice > walletData.sliceWalletBalance) {
            setSliceErr("The transfer token quantity cannot be more than your slice wallet Balance. Please try again! ")
        }

        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/send-transfer-otp", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            },
            "body": JSON.stringify({
                address: address,
                token_Quantity: slice
            })
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response)
                console.log("send otp  res", res)
                if (res.status === 200) {
                    setShowOtpDiv(true)
                }
            })
            .catch(err => {
                console.log(err);
            });



    }
    //=========================================== send otp function end================================

    //=========================================== Resend otp function start================================
    const getResendOtp = () => {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/resend-transfer-otp", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            }

        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response)
                console.log("resend otp  res", res)
            })
            .catch(err => {
                console.log(err);
            });
    }
    //=========================================== Resend otp function end================================

    //=========================================== transfer slice function start================================
    const [transferTokenErr, setTransferTokenErr] = useState("")
    function SendSlice() {
        if (!address.length) {
            setAddressErr("please enter valid wallet address")
        }
        if (!otp.length || otp.length < 4) {
            setOtpErr("please enter valid otp")
        }
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/transfer-token", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            },
            "body": JSON.stringify({
                address: address,
                token_Quantity: slice,
                otp: otp
            })
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response)
                console.log("transfer slice res", res)
                if (res.status === 422) {
                    setOtpErr(res.message)
                }
                if (res.status === 200) {
                    setShowTransferModal(false)
                    setShowSuccessModal(true)
                    setTransferTokenErr(res.message)
                    setAddress("")
                    setSlice("")
                    setOtp("")
                }
            })
            .catch(err => {
                console.log(err);
            });


    }
    //=========================================== transfer slice function end================================

    //===========================================get transfer slice function start================================
    const [transferData, setTransferData] = useState([])
    useEffect(() => {
        getTransferSlice()
        getQR()
    }, [updateToken])

    function getTransferSlice() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/get-transfer-token", {
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
                setTransferData(res.result)


            })
            .catch(err => {
                console.log(err);
            });
    }

    //===========================================get transfer slice function end================================

    // =============pagination start===============
    const [currentItems, setCurrentItems] = useState(null);
    const [pageCount, setPageCount] = useState(0);

    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 10
    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(transferData.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(transferData.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, transferData]);


    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % transferData.length;
        setItemOffset(newOffset);
    };
    // =============pagination end===============

    // =============get QR code function start===============
    const [qr, setQr] = useState("")
    const [startAddress, setStartAddress] = useState("")
    const [endAddress, setEndAddress] = useState("")
    function getQR() {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/getQR", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            },
        })
            .then(response => response.json())
            .then(response => {
                // setLoading(false)
                const res = decryptData(response);
                console.log("get qr code", res.result)
                setQr(res.result)
                setStartAddress(res.result.walletAddress.slice(0, 6))
                setEndAddress(res.result.walletAddress.slice(-6))

            })
            .catch(err => {
                console.log(err);
            });
    }

    // =============get QR code function end===============

    const copyText = (num, e) => {
        $("#address_" + num).show();
        $("#copyAddress").show()
        setTimeout(() => {
            $("#address_" + num).hide();
            $("#copyAddress").hide()
        }, 1000)


    }

    
    return (
        <>
            <Header />
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>

                <div className="internal_transfer_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }} >
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="internal_transfer_head mt-4">
                                    <h5>Internal Wallet</h5>
                                </div>
                            </Col>
                        </Row>
                        <div className="internal_transfer_content slice_content">
                            <Row>
                                <Col lg={5}>
                                    <div className='sliceWallet_total_balance'>
                                        <div className='sliceWallet_total_title'>
                                            <div><FontAwesomeIcon icon={faWallet} /></div>
                                            <h6>Slice Balance</h6>
                                        </div>
                                        <div className='sliceWallet_total_value'>
                                            <h6><CurrencyFormat value={walletData.sliceWalletBalance} displayType={'text'} decimalScale={4} thousandSeparator={true} />  <span className='sliceWallet_total_value_text'>SLC</span></h6>
                                        </div>
                                    </div>
                                </Col>
                                <Col lg={7}>
                                    <div className="transfer_btn">
                                        <button className='token_btn' onClick={shareToken}>Share</button>
                                        <button className='token_btn' onClick={transferToken}>Transfer Slice</button>
                                    </div>
                                </Col>
                                <Col lg={{ span: 7, offset: 5 }}>
                                    <div className="input-group mb-3 searchDiv">
                                        <input type="text" className="form-control" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="search here...."/>
                                        <button className="input-group-text" id="basic-addon2"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                    </div>
                                </Col>
                             
                                <Col lg={12}>
                                    <div className="transfer_history">
                                        <div className="title">Internal Transfer History</div>
                                        <div className="transfer_slice_history_table table-responsive" style={{ minHeight: "524px" }}>
                                            <table className='table table-borderless'>
                                                <thead>
                                                    <tr>

                                                        <th><div className="head">TOKEN</div></th>
                                                        <th><div className="head">Quantity</div></th>
                                                        <th><div className="head">From</div></th>
                                                        <th><div className="head">To</div></th>
                                                        <th><div className="head">DATE</div></th>
                                                        <th><div className="head">STATUS</div></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {loading ?
                                                        <tr className='loader text-center'>

                                                            <td colSpan={6}><Spinner animation="border" role="status">
                                                                <span className="visually-hidden">Loading...</span>
                                                            </Spinner></td>
                                                        </tr>
                                                        :
                                                        (
                                                            currentItems.length > 0 ?

                                                                (
                                                                    currentItems.filter((val)=>{
                                                                        if(search === ""){
                                                                            return val
                                                                        }else if(val.to_address.toLowerCase().includes(search.toLowerCase())){
                                                                            return val
                                                                        }
                                                                    }).map((e, index) => {
                                                                        const fromAddress = e.from_address
                                                                        const getStartFromAddress = fromAddress.slice(0, 4)
                                                                        const getEndFromAddress = fromAddress.slice(- 4)

                                                                        const toAddress = e.to_address
                                                                        const getStartToAddress = toAddress.slice(0, 4)
                                                                        const getEndToAddress = toAddress.slice(- 4)
                                                                        return (
                                                                            <tr key={e.id}>
                                                                                <td>
                                                                                    <div className="token_name_details">
                                                                                        <div className='token_image'>
                                                                                            <Image src={coin} fluid />
                                                                                        </div>
                                                                                        <div className="token_name">{e.token_name}</div>
                                                                                    </div>
                                                                                </td>
                                                                                <td><div className="quantity">{e.quantity}</div></td>
                                                                                <td><div className="fromAddress">{getStartFromAddress}...{getEndFromAddress}</div></td>
                                                                                <td><div className="toAddress">
                                                                                    {getStartToAddress}...{getEndToAddress}
                                                                                    <CopyToClipboard text={toAddress} id={index} value={index}
                                                                                        onCopy={() => copyText(index)}>
                                                                                        <span><FaRegCopy /></span>
                                                                                    </CopyToClipboard>
                                                                                    
                                                                                </div>
                                                                                <span style={{ color: 'green', display: "none" }} className="copy" id={`address_${index}`} >Copied.</span>
                                                                                </td>
                                                                                <td><div className="date">{e.date}<br></br> <span>{e.time}</span></div></td>
                                                                                <td><div className={e.status === "completed" ? "status_completed" : "status_failed"}>{e.status}</div></td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                )

                                                                :
                                                                <tr>
                                                                    <td colSpan={6}>
                                                                        <h5 className='text-center'>No Transfer Data</h5>
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


            {/* ====================================== transfer token modal start ============================= */}
            <Modal show={showTransferModal} className="transfer_slice_modal" centered>
                <Modal.Body>
                    <div className="transfer_close_btn" onClick={handleTransferClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className="transfer_slice_div">
                        <div className="title">Transfer Slice</div>

                        <div className="total_slice">Available Slice :
                            <span><CurrencyFormat value={walletData.sliceWalletBalance} displayType={'text'} decimalScale={4} thousandSeparator={true} /><b style={{ color: "black" }}> SLC</b></span>
                        </div>

                        <div className="transfer_slice_input">
                            <div className="wallet_address_input">
                                <label>Enter Wallet Address</label>
                                <div class="input-group mb-3">
                                    <input type="text"
                                        class="form-control validate"
                                        placeholder="Enter Wallet Address"
                                        value={address}
                                        onChange={(e) => { setAddress(e.target.value) }}

                                    />
                                </div>
                            </div>
                            <p className='text-danger'>{addressErr}</p>

                            {
                                showOtpDiv ?
                                    <div>
                                        <div className="slice_otp_input">
                                            <label>Enter The OTP Sent To Your Email</label>
                                            <div class="input-group">
                                                <input type="text"
                                                    class="form-control validate"
                                                    placeholder="Enter OTP"
                                                    value={otp}
                                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                                    maxLength={4}
                                                />
                                            </div>
                                            <div className="resend_otp_btn" onClick={getResendOtp}>Resend OTP</div>
                                        </div>
                                        <p className='text-danger'>{otpErr}</p>

                                        <div className="slice_transfer_btn">
                                            <button className='verifyOtp_transferToken_btn' onClick={SendSlice}>VERIFY OTP</button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className="slice_input">
                                            <label>Enter Slice</label>
                                            <div class="input-group mb-3">
                                                <input type="text"
                                                    class="form-control validate"
                                                    placeholder="Enter Slice"
                                                    value={slice}
                                                    onChange={(e) => setSlice(e.target.value.replace(/\D/g, ''))}
                                                />
                                            </div>
                                        </div>
                                        <p className='text-danger'>{sliceErr}</p>

                                        <div className="slice_transfer_btn">
                                            <button className='sendOtp_continue_btn' onClick={sendOtp}>CONTINUE</button>
                                        </div>
                                    </div>
                            }




                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            {/* ====================================== transfer token modal end =============================== */}

            {/* ====================================== Share token modal start ============================= */}
            <Modal show={showShareModal} className="share_slice_modal" centered>
                <Modal.Body>
                    <div className="share_close_btn" onClick={handleShareClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className="share_slice_div">
                        <div className="share_address_title">Share Address</div>
                        <div className="qr_img">
                            <img src={qr.rqOrder} alt="img-fluid" />
                        </div>

                        <div className="available_walletBalance">Available Balance<br></br>
                            <span><CurrencyFormat value={walletData.faitWalletBalance} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={(auth.currency === "INR") ? '₹' : '$'} /></span>
                        </div>

                        <div className="available_sliceBalance">Available Slice<br></br>
                            <span><CurrencyFormat value={walletData.sliceWalletBalance} displayType={'text'} decimalScale={4} thousandSeparator={true} /> SLC</span>
                        </div>

                        <div className="wallet_address">
                            <p className='address'>{startAddress}...........{endAddress}</p>
                            <p className='copy_btn'>
                                <CopyToClipboard text={qr.walletAddress}
                                    onCopy={() => copyText()}>
                                    <span>Copy</span>
                                </CopyToClipboard>
                            </p>
                        </div>
                        <span style={{ color: 'green', display: "none", float: "right" }} className="copy" id='copyAddress'>Copied.</span>
                    </div>
                </Modal.Body>
            </Modal>
            {/* ====================================== Share token modal start ============================= */}

            {/* ==============sell token successful message modal=============== */}
            <Modal show={showSuccessModal} className="transferSuccessModal" centered>
                <Modal.Body>
                    <div className="transfer_success_div ">
                        <Container>
                            <Row>
                                <Col lg={4}>
                                    <div className="transfer_image">
                                        <img src={icon} alt="" className='img-fluid' />
                                    </div>
                                </Col>
                                <Col lg={8}>
                                    <div className="transferMsg_head" style={{ fontSize: "18px" }}>{transferTokenErr}</div>

                                    <div className="transfer_btn">
                                        <button className=' transfer_internalBtn' onClick={closeSuccessModal}>GO TO INTERNAL WALLET</button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}