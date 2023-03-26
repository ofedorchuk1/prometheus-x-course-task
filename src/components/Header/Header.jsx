import {Link} from "react-router-dom";
import './Header.css'
import CartIcon from "../Icons/CartIcon";
import avatar from '../../assests/image/avatar.png'
export default function Header({clickHandler, isAuth, authData}){

  return (<>
      <header className="header-wrapper">
          
          <p className="header-title__text">
              <Link to={'/books'} className="header-title__text--link">JS BAND STORE </Link>
               / Olha Khomych</p>
          {
              isAuth && <div className="header-icons">
              <Link to={'/cart'}>
                  <CartIcon name='header-icons__cart'/>
              </Link>

                  <button className="header-icons__btn btn btn-light btn-outline-dark btn-style btn-sign-out" onClick={clickHandler}>Sign-Out</button>
                  <img src={avatar} alt="avatar" className="header-icons__avatar"/>
                  <p className="header-icons__username">{authData}</p>
              </div>
          }

      </header>
  </> )
}