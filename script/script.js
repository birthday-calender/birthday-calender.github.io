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
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          printEntries(user.uid);
    
        //   theme.click();
        //   homeIcon.click();
        //   hideNav();
    
    //       changeDisplayProperty('kontoError', 'none');
    //       changeDisplayProperty('kontoError', 'none');
    //       changeDisplayProperty('user', 'none');
    //       changeDisplayProperty('signOut', 'block');
    //       changeDisplayProperty('addWrapper', 'block');
    //       changeDisplayProperty('formWrapper', 'block');
    
    //       document.getElementById('addFDB').textContent = '';
    
    //       // if (entryWrapper.childNodes.length === 0) document.getElementById('entryFDB').textContent = 'Keine Einträge verfügbar.';
    //       if (deletedEntriesWrapper.childNodes.length === 0) document.getElementById('deletedFDB').textContent = 'Keine Einträge verfügbar.';
    
    //       firebase.database().ref('users/' + user.uid + '/userdata').once('value').then((snapshot) => {
    //         document.getElementById('usernameField').textContent = snapshot.val().username;
    //       });
    
    //       firebase.database().ref(`users/${user.uid}/settings/theme`).once('value').then((snapshot) => {
    //         document.getElementById(`${snapshot.val().color}Theme`).getElementsByTagName('i')[0].style.display = 'block';
    //         changeTheme(snapshot.val().color, snapshot.val().hex);
    //       });
    //     } else {
    //       toggleFullScreenContent();
    //       changeDisplayProperty('user', 'block');
    //       changeDisplayProperty('signOut', 'none');
    
    //       let patternWrapper = document.getElementById('entryWrapper');
    //       while (patternWrapper.firstChild) patternWrapper.removeChild(patternWrapper.firstChild);
    
    //       patternWrapper = document.getElementById('themeContent');
    //       while (patternWrapper.firstChild) patternWrapper.removeChild(patternWrapper.firstChild);
    //       document.getElementById('themeFDB').textContent = 'Sie müssen eingeloggt sein um dieses Feature nutzen zu können.';
    
    //       // document.getElementById('entryFDB').textContent = 'Keine Einträge verfügbar.';
    //       document.getElementById('addFDB').textContent = 'Sie müssen angemeldet sein um Einträge erstellen zu können.';
    //       document.getElementById('usernameField').textContent = 'nicht eingeloggt.';
    
    //       changeDisplayProperty('addWrapper', 'none');
    //       changeDisplayProperty('formWrapper', 'none');
    //       changeDisplayProperty('kontoError', 'block');
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

  // signup.addEventListener('click', () => {
  //   const email = document.getElementById('addSignUpMail');
  //   const password = document.getElementById('addSignUpPassword');
  //   const statusOutput = document.getElementById('statusOutput');

  //   const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);

  //   if(email.value === '') {
  //     // errormessageSignUp.textContent = 'Es dürfen keine Felder leer bleiben'
  //   }


  //   promise.then(() => {
  //     statusOutput.textContent = "Eingelogt";

  //     firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({
  //       email: firebase.auth().currentUser.email 
  //     })
  //   })
  // })

  // signin.addEventListener('click', () => {
  //   const email = document.getElementById('addSignInMail');
  //   const password = document.getElementById('addSignInPassword');
  //   const statusOutput = document.getElementById('statusOutput');

  //   const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value);

  //   promise.then(() => {
  //     statusOutput.textContent = "Eingeloggt";
  //   })
  // })

  // signout.addEventListener('click', () => {
  //   const promise = firebase.auth().signOut();

  //   statusOutput.textContent = "Ausgelogt";
  // })

  function printEntries(userId) {
    let content;
    let entries = [];

    const patternWrapper = document.getElementById('entryWrapper');
    while (patternWrapper.firstChild) patternWrapper.removeChild(patternWrapper.firstChild);

    firebase.database().ref('birthdays' + userId + '/entries').once('value').then((snapshot) => {

      content = snapshot.val();

      // Fill Array with Database Content
      for (const index in content) {
        entries.push([]);
        for (const index2 in content[index]) {
          entries[entries.length - 1].push(content[index][index2]);
        }
      }

      // Convert Date Format
      for (let i = 0; i < entries.length; i++) {
        for (let j = 0; j < entries[i].length; j++) {
          if (entries[i][j].date.includes('-')) {
            const parts = entries[i][j].date.split('-');
            entries[i][j].date = `${parts[2]}.${parts[1]}.${parts[0]}`;
          }
        }
      }

      console.log(entries);

      for (let i = 0; i < entries.length; i++) {
        const contentWrapper = document.getElementById('entryWrapper');
        const newPerson = document.createElement('div');

        const header = document.createElement('div');
        const headerName = document.createElement('h2');
        const headerIconWrapper = document.createElement('div');
        const headerTotalPrice = document.createElement('p');
        const headerIcon = document.createElement('i');

        headerName.textContent = entries[i][0].name;
        headerTotalPrice.textContent = '23,50€';
        headerIcon.setAttribute('class', 'fas fa-angle-right');

        header.addEventListener('click', () => {
          // newPerson.classList.toggle('makeBigger');
          document.getElementById('contentWrapper').classList.toggle('showDetailed');
        });

        headerIconWrapper.appendChild(headerTotalPrice);
        headerIconWrapper.appendChild(headerIcon);

        header.appendChild(headerName);
        header.appendChild(headerIconWrapper);

        header.setAttribute('class', 'personHeader');

        newPerson.appendChild(header);
        newPerson.setAttribute('class', 'person');


        contentWrapper.appendChild(newPerson);
      }
    });
  }

  
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
