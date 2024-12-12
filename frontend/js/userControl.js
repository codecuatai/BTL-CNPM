// DOM Elements
const addUserBtn = document.getElementById('addUserBtn');
const userModal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');

// User Management
let users = [
    { id: 1, name: 'Admin User', email: 'admin@example.com', phone: '1234567890', password: 'password123', role: 'Quản trị viên', status: 'Hoạt động' },
    { id: 2, name: 'Regular User', email: 'user@example.com', phone: '0987654321',password: 'password456', role: 'Người dùng', status: 'Không hoạt động' }
];

// Render Users
function renderUsers(userList = users) {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = '';

    userList.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.password}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td class="action-buttons">
                <button class="btn-edit" onclick="editUser(${user.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="deleteUser(${user.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Add User
addUserBtn.addEventListener('click', () => {
    userModal.style.display = 'block';
    userForm.reset();
    document.querySelector('#userModal h2').textContent = 'Thêm tài khoản mới';
});

// Close modal
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
    });
});

// Form submission
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {
        id: users.length + 1,
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        password: document.getElementById('userPassword').value,
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value
    };

    // If editing an existing user
    const editUserId = document.getElementById('editUserId')?.value;
    if (editUserId) {
        const userIndex = users.findIndex(user => user.id == editUserId);
        users[userIndex] = { ...users[userIndex], ...formData };
    } else {
        // If adding a new user
        users.push(formData);
    }

    renderUsers();
    userModal.style.display = 'none';
    userForm.reset();
});

// Edit User
function editUser(id) {
    const user = users.find(u => u.id === id);
    if (user) {
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userPhone').value = user.phone;
        document.getElementById('userPassword').value = user.password;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userStatus').value = user.status;
        
        // Set user ID for edit
        const editUserIdInput = document.createElement('input');
        editUserIdInput.type = 'hidden';
        editUserIdInput.id = 'editUserId';
        editUserIdInput.value = user.id;
        userForm.appendChild(editUserIdInput);
        
        userModal.style.display = 'block';
        document.querySelector('#userModal h2').textContent = 'Chỉnh sửa tài khoản';
    }
}

// Delete User
function deleteUser(id) {
    if (confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) {
        users = users.filter(user => user.id !== id);
        renderUsers();
    }
}

// Initial render
renderUsers();

// Password visibility toggle
document.querySelector('.toggle-password').addEventListener('click', function() {
    const passwordField = document.getElementById('userPassword');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';  // Show password
    } else {
        passwordField.type = 'password';  // Hide password
    }
});
