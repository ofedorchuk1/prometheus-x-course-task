import Book from "../Book";

export default function BookList ({listItem, clickView, value, targetSelect}){

    return  (
        <section className="book-list-container">
            {listItem.filter(e =>{
                return (e.title.toLowerCase().includes(value.toLowerCase()) && e.price > targetSelect[0] && e.price < targetSelect[1])
            }).map(({id, title, author, price, image}) => {
                return <Book
                    id={id}
                    key={id}
                    title={title}
                    author={author}
                    price={price}
                    image={image}
                />
            })}
        </section>
    )
}