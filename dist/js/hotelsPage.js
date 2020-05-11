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
const secondCol = document.querySelector("#secondCol");
const addhotelsplaces = document.querySelector(".addhotelsplaces");
const editHotelForm = document.querySelector(".edithotel-form");
const editPlaceForm = document.querySelector(".editplace-form");

const hotelNameEdit = document.querySelector("#hotel_nameedit");
const hotelLocationEdit = document.querySelector("#hotel_locationedit");
const hotelPhoneEdit = document.querySelector("#hotel_phoneedit");
const hotelPriceEdit = document.querySelector("#hotel_priceedit");
const hotelRatingsEdit = document.querySelector("#hotel_ratingsedit");
const hotelDescriptionEdit = document.querySelector("#hotel_descriptionedit");
const editHotelBtn = document.querySelector("#edithotelbtn");
const cancelHotelBtn = document.querySelector("#cancelhotelbtn");

const placeNameEdit = document.querySelector("#place_nameedit");
const placeLocationEdit = document.querySelector("#place_locationedit");
const placePhoneEdit = document.querySelector("#place_phoneedit");
const placePriceEdit = document.querySelector("#place_priceedit");
const placeRatingsEdit = document.querySelector("#place_ratingsedit");
const placeDescriptionEdit = document.querySelector("#place_descriptionedit");
const editPlaceBtn = document.querySelector("#editplacebtn");
const cancelPlaceBtn = document.querySelector("#cancelplacebtn");

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
  let hotelPhoneList = document.createElement("p");
  let hotelPriceList = document.createElement("p");
  let hotelRatingsList = document.createElement("p");
  let hotelDescriptionList = document.createElement("p");
  let editHotelDetails = document.createElement("button");
  let deleteHotelDetails = document.createElement("button");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");
  hotelNameList.textContent = "Hotel Name: " + doc.data().name;
  hotelLocationList.textContent = "Hotel Location: " + doc.data().location;
  hotelPhoneList.textContent = "Hotel Phone: " + doc.data().phone;
  hotelPriceList.textContent = "HotelPrice: " + doc.data().price;
  hotelRatingsList.textContent = "Hotel Rating: " + doc.data().rating;
  hotelDescriptionList.textContent =
    "Hotel Description: " + doc.data().description;
  editHotelDetails.innerHTML = "Edit";
  editHotelDetails.style.fontWeight = "bold";
  editHotelDetails.style.marginRight = "10px";
  editHotelDetails.style.width = "80px";
  editHotelDetails.style.height = "30px";
  deleteHotelDetails.innerHTML = "Delete";
  deleteHotelDetails.style.fontWeight = "bold";
  deleteHotelDetails.style.width = "80px";
  deleteHotelDetails.style.height = "30px";
  imgHotelList.src = doc.data().images[0];
  imgHotelList.style.width = "120px";
  imgHotelList.style.height = "140px";
  imgHotelList.style.paddingRight = "10px";

  editHotelDetails.addEventListener("click", function () {
    addhotelsplaces.style.display = "none";
    editPlaceForm.style.display = "none";
    editHotelForm.style.display = "block";
    hotelNameEdit.value = doc.data().name;
    hotelLocationEdit.value = doc.data().location;
    hotelPhoneEdit.value = doc.data().phone;
    hotelPriceEdit.value = doc.data().price;
    hotelRatingsEdit.value = doc.data().rating;
    hotelDescriptionEdit.value = doc.data().description;
    editHotelBtn.addEventListener("click", function (e) {
      firebase1
        .collection("hotelandplaces")
        .doc(doc.id)
        .update({
          name: hotelNameEdit.value,
          location: hotelLocationEdit.value,
          phone: hotelPhoneEdit.value,
          price: hotelPriceEdit.value,
          rating: hotelRatingsEdit.value,
          description: hotelDescriptionEdit.value,
        })
        .then(() => {
          window.alert("Success", "Details Updated!");
          addhotelsplaces.style.display = "block";
          editPlaceForm.style.display = "none";
          editHotelForm.style.display = "none";
          window.href = "hotelsPage.html";
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    cancelHotelBtn.addEventListener("click", function () {
      addhotelsplaces.style.display = "block";
      editPlaceForm.style.display = "none";
      editHotelForm.style.display = "none";
    });
  });
  deleteHotelDetails.addEventListener("click", function () {
    var confirmDelete = confirm("Are you sure you want to delete this detail?");
    if (confirmDelete == true) {
      let collectionRef = firebase1.collection("hotelandplaces");

      collectionRef
        .where("name", "==", doc.data().name)
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
  divGuide.appendChild(hotelPhoneList);
  divGuide.appendChild(hotelPriceList);
  divGuide.appendChild(hotelRatingsList);
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
  row.style.marginLeft = "10px";
  card.appendChild(row);
  hotelList.appendChild(card);
}

firebase1
  .collection("hotelandplaces")
  .where("type", "==", "hotel")
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
  let placePhoneList = document.createElement("p");
  let placePriceList = document.createElement("p");
  let placeRatingsList = document.createElement("p");
  let placeDescriptionList = document.createElement("p");
  let editPlaceDetails = document.createElement("button");
  let deletePlaceDetails = document.createElement("button");
  let brLine = document.createElement("br");
  let hrLine = document.createElement("hr");
  placeNameList.textContent = "Place Name: " + doc.data().name;
  placeLocationList.textContent = "Place Location: " + doc.data().location;
  placeDescriptionList.textContent =
    "Place Description: " + doc.data().description;
  placePhoneList.textContent = "Place Phone No.: " + doc.data().phone;
  placePriceList.textContent = "Place Price: " + doc.data().price;
  placeRatingsList.textContent = "Rating: " + doc.data().rating;
  editPlaceDetails.innerHTML = "Edit";
  editPlaceDetails.style.marginRight = "10px";
  deletePlaceDetails.innerHTML = "Delete";
  imgPlaceList.src = doc.data().images[0];
  imgPlaceList.style.width = "120px";
  imgPlaceList.style.height = "140px";
  imgPlaceList.style.paddingRight = "10px";

  editPlaceDetails.addEventListener("click", function () {
    addhotelsplaces.style.display = "none";
    editHotelForm.style.display = "none";
    editPlaceForm.style.display = "block";
    placeNameEdit.value = doc.data().name;
    placeLocationEdit.value = doc.data().location;
    placePhoneEdit.value = doc.data().phone;
    placePriceEdit.value = doc.data().price;
    placeRatingsEdit.value = doc.data().rating;
    placeDescriptionEdit.value = doc.data().description;
    editPlaceBtn.addEventListener("click", function (e) {
      firebase1
        .collection("hotelandplaces")
        .doc(doc.id)
        .update({
          name: placeNameEdit.value,
          location: placeLocationEdit.value,
          phone: placePhoneEdit.value,
          price: placePriceEdit.value,
          rating: placeRatingsEdit.value,
          description: placeDescriptionEdit.value,
        })
        .then(() => {
          window.alert("Details Updated!");
          addhotelsplaces.style.display = "block";
          editHotelForm.style.display = "none";
          editPlaceForm.style.display = "none";
          window.href = "hotelsPage.html";
        })
        .catch(function (error) {
          console.log(error);
        });
    });
    cancelPlaceBtn.addEventListener("click", function () {
      addhotelsplaces.style.display = "block";
      editHotelForm.style.display = "none";
      editPlaceForm.style.display = "none";
    });
  });
  deletePlaceDetails.addEventListener("click", function () {
    var confirmDelete = confirm("Are you sure you want to delete this detail?");
    if (confirmDelete == true) {
      let collectionRef = firebase1.collection("hotelandplaces");

      collectionRef
        .where("placeName", "==", doc.data().name)
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

  divPlace.appendChild(placeNameList);
  divPlace.appendChild(placeLocationList);
  divPlace.appendChild(placePhoneList);
  divPlace.appendChild(placePriceList);
  divPlace.appendChild(placeRatingsList);
  divPlace.appendChild(placeDescriptionList);
  divPlace.appendChild(editPlaceDetails);
  divPlace.appendChild(deletePlaceDetails);
  divImgPlace.appendChild(imgPlaceList);

  imageColPlace.appendChild(divImgPlace);
  detailsColPlace.appendChild(divPlace);
  rowPlace.appendChild(imageColPlace);
  rowPlace.appendChild(detailsColPlace);
  rowPlace.style.marginLeft = "10px";
  rowPlace.style.marginRight = "10px";
  card.appendChild(rowPlace);
  placeList.appendChild(card);
}

firebase1
  .collection("hotelandplaces")
  .where("type", "==", "place")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderUser1(doc);
    });
  });

const hotelForm = document.querySelector("#addHotelForm");
const hotelName = document.querySelector("#hotel_name");
const hotelLocation = document.querySelector("#hotel_location");
const hotelPhone = document.querySelector("#hotel_phone");
const hotelPrice = document.querySelector("#hotel_price");
const hotelRatings = document.querySelector("#hotel_ratings");
const hotelDescription = document.querySelector("#hotel_description");
const hotelImage = document.querySelector("#hotel_image");
const addHotelBtn = document.querySelector("#addhotelbtn");

var imageHotelURL;
var imagePlaceURL;

const placeForm = document.querySelector("addPlaceForm");
const placeName = document.querySelector("#place_name");
const placeLocation = document.querySelector("#place_location");
const placePhone = document.querySelector("#place_phone");
const placePrice = document.querySelector("#place_price");
const placeRatings = document.querySelector("#place_ratings");
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
      alert("Error adding image");
    });
});

placeImage.addEventListener("change", function (e) {
  var file = e.target.files[0];
  var storageref = firestorage.ref("placeImages/" + file.name);
  var refer = storageref.put(file);
  refer.snapshot.ref
    .getDownloadURL()
    .then(function (downloadURL) {
      console.log("File available at", downloadURL);
      imagePlaceURL = downloadURL;
    })
    .catch(function (error) {
      console.log(error);
      alert("Error adding image");
    });
});

addHotelBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const hotelName_ = hotelName.value;
  const hotelLocation_ = hotelLocation.value;
  const hotelPhone_ = hotelPhone.value;
  const hotelPrice_ = hotelPrice.value;
  const hotelRatings_ = hotelRatings.options[hotelRatings.selectedIndex].value;
  const hotelDescription_ = hotelDescription.value;
  const hotelImage_ = imageHotelURL;
  console.log("working till here");
  console.log("image link is: " + imageHotelURL);
  if (
    !hotelName_ ||
    !hotelLocation_ ||
    !hotelDescription_ ||
    !hotelImage_ ||
    !hotelPhone_ ||
    !hotelPrice_
  ) {
    window.alert("Please fill all the fields!");
  } else {
    firebase1
      .collection("hotelandplaces")
      .doc()
      .set({
        name: hotelName_,
        location: hotelLocation_,
        phone: hotelPhone_,
        price: hotelPrice_,
        rating: hotelRatings_,
        description: hotelDescription_,
        images: [hotelImage_],
        type: "hotel",
      })
      .then(function () {
        console.log("Document successfully written!");
        window.alert("Hotel added successfully!");
        window.location.href = "hotelsPage.html";
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
});

addPlaceBtn.addEventListener("click", function (e) {
  e.preventDefault();

  const placeName_ = placeName.value;
  const placeLocation_ = placeLocation.value;
  const placePhone_ = placePhone.value;
  const placePrice_ = placePrice.value;
  const placeRatings_ = placeRatings.options[placeRatings.selectedIndex].value;
  const placeDescription_ = placeDescription.value;
  if (!placeName_ || !placeLocation_ || !placeDescription_) {
    window.alert("Please fill all the fields!");
  } else {
    firebase1
      .collection("hotelandplaces")
      .doc()
      .set({
        name: placeName_,
        location: placeLocation_,
        phone: placePhone_,
        price: placePrice_,
        rating: placeRatings_,
        description: placeDescription_,
        images: [imagePlaceURL],
        type: "place",
      })
      .then(function () {
        console.log("Document successfully written!");
        window.alert("Place added successfully!");
      })
      .catch(function (error) {
        console.log("Error writting document: ", error);
      });
  }
});
