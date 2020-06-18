class Book{
	constructor(title, author, pages, read){
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	info = () => {
		let readStr = "";
		if(this.read === false)
			readStr = "not read yet";
		else
			readStr = "read";
		return this.title + " by " + this.author + ", " + this.pages + " pages, " + readStr + ".";
	}
};
