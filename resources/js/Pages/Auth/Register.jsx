import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', email: '', phone: '', password: '', password_confirmation: '' });

    const submit = (e) => { e.preventDefault(); post(route('register'), { onFinish: () => reset('password', 'password_confirmation') }); };

    return (
        <>
            <Head title="Daftar" />
            <div className="min-h-screen bg-surface-alt flex">
                <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary relative items-center justify-center p-12 overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
                    </div>
                    <div className="relative z-10 text-center max-w-md">
                        <div className="w-20 h-20 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-elevated">
                            <span className="text-primary-dark font-black text-2xl">ES</span>
                        </div>
                        <h1 className="text-4xl font-black text-white mb-4">EithSpace</h1>
                        <p className="text-gray-400 text-lg leading-relaxed">Bergabunglah dengan ribuan pemain yang sudah booking lapangan di EithSpace.</p>
                        <div className="flex justify-center gap-6 mt-8">
                            <div className="text-center"><p className="text-2xl font-bold text-accent">7</p><p className="text-gray-500 text-xs">Lapangan</p></div>
                            <div className="text-center"><p className="text-2xl font-bold text-accent">2</p><p className="text-gray-500 text-xs">Cabang Olahraga</p></div>
                            <div className="text-center"><p className="text-2xl font-bold text-accent">24/7</p><p className="text-gray-500 text-xs">Booking Online</p></div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-md">
                        <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"><span className="text-accent font-black text-sm">ES</span></div>
                            <span className="text-2xl font-bold text-primary">EithSpace</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Buat Akun Baru</h2>
                        <p className="text-gray-500 mb-8">Daftar untuk mulai booking lapangan</p>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label className="input-label">Nama Lengkap</label>
                                <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className={`input ${errors.name ? 'input-error' : ''}`} placeholder="Nama lengkap Anda" autoFocus />
                                {errors.name && <p className="input-error-msg">{errors.name}</p>}
                            </div>
                            <div>
                                <label className="input-label">Email</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className={`input ${errors.email ? 'input-error' : ''}`} placeholder="nama@email.com" />
                                {errors.email && <p className="input-error-msg">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="input-label">Nomor Telepon</label>
                                <input type="tel" value={data.phone} onChange={e => setData('phone', e.target.value)} className={`input ${errors.phone ? 'input-error' : ''}`} placeholder="08xxxxxxxxxx" />
                                {errors.phone && <p className="input-error-msg">{errors.phone}</p>}
                            </div>
                            <div>
                                <label className="input-label">Password</label>
                                <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className={`input ${errors.password ? 'input-error' : ''}`} placeholder="Min. 8 karakter" />
                                {errors.password && <p className="input-error-msg">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="input-label">Konfirmasi Password</label>
                                <input type="password" value={data.password_confirmation} onChange={e => setData('password_confirmation', e.target.value)} className={`input ${errors.password_confirmation ? 'input-error' : ''}`} placeholder="Ulangi password" />
                                {errors.password_confirmation && <p className="input-error-msg">{errors.password_confirmation}</p>}
                            </div>
                            <button type="submit" disabled={processing} className="btn-accent w-full btn-lg mt-2">{processing ? 'Memproses...' : 'Daftar'}</button>
                        </form>
                        <p className="mt-6 text-center text-sm text-gray-500">
                            Sudah punya akun? <Link href={route('login')} className="text-accent font-semibold hover:text-accent-dark">Masuk</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
