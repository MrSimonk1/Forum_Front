import React, {useRef, useState} from 'react';
import {useNavigate} from "react-router-dom";
import http from "../../plugins/http";

const RegisterComp = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

    const refs = {
        username: useRef(),
        passOne: useRef(),
        passTwo: useRef(),
        image: useRef()
    }

    function register() {
        const userInfo = {
            username: refs.username.current.value,
            passOne: refs.passOne.current.value,
            passTwo: refs.passTwo.current.value,
            image: refs.image.current.value,
        }
        http.post(userInfo, "register")
            .then((res) => {
                setMessage({success: res.success, message: res.message});
                if (res.success) {
                    setTimeout(() => {
                        setMessage(null);
                        navigate("/login")
                    }, 1500)
                }
            })
    }

    return (
        <div className="login-main">
            <div className="login">
                <div className="login-inputs">
                    <input ref={refs.username} type="text" placeholder="Username"/>
                    <input ref={refs.passOne} type="password" placeholder="Password one"/>
                    <input ref={refs.passTwo} type="password" placeholder="Password two"/>
                    <input ref={refs.image} type="text" placeholder="Image url"/>
                    {message && <div className={message.success ? "message-success-true" : "message-success-false"} >{message.message}</div>}
                    <button onClick={register}>Register</button>
                    <div className="not-registered">
                        Have an account?
                        <br/>
                        Login <span className="not-registered-span"
                                       onClick={() => navigate("/login")}>
                                    here.
                                </span>
                    </div>
                </div>
                <img src="https://volleybox.net/media/img/ilustrations/volleyball-forum.png?1.4" alt=""/>
            </div>
        </div>
    );
};

export default RegisterComp;