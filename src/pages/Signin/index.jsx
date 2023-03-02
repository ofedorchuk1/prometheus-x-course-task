import './style.css'
import {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import avatar from '../../assests/image/avatar.png'
export default function Signin ({isAuth, clickHandler}){
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [username, setUsername] = useState(localStorage.getItem('username') || '')
    function usernameChange(e){
        setUsername(e.target.value)
        if(username.length < 4 || username.length > 16 ){
            setBtnDisabled(true)
        } else{
            setBtnDisabled(false)
        }
    }

    return (
            isAuth
            ?
            <Navigate to="/books" replace />
            :
            <main className="signin-main-wrapper">
                <img src={avatar} alt="avatar" className="signin-avatar"/>
                    <p className="signin-username">Username</p>
                    <input type="text" placeholder="type Username" className="signin-input form-control" onChange={usernameChange} value={username}/>
                        <button className="signin-btn btn btn-light btn-outline-dark btn-style" disabled={btnDisabled} onClick={clickHandler}>Sign-In</button>
            </main>
    )
}