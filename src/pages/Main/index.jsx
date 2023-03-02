import BookList from "../../components/BookList";
import './styles.css'
import {DataContext} from "../../context";
import {useContext, useState} from "react";
export default function Main (){
    const {bookList} = useContext(DataContext)
    const [targetValue, setTargetValue] = useState('')
    const [targetSelect, setTargetSelect] = useState([0, 10000])
    function filter (e){
        setTargetValue(e.target.value)
    }
    function filterSelect(e){
        if (e.target.value === 'less15'){
            setTargetSelect([0, 14.99])
        } else if((e.target.value === '15-30')){
            setTargetSelect([15, 29.99])
        }else if((e.target.value === 'more30')){
            setTargetSelect([30, 10000])
        } else{
            setTargetSelect([0, 10000])
        }
    }

    return (
        <main className="main-wrapper">
            <div className="filter-wrapper">
                <input type="text" placeholder="Search by book name" className="filter-wrapper__input" onInput={filter}/>
                <select className="form-select filter-wrapper__select" defaultValue='' required onChange={filterSelect}>
                    <option value='' hidden>Price</option>
                    <option value='all'>All</option>
                    <option value='less15'>less then 15</option>
                    <option value='15-30'>15-30</option>
                    <option value='more30'>more then 30</option>
                </select>
            </div>
            <BookList listItem={bookList}
                      value={targetValue}
                      targetSelect={targetSelect}
                />
        </main>
    )
}