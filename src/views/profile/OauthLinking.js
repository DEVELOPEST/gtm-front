import React, {useEffect} from 'react'
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import GitHubLogo from "../../assets/icons/GitHubLogo.png";
import GitLabLogo from "../../assets/icons/GitLabLogo.png";
import MicrosoftLogo from '../../assets/icons/MicrosoftLogo.png'
import TalTechLogo from '../../assets/icons/TalTechLogo.png'
import BitbucketLogo from '../../assets/icons/BitbucketLogo.png'
import {
    BITBUCKET_OAUTH_TYPE_STRING,
    BITBUCKET_OAUTH_URL,
    GITHUB_OAUTH_TYPE_STRING,
    GITHUB_OAUTH_URL, GITLAB_OAUTH_TYPE_STRING,
    GITLAB_OAUTH_URL, MICROSOFT_OAUTH_TYPE_STRING,
    MICROSOFT_OAUTH_URL, TALTECH_OAUTH_TYPE_STRING, TALTECH_OAUTH_URL,
} from "../../constants";
import {useStoreActions, useStoreState} from "easy-peasy";
import setSessionToken from '../../utils/setSessionToken';

const OAuthLinking = () => {
    const {logins} = useStoreState(state => state.auth)
    const {get_logins, delete_login} = useStoreActions(actions => actions.auth)

    useEffect(() => {
        get_logins();
    }, [get_logins])

    const redirect = (url, type) => {
        if (logins.includes(type)) {
            delete_login(type);
        } else {
            setSessionToken(localStorage.getItem("token"));
            window.location.href = url;
        }
    }

    return (
        <CRow>
            <CCol sm="12" lg="12">
                <CCard>
                    <CCardHeader>
                        Link OAuth Accounts
                    </CCardHeader>
                    <CCardBody>
                        <CRow className="mt-1 justify-content-around" >
                            <CCol xs="12">
                                <p className="mt-1 mb-1 font-weight-bold">Connect with</p>
                            </CCol>
                            <CCol>
                                <CRow className="mt-1 justify-content-around" >
                                    <CCol xs="10" sm="10" md="5" onClick={() => redirect(GITHUB_OAUTH_URL, GITHUB_OAUTH_TYPE_STRING)} className="btn mt-3 border-dark">
                                        <CIcon width="20px" src={GitHubLogo} />
                                        <span className="ml-2">GitHub </span>
                                        <small>{logins.includes(GITHUB_OAUTH_TYPE_STRING) ? "(connected)" : "(not connected)"}</small>
                                    </CCol>

                                    <CCol xs="10" sm="10" md="5" onClick={() => redirect(GITLAB_OAUTH_URL, GITLAB_OAUTH_TYPE_STRING)} className="btn mt-3 border-dark">
                                        <CIcon width="20px" src={GitLabLogo} />
                                        <span className="ml-2">GitLab </span>
                                        <small>{logins.includes(GITLAB_OAUTH_TYPE_STRING) ? "(connected)" : "(not connected)"}</small>
                                    </CCol>

                                    <CCol xs="10" sm="10" md="5" onClick={() => redirect(MICROSOFT_OAUTH_URL, MICROSOFT_OAUTH_TYPE_STRING)} className="btn mt-3 border-dark">
                                        <CIcon width="20px" src={MicrosoftLogo} />
                                        <span className="ml-2">Microsoft </span>
                                        <small>{logins.includes(MICROSOFT_OAUTH_TYPE_STRING) ? "(connected)" : "(not connected)"}</small>
                                    </CCol>

                                    <CCol xs="10" sm="10" md="5" onClick={() => redirect(TALTECH_OAUTH_URL, TALTECH_OAUTH_TYPE_STRING)} className="btn mt-3 border-dark">
                                        <CIcon width="20px" src={TalTechLogo} />
                                        <span className="ml-2">TalTech </span>
                                        <small>{logins.includes(TALTECH_OAUTH_TYPE_STRING) ? "(connected)" : "(not connected)"}</small>
                                    </CCol>

                                    <CCol xs="10" sm="10" md="5" onClick={() => redirect(BITBUCKET_OAUTH_URL, BITBUCKET_OAUTH_TYPE_STRING)} className="btn mt-3 border-dark">
                                        <CIcon width="20px" src={BitbucketLogo} />
                                        <span className="ml-2">BitBucket </span>
                                        <small>{logins.includes(BITBUCKET_OAUTH_TYPE_STRING) ? "(connected)" : "(not connected)"}</small>
                                    </CCol>

                                    <CCol sm="5">

                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default OAuthLinking
