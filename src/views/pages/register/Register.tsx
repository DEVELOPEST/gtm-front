import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
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
import {useStoreActions, useStoreState} from "../../../store/store";
import CustomLoader from "../../../reusable/CustomLoader";

import {
  usernameValidation,
  passwordValidation,
  passwordRepeatValidation
} from "../../../utils/inputValidations"

const Register = () => {

  const {loading} = useStoreState(state => state.auth)
  const {register} = useStoreActions(actions => actions.auth)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [usernameErrors, setUsernameErrors] = useState<string[]>([]);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [passwordRepeatErrors, setPasswordRepeatErrors] = useState<string[]>([]);

  useEffect(() => {
    // setErrors([])
  })

  const onClickRegister = () => {
    if (usernameErrors.length === 0 && passwordErrors.length === 0 && passwordRepeatErrors.length === 0) {
      register({username: username, password: password})
    }
  }

  const handleChangeUsername = (value: string) => {
    setUsername(value)
    setUsernameErrors(usernameValidation(value))
  }

  const handleChangePassword = (value: string) => {
    setPassword(value)
    setPasswordErrors(passwordValidation(value))
  }

  const handleChangePasswordRepeat = (value: string) => {
    setPasswordRepeat(value)
    setPasswordRepeatErrors(passwordRepeatValidation(password, value))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickRegister()
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                        className={(usernameErrors.length === 0 ? "" : " red-border")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeUsername(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
                        type="text"
                        placeholder="Username" />

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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePassword(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
                        type="password"
                        placeholder="Password"
                        autoComplete="new-password" />

                  </CInputGroup>
                  {passwordErrors.map((value) => {
                    return <div><small className="form-text text-muted color-red mb-2">{value}</small></div>
                  })}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput
                        className={(passwordRepeatErrors.length === 0 ? "" : " red-border")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangePasswordRepeat(e.target.value)}
                        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(e)}
                        type="password"
                        placeholder="Repeat password"
                        autoComplete="new-password" />

                  </CInputGroup>
                  {passwordRepeatErrors.map((value) => {
                    return <small className="form-text text-muted color-red mb-3">{value}</small>
                  })}
                      {
                        loading
                            ?
                            <div className='row justify-content-center'>
                              <div className='col small-loader-container' >
                                <CustomLoader />
                              </div>
                            </div>
                            : <CButton onClick={onClickRegister} color="primary" block>Create Account</CButton>
                      }
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
