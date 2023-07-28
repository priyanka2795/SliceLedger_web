import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Modal, Tabs, Tab, Image, Spinner } from 'react-bootstrap'
import CurrencyFormat from 'react-currency-format';
import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWallet, faXmark } from '@fortawesome/free-solid-svg-icons'
import myContext from '../../context/MyContext'
import {CurrencyConvert, decryptData, exchangeCurrency} from '../../Helper'
import coin from '../../assets/images/coin.png'
import ReactPaginate from 'react-paginate';
import BuyPopup from '../components/BuyPopup';
import SellPopup from '../components/SellPopup';


export default function SliceWallet() {
    const showNav = useContext(myContext)
    const [loading, setLoading] = useState(true)
    const accessToken = localStorage.getItem('accessToken')
    const auth = JSON.parse(localStorage.getItem('auth'))
    const currency_type = auth.currency.toLowerCase()
    const [walletData, setWalletData] = useState([]);
    const [slice_price, setSlicePrice] = useState();
    const [min, setMin] = useState("")
    const slicePrice = walletData.slicePrice;


    // ===========buy token modal===========
    const [buyTokenShow, setBuyTokenShow] = useState(false)
    const BuyToken = () => setBuyTokenShow(true);
    const BuyTokenClose = () => setBuyTokenShow(false);
   

    // ===========sell token modal===========
    const [sellTokenShow, setSellTokenShow] = useState(false);
   const SellToken = () => setSellTokenShow(true);
   const SellTokenClose = () => setSellTokenShow(false);


    const [buyUpdate, setBuyUpdate] = useState(false)
    const [sellUpdate, setSellUpdate] = useState(false)
    // ================================================ wallet details =======================================
   
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
    useEffect(() => {
        walletDetail()
    }, [])

    // ================================================ buy sell transaction history ========================================
    

    const [allBuyData, setAllBuyData] = useState([])
    const [allSellData, setAllSellData] = useState([])
    async function getTransaction() {
        let toCurrency = (auth.currency === "INR") ? "inr" : "usd";
        let slicePrice = await exchangeCurrency(walletData.slicePrice, toCurrency);
        let minamount = (auth.currency === "INR") ? 100 : 10 ;
        setMin(minamount)
        setSlicePrice(slicePrice)
        await fetch("https://bharattoken.org/sliceLedger/admin/api/auth/userOrder", {
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
            setAllBuyData(res.result.buy)
            setAllSellData(res.result.sale)
        })
        .catch(err => {
            console.log(err);
        });

    }
    useEffect(() => {
        getTransaction()
        console.log("update buy sell")
    }, [buyUpdate, sellUpdate, walletData])

    console.log("slice_price ", slice_price)
    // =============buy data pagination===============
    const [currentItemsBuy, setCurrentItemsBuy] = useState(null);
    const [pageCountBuy, setPageCountBuy] = useState(0);

    const [itemOffsetBuy, setItemOffsetBuy] = useState(0);
    const itemsPerPageBuy = 10
    useEffect(() => {

        const endOffsetBuy = itemOffsetBuy + itemsPerPageBuy;

        setCurrentItemsBuy(allBuyData.slice(itemOffsetBuy, endOffsetBuy));
        setPageCountBuy(Math.ceil(allBuyData.length / itemsPerPageBuy));
    }, [itemOffsetBuy, itemsPerPageBuy, allBuyData]);

    const handlePageClickBuy = (event) => {
        const newOffsetBuy = (event.selected * itemsPerPageBuy) % allBuyData.length;
        setItemOffsetBuy(newOffsetBuy);
    };


    // =============sell data pagination===============
    const [currentItemsSell, setCurrentItemsSell] = useState(null);
    const [pageCountSell, setPageCountSell] = useState(0);

    const [itemOffsetSell, setItemOffsetSell] = useState(0);
    const itemsPerPageSell = 10

    useEffect(() => {

        const endOffsetSell = itemOffsetSell + itemsPerPageSell;

        setCurrentItemsSell(allSellData.slice(itemOffsetSell, endOffsetSell));
        setPageCountSell(Math.ceil(allSellData.length / itemsPerPageSell));
    }, [itemOffsetSell, itemsPerPageSell, allSellData]);


    const handlePageClickSell = (event) => {
        const newOffsetSell = (event.selected * itemsPerPageSell) % allSellData.length;
        setItemOffsetSell(newOffsetSell);
    };





   
 


    return (
        <>
            <Header />
            <div className="main-section d-flex">
                <div className="sideNav_section" style={{ width: showNav.navOpen ? "300px" : "0px", transition: "all 0.5s ease" }}>
                    <SideNavbar />
                </div>

                <div className="sliceWallet_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }} >
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <div className="sliceWallet_head mt-4">
                                    <h5>Slice Wallet</h5>
                                </div>
                                <div className="slice_content">
                                    <Row>
                                        <Col lg={6}>
                                            <div className='sliceWallet_total_balance'>
                                                <div className='sliceWallet_total_title'>
                                                    <div><FontAwesomeIcon icon={faWallet} /></div>
                                                    <h6>Total Slice Balance</h6>
                                                </div>
                                                <div className='sliceWallet_total_value'>
                                                    <h6><CurrencyFormat value={walletData.sliceWalletBalance} displayType={'text'} decimalScale={4} thousandSeparator={true} />  <span className='sliceWallet_total_value_text'>SLC</span></h6>
                                                </div>
                                            </div>
                                        </Col>
                                        <Col lg={6}>
                                            <div className="buy_sell_btn">
                                                <button className='buyToken_btn' onClick={BuyToken}>Buy Token</button>
                                                <button className='sellToken_btn' onClick={SellToken}>Sell Token</button>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={12}>
                                            <div className="buy_sell_history"> BUY / SELL HISTORY</div>
                                        </Col>
                                        <Col lg={12} className="mt-3">
                                            <Tabs
                                                defaultActiveKey="buy"
                                                transition={false}
                                                id="noanim-tab-example"
                                                className="mb-3"
                                            >
                                                <Tab eventKey="buy" title="Buy">
                                                    <div className="buy_sell_history_table table-responsive" style={{minHeight: "524px"}}>
                                                        <table className='table table-borderless' >
                                                            <thead>
                                                                <tr>

                                                                    <th><div className="head">TOKEN</div></th>
                                                                    <th><div className="head">COIN RECEIVED</div></th>
                                                                    <th><div className="head">PRICE APPLIED</div></th>
                                                                    <th><div className="head">AMOUNT</div></th>
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
                                                                        currentItemsBuy.length > 0 ?

                                                                            (
                                                                                currentItemsBuy.map((e) => {
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
                                                                                            <td><div className="coin_received">{e.quantity}</div></td>
                                                                                            <td><div className="price_applied"><CurrencyFormat value={e.slice_price} displayType={'text'} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} /></div></td>
                                                                                            <td><div className="amount"><CurrencyFormat value={e.price} displayType={'text'} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} /></div></td>
                                                                                            <td><div className="date">{e.date} <br></br><span>{e.time}</span></div></td>
                                                                                            <td><div className={e.status === "completed" ? "status_completed" : "status_failed"}>{e.status}</div></td>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            )

                                                                            :
                                                                            <tr>
                                                                                <td colSpan={6}>
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
                                                            onPageChange={handlePageClickBuy}
                                                            pageRangeDisplayed={3}
                                                            marginPagesDisplayed={2}
                                                            pageCount={pageCountBuy}
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
                                                </Tab>
                                                <Tab eventKey="sell" title="Sell">
                                                    <div className="buy_sell_history_table table-responsive" style={{minHeight: "524px"}}>
                                                        <table className='table table-borderless'>
                                                            <thead>
                                                                <tr>

                                                                    <th><div className="head">TOKEN</div></th>
                                                                    <th><div className="head">COIN RECEIVED</div></th>
                                                                    <th><div className="head">PRICE APPLIED</div></th>
                                                                    <th><div className="head">AMOUNT</div></th>
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
                                                                        currentItemsSell.length > 0 ?

                                                                            (
                                                                                currentItemsSell.map((e) => {
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
                                                                                            <td><div className="coin_received">{e.quantity}</div></td>
                                                                                            <td><div className="price_applied"><CurrencyFormat value={e.slice_price} displayType={'text'} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} /></div></td>
                                                                                            <td><div className="amount"><CurrencyFormat value={e.price} displayType={'text'} thousandSeparator={true} prefix={ (auth.currency === "INR") ?  '₹' : '$'} /></div></td>
                                                                                            <td><div className="date">{e.date}<br></br> <span>{e.time}</span></div></td>
                                                                                            <td><div className={e.status === "completed" ? "status_completed" : "status_failed"}>{e.status}</div></td>
                                                                                        </tr>
                                                                                    )
                                                                                })
                                                                            )

                                                                            :
                                                                            <tr>
                                                                                <td colSpan={6}>
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
                                                            onPageChange={handlePageClickSell}
                                                            pageRangeDisplayed={3}
                                                            marginPagesDisplayed={2}
                                                            pageCount={pageCountSell}
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
                                                </Tab>

                                            </Tabs>
                                        </Col>

                                    </Row>

                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
           

          
            <BuyPopup show={buyTokenShow} handleClose={BuyTokenClose} buyUpdate={buyUpdate} setBuyUpdate={setBuyUpdate} />
            <SellPopup show = {sellTokenShow} handleClose={SellTokenClose} sellUpdate={sellUpdate} setSellUpdate={setSellUpdate}   />
        </>
    )
}