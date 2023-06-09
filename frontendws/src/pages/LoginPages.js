import React, { useEffect, useState } from 'react';
import Input from '../components/Input';
import { useTranslation } from 'react-i18next';
import ButtonWithProgress from '../components/ButtonWithProgress';
import { useApiProgress } from '../shared/ApiProgress';
import { useDispatch } from 'react-redux';
import { loginHandler } from '../redux/authActions';

const LoginPages = props => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    
    const dispatch = useDispatch();

    useEffect(() => { // password veya username de değişiklik olduğu zaman erroru kaldırır
        setError(undefined);
    }, [ username, password] );

    const onClickLogin = async event => {
        event.preventDefault();
        const creds = {
            username,
            password
        };

        
        const { history } = props;
        const { push } = history;

        setError(undefined);
        try {
            await dispatch(loginHandler(creds));
            push('/');
        } catch (apiError) {
            setError(apiError.response.data.message);
        }

    };

    const { t } = useTranslation();

    const pendingApiCall  = useApiProgress('/api/1.0/auth');

    const buttonEnabled = username && password;

    return (
        <div className="container">
            <form>
                <h1 className='text-center'>{t('Login')}</h1>
                <Input label={t("Username")} onChange={(event) => {
                    setUsername(event.target.value);
                }}></Input>
                <Input label={t("Password")} type="password" onChange={(event) => {
                    setPassword(event.target.value);
                }}></Input>
                {error && <div className="alert alert-danger mt-3">
                    {error}
                </div>}
                <div className='text-center mt-3'>
                    <ButtonWithProgress onClick={onClickLogin} disabled={!buttonEnabled || pendingApiCall} pendingApiCall={pendingApiCall} text={t('Login')} />
                </div>
            </form>
        </div>
    );
}

export default LoginPages;