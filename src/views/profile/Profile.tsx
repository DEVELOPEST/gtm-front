import React, {useState} from 'react'
import {

    CCard,
    CCardBody,
    CCardHeader,
    CCol, CListGroup, CListGroupItem,

    CRow, CTabContent, CTabPane
} from "@coreui/react";
import ChangePassword from "./ChangePassword";
import OAuthLinking from "./OauthLinking";
import AccountDelete from "./AccountDelete";
import Repositories from "../repositories/Repositories";

const Profile = () => {
    const [activeTab, setActiveTab] = useState(0)

    return (
        <CRow className="justify-content-center">
            <CCol sm="12" md="12" lg="12" xxl="10">
                <CCard>
                    <CCardHeader>
                        Profile
                    </CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs="4">
                                <CListGroup id="list-tab" role="tablist">
                                    <CListGroupItem onClick={() => setActiveTab(0)} action active={activeTab === 0} >Change Password</CListGroupItem>
                                    <CListGroupItem onClick={() => setActiveTab(1)} action active={activeTab === 1} >Link Accounts</CListGroupItem>
                                    <CListGroupItem onClick={() => setActiveTab(2)} action active={activeTab === 2} >Repositories</CListGroupItem>
                                    <CListGroupItem onClick={() => setActiveTab(3)} action active={activeTab === 3} >Delete Account</CListGroupItem>
                                </CListGroup>
                            </CCol>

                            <CCol xs="8">
                                <CTabContent>
                                    <CTabPane active={activeTab === 0} >
                                        <ChangePassword />
                                    </CTabPane>
                                    <CTabPane active={activeTab === 1}>
                                        <OAuthLinking />
                                    </CTabPane>
                                    <CTabPane active={activeTab === 2}>
                                        <Repositories />
                                    </CTabPane>
                                    <CTabPane active={activeTab === 3}>
                                        <AccountDelete />
                                    </CTabPane>
                                </CTabContent>
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    )
}

export default Profile
