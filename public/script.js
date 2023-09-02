document.addEventListener('DOMContentLoaded', () => {
document.querySelector('#fetchData').addEventListener('click', async () => {
const keyword = document.getElementById('keyword').value;
const tableBody = document.getElementById('tableBody');
const table = document.getElementById('table')
const loadingMessage = document.getElementById('loadingMessage');

// Show loading message
table.style.display = 'none';
loadingMessage.style.display = 'block';

// Fetch data from your /hashtags/:keyword endpoint
const response = await fetch(`/hashtags/${keyword}`);
const data = await response.json();

// Hide loading message
loadingMessage.style.display = 'none';
table.style.display = 'block';

// Update the heading with the retrieved keyword
document.querySelector('h2').textContent = `Top Hashtags for ${keyword}`;

// Update the table with retrieved data
tableBody.innerHTML = '';
data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${item.tag}</td>
    <td>${item.views}</td>
    <td>${item.user}</td>
    `;
    tableBody.appendChild(row);
});
});
});
