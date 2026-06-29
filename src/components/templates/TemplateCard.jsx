import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

export default function TemplateCard({ template }) {
  return (
    <Card className="group overflow-hidden flex flex-col hover:-translate-y-1 transition-transform duration-300">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg-base">
        <Image
          src={template.thumbnail_url || '/template-dummy.png'}
          alt={template.nama || template.name || 'Template Image'}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary">{template.category || template.kategori || 'Template'}</Badge>
        </div>
      </div>
      <CardContent className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl font-medium text-text-main mb-1">{template.nama || template.name}</h3>
          <p className="text-brand font-medium">Rp {(template.price || template.harga || 0).toLocaleString('id-ID')}</p>
        </div>
        <div className="mt-6">
          <Link href={`/templates/${template.id}`}>
            <Button variant="outline" className="w-full">Lihat Detail</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
