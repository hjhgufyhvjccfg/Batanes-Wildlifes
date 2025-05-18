// Search Functionality
    document.getElementById('searchInput').addEventListener('input', function(event) {
      const query = event.target.value.toLowerCase();
      const items = document.querySelectorAll('.gallery-item');
      
      items.forEach(function(item) {
        const name = item.getAttribute('data-name').toLowerCase();
        const scientific = item.getAttribute('data-scientific').toLowerCase();
        const habitat = item.getAttribute('data-habitat').toLowerCase();
        const status = item.getAttribute('data-status').toLowerCase();
        const location = item.getAttribute('data-location').toLowerCase();
        const description = item.getAttribute('data-description').toLowerCase();
        
        // Check if query matches any of the fields
        if (name.includes(query) || scientific.includes(query) || habitat.includes(query) || status.includes(query) || location.includes(query) || description.includes(query)) {
          item.style.display = 'block'; // Show item
        } else {
          item.style.display = 'none'; // Hide item
        }
      });
    });