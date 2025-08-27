document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

         const loader = document.getElementById('loader');
    loader.style.display = 'flex'; // show loader

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      try {
        // const response = await fetch('https://medbot-fuyl.onrender.com/api/login', {
        const response = await fetch('https://medbot-fuyl.onrender.com/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
          loader.style.display = 'none'; // hide loader
          
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = 'dashboard.html';
        } else {
          alert(data.error);
        }
      } catch (error) {
        alert('Error logging in');
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      try {
        // const response = await fetch('https://medbot-fuyl.onrender.com/api/register', {
        const response = await fetch('https://medbot-fuyl.onrender.com/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
          window.location.href = 'index.html';
        } else {
          console.log('Server error:', data);
          alert(data.error);
        }
      } catch (error) {
        alert('Error signing up');
      }
    });
  }
});