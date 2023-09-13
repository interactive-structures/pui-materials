const x = 1;

function a() {
	const y = 2;
	output(y);
}

function b() {
	const z = 3;
	output(z);
}

function output(value) {
	const paragraph = document.createElement('p');
	document.body.appendChild(paragraph);
	paragraph.textContent = `Value: ${value}`;
}
