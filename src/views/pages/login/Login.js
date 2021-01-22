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
  emailValidation,
  passwordValidation,
} from "../../../utils/inputValidations"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const {loading, errors} = useStoreState(state => state.auth)
  const {login, setErrors} = useStoreActions(actions => actions.auth)

  useEffect(() => {
    setErrors([])
  })

  const onClickLogin = () => {
    if (emailErrors.length === 0 && passwordErrors.length === 0 ) {
      login({'email': email, 'password': password})
    }
  }

  const handleChangeEmail = value => {
    setEmail(value)
    setEmailErrors(emailValidation(value))
  }

  const handleChangePassword = value => {
    setPassword(value)
    setPasswordErrors(passwordValidation(value))
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
                          @
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                          className={(emailErrors.length === 0 ? "" : " red-border")}
                          onChange={event => handleChangeEmail(event.target.value)}
                          type="text"
                          placeholder="Email"
                          autoComplete="email" />
                    </CInputGroup>
                    {emailErrors.map((value) => {
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

                              : <CButton onClick={onClickLogin} color="primary" className="px-4">Login</CButton>
                        }
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
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
