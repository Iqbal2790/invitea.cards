async function test() {
  const res = await fetch('http://localhost:3000/api/admin/testimonials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nama: 'Test', pesan: 'Test msg' })
  });
  const data = await res.json();
  console.log('Status:', res.status);
  console.log('Body:', data);
}
test();
