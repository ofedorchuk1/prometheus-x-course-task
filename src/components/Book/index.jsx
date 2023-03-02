import {Link} from "react-router-dom";
import imageNotFound from '../../assests/image/imageNotFound.png'
export default function Book ({id, title, author, price, image, clickHandler}){
    const bookTitle = (name) =>{
        if(name.length > 24){
            return name.slice(0, 23) + '...'
        } else {
            return name
        }
    }
    return (
        <div className={`book-item`}  id={id} >
            <div className="book-img-container">
                <img src={image ? image : imageNotFound} alt="img"/>
            </div>
            <div className="book-item__descr">
                <p className="book-item__name">{bookTitle(title)}</p>
                <p className="book-item__author">{author}</p>
                <div className="book-item_footer">
                    <p className="book-item__price">{price} USD</p>
                    <Link to={`/books/${id}`}>
                        <button className="btn btn-light btn-outline-dark btn-view" onClick={clickHandler}>View</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}