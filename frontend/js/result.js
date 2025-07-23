document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('token')) {
    window.location.href = 'index.html';
  }

  const prescription = JSON.parse(localStorage.getItem('prescription'));
  if (!prescription) {
    window.location.href = 'dashboard.html';
  }

  document.getElementById('diagnosis').textContent = prescription.diagnosis;
  const medicines = document.getElementById('medicines');
  const precautions = document.getElementById('precautions');
  const diet = document.getElementById('diet');
  const tests = document.getElementById('tests');

  prescription.prescription.medicines.forEach((med) => {
    const li = document.createElement('li');
    li.textContent = `${med.name} - ${med.dosage}`;
    medicines.appendChild(li);
  });
  prescription.prescription.precautions.forEach((pre) => {
    const li = document.createElement('li');
    li.textContent = pre;
    precautions.appendChild(li);
  });
  prescription.prescription.diet.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    diet.appendChild(li);
  });
  prescription.prescription.tests.forEach((test) => {
    const li = document.createElement('li');
    li.textContent = test;
    tests.appendChild(li);
  });

  const { jsPDF } = window.jspdf;
  document.getElementById('exportPDF').addEventListener('click', () => {
    const doc = new jsPDF();
    doc.text('MedBot Rx Prescription', 10, 10);
    doc.text(`Diagnosis: ${prescription.diagnosis}`, 10, 20);
    doc.text('Medicines:', 10, 30);
    prescription.prescription.medicines.forEach((med, i) => {
      doc.text(`${med.name} - ${med.dosage}`, 10, 40 + i * 10);
    });
    doc.text('Precautions:', 10, 40 + prescription.prescription.medicines.length * 10);
    prescription.prescription.precautions.forEach((pre, i) => {
      doc.text(pre, 10, 50 + prescription.prescription.medicines.length * 10 + i * 10);
    });
    doc.text('Diet Plan:', 10, 50 + prescription.prescription.medicines.length * 10 + prescription.prescription.precautions.length * 10);
    prescription.prescription.diet.forEach((item, i) => {
      doc.text(item, 10, 60 + prescription.prescription.medicines.length * 10 + prescription.prescription.precautions.length * 10 + i * 10);
    });
    doc.text('Lab Tests:', 10, 60 + prescription.prescription.medicines.length * 10 + prescription.prescription.precautions.length * 10 + prescription.prescription.diet.length * 10);
    prescription.prescription.tests.forEach((test, i) => {
      doc.text(test, 10, 70 + prescription.prescription.medicines.length * 10 + prescription.prescription.precautions.length * 10 + prescription.prescription.diet.length * 10 + i * 10);
    });
    doc.save('prescription.pdf');
  });

  document.getElementById('logout').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });

  document.getElementById('toggleDarkMode').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('toggleDarkMode').textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });
});