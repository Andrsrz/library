const Book = (title, author, pages, read) => {
	const getTitle = () => title;
	const getAuthor = () => author;
	const getPages = () => pages;
	const getRead = () => read;

	const info = () => {
		let readStr = "";
		if(getRead() === false)
			readStr = "not read yet";
		else
			readStr = "read";
		return getTitle() + " by " + getAuthor() + ", " + getPages() + " pages, " + readStr + ".";
	};

	return {info, getTitle, getAuthor, getPages, getRead};
};
