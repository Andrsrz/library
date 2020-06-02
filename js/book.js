class Book{
	/* Default properties values */
	title = "";
	author = "";
	pages = 0;
	read = false;

	constructor(title, author, pages, read){
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	info(){
		let readStr = "";
		if(this.read === false)
			readStr = "not read yet";
		else
			readStr = "read";
		return title + " by " + author + ", " + pages + " pages, " + readStr + ".";
	}
}
