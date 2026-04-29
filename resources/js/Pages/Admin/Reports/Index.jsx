import AdminLayout from '@/Layouts/AdminLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function ReportsIndex({ revenueSummary, dailyRevenue, bookingStats, revenueBySport, paymentMethods, filters }) {
    const [startDate, setStartDate] = useState(filters.start_date);
    const [endDate, setEndDate] = useState(filters.end_date);
    const applyFilter = () => router.get(route('admin.reports.index'), { start_date: startDate, end_date: endDate }, { preserveState: true });

    return (
        <AdminLayout title="Laporan">
            <Head title="Laporan" />
            <h1 className="text-xl font-bold text-gray-900 mb-6">Laporan & Analisis</h1>

            {/* Date Filter */}
            <div className="card p-4 mb-6 flex flex-wrap gap-3 items-end">
                <div><label className="input-label">Dari</label><input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="input" /></div>
                <div><label className="input-label">Sampai</label><input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="input" /></div>
                <button onClick={applyFilter} className="btn-accent">Terapkan</button>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="card p-6 bg-gradient-primary text-white">
                    <p className="text-sm text-gray-400">Total Pendapatan</p>
                    <p className="text-3xl font-black mt-1">Rp {parseInt(revenueSummary.total).toLocaleString('id-ID')}</p>
                    <p className="text-xs text-gray-400 mt-1">{revenueSummary.count} transaksi</p>
                </div>
                <div className="card p-6">
                    <p className="text-sm text-gray-500">Status Booking</p>
                    <div className="space-y-2 mt-3">
                        {bookingStats?.map(s => (
                            <div key={s.status} className="flex justify-between text-sm">
                                <span className={`badge ${s.status === 'completed' ? 'badge-success' : s.status === 'cancelled' ? 'badge-danger' : s.status === 'confirmed' ? 'badge-info' : 'badge-warning'}`}>{s.status}</span>
                                <span className="font-semibold">{s.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="card p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">Pendapatan Harian</h3>
                {(() => {
                    const chartData = dailyRevenue || [];
                    const maxVal = Math.max(...chartData.map(d => Number(d.total) || 0), 1);
                    const barAreaHeight = 160;

                    const formatValue = (val) => {
                        const num = Number(val) || 0;
                        if (num >= 1000000) return `${(num / 1000000).toFixed(1)}jt`;
                        if (num >= 1000) return `${(num / 1000).toFixed(0)}k`;
                        if (num > 0) return num.toLocaleString('id-ID');
                        return '0';
                    };

                    if (chartData.length === 0) {
                        return <p className="text-center text-gray-400 py-12">Belum ada data pendapatan</p>;
                    }

                    return (
                        <div className="flex items-end gap-1 overflow-x-auto pb-1" style={{ height: `${barAreaHeight + 44}px` }}>
                            {chartData.map((d, i) => {
                                const revenue = Number(d.total) || 0;
                                const barHeight = Math.max((revenue / maxVal) * barAreaHeight, revenue > 0 ? 8 : 3);

                                return (
                                    <div key={i} className="flex-1 min-w-[36px] flex flex-col items-center justify-end h-full">
                                        <span className="text-[9px] text-gray-500 font-semibold mb-1">
                                            {formatValue(revenue)}
                                        </span>
                                        <div
                                            className="w-full rounded-t relative overflow-hidden transition-all duration-300"
                                            style={{ height: `${barHeight}px` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-t from-accent to-accent-light opacity-90" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/20" />
                                        </div>
                                        <span className="text-[8px] text-gray-400 mt-1 whitespace-nowrap">{d.date}</span>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })()}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* By Sport */}
                <div className="card p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Pendapatan per Olahraga</h3>
                    {revenueBySport?.map(s => (
                        <div key={s.sport_type} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
                            <span className="text-sm font-medium">{(() => { const m = {badminton:'🏸 Badminton',futsal:'⚽ Futsal',basketball:'🏀 Basket',padel:'🎾 Padel',volleyball:'🏐 Voli'}; return m[s.sport_type] || s.sport_type; })()}</span>
                            <span className="font-bold text-primary">Rp {parseInt(s.total).toLocaleString('id-ID')}</span>
                        </div>
                    ))}
                </div>
                {/* By Payment Method */}
                <div className="card p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Metode Pembayaran</h3>
                    {paymentMethods?.map(m => (
                        <div key={m.method} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2">
                            <span className="text-sm font-medium capitalize">{m.method?.replace('_', ' ')}</span>
                            <div className="text-right">
                                <p className="font-bold text-sm">Rp {parseInt(m.total).toLocaleString('id-ID')}</p>
                                <p className="text-xs text-gray-400">{m.count} transaksi</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
