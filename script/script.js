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

  const signup = document.getElementById('signup');
  const signin = document.getElementById('signin');
  const signout = document.getElementById('signout')

  // Burger Menu
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

  // Nav enable
  disableNav.addEventListener('click', () => {
    if (document.getElementById('nav').style.left === '0px') {
      menuburger.click();
    }
  });

  signup.addEventListener('click', () => {
    const email = document.getElementById('addSignUpMail');
    const password = document.getElementById('addSignUpPassword');
    const statusOutput = document.getElementById('statusOutput');

    const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);

    if(email.value === '') {
      // errormessageSignUp.textContent = 'Es dürfen keine Felder leer bleiben'
    }


    promise.then(() => {
      statusOutput.textContent = "Eingelogt";

      firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({
        email: firebase.auth().currentUser.email 
      })
    })
  })

  signin.addEventListener('click', () => {
    const email = document.getElementById('addSignInMail');
    const password = document.getElementById('addSignInPassword');
    const statusOutput = document.getElementById('statusOutput');

    const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value);

    promise.then(() => {
      statusOutput.textContent = "Eingeloggt";
    })
  })

  signout.addEventListener('click', () => {
    const promise = firebase.auth().signOut();

    statusOutput.textContent = "Ausgelogt";
  })


  
})