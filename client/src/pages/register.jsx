import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import registerImage from '../images/register.jpg';
import { isEmpty, isEmail, isLength, isMatch } from './../utils/valid';
import { postDataAPI } from './../utils/fetchData';
import { showErrorMsg, showSuccessMsg } from '../components/Notification';

import "../styles/register.css"; 

const Register = () => {
    const state = {
        username: '',
        email: '',
        password: '',
        cpassword: '',
        err: '',
        success: ''
    };

    const [userData, setUserData] = useState(state);
    const { username, email, password, cpassword, err, success } = userData;
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
        if(isEmpty(username) || isEmpty(password))
                return setUserData({...userData, err: "Бүх талбарыг бөглөнө үү.", success: ''});

        if(!isEmail(email))
            return setUserData({...userData, err: "Зөв имэйл оруулна уу.", success: ''});

        if(isLength(password))
            return setUserData({...userData, err: "6-гаас их урттай нууц үг оруулна уу.", success: ''});
        
        if(!isMatch(password, cpassword))
            return setUserData({...userData, err: "Ижилхэн нууц үгүүд оруулна уу.", success: ''});

        try {
            const res = await postDataAPI('register', userData);
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
            <img className="reg__image" src={registerImage} alt="register page" />
            <main className="reg__main">
                <h2 id="reg__title">Шар мэдээ</h2>
                <p className="reg__sub">Бүртгэлийн хэсэг</p>
                <form className="reg__form" onSubmit={handleSubmit}>
                    <label className="reg__label" htmlFor="username">Хэрэглэгчийн нэр: </label>
                    <input
                        className="reg__input"
                        type="text"
                        id="username"
                        name="username"
                        placeholder=" &#xF007;  Username"
                        style={{fontFamily: "Arial, FontAwesome"}}
                        onChange={handleChangeInput}
                        value={username}
                    />
                    <label className="reg__label" htmlFor="email">Имэйл хаяг: </label>
                    <input
                        className="reg__input"
                        type="text"
                        id="email"
                        name="email"
                        placeholder=" &#xF0E0;  Email Address"
                        style={{fontFamily: "Arial, FontAwesome"}}
                        onChange={handleChangeInput}
                        value={email}
                    />
                    <label className="reg__label" htmlFor="password">Нууц үг: </label>
                    <input
                        className="reg__input"
                        type="password"
                        id="password"
                        name="password"
                        placeholder=" &#xF023;  Password"
                        style={{fontFamily: "Arial, FontAwesome"}}
                        onChange={handleChangeInput}
                        value={password}
                    />
                    <label className="reg__label" htmlFor="cpassword">Нууц үгээ дахин оруулна уу: </label>
                    <input
                        className="reg__input"
                        type="password"
                        id="cpassword"
                        name="cpassword"
                        placeholder=" &#xF023;  Confirm Password"
                        style={{fontFamily: "Arial, FontAwesome"}}
                        onChange={handleChangeInput}
                        value={cpassword}
                    />
                    {/* {console.log(err)} */}
                    {err && showErrorMsg(err)}
                    {success && showSuccessMsg(success)}
                    {/* <div className="login-btn"> */}
                        <button className="reg__btn" type="submit">Бүртгүүлэх</button>
                    {/* </div> */}
                </form>
                <p id="login">
                    Бүртгэлтэй бол <Link className="reg__l__btn" to="/">Нэвтрэх</Link>
                </p>
            </main>
        </div>
    )
};

export default Register;