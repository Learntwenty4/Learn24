// Function triggered by your "Enroll Now" button
function showBatchFullPopup() {
    document.getElementById("batchFullPopup").style.display = "flex";
}

// Function triggered by the close buttons in the popup
function closePopup() {
    document.getElementById("batchFullPopup").style.display = "none";
}

// Optional: Close the popup if the user clicks anywhere outside of the white box
window.onclick = function(event) {
    const popup = document.getElementById("batchFullPopup");
    if (event.target === popup) {
        popup.style.display = "none";
    }
};