document.addEventListener('DOMContentLoaded', () => {
  const toggleDarkMode = document.getElementById('toggleDarkMode');

  if (!toggleDarkMode) return; // Exit if no toggle button on page

  // ====== Apply saved theme on page load ======
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggleDarkMode.textContent = 'Light Mode';
  } else {
    toggleDarkMode.textContent = 'Dark Mode';
  }

  // ====== Toggle theme and save preference ======
  toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      toggleDarkMode.textContent = 'Light Mode';
    } else {
      localStorage.setItem('theme', 'light');
      toggleDarkMode.textContent = 'Dark Mode';
    }
  });
});
