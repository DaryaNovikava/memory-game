import handleCardClick from "/main.js";

export default class Card {
  constructor(container, cardNumber) {
    this.container = container;
    this.cardNumber = cardNumber;
    this.open = false;
    this.success = false;
    this.card = null;
    this.createElement();
  }

  createElement() {
    const card = document.createElement('li');
    card.classList.add('card');
    const h2 = document.createElement('h2');
    h2.classList.add('card__title', 'visually-hidden');
    h2.textContent = this.cardNumber;
    card.append(h2);
    this.container.append(card);
    card.addEventListener('click', () => handleCardClick(this));
    this.card = card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    if (this.card) {
      this.card.querySelector('.card__title').textContent = value;
    }
  }

  get cardNumber() {
    return this._cardNumber;
  }

  set open(value) {
    this._open = value;
    if (this.card) {
      if (value === true) {
        this.card.classList.add('open_card');
        this.card.querySelector('.card__title').classList.remove('visually-hidden');
      } else {
        setTimeout(() => {
          this.card.classList.remove('open_card');
          this.card.querySelector('.card__title').classList.add('visually-hidden');
        }, 200);
      }
    }
  }

  get open() {
    return this._open;
  }

  set success(value) {
    this._success = value;
    if (this.card) {
      if (value === true) {
        this.card.classList.add('success');
      } else {
        this.card.classList.remove('success');
      }
    }
  }

  get success() {
    return this._success;
  }
}
