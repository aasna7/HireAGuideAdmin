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

const firebase1 = firebase.firestore();
const firestorage = firebase.storage();

const settings = { /* your settings... */ timestampsInSnapshots: true };
firebase1.settings(settings);

const hotelList = document.querySelector("#listofhotels_");
const placeList = document.querySelector("#listofplaces_");
function renderUser(doc) {
  var row = document.createElement("div");
  row.className = "row";
  var imageCol = document.createElement("div");
  imageCol.className = "col-xs-4";
  var detailsCol = document.createElement("div");
  detailsCol.className = "col-xs-8";
  let divGuide = document.createElement("div");
  let divImg = document.createElement("div");
  let imgHotelList = document.createElement("img");
  let hotelNameList = document.createElement("p");
  let hotelLocationList = document.createElement("p");
  let hotelDescriptionList = document.createElement("p");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");
  hotelNameList.textContent = "Hotel Name: " + doc.data().hotelName;
  hotelLocationList.textContent = "Hotel Location: " + doc.data().hotelLocation;
  hotelDescriptionList.textContent =
    "Hotel Description: " + doc.data().hotelDescription;

  imgHotelList.src = doc.data().hotelImage;
  imgHotelList.style.width = "120px";
  imgHotelList.style.height = "160px";
  imgHotelList.style.paddingRight = "10px";

  divGuide.appendChild(hotelNameList);
  divGuide.appendChild(hotelLocationList);
  divGuide.appendChild(hotelDescriptionList);
  divGuide.appendChild(hrLine);
  divGuide.appendChild(brLine);
  divImg.appendChild(imgHotelList);
  divImg.appendChild(hrLine);

  imageCol.appendChild(divImg);
  detailsCol.appendChild(divGuide);
  row.appendChild(imageCol);
  row.appendChild(detailsCol);
  row.appendChild(hrLine);
  hotelList.appendChild(row);
}

firebase1
  .collection("hotels")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderUser(doc);
    });
  });

function renderUser1(doc) {
  var rowPlace = document.createElement("div");
  rowPlace.className = "row";
  var imageColPlace = document.createElement("div");
  imageColPlace.className = "col-xs-4";
  var detailsColPlace = document.createElement("div");
  detailsColPlace.className = "col-xs-8";
  let divPlace = document.createElement("div");
  let divImgPlace = document.createElement("div");
  let imgPlaceList = document.createElement("img");
  let placeNameList = document.createElement("p");
  let placeLocationList = document.createElement("p");
  let placeDescriptionList = document.createElement("p");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");
  placeNameList.textContent = "Place Name: " + doc.data().placeName;
  placeLocationList.textContent = "Place Location: " + doc.data().placeLocation;
  placeDescriptionList.textContent =
    "Place Description: " + doc.data().placeDescription;

  imgPlaceList.src = doc.data().placeImage;
  imgPlaceList.style.width = "120px";
  imgPlaceList.style.height = "180px";
  imgPlaceList.style.paddingRight = "10px";

  divPlace.appendChild(placeNameList);
  divPlace.appendChild(placeLocationList);
  divPlace.appendChild(placeDescriptionList);
  divPlace.appendChild(hrLine);
  divPlace.appendChild(brLine);
  divImgPlace.appendChild(imgPlaceList);
  divImgPlace.appendChild(hrLine);

  imageColPlace.appendChild(divImgPlace);
  detailsColPlace.appendChild(divPlace);
  rowPlace.appendChild(imageColPlace);
  rowPlace.appendChild(detailsColPlace);
  placeList.appendChild(rowPlace);
}

firebase1
  .collection("places")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderUser1(doc);
    });
  });

const hotelForm = document.querySelector("#addHotelForm");
const hotelName = document.querySelector("#hotel_name");
const hotelLocation = document.querySelector("#hotel_location");
const hotelDescription = document.querySelector("#hotel_description");
const hotelImage = document.querySelector("#hotel_image");
const addHotelBtn = document.querySelector("#addhotelbtn");
const testBtn = document.getElementById("test");
var imageHotelURL;
var imagePlaceURL;

const placeForm = document.querySelector("addPlaceForm");
const placeName = document.querySelector("#place_name");
const placeLocation = document.querySelector("#place_location");
const placeDescription = document.querySelector("#place_description");
const placeImage = document.querySelector("#place_image");
const addPlaceBtn = document.querySelector("#addplacebtn");

function addHotelImage() {
  var imageFile = hotelImage.files[0];
  var storageRef = firestorage.ref("hotelImages/" + imageFile.name);
  var refer = storageRef.put(imageFile);
  refer.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    console.log("File available at: ", downloadURL);
    imageHotelURL = downloadURL;
  });
}

function addPlaceImage() {
  var imageFile = placeImage.files[0];
  var storageRef = firestorage.ref("placesImages/" + imageFile.name);
  var refer = storageRef.put(imageFile);
  refer.snapshot.ref.getDownloadURL().then(function (downloadURL) {
    console.log("File available at: ", downloadURL);
    imagePlaceURL = downloadURL;
  });
}

addHotelBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addHotelImage();
  window.alert("hotel form");
  const hotelName_ = hotelName.value;
  const hotelLocation_ = hotelLocation.value;
  const hotelDescription_ = hotelDescription.value;
  const hotelImage_ = imageHotelURL;
  firebase1
    .collection("hotels")
    .doc()
    .set({
      hotelName: hotelName_,
      hotelLocation: hotelLocation_,
      hotelDescription: hotelDescription_,
      hotelImage: imageHotelURL,
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
});

addPlaceBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addPlaceImage();
  const placeName_ = placeName.value;
  const placeLocation_ = placeLocation.value;
  const placeDescription_ = placeDescription.value;
  firebase1
    .collection("places")
    .doc()
    .set({
      placeName: placeName_,
      placeLocation: placeLocation_,
      placeDescription: placeDescription_,
      placeImage: imagePlaceURL,
    })
    .then(function () {
      console.log("Document successfully written!");
    })
    .catch(function (error) {
      console.log("Error writting document: ", error);
    });
});