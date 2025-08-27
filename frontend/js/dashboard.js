document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
  }

  const diagnoseForm = document.getElementById('diagnoseForm');
  const logout = document.getElementById('logout');
const profileLink = document.getElementById('profileLink');
  const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
  const saveProfileBtn = document.getElementById('saveProfile');
  const profileAlert = document.getElementById('profileAlert');

  
  // Load profile from localStorage (if exists)
  const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
  if (savedProfile) {
    document.getElementById('age').value = savedProfile.age || '';
    document.getElementById('gender').value = savedProfile.gender || '';
    document.getElementById('conditions').value = savedProfile.conditions || '';
  } else {
    // Show alert if profile not filled
    profileAlert.style.display = 'block';
  }

  // Open profile modal when navbar link clicked
  profileLink.addEventListener('click', (e) => {
    e.preventDefault();
    profileModal.show();
  });

  // Save profile
  saveProfileBtn.addEventListener('click', () => {
    const age = document.getElementById('age').value.trim();
    const gender = document.getElementById('gender').value;
    const conditions = document.getElementById('conditions').value.trim();

    if (!age || !gender) {
      alert('Please fill age and gender to save profile.');
      return;
    }

    const profileData = { age, gender, conditions };
    localStorage.setItem('userProfile', JSON.stringify(profileData));

    profileModal.hide();
    profileAlert.style.display = 'none'; // hide alert after profile saved
    alert('Profile saved successfully!');
  });

  diagnoseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

      const loader = document.getElementById('loader');
  loader.style.display = 'flex'; // show loader

    const diagnosis = document.getElementById('diagnosis').value;
    try {
      const response = await fetch('http://localhost:5000/api/diagnose', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ diagnosis }),
      });
      const data = await response.json();
       loader.style.display = 'none'; // hide loader
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
});

console.log('Token sent in request:', localStorage.getItem('token'));


//////////////////////

// document.addEventListener('DOMContentLoaded', () => {
//   if (!localStorage.getItem('token')) {
//     window.location.href = 'index.html';
//   }

//   const diagnoseForm = document.getElementById('diagnoseForm');
//   const logout = document.getElementById('logout');
// const profileLink = document.getElementById('profileLink');
//   const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
//   const saveProfileBtn = document.getElementById('saveProfile');
//   const profileAlert = document.getElementById('profileAlert');

  
//   // Load profile from localStorage (if exists)
//   const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
//   if (savedProfile) {
//     document.getElementById('age').value = savedProfile.age || '';
//     document.getElementById('gender').value = savedProfile.gender || '';
//     document.getElementById('conditions').value = savedProfile.conditions || '';
//   } else {
//     // Show alert if profile not filled
//     profileAlert.style.display = 'block';
//   }

//   // Open profile modal when navbar link clicked
//   profileLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     profileModal.show();
//   });

//   // Save profile
//   saveProfileBtn.addEventListener('click', () => {
//     const age = document.getElementById('age').value.trim();
//     const gender = document.getElementById('gender').value;
//     const conditions = document.getElementById('conditions').value.trim();

//     if (!age || !gender) {
//       alert('Please fill age and gender to save profile.');
//       return;
//     }

//     const profileData = { age, gender, conditions };
//     localStorage.setItem('userProfile', JSON.stringify(profileData));

//     profileModal.hide();
//     profileAlert.style.display = 'none'; // hide alert after profile saved
//     alert('Profile saved successfully!');
//   });

//   diagnoseForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//       const loader = document.getElementById('loader');
//   loader.style.display = 'flex'; // show loader

//     const diagnosis = document.getElementById('diagnosis').value;
//     try {
//       const response = await fetch('http://localhost:5000/api/diagnose', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ diagnosis }),
//       });
//       const data = await response.json();
//        loader.style.display = 'none'; // hide loader
//       if (response.ok) {
//         localStorage.setItem('prescription', JSON.stringify(data));
//         window.location.href = 'result.html';
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       alert('Error generating prescription');
//     }
//   });

//   logout.addEventListener('click', () => {
//     localStorage.removeItem('token');
//     window.location.href = 'index.html';
//   });
// });

// console.log('Token sent in request:', localStorage.getItem('token'));
///////////////////
// document.addEventListener('DOMContentLoaded', () => {
//   if (!localStorage.getItem('token')) {
//     window.location.href = 'index.html';
//   }

//   const diagnoseForm = document.getElementById('diagnoseForm');
//   const logout = document.getElementById('logout');
//   const profileLink = document.getElementById('profileLink');
//   const profileModal = new bootstrap.Modal(document.getElementById('profileModal'));
//   const saveProfileBtn = document.getElementById('saveProfile');
//   const profileAlert = document.getElementById('profileAlert');

//   // Load profile from localStorage (if exists)
//   const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
//   if (savedProfile) {
//     document.getElementById('age').value = savedProfile.age || '';
//     document.getElementById('gender').value = savedProfile.gender || '';
//     document.getElementById('conditions').value = savedProfile.conditions || '';
//   } else {
//     // Show alert if profile not filled
//     profileAlert.style.display = 'block';
//   }

//   // Open profile modal when navbar link clicked
//   profileLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     profileModal.show();
//   });

//   // Save profile
//   saveProfileBtn.addEventListener('click', () => {
//     const age = document.getElementById('age').value.trim();
//     const gender = document.getElementById('gender').value;
//     const conditions = document.getElementById('conditions').value.trim();

//     if (!age || !gender) {
//       alert('Please fill age and gender to save profile.');
//       return;
//     }

//     const profileData = { age, gender, conditions };
//     localStorage.setItem('userProfile', JSON.stringify(profileData));

//     profileModal.hide();
//     profileAlert.style.display = 'none'; // hide alert after profile saved
//     alert('Profile saved successfully!');
//   });

//   // Submit symptoms form
//   diagnoseForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const loader = document.getElementById('loader');
//     loader.style.display = 'flex'; // show loader

//     const diagnosis = document.getElementById('diagnosis').value;
//     const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};

//     try {
//       const response = await fetch('http://localhost:5000/api/diagnose', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}`,
//         },
//         body: JSON.stringify({ diagnosis, profile: userProfile }),
//       });
//       const data = await response.json();
//       loader.style.display = 'none'; // hide loader

//       if (response.ok) {
//         localStorage.setItem('prescription', JSON.stringify(data));
//         window.location.href = 'result.html';
//       } else {
//         alert(data.error);
//       }
//     } catch (error) {
//       loader.style.display = 'none';
//       alert('Error generating prescription');
//     }
//   });

//   // Logout
//   logout.addEventListener('click', () => {
//     localStorage.removeItem('token');
//     window.location.href = 'index.html';
//   });
// });

// console.log('Token sent in request:', localStorage.getItem('token'));
