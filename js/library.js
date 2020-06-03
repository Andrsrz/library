const Library = () => {
	const books = [];

	const addBook = book => {
		this.books.push(book);
	};

	return {books, addBook};
};
