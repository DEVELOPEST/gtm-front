import {CCard, CCardBody, CRow, CCol, CButton} from '@coreui/react';
import React from 'react';

const UntrackedRepository = (props) => {

    const openRepoOnWeb = () => {
        window.location.href = props.repo.url;
    }

    return (
        <CCard>
            <CCardBody>
                <h4>{props.repo.full_name}</h4>
                <CRow className="justify-content-space-between">
                    <CCol xs="8">
                        {props.repo.description}
                    </CCol>
                    <CCol xs="4">
                        <CRow className="justify-content-center">
                            <CButton color="info" onClick={() => openRepoOnWeb()}>View on web</CButton>
                            <CButton color="success">Start tracking</CButton>
                        </CRow>
                    </CCol>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default UntrackedRepository;
