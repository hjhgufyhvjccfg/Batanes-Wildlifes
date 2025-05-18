const modal = document.getElementById("infoModal");
const closeButton = document.getElementById("closeModal");
const galleryImages = document.querySelectorAll(".gallery-img");

let speciesMap; // To store the map instance

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    // Set modal content
   document.getElementById("modalSpeciesImage").src = img.src;
document.getElementById("speciesName").textContent = img.dataset.name;
document.getElementById("scientificName").textContent = img.dataset.scientific;
document.getElementById("habitat").textContent = img.dataset.habitat;
document.getElementById("status").textContent = img.dataset.status;
document.getElementById("location").textContent = img.dataset.location;
document.getElementById("description").textContent = img.dataset.description;  // This line adds the description

  const lat = parseFloat(img.dataset.lat);
    const lng = parseFloat(img.dataset.lng);

    modal.classList.add("show");

    setTimeout(() => {
      if (speciesMap) {
        speciesMap.remove();
      }

      speciesMap = L.map("speciesMap").setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(speciesMap);

      L.marker([lat, lng]).addTo(speciesMap)
        .bindPopup(`${img.dataset.name} (${img.dataset.scientific})`)
        .openPopup();

      // ✅ Fix centering after render
      setTimeout(() => {
        speciesMap.invalidateSize();
        speciesMap.setView([lat, lng], 13); // 🔁 Recenter map
      }, 100); // shorter delay works fine

    }, 350); // ensure modal is visible first
  });
});

closeButton.addEventListener("click", () => {
  modal.classList.remove("show");

  // Remove map when closing
  if (speciesMap) {
    speciesMap.remove();
    speciesMap = null;
  }
});

// Optional: close modal when clicking outside content
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    if (speciesMap) {
      speciesMap.remove();
      speciesMap = null;
    }
  }
});
