document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
  }

  const diagnoseForm = document.getElementById('diagnoseForm');
  const logout = document.getElementById('logout');
  const toggleDarkMode = document.getElementById('toggleDarkMode');

  diagnoseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const diagnosis = document.getElementById('diagnosis').value;
    try {
      const response = await fetch('https://medbot-fuyl.onrender.com/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ diagnosis }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('prescription', JSON.stringify(data));
        window.location.href = 'result.html';
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert('Error generating prescription');
    }
  });

  logout.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });

  toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleDarkMode.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });
});
console.log('Token sent in request:', localStorage.getItem('token'));
