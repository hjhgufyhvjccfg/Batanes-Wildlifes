

const modal = document.getElementById("infoModal");
const closeButton = document.getElementById("closeModal");
const galleryImages = document.querySelectorAll(".gallery-img");

let speciesMap; // To store the map instance

// 🔍 Combined search filter function
function filterGallery() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    const img = item.querySelector('img');
    const name = img.dataset.name.toLowerCase();
    const scientific = img.dataset.scientific.toLowerCase();
    const location = img.dataset.location.toLowerCase();
    const status = img.dataset.status.toLowerCase();
    const habitat = img.dataset.habitat.toLowerCase();
    const description = img.dataset.description.toLowerCase();

    const matches = name.includes(input) ||
                    scientific.includes(input) ||
                    location.includes(input) ||
                    status.includes(input) ||
                    habitat.includes(input) ||
                    description.includes(input);

    item.style.display = matches ? 'block' : 'none';
  });
}

// 🔄 Attach search input and button events
document.getElementById('searchInput').addEventListener('input', filterGallery);
document.getElementById('searchInput').addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    filterGallery();
  }
});

const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
  searchBtn.addEventListener('click', filterGallery);
}

galleryImages.forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("modalSpeciesImage").src = img.src;
    document.getElementById("speciesName").textContent = img.dataset.name;
    document.getElementById("scientificName").textContent = img.dataset.scientific;
    document.getElementById("habitat").textContent = img.dataset.habitat;
    document.getElementById("status").textContent = img.dataset.status;
    document.getElementById("location").textContent = img.dataset.location;
    document.getElementById("description").textContent = img.dataset.description;
    document.getElementById("lat").textContent = img.dataset.lat || "N/A";
    document.getElementById("lng").textContent = img.dataset.lng || "N/A";

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


// ❌ Close modal
closeButton.addEventListener("click", () => {
  modal.classList.remove("show");
  if (speciesMap) {
    speciesMap.remove();
    speciesMap = null;
  }
});

// ❌ Close on background click
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("show");
    if (speciesMap) {
      speciesMap.remove();
      speciesMap = null;
    }
  }
});
