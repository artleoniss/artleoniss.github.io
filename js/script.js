
const rulesPage = document.querySelector('.rules-page');
const homePage = document.querySelector('.home-page');
const qsPage = document.querySelector('.qs-page');

const clue = document.querySelector('.btn-50on50');
const btnHome = document.querySelector('.btn-home');

const boxQs = document.querySelector('.box-qs');
const boxOptions = document.querySelector('.box-options');

let currentQs;
let currentOption;

function show(exeption) {
		rulesPage.style.display = 'none';
		homePage.style.display = 'none';
		qsPage.style.display = 'none';
		exeption.style.display = 'block';
}

rulesPage.addEventListener('click', () => show(homePage));

btnHome.addEventListener('click', () => {
	if (!currentQs) return;
	show(homePage);
	currentQs.setAttribute('class', 'showAnimation');
	[...boxOptions.children].forEach(e => e.style.color = 'black');
});

let callback;

clue.addEventListener('click', (e) => {
	if (!callback) return;
	callback((elems) => {
		console.log(elems);
		let random = (Math.random() * (2 - 0 + 1) + 0) | 0;
		let random2 = (Math.random() * (1 - 0 + 1) + 0) | 0;
			elems[random].style.visibility = 'hidden';
			elems[random2].style.visibility = 'hidden';

	});
});

document.addEventListener('click', (e) => {
	const targetElem = e.path[0];
	if (targetElem.tagName == 'TD') {
		let ref = targetElem.innerHTML.split('<br>');
		let category = ref[0].trim().replace(/'/g, '');
		let score = ref[1].trim().replace(/'/g, '');

		show(qsPage);

		let link = library[category][score];

		boxQs.innerText = link.question;

		if (currentQs) {
			currentQs.style.visibility = 'hidden';
		}
		currentQs = targetElem;

		let arrGood = [];

		link.options.forEach((element, index) => {
			let child = boxOptions.children[index];

			if (element.search(/\*/) !== -1) {
				
				child.innerText = element.replace('*', '');
				child.addEventListener('click', elem => {
					child.style.color = '#3dff3d';
				});
				currentOption = child;
				return;
			}
			arrGood.push(child);
			child.innerText = element;
			child.addEventListener('click', elem => {
				child.style.color = '#ff5757';
			});

		});
		callback = (a) => {
			a(arrGood);
		}
	}
});