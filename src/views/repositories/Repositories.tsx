import {useStoreActions, useStoreState} from '../../store/store';
import Repository from './Repository';
import {useEffect} from 'react';

const Repositories = () => {
    const {fetchRepositories} = useStoreActions((actions) => actions.repositories);
    const {repositories} = useStoreState((state) => state.repositories);

    useEffect(() => {
        fetchRepositories();
    }, [fetchRepositories])

    const repos = repositories.filter(r => !r.tracked).map(repo => {
            return <Repository repo={repo} key={repo.url}/>
        }
    );


    return (
        <div className="row">
            {repos}
        </div>
    )
}

export default Repositories;
