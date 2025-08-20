import './style.css'
import './scss/registration.scss'
import './scss/homepage.scss'

const players = [
]
let currentPlayer
const pathImages = './images/'

const KEYS  = {
    ROUT: 'current_rout',
    PLAYER_PROFILE: 'fight_game_player_profile',
    GAME_SETTINGS: 'fight_game_settings',
    ALL_PLAYERS: 'fight_game_all_players',
    CURRENT_FIGHT: 'fight_game_current_fight'
};

const currentRout = {
    currentPage : '',
    currentSubPage : '',
}

const characterImages = [
    {
        name: 'crusader',
        srcAvatar: `${pathImages}crusader/Crus_camp.png`,
        srcBase: `${pathImages}crusader/Crusader.webp`,
        srcAttack: `${pathImages}crusader/Crus_attack.webp`,
        srcDef: `${pathImages}crusader/Crus_def.webp`
    },
    {
        name: 'grave-robber',
        srcAvatar: `${pathImages}grave-robber/Grave_robber_camp.png`,
        srcBase: `${pathImages}grave-robber/Graverobber_combat.webp`,
        srcAttack:`${pathImages}grave-robber/Grave_robber_attack.webp`,
        srcDef: `${pathImages}grave-robber/Grave_robber_defend.webp`
    },
    {
        name: 'hellion',
        srcAvatar: `${pathImages}hellion/Hellion_camp.png`,
        srcBase:  `${pathImages}hellion/Hellion_combat.webp`,
        srcAttack: `${pathImages}hellion/Hellion_attack.webp`,
        srcDef:  `${pathImages}hellion/Hellion_defend.webp`
    },
    {
        name: 'houndmaster',
        srcAvatar: `${pathImages}houndmaster/Houndmaster_camp.png`,
        srcBase: `${pathImages}houndmaster/Houndmaster_base.webp`,
        srcAttack:`${pathImages}houndmaster/Houndmaster_attack.webp`,
        srcDef: `${pathImages}houndmaster/Houndmaster_defend.webp`
    },
    {
        name: 'jester',
        srcAvatar: `${pathImages}jester/Jester_camp.png`,
        srcBase: `${pathImages}jester/Jester_base.webp`,
        srcAttack:`${pathImages}jester/Jester_attack.webp`,
        srcDef: `${pathImages}jester/Jester_defend.webp`
    },
    {
        name: 'flagellant',
        srcAvatar: `${pathImages}flagellant/Flagellant_camp.png`,
        srcBase:  `${pathImages}flagellant/Flag_combat.webp`,
        srcAttack: `${pathImages}flagellant/Flagellant_attack.webp`,
        srcDef:  `${pathImages}flagellant/Flagellant_deffer.webp`
    }
]
const bossImages = [
    {
        name: 'spider',
        srcBase: `${pathImages}spider/Spider.webp`,
        srcAttack:`${pathImages}spider/Webber_attack.webp`,
        srcDef: `${pathImages}spider/Webber_def.webp`
    },
    {
        name: 'gargoyle',
        srcBase:  `${pathImages}gargoyle/Gargoyle_combat.webp`,
        srcAttack: `${pathImages}gargoyle/Gargoyler_attack.webp`,
        srcDef:  `${pathImages}gargoyle/Gargoyle_defend.webp`
    },
    {
        name: 'gaint',
        srcBase: `${pathImages}gaint/Unclean-giant_battle.webp`,
        srcAttack:`${pathImages}gaint/Unclean_giant_attack.webp`,
        srcDef: `${pathImages}gaint/Unclean_giant_defend.webp`
    }
]
function loadHeroImages(characterName) {
    const character = characterImages.find(char => char.name === characterName);
    if (!character) return;

    // Загружаем основное изображение героя
    const heroMainImg = document.querySelector('.hero__image--main img');
    const heroAttackImg = document.querySelector('.hero__image--attack img');
    const heroDefImg = document.querySelector('.hero__image--def img');

    if (character.srcBase) heroMainImg.src = character.srcBase;
    if (character.srcAttack) heroAttackImg.src = character.srcAttack;
    if (character.srcDef) heroDefImg.src = character.srcDef;
}
function loadBossImages(bossName) {
    const boss = bossImages.find(b => b.name === bossName);
    if (!boss) return;

    // Загружаем изображения босса
    const bossMainImg = document.querySelector('.boss__image--main img');
    const bossAttackImg = document.querySelector('.boss__image--attack img');
    const bossDefImg = document.querySelector('.boss__image--def img');

    bossMainImg.src = boss.srcBase;
    bossAttackImg.src = boss.srcAttack;
    bossDefImg.src = boss.srcDef;
}

class SimpleRouter {
    constructor() {
        this.currentPage = 'registration';
        this.currentSubPage = 'main';
        this.init();
    }

    init() {
        const lastRout = sessionStorage.getItem(KEYS.ROUT);
        if(lastRout) {
            const parsedRout = JSON.parse(lastRout);
            this.currentPage = parsedRout.currentPage;
            this.currentSubPage = parsedRout.currentSubPage;

            if(this.currentPage === 'homepage') {
                this.showHomepage();
                this.showSubPage(this.currentSubPage);
            }
        }
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
            if(e.target.classList.contains('homepage__close')) {
                // if(this.currentPage === 'registration') {
                //     return
                // }
                sessionStorage.clear()
                this.showRegistration()
                players.pop()
                avatarImg.remove();
                endFight()

            }
        });

    }

    showRegistration() {
        document.querySelector('.homepage').classList.add('off');
        document.querySelector('.homepage').classList.remove('on');
        this.hideAllSubPages();
        // this.removeActiveLinks();
        setTimeout(() => {
            document.querySelector('.registration').classList.remove('off');
            document.querySelector('.registration').classList.add('on');
        }, 500)
        this.currentPage = 'registration'
    }


    showHomepage() {
        this.hideRegistrPages()
        document.querySelector('.homepage').classList.add('on');
        document.querySelector('.homepage').classList.remove('off');
        this.showSubPage('main');
        this.currentPage = 'homepage';
    }


    showSubPage(subPage) {
        this.hideAllSubPages();
        // this.removeActiveLinks();
        setTimeout(()=> {
            document.querySelector(`.homepage__${subPage}`).classList.remove('none');
        }, 500)
        setTimeout(()=> {
            document.querySelector(`.homepage__${subPage}`).classList.add('on');
            // document.querySelector(`.homepage__${subPage}-link`).classList.add('success');
            this.currentSubPage = subPage;

            currentRout.currentPage = this.currentPage;
            currentRout.currentSubPage = this.currentSubPage;
            sessionStorage.setItem(KEYS.ROUT, JSON.stringify(currentRout));
        }, 100)

    }


    hideRegistrPages() {
        document.querySelector('.registration').classList.add('off');
        document.querySelector('.registration').classList.remove('on');
    }

    hideAllSubPages() {
        document.querySelectorAll('.homepage__main, .homepage__character, .homepage__settings').forEach(subPage => {
            subPage.classList.remove('on');
            subPage.classList.add('off');
            setTimeout(()=> {
                subPage.classList.add('none');
            }, 500)
        });
    }

    // Убрать активное состояние у всех ссылок
    // removeActiveLinks() {
    //     document.querySelectorAll('.homepage__menu a').forEach(link => {
    //         link.classList.remove('active');
    //     });
    // }
}
const router = new SimpleRouter()

const closeMain = document.querySelector('.homepage__close')
const createButton = document.querySelector('.registration__btn')
const inputCharacter = document.querySelector('.registration__input')
const labelRegistration = document.querySelector('.registration__label');
const registration = document.querySelector('.registration')
const wins = document.querySelector('.character__wins');
const loses = document.querySelector('.character__loses');


let inputValid;
class createCharacter  {
    constructor(name) {
        this.character= {
            name: name,
            imageName: '',
            wins: {
                total: 0,
                logs: []
            },
            loses: {
                total: 0,
                logs: []
            },
        }
        this.init()
    }
    init() {
        return this.character;
    }
    getWins() {
        return String(this.character.wins.total);
    }
    getLoses() {
        return String(this.character.loses.total);
    }

    setName(name) {
        this.character.name = name.trim();
        return this;
    }
    setImageName(name) {
        this.character.imageName = name;
    }
}
inputCharacter.addEventListener('input', (e)=> {
    inputValid = false
    validateInput(e.target.value, labelRegistration)
})
inputCharacter.addEventListener('keydown',(e) => {
    if(e.key === 'Enter') {
        if(inputValid) {
            checkName(inputCharacter.value)
            wins.textContent = currentPlayer.getWins()
            loses.textContent = currentPlayer.getLoses()
        }
        if(!inputValid) {
            labelRegistration.classList.add('error')
            setTimeout(()=>{
                labelRegistration.classList.remove('error')
            }, 300)
        }
        inputValid = false
    }
})
createButton.addEventListener('click', ()=> {
    if(inputValid) {
        checkName(inputCharacter.value)
        wins.textContent = currentPlayer.getWins()
        loses.textContent = currentPlayer.getLoses()
        inputCharacter.value = '';
    }
    if(!inputValid) {
        labelRegistration.classList.add('error')
        setTimeout(()=>{
            labelRegistration.classList.remove('error')
        }, 300)
    }
})
function validateInput(value, label) {
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
        labelRegistration.style.setProperty('--hint-text', '"Name not available"')
        labelRegistration.classList.add('error')
        setTimeout(()=>{
            labelRegistration.classList.remove('error')
        }, 300)
        return
    }
    players.push(new createCharacter(inputCharacter.value))
    currentPlayer = players.find(item => item.character.name === name)
    router.hideRegistrPages()
    console.log(currentPlayer.character, players)

    setTimeout(() => {
        router.showHomepage();

        document.querySelector('.homepage__title').textContent = currentPlayer.character.name;
    }, 500);
}



const avatar = document.querySelector('.avatar')
const btnAvatar = document.querySelector('.character__btn')
const characterRadio = document.querySelectorAll('[name="character"]')
const fightButton = document.querySelector('.homepage__btn-fight');
const battleWrapper = document.querySelector('.battle-wrapper');
const roundButtle = document.querySelector('.battle-wrapper__start-fight')
let roundReady = false;
let currentAvatar ;
let avatarImg = null;


characterRadio.forEach(item => {
    item.addEventListener('change', (e)=> {
        currentAvatar  = e.target.value;

    })
})
btnAvatar.addEventListener('click', ()=> {
    const selectAvatar = characterImages.filter((item)=> item.name === currentAvatar)
    if (avatarImg) {
        avatarImg.remove();
    }
        avatarImg = document.createElement('img');
        avatarImg.className = 'avatar-img';
        avatarImg.alt = 'avatar';
        avatarImg.src = selectAvatar[0].srcAvatar
        avatar.appendChild(avatarImg);
        currentPlayer.setImageName(currentAvatar)
        fightButton.classList.remove('inactive')
})

const inputSettings = document.querySelector('.settings__input');
const btnSettings = document.querySelector('.settings__btn')
const labelSettings = document.querySelector('.settings__label')

inputSettings.addEventListener('input', (e) => {
    inputValid = false;
    validateInput(e.target.value, labelSettings)
})

btnSettings.addEventListener('click', () => {
    if(inputValid) {
        currentPlayer.character.name = inputSettings.value;
        document.querySelector('.homepage__title').textContent = currentPlayer.character.name;
        inputSettings.value = ''
    }
    if(!inputValid) {
        labelRegistration.classList.add('error')
        setTimeout(()=>{
            labelRegistration.classList.remove('error')
        }, 300)
    }
    inputValid = false;
})
inputSettings.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && inputValid) {
        currentPlayer.character.name = inputSettings.value;
        document.querySelector('.homepage__title').textContent = currentPlayer.character.name;
        inputSettings.value = '';
        inputValid = false;
    }
})


const block = document.querySelectorAll('.block')
const attack = document.querySelectorAll('.attack')

const ZONES = Array.from(block).map(item => item.value);
const selectedParts = {
    blockParts: [],
    attackParts: []
};

function handleCheckboxes(what, how, selected) {
    what.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            selected.length = 0;
            selected.push(... Array.from(what).filter(cb => cb.checked).map(item => item.value));

            if (selected.length === how) {
                what.forEach(cb => {
                    if (!cb.checked) {
                        cb.disabled = true;
                        cb.parentElement.classList.add('disabled');
                    }
                });
            } else {
                what.forEach(cb => {
                    cb.disabled = false;
                    cb.parentElement.classList.remove('disabled');
                });
            }
            checkActionsCompleted()
        });
    });

}
 handleCheckboxes(block, 2, selectedParts.blockParts)
 handleCheckboxes(attack, 1, selectedParts.attackParts)
function checkActionsCompleted() {
    const attackCompleted = selectedParts.attackParts.length === 1;
    const blockCompleted = selectedParts.blockParts.length === 2;

    if (attackCompleted && blockCompleted) {
        roundReady = true
        roundButtle.classList.remove('inactive')
    } else {
        roundReady = false
        roundButtle.classList.add('inactive')
    }
}

const bossAttackImg = document.querySelector('.boss__image--attack');
const bossDefImg = document.querySelector('.boss__image--def');
const heroAttackImg = document.querySelector('.hero__image--attack');
const heroDefImg = document.querySelector('.hero__image--def');

const bossConfigs = [
    {
        name: 'spider',
        displayName: 'Spider',
        hp: 250,
        damage: 15,
        critChance: 0.25,
        attackZones: 2,
        blockZones: 1
    },
    {
        name: 'gargoyle',
        displayName: 'Gargoyle',
        hp: 350,
        damage: 20,
        critChance: 0.20,
        attackZones: 1,
        blockZones: 2
    },
    {
        name: 'gaint',
        displayName: 'Giant',
        hp: 425,
        damage: 45,
        critChance: 0.05,
        attackZones: 1,
        blockZones: 1
    }
];
function getRandomBoss() {
    const randomIndex = Math.round(Math.random() * bossConfigs.length);
    return bossConfigs[randomIndex];
}
class Hero {
    constructor(name) {
        this.name = name;
        this.maxHp = 300;
        this.hp = 300;
        this.damage = 2110;
        this.critChance = 0.2;
        this.critMultiplier = 2;
    }

    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage); /*На будущее, с возможностью отравления*/
    }
    getHpPercentage() {
        return Math.floor((this.hp / this.maxHp) * 100) ;
    }

    isAlive() {
        return this.hp > 0;
    }
}
class Boss {
    constructor(config) {
        this.name = config.displayName;
        this.hp = config.hp;
        this.maxHp = config.hp;
        this.damage = config.damage;
        this.critChance = config.critChance;
        this.critMultiplier = 1.5;
        this.attackZones = config.attackZones;
        this.blockZones = config.blockZones;
    }

    isAlive() {
        return this.hp > 0;
    }

    takeDamage(damage) {
        this.hp = Math.max(0, this.hp - damage);
    }

    getHpPercentage() {
        return Math.floor((this.hp / this.maxHp) * 100) ;
    }

    generateAttackZones() {
        return this.shuffleZones(this.attackZones);
    }

    generateBlockZones() {
        return this.shuffleZones(this.blockZones);
    }


    shuffleZones(count) {
        const shuffled = [...ZONES];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, count);
    }

}
class BattleLog {
    constructor() {
        this.logs = [];
        this.logContainer = document.querySelector('.logs-battle__list');
    }

    addHit(attacker, target, zone, damage) {
        const message = `⚔️ ${attacker} hits ${target} in the ${zone} for ${damage} damage.`;
        this.addLog(message);
    }

    addBlock(target, attacker, zone, damage) {
        const message = `🛡️ ${target} blocks ${damage} damage to the ${zone} from ${attacker}.`;
        this.addLog(message);
    }

    addCriticalHit(attacker, target, zone, damage, piercingBlock = false) {
        const pierceText = piercingBlock ? " (piercing the block)" : "";
        const message = `💥 ${attacker} lands a critical hit on ${target}'s ${zone}, dealing ${damage} damage${pierceText}.`;
        this.addLog(message);
    }

    addRoundStart(roundNumber) {
        const message = `🔥 Round ${roundNumber} begins!`;
        this.addLog(message);
    }

    addBattleStart(heroName, bossName) {
        const message = `⚔️ Battle started! ${heroName} vs ${bossName}`;
        this.addLog(message);
    }

    addVictory(winner) {
        const message = `🏆 ${winner} wins the battle!`;
        this.addLog(message);
    }

    addDefeat(loser) {
        const message = `💀 ${loser} has been defeated!`;
        this.addLog(message);
    }

    addLog(message) {
        this.logs.push({ message, timestamp: Date.now() });
        this.displayLog(message);
    }

    displayLog(message) {
        const logElement = document.createElement('li');
        logElement.className = 'logs-battle__log';

        const span = document.createElement('span');
        span.className = 'logs-battle__log-basis';
        span.textContent = message;

        logElement.appendChild(span);
        this.logContainer.appendChild(logElement);

        // Автоскролл вниз
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }

    clear() {
        this.logs = [];
        this.logContainer.innerHTML = '';
    }
}
class Battle {
    constructor(hero, attackZone, blockZone, boss) {
        this.hero = hero;
        this.boss = boss;
        this.battleLog = new BattleLog();
        this.round = 1;
        this.isGameOver = false;

        this.playerAttackZone = attackZone;
        this.playerBlockZones = blockZone;

        this.initUI();
    }

    initUI() {
        // Обновляем HP бары
        this.updateHpBars();

        // Очищаем лог
        this.battleLog.clear();

        this.battleLog.addBattleStart(this.hero.name, this.boss.name);
    }

    async processTurn() {
        if (this.isGameOver) return;

        this.battleLog.addRoundStart(this.round);

        // Генерируем действия босса
        const bossAttackZones = this.boss.generateAttackZones();
        const bossBlockZones = this.boss.generateBlockZones();

        // Последовательно выполняем анимации
        if (this.hero.isAlive()) {
            await this.processPlayerAttacks(bossBlockZones);
        }

        if (this.boss.isAlive()) {
            await this.processBossAttacks(bossAttackZones);
        }




        // Обновляем UI



        // Проверяем окончание битвы
        if (!this.hero.isAlive() || !this.boss.isAlive()) {
            this.endBattle();
        } else {
            this.round++;
            this.clearSelections();
        }
    }

// Обработка атак игрока
    async processPlayerAttacks(bossBlockZones) {
        for (const zone of this.playerAttackZone) {
            if (this.boss.isAlive()) {
                this.processAttack(this.hero, this.boss, zone, bossBlockZones);
                this.updateHpBars();
                // Запускаем анимацию атаки героя
                await this.playAnimation([heroAttackImg, bossDefImg], 1600);


            }
        }
    }

// Обработка атак босса
    async processBossAttacks(bossAttackZones) {
        for (const zone of bossAttackZones) {
            if (this.hero.isAlive()) {
                this.processAttack(this.boss, this.hero, zone, this.playerBlockZones);
                this.updateHpBars();
                // Запускаем анимацию атаки босса
                await this.playAnimation([bossAttackImg, heroDefImg], 1600);

                if (!this.hero.isAlive()) {
                    this.endBattle();
                    return; // Выходим из цикла атак
                }
            }
        }
    }

// Универсальная функция для проигрывания анимации
    playAnimation(elements, duration) {
        return new Promise(resolve => {
            // Добавляем класс active
            elements.forEach(el => el.classList.add('active'));

            // Убираем класс через указанное время
            setTimeout(() => {
                elements.forEach(el => el.classList.remove('active'));
                resolve();
            }, duration);
        });
    }


    processAttack(attacker, defender, attackZone, defenderBlocks) {
        const isCrit = Math.random() < attacker.critChance;
        const isBlocked = defenderBlocks.includes(attackZone);

        let damage = attacker.damage;
        let actualDamage = 0;

        if (isCrit) {
            damage = Math.floor(damage * attacker.critMultiplier);

            if (isBlocked) {
                // Критический удар пробивает блок
                actualDamage = damage;
                defender.takeDamage(actualDamage);
                this.battleLog.addCriticalHit(attacker.name, defender.name, attackZone, actualDamage, true);
            } else {
                actualDamage = damage;
                defender.takeDamage(actualDamage);
                this.battleLog.addCriticalHit(attacker.name, defender.name, attackZone, actualDamage);
            }
        } else {
            if (isBlocked) {
                this.battleLog.addBlock(defender.name, attacker.name, attackZone, damage);
            } else {
                actualDamage = damage;
                defender.takeDamage(actualDamage);
                this.battleLog.addHit(attacker.name, defender.name, attackZone, actualDamage);
            }
        }

    }


    updateHpBars() {
        const heroHp = document.querySelector('.hero__hp');
        const bossHp = document.querySelector('.boss__hp');
        const heroHpText = document.querySelector('.hp-text-hero');
        const bossHpText = document.querySelector('.hp-text-boss');

        const heroPercent = this.hero.getHpPercentage();
        const bossPercent = this.boss.getHpPercentage();

        // Устанавливаем CSS переменную для ширины HP бара
        heroHp.style.setProperty('--hp', `${heroPercent}%`);
        bossHp.style.setProperty('--hp', `${bossPercent}%`);

        // Добавляем текст с числами HP
        heroHpText.textContent = `${this.hero.hp}/${this.hero.maxHp}`;
        bossHpText.textContent = `${this.boss.hp}/${this.boss.maxHp}`;
    }


    clearSelections() {
        document.querySelectorAll('.attack, .block').forEach(input => {
            input.checked = false;
            input.disabled = false;
        });

        selectedParts.attackParts.length = 0;
        selectedParts.blockParts.length = 0;

    }

    endBattle() {
        this.isGameOver = true;

        if (!this.hero.isAlive()) {
            this.battleLog.addDefeat(this.hero.name);
            currentPlayer.character.loses.total++;
        } else if (!this.boss.isAlive()) {
            this.battleLog.addVictory(this.hero.name);
            currentPlayer.character.wins.total++;
        }

        // Переделать на записать статистику и логи в данные пользователя
        document.querySelector('.character__wins').textContent = currentPlayer.character.wins.total;
        document.querySelector('.character__loses').textContent = currentPlayer.character.loses.total;

        this.clearSelections()
        endFight()
        currentBattle = null
    }
}


let currentBattle = null;

fightButton.addEventListener('click', (e)=> {
    if(!currentPlayer.character.imageName) {
        fightButton.classList.add('inactive')
        return;
    }

    loadHeroImages(currentPlayer.character.imageName);

    const randomBossConfig = getRandomBoss()
    loadBossImages(randomBossConfig.name);

    const boss = new Boss(randomBossConfig);
    const hero = new Hero(currentPlayer.character.name);
    currentBattle = new Battle(hero, selectedParts.attackParts, selectedParts.blockParts , boss);

    fightButton.classList.add('off');
    battleWrapper.classList.remove('none')
    setTimeout(()=> {
        battleWrapper.classList.add('on')
    }, 100)
    console.log(currentPlayer)
})

roundButtle.addEventListener('click', ()=> {
     if(roundReady && currentBattle){
        roundReady = false;
        currentBattle.playerAttackZone = [...selectedParts.attackParts];
        currentBattle.playerBlockZones = [...selectedParts.blockParts];
        currentBattle.processTurn()
    }
    roundButtle.classList.add('inactive');
})

function endFight() {
    fightButton.classList.remove('inactive')
    fightButton.classList.remove('off');
    battleWrapper.classList.add('off')
    setTimeout(()=> {
        battleWrapper.classList.add('none')
    }, 500)
    battleWrapper.classList.remove('on')

}