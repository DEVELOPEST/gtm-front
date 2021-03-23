import {CCard, CCardBody, CAlert, CCol, CButton, CCardHeader, CLink} from '@coreui/react';
import React, {useState} from 'react';
import CIcon from '@coreui/icons-react'
import GitHubLogo from "../../assets/icons/GitHubLogo.png";
import GitLabLogo from "../../assets/icons/GitLabLogo.png";
import BitbucketLogo from "../../assets/icons/BitbucketLogo.png";
import {useStoreActions} from "easy-peasy";

const Repository = (props) => {
    const [url, setUrl] = useState('');
    const [trackClicked, setTrackClicked] = useState('');

    const {postRepository} = useStoreActions(actions => actions.repositories);

    const getAccentColor = (stars) => {
        switch (stars) {
            case 2: return 'warning'
            case 3: return 'warning'
            case 4: return 'success'
            case 5: return 'success'
            default: return ''
        }
    }

    const getImage = (provider) => {
        switch (provider) {
            case 'gitlab.com': return GitLabLogo
            case 'github.com': return GitHubLogo
            case 'bitbucket.com': return BitbucketLogo
            default: return ''
        }
    }

    const  handleClickTrack = async (repo) => {
        setTrackClicked(true);
        let pushUrl = await postRepository(repo.clone_url);
        if (pushUrl) {
            setUrl(pushUrl)
        }
    }

    const getWebhookCreationUrlEnding = (provider) => {
        switch (provider) {
            case 'gitlab.com': return '/hooks'
            case 'github.com': return '/settings/hooks/new'
            case 'bitbucket.com': return '/admin/addon/admin/bitbucket-webhooks/bb-webhooks-repo-admin'
            default: return ''
        }
    }

    return (

        <CCol xs="12" sm="6" md="4">
            <CCard accentColor={getAccentColor(props.repo.stars)}>
                <CCardHeader>
                    <CIcon width="20px" src={getImage(props.repo.repo_credentials.provider)} />
                    <CLink className="alert-link color-black" href={props.repo.url}> {props.repo.full_name} </CLink>
                    <span className="float-right"><CIcon name="cil-star" /> {props.repo.stars} </span>
                </CCardHeader>
                <CCardBody>
                    {trackClicked && (
                        url
                            ? (
                                <CAlert color="info">
                                    Please add PUSH WEBHOOK to&nbsp;
                                    <CLink className="alert-link" href={props.repo.url + getWebhookCreationUrlEnding(props.repo.repo_credentials.provider)}>{props.repo.repo_credentials.provider}</CLink>
                                    &nbsp;with {url} url to complete tracking initialization.
                                </CAlert>
                            )
                            : (
                                <CAlert color="danger">
                                    Something went wrong! Please try again later.
                                </CAlert>
                            )
                    )}
                    {props.repo.description}
                    <div className="float-right" >
                        {trackClicked && url
                            ? (
                                <div className="card-header-actions">
                                    <CIcon name="cil-check" className="float-right"/>
                                </div>
                            )
                            : (
                                <CButton color="light" onClick={() => handleClickTrack(props.repo)}>Start tracking</CButton>
                            )
                        }
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default Repository;