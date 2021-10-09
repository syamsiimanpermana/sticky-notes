const noteContainer = document.getElementById('app');
const addNoteButton = noteContainer.querySelector('.add-note');

getNotes().forEach(note => {
	const noteElement = createNoteElement(note.id, note.content);
	noteContainer.insertBefore(noteElement, addNoteButton);
});

function getNotes() {
	// mengambil data dari local storage kemudian mengubahnya menjadi sebuah json
	return JSON.parse(localStorage.getItem('sticky-notes') || '[]');
}

function saveNotes(notes){
	// menyimpan data ke local storage dan juga mengubahnya menjadi sebuah objek
	localStorage.setItem('sticky-notes', JSON.stringify(notes));
}

function createNoteElement(id, content){
	const element = document.createElement('textarea');

	element.classList.add('note');
	element.value = content;
	element.placeholder = "catatan kosong";

	element.addEventListener('change', () => {
		updateNote(id, element.value);
	});

	element.addEventListener('dblclick', () => {
		const doDelete = confirm('apakah anda yakin ingin menghapusnya ?');

		if(doDelete){
			deleteNote(id, element);
		}
	});

	return element;
}

addNoteButton.addEventListener('click', () => addNote());

function addNote() {
	const notes = getNotes();
	const noteObject = {
		id: Math.floor(+new Date),
		content: ''
	};

	const noteElement = createNoteElement(noteObject.id, noteObject.content);
	noteContainer.insertBefore(noteElement, addNoteButton);

	notes.push(noteObject);
	saveNotes(notes);
}

function updateNote(id, newContent){
	const notes = getNotes();
	const targetNote = notes.filter(note => note.id == id)[0];

	targetNote.content = newContent;
	saveNotes(notes);
}

function deleteNote(id, element) {
	const notes = getNotes().filter(note => note.id != id);

	saveNotes(notes);
	noteContainer.removeChild(element);
}

// menambahkan fitur pendeteksi adBlock
const detect = document.querySelector(".adBlockClass"),
wrapper = document.querySelector(".adBlock");

// ini adalah kelas-kelas yang memungkinkan adblocker melarang untuk merender
let classes = ['ad', "ads", "as-placement", "doubleclick",  'ad-placeholder', "ad-badge"];

for(let item of classes){
	detect.classList.add(item);
}

let getProperty = window.getComputedStyle(detect).getPropertyValue("display");
getProperty == 'none' ? wrapper.classList.add('show') : wrapper.classList.remove('show');



