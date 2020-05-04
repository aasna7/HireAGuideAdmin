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
  let imgHotelList = document.createElement("img");
  let hotelNameList = document.createElement("p");
  let hotelLocationList = document.createElement("p");
  let hotelDescriptionList = document.createElement("p");
  let editHotelDetails = document.createElement("button");
  let deleteHotelDetails = document.createElement("button");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");
  hotelNameList.textContent = "Hotel Name: " + doc.data().hotelName;
  hotelLocationList.textContent = "Hotel Location: " + doc.data().hotelLocation;
  hotelDescriptionList.textContent =
    "Hotel Description: " + doc.data().hotelDescription;
  editHotelDetails.innerHTML = "Edit";
  editHotelDetails.style.fontWeight = "bold";
  editHotelDetails.style.marginRight = "10px";
  editHotelDetails.style.width = "80px";
  editHotelDetails.style.height = "30px";
  deleteHotelDetails.innerHTML = "Delete";
  deleteHotelDetails.style.fontWeight = "bold";
  deleteHotelDetails.style.width = "80px";
  deleteHotelDetails.style.height = "30px";
  imgHotelList.src = doc.data().hotelImage;
  imgHotelList.style.width = "120px";
  imgHotelList.style.height = "160px";
  imgHotelList.style.paddingRight = "10px";

  deleteHotelDetails.addEventListener("click", function () {
    var confirmDelete = confirm("Are you sure you want to delete this detail?");
    if (confirmDelete == true) {
      let collectionRef = firebase1.collection("hotels");

      collectionRef
        .where("hotelName", "==", doc.data().hotelName)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .delete()
              .then(() => {
                console.log("Document successfully deleted!");
                window.location.href = "hotelsPage.html";
              })
              .catch(function (error) {
                console.error("Error removing document: ", error);
              });
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });
    }
  });

  divGuide.appendChild(hotelNameList);
  divGuide.appendChild(hotelLocationList);
  divGuide.appendChild(hotelDescriptionList);
  divGuide.appendChild(editHotelDetails);
  divGuide.appendChild(deleteHotelDetails);
  divGuide.appendChild(hrLine);
  divGuide.appendChild(brLine);
  divImg.appendChild(imgHotelList);
  divImg.appendChild(hrLine);

  imageCol.appendChild(divImg);
  detailsCol.appendChild(divGuide);
  row.appendChild(imageCol);
  row.appendChild(detailsCol);
  row.appendChild(hrLine);
  card.appendChild(row);
  hotelList.appendChild(card);
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
  var card = document.createElement("div");
  card.className = "card";
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
  let editPlaceDetails = document.createElement("button");
  let deletePlaceDetails = document.createElement("button");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");
  placeNameList.textContent = "Place Name: " + doc.data().placeName;
  placeLocationList.textContent = "Place Location: " + doc.data().placeLocation;
  placeDescriptionList.textContent =
    "Place Description: " + doc.data().placeDescription;
  editPlaceDetails.innerHTML = "Edit";
  editPlaceDetails.style.marginRight = "10px";
  deletePlaceDetails.innerHTML = "Delete";
  imgPlaceList.src = doc.data().placeImage;
  imgPlaceList.style.width = "120px";
  imgPlaceList.style.height = "160px";
  imgPlaceList.style.paddingRight = "10px";

  divPlace.appendChild(placeNameList);
  divPlace.appendChild(placeLocationList);
  divPlace.appendChild(placeDescriptionList);
  divPlace.appendChild(editPlaceDetails);
  divPlace.appendChild(deletePlaceDetails);
  divImgPlace.appendChild(imgPlaceList);

  imageColPlace.appendChild(divImgPlace);
  detailsColPlace.appendChild(divPlace);
  rowPlace.appendChild(imageColPlace);
  rowPlace.appendChild(detailsColPlace);
  card.appendChild(rowPlace);
  placeList.appendChild(card);
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
const hotelDemoImage = document.querySelector("#hoteldemoimage");
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

hotelImage.addEventListener("change", function (e) {
  var file = e.target.files[0];
  var storageref = firestorage.ref("hotelImages/" + file.name);
  var refer = storageref.put(file);
  refer.snapshot.ref
    .getDownloadURL()
    .then(function (downloadURL) {
      console.log("File available at", downloadURL);
      imageHotelURL = downloadURL;
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
});

placeImage.addEventListener("change", function (e) {
  var file = e.target.files[0];
  var storageref = firestorage.ref("placesImages/" + file.name);
  var refer = storageref.put(file);
  refer.snapshot.ref
    .getDownloadURL()
    .then(function (downloadURL) {
      console.log("File available at", downloadURL);
      imagePlaceURL = downloadURL;
    })
    .catch(function (error) {
      console.log(error);
      alert(error);
    });
});

addHotelBtn.addEventListener("click", function (e) {
  e.preventDefault();

  window.alert("hotel form");
  const hotelName_ = hotelName.value;
  const hotelLocation_ = hotelLocation.value;
  const hotelDescription_ = hotelDescription.value;
  const hotelImage_ = imageHotelURL;
  console.log("working till here");
  console.log("image link is: " + imageHotelURL);
  firebase1
    .collection("hotels")
    .doc()
    .set({
      hotelName: hotelName_,
      hotelLocation: hotelLocation_,
      hotelDescription: hotelDescription_,
      hotelImage: hotelImage_,
    })
    .then(function () {
      console.log("Document successfully written!");
      window.location.href = "hotelsPage.html";
    })
    .catch(function (error) {
      console.error("Error writing document: ", error);
    });
});

addPlaceBtn.addEventListener("click", function (e) {
  e.preventDefault();

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
      window.location.href = "hotelsPage.html";
    })
    .catch(function (error) {
      console.log("Error writting document: ", error);
    });
});
