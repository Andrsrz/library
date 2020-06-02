/* Global Library Object */
var library = new Library();

function pageLoaded(){
	let form = document.getElementById("form");
	form.addEventListener("submit", addBook, false);
	/* render library */
	let defaultBook = new Book("The Hobbit", "J.R.R. Tolkien", 285, true);
	library.books.push(defaultBook);
	renderLibrary();
	if(storageAvailable('localStorage')){
		alert("Your browser suppot local storage");	
	}else {
		alert("WARNING! Your browser doesn't support local storage. All your book \
			will be deleted when you close this page.");
	}
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
	alert(library.books[0].info());
}

function renderLibrary(){
	let libraryContainer = document.getElementById("library");
	for(let i = 0; i < library.books.length; i++){
		let book = document.createElement("div");
		book.setAttribute("class", "book");
		let bookInfo = document.createElement("h4");
		bookInfo.innerHTML = library.books[i].info();
		book.appendChild(bookInfo);
		libraryContainer.appendChild(book);
	}
}
