"use client";

import { useState, useEffect } from "react";
import { Search, Filter, MoreHorizontal, CheckCircle2, Clock, XCircle, Loader2, Trash2, Wallet, ShoppingBag, AlertCircle, ChevronDown } from "lucide-react";

export default function AdminOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch('/api/admin/orders');
        const json = await res.json();
        if (json.data) {
          setOrders(json.data);
          
          // Generate unique months
          const months = [...new Set(json.data.map(o => {
            if (!o.raw_date) return null;
            const date = new Date(o.raw_date);
            return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          }).filter(Boolean))].sort().reverse();
          
          setAvailableMonths(months);
          if (months.length > 0) {
            setSelectedMonth(months[0]);
          } else {
            const now = new Date();
            setSelectedMonth(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
            setAvailableMonths([`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleUpdateStatus = async (id, newStatus) => {
    setActiveDropdown(null);
    try {
      // Optimistic update
      setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus === 'paid' ? 'Lunas' : newStatus === 'pending' ? 'Pending' : 'Batal' } : o));
      
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status_payment: newStatus })
      });
      
      if (!res.ok) throw new Error("Gagal update status");
    } catch (err) {
      alert(err.message);
      // Fallback reload
      window.location.reload();
    }
  };

  const handleDelete = async (id) => {
    setActiveDropdown(null);
    if (!window.confirm("Yakin ingin menghapus pesanan ini secara permanen?")) return;
    
    try {
      const res = await fetch(`/api/admin/orders/${id}`, {
        method: "DELETE"
      });
      
      if (!res.ok) throw new Error("Gagal menghapus pesanan");
      setOrders(orders.filter(o => o.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

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

  const currentMonthOrders = orders.filter(o => {
    if (!o.raw_date || !selectedMonth) return false;
    const date = new Date(o.raw_date);
    const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    return monthStr === selectedMonth;
  });

  const totalEarnings = currentMonthOrders
    .filter(o => o.status === 'Lunas')
    .reduce((sum, o) => sum + (o.amount || 0), 0);
    
  const totalOrders = currentMonthOrders.length;
  
  const totalPending = currentMonthOrders
    .filter(o => o.status === 'Pending').length;

  const formatMonthName = (YYYYMM) => {
    if (!YYYYMM) return "";
    const [year, month] = YYYYMM.split('-');
    const date = new Date(year, parseInt(month) - 1, 1);
    return date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-text-main">Pesanan Masuk</h1>
          <p className="text-text-muted mt-1">Kelola pesanan undangan dan kartu ucapan kustomer Anda.</p>
        </div>
        
        {availableMonths.length > 0 && (
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none bg-white border border-border-subtle rounded-xl pl-4 pr-10 py-2 text-sm font-medium focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand shadow-sm cursor-pointer"
            >
              {availableMonths.map(m => (
                <option key={m} value={m}>{formatMonthName(m)}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-border-subtle p-6 rounded-2xl shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium mb-1">Pendapatan Lunas</p>
            <h3 className="text-2xl font-semibold text-text-main">Rp {totalEarnings.toLocaleString('id-ID')}</h3>
          </div>
        </div>
        
        <div className="bg-white border border-border-subtle p-6 rounded-2xl shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium mb-1">Total Pesanan</p>
            <h3 className="text-2xl font-semibold text-text-main">{totalOrders}</h3>
          </div>
        </div>
        
        <div className="bg-white border border-border-subtle p-6 rounded-2xl shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-text-muted text-sm font-medium mb-1">Menunggu Pembayaran</p>
            <h3 className="text-2xl font-semibold text-text-main">{totalPending}</h3>
          </div>
        </div>
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
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-border-subtle rounded-xl text-sm font-medium hover:bg-gray-50 transition-all w-full sm:w-auto"
            >
              <Filter className="w-4 h-4" />
              {statusFilter === "All" ? "Filter Status" : `Status: ${statusFilter}`}
            </button>

            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border-subtle rounded-xl shadow-lg z-20 py-1 flex flex-col">
                  {['All', 'Lunas', 'Pending', 'Batal'].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStatusFilter(s);
                        setIsFilterOpen(false);
                      }}
                      className={`px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${statusFilter === s ? 'text-brand font-medium' : 'text-text-main'}`}
                    >
                      {s === 'All' ? 'Semua Status' : s}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
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
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-text-muted">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                    Memuat data pesanan...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-text-muted">
                    Belum ada pesanan masuk.
                  </td>
                </tr>
              ) : (
                orders
                  .filter(o => 
                    (o.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
                     o.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (statusFilter === "All" || o.status === statusFilter)
                  )
                  .map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-text-main">
                      <div className="w-24 truncate" title={order.id}>{order.id.split('-')[0]}...</div>
                    </td>
                    <td className="px-6 py-4 text-text-main">{order.customer}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-text-main font-medium">{order.template}</span>
                        <span className="text-xs text-text-muted capitalize">{order.category}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-text-muted">{order.date}</td>
                    <td className="px-6 py-4 font-medium">Rp {order.amount.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 text-right relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg text-text-muted hover:text-text-main transition-colors focus:outline-none"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                      
                      {activeDropdown === order.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setActiveDropdown(null)} 
                          />
                          <div className="absolute right-6 top-10 w-48 bg-white border border-border-subtle rounded-xl shadow-lg z-20 overflow-hidden flex flex-col py-1">
                            <button 
                              onClick={() => handleUpdateStatus(order.id, 'paid')}
                              className="px-4 py-2.5 text-left text-sm hover:bg-gray-50 text-text-main transition-colors"
                            >
                              Tandai Lunas
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(order.id, 'pending')}
                              className="px-4 py-2.5 text-left text-sm hover:bg-gray-50 text-text-main transition-colors"
                            >
                              Tandai Pending
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              className="px-4 py-2.5 text-left text-sm hover:bg-gray-50 text-text-main transition-colors border-b border-border-subtle/50"
                            >
                              Batalkan Pesanan
                            </button>
                            <button 
                              onClick={() => handleDelete(order.id)}
                              className="px-4 py-2.5 text-left text-sm hover:bg-red-50 text-red-600 transition-colors flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Hapus
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-border-subtle text-center text-xs text-text-muted bg-gray-50/50">
          Menampilkan {orders.length} pesanan terbaru
        </div>
      </div>
    </div>
  );
}
