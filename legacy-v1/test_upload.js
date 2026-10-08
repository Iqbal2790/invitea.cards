const fs = require('fs');

async function testUpload() {
  const formData = new FormData();
  
  // Create a dummy text file as a mock image
  const blob = new Blob(['dummy image content'], { type: 'image/jpeg' });
  formData.append('file', blob, 'test.jpg');

  try {
    const res = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData
    });
    
    const text = await res.text();
    console.log('Status:', res.status);
    console.log('Response:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

testUpload();
