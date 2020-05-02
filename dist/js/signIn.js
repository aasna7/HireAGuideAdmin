var firebaseConfig = {
  apiKey: "AIzaSyDVfXPHl_t7nlsjfkObAIzJnTd4uQJDDOc",
  authDomain: "hireaguide-kirandroid.firebaseapp.com",
  databaseURL: "https://hireaguide-kirandroid.firebaseio.com",
  projectId: "hireaguide-kirandroid",
  storageBucket: "hireaguide-kirandroid.appspot.com",
  messagingSenderId: "271143122627",
  appId: "1:271143122627:web:2c314f1ac521123b74d476",
  measurementId: "G-KKL7P2RZ9Z",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//firebase.analytics();

const firebase1 = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
firebase1.settings(settings);

const emailLogin = document.querySelector("#your_email");
const passwordLogin = document.querySelector("#your_pass");
const btnLogin = document.querySelector("#signin");

const formLogin = document.querySelector("#loginForm");

formLogin.onsubmit = function (e) {
  e.preventDefault();
  btnLogin.addEventListener("click", function () {
    const emailValue = emailLogin.value;
    const passwordValue = passwordLogin.value;
    const auth = firebase.auth();
    var emailcheck = firebase1.collection("admin").doc(emailValue);
    emailcheck.get().then((docSnapshot) => {
      if (docSnapshot.exists) {
        emailcheck.onSnapshot((doc) => {
          firebase
            .auth()
            .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(function () {
              return firebase
                .auth()
                .signInWithEmailAndPassword(emailValue, passwordValue)
                .then(function () {
                  window.location.href = "guidePage.html";
                })
                .catch(function (error) {
                  // Handle Errors here.
                  alert("Incorrect username or password");
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  console.log(errorMessage);
                  // ...
                });
            })
            .catch(function (error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
            });
        });
      } else {
        window.alert("Incorrect Username or Password");
      }
    });
  });
};
