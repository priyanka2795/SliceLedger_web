import React, { useState, useEffect } from 'react'
import { Container, Modal, Row, Col } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'
import { decryptData ,CurrencyConvert,  currency, exchangeCurrency} from '../../Helper'
import $ from 'jquery'

export default function WithdrawalPopup(props) {
    const auth = JSON.parse(localStorage.getItem('auth'))
    const currency_type = auth.currency.toLowerCase()
    const [amountErr, setAmountErr] = useState("")
    const [amount, setAmount] = useState("")
    const [min, setMin] = useState("")
    const [otp, setOtp] = useState("")
    const [otpErr, setOtpErr] = useState("")

    const [showWithdrawal, setShowWithdrawal] = useState(true)
    const [isDisable, setIsDisable] = useState(true)
   
    const [successWithdraw, setSuccessWithdraw] = useState(false)

    const [showOtpDiv, setShowOtpDiv] = useState(false)
    const [getAmount, setGetamount] = useState("")

    useEffect(() => {
        let minamount = (auth.currency == "INR") ? 100 : 10 ;
        setMin(minamount)
    }, [])

    $(".validate").focus(function () {
        setAmountErr("")
        setOtpErr("")
    })

    // ========== send otp function===========
    async function showOtp() {

        if (amount < min) {
            setAmountErr("Please enter amount minimum "+min)
            setShowWithdrawal(true)
            setShowOtpDiv(false)
        }
        else {
            fetch("https://bharattoken.org/sliceLedger/admin/api/auth/send-withdraw-otp", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Authorization": props.accessToken
                },
                "body": JSON.stringify({
                    amount: amount
                })
            })
                .then(response => response.json())
                .then(response => {
                    const res = decryptData(response)
                    console.log("send otp  res", res)
                    if (res.status === 422) {
                        setShowWithdrawal(true)
                        setShowOtpDiv(false)
                        setAmountErr(res.message)
                    } else {
                        setShowOtpDiv(true)
                        setShowWithdrawal(false)
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    // ==========resend otp function===========
    async function handleResendOtp() {
        setAmount("")
        setShowOtpDiv(true)
        setShowWithdrawal(false)


        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/resend-withdraw-otp", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": props.accessToken
            },
            "body": JSON.stringify({
                amount: amount
            })
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response)
                console.log("resend otp res", res)
            })
            .catch(err => {
                console.log(err);
            });
    }
    // ==========resend otp function===========

    // ============add withdraw fund function===============
    async function showWithdrawSuccess() {
        if (otp.length<4 || otp.length>4) {
            setOtpErr("Please Enter valid otp")
        } else {
      
            fetch("https://bharattoken.org/sliceLedger/admin/api/auth/withdraw", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Authorization": props.accessToken
                },
                "body": JSON.stringify({
                    amount: amount,
                    otp: otp
                })
            })
                .then(response => response.json())
                .then(response => {
                    const res = decryptData(response)
                    console.log("send otp res", res)
                    if(res.status === 422){
                        setOtpErr(res.message)
                    }else{
                        setSuccessWithdraw(true)
                        setShowWithdrawal(false)
                        setShowOtpDiv(false)
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }

    }


    const handleChange = (e) => {
      setAmount(e.target.value.replace(/\D/g,''))
      
    }

    const handleClose = () => {
        setShowWithdrawal(true)
        setSuccessWithdraw(false)
        setAmount("")
        setOtp("")
        props.handleClose()
        props.reRenderWithdraw(!props.renderWithdrawComp)
    }
   
  
    useEffect(async ()=> {
       let walletBallens = await exchangeCurrency(props.walletData.faitWalletBalance, auth.currency.toLowerCase());
       console.log('walletBallens',walletBallens);
       setGetamount(walletBallens)
    });
// ==============active class function start==========
   useEffect(()=>{
    $('ul').on('click', 'li' ,function(){
        $('li').removeClass('active');
        $(this).addClass('active')
    })
   })
// ==============active class function end==========

// ==============get percentage function start==========
   const getTwentyFive = ()=>{
     let twentyFive = getAmount * 25/100
    setAmount(twentyFive)
  }
   const getFifty = ()=>{
    let fifty = getAmount * 50/100
    setAmount(fifty)
}
const getSeventyFive = ()=>{
    let seventyFive = getAmount * 75/100
    setAmount(seventyFive)
}
const getHundred = ()=>{
    let hundred = getAmount * 100/100
    setAmount(hundred)
}
// ==============get percentage function end==========

const handleWithdrawClose = ()=>{
    props.handleClose()
    setAmount("")
    window.location.reload()
}
    return (
       
        <>
       
            <Modal
                show={props.show}
                onHide={props.handleClose}
                keyboard={false}
                centered
                className="withdraw_modal"
                backdrop="static"

            >
                <Modal.Body>
              
                    {/* =============withdrawal section================== */}
                    {showWithdrawal &&
                        <div className='slice_withdrawal_section'>
                            <div className="close_btn" onClick={handleWithdrawClose}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                            <div className="withdraw_head">
                                <div className='withdrawal_title'>Withdraw INR to Your Bank Account </div>
                                <div className='withdrawal_Balance'>
                                    <div className='price'><CurrencyFormat value={props.walletData.faitWalletBalance} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} /></div>
                                    <div className='text'>Current Balance</div>
                                </div>
                            </div>
                            
                            <div className='withdrawal_message'>Money Would be deposited in the following bank account:</div>
                            <div className='withdrawal_account_details table-responsive'>
                                <table>
                                    <tr>
                                        <td>ACCOUNT NO</td>
                                        <th className='px-4'>{props.bankDetails.acountNumber}</th>
                                        <td>IFSC CODE</td>
                                        <th className='px-4'>{props.bankDetails.ifsc}</th>
                                    </tr>

                                    <tr>
                                        <td>ACCOUNT TYPE</td>
                                        <th className='px-4'>{props.bankDetails.acountType}</th>
                                        <td>ACCOUNT HOLDER NAME</td>
                                        <th className='px-4'>{props.bankDetails.name}</th>
                                    </tr>

                                </table>
                            </div>
                            <div className="withdrawal_minimum_text"><FontAwesomeIcon icon={faCircleExclamation} />&nbsp; Minimum Withdrawal Amount is {(auth.currency =="INR") ? "₹100" : "$10"} </div>
                            <div className='withdrawal_amount'>
                                <div className='withdrawal_amount_text'>ENTER THE AMOUNT YOU WISH TO WITHDRAW</div>
                                 {/*<div className="withdrawal_amount_percent">
                                    <ul className='link'>
                                        <li><button className="amount_percent" onClick={getTwentyFive}>25%</button></li>
                                        <li><button className="amount_percent"  onClick={getFifty}>50%</button></li>
                                        <li><button className="amount_percent"  onClick={getSeventyFive}>75%</button></li>
                                        <li><button className="amount_percent"  onClick={getHundred}>100%</button></li>
                                    </ul>      
                                 </div> */}
                                <div className='withdrawal_amount_input'>
                                    <input className='col-7 mx-1 validate'
                                        placeholder='Enter the amount'
                                        type="text"
                                        pattern='[0-9]'
                                        value={amount}
                                        onChange={handleChange}
              
                                    />
                                    <button className='col-4 btn btn-success' onClick={showOtp} >Withdraw</button>

                                </div>
                                <p className='text-danger'>{amountErr}</p>
                            </div>
                        </div>
                    }


                    {/* ================send otp section============ */}
                    {showOtpDiv &&
                        <div className="slice_otp_div">
                            <Container>
                                <Row className="justify-content-center">
                                    <Col lg={10}>
                                    <div className="close_btn" onClick={handleWithdrawClose} style={{display:"flex", justifyContent:"flex-end"}}>
                                <FontAwesomeIcon icon={faXmark} />
                            </div>
                                        <div className="otp_content">
                                            <p className='text'>We've sent a verification code to your email.</p>
                                               <input type="text"
                                                className='otp_input validate'
                                                placeholder='Enter OTP'
                                                pattern='[0-9]'
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value.replace(/\D/g,''))}
                                                maxLength={4}
                                            />
                                            <p className='text-danger'>{otpErr}</p>

                                            <div className="otp_btns">
                                                <button className='resend_btn btn ' onClick={handleResendOtp}>Resend</button>
                                                <button className='submit_btn btn btn-success' onClick={showWithdrawSuccess}>Submit</button>
                                            </div>
                                        </div>

                                    </Col>
                                </Row>
                            </Container>

                        </div>
                    }


                    {successWithdraw &&
                        <div className="paymentWithdraw_section ">
                            <Container>
                                <Row>
                                    <Col lg={4}>
                                        <div className="inr_image">
                                            <img src="https://us.123rf.com/450wm/mustahtar/mustahtar1901/mustahtar190100025/115318089-safe-and-secure-indian-rupee-investments-stack-of-gold-coins-and-bag-of-money-and-business-protectio.jpg?ver=6" alt="" className='img-fluid' />
                                        </div>
                                    </Col>
                                    <Col lg={8}>
                                        <div className="withdraw_head">Withdraw is being verified!</div>
                                        <div className="withdraw_amount">{currency_type === "inr" ? <span>₹</span> : <span>$</span>}{amount}</div>
                                        <div className="text1">Will be credited to your bank acount after we receive the payment from slice wallet</div>
                                        <div className="text2">This process can take upto 7 working days. If you have not made payment, please contact our support team to cancel your withdraw request.</div>
                                        <div className="wallet_btn">
                                            <button className=' wallet_inrBtn' onClick={handleClose}>GO TO INR WALLET</button>
                                        </div>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    }



                </Modal.Body>
            </Modal>
        </>
    )
}
