import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CurrencyFormat from 'react-currency-format';
import { faXmark, faChevronLeft, faChevronRight , faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import { RiBankLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { decryptData} from '../../Helper'
import razorpay from '../../assets/images/razorpay.png'

export default function AddFund(props) {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const [events, setEvents] = useState(['click']);
    const [razorError, setRazorError] = useState(false);
    const currency_type = auth.currency.toLowerCase()
    const [amount, setAmount] = useState("")
    const [transactionId, setTransactionId] = useState("")
    const [min, setMin] = useState("")
    const [max, setMax] = useState("")
    const [paymentType, setPaymentType] = useState("bank")
    const [transactionIdErr, setTransactionIdErr] = useState("")
    const [adminBankDetails, setAdminBankDetails] = useState([])
    const [AddFundBtn, setAddFundBtn] = useState(true)
    const accessToken = localStorage.getItem('accessToken')
    const [verifyBtnDisabled, setVerifyBtnDisabled] = useState(true)

    //   ===============Confirm Details section ====================  
    const [showConfirmTransaction, setShowConfirmTransaction] = useState(false)
    //  ===============Deposit Payment section ====================  *
    const [showDeposit, setShowDeposit] = useState(false)
    //  ===============Account Details section ====================  
    const [showAccountDetails, setShowAccountDetails] = useState(true)
    //===========payment method section modal==========
    const [showPaymentMethod, setShowPaymentMethod] = useState(false)
    //===========add fund section modal==========
    const [addFundSection, setAddFundSection] = useState(true)
    // ============bank details modal=============
    const [showBankDetail, setShowBankDetail] = useState(false);

    const HandleEditTransaction = () => {
        setShowAccountDetails(true)
        setShowConfirmTransaction(false)
        setVerifyBtnDisabled(false)
    }

    function handlePaymentMethod() {
        setAddFundSection(false)
        setShowPaymentMethod(true)
    }

    const handleBack = () => {
        setAddFundSection(true)
        setShowPaymentMethod(false)
    }

    const handleShowBankDetail = () => {
        setShowBankDetail(true)
        
        props.handleClose()
    }

    const handleVerify = () => {
        if (transactionId.length < 12 || transactionId.length > 18) {
            setTransactionIdErr("Transaction Id must be 12-18 digit.")
        } else {
            setShowAccountDetails(false)
            setShowConfirmTransaction(true)
            setTransactionIdErr("")
        }

    }

    const handleChange = (e) => {
        setTransactionId(e.target.value)
        setVerifyBtnDisabled(false)
    }

    const depositBody = {
        amount:amount,
        payment_type: paymentType,
        payment_id: transactionId,
    }
    sessionStorage.setItem("depositBody",JSON.stringify(depositBody))
    async function handleDepositSuccess() {
       
        let storageDeposite = JSON.parse(sessionStorage.getItem("depositBody"))
        await fetch("https://bharattoken.org/sliceLedger/admin/api/auth/addFunds", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            },
            "body":  JSON.stringify({
                amount: storageDeposite.amount,
                payment_type: storageDeposite.payment_type,
                payment_id: storageDeposite.payment_id,
            })
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response)
                if (parseInt(res.status) === 200) {
                    setShowConfirmTransaction(false)
                   setShowBankDetail(true)
                   setShowAccountDetails(false)
                    setShowDeposit(true)
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    //  ===============get admin bank details function====================  *
    useEffect(() => {
        async function name() {

                let minamount = (auth.currency == "INR") ? 100 : 10 ;
                let maxamount = (auth.currency == "INR") ? 51000 : 51000 ;
                // let min = await exchangeCurrency(100, auth.currency.toLowerCase());
                setMin(minamount)
                // let max = await exchangeCurrency(5100000, auth.currency.toLowerCase());
                setMax(maxamount)
            await axios.get("https://bharattoken.org/sliceLedger/admin/api/auth/adminBank",
                {
                    headers: {
                        "content-type": "application/json",
                        "accept": "application/json",
                        "Authorization": accessToken
                    }
                }).then(response => {
                    const res = decryptData(response.data)
                    console.log("response", res)
                    setAdminBankDetails(res.result)
                }).catch(error => {
                    console.log("error", error)
                })
            console.log("adminBankDetails", adminBankDetails);
        }
        name()
    }, [])

    //==============enable disable continue button function for add fund popup============ 

    function handleChangeInput(e) {
       setAmount(e.target.value.replace(/\D/g, ''))

        if (e.target.value >= min) {
            setAddFundBtn(false)
        }
        if (e.target.value < min) {
            setAddFundBtn(true)
        }
    }


    const handleClose = () => {
        setShowBankDetail(false)
        setAddFundSection(true)
        setShowPaymentMethod(false)
        setAmount("")
        props.reRenderFund(!props.renderFundComp)
        window.location.reload(false);

    }

    const options = {
        key: "rzp_test_ql6Blyund7wee8",
        amount: amount * 100,
        currency: auth.currency,
        name: "Sliceledger",
        description: "some description",
        image: "https://cdn.razorpay.com/logos/7K3b6d18wHwKzL_medium.png",
        handler: function (response) {
            let payment_type = 'rezorpay';
            setTransactionId(response.razorpay_payment_id)
            setPaymentType(payment_type)
            handleDepositSuccess();
        },
        prefill: {
            name: auth.first_name + " " + auth.last_name,
            contact: auth.phoneNumber,
            email: auth.email
        },
        notes: {
            address: "some address"
        },
        theme: {
            color: "#435fe0",
            hide_topbar: false
        }
    };

    const openPayModal = options => {
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        props.handleClose()

    };
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    const handleFundClose  = ()=>{
        props.handleClose()
        setAmount("")
        setAddFundSection(true)
        setShowPaymentMethod(false)
    }
    return (
        <>
            <Modal
                show={props.show}
                onHide={props.handleClose}
                keyboard={false}
                centered
                backdrop="static"
                className='addFund_modal'
            >
                <Modal.Body>
                    <Container>
                        <Row className='justify-content-center'>
                            <Col lg={11}>
                                {addFundSection &&
                                    <div className='slice_addFund_section1'>
                                        <div className="close_btn" onClick={handleFundClose}>
                                            <FontAwesomeIcon icon={faXmark} />
                                        </div>
                                        <div className="slice_addFund_head">Add Fund to Wallet </div>
                                        <div className="current_balance">Current Balance : <CurrencyFormat value={props.walletData.faitWalletBalance} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} /></div>
                                        <div>
                                            <div className="addFund_input_amount">
                                                <input type="text"
                                                    placeholder='Enter the amount'
                                                    autoComplete='off'
                                                    min={100} max={51000}
                                                    value={amount}
                                                    id="amount"
                                                   
                                                    name="amount"
                                                    onChange={handleChangeInput}
                                                />

                                            </div>
                                            <div className="text_msg">Min.{((auth.currency == 'INR') ? "₹" : "$" )+min} - Max.{((auth.currency == 'INR') ? "₹" : "$" )+max} </div>
                                            <div className='addFund_btn'>
                                                
                                                <button disabled={AddFundBtn} className='continue_btn btn btn-success' onClick={handlePaymentMethod} id="continueBtn">Continue</button>

                                            </div>
                                        </div>
                                    </div>
                                }

                                {/* ===============Payment  Details section start====================  */}

                                {showPaymentMethod &&
                                    <div className="slice_selectPaymentMethod_selection">
                                        <div className="select_payment_header">
                                            <div className="back_btn" onClick={handleBack}>
                                                <FontAwesomeIcon icon={faChevronLeft} />
                                            </div>
                                            <div className="slice_addFund_head">Select Payment Method </div>
                                            <div className="close_btn" onClick={handleFundClose}>
                                                <FontAwesomeIcon icon={faXmark} />
                                            </div>
                                        </div>

                                        <div className="payment_warning_msg">
                                            <p>Please check that you have paid exactly {amount} in the following bank account
                                            </p>
                                        </div>

                                        <div className="addFund_amount">Amount: {((auth.currency == 'INR') ? "₹" : "$" )+amount}</div>

                                        {(amount < min || amount > max) ?
                                            <div className="payment_error_msg">
                                                <p>Sorry! No Payment option available at the moment for your amount. Please try other
                                                    payment modes with amount between {((auth.currency == 'INR') ? "₹" : "$" )+min} - {((auth.currency == 'INR') ? "₹" : "$" )+max}
                                                </p>
                                            </div>
                                            :
                                            <div>
                                                <div className="razorPay_method">
                                                    <div className="razor_icon">
                                                        <img src={razorpay} alt="" />
                                                        <div className="transaction_limit">Limit: Min.{((auth.currency == 'INR') ? "₹" : "$" )+min} - Max.{((auth.currency == 'INR') ? "₹" : "$" )+10000} </div>
                                                    </div>
                                                    {(amount <= 10000) ? 
                                                        <div className="forward_icon" onClick={() => openPayModal(options)}>
                                                            <FontAwesomeIcon icon={faChevronRight} />
                                                        </div>
                                                        :
                                                        <div className="forward_icon"  onClick={() => setRazorError(prev => !prev)}>
                                                            <FontAwesomeIcon icon={faChevronRight} />
                                                        </div>
                                                    }
                                                </div>
                                                {razorError && 
                                                <div className="warning_msg" id='sectiontohide'>
                                                    <div className="icon"><FontAwesomeIcon icon={faCircleExclamation} /></div>
                                                    <p>Razorpay Limit: Min.{((auth.currency == 'INR') ? "₹" : "$" )+min} - Max.{((auth.currency == 'INR') ? "₹" : "$" )+10000} </p>
                                                </div>}

                                                <div className="payment_transfer_method">
                                                    <div className='d-flex'>
                                                        <div className="bank_icon" >
                                                            <RiBankLine />

                                                        </div>
                                                        <div className="payment_transfer_msg">
                                                            <div className="head">IMPS / NEFT / RTGS (Standard)</div>
                                                            {/* <div className="text">
                                                            Transfer Money only via IMPS, NEFT, RTGS mode from your banking app & Share the
                                                            Transaction ID with us for faster verification.
                                                        </div> */}
                                                            <div className="transaction_fee">Fees: 0%</div>
                                                            <div className="transaction_limit">Limit: Min.{((auth.currency == 'INR') ? "₹" : "$" )+min} - Max.{((auth.currency == 'INR') ? "₹" : "$" )+max}</div>
                                                            <div className="transaction_time">Processing time: Upto 7 days</div>
                                                        </div>
                                                    </div>
                                                    <div className="forward_icon" onClick={handleShowBankDetail}>
                                                        <FontAwesomeIcon icon={faChevronRight} />
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                }

                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            {/* ===============Bank Details Modal start====================  */}
            <Modal show={showBankDetail} centered size="lg" backdrop="static">
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                {/* ===============Account Details section start====================  */}
                                {showAccountDetails &&
                                    <div className="addFundBankDetails_section">
                                        <div className="close_ico d-flex justify-content-end" onClick={handleClose}>
                                            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "1.3rem", color: "gray" }} />
                                        </div>
                                        <div className="bankDetail_head">Pay the following Bank Account</div>

                                        <div className="bankDetail_method_head">
                                            <div className="method">IMPS/NEFT/RTGS</div>
                                            <div className="payment">PAY EXACTLY  <span>{((auth.currency == 'INR') ? "₹" : "$" )+amount}</span></div>
                                        </div>

                                        <div className="bankDetails_step1">
                                            <div className="title">STEP 1: ADD A BENEFICIARY AND TRANSFER MONEY</div>
                                            <Row>
                                                <Col lg={6}>
                                                    <div className="bank_details">
                                                        <div className="head">ACCOUNT NO</div>
                                                        <div className="text">{adminBankDetails.acountNumber}</div>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="bank_details">
                                                        <div className="head">IFSC CODE</div>
                                                        <div className="text">{adminBankDetails.ifsc}</div>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="bank_details">
                                                        <div className="head">ACCOUNT TYPE</div>
                                                        <div className="text">{adminBankDetails.acountType}</div>
                                                    </div>
                                                </Col>
                                                <Col lg={6}>
                                                    <div className="bank_details">
                                                        <div className="head">ACCOUNT HOLDER NAME</div>
                                                        <div className="text">{adminBankDetails.acountHolderName}</div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>

                                        <div className="bankDetails_step2">
                                            <div className="header">
                                                <div className="title">STEP 2: SUBMIT TRANSACTION ID</div>
                                                {/* <div className="id_text">Where is Transaction ID?</div> */}
                                            </div>

                                            <div className='transaction_amount_input'>
                                                <input className='col-lg-7 mx-1'
                                                    placeholder='Enter the Transaction ID'
                                                    type="text"

                                                    value={transactionId}
                                                    onChange={handleChange}
                                                />

                                                <button className='col-lg-4 btn btn-success' onClick={handleVerify} disabled={verifyBtnDisabled}>VERIFY</button>


                                            </div>
                                            <p className='text-danger'>{transactionIdErr}</p>



                                            <div className="note">
                                                <strong>Note:</strong> Transaction ID is usually a 12-18 digit numeric or alpha numeric ID that you will get from your banking or payment
                                                app after you make the payment. You can also find it on your bank statement after the payment. Depending on the app you
                                                use, it may be called transaction 1D, UTR or payment reference number.
                                            </div>
                                        </div>
                                    </div>

                                }


                                {/* ===============Confirm Details section start====================  */}

                                {showConfirmTransaction &&
                                    <div className="confirmDetails_section ">
                                        <div className="confirmDetails_head">Confirm your transaction details</div>

                                        <div className="confirmDetails_text">Please check that you have paid exactly {currency_type === "inr" ? <span>₹</span> : <span>$</span>}{amount} in the following bank account</div>

                                        <div className="bankDetails_text">
                                            <Row>
                                                <Col lg={6}>
                                                    <table>
                                                        <tr>
                                                            <td>ACCOUNT NO</td>
                                                            <th className='px-4'>{adminBankDetails.acountNumber}</th>
                                                        </tr>

                                                        <tr>
                                                            <td>ACCOUNT TYPE</td>
                                                            <th className='px-4'>{adminBankDetails.acountType}</th>
                                                        </tr>

                                                    </table>
                                                </Col>
                                                <Col lg={6}>
                                                    <table>
                                                        <tr>
                                                            <td>IFSC CODE</td>
                                                            <th className='px-4'>{adminBankDetails.ifsc}</th>
                                                        </tr>

                                                        <tr>
                                                            <td>ACCOUNT NAME</td>
                                                            <th className='px-4'>{adminBankDetails.acountHolderName}</th>
                                                        </tr>

                                                    </table>
                                                </Col>
                                            </Row>

                                        </div>

                                        <div className="confirmDetails_text">Please check the Transaction ID</div>

                                        <div className="reference_id">
                                            <Row>
                                                <Col lg={7}>
                                                    <div className="referenceID_text">
                                                        <div className='text'> REFERENCE ID</div>
                                                        <div className='id'>{transactionId}</div>
                                                    </div>
                                                </Col>
                                                <Col lg={4}>
                                                    <div className="edit_text" onClick={HandleEditTransaction}>EDIT</div>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="note">
                                            <strong>Important:</strong> Please submit the correct Transaction ID, otherwise, we will not be able to
                                            track your deposits and refunds will be done after 7 - 10 working days. False confirmation may lead to a permanent account ban.
                                        </div>
                                        <div className="confirmDetails_btn d-grid mt-3">
                                            <button className='btn py-2' onClick={handleDepositSuccess}>YES THESE DETAILS ARE CORRECT</button>
                                        </div>
                                    </div>
                                }

                                {/* ===============Deposit Payment section start====================  */}
                                {showDeposit &&
                                    <div className="paymentDeposit_section">
                                        <Row>
                                            <Col lg={4}>
                                                <div className="inr_image">
                                                    <img src="https://us.123rf.com/450wm/mustahtar/mustahtar1901/mustahtar190100025/115318089-safe-and-secure-indian-rupee-investments-stack-of-gold-coins-and-bag-of-money-and-business-protectio.jpg?ver=6" alt="" className='img-fluid' />
                                                </div>
                                            </Col>
                                            <Col lg={8}>
                                                <div className="deposit_head">Deposit is being verified!</div>
                                                <div className="deposit_amount">{((auth.currency == 'INR') ? "₹" : "$" )+amount}</div>
                                                <div className="text1">will be credited to your Slice wallet after we receive the payment from your bank</div>
                                                <div className="text2">This process can take upto 7 working days. If you have not made payment, please contact our support team to cancel your deposit request.</div>
                                                <div className="wallet_btn">
                                                    <button className=' wallet_inrBtn' onClick={handleClose}>GO TO INR WALLET</button>
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                }


                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>

            {/* ===============Bank Details Modal end====================  */}

        </>
    )
}
