/* Global Library Object */
var library = new Library();

function pageLoaded(){
	let form = document.getElementById("form");
	form.addEventListener("submit", addBook, false);

	if(storageAvailable('localStorage')){
		getFromStorage();
	}else {
		alert("WARNING! Your browser doesn't support local storage. To use this app \
			change the browser.");
	}

	/* render library */
	renderLibrary();
}

function storageAvailable(type) {
	var storage;
	try {
		storage = window[type];
		var x = '__storage_test__';
		storage.setItem(x, x);
		storage.removeItem(x);
		return true;
	}
	catch(e) {
		return e instanceof DOMException && (
			// everything except Firefox
			e.code === 22 ||
			// Firefox
			e.code === 1014 ||
			// test name field too, because code might not be present
			// everything except Firefox
			e.name === 'QuotaExceededError' ||
			// Firefox
			e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
			// acknowledge QuotaExceededError only if there's something already stored
			(storage && storage.length !== 0);
	}
}

function saveToStorage(){
	localStorage.setItem('libraryArr', JSON.stringify(library.books));
	getFromStorage();
}

function getFromStorage(){
	library.books = cleanArray(library.books);

	let test = localStorage.getItem('libraryArr');
	let arr = JSON.parse(test);

	for(let i = 0; i < arr.length; i++){
		let book = new Book(arr[i].title, arr[i].author, arr[i].pages, arr[i].read);
		library.books.push(book);
	}
}

function cleanArray(arr){
	for(let i = 0; i < arr.length; i++){
		arr.pop();
	}
	return arr;
}

function loadAddBookForm(){
	/* Show the form */
	let form = document.getElementById("new-book-form-container");
	if(form.style.display == "flex"){
		form.style.display = "none";
	}else{
		form.style.display = "flex";
	}
}

function addBook(){
	let title = document.getElementById("input-title").value;
	let author = document.getElementById("input-author").value;
	let pages = document.getElementById("input-pages").value;
	let read = document.getElementById("input-read").value;
	let book = new Book(title, author, pages, read);
	library.books.push(book);
	saveToStorage();
}

function renderLibrary(){
	let libraryContainer = document.getElementById("library");
	if(library.books.length != 0){
		let noBook = document.getElementById("no-book");
		if(noBook)
			noBook.style.display = "none";

		for(let i = 0; i < library.books.length; i++){
			let book = document.createElement("div");
			book.setAttribute("class", "book");
			let bookInfo = document.createElement("h4");
			bookInfo.innerHTML = library.books[i].info();
			book.appendChild(bookInfo);
			libraryContainer.appendChild(book);
		}
	}else{
		let noBook = document.createElement("div");
		noBook.setAttribute("id", "no-book");
		let noBookInfo = document.createElement("h2");
		noBookInfo.setAttribute("class", "error");
		noBookInfo.innerHTML = "You don't have any books, add some!";
		noBook.appendChild(noBookInfo);
		libraryContainer.appendChild(noBook);
	}
}
