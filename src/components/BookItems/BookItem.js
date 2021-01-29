import React from "react";
import './BookItem.css'
import * as BooksAPI from '../../BooksAPI'
import PropTypes from 'prop-types'; // ES6
interface Props {
    bookUrl:"";
    title:"";
    author:"";
    book: any;
    onUpdate():void;
}
export default class BookItem extends React.Component<Props> {
    async onStatusChange(shelf) {
        const { book, onUpdate } = this.props;
        console.log("moving book ", book, " to shelf ", shelf);
        const bookshelf = await BooksAPI.update(book, shelf);
        console.log(bookshelf);
        onUpdate(bookshelf);
    }
     render() {
        const { title, author, bookUrl, book } = this.props;
        // "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api"
        return <div className="book">
                          <div className="book-top">
                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ bookUrl }")` }}/>
                            <div className="book-shelf-changer">
                              <select value={book.shelf}  onChange={async (event) => await this.onStatusChange(event.target.value)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{ title }</div>
                          <div className="book-authors">{ author }</div>
                        </div>
    }
}


BookItem.propTypes = {
    bookUrl: PropTypes.string,
    title: PropTypes.string,
    author: PropTypes.string,
    book:PropTypes.object,
    onUpdate: PropTypes.func,
};
