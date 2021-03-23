import {Action, action, Thunk, thunk} from 'easy-peasy';
import {IApi} from "../api";

export interface PasswordChangeModel {
    oldPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
    success: boolean | null;
    error: Error | null;
    loading: boolean | null;
    setOldPassword: Action<PasswordChangeModel, string>
    setNewPassword: Action<PasswordChangeModel, string>
    setNewPasswordRepeat: Action<PasswordChangeModel, string>
    setError: Action<PasswordChangeModel, Error | null>
    setSuccess: Action<PasswordChangeModel, boolean | null>
    setLoading: Action<PasswordChangeModel, boolean | null>
    changePassword: Thunk<PasswordChangeModel>
    createPassword: Thunk<PasswordChangeModel>
}

const passwordChange: PasswordChangeModel = {
    oldPassword: '',
    newPassword: '',
    newPasswordRepeat: '',
    error: null,
    success: null,
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
    changePassword: thunk(async (actions, _, { injections, getState }) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const {oldPassword, newPassword, newPasswordRepeat} = getState(state => state.password);
        if (newPassword === newPasswordRepeat && newPassword.length >= 8) {
            let dto = {
                old_password: oldPassword,
                new_password: newPassword
            }
            actions.setLoading(true)
            await api.changePassword(dto)
                .then(() => {
                    actions.setError(null)
                    actions.setSuccess(true);
                    actions.setOldPassword('');
                    actions.setNewPassword('');
                    actions.setNewPasswordRepeat('');
                })
                .catch(err => {
                    actions.setError(err)
                })
            actions.setLoading(false)
        }
    }),
    createPassword: thunk(async (actions, _, { injections, getState }) => {
        const api: IApi = injections.api;
        // @ts-ignore
        const {newPassword, newPasswordRepeat} = getState(state => state.password);
        if (newPassword === newPasswordRepeat && newPassword.length >= 8) {
            let dto = {
                new_password: newPassword
            }
            actions.setLoading(true)
            await api.createPassword(dto)
                .then(() => {
                    actions.setError(null)
                    actions.setSuccess(true);
                    actions.setOldPassword('');
                    actions.setNewPassword('');
                    actions.setNewPasswordRepeat('');
                })
                .catch(err => {
                    actions.setError(err)
                })
            actions.setLoading(false)
        }
    }),
};

export default passwordChange;
