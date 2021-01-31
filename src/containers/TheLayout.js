import React, {useEffect, useState} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import IdleTimer from "react-idle-timer";
import {useInterval} from "../utils/hooks/hooks";
import {useStoreActions} from "easy-peasy";
import {hasAnyRole} from "../Auth";
import {ADMIN, LECTURER, USER} from "../constants";
import setAuthHeader from "../utils/setAuthHeader";

const TheLayout = () => {
    const [userActive, setUserActive] = useState(true);
    const {fetchToken} = useStoreActions(actions => actions.auth);

    useEffect(() => {
        setAuthHeader(localStorage.getItem('token'))
        fetchToken()
    }, [])

    useInterval(() => {
        if (userActive && hasAnyRole([USER, LECTURER, ADMIN])) {
            fetchToken();
            setUserActive(false);
        }
    }, 100000);

    const onAction = () => {
        setUserActive(true);
    }

    return (
    <div className="c-app c-default-layout">
      <IdleTimer onAction={() => onAction()}/>
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
