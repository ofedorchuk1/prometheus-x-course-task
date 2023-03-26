import './SpecificBook.css'
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context/context";
import {useParams} from "react-router-dom";
import imageNotFound from '../../assests/image/imageNotFound.png'

export default function FullBook (){
    const {bookList, cart, setCart} = useContext(DataContext)
    const [book, setBook] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [countValue, setCountValue] = useState(1)
    const params = useParams()

    useEffect( ()=>{
            let isInCart = false
            let bookId = +params.id
            cart.forEach((el)=>{
                if (el.id === bookId){
                    isInCart = true
                    setCountValue(el.count)
                }
            })

            if(isInCart){
                setBook(cart.filter(el => el.id === bookId)[0])
                setTotalPrice(book.totalPrice)
            } else{
                setBook(bookList.filter(el => el.id === bookId)[0])
                setTotalPrice(book.price)
            }
    }, [book])
    useEffect(()=>{
        setTotalPrice((+(countValue*book.price).toFixed(2)) || book.price)
    }, [countValue])
    function changeHandler (e){
        e.preventDefault()
        let value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1')
        if (value === ''){
            setCountValue(1)
        } else if(value<1){
            setCountValue(1)
        } else if(value>42){
            setCountValue(42)
        } else{
            setCountValue(value)
        }
        setTotalPrice(+(countValue * book.price).toFixed(2))
    }
    function addToCart (id, qt){
        let isInArray = false
        setCart(cart.map(el=>{
            if(el.id === id) {
                el.count = qt
                el.totalPrice = totalPrice
                isInArray = true
            }
            return el
        }))
        if (!isInArray) {
            const data = bookList.find(item => item.id === id)
            data.count = qt
            data.totalPrice = totalPrice
            setCart([...cart, data])
        }
    }
    function increment (){
        countValue === 42 ? setCountValue(42) : setCountValue(+countValue+1)
    }
    function decrement(){
        countValue === 1 ? setCountValue(1) : setCountValue(+countValue-1)
    }

    return (
        <main className="specific-book-wrapper">
            <div className="book-img-wrapper">
                <img src={book.image ? book.image : imageNotFound} alt="bookImage"/>
            </div>
            <div className="book-content">
                <p className="book-content__name"><span>Book name: </span>{book.title}</p>
                <p className="book-content__author"><span>Book author: </span>{book.author}</p>
                <p className="book-content_level"><span>Book level: </span>Beginner</p>
                <p className="book-content__tags"><span>Book tags: </span>core</p>
            </div>
            <div className="book-order__wrapper">
                <div className="book-order">
                    <p className="book-order__item book-order__price"><span>Price, $</span><span id="price" data-testid='price'>{book.price}</span>
                    </p>
                    <div className="book-order__item">
                        <p className="book-order__count">Count</p>
                        <div className='book-order__count--wrapper'>
                            <button className='book-order__count__quantity-control' data-testid='decrement' onClick={decrement}>
                                <div className='minus'></div>
                            </button>
                            <input type="text" className="book-order__count-input" value={countValue} data-testid='value' onInput={changeHandler}
                                   />
                            <button className='book-order__count__quantity-control' data-testid='increment' onClick={increment}>
                                <div className='plus'></div>
                            </button>
                        </div>
                    </div>
                    <p className="book-order__total-price book-order__item">
                        <span>Total price, $ </span>
                        <span id="totalPrice" data-testid='totalPrice' >{totalPrice}</span></p>
                    <div className="book-order__btn">
                        <button className="btn btn-light btn-outline-dark btn-style" onClick={()=>addToCart(book.id, countValue)}>Add to cart</button>
                    </div>

                </div>
            </div>
            <p className="book-description"><span>Description: </span>{book.description}</p>
        </main>
    )
}