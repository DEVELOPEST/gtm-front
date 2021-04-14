import React, {useEffect, useState} from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import IdleTimer from "react-idle-timer";
import {useInterval} from "../utils/hooks/hooks";
import {useStoreActions} from "../store/store";
import {hasAnyRole} from "../Auth";
import {ADMIN, LECTURER, USER} from "../constants";
import setAuthHeader from "../utils/setAuthHeader";

const TheLayout = () => {
    const [userActive, setUserActive] = useState(true);
    const {fetchToken} = useStoreActions(actions => actions.auth);

    useEffect(() => {
        const token: string | null = localStorage.getItem('token');
        if (token) {
            setAuthHeader(token)
        }

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
    <div className="c-app c-default-layout" data-testid="the-layout">
      <IdleTimer onAction={() => onAction()}/>
      <TheSidebar />
      <div className="c-wrapper" data-testid="wrapper">
        <TheHeader/>
        <div className="c-body" data-testid="body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
