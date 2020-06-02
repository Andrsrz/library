/* Global Library Object */
var library = new Library();

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
	for(let i = 0; i < library.books.length; i++){
		console.log("there is a book");
	}
}

function pageLoaded(){
	let form = document.getElementById("form");
	form.addEventListener("submit", addBook, false);
	/* render library */
	renderLibrary();
}
