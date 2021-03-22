import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useStoreActions, useStoreState} from "easy-peasy";
import CustomLoader from "../../../reusable/CustomLoader";
import {
  usernameValidation,
  passwordValidation,
} from "../../../utils/inputValidations"
import Redirect from "react-router-dom/es/Redirect";
import GitHubLogo from '../../../assets/icons/GitHubLogo.png'
import GitLabLogo from '../../../assets/icons/GitLabLogo.png'
import MicrosoftLogo from '../../../assets/icons/MicrosoftLogo.png'
import TalTechLogo from '../../../assets/icons/TalTechLogo.png'
import BitbucketLogo from '../../../assets/icons/BitbucketLogo.png'
import {
  BITBUCKET_OAUTH_URL,
  GITHUB_OAUTH_URL,
  GITLAB_OAUTH_URL,
  MICROSOFT_OAUTH_URL,
  TALTECH_OAUTH_URL
} from "../../../constants";
import setSessionToken from "../../../utils/setSessionToken";

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErrors, setUsernameErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const {loading, errors} = useStoreState(state => state.auth)
  const {login, setErrors} = useStoreActions(actions => actions.auth)


  useEffect(() => {
  }, [])

  const queryString = require('query-string');
  const parsed = queryString.parse(props.location.search);
  if (parsed && parsed.token) {
    setSessionToken(parsed.token)

    return <Redirect to="/" />
  }

  const redirect = (url) => {
      document.cookie="jwt=; Max-Age=0; Path=/;";
      window.location.href = url;
  }

  const onClickLogin = () => {
    if (usernameErrors.length === 0 && passwordErrors.length === 0 ) {
      login({'username': username, 'password': password})
    }
  }

  const handleChangeUsername = value => {
    setUsername(value)
    setUsernameErrors(usernameValidation(value))
  }

  const handleChangePassword = value => {
    setPassword(value)
    setPasswordErrors(passwordValidation(value))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onClickLogin()
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                          className={(usernameErrors.length === 0 ? "" : " red-border")}
                          onChange={event => handleChangeUsername(event.target.value)}
                          type="text"
                          onKeyDown={event => handleKeyDown(event)}
                          placeholder="Username"/>
                    </CInputGroup>
                    {usernameErrors.map((value) => {
                      return <small className="form-text text-muted color-red mb-2">{value}</small>
                    })}
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                          className={(passwordErrors.length === 0 ? "" : " red-border")}
                          onChange={event => handleChangePassword(event.target.value)}
                          onKeyDown={event => handleKeyDown(event)}
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password" />
                    </CInputGroup>
                    {passwordErrors.map((value) => {
                      return <div><small className="form-text text-muted color-red mb-3">{value}</small></div>
                    })}
                    <CRow>
                      <CCol xs="6">
                        {
                          loading
                              ?
                                <div className='col small-loader-container' >
                                  <CustomLoader />
                                </div>

                              : <CButton onClick={onClickLogin}  color="primary" className="px-4">Login</CButton>
                        }
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                    <p className="mt-4 mb-1 font-weight-bold">Sign in with</p>
                    <CRow className="mt-1 justify-content-around" >

                      <a onClick={() => redirect(GITHUB_OAUTH_URL)} className="btn mt-3 border-dark col-5">
                        <CIcon width="17px" src={GitHubLogo} />
                        <span className="ml-2">GitHub</span>
                      </a>

                      <a onClick={() => redirect(GITLAB_OAUTH_URL)} className="btn mt-3 border-dark col-5">
                        <CIcon width="17px" src={GitLabLogo} />
                        <span className="ml-2">GitLab</span>
                      </a>

                      <a onClick={() => redirect(MICROSOFT_OAUTH_URL)} className="btn mt-3 border-dark col-5">
                        <CIcon width="17px" src={MicrosoftLogo} />
                        <span className=""> Microsoft</span>
                      </a>

                      <a onClick={() => redirect(TALTECH_OAUTH_URL)} className="btn mt-3 border-dark col-5">
                        <CIcon width="17px" src={TalTechLogo} />
                        <span className=""> TalTech</span>
                      </a>

                      <a onClick={() => redirect(BITBUCKET_OAUTH_URL)} className="btn mt-3 border-dark col-5">
                        <CIcon width="17px" src={BitbucketLogo} />
                        <span className=""> BitBucket</span>
                      </a>

                      <CCol sm="5">

                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Login to GTM Dashboard.</p>
                    <p>Or register if you don't have an account yet!</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
