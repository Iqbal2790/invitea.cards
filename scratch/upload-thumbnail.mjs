import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadThumbnail() {
  try {
    const filePath = 'e:/One Cent Card/celestial-journey-thumb.png';
    const fileBuffer = fs.readFileSync(filePath);
    
    // Check buckets first
    const { data: buckets } = await supabase.storage.listBuckets();
    console.log("Buckets:", buckets.map(b => b.name));
    
    const bucketName = 'template-assets';
    // Create bucket if not exists
    if (!buckets.find(b => b.name === bucketName)) {
      console.log(`Creating bucket ${bucketName}...`);
      await supabase.storage.createBucket(bucketName, { public: true });
    }
    
    // Upload image
    const fileName = `celestial-journey-${Date.now()}.png`;
    console.log(`Uploading ${fileName}...`);
    
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });
      
    if (uploadError) throw uploadError;
    
    const { data: { publicUrl } } = supabase.storage.from(bucketName).getPublicUrl(fileName);
    console.log("Public URL:", publicUrl);
    
    // Update templates table
    const templateId = '12345678-abcd-ef00-1234-567890abcdef'; // from scratch file
    console.log(`Updating template ${templateId}...`);
    
    const { data, error } = await supabase
      .from('templates')
      .update({ thumbnail_url: publicUrl })
      .eq('id', templateId)
      .select();
      
    if (error) throw error;
    console.log("Successfully updated template:", data);
  } catch (error) {
    console.error("Error:", error);
  }
}

uploadThumbnail();
