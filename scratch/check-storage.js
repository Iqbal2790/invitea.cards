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

async function checkAndFixBucket() {
  console.log("Listing buckets...");
  const { data: buckets, error: listErr } = await supabase.storage.listBuckets();
  
  if (listErr) {
    console.error("List buckets error:", listErr);
    return;
  }
  
  console.log("Existing buckets:", buckets.map(b => b.name));

  const ordersBucket = buckets.find(b => b.name === 'orders');

  if (!ordersBucket) {
    console.log("Bucket 'orders' does NOT exist! Creating 'orders' public bucket...");
    const { data: newBucket, error: createErr } = await supabase.storage.createBucket('orders', {
      public: true,
      fileSizeLimit: 10485760 // 10MB limit
    });
    
    if (createErr) {
      console.error("Failed to create 'orders' bucket:", createErr);
    } else {
      console.log("Successfully created 'orders' bucket!", newBucket);
    }
  } else {
    console.log("Bucket 'orders' exists. Public:", ordersBucket.public);
    if (!ordersBucket.public) {
      console.log("Updating 'orders' bucket to be PUBLIC...");
      await supabase.storage.updateBucket('orders', { public: true });
    }
  }
}

checkAndFixBucket();
