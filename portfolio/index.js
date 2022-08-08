import i18Obj from './js/translate.js';
/* Hamberger menu */
  const hamburgerIcon = document.getElementById('hamburger');
  const navigationElem = document.getElementById('navigation');
  const navLinks = document.querySelectorAll('.nav-list-item');

  function changeHamburgerOpenMenu() {
      hamburgerIcon.classList.toggle('hamburger-activ');
      navigationElem.classList.toggle('open-menu');
  }
  function closeMenuChangeHamburger() {
      navigationElem.classList.remove('open-menu');
      hamburgerIcon.classList.remove('hamburger-activ');
  }
  hamburgerIcon.addEventListener("click", changeHamburgerOpenMenu);
  navLinks.forEach((el) => el.addEventListener('click', closeMenuChangeHamburger));
  
  /* change photo */

  function changeImage(event) {
      if(event.target.classList.contains('button')) {
        let season = event.target.dataset.season;
        portfolioImg.forEach((img, index) => img.src = `assets/img/${season}/${index + 1}.jpg`);
        changeClassActive(event);
      }
  }
  const portfolioButtons = document.querySelector('.portfolio-buttons');
  let portfolioImg = document.querySelectorAll('.portfolio-items img');
  portfolioButtons.addEventListener('click', changeImage);

  /* preload images */

  function preloadImages() {
    seasons.forEach( seas => {
      for (let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `assets/img/${seas}/${i}.jpg`;
      }
    })
  }
  const seasons = ['winter', 'spring', 'summer', 'autumn'];
  preloadImages();

  /* change color button */
  
  function changeClassActive(evn) {
    const currentActiveButton = document.querySelectorAll('.active-button');
    currentActiveButton[0].classList.remove('active-button');
    currentActiveButton[0].classList.add('passive-button');
    evn.target.classList.remove('passive-button');
    evn.target.classList.add('active-button');
  };

  /* translate */

  let dataLang = document.querySelectorAll('*[data-i18]');
  const switchLng = document.querySelector('.switch-lng');

  function getTranslate(even) {
    if(even.target.classList.contains('link-switch-lng')) {
      const checkLng = document.querySelectorAll('.active-check-lang');
      checkLng[0].classList.remove('active-check-lang');
      even.target.classList.add('active-check-lang');
      dataLang.forEach(dataElm => {
        let dataElmVal = dataElm.dataset.i18;
        dataElm.textContent = i18Obj[even.target.textContent][dataElmVal];
      });
    }  
  }
  function getTranslate2(val) {
    if(val == 'ru') {
      const checkLng2 = document.querySelectorAll('.link-switch-lng');
      checkLng2.forEach(curEl => {
        if(curEl.textContent != val) curEl.classList.remove('active-check-lang');
        if(curEl.textContent == val) {
          curEl.classList.add('active-check-lang');
          dataLang.forEach(dataElm => {
            let dataElmVal = dataElm.dataset.i18;
            dataElm.textContent = i18Obj[val][dataElmVal];
          });
        }
      })
    }
  }
  function setLocalStorage(evn) {
    if(evn.target.classList.contains('link-switch-lng')) {
      localStorage.setItem('lang', evn.target.textContent);
    }
    if(evn.target.classList.contains('switch-theme')) {
      if(switchThemeIcon.classList.contains('light-theme-icon')) {
        localStorage.setItem('theme', 'light');
      } else {localStorage.setItem('theme', 'dark')};
    }
  }
  function getLocalStorage() {
    if(localStorage.getItem('lang')) {
      let lang = localStorage.getItem('lang');
      getTranslate2(lang);
    }
    if(localStorage.getItem('theme')) {
      const theme = localStorage.getItem('theme');
      switchTheme(theme);
    }
  }
  switchLng.addEventListener('click', getTranslate);
  switchLng.addEventListener('click', setLocalStorage);
  window.addEventListener('load', getLocalStorage);

  /* switch theme */

  const arrayClasses = ['.skills-container', 
                        '.section-title-lines', 
                        '.portfolio-container', 
                        '.video-container',
                        '.prace-container', 
                        '.portfolio-buttons .button'];
  const switchThemeIcon = document.querySelector('.switch-theme');
  function switchTheme(val) {
    if(switchThemeIcon.classList.contains('light-theme-icon') || val == 'dark') {
      switchThemeIcon.classList.remove('light-theme-icon');
      for (let elem of arrayClasses) {
        let curentClass = document.querySelectorAll(elem);
        curentClass.forEach(curEl => curEl.classList.remove('light-theme'));
      }
    } else {
      switchThemeIcon.classList.add('light-theme-icon');
      for (let elem of arrayClasses) {
        let curentClass = document.querySelectorAll(elem);
        curentClass.forEach(curEl => curEl.classList.add('light-theme'));
      }
    }
  }
  switchThemeIcon.addEventListener('click', switchTheme);
  switchThemeIcon.addEventListener('click', setLocalStorage);
  window.addEventListener('load', getLocalStorage);

  /* video player */

  const playPause = document.querySelector('.player-controls button:first-child');
  const progress = document.querySelectorAll('.player-controls input');
  const myVid = document.querySelector('video');
  const playProgress = document.querySelector('.play-progress');
  const generalPlayButt = document.querySelector('.general-play-button');
  const volumeButton = document.querySelector('.on-volume-button');
  const volumeSlider = document.querySelector('.volume-control');
  
  playProgress.addEventListener('mousedown', () => clearInterval(progression));
  playProgress.addEventListener('mouseup', () => progression = window.setInterval(updateProgress, 200));
  myVid.addEventListener('timeupdate', () => {
    if(myVid.ended) {
      playPause.classList.remove('pause-active-button');
      playPause.classList.add('play-active-button');
      generalPlayButt.style.display = 'inline-block';
    }})
  volumeSlider.addEventListener('click', volumeRangeUpdate);
  volumeSlider.addEventListener('mousemove', volumeRangeUpdate);
  volumeButton.addEventListener('click', changeVolumeButt);
  generalPlayButt.addEventListener('click', toogleVideo);
  playProgress.addEventListener('click', updateVideoProgress);
  playPause.addEventListener('click', toogleVideo);
  progress.forEach(function(item) {
    item.addEventListener('input', function() {
      const value = this.value;
      this.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${value}%, #fff ${value}%, white 100%)`;
  })});
  let progression;
  function toogleVideo() {
    if(myVid.paused) {
      myVid.play();
      generalPlayButt.style.display = 'none';
      progression = window.setInterval(updateProgress, 900);
      checkButtonPlayPause();
    } else {
      myVid.pause();
      generalPlayButt.style.display = 'inline-block';
      clearInterval(progression);
      checkButtonPlayPause();
    }
  }
  function checkButtonPlayPause() {
    if(playPause.classList.contains('play-active-button')) {
      playPause.classList.add('pause-active-button');
      playPause.classList.remove('play-active-button');
      return;
    }
    if(playPause.classList.contains('pause-active-button')) {
      playPause.classList.add('play-active-button');
      playPause.classList.remove('pause-active-button');
    }
  }
  function updateProgress() {
    let progress = myVid.currentTime / myVid.duration;
    let playTime = Math.floor(progress *1000) / 10;
    playProgress.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${playTime}%, #fff ${playTime}%, white 100%)`;
    playProgress.setAttribute('value', playTime);
  }
  function updateVideoProgress() {
    let newCurrTime = (Math.floor(myVid.duration) / 100) * this.value;
    myVid.currentTime = newCurrTime;
  }
  function changeVolumeButt() {
    if(volumeButton.classList.contains('on-volume-button')) {
      volumeButton.classList.remove('on-volume-button');
      volumeButton.classList.add('off-volume-button');
      updateProgressVolume();
      return;
    } else {
      volumeButton.classList.remove('off-volume-button');
      volumeButton.classList.add('on-volume-button');
      updateProgressVolume();
    }
  }
  function volumeRangeUpdate() {
    let volumeRange = this.value / 100;
    myVid.volume = volumeRange;
    if(myVid.volume == 0) {
      volumeButton.classList.remove('on-volume-button');
      volumeButton.classList.add('off-volume-button');
    } else {
      volumeButton.classList.remove('off-volume-button');
      volumeButton.classList.add('on-volume-button');
    }
  }
  function updateProgressVolume() {
    if(volumeButton.classList.contains('off-volume-button')){
      myVid.volume = 0;
      volumeSlider.value = 0;
      volumeSlider.style.background = 'linear-gradient(to right, #BDAE82 0%, #BDAE82 0%, #fff 0%, white 100%)';
    }
    if(volumeButton.classList.contains('on-volume-button')) {
      myVid.volume = 0.5;
      volumeSlider.value = 30;
      volumeSlider.style.background = 'linear-gradient(to right, #BDAE82 0%, #BDAE82 30%, #fff 30%, white 100%)';
    }
  }
/* scroll page */
const sectionContact = document.querySelector('.contact-container');
const heroContButton = document.querySelector('.section-hero button');
heroContButton.addEventListener("click", () => sectionContact.scrollIntoView());