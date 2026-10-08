import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function main() {
  const filePath = 'public/thumbnails/folio-bloom.png';
  const fileContent = fs.readFileSync(filePath);
  
  console.log('Uploading to Supabase storage...');
  
  const { data, error } = await supabase.storage
    .from('thumbnails')
    .upload('folio-bloom-thumbnail.png', fileContent, {
      contentType: 'image/png',
      upsert: true
    });
    
  if (error) {
    console.error('Upload error:', error);
    process.exit(1);
  }
  
  const { data: publicUrlData } = supabase.storage
    .from('thumbnails')
    .getPublicUrl('folio-bloom-thumbnail.png');
    
  const publicUrl = publicUrlData.publicUrl;
  console.log('Uploaded successfully! Public URL:', publicUrl);
  
  console.log('Updating templates table with new thumbnail URL...');
  const { error: updateError } = await supabase
    .from('templates')
    .update({ thumbnail_url: publicUrl })
    .eq('nama', 'Folio Bloom');
    
  if (updateError) {
    console.error('Failed to update templates table:', updateError);
  } else {
    console.log('Database updated successfully!');
  }
}

main();
