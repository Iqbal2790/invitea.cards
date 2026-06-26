const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const filesToCreate = [
  // App Router Pages
  { path: 'app/templates/page.jsx', type: 'page' },
  { path: 'app/templates/[id]/page.jsx', type: 'page' },
  { path: 'app/buat/[template-id]/page.jsx', type: 'page' },
  { path: 'app/checkout/[order-id]/page.jsx', type: 'page' },
  { path: 'app/status/[order-id]/page.jsx', type: 'page' },
  { path: 'app/u/[slug]/page.jsx', type: 'page' },
  { path: 'app/order/[magic-token]/page.jsx', type: 'page' },
  { path: 'app/admin/layout.jsx', type: 'layout' },
  { path: 'app/admin/page.jsx', type: 'page' },
  { path: 'app/admin/orders/page.jsx', type: 'page' },
  { path: 'app/admin/rsvp/page.jsx', type: 'page' },
  { path: 'app/admin/templates/page.jsx', type: 'page' },
  
  // API Routes
  { path: 'api/orders/route.js', type: 'route' },
  { path: 'api/orders/[id]/route.js', type: 'route' },
  { path: 'api/invitations/route.js', type: 'route' },
  { path: 'api/rsvp/route.js', type: 'route' },
  { path: 'api/upload/route.js', type: 'route' },
  { path: 'api/midtrans/create/route.js', type: 'route' },
  { path: 'api/midtrans/webhook/route.js', type: 'route' },
  { path: 'api/admin/login/route.js', type: 'route' },
  { path: 'api/admin/orders/route.js', type: 'route' },

  // Components
  { path: 'components/ui/Button.jsx', type: 'component' },
  { path: 'components/ui/Input.jsx', type: 'component' },
  { path: 'components/ui/Modal.jsx', type: 'component' },
  { path: 'components/ui/Badge.jsx', type: 'component' },
  { path: 'components/layout/Header.jsx', type: 'component' },
  { path: 'components/layout/Footer.jsx', type: 'component' },
  { path: 'components/layout/AdminSidebar.jsx', type: 'component' },
  { path: 'components/templates/TemplateCard.jsx', type: 'component' },
  { path: 'components/templates/TemplatePreview.jsx', type: 'component' },
  { path: 'components/templates/renderers/UndanganPernikahan.jsx', type: 'component' },
  { path: 'components/templates/renderers/UndanganPernikahan/OpeningSection.jsx', type: 'component' },
  { path: 'components/templates/renderers/UndanganPernikahan/AcaraSection.jsx', type: 'component' },
  { path: 'components/templates/renderers/UndanganPernikahan/GaleriSection.jsx', type: 'component' },
  { path: 'components/templates/renderers/UndanganPernikahan/styles.css', type: 'empty' },
  { path: 'components/templates/renderers/UcapanUmum.jsx', type: 'component' },
  { path: 'components/templates/renderers/UcapanUmum/styles.css', type: 'empty' },
  { path: 'components/forms/DynamicForm.jsx', type: 'component' },
  { path: 'components/forms/PhotoUpload.jsx', type: 'component' },
  { path: 'components/forms/RsvpForm.jsx', type: 'component' },
  { path: 'components/invitation/Countdown.jsx', type: 'component' },
  { path: 'components/invitation/MusicPlayer.jsx', type: 'component' },
  { path: 'components/invitation/MapsEmbed.jsx', type: 'component' },
  { path: 'components/invitation/PhotoGallery.jsx', type: 'component' },

  // Libs
  { path: 'lib/supabase.js', type: 'lib' },
  { path: 'lib/resend.js', type: 'lib' },
  { path: 'lib/midtrans.js', type: 'lib' },
  { path: 'lib/qrcode.js', type: 'lib' },
  { path: 'lib/magiclink.js', type: 'lib' },
  { path: 'lib/helpers.js', type: 'lib' },

  // Emails
  { path: 'emails/OrderConfirmation.jsx', type: 'component' },
];

filesToCreate.forEach(fileInfo => {
  const fullPath = path.join(srcDir, fileInfo.path);
  const dirName = path.dirname(fullPath);

  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }

  if (!fs.existsSync(fullPath)) {
    let content = '';
    
    if (fileInfo.type === 'page') {
      content = `export default function Page() {\n  return <div>Page Content</div>;\n}\n`;
    } else if (fileInfo.type === 'layout') {
      content = `export default function Layout({ children }) {\n  return <div>{children}</div>;\n}\n`;
    } else if (fileInfo.type === 'route') {
      content = `export async function GET(request) {\n  return Response.json({ message: 'Hello API' });\n}\n`;
    } else if (fileInfo.type === 'component') {
      content = `export default function Component() {\n  return null;\n}\n`;
    } else if (fileInfo.type === 'lib') {
      content = `export const dummy = true;\n`;
    }
    
    fs.writeFileSync(fullPath, content);
  }
});

console.log('Struktur folder dan file dummy berhasil dibuat!');
