document.addEventListener('DOMContentLoaded', async () => {
  if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
  }

  try {
    const response = await fetch('https://medbot-fuyl.onrender.com/api/history', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    const prescriptions = await response.json();
    const historyTable = document.getElementById('historyTable');
    prescriptions.forEach((pres) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${new Date(pres.created_at).toLocaleDateString()}</td>
        <td>${pres.diagnosis}</td>
        <td><button class="btn btn-danger btn-sm" onclick="deletePrescription(${pres.id})">Delete</button></td>
      `;
      historyTable.appendChild(row);
    });
  } catch (error) {
    alert('Error fetching history');
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });

  document.getElementById('toggleDarkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('toggleDarkMode').textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });
});

async function deletePrescription(id) {
  try {
    const response = await fetch(`https://medbot-fuyl.onrender.com/api/prescriptions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      alert('Error deleting prescription');
    }
  } catch (error) {
    alert('Error deleting prescription');
  }
}