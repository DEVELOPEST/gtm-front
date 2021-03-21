import {useStoreActions, useStoreState} from 'easy-peasy';
import UntrackedRepository from './UntrackedRepository';
import TrackedRepository from './TrackedRepository';
import {useEffect} from 'react';

const Repositories = () => {
    const {fetchRepositories} = useStoreActions((actions) => actions.repositories);
    const {repositories} = useStoreState((state) => state.repositories);

    useEffect(() => {
        fetchRepositories();
    }, [])

    const repos = repositories.map(repo => {
        if (repo.tracked) {
            return <TrackedRepository repo={repo} key={repo.url}/>
        } else {
            return <UntrackedRepository repo={repo} key={repo.url}/>
        }
    });


    return (
        <div>
            {repos}
        </div>
    )
}

export default Repositories;
