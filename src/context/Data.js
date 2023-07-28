import React, {useState} from 'react'
import myContext from './MyContext'
import data from './allContext'
export default function Data(props) {
    const [navOpen, setNavOpen] = useState(true)
    const [loginapi, setLoginapi] = useState('')
   
    const allData = {
        navOpen, setNavOpen, loginapi, setLoginapi
    }
    return (
        <>
            <myContext.Provider value={{ ...data, ...allData }}>
                {props.children}
            </myContext.Provider>
        </>
    )
}