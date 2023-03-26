export default function CartItem ({cartList, total}){

    return (
        <section  className="cart-list-container">
            <ul className="cart-list">
                <li  className="cart-list--item" >
                    <p>Image</p>
                    <p>Book Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p></li>
                {cartList.map(({title, count, totalPrice, price, id, image}) => {
                      return ( <li className="cart-list--item" key={id}>
                          <img src={image ? image : '/image/imageNotFound.png'}  alt="" className='img-cart'/>
                        <p>{title}</p>
                        <p>{price}</p>
                        <p>{count}</p>
                        <p>{totalPrice}</p>
                        </li>)
                })}

            </ul>
            <div className='cart__total-price'>
                <p>Total price, $ {total}</p>
            </div>
        </section>
    )
}