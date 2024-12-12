// Quản lý danh sách tour
const tours = [
    { id: 1, tourName: 'Tour Khám Phá Hà Nội', destination: 'Hà Nội, Việt Nam', duration: 5, price: 200, description: 'Khám phá các điểm du lịch nổi tiếng tại Hà Nội.', status: 'Đã đặt' },
    { id: 2, tourName: 'Tour Khám Phá Sapa', destination: 'Sapa, Việt Nam', duration: 3, price: 150, description: 'Khám phá vẻ đẹp núi non Sapa.', status: 'Đang diễn ra' },
    { id: 3, tourName: 'Tour Du Lịch Đà Nẵng', destination: 'Đà Nẵng, Việt Nam', duration: 4, price: 180, description: 'Khám phá thành phố biển Đà Nẵng.', status: 'Đã hủy' }
];

// Các hàm quản lý tour
function getAllTours() {
    return tours;
}

function modifyTour(id, updatedTour) {
    const tour = tours.find(t => t.id === id);
    if (tour) {
        Object.assign(tour, updatedTour);
    } else {
        addTour(updatedTour);
    }
    return tour || updatedTour;
}

function addTour(tour) {
    const newTour = { ...tour, id: tours.length + 1 };
    tours.push(newTour);
    return newTour;
}

function deleteTour(id) {
    const index = tours.findIndex(tour => tour.id === id);
    if (index !== -1) {
        tours.splice(index, 1);
    }
}

function getTourById(id) {
    return tours.find(tour => tour.id === id);
}

// Quản lý giao diện người dùng
const elements = {
    modal: document.getElementById('tourModal'),
    tourForm: document.getElementById('tourForm'),
    addTourBtn: document.getElementById('addTourBtn'),
    closeBtn: document.getElementsByClassName('close')[0],
    tourTableBody: document.getElementById('tourTableBody')
};

// Cài đặt sự kiện
function setupEventListeners() {
    elements.addTourBtn.onclick = () => showModal();
    elements.closeBtn.onclick = () => hideModal();
    elements.tourForm.onsubmit = (e) => handleFormSubmit(e);
    window.onclick = (e) => {
        if (e.target === elements.modal) hideModal();
    };
}

// Hiển thị danh sách tour
function displayTours(filteredTours = tours) {
    elements.tourTableBody.innerHTML = filteredTours.map(tour => ` 
        <tr>
            <td>${tour.id}</td>
            <td>${tour.tourName}</td>
            <td>${tour.destination}</td>
            <td>${tour.duration} days</td>
            <td>${tour.price} VNĐ</td>
            <td>${tour.description}</td>
            <td>${tour.status}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editTour(${tour.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteTourHandler(${tour.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Hiển thị modal (thêm hoặc sửa tour)
function showModal(tour = null) {
    elements.modal.style.display = 'block';
    elements.tourForm.reset();

    if (tour) {
        document.getElementById('tourName').value = tour.tourName;
        document.getElementById('destination').value = tour.destination;
        document.getElementById('duration').value = tour.duration;
        document.getElementById('price').value = tour.price;
        document.getElementById('status').value = tour.status;
        document.getElementById('description').value = tour.description;
        elements.tourForm.dataset.tourId = tour.id;
    } else {
        delete elements.tourForm.dataset.tourId;
    }
}

// Đóng modal
function hideModal() {
    elements.modal.style.display = 'none';
}

// Xử lý khi gửi form
function handleFormSubmit(e) {
    e.preventDefault();

    const tourData = {
        tourName: document.getElementById('tourName').value,
        destination: document.getElementById('destination').value,
        duration: parseInt(document.getElementById('duration').value, 10),
        price: parseFloat(document.getElementById('price').value),
        status: document.getElementById('status').value,
        description: document.getElementById('description').value,
    };

    const tourId = parseInt(elements.tourForm.dataset.tourId, 10);

    if (tourId) {
        modifyTour(tourId, tourData);
    } else {
        addTour(tourData);
    }

    displayTours();
    hideModal();
}

// Chỉnh sửa tour
function editTour(id) {
    const tour = getTourById(id);
    if (tour) showModal(tour);
}

// Xóa tour
function deleteTourHandler(id) {
    if (confirm('Are you sure you want to delete this tour?')) {
        deleteTour(id);
        displayTours();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    displayTours();  // Hiển thị danh sách tour mặc định
});
