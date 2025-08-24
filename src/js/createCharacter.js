export class createCharacter {
  constructor(name, lastData = null) {
    this.lastData = lastData;
    this.character = {
      name: name,
      imageName: '',
      wins: {
        total: 0,
        logs: [],
      },
      loses: {
        total: 0,
        logs: [],
      },
    };
    this.init();
  }
  init() {
    if (this.lastData) {
      this.character.name = this.lastData.name || this.character.name;
      this.character.imageName =
        this.lastData.imageName || this.character.imageName;
      this.character.wins = this.lastData.wins || this.character.wins;
      this.character.loses = this.lastData.loses || this.character.loses;
    }
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
  createAvatar(images, avatarImg, avatarContainer) {
    avatarContainer.innerHTML = '';
    const selectAvatar = images.filter(
      (item) => item.name === this.character.imageName,
    );
    if (avatarImg) {
      avatarImg.remove();
    }
    if (selectAvatar.length === 0) {
      console.log('Character not found:', this.character.imageName);
      return;
    }

    avatarImg = document.createElement('img');
    avatarImg.className = 'avatar-img';
    avatarImg.alt = 'avatar';
    avatarImg.src = selectAvatar[0].srcAvatar;
    avatarContainer.appendChild(avatarImg);
  }
}
