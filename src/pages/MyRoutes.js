import {Navigate, Outlet, Route, Routes} from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SignIn from "./SignIn/Signin";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Main from "./Main/Main";
import FullBook from "./Specific-book/SpecificBook";
import Cart from "./Cart/Cart";
import PageNotFound from "./PageNotFound/PageNotFound";


export default function MyRoutes ({onUserLogOut,onUserLogIn,  isAuth, authData, empty, isDisabled}){

    return <Routes>
        <Route path='/' element={
            <>
                <Header clickHandler={onUserLogOut} isAuth={isAuth} authData={authData}/>
                <Outlet/>
                <Footer/>
            </>
        }>
            <Route index element={<Navigate to='/books' replace/>}/>
            <Route path='/signin' element={<SignIn isAuth={isAuth} clickHandler={onUserLogIn}/>}/>
            <Route path='/books' element={<ProtectedRoute isAuth={isAuth} content={<Main/>}/>}/>
            <Route path='/books/:id' element={<ProtectedRoute isAuth={isAuth} content={<FullBook/>}/>}/>
            <Route path='/cart' element={<ProtectedRoute isAuth={isAuth} content={<Cart empty={empty}
                                                                                        isDisabled={isDisabled}/>}/>}/>
            <Route path={'*'} element={<PageNotFound/>}/>
        </Route>
    </Routes>
}