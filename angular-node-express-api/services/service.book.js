const BookModel = require("../models/model.book");

let books = {};
let counter = 0;

class BookService
{
	static create(data)
	{

		let book = new BookModel(data.title, data.author, data.year, data.description, data.genres, data.rating);
		book.uid = 'b' + counter++;
		books[book.uid] = book;
		return book;
	}

	static retrieve(uid)
	{
		if(books[uid] != null)
		{
			return books[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a book by (uid:'+ uid +')');
		}
	}

	static update(uid, data)
	{
		if(books[uid] != null)
		{
			const book = books[uid];
			
			Object.assign(book, data);
		}
		else
		{
			throw new Error('Unable to retrieve a book by (uid:'+ uid +')');
		}
	}

	static delete(uid)
	{
		if(books[uid] != null)
		{
			delete books[uid];
		}
		else
		{
			throw new Error('Unable to retrieve a book by (uid:'+ uid +')');
		}
	}
}

module.exports = BookService;