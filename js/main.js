/* Global Library Object */
var library = Library();

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

	let booksLocalStorage = localStorage.getItem('libraryArr');
	let books = JSON.parse(booksLocalStorage);

	if(books != null){
		for(let i = 0; i < books.length; i++){
			storage = true;
			/* Get attributes from the JSON */
			let book = Book(books[i].title, books[i].author, books[i].pages, books[i].read);
			library.books.push(book);
		}
	}

	return storage;
}

function clearArray(arr){
	let size = arr.length;
	for(let i = 0; i <= size; i++){
		arr.pop();
	}
	return arr;
}

function addClearStorageButton(){
	/* Display button into header */
	let container = document.getElementById("buttons-container");
	let listItem = document.createElement("li");
	let btnClearStorage = document.createElement("button");
	btnClearStorage.setAttribute("id", "btn-clear-storage");
	btnClearStorage.setAttribute("class", "button alert");
	btnClearStorage.setAttribute("onclick", "clearStorage();");
	btnClearStorage.innerHTML = "Delete Library";
	listItem.appendChild(btnClearStorage);
	container.appendChild(listItem);
}

function clearStorage(){
	localStorage.clear();
	renderLibrary();
}

function loadAddBookForm(){
	/* Show the form */
	let form = document.getElementById("form");
	if(form.style.display == "flex"){
		form.style.display = "none";
	}else{
		form.style.display = "flex";
	}
}

function addBook(){
	/* Add the new book to our books library's array */
	let title = document.getElementById("input-title").value;
	let author = document.getElementById("input-author").value;
	let pages = document.getElementById("input-pages").value;
	let read = document.getElementById("input-read").value;
	let book = Book(title, author, pages, read);
	library.books.push(book);
	saveToStorage();
}

function cleanLibrary(){
	/* Clean the div */
	let libraryContainer = document.getElementById("library");
	while(libraryContainer.firstChild) {
		libraryContainer.removeChild(libraryContainer.firstChild);
	}
	return Promise.resolve(true);
}

function renderLibrary(){
	/* Display each book into the page */
	let libraryContainer = document.getElementById("library");
	let noBook = document.getElementById("no-book");

	/* Async Call */
	const isClean = cleanLibrary();
	isClean.then(function(){
		if(library.books.length != 0){
			noBook.style.display = "none";
			for(let i = 0; i < library.books.length; i++){
				let book = document.createElement("div");
				book.setAttribute("class", "book");

				let bookInfo = document.createElement("h4");
				bookInfo.innerHTML = library.books[i].info();

				let btnContainer = document.createElement("div");
				let btnBookRead = document.createElement("button");
				btnBookRead.setAttribute("id", "btnRead" + i);
				btnBookRead.setAttribute("class", "button warning btnRead");
				btnBookRead.innerHTML = "Read It?";
				let btnBookDelete = document.createElement("button");
				btnBookDelete.setAttribute("id", "btnDelete" + i);
				btnBookDelete.setAttribute("class", "button alert btnDelete");
				btnBookDelete.innerHTML = "Delete";
				btnContainer.appendChild(btnBookRead);
				btnContainer.appendChild(btnBookDelete);

				book.appendChild(bookInfo);
				book.appendChild(btnContainer);
				libraryContainer.appendChild(book);
			}

			setReadItEvents();
			setDeleteEvents();
		}else{
			noBook.style.display = "inline";
		}

	});
}

function readIt(index){
	if(library.books[index].read == false){
		library.books[index].read = true;
	}else{
		library.books[index].read = false;
	}
	saveToStorage();
	renderLibrary();
}

function deleteIt(index){
	library.books.splice(index, 1);
	saveToStorage();
	renderLibrary();
}

function setReadItEvents(){
	let buttons = document.getElementsByClassName("btnRead");

	for(let i = 0; i < buttons.length; i++){
		buttons[i].setAttribute("onclick", "readIt(" + i + ");");
	}
}

function setDeleteEvents(){
	let buttons = document.getElementsByClassName("btnDelete");

	for(let i = 0; i < buttons.length; i++){
		buttons[i].setAttribute("onclick", "deleteIt(" + i + ");");
	}
}
