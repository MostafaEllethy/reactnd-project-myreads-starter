import PropTypes from 'prop-types'
import { useState } from "react"
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

function Search(props) {
    //Initialize states
    const [query, setQuery] = useState('')
    const [books, setBooks] = useState([])

    //Handle query on input change
    const handleQueryChange = (e) => {
        const value = e.target.value;
        setQuery(value)

        //If input is empty or the api return empty query, reset books array
        if (value === '') {
            setBooks([])
        } else {
            BooksAPI.search(value).then(res => res.error ? setBooks([]) : setBooks(res))
        }
    }

    //New array to map api books and my books in the home to get the shelves
    const mappedBooks = books.map(book => {
        const bookExist = props.books.find(obj => obj.id === book.id)
        return bookExist ? bookExist : book
    })

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link to='/'>
                    <button className="close-search">Close</button>
                </Link>
                <div className="search-books-input-wrapper">
                    <input type="text" placeholder="Search by title or author" value={query} onChange={handleQueryChange} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {mappedBooks.map(book => (
                        <Book key={book.id} book={book} onUpdateBook={props.onUpdateBook} />
                    ))}
                </ol>
            </div>
        </div>
    )
}

Search.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default Search