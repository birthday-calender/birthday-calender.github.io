window.addEventListener('load', () => {
  const firebaseConfig = {
    apiKey: "AIzaSyCCsvg2WxtQutyZ1sEYiiR2A-qh4lrGBTM",
    authDomain: "geburtstagskalender-2aba1.firebaseapp.com",
    databaseURL: "https://geburtstagskalender-2aba1.firebaseio.com",
    projectId: "geburtstagskalender-2aba1",
    storageBucket: "geburtstagskalender-2aba1.appspot.com",
    messagingSenderId: "470947879293",
    appId: "1:470947879293:web:2b41682dd70fe5a3d35414",
    measurementId: "G-R5D59BEZ8D"
  };
  
  firebase.initializeApp(firebaseConfig);

  menuburger.addEventListener('click', () => {
    const b1 = document.getElementById('burger1');
    const b2 = document.getElementById('burger2');
    const b3 = document.getElementById('burger3');
    const nav = document.getElementById('nav');
    const burger = document.getElementById('menuburger');
    const disableNav =document.getElementById('disableNav');

    b1.classList.toggle('burger1Active');
    b2.classList.toggle('burger2Active');
    b3.classList.toggle('burger3Active');

    if (nav.style.left === '0px') {
      nav.style.left = '-90vw';
      burger.style.left = 0;
      disableNav.style.display = 'none';
    } else {
      nav.style.left = 0;
      burger.style.left = '82vw';
      disableNav.style.display = 'block';
    } 
  })

  disableNav.addEventListener('click', () => {
    if (document.getElementById('nav').style.left === '0px') {
      menuburger.click();
    }
  });
  
})