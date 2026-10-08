const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, val] = line.split('=');
  if (key && val) {
    env[key.trim()] = val.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testUpload() {
  const buffer = Buffer.from("dummy image content");
  const filePath = "test-session/slot0.jpg";

  console.log("Testing upload to 'orders' bucket...");
  const { data, error } = await supabase.storage
    .from("orders")
    .upload(filePath, buffer, {
      contentType: "image/jpeg",
      upsert: true
    });

  if (error) {
    console.error("Test Upload Error:", error);
  } else {
    console.log("Test Upload SUCCESS!", data);
  }
}

testUpload();
