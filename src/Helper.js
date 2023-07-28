import { useEffect, useState } from 'react';
import Axios from 'axios';
import CurrencyFormat from 'react-currency-format';
const CryptoJS = require("crypto-js");

// const [currency, setCurrency]= useState([])

 function decryptData(values) {
    const Key = CryptoJS.enc.Utf8.parse("xlhF31NeOlibJcoOW9tvZg7TkHcAZI3a");  // 1. Replace C by CryptoJS
    const IV = CryptoJS.enc.Utf8.parse("qwertyuiopasdfgh"); 
    const decryptedText = CryptoJS.AES.decrypt(values, Key, {                             // 4. Use decrypt instead of encrypt
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    const decryptData = JSON.parse(decryptedText.toString(CryptoJS.enc.Utf8));

    if (decryptData.message == "Unauthenticated") {
        localStorage.removeItem('accessToken');
        localStorage.clear();
        sessionStorage.clear()
    } else if (parseInt(decryptData.status) == 401){
        localStorage.removeItem('accessToken');
        localStorage.clear();
        sessionStorage.clear()
    }

    return decryptData;

}

function CurrencyConvert(props) {
    const auth =  JSON.parse(localStorage.getItem('auth'))
    const currency_type = auth.currency.toLowerCase()
    const [rate, setRate] = useState();
    const info = [];
    const from = "inr";
    const to = currency_type;
    const currency = async() => {

       await Axios.get(
            `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
            .then((res) => {
                const info = res.data[from];
                const rateData = info[to];
                setRate(rateData)
            });
    }

    useEffect(async () => {
        currency()
    })
    if (!props.decimalScale) {
        return <CurrencyFormat value={props.amount * rate} displayType={'text'} thousandSeparator={true} prefix={ (to === "inr") ?  '₹' : '$'} />
    }else{
        return <CurrencyFormat value={props.amount * rate} displayType={'text'} decimalScale={props.decimalScale} thousandSeparator={true} prefix={ (to === "inr") ?  '₹' : '$'} />
    }
    
}

async function currency(amount) {
    const auth =  JSON.parse(localStorage.getItem('auth'))
    const currency_type = auth.currency.toLowerCase()
    const info = [];
    const from = currency_type;
    const to = "inr";
    const convert = async() => {
        let loginData = await Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
        .then((res) => {
            const info = res.data[from];
            const rateData = info[to];
            return rateData;
        });
        return loginData     
    }
    let value = await convert();
    return parseFloat((value*amount).toFixed(2))
}

async function exchangeCurrency(amount, toCurrency) {
    const auth =  JSON.parse(localStorage.getItem('auth'))
    const currency_type = auth.currency.toLowerCase()
    const info = [];
    const from = 'inr';
    const to = toCurrency;
    const convert = async() => {
        let loginData = await Axios.get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`)
        .then((res) => {
            const info = res.data[from];
            const rateData = info[to];
            return rateData;
        });
        return loginData     
    }
    let value = await convert();
    return parseFloat((value*amount))
}

export {
    decryptData,
    CurrencyConvert,
    currency,
    exchangeCurrency
  }
