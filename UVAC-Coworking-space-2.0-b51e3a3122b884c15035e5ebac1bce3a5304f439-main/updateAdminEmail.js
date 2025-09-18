// Simple script to update admin email
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';
const NEW_EMAIL = 'chavananand959@gmail.com';

async function updateAdminEmail() {
  try {
    const response = await fetch(`${API_URL}/users/admin/email`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: NEW_EMAIL })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Success:', result.message);
      console.log(`📧 Admin email set to: ${NEW_EMAIL}`);
    } else {
      console.error('❌ Error:', result.error || 'Failed to update admin email');
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

// Run the function
updateAdminEmail();
