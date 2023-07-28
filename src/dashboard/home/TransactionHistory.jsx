import React, { useState, useContext, useEffect } from 'react'
import { Container, Row, Col, Table, Image, Spinner } from 'react-bootstrap'

import Header from '../common/Header'
import SideNavbar from '../common/SideNavbar'
import coin from '../../assets/images/coin.png'
import myContext from '../../context/MyContext'
import { decryptData } from '../../Helper'

import ReactPaginate from 'react-paginate';

export default function TransactionHistory() {
    const showNav = useContext(myContext)

    const accessToken = localStorage.getItem('accessToken')
    const auth = JSON.parse(localStorage.getItem('auth'))
    const [loading, setLoading] = useState(true)
    console.log("authhhhhhhhhhh", auth);
    const [viewDetails, setViewDetails] = useState(false);
    const viewDetailsClose = () => setViewDetails(false);

    const [allBuyData, setAllBuyData] = useState([])
    const [allSellData, setAllSellData] = useState([])

    useEffect(() => {
        fetch("https://bharattoken.org/sliceLedger/admin/api/auth/userOrder", {
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
                console.log("dashboard", res.result.buy);

                setAllBuyData(res.result.buy.reverse())
                setAllSellData(res.result.sale.reverse())
                if (parseInt(res.status) === 401) {
                    History('/login');
                }
            }).catch(err => {
                console.log(err);
            });
    }, [])
    // =============Buy data pagination===============
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


                <div className="transaction_history_section" style={{ width: showNav.navOpen ? "calc(100vw - 300px)" : "100vw", transition: "all 0.5s ease" }}>
                    <Container>
                        <Row>
                            <Col lg={12}>
                                <h5 className='mt-4'>Token Transactions</h5>
                            </Col>
                        </Row>
                        <Row className='justify-content-center'>
                            <Col lg={12}>

                                <div className="transaction_history_content">
                                    <div className="transaction_history_title">
                                        <h6>All Buy Transactions</h6>
                                    </div>

                                    <div className="transaction_history_table">
                                        <Table striped bordered hover size="sm" responsive>
                                            <thead>
                                                <tr>
                                                    <td><div className="title_head">No.</div></td>
                                                    <td><div className="head">Token Name</div></td>
                                                    <td><div className="title_head">Transaction</div></td>
                                                    <td><div className="title_head">Price {auth.currency === "INR" ? '₹' : '$'}</div></td>
                                                    <td><div className="title_head">Quantity</div></td>
                                                    <td><div className="title_head">Status</div></td>
                                                    <td><div className="title_head">Date/Time</div></td>

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

                                                                currentItemsBuy.map((e, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td><div className="head">{index + 1}</div></td>
                                                                            <td>
                                                                                <div className="token_name_details">
                                                                                    <div className='token_image'>
                                                                                        <Image src={coin} fluid />
                                                                                    </div>
                                                                                    <div className="token_name">{e.token_name}</div>
                                                                                </div>
                                                                            </td>

                                                                            <td><div className='head'>{e.type}</div></td>
                                                                            <td><div className='amount_text price buy'>{e.price}</div></td>
                                                                            <td><div className='quantity'>{e.quantity}</div></td>
                                                                            <td><div className={e.status === 'completed' ? 'status_completed' : 'status_rejected'}>{e.status}</div></td>
                                                                            <td><div className='date_time'>{e.date} &nbsp;&nbsp;{e.time}</div></td>

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
                                        </Table>
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
                                </div>
                            </Col>
                        </Row>

                        <Row className='justify-content-center'>
                            <Col lg={12}>

                                <div className="transaction_history_content">
                                    <div className="transaction_history_title">
                                        <h6>All Sell Transactions</h6>
                                    </div>

                                    <div className="transaction_history_table">
                                        <Table striped bordered hover size="sm" responsive>
                                            <thead>
                                                <tr>
                                                    <td><div className="title_head">No.</div></td>
                                                    <td><div className="head">Token Name</div></td>
                                                    <td><div className="title_head">Transaction</div></td>
                                                    <td><div className="title_head">Price {auth.currency === "INR" ? '₹' : '$'}</div></td>
                                                    <td><div className="title_head">Quantity</div></td>
                                                    <td><div className="title_head">Status</div></td>
                                                    <td><div className="title_head">Date/Time</div></td>


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
                                                                currentItemsSell.map((e, index) => {
                                                                    return (
                                                                        <tr>
                                                                            <td><div className="head">{index + 1}</div></td>
                                                                            <td>
                                                                                <div className="token_name_details">
                                                                                    <div className='token_image'>
                                                                                        <Image src={coin} fluid />
                                                                                    </div>
                                                                                    <div className="token_name">{e.token_name}</div>
                                                                                </div>
                                                                            </td>

                                                                            <td><div className='head'>{e.type}</div></td>
                                                                            <td><div className='amount_text price sell'>{e.price} </div></td>
                                                                            <td><div className='quantity'>{e.quantity}</div></td>
                                                                            <td><div className={e.status === 'completed' ? 'status_completed' : 'status_rejected'}>{e.status}</div></td>
                                                                            <td><div className='date_time'>{e.date} &nbsp;&nbsp;{e.time}</div></td>

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
                                        </Table>
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
                                </div>
                            </Col>
                        </Row>


                    </Container>
                </div>

            </div>
        </>
    )
}

