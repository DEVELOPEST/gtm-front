import {useStoreActions, useStoreState} from 'easy-peasy';
import Repository from './Repository';
import {useEffect} from 'react';

const Repositories = () => {
    const {fetchRepositories} = useStoreActions((actions) => actions.repositories);
    const {repositories} = useStoreState((state) => state.repositories);

    useEffect(() => {
        fetchRepositories();
    }, [fetchRepositories])

    const repos = repositories.map(repo => {
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
