import { action, thunk } from 'easy-peasy';

const passwordChangeModel = {
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
    error: '',
    success: '',
    loading: false,
    setOldPassword: action((store, payload) => {
        store.oldPassword = payload;
    }),
    setNewPassword: action((store, payload) => {
        store.newPassword = payload;
    }),
    setNewPasswordRepeat: action((store, payload) => {
        store.newPasswordRepeat = payload;
    }),
    setError: action((store, payload) => {
        store.error = payload;
    }),
    setSuccess: action((store, payload) => {
        store.success = payload;
    }),
    setLoading: action((store, payload) => {
        store.loading = payload;
    }),
    changePassword: thunk(async (actions, payload, { injections, getState }) => {
        const { api } = injections;
        const {oldPassword, newPassword, newPasswordRepeat} = getState(state => state.password);
        if (newPassword === newPasswordRepeat && newPassword.length >= 8) {
            let dto = {
                old_password: oldPassword,
                new_password: newPassword
            }
            actions.setLoading(true)
            await api.changePassword(dto)
                .then(() => {
                    actions.setError('')
                    actions.setSuccess(true);
                    actions.setOldPassword('');
                    actions.setNewPassword('');
                    actions.setNewPasswordRepeat('');
                })
                .catch(({ response }) => {
                    actions.setError(response)
                })
            actions.setLoading(false)
        }
    }),
};

export default passwordChangeModel;
