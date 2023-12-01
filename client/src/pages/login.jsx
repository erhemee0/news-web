import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import loginImage from '../images/login.jpg';
import {isEmpty, isEmail, isLength} from './../utils/valid';
import { postDataAPI } from './../utils/fetchData';
import { showErrorMsg, showSuccessMsg } from '../components/Notification';

import "../styles/auth.css";

const Login = () => {
    const state = {
        email: '',
        password: '',
        err: '',
        success: ''
    }

    const [userData, setUserData] = useState(state);
    const { email, password, err, success } = userData;
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('firstLogin'))
            history.push('/');
    }, [history]);

    const handleChangeInput = e => {
        const { name, value } = e.target;
        setUserData({...userData, [name]: value, err: '', success: ''});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isEmpty(email) || isEmpty(password))
                return setUserData({...userData, err: "Бүх талбарыг бөглөнө үү.", success: ''});

        if(!isEmail(email))
            return setUserData({...userData, err: "Зөв имэйл оруулна уу.", success: ''});

        if(isLength(password))
            return setUserData({...userData, err: "6-гаас их урттай нууц үг оруулна уу..", success: ''});
        try {
            const res = await postDataAPI('login', userData);
            console.log(res);
            setUserData({...userData, err: '', success: res.data.msg});
            localStorage.setItem("firstLogin", true);
            localStorage.setItem("user", res.data.access_token);
            window.location.href = "/";
        } catch (err) {
            err.response.data.msg && setUserData({...userData, err: err.response.data.msg, success: ''});
        }
    }

    return (
        <div className="container">
            <img id="login__image" src={loginImage} alt="login page" />
            <div className="login__main">
                <h2 id="login__title">News stream</h2>
                <p className="login__sub">Үргэлжлүүлэхийн тулд нэвтэрнэ үү</p>
                <form className="login__form" onSubmit={handleSubmit}>
                    <label className="login__label" htmlFor="email">Имэйл: </label>
                    <input
                        className="login__input"
                        type="email"
                        id="email"
                        name="email"
                        placeholder=" &#xF007;  Имэйл"
                        style={{fontFamily: "Arial, FontAwesome"}}
                        onChange={handleChangeInput}
                        value={email}
                    />
                    <label className="login__label" htmlFor="password">Нууц үг: </label>
                    <input
                        className="login__input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder=" &#xF023;  Нууц үг"
                        style={{fontFamily: "Arial, FontAwesome"}}
                        onChange={handleChangeInput}
                        value={password}
                    />
                    {err && showErrorMsg(err)}
                    {success && showSuccessMsg(success)}
                    <button className="login__btn" type="submit">Нэвтрэх</button>
                </form>
                <p id="register">
                Бүртгэлгүй бол <Link className="login__r__btn" to="/register">Бүртгүүлэх</Link>
                </p>
            </div>
        </div>
    )
};

export default Login;