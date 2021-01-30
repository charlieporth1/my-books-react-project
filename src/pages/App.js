import React from 'react';
import * as BooksAPI from '../BooksAPI';
import './App.css';
import BookItem from '../components/BookItems/BookItem';
import * as util from '../util';

class BooksPage extends React.Component<> {
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
        this.loadBookShelf = this.loadBookShelf.bind(this);
        this.getBooks = this.getBooks.bind(this);
        await this.getBooks();
    }

    async loadBookShelf(books: []): void {
        const booksReading = books.filter((book) => book.shelf === 'currentlyReading');
        const booksRead = books.filter((book) => book.shelf === 'read');
        const booksToRead = books.filter((book) => book.shelf === 'wantToRead');
        this.setState({books, booksReading, booksRead, booksToRead});
    }

    async getBooks(): void {
        const books = Array.from(await BooksAPI.getAll()).filter(util.onlyUnique);
        console.log(books);
        await this.loadBookShelf(books);
    }



    render() {

        const {booksRead, booksReading, booksToRead, showSearchPage} = this.state;
        return (
            showSearchPage ? setTimeout(()=> this.props.history.push("/search"), 250)
                :
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
                                                         onUpdate={async () => await this.getBooks()}
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
                                                         onUpdate={async () => await this.getBooks()}
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
                                                         onUpdate={async () => await this.getBooks()}
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

        )
    }

}

export default BooksPage
