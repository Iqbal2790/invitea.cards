"use client";

import { useState } from "react";
import { Search, Filter, MoreHorizontal, CheckCircle2, Clock, XCircle } from "lucide-react";

// Dummy Orders
const initialOrders = [
  { id: "INV-001", customer: "Amanda & Reza", template: "Elegance Rose", category: "Undangan", date: "24 Okt 2026", status: "Lunas", amount: 29000 },
  { id: "INV-002", customer: "Budi Santoso", template: "Midnight Magic", category: "Ucapan", date: "24 Okt 2026", status: "Pending", amount: 29000 },
  { id: "INV-003", customer: "Citra & Dimas", template: "Classic Javanese", category: "Undangan", date: "23 Okt 2026", status: "Selesai", amount: 35000 },
  { id: "INV-004", customer: "Diana", template: "Happy Anniversary", category: "Ucapan", date: "22 Okt 2026", status: "Lunas", amount: 29000 },
];

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const StatusBadge = ({ status }) => {
    switch (status) {
      case "Lunas":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200"><CheckCircle2 className="w-3.5 h-3.5" /> Lunas</span>;
      case "Pending":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 border border-yellow-200"><Clock className="w-3.5 h-3.5" /> Menunggu</span>;
      case "Selesai":
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200"><CheckCircle2 className="w-3.5 h-3.5" /> Selesai</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200"><XCircle className="w-3.5 h-3.5" /> Batal</span>;
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-semibold text-text-main">Pesanan Masuk</h1>
        <p className="text-text-muted mt-1">Kelola pesanan undangan dan kartu ucapan kustomer Anda.</p>
      </div>

      <div className="bg-white border border-border-subtle rounded-2xl shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-5 border-b border-border-subtle flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Cari nama kustomer atau ID..." 
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border-subtle focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border-subtle rounded-xl text-sm font-medium hover:bg-gray-50 transition-all w-full sm:w-auto">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-gray-50/80 text-text-muted font-medium border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4">ID Pesanan</th>
                <th className="px-6 py-4">Kustomer</th>
                <th className="px-6 py-4">Paket/Template</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {initialOrders.filter(o => o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || o.id.toLowerCase().includes(searchTerm.toLowerCase())).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-text-main">{order.id}</td>
                  <td className="px-6 py-4 text-text-main">{order.customer}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-text-main font-medium">{order.template}</span>
                      <span className="text-xs text-text-muted">{order.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-text-muted">{order.date}</td>
                  <td className="px-6 py-4 font-medium">Rp {order.amount.toLocaleString("id-ID")}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg text-text-muted hover:text-text-main transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border-subtle text-center text-xs text-text-muted bg-gray-50/50">
          Menampilkan {initialOrders.length} pesanan terbaru
        </div>
      </div>
    </div>
  );
}
