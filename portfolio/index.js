console.log("1. Смена изображений в секции portfolio +25\n2. Перевод страницы на два языка +25\n3. Переключение светлой и тёмной темы +25\n4. Дополнительный функционал: выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы +5");
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