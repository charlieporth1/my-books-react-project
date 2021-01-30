import React from 'react';
import * as BooksAPI from '../BooksAPI';
import './App.css';
import BookItem from '../components/BookItems/BookItem';
import * as util from '../utils/util';
import ErrorElement from "../components/ErrorElement/ErrorElement";

class SearchBooksPage extends React.Component<> {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: [],
        booksRead: [],
        booksToRead: [],
        booksReading: [],
        showError: false,
        errorMessage:'',
    };

    async componentWillMount(): void {
        await this.getBooks();
    }

    async loadBookShelf(books: [] = []): void {
        if (books.length > 0) {
            const booksReading = books.filter((book) => book.shelf === 'currentlyReading');
            const booksRead = books.filter((book) => book.shelf === 'read');
            const booksToRead = books.filter((book) => book.shelf === 'wantToRead');
            this.setState({books, booksReading, booksRead, booksToRead, showError: false});
        }
    }

    async getBooks(): void {
        const books = Array.from(await BooksAPI.getAll()).filter(util.onlyUnique);
        console.log(books);
        await this.loadBookShelf(books);
    }
    showError(errorMessage: string = ''):void {
        this.setState({books:[], errorMessage, showError: true});
    }

    async queryBooks(query: string = '') {
        // const {books} = this.state;
        query = query.toLowerCase().trim();
        const bookQuery: any = await BooksAPI.search(query) || [];
        console.log(bookQuery);
        setTimeout(async () => {
            const errorMessage = bookQuery.error;
            if (errorMessage) {
                console.warn(errorMessage);
                this.showError(errorMessage);
            } else {
                await this.loadBookShelf(bookQuery);
            }
        }, 3);
    }

    render() {

        const {books, showError, errorMessage} = this.state;
        console.debug(errorMessage);
        console.debug(showError);
        return (
            <div className="app">
                <div className="search-books">
                    <div className="search-books-bar">
                        <button className="close-search"
                                onClick={() => this.props.history.push('/')}>Close
                        </button>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author"
                                   onInputCapture={async (event) => await this.queryBooks(event.target.value)}/>
                        </div>

                    </div>
                        <div className="search-books-results">
                            <ErrorElement style={{alignSelf: 'center'}} showError={showError} errorMessage={errorMessage}/>
                            <div className="bookshelf-items">
                                <ol className="books-grid">{books.map((book, i) => {
                                    if (!book.imageLinks){
                                        this.showError("Invalid search/query term");
                                        return undefined;
                                    }
                                    return <BookItem key={`${book}-${book.shelf}-${i}`}
                                                     onUpdate={async () => await this.getBooks()}
                                                     title={book.title}
                                                     author={util.arrayToString(book.authors, ' and ')}
                                                     book={book}
                                                     bookUrl={book.imageLinks.smallThumbnail}/>
                                })}</ol>
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

export default SearchBooksPage
