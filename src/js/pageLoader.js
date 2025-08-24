class PageLoader {
  constructor(minLoadTime = 1500) {
    this.loader = document.querySelector('.page-loader');
    this.loaderImg = this.loader.querySelector('img');
    this.minLoadTime = minLoadTime;
    this.isLoaded = false;

    this.loaderImages = [
      './images/loader/Drowned-thrall-explode-optimized.webp',
      './images/loader/Flag_walk.webp',
      './images/loader/Graverobber_walk.webp',
      './images/loader/Hellion_walk.webp',
      './images/loader/Houndmaster_walk.webp',
      './images/loader/Jester_walk.webp',
    ];

    this.setRandomLoaderImage();
    this.initPageLoad();
  }

  setRandomLoaderImage() {
    const randomIndex = Math.floor(Math.random() * this.loaderImages.length);
    const randomImage = this.loaderImages[randomIndex];
    this.loaderImg.src = randomImage;
  }

  initPageLoad() {
    const checkReadyState = () => {
      if (document.readyState === 'complete') {
        setTimeout(() => {
          this.hideLoader();
        }, this.minLoadTime);
      }
    };

    if (document.readyState === 'complete') {
      checkReadyState();
    } else {
      window.addEventListener('load', checkReadyState);
    }
  }

  hideLoader() {
    if (this.isLoaded) return;
    this.isLoaded = true;
    document.querySelector('.homepage').classList.remove('none');
    document.querySelector('.registration').classList.remove('none');
    setTimeout(() => {
      this.loader.classList.add('hidden');
      setTimeout(() => this.loader.remove(), 500);
    }, 100);
  }
}

export default PageLoader;
