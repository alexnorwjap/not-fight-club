class ModalWindow {
    constructor() {
        this.modal = document.querySelector('.modal');
        this.modalWindow = document.querySelector('.modal__window');
        this.modalTitle = document.querySelector('.modal__title');
        this.modalContent = document.querySelector('.modal__content');
        this.modalImage = document.querySelector('.modal__img img');
        this.modalButton = document.querySelector('.modal__button');
    }

    initEvents() {
        this.modal.addEventListener('click', this);
        document.addEventListener('keydown', this);
        this.modalButton.addEventListener('click', this);
    }

    handleEvent(event) {
        if (this.isCLoseAction(event)) {
            return this.closeModal();
        }
    }

    isCLoseAction(event) {
        console.log(event.type);
        return event.target === this.modalButton || event.target === this.modal || event.key === 'Escape';
    }

    openModal() {
        this.modal.classList.remove('close')
        this.modal.classList.add('block');
        setTimeout(() => {
            this.modal.classList.add('open')
        }, 100)
    }
    closeModal() {
        this.modal.classList.remove('open')
        this.modal.classList.add('close')

        setTimeout(() => {
            this.modal.classList.remove('block')
        }, 500)
    }
}

export class BattleEndModal extends ModalWindow {
    constructor(result, images) {
        super();
        this.initEvents();
        this.result = result;
        this.images = images;
        this.closePromise = null;
    }
    initEvents() {
        super.initEvents();
    }

    loadContent() {
        this.modalTitle.textContent = this.result ? 'Victory!' : 'Defeat!';
        this.modalContent.textContent =  this.result ? 'Enemies fall before you!' : 'Even heroes stumble, but rise again';
        this.modalImage.src = this.result ? this.images.win : this.images.lose;
        this.modalButton.textContent = this.result ? "They won't stop me!" : 'One more round!';
        this.openModal();
    }

}


// export class ShureModal extends ModalWindow {
//     constructor(targer) {
//         super();
//         this.initEvents();
//         this.images = './images/Squiffy-ghast.webp';
//         this.target = targer;
//     }
//     initEvents() {
//         super.initEvents();
//     }
//
//     loadContent() {
//         this.modalTitle.textContent = target === 'registation ? 'Are you sure?';
//         this.modalContent.textContent = 'Если выйти из боя, он не пойдет в статистику!';
//         this.modalImage.src = this.images;
//         this.modalButton.textContent = 'Да, выйти';
//         this.openModal();
//     }
// }