class Modal {
  constructor() {
    this.modal = document.querySelector('.modal');
    this.modalWindow = document.querySelector('.modal__window');
    this.modalTitle = document.querySelector('.modal__title');
    this.modalContent = document.querySelector('.modal__content');
    this.modalImage = document.querySelector('.modal__img img');
    this.modalButton = document.querySelector('.modal__button');
    this.modalClose = document.querySelector('.modal__close');
  }

  initEvents() {
    this.modal.addEventListener('click', this);
    document.addEventListener('keydown', this);
    this.modalButton.addEventListener('click', this);
    this.modalClose.addEventListener('click', this);
  }

  handleEvent(event) {
    if (this.isCLoseAction(event)) {
      return this.closeModal();
    }
  }

  isCLoseAction(event) {
    console.log(event.type);
    return (
      event.target === this.modalButton ||
      event.target === this.modal ||
      event.key === 'Escape' ||
      event.target === this.modalClose
    );
  }

  openModal() {
    this.modal.classList.remove('close');
    this.modal.classList.add('block');
    setTimeout(() => {
      this.modal.classList.add('open');
    }, 100);
  }
  closeModal() {
    this.modal.classList.remove('open');
    this.modal.classList.add('close');

    setTimeout(() => {
      this.modal.classList.remove('block');
    }, 500);
  }
}

export class BattleEndModal extends Modal {
  constructor(result, images) {
    super();
    this.result = result;
    this.images = images;
    this.resolvePromise = null;
    this.initEvents();
  }

  initEvents() {
    super.initEvents();
  }

  handleEvent(event) {
    if (
      event.target === this.modal ||
      event.key === 'Escape' ||
      event.target === this.modalClose
    ) {
      this.closeModal();
      if (this.resolvePromise) {
        this.resolvePromise(false);
      }
      return;
    }

    if (event.target === this.modalButton) {
      this.closeModal();
      if (this.resolvePromise) {
        this.resolvePromise(true);
      }
      return;
    }
  }

  loadContent() {
    this.modalTitle.textContent = this.result ? 'Victory!' : 'Defeat!';
    this.modalContent.textContent = this.result
      ? 'Enemies fall before you!'
      : 'Even heroes stumble, but rise again';
    this.modalImage.src = this.result ? this.images.win : this.images.lose;
    this.modalButton.textContent = this.result
      ? "They won't stop me!"
      : 'One more round!';
    this.openModal();

    // Возвращаем Promise
    return new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }
}

export class ShureModal extends Modal {
  constructor(stringClose = null) {
    super();
    this.image = './images/Squiffy-ghast.webp';
    this.initEvents();
    this.stringClose = stringClose;
    this.resolvePromise = null;
  }

  initEvents() {
    super.initEvents();
  }
  handleEvent(event) {
    if (
      event.target === this.modal ||
      event.key === 'Escape' ||
      event.target === this.modalClose
    ) {
      this.closeModal();
      if (this.resolvePromise) {
        this.resolvePromise(false);
      }
      return;
    }

    if (event.target === this.modalButton) {
      this.closeModal();
      if (this.resolvePromise) {
        this.resolvePromise(true);
      }
      return;
    }
  }

  loadContent() {
    this.modalTitle.textContent = 'Are you sure?';
    this.modalContent.textContent = this.stringClose
      ? this.stringClose
      : 'If you leave the fight… it will not haunt the records.';
    this.modalImage.src = this.image;
    this.modalButton.textContent = 'Yes… leave.';
    this.openModal();

    return new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }
}
