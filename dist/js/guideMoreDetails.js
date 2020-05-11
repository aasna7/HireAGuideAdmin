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

var emailGuide = localStorage.getItem("guideEmail");
console.log(emailGuide);
const guideMoreDetails = document.querySelector("#guidemoredetails");

function renderUser(doc) {
  var card = document.createElement("div");
  card.className = "card-all";
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
  let genderGuide = document.createElement("p");
  let emailGuide = document.createElement("p");
  let addressGuide = document.createElement("p");
  let contactGuide = document.createElement("p");
  let countryGuide = document.createElement("p");
  let languagesGuide = document.createElement("p");
  let professionalDetails = document.createElement("h3");
  let typeGuide = document.createElement("p");
  let licenseGuide = document.createElement("p");
  var licenseRow = document.createElement("div");
  licenseRow.className = "row";
  var frontLicenseCol = document.createElement("div");
  frontLicenseCol.className = "col";
  var frontLicenseCard = document.createElement("div");
  frontLicenseCard.className = "card";
  var backLicenseCol = document.createElement("div");
  backLicenseCol.className = "col";
  var backLicenseCard = document.createElement("div");
  backLicenseCard.className = "card";
  let frontLicenseHeading = document.createElement("h5");
  let backLicenseHeading = document.createElement("h5");
  let frontLicense = document.createElement("img");
  let backLicense = document.createElement("img");
  let isVerifiedGuide = document.createElement("p");
  let ratingGuide = document.createElement("p");
  let specialityGuide = document.createElement("p");
  let statusGuide = document.createElement("p");
  let updatedOnGuide = document.createElement("p");
  let verifyGuide = document.createElement("button");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");

  nameGuide.textContent =
    "Name: " + doc.data().firstName + " " + doc.data().lastName;
  genderGuide.textContent = "Gender: " + doc.data().gender;
  emailGuide.textContent = "Email: " + doc.data().email;
  addressGuide.textContent = "Address: " + doc.data().address;
  contactGuide.textContent = "Contact: " + doc.data().contact;
  countryGuide.textContent = "Country: " + doc.data().country;
  languagesGuide.textContent = "Languages: " + doc.data().languages;
  professionalDetails.innerHTML = "Professional Details:";
  typeGuide.textContent = "Guide Type: " + doc.data().guideType;
  licenseGuide.textContent = "License ID: " + doc.data().licenseId;
  frontLicenseHeading.innerHTML = "Front License";
  backLicenseHeading.innerHTML = "Back License";
  frontLicense.src = doc.data().licenseImageFront;
  frontLicense.style.width = "120px";
  frontLicense.style.height = "180px";
  backLicense.src = doc.data().licenseImageBack;
  backLicense.style.width = "120px";
  backLicense.style.height = "180px";
  isVerifiedGuide.textContent = "isVerified: " + doc.data().isVerified;
  ratingGuide.textContent = "Rating: " + doc.data().rating;
  specialityGuide.textContent = "Speciality: " + doc.data().speciality;
  statusGuide.textContent = "Status: " + doc.data().status;
  updatedOnGuide.textContent = "Updated On: " + doc.data().updatedOn;

  imgGuide.src = doc.data().profilePicture;
  imgGuide.style.width = "160px";
  imgGuide.style.height = "180px";
  imgGuide.style.paddingRight = "10px";

  if (doc.data().isVerified == true) {
    var icon = document.createElement("span");
    icon.className = "glyphicon glyphicon-ok";
    icon.style.color = "black";
    verifyGuide.appendChild(icon);
    verifyGuide.innerHTML = "Verified";
    verifyGuide.style.background = "#D3D3D3";
    verifyGuide.style.width = "200px";
    verifyGuide.style.padding = "10px";
  } else if (doc.data().isVerified == false) {
    verifyGuide.innerHTML = "Verify";
    verifyGuide.style.background = "#22a722";
    verifyGuide.style.width = "200px";
    verifyGuide.style.padding = "10px";
  }

  if (doc.data().isVerified == true) {
    verifyGuide.addEventListener("click", function () {
      var userVal = confirm("Are you sure you want to unverify this guide?");
      if (userVal == true) {
        firebase1.collection("users").doc(doc.id).update({ isVerified: false });
        verifyGuide.innerHTML = "Verify";
        _isVerified = true;
        verifyGuide.style.background = "#22a722";
      }
    });
  } else if (doc.data().isVerified == false) {
    verifyGuide.addEventListener("click", function () {
      var userVal = confirm("Are you sure you want to verify this guide?");
      if (userVal == true) {
        firebase1.collection("users").doc(doc.id).update({ isVerified: true });
        var icon = document.createElement("span");
        icon.className = "glyphicon glyphicon-ok";
        icon.style.color = "black";
        verifyGuide.appendChild(icon);
        verifyGuide.innerHTML = "Verified";
        _isVerified = true;
        verifyGuide.style.background = "#D3D3D3";
      }
    });
  }

  frontLicenseCard.appendChild(frontLicenseHeading);
  frontLicenseCard.appendChild(frontLicense);
  frontLicenseCol.appendChild(frontLicenseCard);
  backLicenseCard.appendChild(backLicenseHeading);
  backLicenseCard.appendChild(backLicense);
  backLicenseCol.appendChild(backLicenseCard);
  licenseRow.appendChild(frontLicenseCol);
  licenseRow.appendChild(backLicenseCol);

  divGuide.appendChild(nameGuide);
  divGuide.appendChild(genderGuide);
  divGuide.appendChild(emailGuide);
  divGuide.appendChild(addressGuide);
  divGuide.appendChild(contactGuide);
  divGuide.appendChild(countryGuide);
  divGuide.appendChild(languagesGuide);
  divGuide.appendChild(professionalDetails);
  divGuide.appendChild(typeGuide);
  divGuide.appendChild(licenseGuide);
  divGuide.appendChild(licenseRow);
  divGuide.appendChild(isVerifiedGuide);
  divGuide.appendChild(ratingGuide);
  divGuide.appendChild(specialityGuide);
  divGuide.appendChild(statusGuide);
  divGuide.appendChild(updatedOnGuide);

  divGuide.appendChild(verifyGuide);

  divGuide.appendChild(hrLine);
  divGuide.appendChild(brLine);
  divImg.appendChild(imgGuide);
  divImg.appendChild(hrLine);

  imageCol.appendChild(divImg);
  detailsCol.appendChild(divGuide);

  row.appendChild(imageCol);
  row.appendChild(detailsCol);
  row.style.marginLeft = "2%";
  row.style.marginTop = "2%";

  card.appendChild(row);

  guideMoreDetails.appendChild(card);
}

firebase1
  .collection("users")
  .where("email", "==", emailGuide)
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderUser(doc);
    });
  });
