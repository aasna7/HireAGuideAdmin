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

const rowDetails = document.querySelector("#rowdetails");
// const imageDiv = document.querySelector("#imagediv");
// const detailsDiv = document.querySelector("#detailsdiv");
const touristDetails = document.querySelector("#touristDetails");

function renderUser(doc) {
  var card = document.createElement("div");
  card.className = "card";
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
  isVeified12.textContent = "isVerified:" + doc.data().isVerified;
  blankSpace.textContent = "     ";
  viewGuide.innerHTML = "View Details";
  viewGuide.style.backgroundColor = "#e67e22";
  viewGuide.style.padding = "10px";
  viewGuide.style.color = "white";
  viewGuide.style.fontWeight = "bold";
  verifyGuide.innerHTML = "Verify";
  imgGuide.src = doc.data().profilePicture;
  imgGuide.style.width = "140px";
  imgGuide.style.height = "180px";
  imgGuide.style.paddingRight = "10px";

  viewGuide.addEventListener("click", function () {
    const email_ = doc.data().email;
    localStorage.setItem("touristEmail", email_);
    window.location.href = "touristMoreDetails.html";
  });

  divGuide.appendChild(nameGuide);
  divGuide.appendChild(emailGuide);
  divGuide.appendChild(addressGuide);
  divGuide.appendChild(contactGuide);
  divGuide.appendChild(countryGuide);
  divGuide.appendChild(languagesGuide);

  divGuide.appendChild(viewGuide);

  divGuide.appendChild(blankSpace);
  divGuide.appendChild(hrLine);
  divGuide.appendChild(brLine);
  divImg.appendChild(imgGuide);
  divImg.appendChild(hrLine);

  imageCol.appendChild(divImg);
  detailsCol.appendChild(divGuide);
  row.appendChild(imageCol);
  row.appendChild(detailsCol);
  row.style.marginLeft = "2%";
  card.appendChild(row);
  touristDetails.appendChild(card);
}

firebase1
  .collection("users")
  .where("userType", "==", "tourist")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderUser(doc);
    });
  });
