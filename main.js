import Card from "/class-card.js";
import AmazingCard from "/class-amazing-card.js";

let numberOfPairs = null;
let firstCard = null;
let secondCard = null;
let firstElement = null;
let secondElement = null;

// Создание массива парных чисел
function createNumbersArray(count) {
  const cardsNumberArray = [];
  for (let i = 1; i <= count; i++) {
    cardsNumberArray.push(i, i);
  }
  return cardsNumberArray;
}

// Перемешивание массива.
function shuffle(arr) {
  for (let i = 0; i < arr.length; i++) {
    const j = Math.round(Math.random() * (arr.length - 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}

function createCardsList(arr) {
  const ul = document.createElement('ul');
  document.querySelector('.container').append(ul);
  ul.classList.add('list');
  const select = document.getElementById('select');
  let card = null;

  for (const cardNumber of arr) {
    if (select.value === 'Numbers') {
      card = new Card(ul, cardNumber);
    } else {
      card = new AmazingCard(ul, cardNumber);
    }
    if (arr.length <= 4) {
      card.card.classList.add('card_two-columns');
    } else if (arr.length > 16) {
      card.card.classList.add('card_five-columns', 'card_small');
      ul.classList.add('list_small');
    }
    document.querySelector('form').classList.add('visually-hidden');
  }
}

function startGame() {
  const div = document.createElement('div');
  document.body.append(div);
  div.classList.add('container');

  const h1 = document.createElement('h1');
  h1.textContent = 'Game: Memory';
  div.append(h1);
  h1.classList.add('title');

  const form = document.createElement('form');
  form.classList.add('form');
  div.append(form);

  const label = document.createElement('label');
  label.classList.add('input_descr');
  label.textContent = 'Choose number of pairs';
  form.append(label);

  const input = document.createElement('input');
  input.classList.add('input');
  input.type = 'number';
  input.name = 'count';
  input.min = '2';
  input.max = '20';
  input.step = '2';
  input.value = '8';
  label.append(input);

  const labelContent = document.createElement('label');
  labelContent.classList.add('input_descr');
  labelContent.textContent = 'Choose image';
  form.append(labelContent);

  const inputContent = document.createElement('select');
  const optionNumber = document.createElement('option');
  const optionImage = document.createElement('option');
  inputContent.classList.add('input');
  inputContent.id = 'select';
  optionNumber.value = 'Numbers';
  optionImage.value = 'Animals';
  optionNumber.textContent = 'Numbers';
  optionImage.textContent = 'Animals';

  inputContent.append(optionNumber);
  inputContent.append(optionImage);
  labelContent.append(inputContent);

  const button = document.createElement('button');
  form.append(button);
  button.textContent = 'Start game';
  button.classList.add('button');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    numberOfPairs = input.value;
    const cardsNumberArray = createNumbersArray(numberOfPairs);
    shuffle(cardsNumberArray);
    createCardsList(cardsNumberArray);
  });
}
startGame();

export default function handleCardClick(cardElement) {
  const card = cardElement.card;
  if (card.classList.contains('open_card') || card.classList.contains('success')) {
    return;
  }
  cardElement.open = true;
  if (firstCard === null) {
    firstElement = cardElement;
    firstCard = card;
  } else {
    secondElement = cardElement;
    secondCard = card;
  }

  if (firstCard !== null && secondCard !== null) {
    const firstCardNumber = firstCard.textContent;
    const secondCardNumber = secondCard.textContent;
    if (firstCardNumber !== secondCardNumber) {
      setTimeout(() => {
        firstElement.open = false;
        secondElement.open = false;
        firstCard = null;
        secondCard = null;
      }, 100);
    } else {
      firstElement.success = true;
      secondElement.success = true;
      firstCard = null;
      secondCard = null;
    }
  }
  if (numberOfPairs * 2 === document.querySelectorAll('.success').length) {
    setTimeout(() => {
      endGame();
    }, 1000);
  }
}

function endGame() {
  const divWin = document.createElement('div');
  document.querySelector('.container').append(divWin);
  divWin.classList.add('win-window');

  const p = document.createElement('p');
  divWin.append(p);
  p.textContent = 'You won the game!!!';
  p.classList.add('win-window__text');

  const restartButton = document.createElement('button');
  divWin.append(restartButton);
  restartButton.textContent = 'Play again';
  restartButton.classList.add('button_restart');

  restartButton.addEventListener('click', () => {
    document.body.innerHTML = '';
    startGame();
  });
}
