import React, {useState} from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormGroup,
    CInput,
    CLabel,
    CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useStoreActions} from "easy-peasy";

const AccountDelete = () => {
    const [inputValue, setInputValue] = useState('');
    const {delete_account} = useStoreActions(actions => actions.auth)

    const value = "xxx";

    const handleClick = () => {
        console.log("handleClick")
        if (value === inputValue) delete_account();
    }

    return (
        <CRow>
            <CCol sm="12" lg="12">
                <CCard>
                    <CCardHeader>
                        Delete Account
                    </CCardHeader>
                    <CCardBody>
                        <CForm className={value === inputValue ? "was-validated" : ''}>
                            <CFormGroup>
                                <CLabel htmlFor="inputWarning2i">Please write {value} to confirm deletion</CLabel>
                                <CInput
                                    onChange={event => setInputValue(event.target.value)}
                                    id="inputWarning2i" />
                            </CFormGroup>
                            <CButton onClick={() => handleClick()} type="reset" size="sm" color="danger">
                                <CIcon name="cil-ban" /> Delete
                            </CButton>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default AccountDelete
