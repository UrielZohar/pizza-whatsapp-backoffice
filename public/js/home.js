const mailContainer = document.querySelector('.mail-container');
const shownMailContainer = 'container mail-container shown-container';
const hiddenMailContainer = 'container mail-container hidden-container';
const socialMediaContainer = document.querySelector('.socialMedia-container');
const shownSocialMediaContainer = 'container socialMedia-container shown-container';
const hiddenSocialMediaContainer = 'container socialMedia-container hidden-container';
const phoneContainer = document.querySelector('.phone-container');
const shownPhoneContainer = 'container phone-container shown-container';
const hiddenPhoneContainer = 'container phone-container hidden-container';
const authenticationMethod1 = document.getElementById('method1');
const authenticationMethod2 = document.getElementById('method2');
const authenticationMethod3 = document.getElementById('method3');
const mailField = document.getElementById('mail');
const passwordField = document.getElementById('password');
const phoneNumberField = document.getElementById('phoneNumber');
const codeField = document.getElementById('code');
const labels = document.getElementsByTagName('label');
const signInWithMail = document.getElementById('signInWithMail');
const signInWithPhone = document.getElementById('signInWithPhone');
const signUp = document.getElementById('signUp');
const failureModal = document.querySelector('.failure');
const signInWithGoogleButton = document.getElementById('signInWithGoogle');
const signInWithTwitterButton = document.getElementById('signInWithTwitter');

//Necessary part for the firebase built in functions
//It's easier and cleaner to type auth.signInWithEmailAndPassword
//than firebase.auth().signInWithEmailAndPassword
//also it's less repetitive since we are using it more than once
const auth = firebase.auth();

const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();

  auth.signInWithPopup(googleProvider)
  .then((googleAuthResponse) => {
    console.log('googleAuthResponse:');
    console.log(googleAuthResponse);
    window.location.assign('./products');
  })
  .catch(error => {
    console.error(error);
  })
}

signInWithGoogleButton.addEventListener('click', signInWithGoogle);
