import Card from "/class-card.js";
import handleCardClick from "/main.js";

export default class AmazingCard extends Card {
  createElement() {
    const card = document.createElement('li');
    card.classList.add('card');
    const h2 = document.createElement('h2');
    h2.classList.add('card__title', 'visually-hidden');
    h2.textContent = this.cardNumber;
    const image = document.createElement('img');
    image.classList.add('card__image');
    image.style.display = 'none';
    image.src = `img/image${this._cardNumber}.png`;
    card.append(h2);
    card.append(image);

    image.onerror = function () {
      image.src = 'img/error.png';
      throw new Error('Failed to load image');
    };
    this.container.append(card);
    card.addEventListener('click', () => handleCardClick(this));
    this.card = card;
  }

  set cardNumber(value) {
    this._cardNumber = value;
    if (this.card) {
      this.card.querySelector('.card__image').src = `img/image${value}.png`;
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
        this.card.querySelector('.card__image').style.display = 'block';
      } else {
        setTimeout(() => {
          this.card.classList.remove('open_card');
          this.card.querySelector('.card__image').style.display = 'none';
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
        this.card.querySelector('.card__image').style.display = 'block';
      } else {
        this.card.classList.remove('success');
      }
    }
  }

  get success() {
    return this._success;
  }
}
