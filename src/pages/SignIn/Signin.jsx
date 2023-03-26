import './Signin.css'
import {useState} from "react";
import {Navigate} from "react-router-dom";
import avatar from '../../assests/image/avatar.png'

export default function SignIn({isAuth, clickHandler}) {
    const [btnDisabled, setBtnDisabled] = useState(true)
    const [username, setUsername] = useState(localStorage.getItem('username') || '')

    function usernameInput(e) {
        if ((e.target.value.length < 4 || e.target.value.length > 16) || e.target.value.includes(" ")) {
            setBtnDisabled(true)
        }else {
            setBtnDisabled(false)
        }
        setUsername(e.target.value)
    }

    return (
        isAuth
            ?
            <Navigate to="/books" replace/>
            :
            <main className="signin-main-wrapper">
                <img src={avatar} alt="avatar" className="signin-avatar"/>
                <p className="signin-username">Username</p>
                <input type="text" placeholder="type Username" className="signin-input form-control"
                       onInput={usernameInput} value={username}/>
                <button className="signin-btn btn btn-light btn-outline-dark btn-style" disabled={btnDisabled}
                        onClick={clickHandler}>Sign-In
                </button>
            </main>
    )
}