import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'

import { Fragment } from 'react'

function Book(props) {
    const book = props.book

    const updateBook = (e) => {
        const shelf = e.target.value
        BooksAPI.update(book, shelf).then(() => props.onUpdateBook(book, shelf))
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks?.thumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        {/* Select current shelf as default value */}
                        <select defaultValue={book.shelf || 'none'} onChange={updateBook}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                        {/* If authors found print first one and if they are more that one print others and add comma. */}
                <div className="book-authors">{book.authors ? (
                    <Fragment>
                        <span>{book.authors[0]}</span>
                        {book.authors.slice(1).map(author => (
                            <span key={`${book.id}-${author}`}>, {author}</span>
                        ))}
                    </Fragment>
                ) : 'N/A'}</div>
            </div>
        </li>
    )
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default Book