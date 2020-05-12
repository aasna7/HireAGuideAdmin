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

const settings = { /* your settings... */ timestampsInSnapshots: true };
firebase1.settings(settings);

const posts = document.querySelector("#posts");

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
  let postGuide = document.createElement("p");
  let userGuide = document.createElement("p");
  let dateGuide = document.createElement("p");
  let dltBtn = document.createElement("button");

  var dateGet = doc.data().date;
  var time = dateGet.toDate();
  console.log(time);
  console.log(time.toDateString());

  if (doc.data().image == "") {
    imgGuide.style.display = "none";
  } else {
    imgGuide.src = doc.data().image;
    imgGuide.style.width = "140px";
    imgGuide.style.height = "180px";
    imgGuide.style.paddingRight = "10px";
  }

  postGuide.textContent = doc.data().post;
  userGuide.textContent = doc.data().userId;

  dateGuide.style.fontSize = "10px";
  dateGuide.textContent = "Posted on: " + time.toDateString();
  dltBtn.innerHTML = '<i class="fa fa-trash-o" aria-hidden="true"></i>';
  dltBtn.style.color = "white";
  dltBtn.style.backgroundColor = "red";
  dltBtn.style.borderRadius = "10px";

  dltBtn.addEventListener("click", function () {
    var confirmDelete = confirm("Are you sure you want to delete this detail?");
    if (confirmDelete == true) {
      let collectionRef = firebase1.collection("posts");

      collectionRef
        .where("postId", "==", doc.data().postId)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            doc.ref
              .delete()
              .then(() => {
                window.alert("Post deleted successfully!");
                console.log("Document successfully deleted!");
                window.location.href = "adminHome.html";
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

  divGuide.appendChild(postGuide);

  divGuide.appendChild(dateGuide);
  divGuide.appendChild(dltBtn);
  divImg.appendChild(imgGuide);

  imageCol.appendChild(divImg);
  detailsCol.appendChild(divGuide);

  row.appendChild(imageCol);
  row.appendChild(detailsCol);
  row.style.marginLeft = "10px";
  card.appendChild(row);
  card.style.marginBottom = "20px";

  posts.appendChild(card);
}

firebase1
  .collection("posts")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      renderUser(doc);
    });
  });
