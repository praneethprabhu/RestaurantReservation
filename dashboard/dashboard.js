// Firebase configuration (same as the customer side)
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

// Real-time listener for reservations
db.collection("reservations").where("status", "==", "active")
  .onSnapshot((snapshot) => {
    const reservationList = document.getElementById("reservation-list");
    reservationList.innerHTML = ""; // Clear the list

    snapshot.forEach((doc) => {
      const reservation = doc.data();
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${reservation.name}</strong> - ${reservation.time} - ${reservation.guests} Guests
        <button onclick="markAsCompleted('${doc.id}')">Mark as Completed</button>
      `;
      reservationList.appendChild(li);
    });
  });

// Mark reservation as completed
function markAsCompleted(id) {
  db.collection("reservations").doc(id).update({
    status: "completed",
  }).then(() => {
    alert("Reservation marked as completed.");
  }).catch((error) => {
    console.error("Error updating reservation: ", error);
  });
}