import './App.css';
import {useEffect, useState} from "react";
import {DataContext} from "./context/context";
import data from "./books.json"
import MyRoutes from "./pages/MyRoutes";

function App() {

    const [isAuth, setIsAuth] = useState(true);
    const [authData, setAuthData] = useState(JSON.parse(localStorage.getItem('authData')))
    const [bookList, setBookList] = useState(JSON.parse(localStorage.getItem('list')) || [])
    const [bookId, setBookId] = useState(JSON.parse(localStorage.getItem('bookId')) || null)
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [empty, setEmpty] = useState(true)
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        setBookList(data.books)
    }, [])
    useEffect(() => {
        setAuthData(JSON.parse(localStorage.getItem('authData')))
        authData ? setIsAuth(true) : setIsAuth(false)
    }, [authData]);
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(bookList))
    }, [bookList])
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        if (cart.length > 0) {
            setEmpty(false)
            setIsDisabled(false)
        } else {
            setEmpty(true)
            setIsDisabled(true)
        }
    }, [cart])

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
    const contextValue = {
        bookList: bookList,
        bookId: bookId,
        setBookId: setBookId,
        cart: cart,
        setCart: setCart
    }

    return (
        <DataContext.Provider value={contextValue}>
            <MyRoutes onUserLogOut={onUserLogOut} onUserLogIn={onUserLogIn} isAuth={isAuth} authData={authData}
                      empty={empty} isDisabled={isDisabled}/>
        </DataContext.Provider>
    );
}

export default App;
