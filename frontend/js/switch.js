document.getElementById('userNav').addEventListener('click', () => {
    document.getElementById('userSection').style.display = 'block';
    document.getElementById('tourSection').style.display = 'none';
});

document.getElementById('tourNav').addEventListener('click', () => {
    document.getElementById('tourSection').style.display = 'block';
    document.getElementById('userSection').style.display = 'none';
});

document.getElementById('logoutNav').addEventListener('click', () => {
    window.location.href = 'login.html';
});
