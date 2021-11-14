import React, { useEffect, useState } from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Routes, Link } from 'react-router-dom'
import Search from './Search'
import BooksList from './BooksList'
import './App.css'

function BooksApp() {
    //Initialize required states and variables
    const [books, setBooks] = useState([]), [loading, setLoading] = useState(true);
    let shelves = {
        currentlyReading: { title: 'Currently Reading', books: [] }, wantToRead: { title: 'Want to Read', books: [] }, read: { title: 'Read', books: [] }
    }

    //Get data using getAll methods from BooksAPI
    useEffect(() => {
        BooksAPI.getAll().then(response => setBooks(response, setLoading(false)))
    }, [])

    //Loop over books and filter them by shelf into separated lists
    books.forEach(book => {
        shelves[book.shelf].books.push(book)
    })

    //Remove the updated book from the original list if the shelf is not 'none' add the book with the new stats
    const onUpdateBook = (book, shelf) => {
        let newBooks = books.filter(obj => obj.id !== book.id)
        if (shelf === 'none') {
            setBooks(newBooks)
            return
        }
        BooksAPI.get(book.id).then(updatedBook => setBooks(newBooks.concat(updatedBook)))
    }

    return (
        <div className="app">
            <Routes>
                <Route path='/search' exact element={<Search onUpdateBook={onUpdateBook} books={books} />}></Route>
                <Route path='/' exact element={
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        {/* Show loading text while api fetch books data */}
                        {loading ? <span>Loading...</span> : (
                            <div className="list-books-content">
                                <div>
                                    {/* List every shelf data (title & books) */}
                                    {Object.keys(shelves).map(shelf => (
                                        <BooksList key={shelf} shelf={shelves[shelf]} onUpdateBook={onUpdateBook}></BooksList>
                                    ))}
                                </div>
                            </div>
                        )}
                        {/* Link to add new book */}
                        <div className="open-search">
                            <Link to='/search'><button>Add a book</button></Link>
                        </div>
                    </div>
                }></Route>
            </Routes>
        </div>
    )
}

export default BooksApp
