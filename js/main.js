/* Global Library Object */
var library = new Library();

function loadAddBookForm(){
	console.log("Works");
	/* Show the form */
	let form = document.getElementById("new-book-form-container");
	if(form.style.display == "flex"){
		form.style.display = "none";
	}else{
		form.style.display = "flex";
	}
}

function pageLoaded(){
	/* render library */
}
