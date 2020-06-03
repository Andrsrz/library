/* Global Library Object */
var library = new Library();

function pageLoaded(){
	let form = document.getElementById("form");
	form.addEventListener("submit", addBook, false);

	if(storageAvailable('localStorage')){
		if(getFromStorage()){
			addClearStorageButton();
		}
	}else {
		alert("WARNING! Your browser doesn't support local storage. To use this app \
			change the browser.");
	}

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
	let storage = false;
	library.books = clearArray(library.books);

	let test = localStorage.getItem('libraryArr');
	let arr = JSON.parse(test);

	for(let i = 0; i < arr.length; i++){
		storage = true;
		let book = new Book(arr[i].title, arr[i].author, arr[i].pages, arr[i].read);
		library.books.push(book);
	}

	return storage;
}

function clearArray(arr){
	for(let i = 0; i < arr.length; i++){
		arr.pop();
	}
	return arr;
}

function addClearStorageButton(){
	/* Display button into header */
	let container = document.getElementById("buttons-container");
	let clearStorage = document.createElement("button");
	clearStorage.setAttribute("id", "btn-clear-storage");
	clearStorage.setAttribute("class", "button");
	clearStorage.setAttribute("onclick", "clearStorage();");
	clearStorage.innerHTML = "Clear Storage";
	container.appendChild(clearStorage);
}

function clearStorage(){
	localStorage.clear();
	renderLibrary();
}

function loadAddBookForm(){
	/* Show the form */
	let form = document.getElementById("form");
	if(form.style.display == "inline"){
		form.style.display = "none";
	}else{
		form.style.display = "inline";
	}
}

function addBook(){
	/* Add the new book to our books library's array */
	let title = document.getElementById("input-title").value;
	let author = document.getElementById("input-author").value;
	let pages = document.getElementById("input-pages").value;
	let read = document.getElementById("input-read").value;
	let book = new Book(title, author, pages, read);
	library.books.push(book);
	saveToStorage();
}

function renderLibrary(){
	/* Display each book into the page */
	let libraryContainer = document.getElementById("library");
	let noBook = document.getElementById("no-book");
	if(library.books.length != 0){
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
		noBook.style.display = "inline";
	}
}
