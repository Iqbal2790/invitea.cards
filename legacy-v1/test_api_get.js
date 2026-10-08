async function test() {
  try {
    const res = await fetch('http://localhost:3000/api/testimonials');
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Body:', data);
  } catch (err) {
    console.error(err);
  }
}
test();
