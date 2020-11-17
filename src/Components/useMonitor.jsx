import React, { useCallback } from 'react'


function useMonitor({ timeout, warningTimeout, onWarn, onTimeOut }) {

  const warn = useCallback(()=> {
    onWarn && onWarn()    
  },[onWarn]) 

  const logout = useCallback(()=> {
    onTimeOut && onTimeOut()
  },[onTimeOut]) 

  React.useEffect(() => {
    let warnTimeout;
    let logoutTimeout;

    const setTimeouts = () => {
      warnTimeout = setTimeout(warn, warningTimeout);
      logoutTimeout = setTimeout(logout, timeout);
    };

    const clearTimeouts = () => {
      if (warnTimeout) clearTimeout(warnTimeout);
      if (logoutTimeout) clearTimeout(logoutTimeout);
    };
    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress'
    ];

    const resetTimeout = () => {
      clearTimeouts();
      setTimeouts();
    };

    for (let i in events) {
      window.addEventListener(events[i], resetTimeout);
    }

    setTimeouts();
    return () => {
      for (let i in events) {
        window.removeEventListener(events[i], resetTimeout);
        clearTimeouts();
      }
    }
  }, [logout, timeout, warn, warningTimeout]);

}

export default useMonitor