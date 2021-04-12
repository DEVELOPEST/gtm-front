import {CCard, CCardBody, CAlert, CCol, CButton, CCardHeader, CLink} from '@coreui/react';
import React, {useState} from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import CIcon from '@coreui/icons-react'
import GitHubLogo from "../../assets/icons/GitHubLogo.png";
import GitLabLogo from "../../assets/icons/GitLabLogo.png";
import BitbucketLogo from "../../assets/icons/BitbucketLogo.png";
import TalTechLogo from "../../assets/icons/TalTechLogo.png";
import {useStoreActions, useStoreState} from "../../store/store";
import {IRepository} from "../../api/models/IRepository";
import {CustomLoader} from "../../reusable";

const Repository = (props: any) => {
    const [url, setUrl] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [trackClicked, setTrackClicked] = useState(false);

    const {postRepository} = useStoreActions(actions => actions.repositories);

    const getAccentColor = (stars: number) => {
        if (stars < 2) {
            return ""
        } else if (stars < 4) {
            return "warning"
        } else if (stars < 6) {
            return "success"
        } else {
            return "primary"
        }
    }

    const getImage = (provider: string) => {
        switch (provider) {
            case 'gitlab.com': return GitLabLogo
            case 'github.com': return GitHubLogo
            case 'bitbucket.com': return BitbucketLogo
            case 'gitlab.cs.ttu.ee': return TalTechLogo
            default: return ''
        }
    }

    const handleClickTrack = async (repo: IRepository) => {
        setTrackClicked(true);
        setLoading(true);
        let pushUrl = await postRepository(repo.cloneUrl);
        if (pushUrl) {
            setUrl(pushUrl)
        }
        setLoading(false);
    }

    const getWebhookCreationUrlEnding = (provider: string) => {
        switch (provider) {
            case 'gitlab.com': return '/hooks'
            case 'gitlab.cs.ttu.ee': return '/hooks'
            case 'github.com': return '/settings/hooks/new'
            case 'bitbucket.com': return '/admin/addon/admin/bitbucket-webhooks/bb-webhooks-repo-admin'
            default: return ''
        }
    }

    return (
        <CCol xs="12" sm="6" md="4">
            <CCard accentColor={getAccentColor(props.repo.stars)}>
                <CCardHeader>
                    <CIcon width="20px" src={getImage(props.repo.repoCredentials.provider)} />
                    <CLink className="alert-link color-black" href={props.repo.url}> {props.repo.fullName} </CLink>
                    <span className="float-right"><CIcon name="cil-star" /> {props.repo.stars} </span>
                </CCardHeader>
                <CCardBody>
                    {trackClicked && (
                        url!
                            ? (
                                <CAlert color="info">
                                    Please add PUSH WEBHOOK to&nbsp;
                                    <CLink className="alert-link"
                                           href={props.repo.url + getWebhookCreationUrlEnding(props.repo.repoCredentials.provider)}
                                    >{props.repo.repoCredentials.provider}</CLink>
                                    &nbsp;with
                                    <SyntaxHighlighter language="http" wrapLines={true} style={github}>
                                        {url}
                                    </SyntaxHighlighter> url to complete tracking initialization.
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
                            : ( loading
                                    ? (
                                        <div className="col-2 float-right" ><CustomLoader /></div>
                                    )
                                    : <CButton color="light" onClick={() => handleClickTrack(props.repo)}>Start tracking</CButton>
                            )
                        }
                    </div>
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default Repository;
