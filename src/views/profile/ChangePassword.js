import React, {useState} from 'react'
import {
    CAlert,
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormGroup, CInput,
    CInputGroup, CInputGroupAppend,
    CInputGroupText, CLabel,
    CRow
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useStoreActions, useStoreState} from "easy-peasy";

const ChangePassword = () => {
    const [warning, setWarning] = useState('');

    const {oldPassword, newPassword, newPasswordRepeat, error, success} = useStoreState(state => state.passwordChange)
    const {setOldPassword, setNewPassword, setNewPasswordRepeat, changePassword, setSuccess, setError} = useStoreActions(actions => actions.passwordChange)

    const getOldPasswordValid = () => {
        return oldPassword.length >= 8
    };

    const getNewPasswordValid = () => {
        return newPassword.length >= 8
    };

    const getNewPasswordRepeatValid = value => {
        if (newPasswordRepeat === '') return '';
        if (value) {
            return (newPasswordRepeat.length >= 8 && newPassword === newPasswordRepeat);
        } else {
            return !(newPasswordRepeat.length >= 8 && newPassword === newPasswordRepeat);
        }
    };

    const onClickChange = () => {
        console.log("click")
        if (getOldPasswordValid() && getNewPasswordValid() && getNewPasswordRepeatValid(true)){
            setWarning('')
            changePassword()
        } else {
            setSuccess('')
            setError('')
            setWarning('Please fill all the fields correctly!')
        }
    }

    return (
        <CRow>
            <CCol sm="1" lg="3">
            </CCol>
            <CCol sm="10" lg="6">
                <CCard>
                    <CCardHeader>
                        Change password
                    </CCardHeader>
                    <CCardBody>
                        {error &&
                        <CAlert color="danger">
                            {error.data.errors.password[0]}
                        </CAlert>
                        }
                        {success &&
                        <CAlert color="success">
                            Password Changed!
                        </CAlert>
                        }
                        {warning &&
                        <CAlert color="warning">
                            {warning}
                        </CAlert>
                        }
                            <CFormGroup>
                                <CLabel >Old Password</CLabel>
                                <CInputGroup>
                                    <CInput
                                        value={oldPassword}
                                        onChange={event => setOldPassword(event.target.value)}
                                        valid={getOldPasswordValid()}
                                        type="password"
                                        placeholder="Insert old password" />
                                    <CInputGroupAppend>
                                        <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel >New Password</CLabel>
                                <CInputGroup>
                                    <CInput
                                        value={newPassword}
                                        onChange={event => setNewPassword(event.target.value)}
                                        valid={getNewPasswordValid()}
                                        type="password"
                                        placeholder="Insert new password" />
                                    <CInputGroupAppend>
                                        <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CFormGroup>
                            <CFormGroup>
                                <CLabel >Repeat New Password</CLabel>
                                <CInputGroup>
                                    <CInput
                                        value={newPasswordRepeat}
                                        onChange={event => setNewPasswordRepeat(event.target.value)}
                                        invalid={getNewPasswordRepeatValid(false)}
                                        valid={getNewPasswordRepeatValid(true)}
                                        type="password"
                                        placeholder="Repeat new password" />
                                    <CInputGroupAppend>
                                        <CInputGroupText><CIcon name="cil-asterisk" /></CInputGroupText>
                                    </CInputGroupAppend>
                                </CInputGroup>
                            </CFormGroup>

                            <CFormGroup className="form-actions">
                                <CButton onClick={() => onClickChange()} size="sm" color="primary">Submit</CButton>
                            </CFormGroup>
                    </CCardBody>
                </CCard>
            </CCol>
            <CCol sm="1" lg="3">
            </CCol>
        </CRow>
    )
}

export default ChangePassword