// User's Location (Matara center as example)
const myCoords = { lat: 5.9549, lon: 80.5550 };

const donors = [
    { name: "Asanka Silva", type: "O+", distance: 0, lat: 5.9480, lon: 80.5400, category: "blood" },
    { name: "Nimna Rathnayake", type: "A-", distance: 0, lat: 6.0367, lon: 80.2170, category: "blood" },
    { name: "Oxygen Supply Ltd", type: "Industrial", distance: 0, lat: 5.9600, lon: 80.5600, category: "oxygen" },
    { name: "City Care Oxygen", type: "Medical", distance: 0, lat: 5.9400, lon: 80.5800, category: "oxygen" },
    { name: "Kasun Perera", type: "B+", distance: 0, lat: 5.9700, lon: 80.5300, category: "blood" }
];

// Haversine Formula to calculate distance between two points
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function renderDonors(filter = "blood") {
    const list = document.getElementById('donorList');
    
    // 1. Calculate distance for all donors
    donors.forEach(d => {
        d.distance = calculateDistance(myCoords.lat, myCoords.lon, d.lat, d.lon);
    });

    // 2. Sort by distance (Nearest first)
    const filtered = donors
        .filter(d => d.category === filter)
        .sort((a, b) => a.distance - b.distance);

    // 3. Display in UI
    list.innerHTML = filtered.map(d => `
        <div class="donor-item">
            <div class="donor-info">
                <h4>${d.name}</h4>
                <small>${d.type} ${filter === 'blood' ? 'Group' : 'Grade'}</small>
            </div>
            <div class="dist-tag">${d.distance.toFixed(1)} km away</div>
            <button class="call-btn"><i class="fa-solid fa-phone"></i></button>
        </div>
    `).join('');
}

function sortDonors(cat) {
    // UI Toggle logic
    document.querySelectorAll('.tgl').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderDonors(cat);
}

// Initial Load
renderDonors();