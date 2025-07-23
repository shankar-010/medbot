# 📋 MedBot Rx

**AI-Powered Medical Prescription Generator**

MedBot Rx is a full-stack AI-based web application that allows users to input their diagnosis or symptoms and receive personalized medical prescriptions. The app integrates with the OpenAI or Gemini API to generate structured outputs, including suggested medicines, dosages, precautions, diet recommendations, and lab tests.

---

## 🔧 Tech Stack

### 🚀 Backend:

* Node.js
* Express.js
* PostgreSQL
* JWT for authentication
* Gemini API integration

### 🌐 Frontend:

* HTML
* CSS
* Bootstrap
* JavaScript

---

## 📦 Features

* User authentication (Sign up / Login)
* Submit symptoms or diagnosis
* AI-generated prescription with:

  * Medicines (name + dosage)
  * Diet recommendations
  * Precautions
  * Suggested lab tests
* Save and view prescription history
* Delete specific records
* Responsive UI

---

## 📁 Folder Structure

```
medbot-rx/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── dashboard.html
│   ├── history.html
│   ├── css/
│   ├── js/
└── README.md
```

---

## 🛠️ Setup Instructions

### 🖥 Backend Setup:

```bash
cd backend
npm install
# Create a .env file with PORT, DB credentials, JWT_SECRET, and API_KEY
node server.js
```

### 🌐 Frontend Setup:

Just open `index.html` (or deploy frontend using Netlify / GitHub Pages).

---

## 🔐 API Routes

| Method | Route             | Description                      |
| ------ | ----------------- | -------------------------------- |
| POST   | /api/register     | Register a new user              |
| POST   | /api/login        | Login and get JWT token          |
| POST   | /api/diagnose     | Submit diagnosis for AI response |
| GET    | /api/history      | Get all saved prescriptions      |
| DELETE | /api/history/\:id | Delete a specific entry          |

---

## 🧪 Enhancements

* PDF export of prescription
* Dark mode toggle
* Mobile responsive design

---

## 🤖 Created By Shankar Namaji

Built a healthcare-focused AI project to enhance accessibility and support personalized medicine using AI APIs.
