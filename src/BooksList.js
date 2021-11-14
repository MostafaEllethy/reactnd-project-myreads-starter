import { PropTypes } from 'prop-types'
import Book from './Book'

function BooksList(props) {
    let { title, books } = props.shelf
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map(book => (
                        <Book key={book.id} book={book} onUpdateBook={props.onUpdateBook} />
                    ))}
                </ol>
            </div>
        </div>
    )
}

BooksList.propTypes = {
    shelf: PropTypes.object.isRequired,
    onUpdateBook: PropTypes.func.isRequired
}

export default BooksList