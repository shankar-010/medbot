document.addEventListener('DOMContentLoaded', async () => {
  if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
  }

  const historyTable = document.getElementById('historyTable');

  try {
    const response = await fetch('http://localhost:5000/api/history', {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch history');
    }

    const prescriptions = await response.json();

    if (prescriptions.length === 0) {
      historyTable.innerHTML = `<tr><td colspan="6" class="text-center">No past consultations found</td></tr>`;
      return;
    }

    prescriptions.forEach((pres) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${new Date(pres.created_at).toLocaleString()}</td>
        <td>${pres.diagnosis || "N/A"}</td>
        <td>${pres.medicines || "N/A"}</td>
        <td>${pres.precautions || "N/A"}</td>
        <td>${pres.diet || "N/A"}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deletePrescription(${pres.id})">Delete</button>
        </td>
      `;
      historyTable.appendChild(row);
    });
  } catch (error) {
    alert('Error fetching history');
    console.error(error);
  }

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
});

async function deletePrescription(id) {
  if (!confirm("Are you sure you want to delete this record?")) return;

  try {
    const response = await fetch(`http://localhost:5000/api/prescriptions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
    });

    if (response.ok) {
      alert("Record deleted successfully!");
      window.location.reload();
    } else {
      alert('Error deleting prescription');
    }
  } catch (error) {
    alert('Error deleting prescription');
    console.error(error);
  }
}
