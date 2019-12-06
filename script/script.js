window.addEventListener("load", () => {
  
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
  
  const signup = document.getElementById("signup");
  const signin = document.getElementById("signin");
  const signout = document.getElementById("signout");
  const birthDate = document.getElementById("addBirthDate");
  
  signup.addEventListener("click", () => {
    const email = document.getElementById("addEmail");
    const password = document.getElementById("addPassword");
    const emailoutput = document.getElementById("emailoutput");
    const passwordoutput = document.getElementById("passwordoutput");

    const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
    
    promise.then(() => {
        emailoutput.textContent = firebase.auth().currentUser.email;

        firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`).set({
          email: firebase.auth().currentUser.email
        })
    })
  });

  signin.addEventListener("click", () => {
    const email = document.getElementById("addEmail");
    const password = document.getElementById("addPassword");
    const emailoutput = document.getElementById("emailoutput");
    const passwordoutput = document.getElementById("passwordoutput");

    const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    
    promise.then(() => {
        emailoutput.textContent = firebase.auth().currentUser.email;
    })
  });

  signout.addEventListener("click", () => {
    const promise = firebase.auth().signOut();

    emailoutput.textContent = "logged out";
  });
      
  birthDate.addEventListener("click", () => {
    const birthdayName = document.getElementById("addBirthdayName");
    const birthday = document.getElementById("addBirthday");
    const key = new Date().getTime();

    firebase.database().ref(`/users/${firebase.auth().currentUser.uid}/birthdates/${key}`).set({
      name: birthdayName.value,
      birthdate: birthday.value,
      key: key
    });
  });



  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // console.log(user);
 
      const currentDay = new Date(Date.now());

      const addDay = document.getElementById("addBirthday");
      addDay.max = currentDay.getFullYear() + '-' + parseInt(currentDay.getMonth() + 1) + '-' + currentDay.getDate();
      addDay.max = currentDay;
    }
  });

  // nav
  burger.addEventListener('click', () => {
    const b1 = document.getElementById('burger1');
    const b2 = document.getElementById('burger2');
    const b3 = document.getElementById('burger3');
    const nav = document.getElementById('nav');
    const burger = document.getElementById('burger');
    const disableNav = document.getElementById('disableNav');

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
  });

  disableNav.addEventListener('click', () => {
    if (document.getElementById('nav').style.left === '0px') {
      burger.click();
    }
  });
  //nav ende

  // hide(all);


  // const mail = document.getElementById("mailword");

  // mail.addEventListener('click', () => {
  //   hideAll();
  //   changeDisplayProperty('mail', 'block');
  // });

  // if(firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`) == NULL) {
  //   document.body.create = display: none;
  // }

  // let all = document.getElementById("all");

  // all.addEventListener("click", () => {
  //     let mail = document.getElementById("mailword");
  //     mail.style.display = "none";
  //     if (mail.display === "none") {
  //       mail.style.display = "block";
  //     } 
  //     else {
  //       mail.style.display = "none";
  //     } 
  // })
    
  // function all() {
  //   var x = document.getElementById('mailword');
  //   if (x.style.display === 'none') {
  //     x.style.display = 'block';
  //   } else {
  //     x.style.display = 'none';
  //   }
  // }


  // alles.addEventListener("click", () => {
  //   changeDisplayProperty("mailword", "block");
  // })
  
})

