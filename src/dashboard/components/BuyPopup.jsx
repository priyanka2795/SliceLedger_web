import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Modal } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CurrencyConvert, decryptData, exchangeCurrency } from '../../Helper'
import $ from 'jquery'




export default function BuyPopup(props) {
    const accessToken = localStorage.getItem('accessToken')
    const auth = JSON.parse(localStorage.getItem('auth'))
    const [walletData, setWalletData] = useState([]);
    const [slice_price, setSlicePrice] = useState();
    const [amountError, setAmountError] = useState(false)
    const [min, setMin] = useState("")
    const slicePrice = walletData.slicePrice;



    // ===========buy token modal===========
    const [buyTokenErr, setBuyTokenErr] = useState("")

    const handleBuyClose = () => {
        setAmountError(false)
        props.handleClose()
        setINR("")
        setSlcToken("")
    }
    // ===========buy token successful message modal===========
    const [buyTokenSuccessFulShow, setBuyTokenSuccessFulShow,] = useState(false);
    const closeBuySuccess = () => {
        setBuyTokenSuccessFulShow(false)
        props.setBuyUpdate(!props.buyUpdate)
        window.location.reload(false);
    }

    // ================================================ wallet details =======================================
    useEffect(() => {
        walletDetail()
    }, [])

    async function walletDetail() {


        await fetch("https://bharattoken.org/sliceLedger/admin/api/auth/walletDetail", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json",
                "Authorization": accessToken
            },
        })
            .then(response => response.json())
            .then(response => {
                const res = decryptData(response);
                // console.log("res", res)
                if (parseInt(res.status) === 401) {
                    History('/login');
                } else {
                    setWalletData(res.result)
                }
            })
            .catch(err => {
                console.log(err);
            });
       
    }
    useEffect(()=>{
        getSlice()
    },[walletData])
   async function getSlice(){
        let toCurrency = (auth.currency === "INR") ? "inr" : "usd";
        let slicePrice = await exchangeCurrency(walletData.slicePrice, toCurrency);
        let minamount = (auth.currency === "INR") ? 100 : 10;
        setMin(minamount)
        setSlicePrice(slicePrice)
    }
    console.log("slice_price buy", slice_price)
    // ================================================ buyINRValue ========================================
    const [INR, setINR] = useState("")
    const [slcToken, setSlcToken] = useState("")
    const [amountErr, setAmountErr] = useState("")

    function buyINRValue(e) {
        let INR_value = (e.target.value.replace(/\D/g, ''))
        let convertedSLC = (INR_value / slice_price).toFixed(4);
        setSlcToken(convertedSLC)
        setINR(INR_value)
        if (INR_value < min) {
            setAmountError(true);
        } else {
            setAmountError(false);
        }
    }
    function buySLCValue(e) {
        let SLC_INR_value = (e.target.value.replace(/\D/g, ''))
        let convertedINR = (SLC_INR_value * slice_price).toFixed(2);
        setSlcToken(SLC_INR_value)
        setINR(convertedINR)
        if (convertedINR < min) {
            setAmountError(true);
        } else {
            setAmountError(false);
        }
    }


    async function handleBuyToken() {
        if (INR < min) {
            setAmountError(true);
            return
        }
        if (INR.length === 0) {
            setAmountErr("Please fill the field")
        } else {
            setAmountError(false);
            fetch("https://bharattoken.org/sliceLedger/admin/api/auth/buyTokenUser", {
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    "Authorization": accessToken
                },
                "body": JSON.stringify({
                    amount: INR,
                    token_Quantity: slcToken,
                    slice_price: slice_price
                })
            })
                .then(response => response.json())
                .then(response => {
                    const res = decryptData(response)
                    console.log("buy token res", res)

                    if (res.status === 422) {
                        toast.error('Your wallet contains insufficient units to buy!', {
                            position: "top-right",
                            autoClose: 5000,
                            theme: "colored",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    if (res.status === 200) {
                        setBuyTokenSuccessFulShow(true)
                        props.handleClose()
                        setBuyTokenErr(res.message)
                        setINR("")
                        setSlcToken("")
                    }
                })
                .catch(err => {
                    console.log(err);
                });

        }

    }

    return (
        <>
            {/* ==============buy token modal=============== */}
            <Modal show={props.show} className="buyModal" centered>

                <Modal.Body>
                    <div className="buy_close_btn" onClick={handleBuyClose}>
                        <FontAwesomeIcon icon={faXmark} />
                    </div>
                    <div className="slice_buy_sell_wallet">

                        <div className="buy_sell_wallet_subHead">Buy Slice</div>
                        <div className='buyToken_balance'><span><CurrencyConvert amount={slicePrice} decimalScale={""} /></span></div>

                        <div className="buy_sell_input_field">

                            <div className="amount_input">
                                <label>BUY FOR</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control validate" minlength="2" maxlength="15" placeholder="00.00" value={INR} onChange={buyINRValue} />
                                    <div class="input-group-text">{auth.currency}</div>
                                </div>
                                {(amountError === true) ?
                                    <p className='text-danger'>Please enter minimum amount <CurrencyFormat value={min} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={(auth.currency === "INR") ? '₹' : '$'} /></p>
                                    : ""
                                }

                                <div className="slice_balance_div">
                                    <p className='text'>SLICE BALANCE</p>
                                    <div className="slice_balance">
                                        <p style={{ color: "chocolate" }} ><CurrencyFormat value={walletData.sliceWalletBalance} displayType={'text'} decimalScale={4} thousandSeparator={true} /><b style={{ color: "black" }}> SLC</b></p>
                                        <p style={{ color: "gray" }}>=  <CurrencyFormat value={walletData.sliceWalletBalance * slice_price} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={(auth.currency === "INR") ? '₹' : '$'} /></p>
                                    </div>
                                </div>
                                <label>QUANTITY</label>
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control" value={slcToken} minlength="3" maxlength="20" pattern="[+-]?\d+(?:[.,]\d+)?" placeholder="00.00" onChange={buySLCValue} style={{ backgroundColor: "#e9ecef" }} />
                                    <div class="input-group-text" style={{ backgroundColor: "#e9ecef" }}>SLC</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className='text-danger' style={{ paddingLeft: "40px" }}>{amountErr}</p>

                    <div className='buy_sell_wallet_Btn'>
                        <button className='buy_sell_btn' onClick={handleBuyToken}>BUY SLICE</button>

                    </div>
                    <div className="wallet_balance">
                        <div className="title"><span>{auth.currency}</span> WALLET BALANCE</div>
                        <div className="balance"><CurrencyFormat value={walletData.faitWalletBalance} displayType={'text'} decimalScale={2} thousandSeparator={true} prefix={(auth.currency === "INR") ? '₹' : '$'} /></div>
                    </div>
                </Modal.Body>
            </Modal>
            {/* ==============buy token successful message modal=============== */}
            <Modal show={buyTokenSuccessFulShow} className="buySuccessModal" centered>
                <Modal.Body>
                    <div className="paymentWithdraw_section ">
                        <Container>
                            <Row>
                                <Col lg={4}>
                                    <div className="inr_image">
                                        <img src="https://us.123rf.com/450wm/mustahtar/mustahtar1901/mustahtar190100025/115318089-safe-and-secure-indian-rupee-investments-stack-of-gold-coins-and-bag-of-money-and-business-protectio.jpg?ver=6" alt="" className='img-fluid' />
                                    </div>
                                </Col>
                                <Col lg={8}>
                                    <div className="withdraw_head" style={{ fontSize: "18px" }}>{buyTokenErr}</div>

                                    <div className="wallet_btn">
                                        <button className=' wallet_inrBtn' onClick={closeBuySuccess}>GO TO WALLET</button>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </Modal.Body>
            </Modal>


            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

        </>
    )
}