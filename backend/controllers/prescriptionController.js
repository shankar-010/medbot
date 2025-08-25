const { GoogleGenerativeAI } = require('@google/generative-ai');
const pool = require('../config/db');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// const diagnose = async (req, res) => {
//     console.log('User from token:', req.user);
//   const { diagnosis } = req.body;
//   const userId = req.user.id;
//   console.log('Diagnose request:', { diagnosis, userId });
//   try {
//     if (!diagnosis) throw new Error('Diagnosis is required');
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
//     const prompt = `You are a medical assistant. Based on the provided diagnosis or symptoms, generate a structured prescription including medicines (name + dosage), precautions, diet plan, and lab tests (if needed). Return the response as valid JSON, e.g., {"medicines":[{"name":"Medicine","dosage":"Dosage"}],"precautions":["Precaution"],"diet":["Diet"],"tests":["Test"]}. Do not include markdown, backticks, or extra text. Diagnosis: ${diagnosis}`;
//     console.log('Sending prompt to Gemini:', prompt);
//     const result = await model.generateContent(prompt);
//     const responseText = result.response.text();
//     console.log('Gemini raw response:', responseText);
//     let prescription;
//     try {
//       prescription = JSON.parse(responseText.replace(/```json\n|```/g, '')); // Clean markdown
//     } catch (parseError) {
//       console.error('JSON parse error:', parseError);
//       throw new Error('Invalid JSON response from Gemini');
//     }
//     console.log('Parsed prescription:', prescription);
//     const dbResult = await pool.query(
//       'INSERT INTO prescriptions (user_id, diagnosis, prescription) VALUES ($1, $2, $3) RETURNING *',
//       [userId, diagnosis, prescription]
//     );
//     console.log('Database result:', dbResult.rows[0]);
//     res.json(dbResult.rows[0]);
//   } catch (error) {
//     console.error('Diagnose error:', error.message, error.stack);
//     res.status(500).json({ error: 'Failed to generate prescription' });
//   }
// };
const diagnose = async (req, res) => {
  try {
    console.log('➡️ Diagnose route hit');
    console.log('User from token:', req.user);

    const { diagnosis } = req.body;
    if (!diagnosis) {
      console.log('❌ Diagnosis missing');
      return res.status(400).json({ error: 'Diagnosis is required' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a medical assistant. Based on the provided diagnosis or symptoms, generate a structured prescription including medicines (name + dosage), precautions, diet plan, and lab tests (if needed). Return the response as valid JSON, e.g., {"medicines":[{"name":"Medicine","dosage":"Dosage"}],"precautions":["Precaution"],"diet":["Diet"],"tests":["Test"]}. Do not include markdown, backticks, or extra text. Diagnosis: ${diagnosis}`;
    
    console.log('🔍 Sending prompt to Gemini...');

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    console.log('🧠 Gemini raw response:', responseText);

    const cleanText = responseText.replace(/```json|```/g, '').trim();

    let prescription;
    try {
      prescription = JSON.parse(cleanText);
    } catch (err) {
      console.error('❌ Failed to parse Gemini response:', err.message);
      return res.status(500).json({ error: 'Invalid JSON response from Gemini', raw: cleanText });
    }

    console.log('✅ Parsed prescription:', prescription);

    const userId = req.user.id;
    const dbResult = await pool.query(
      'INSERT INTO prescriptions (user_id, diagnosis, prescription) VALUES ($1, $2, $3) RETURNING *',
      [userId, diagnosis, prescription]
    );

    console.log('💾 Saved to DB:', dbResult.rows[0]);
    res.json(dbResult.rows[0]);
  } catch (error) {
    console.error('🔥 diagnose() error:', error.message, error.stack);
    res.status(500).json({ error: error.message || 'Failed to generate prescription' });
  }
};

const getHistory = async (req, res) => {
  const userId = req.user.id;
  try {
    const result = await pool.query('SELECT * FROM prescriptions WHERE user_id = $1', [userId]);
    res.json(result.rows);
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

const deletePrescription = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const result = await pool.query('DELETE FROM prescriptions WHERE id = $1 AND user_id = $2 RETURNING *', [id, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Prescription not found' });
    }
    res.json({ message: 'Prescription deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete prescription' });
  }
};

module.exports = { diagnose, getHistory, deletePrescription };

