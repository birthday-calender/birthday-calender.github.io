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
    // let data = {1575110734831: {
    //     birthdate: "2003-03-06",
    //     key: 1575110734831, 
    //     name: "Jonas",
    // },
    // 1575152163583: {
    //     birthdate: "2003-19-05",
    //     key: 1575152163583,
    //     name: "Michael"} 
    // };

    
//   const signup = document.getElementById('signup');
//   const signin = document.getElementById('signin');
  const signout = document.getElementById('signout')

  const goToSignIn = document.getElementById('goToSignIn');
    const goToSignUp = document.getElementById('goToSignUp');
    const signUpWrapper = document.getElementById('signUpWrapper');
    const signInWrapper = document.getElementById('signInWrapper');
    // const continueWithSignIn = document.getElementById('continueWithSignIn');
    // const continueWithSignUp = document.getElementById('continueWithSignUp');
    const signInButton = document.getElementById('signInBtn');
    const signUpButton = document.getElementById('signUpBtn');
    const addBirthDate = document.getElementById('addBirthDate');

    // AOS.init();


    goToSignUp.addEventListener('click', () => {
        signInWrapper.classList.remove('fadeIn');
        signInWrapper.classList.add('fadeOut');
        signUpWrapper.classList.add('fadeIn');

        signUpWrapper.style.zIndex = 100;
        signInWrapper.style.zIndex = 0;

        setTimeout(() => {
            clearSignIn();
        }, 310);

        hideAll();
        changeDisplayProperty('contentWrapperall', 'block');
        changeDisplayProperty('menuburgerWrapper', 'block');
        changeDisplayProperty('signUpWrapper', 'block');
        // changeDisplayProperty('createbirthday', 'block')
    });

    goToSignIn.addEventListener('click', () => {
        signUpWrapper.classList.remove('fadeIn');
        signUpWrapper.classList.add('fadeOut');
        signInWrapper.classList.add('fadeIn');
        signInWrapper.style.zIndex = 100;
        signUpWrapper.style.zIndex = 0;

        setTimeout(() => {
            clearSignUp();
        }, 310);

        
        hideAll();
        changeDisplayProperty('contentWrapperall', 'block');
        changeDisplayProperty('menuburgerWrapper', 'block');
        changeDisplayProperty('signInWrapper', 'block');
        // changeDisplayProperty('createbirthday', 'block')
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            firebase.database().ref(`users/${firebase.auth().currentUser.uid}/birthdates`).once('value').then((snapshot) => {
                // console.table(snapshot.val());
                printEntries(snapshot.val());
            });
        
        
        //   printEntries(user.uid);
        }
      });

    signInButton.addEventListener('click', () => {
        const email = document.getElementById('emailIn');
        const password = document.getElementById('passwordIn');
        const emInFeedback = document.getElementById('emInFeedback');
        const pwInFeedback = document.getElementById('pwInFeedback');
        let isValid = true;

        startLoadingAnimation();

        // Email validation
        if (email.value === '' || email.value === ' ') {
            // email value is empty
            emInFeedback.textContent = 'Bitte geben Sie eine E-Mail Adresse ein.';
            isValid = false;
            email.classList.add('errorInput');
        } else if (validateEmail(email)) {
            // email is valid
            emInFeedback.textContent = '';
            email.classList.remove('errorInput');
        } else {
            // email is invalid
            emInFeedback.textContent = 'Ungültige E-Mail Adresse.';
            email.classList.add('errorInput');

            isValid = false;
        }

        if (password.value === '' || password.value === ' ') {
            // password value is empty
            pwInFeedback.textContent = 'Bitte geben Sie ein Passwort ein.';
            isValid = false;
            password.classList.add('errorInput');
        } else {
            // password is valid
            pwInFeedback.textContent = '';
            password.classList.remove('errorInput');
        }

        if (isValid) {
            const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value);
            promise.catch((error) => {
                const errorMsg = error.message;
                const messages = [
                    {message: 'The password is invalid or the user does not have a password.', feedback: 'Das eingegebene Passwort ist ungültig.', affected: 'pw'},
                    {message: 'Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later', feedback: 'Der Anmelde Vorgang ist zu oft fehlgeschlagen, versuchen Sie es später ernuet.', affected: ''},
                    {message: 'There is no user record corresponding to this identifier. The user may have been deleted.', feedback: 'Es wurde keine Account mit der eingegebenen E-Mail Adresse gefunden.', affected: 'em'},
                    {message: 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.', feedback: 'Zeitüberschreitung beim Anmelden. Versuche Sie es später erneut.', affected: ''},
                    {message: 'The email address is already in use by another account.', feedback: 'Die angebene E-Mail Adresse wird bereits verwendet.', affected: 'em'},
                ];

                for (const msg of messages) {
                    if (msg.message === errorMsg) {
                        if (msg.affected === 'em') {
                            emUpFeedback.textContent = msg.feedback;
                            email.classList.add('errorInput');
                        } else if (msg.affected === 'pw') {
                            pwUpFeedback.textContent = msg.feedback;
                            password.classList.add('errorInput');
                        }
                    }
                }
            });

            // statusOutput.textContent = "eingelogt";

            promise.then(() => {
                stopLoadingAnimation();
                sessionStorage.setItem('choseGoogle', true);
            });
        } else {
            stopLoadingAnimation();
        }

        function startLoadingAnimation() {
            const signInBtnText = document.getElementById('signInBtnText');
            const signInloader = document.getElementById('signInloader');

            signInBtnText.style.opacity = 0;
            signInloader.style.width = (signInButton.clientWidth - 64) + 'px';
            signInloader.style.height = (signInButton.clientHeight - 64) + 'px';
            signInBtnText.style.position = 'absolute';
            signInloader.classList.remove('hide');
        }

        function stopLoadingAnimation() {
            const signInBtnText = document.getElementById('signInBtnText');
            const signInloader = document.getElementById('signInloader');

            signInloader.classList.add('hide');
            signInBtnText.style.position = 'relative';
            signInBtnText.style.opacity = 1;
        }
    });

    signUpButton.addEventListener('click', () => {
        const email = document.getElementById('emailUp');
        const password = document.getElementById('passwordUp');
        const emUpFeedback = document.getElementById('emUpFeedback');
        const pwUpFeedback = document.getElementById('pwUpFeedback');
        let isValid = true;

        startLoadingAnimation();

        // Email validation
        if (email.value === '' || email.value === ' ') {
            // email value is empty
            emUpFeedback.textContent = 'Bitte geben Sie eine E-Mail Adresse ein.';
            isValid = false;
            email.classList.add('errorInput');
        } else if (validateEmail(email)) {
            // email is valid
            emUpFeedback.textContent = '';
            email.classList.remove('errorInput');
        } else {
            // email is invalid
            emUpFeedback.textContent = 'Ungültige E-Mail Adresse.';
            email.classList.add('errorInput');

            isValid = false;
        }

        if (password.value === '' || password.value === ' ') {
            // password value is empty
            pwUpFeedback.textContent = 'Bitte geben Sie ein Passwort ein.';
            isValid = false;
            password.classList.add('errorInput');
        } else if (validatePassword(password)) {
            // password is valid
            pwUpFeedback.textContent = '';
            password.classList.remove('errorInput');
        } else {
            if (!/[a-z]/.test(password.value)) {
                // no lower case letters
                pwUpFeedback.textContent = 'Bitte geben Sie auch kleine Buchstaben ein.';
            } else if (!/[A-Z]/.test(password.value)) {
                // no higer case letters
                pwUpFeedback.textContent = 'Bitte geben Sie auch große Buchstaben ein.';
            } else if (!/[0-9]/.test(password.value)) {
                // no numbers
                pwUpFeedback.textContent = 'Bitte geben Sie auch Ziffern ein.';
            } else if (password.value.length <= 5) {
                // to short
                pwUpFeedback.textContent = 'Das Passwort ist zu kurz.';
            } else {
                // unknown error
                pwUpFeedback.textContent = 'Es ist ein unbekannter Fehler aufgetreten, versuchen Sie es später erneut.';
            }

            password.classList.add('errorInput');
            isValid = false;
        }

        if (isValid) {
            const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
            promise.catch((error) => {
                const errorMsg = error.message;
                const messages = [
                    {message: 'The password is invalid or the user does not have a password.', feedback: 'Das eingegebene Passwort ist ungültig.', affected: 'pw'},
                    {message: 'Too many unsuccessful login attempts.  Please include reCaptcha verification or try again later', feedback: 'Der Anmelde Vorgang ist zu oft fehlgeschlagen, versuchen Sie es später ernuet.', affected: ''},
                    {message: 'There is no user record corresponding to this identifier. The user may have been deleted.', feedback: 'Es wurde keine Account mit der eingegebenen E-Mail Adresse gefunden.', affected: 'em'},
                    {message: 'A network error (such as timeout, interrupted connection or unreachable host) has occurred.', feedback: 'Zeitüberschreitung beim Anmelden. Versuche Sie es später erneut.', affected: ''},
                    {message: 'The email address is already in use by another account.', feedback: 'Die angebene E-Mail Adresse wird bereits verwendet.', affected: 'em'},
                ];

                for (const msg of messages) {
                    if (msg.message === errorMsg) {
                        if (msg.affected === 'em') {
                            emUpFeedback.textContent = msg.feedback;
                            email.classList.add('errorInput');
                        } else if (msg.affected === 'pw') {
                            pwUpFeedback.textContent = msg.feedback;
                            password.classList.add('errorInput');
                        }
                    }
                }
            });

            promise.then(() => {
                stopLoadingAnimation();

                sessionStorage.setItem('choseGoogle', false);

                firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({
                	email: firebase.auth().currentUser.email 
                });
            });
        } else {
            stopLoadingAnimation();
        }

        function startLoadingAnimation() {
            const signUpBtnText = document.getElementById('signUpBtnText');
            const signUploader = document.getElementById('signUploader');

            signUpBtnText.style.opacity = 0;
            signUploader.style.width = (signUpButton.clientWidth - 64) + 'px';
            signUploader.style.height = (signUpButton.clientHeight - 64) + 'px';
            signUpBtnText.style.position = 'absolute';
            signUploader.classList.remove('hide');
        }

        function stopLoadingAnimation() {
            const signUpBtnText = document.getElementById('signUpBtnText');
            const signUploader = document.getElementById('signUploader');

            signUploader.classList.add('hide');
            signUpBtnText.style.position = 'relative';
            signUpBtnText.style.opacity = 1;
        }
    });

    function clearSignUp() {
        const inputs = [
            document.getElementById('emailUp'),
            document.getElementById('usernameUp'),
            document.getElementById('passwordUp')
        ];

        const feedbacks = [
            document.getElementById('emUpFeedback'),
            document.getElementById('unUpFeedback'),
            document.getElementById('pwUpFeedback')
        ];

        for (const input of inputs) {
            input.value = '';
        }

        input.classList.remove('errorInput');

        for (const feedback of feedbacks) {
            feedback.textContent = '';
        }
    }

    function clearSignIn() {
        const inputs = [
            document.getElementById('emailIn'),
            document.getElementById('passwordIn')
        ];

        const feedbacks = [
            document.getElementById('emInFeedback'),
            document.getElementById('pwInFeedback')
        ];

        for (const input of inputs) {
            input.value = '';

            input.classList.remove('errorInput');
        }

        for (const feedback of feedbacks) {
            feedback.textContent = '';
        }
    }

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

  entries.addEventListener('click', () => {
      hideAll();
    //   changeDisplayProperty('contentWrapperall', 'block');
      changeDisplayProperty('menuburgerWrapper', 'block');
      changeDisplayProperty('contentWrapper', 'block');
    //   changeDisplayProperty('createbirthday', 'block')

      menuburger.click();
  })

  login.addEventListener('click', () => {
      hideAll();
    //   changeDisplayProperty('contentWrapperall', 'block');
      changeDisplayProperty('menuburgerWrapper', 'block');
      changeDisplayProperty('signInWrapper', 'block');
    //   changeDisplayProperty('createbirthday', 'block')

      menuburger.click();
  })

  createaccount.addEventListener('click', () => {
      hideAll();
    //   changeDisplayProperty('contentWrapperall', 'block');
      changeDisplayProperty('menuburgerWrapper', 'block');
      changeDisplayProperty('signUpWrapper', 'block');
    //   changeDisplayProperty('createbirthday', 'block')

      menuburger.click(); 
  })

  createentries.addEventListener('click', () => {
      hideAll();
      //   changeDisplayProperty('contentWrapperall', 'block');
      changeDisplayProperty('menuburgerWrapper', 'block');
    //   changeDisplayProperty('signUpWrapper', 'block');
      changeDisplayProperty('createbirthday', 'block')

      menuburger.click(); 
  })

  function printEntries(data) {
    const entries = [];
    const entryWrapper = document.getElementById('entryWrapper');

    for (const index in data) {
        entries.push(data[index]);
    }

    for (let i = 0; i < entries.length; i++) {
        const newEntry = document.createElement('div');
        const name = document.createElement('p');
        const birthdate = document.createElement('p');
        
        name.textContent = "Geburtstag: " + entries[i].name;
        birthdate.textContent = "Datum: " + entries[i].birthdate; 

        newEntry.setAttribute('class', 'entry');

        newEntry.appendChild(name);
        newEntry.appendChild(birthdate);
        entryWrapper.appendChild(newEntry);
    }

    
  }

  addBirthDate.addEventListener("click", () => {
    const birthdayName = document.getElementById("addBirthdayName");
    const birthday = document.getElementById("addBirthday");
    const key = new Date().getTime();

    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/birthdates/${key}`).set({
      name: birthdayName.value,
      birthdate: birthday.value,
      key: key
    });
  });
})


function validatePassword(password) {
  return /[a-z]/.test(password.value) && /[A-Z]/.test(password.value) && /[0-9]/.test(password.value) && password.value.length > 5;
}

function validateEmail(email) {
  if (email.value.includes('@')) {
      const splitEmail = email.value.split('@');
      return splitEmail.length === 2 && splitEmail[1].split('.').length === 2 && splitEmail[1].split('.')[1].length >= 2 && splitEmail[1].split('.')[0].length >= 3;
  } else {
      return false;
  }
}

function changeDisplayProperty(id, property) {
    document.getElementById(id).style.display = property;
}

function hideAll() {
    const elements = [
        //   document.getElementById('menuburgerWrapper'),
        //   document.getElementById('disableNav'),
        //   document.getElementById('contentWrapperall'),
          document.getElementById('signInWrapper'),
          document.getElementById('signUpWrapper'),
          document.getElementById('contentWrapper'),
          document.getElementById('createbirthday')
        ];

    for (const element of elements) {
        element.style.display = 'none';
    }
}