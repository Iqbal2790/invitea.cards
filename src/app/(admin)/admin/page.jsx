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
        return <span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-wider bg-green-50/80 text-green-700 border border-green-200/50"><CheckCircle2 className="w-3 h-3" /> Lunas</span>;
      case "Pending":
        return <span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-wider bg-orange-50/80 text-orange-700 border border-orange-200/50"><Clock className="w-3 h-3" /> Menunggu</span>;
      case "Selesai":
        return <span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-wider bg-blue-50/80 text-blue-700 border border-blue-200/50"><CheckCircle2 className="w-3 h-3" /> Selesai</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-wider bg-bg text-ink-soft border border-hairline"><XCircle className="w-3 h-3" /> Batal</span>;
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
    <div className="space-y-[32px]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[16px]">
        <div>
          <h1 className="font-serif italic text-[32px] font-semibold text-ink leading-tight">Pesanan Masuk</h1>
          <p className="text-ink-soft mt-[4px] text-[14.5px]">Kelola pesanan undangan dan kartu ucapan kustomer Anda.</p>
        </div>
        
        {availableMonths.length > 0 && (
          <div className="relative">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none bg-bg border border-hairline rounded-full pl-[20px] pr-[40px] py-[10px] text-[13.5px] font-semibold text-ink focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry shadow-sm cursor-pointer transition-colors"
            >
              {availableMonths.map(m => (
                <option key={m} value={m}>{formatMonthName(m)}</option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-ink-soft absolute right-[16px] top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
        <div className="bg-bg-alt border border-hairline p-[24px] rounded-[6px] shadow-sm flex items-start gap-[16px]">
          <div className="w-[48px] h-[48px] rounded-[6px] bg-green-50 text-green-600 flex items-center justify-center shrink-0 border border-green-100/50">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-ink-soft text-[11.5px] font-bold uppercase tracking-[0.06em] mb-[4px]">Pendapatan Lunas</p>
            <h3 className="text-[24px] font-sans font-semibold text-ink leading-none">Rp {totalEarnings.toLocaleString('id-ID')}</h3>
          </div>
        </div>
        
        <div className="bg-bg-alt border border-hairline p-[24px] rounded-[6px] shadow-sm flex items-start gap-[16px]">
          <div className="w-[48px] h-[48px] rounded-[6px] bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100/50">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-ink-soft text-[11.5px] font-bold uppercase tracking-[0.06em] mb-[4px]">Total Pesanan</p>
            <h3 className="text-[24px] font-sans font-semibold text-ink leading-none">{totalOrders}</h3>
          </div>
        </div>
        
        <div className="bg-bg-alt border border-hairline p-[24px] rounded-[6px] shadow-sm flex items-start gap-[16px]">
          <div className="w-[48px] h-[48px] rounded-[6px] bg-orange-50 text-orange-600 flex items-center justify-center shrink-0 border border-orange-100/50">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-ink-soft text-[11.5px] font-bold uppercase tracking-[0.06em] mb-[4px]">Menunggu Pembayaran</p>
            <h3 className="text-[24px] font-sans font-semibold text-ink leading-none">{totalPending}</h3>
          </div>
        </div>
      </div>

      <div className="bg-bg-alt border border-hairline rounded-[6px] shadow-sm overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-[20px] border-b border-hairline flex flex-col sm:flex-row gap-[16px] justify-between items-center bg-bg">
          <div className="relative w-full sm:w-[320px]">
            <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft" />
            <input 
              type="text" 
              placeholder="Cari nama kustomer atau ID..." 
              className="w-full pl-[40px] pr-[16px] py-[10px] rounded-full border border-hairline focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry bg-bg-alt transition-all text-[13.5px] text-ink placeholder:text-ink-soft/60"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative w-full sm:w-auto">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center justify-center gap-[8px] px-[20px] py-[10px] bg-bg-alt border border-hairline rounded-full text-[13.5px] font-semibold text-ink hover:border-berry hover:text-berry dark:hover:border-pink dark:hover:text-pink transition-all w-full sm:w-auto"
            >
              <Filter className="w-4 h-4" />
              {statusFilter === "All" ? "Filter Status" : `Status: ${statusFilter}`}
            </button>

            {isFilterOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)} />
                <div className="absolute right-0 mt-[8px] w-[200px] bg-bg-alt border border-hairline rounded-[6px] shadow-lg z-20 py-[8px] flex flex-col">
                  {['All', 'Lunas', 'Pending', 'Batal'].map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setStatusFilter(s);
                        setIsFilterOpen(false);
                      }}
                      className={`px-[20px] py-[10px] text-left text-[13.5px] hover:bg-bg transition-colors ${statusFilter === s ? 'text-berry dark:text-pink font-bold' : 'text-ink font-medium'}`}
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
          <table className="w-full text-left text-[14px] whitespace-nowrap">
            <thead className="bg-bg text-ink-soft font-semibold text-[12px] uppercase tracking-[0.05em] border-b border-hairline">
              <tr>
                <th className="px-[24px] py-[16px]">ID Pesanan</th>
                <th className="px-[24px] py-[16px]">Kustomer</th>
                <th className="px-[24px] py-[16px]">Paket/Template</th>
                <th className="px-[24px] py-[16px]">Tanggal</th>
                <th className="px-[24px] py-[16px]">Total</th>
                <th className="px-[24px] py-[16px]">Status</th>
                <th className="px-[24px] py-[16px] text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-[24px] py-[48px] text-center text-ink-soft">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-[8px] text-berry dark:text-pink" />
                    Memuat data pesanan...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-[24px] py-[48px] text-center text-ink-soft font-medium">
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
                  <tr key={order.id} className="hover:bg-bg transition-colors">
                    <td className="px-[24px] py-[16px] font-semibold text-ink">
                      <div className="w-[100px] truncate" title={order.id}>{order.id.split('-')[0]}...</div>
                    </td>
                    <td className="px-[24px] py-[16px] text-ink font-medium">{order.customer}</td>
                    <td className="px-[24px] py-[16px]">
                      <div className="flex flex-col gap-[2px]">
                        <span className="text-ink font-semibold">{order.template}</span>
                        <span className="text-[12px] text-ink-soft font-medium capitalize">{order.category}</span>
                      </div>
                    </td>
                    <td className="px-[24px] py-[16px] text-ink-soft font-medium">{order.date}</td>
                    <td className="px-[24px] py-[16px] font-bold text-ink">Rp {order.amount.toLocaleString("id-ID")}</td>
                    <td className="px-[24px] py-[16px]">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-[24px] py-[16px] text-right relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                        className="p-[8px] hover:bg-bg-alt rounded-[6px] text-ink-soft hover:text-ink transition-colors focus:outline-none"
                      >
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                      
                      {activeDropdown === order.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setActiveDropdown(null)} 
                          />
                          <div className="absolute right-[32px] top-[48px] w-[200px] bg-bg border border-hairline rounded-[6px] shadow-lg z-20 overflow-hidden flex flex-col py-[8px]">
                            <button 
                              onClick={() => handleUpdateStatus(order.id, 'paid')}
                              className="px-[20px] py-[10px] text-left text-[13.5px] font-medium hover:bg-bg-alt text-ink transition-colors"
                            >
                              Tandai Lunas
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(order.id, 'pending')}
                              className="px-[20px] py-[10px] text-left text-[13.5px] font-medium hover:bg-bg-alt text-ink transition-colors"
                            >
                              Tandai Pending
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              className="px-[20px] py-[10px] text-left text-[13.5px] font-medium hover:bg-bg-alt text-ink transition-colors border-b border-hairline"
                            >
                              Batalkan Pesanan
                            </button>
                            <button 
                              onClick={() => handleDelete(order.id)}
                              className="px-[20px] py-[10px] text-left text-[13.5px] font-semibold hover:bg-red-50/50 text-red-600 transition-colors flex items-center gap-[8px]"
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
        
        <div className="p-[16px] border-t border-hairline text-center text-[12.5px] font-medium text-ink-soft bg-bg">
          Menampilkan {orders.length} pesanan terbaru
        </div>
      </div>
    </div>
  );
}
