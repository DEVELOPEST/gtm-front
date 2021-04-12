import {CInputGroup, CInputGroupAppend, CInput, CCol, CButton} from '@coreui/react';
import {useStoreActions, useStoreState} from '../../store/store';
import Repository from './Repository';
import React, {useEffect, useState} from 'react';
import {DebounceInput} from 'react-debounce-input';

const Repositories = () => {
    const [searchable, setSearchable] = useState('');

    const {fetchRepositories} = useStoreActions((actions) => actions.repositories);
    const {repositories} = useStoreState((state) => state.repositories);

    useEffect(() => {
        fetchRepositories('');
    }, [fetchRepositories])

    const repos = repositories.filter(r => !r.tracked).map(repo => {
            return <Repository repo={repo} key={repo.url}/>
        }
    );


    const handleChange = (value: string) => {
        setSearchable(value)
        fetchRepositories(value)
    }

    return (
        <>
            <div className="row">
                <CCol className="mt-4 mb-4" md="12">
                    <CInputGroup className="justify-content-center">
                        <DebounceInput
                            debounceTimeout={300}
                            className="w-75"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                        />
                        <CInputGroupAppend>
                            <CButton onClick={() => handleChange(searchable)} type="button" color="primary"> Search</CButton>
                        </CInputGroupAppend>
                    </CInputGroup>
                </CCol>
            </div>
            <div className="row">
                {repos}
            </div>
        </>
            )
}

export default Repositories;
