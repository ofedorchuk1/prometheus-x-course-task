import './style.css'
import CartIcon from "../../components/Icons/Cart";
import CartItem from "../../components/CartList";
import {useContext, useEffect, useState} from "react";
import {DataContext} from "../../context";
export default function Cart ({empty, isDisabled}){
    const {cart, setCart} = useContext(DataContext)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        let sum = cart.reduce((a, b) => +a + b.totalPrice, 0)
        setTotal(+sum.toFixed(2))
    }, [total])
    function clickHandler (){
        setTimeout(()=>{setCart([])}, 1000)

    }
    return (
        <main className="cart-wrapper">
            <button className=" btn btn-secondary  btn-outline-dark btn-style" onClick={clickHandler} disabled={isDisabled}>Purchase</button>

            {empty ?
                <>
                    <div className='cart-content'>
                        <CartIcon name='cart-icons'/>
                        <h2>Cart empty...</h2>
                    </div>
                </> : <CartItem cartList={cart}
                                total={total}/>
            }
        </main>
    )
}
