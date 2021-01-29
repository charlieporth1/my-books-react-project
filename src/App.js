import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import BookItem from './components/BookItems/BookItem';
// import jsonData from './jsons/bookData.json'
import * as util from './util'

class BooksApp extends React.Component<> {
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
        showSearchPage: false
    };

    async componentWillMount(): void {
        await this.getBooks();
    }

    async loadBookShelf(books: []) {
        const booksReading = books.filter((book) => book.shelf === 'currentlyReading');
        const booksRead = books.filter((book) => book.shelf === 'read');
        const booksToRead = books.filter((book) => book.shelf === 'wantToRead');
        this.setState({books, booksReading, booksRead, booksToRead});
    }
    async getBooks() {
        const books = Array.from(await BooksAPI.getAll()).filter(util.onlyUnique);
        console.log(books);
        await this.loadBookShelf(books);
    }
    render() {
        const {booksRead, booksReading, booksToRead, books, showSearchPage} = this.state;
        return (
            <div className="app">
                {showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <button className="close-search"
                                    onClick={() => this.setState({showSearchPage: false})}>Close
                            </button>
                            <div className="search-books-input-wrapper">
                                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                <input type="text" placeholder="Search by title or author"/>
                            </div>
                        </div>
                        <div className="search-books-results">
                            <div className="bookshelf-items">
                                <ol className="books-grid">{books.map((book, i) => {
                                    return <BookItem key={`${book}-${book.shelf}-${i}`}
                                                     onUpdate={async ()=> await this.getBooks()}
                                                     title={book.title}
                                                     author={util.arrayToString(book.authors, ' and ')}
                                                     book={book}
                                                     bookUrl={book.imageLinks.smallThumbnail}/>
                                })}</ol>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Currently Reading</h2>
                                    <div className="bookshelf-items">
                                        {booksReading.map((book, i) => {
                                            return <BookItem key={`${book}-${book.shelf}-${i}`}
                                                             onUpdate={async ()=> await this.getBooks()}
                                                             title={book.title}
                                                             author={util.arrayToString(book.authors, ' and ')}
                                                             book={book}
                                                             bookUrl={book.imageLinks.smallThumbnail}/>;
                                        })}
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    <div className="bookshelf-items">
                                        {booksToRead.map((book, i) => {
                                            return <BookItem key={`${book}-${book.shelf}-${i}`}
                                                             title={book.title}
                                                             author={util.arrayToString(book.authors, ' and ')}
                                                             book={book}
                                                             onUpdate={async ()=> await this.getBooks()}
                                                             bookUrl={book.imageLinks.smallThumbnail}/>;
                                        })}
                                    </div>
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    <div className="bookshelf-items">
                                        {booksRead.map((book, i) => {
                                            return <BookItem key={`${book}-${book.shelf}-${i}`}
                                                             title={book.title}
                                                             author={util.arrayToString(book.authors, ' and ')}
                                                             book={book}
                                                             onUpdate={async ()=> await this.getBooks()}
                                                             bookUrl={book.imageLinks.smallThumbnail}/>;
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="open-search">
                            <button onClick={() => this.setState({showSearchPage: true})}>Add a book</button>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
