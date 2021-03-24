import React, {useEffect, useState} from "react";
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
import {useStoreActions} from "../../store/store";
import {getUsernameFromToken} from "../../Auth";

const AccountDelete: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const [username, setUsername] = useState('');

    const {delete_account} = useStoreActions(actions => actions.auth)

    useEffect(() => {
        setUsername(getUsernameFromToken());
    }, [])

    const handleClick = () => {
        if (username === inputValue) delete_account();
    }

    return (
        <CRow>
            <CCol sm="12" lg="12">
                <CCard>
                    <CCardHeader>
                        Delete Account
                    </CCardHeader>
                    <CCardBody>
                        <CForm className={username === inputValue ? "was-validated" : ''}>
                            <CFormGroup>
                                <CLabel htmlFor="inputWarning2i">
                                    Please write
                                    <span className="font-weight-bold"> {username} </span>
                                    to confirm deletion
                                </CLabel>
                                <CInput
                                    value={inputValue}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                    id="inputWarning2i" />
                            </CFormGroup>
                            <CButton onClick={handleClick} type="reset" size="sm" color="danger">
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
