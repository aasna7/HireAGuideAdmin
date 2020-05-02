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

const logOut = document.querySelector("#logOut");
const verifiedGuides = document.querySelector("#verifiedGuidesList");
const unverfiedGuides = document.querySelector("#unverifiedGuidesList");

logOut.addEventListener("click", function () {
  var logOutConfirm = confirm("Are you sure you want to Log Out?");
  if (logOutConfirm == true) {
    window.location.href = "index.html";
  }
});

function renderUser(doc) {
  var isVerified_ = false;
  var row = document.createElement("div");
  row.className = "row";
  var imageCol = document.createElement("div");
  imageCol.className = "col-xs-4";
  var detailsCol = document.createElement("div");
  detailsCol.className = "col-xs-8";
  let divGuide = document.createElement("div");
  let divImg = document.createElement("div");
  let imgGuide = document.createElement("img");
  let nameGuide = document.createElement("p");
  let emailGuide = document.createElement("p");
  let addressGuide = document.createElement("p");
  let contactGuide = document.createElement("p");
  let countryGuide = document.createElement("p");
  let languagesGuide = document.createElement("p");
  let licenseGuide = document.createElement("p");
  let isVeified12 = document.createElement("p");
  let blankSpace = document.createElement("p");
  let viewGuide = document.createElement("button");
  let verifyGuide = document.createElement("button");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");
  nameGuide.textContent =
    "Name: " + doc.data().firstName + " " + doc.data().lastName;
  emailGuide.textContent = "Email: " + doc.data().email;
  addressGuide.textContent = "Address: " + doc.data().address;
  contactGuide.textContent = "Contact: " + doc.data().contact;
  countryGuide.textContent = "Country: " + doc.data().country;
  languagesGuide.textContent = "Languages: " + doc.data().languages;
  isVeified12.textContent = "isVerified: " + doc.data().isVerified;
  licenseGuide.textContent = "License ID: " + doc.data().licenseId;
  viewGuide.innerHTML = "View Details";
  verifyGuide.innerHTML = "Verify";
  imgGuide.src = doc.data().profilePicture;
  imgGuide.style.width = "140px";
  imgGuide.style.height = "180px";
  imgGuide.style.paddingRight = "20px";
  imageCol.style.paddingRight = "10px";
  const email_ = doc.data().email;
  viewGuide.addEventListener("click", function () {
    console.log(em1);
  });

  verifyGuide.addEventListener("click", function () {
    var userVal = confirm("Are you sure you want to verify this guide?");
    if (userVal == true) {
      verifyGuide.innerHTML = "Verified";
      _isVerified = true;

      firebase1.collection("users").doc(doc.id).update({ isVerified: true });
      verifyGuide.style.background = "#D3D3D3";
      XMLHttpRequestUpload();
    }
  });

  divGuide.appendChild(nameGuide);
  divGuide.appendChild(emailGuide);
  divGuide.appendChild(addressGuide);
  divGuide.appendChild(contactGuide);
  divGuide.appendChild(countryGuide);
  divGuide.appendChild(languagesGuide);
  divGuide.appendChild(isVeified12);
  divGuide.appendChild(licenseGuide);
  divGuide.appendChild(viewGuide);
  divGuide.appendChild(verifyGuide);
  divGuide.appendChild(blankSpace);
  divGuide.appendChild(hrLine);
  divGuide.appendChild(brLine);
  divImg.appendChild(imgGuide);
  divImg.appendChild(hrLine);

  imageCol.appendChild(divImg);
  detailsCol.appendChild(divGuide);

  row.appendChild(imageCol);
  row.appendChild(detailsCol);

  unverfiedGuides.appendChild(row);
}

function renderUser1(doc) {
  let divGuide = document.createElement("div");
  let divImg = document.createElement("div");
  let imgGuide = document.createElement("img");
  let nameGuide = document.createElement("p");
  let emailGuide = document.createElement("p");
  let addressGuide = document.createElement("p");
  let contactGuide = document.createElement("p");
  let countryGuide = document.createElement("p");
  let languagesGuide = document.createElement("p");
  let licenseGuide = document.createElement("p");
  let blankSpace = document.createElement("p");
  let viewGuide = document.createElement("button");
  let verifyGuide = document.createElement("button");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");
  nameGuide.textContent =
    "Name: " + doc.data().firstName + " " + doc.data().lastName;
  emailGuide.textContent = "Email: " + doc.data().email;
  addressGuide.textContent = "Address: " + doc.data().address;
  contactGuide.textContent = "Contact: " + doc.data().contact;
  countryGuide.textContent = "Country: " + doc.data().country;
  languagesGuide.textContent = "Languages: " + doc.data().languages;
  licenseGuide.textContent = "License ID: " + doc.data().licenseId;
  blankSpace.textContent = "     ";
  viewGuide.innerHTML = "View Details";
  verifyGuide.innerHTML = "Verified";
  imgGuide.src = doc.data().profilePicture;
  imgGuide.style.width = "120px";
  imgGuide.style.height = "180px";
  imgGuide.style.paddingRight = "10px";
  const email_ = doc.data().email;
  viewGuide.addEventListener("click", function () {
    console.log(em1);
  });

  verifyGuide.innerHTML = "Verified";
  verifyGuide.style.background = "#D3D3D3";

  verifyGuide.addEventListener("click", function () {
    verifyGuide.innerHTML = "Verified";

    firebase1.collection("users").doc(doc.id).update({ isVerified: false });
    verifyGuide.style.background = "#D3D3D3";
  });

  divGuide.appendChild(nameGuide);
  divGuide.appendChild(emailGuide);
  divGuide.appendChild(addressGuide);
  divGuide.appendChild(contactGuide);
  divGuide.appendChild(countryGuide);
  divGuide.appendChild(languagesGuide);
  divGuide.appendChild(licenseGuide);

  divGuide.appendChild(viewGuide);
  divGuide.appendChild(verifyGuide);
  divGuide.appendChild(blankSpace);
  divGuide.appendChild(hrLine);
  divGuide.appendChild(brLine);
  divImg.appendChild(imgGuide);
  divImg.appendChild(hrLine);

  imageDiv_Verified.appendChild(divImg);
  detailsDiv_Verified.appendChild(divGuide);
}

firebase1
  .collection("users")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      if (doc.data().userType == "guide" && doc.data().isVerified == false) {
        renderUser(doc);
      } else if (
        doc.data().userType == "guide" &&
        doc.data().isVerified == true
      ) {
        renderUser1(doc);
      }
    });
  });
