import './App.css';
import Header from "./components/Header";
import Signin from "./pages/Signin";
import {Navigate, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import FullBook from "./pages/Specific-book";
import Footer from "./components/Footer";
import Cart from "./pages/Cart";
import {useEffect, useState} from "react";
import ProtectedRoute from "./components/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import {DataContext} from "./context";
import data from "./books.json"
function App() {

    const [isAuth, setIsAuth] = useState(true);
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('authData')) )
    const onUserLogIn = (e) => {
        e.preventDefault();
        const username = document.querySelector('.signin-input').value;
        setIsAuth(true);
        localStorage.setItem('authData', JSON.stringify(username));
        setAuthData(username)
    }
    const onUserLogOut = () => {
        localStorage.removeItem('authData')
        setAuthData('')
        setIsAuth(false);
    }
    useEffect(() => {
        setAuthData(JSON.parse(localStorage.getItem('authData')))
        authData ? setIsAuth(true) : setIsAuth(false)
    }, [authData]);

    const [bookList, setBookList] = useState(JSON.parse(localStorage.getItem('list')) || [])
    const [bookId, setBookId] = useState( JSON.parse(localStorage.getItem('bookId')) || null)
    const [cart, setCart] = useState( JSON.parse(localStorage.getItem('cart')) ||[])
    const [empty, setEmpty] = useState(true)
    const [isDisabled, setIsDisabled] =useState(true)

    useEffect(()=>{
        // fetch('/data.json')
        //     .then(r => r.json())
        //     .then(res => {
        //         setBookList(res.books)})
        setBookList(data.books)
    }, [])
    useEffect(()=>{
        localStorage.setItem('list', JSON.stringify(bookList))
    }, [bookList])

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart))
        if(cart.length > 0) {
            setEmpty(false)
            setIsDisabled(false)
        } else{
            setEmpty(true)
            setIsDisabled(true)
        }
    }, [cart])
    const contextValue = {
        bookList: bookList,
        bookId: bookId,
        setBookId: setBookId,
        cart: cart,
        setCart: setCart
    }

  return (
    <DataContext.Provider value={contextValue}>
     <Routes>
       <Route path='/' element={
           <>
               <Header clickHandler={onUserLogOut} isAuth={isAuth} authData={authData}/>
               <Footer/>
           </>
       }>
            <Route index element={<Navigate to='/books' replace/>}/>
            <Route path='/signin' element={<Signin isAuth={isAuth} clickHandler={onUserLogIn}/>}/>
            <Route path='/books' element={<ProtectedRoute isAuth={isAuth} content={<Main/>}/>}/>
            <Route path='/books/:id' element={<ProtectedRoute isAuth={isAuth} content={<FullBook/>}/>}/>
            <Route path='/cart' element={<ProtectedRoute isAuth={isAuth} content={<Cart empty={empty} isDisabled={isDisabled}/>}/>}/>
            <Route path={'*'} element={<PageNotFound/>}/>
       </Route>
     </Routes>
        </DataContext.Provider>
  );
}

export default App;
