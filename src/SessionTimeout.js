import React, {
    useState,
    useEffect,
    useCallback,
    useRef,
    Fragment,
  } from 'react';
  import { useNavigate } from 'react-router-dom'
  import { decryptData } from './Helper'
  import moment from 'moment';
  
  const SessionTimeout =()=> {

    let History = useNavigate();
    const [events, setEvents] = useState(['click', 'load', 'scroll', 'keydown']);
    const [second, setSecond] = useState(0);
    const accessToken =  localStorage.getItem('accessToken') || ''


    let timeStamp;
    let warningInactiveInterval = useRef();
    let startTimerInterval = useRef();
  
    // start inactive check
    let timeChecker = () => {
      startTimerInterval.current = setTimeout(() => {
        let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
        warningInactive(storedTimeStamp);
      }, 1800000);
    };

    // warning timer
    let warningInactive = (timeString) => {
        clearTimeout(startTimerInterval.current);
    
        warningInactiveInterval.current = setInterval(() => {
        const maxTime = 2; // Maximum ideal time given before logout 
        const popTime = 1; // remaining time (notification) left to logout.
    
        const diff = moment.duration(moment().diff(moment(timeString)));
        const minPast = diff.minutes();
        const leftSecond = 60 - diff.seconds();
        if (minPast === popTime) {
            clearInterval(warningInactiveInterval.current);
            sessionStorage.removeItem('lastTimeStamp');

            fetch("https://bharattoken.org/sliceLedger/admin/api/auth/logout", {
                "method": "GET",
                "headers": {
                    "content-type": "application/json",
                    "accept": "application/json",
                    Authorization: accessToken
                },
                })
            .then(response => response.json())
            .then(response => {
                const res  = decryptData(response)
                localStorage.removeItem('accessToken');
                localStorage.clear();
                sessionStorage.clear()
                History('/login');
                })
                .catch(err => {
                    console.log(err);
                    localStorage.removeItem('accessToken');
                    localStorage.clear();
                    sessionStorage.clear()
                    History('/login');
                });
            }
        }, 100);
   
    };
  
// reset interval timer
    let resetTimer = useCallback(() => {
        clearTimeout(startTimerInterval.current);
        clearInterval(warningInactiveInterval.current);
    
        if (accessToken) {
        timeStamp = moment();
        sessionStorage.setItem('lastTimeStamp', timeStamp);
        } else {
        clearInterval(warningInactiveInterval.current);
        sessionStorage.removeItem('lastTimeStamp');
        }
        timeChecker();
    }, [accessToken]);
  
  
  useEffect(() => {
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
  
    timeChecker();
  
    return () => {
      clearTimeout(startTimerInterval.current);
    };
  }, [resetTimer, events, timeChecker]);
    return <Fragment />;
  };
  
  export default SessionTimeout;