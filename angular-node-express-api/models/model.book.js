class BookModel
{
	constructor(title, author, year, description, genres, rating)
	{
		this.title = title;
		this.author = author;
		this.year = year;
		this.description = description;
		this.genres = genres;
		this.rating = rating;
		this.uid = null;
	}
}

module.exports = BookModel;