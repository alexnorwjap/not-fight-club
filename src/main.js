import './style.css'
import './scss/registration.scss'
import './scss/homepage.scss'

const players = [
]

const characterImages = [
    {
        name: 'crusader',
        srcAvatar: '/images/Crus_camp.png',
        srcBase: '../images/Crusader.webp',
        srcAttack:'/images/Crus_attack.webp',
        srcDef: '/images/Crus_def.webp'
    },
    {
        name: 'crusader1',
        srcAvatar: '',
        srcBase: '',
        srcAttack:'',
        srcDef: ''
    },
    {
        name: 'crusader2',
        srcAvatar: '',
        srcBase: '',
        srcAttack:'',
        srcDef: ''
    },
    {
        name: 'crusader3',
        srcAvatar: '',
        srcBase: '',
        srcAttack:'',
        srcDef: ''
    },
    {
        name: 'crusader4',
        srcAvatar: '',
        srcBase: '',
        srcAttack:'',
        srcDef: ''
    },
    {
        name: 'crusader5',
        srcAvatar: '',
        srcBase: '',
        srcAttack:'',
        srcDef: ''
    }
]

class SimpleRouter {
    constructor() {
        this.currentPage = 'registration';
        this.currentSubPage = 'main';
        this.init();
    }

    init() {
        // Обработка кликов по ссылкам меню
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('homepage__main-link')) {
                e.preventDefault();
                if(this.currentSubPage === 'main') {
                    return
                }
                this.showSubPage('main');
            }
            if (e.target.classList.contains('homepage__character-link')) {
                e.preventDefault();
                if(this.currentSubPage === 'character') {
                    return
                }
                this.showSubPage('character');
            }
            if (e.target.classList.contains('homepage__settings-link')) {
                e.preventDefault();
                if(this.currentSubPage === 'settings') {
                    return
                }
                this.showSubPage('settings');
            }
        });
    }

    // Переход на homepage после регистрации
    showHomepage() {
        this.hideRegistrPages()
        document.querySelector('.homepage').classList.add('success');
        this.showSubPage('main');
        this.currentPage = 'homepage';
    }

    // Показать подстраницу
    showSubPage(subPage) {
        this.hideAllSubPages();
        this.removeActiveLinks();
        document.querySelector(`.homepage__${subPage}`).classList.remove('none');
        setTimeout(()=> {
            document.querySelector(`.homepage__${subPage}`).classList.add('success');
            document.querySelector(`.homepage__${subPage}-link`).classList.add('success');
            this.currentSubPage = subPage;
        }, 100)
    }

    // Скрыть все страницы
    hideRegistrPages() {
        document.querySelector('.registration').classList.add('success');
    }

    // Скрыть все подстраницы
    hideAllSubPages() {
        document.querySelectorAll('.homepage__main, .homepage__character, .homepage__settings').forEach(subPage => {
            subPage.classList.remove('success');
            subPage.classList.add('none');
        });
    }

    // Убрать активное состояние у всех ссылок
    removeActiveLinks() {
        document.querySelectorAll('.homepage__menu a').forEach(link => {
            link.classList.remove('active');
        });
    }
}
const router = new SimpleRouter()

let currentPlayer
const createButton = document.querySelector('.registration__btn')
const inputCharacter = document.querySelector('.registration__input')
const label = document.querySelector('.registration__label');
const registration = document.querySelector('.registration')


let inputValid = false
class createCharacter  {
    constructor(name) {
        this.character= {
            name: name,
            win: 0,
            lose: 0,
            games: []
        }
        this.init()
    }
    init() {
        return this.character;
    }
}
inputCharacter.addEventListener('input', (e)=> {
    validateInput(e.target.value)
})
createButton.addEventListener('click', ()=> {
    if(inputValid) {
        checkName(inputCharacter.value)
    }
    if(!inputValid) {
        label.classList.add('error')
        setTimeout(()=>{
            label.classList.remove('error')
        }, 300)
    }

})
function validateInput(value) {
    const englishLettersRegex = /^[a-zA-Z]+$/
    const trimmedValue = value.trim()

    if(trimmedValue.length === 0) {
        label.style.setProperty('--hint-text', '"English only"');
        inputValid = false;
        return;
    }
    if (!englishLettersRegex.test(trimmedValue)) {
        label.style.setProperty('--hint-text', '"English only"')
        inputValid = false
        return
    }
    if (trimmedValue.length < 3) {
        label.style.setProperty('--hint-text', '"Min 3 chars"')
        inputValid = false
        return;
    }

    label.style.setProperty('--hint-text', '""')
    inputValid = true

}
function checkName(name) {
    const filter = players.filter(item => item.character.name === name)
    if(filter.length !== 0) {
        label.style.setProperty('--hint-text', '"Name not available"')
        label.classList.add('error')
        setTimeout(()=>{
            label.classList.remove('error')
        }, 300)
        return
    }
    players.push(new createCharacter(inputCharacter.value))
    currentPlayer = players.find(item => item.character.name === name)
    registration.classList.add('success')
    console.log(currentPlayer.character.name)

    setTimeout(() => {
        router.showHomepage();

        document.querySelector('.homepage__title').textContent = currentPlayer.character.name;
    }, 1000);
}

const avatar = document.querySelector('.avatar')
const btnAvatar = document.querySelector('.character__btn')
const characterRadio = document.querySelectorAll('[name="character"]')
let currentAvatar ;
let avatarImg = null;


characterRadio.forEach(item => {
    item.addEventListener('change', (e)=> {
        currentAvatar  = e.target.value;

    })
})
btnAvatar.addEventListener('click', ()=> {
    const selectAvatar = characterImages.filter((item)=> item.name === currentAvatar)
    if (!avatarImg) {
        avatarImg = document.createElement('img');
        avatarImg.className = 'avatar-img';
        avatarImg.alt = 'avatar';
        avatarImg.src = selectAvatar[0].srcAvatar
        avatar.appendChild(avatarImg);
    }

})