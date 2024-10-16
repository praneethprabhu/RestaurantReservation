// Firebase configuration (replace with your Firebase config object)
const firebaseConfig = {
  apiKey: "AIzaSyAZuDMVVxvX0u8lDSbQnF-NK8nX1i_WZxs",
  authDomain: "restaurantreservation-2024.firebaseapp.com",
  projectId: "restaurantreservation-2024",
  storageBucket: "restaurantreservation-2024.appspot.com",
  messagingSenderId: "1028337284887",
  appId: "1:1028337284887:web:a8dbd590e77f75fd29a952"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Handle form submission
document.getElementById("reservation-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const guests = document.getElementById("guests").value;
  const time = document.getElementById("time").value;

  // Add reservation to Firestore
  db.collection("reservations").add({
    name: name,
    guests: parseInt(guests),
    time: time,
    status: "active",
  }).then(() => {
    alert("Reservation made successfully!");
    document.getElementById("reservation-form").reset();
  }).catch((error) => {
    console.error("Error adding reservation: ", error);
  });
});