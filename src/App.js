import React from 'react';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import BookItem from './components/BookItems/BookItem';
import jsonData from './jsons/bookData.json'

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

    componentWillMount(): void {
        const books = Array.from(jsonData.books);
        const booksReading = books.filter((book) => book.status === 'reading');
        const booksRead = books.filter((book) => book.status === 'read');
        const booksToRead = books.filter((book) => book.status === 'want_to_read');
        this.setState({books, booksReading, booksRead, booksToRead});
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
                            <ol className="books-grid">{books.map((book)=> {
                                return <BookItem title={book.title} author={book.author}
                                                 bookUrl={book.bookUrl}/>
                            })}</ol>
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
                                    {booksReading.map((book) => {
                                        return <BookItem title={book.title} author={book.author}
                                                         bookUrl={book.bookUrl}/>;
                                    })}
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Want to Read</h2>
                                    {booksToRead.map((book) => {
                                        return <BookItem title={book.title} author={book.author}
                                                         bookUrl={book.bookUrl}/>;
                                    })}
                                </div>
                                <div className="bookshelf">
                                    <h2 className="bookshelf-title">Read</h2>
                                    {booksRead.map((book) => {
                                        return <BookItem title={book.title} author={book.author}
                                                         bookUrl={book.bookUrl}/>;
                                    })}
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
