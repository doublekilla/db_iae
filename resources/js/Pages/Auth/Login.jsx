import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({ email: '', password: '', remember: false });

    const submit = (e) => { e.preventDefault(); post(route('login'), { onFinish: () => reset('password') }); };

    return (
        <>
            <Head title="Masuk" />
            <div className="min-h-screen bg-surface-alt flex">
                {/* Left Panel - Brand */}
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
                        <p className="text-gray-400 text-lg leading-relaxed">Platform booking lapangan badminton & futsal terpercaya. Cek jadwal, booking instan, bayar online.</p>
                    </div>
                </div>

                {/* Right Panel - Form */}
                <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
                    <div className="w-full max-w-md">
                        <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
                            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center"><span className="text-accent font-black text-sm">ES</span></div>
                            <span className="text-2xl font-bold text-primary">EithSpace</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang!</h2>
                        <p className="text-gray-500 mb-8">Masuk ke akun Anda untuk melanjutkan</p>

                        {status && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 text-sm rounded-lg">{status}</div>}

                        <form onSubmit={submit} className="space-y-5">
                            <div>
                                <label className="input-label">Email</label>
                                <input type="email" value={data.email} onChange={e => setData('email', e.target.value)} className={`input ${errors.email ? 'input-error' : ''}`} placeholder="nama@email.com" autoFocus />
                                {errors.email && <p className="input-error-msg">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="input-label">Password</label>
                                <input type="password" value={data.password} onChange={e => setData('password', e.target.value)} className={`input ${errors.password ? 'input-error' : ''}`} placeholder="••••••••" />
                                {errors.password && <p className="input-error-msg">{errors.password}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={data.remember} onChange={e => setData('remember', e.target.checked)} className="rounded border-gray-300 text-accent focus:ring-accent" />
                                    <span className="text-sm text-gray-600">Ingat saya</span>
                                </label>
                                {canResetPassword && <Link href={route('password.request')} className="text-sm text-accent hover:text-accent-dark font-medium">Lupa password?</Link>}
                            </div>
                            <button type="submit" disabled={processing} className="btn-accent w-full btn-lg">{processing ? 'Memproses...' : 'Masuk'}</button>
                        </form>

                        <p className="mt-6 text-center text-sm text-gray-500">
                            Belum punya akun? <Link href={route('register')} className="text-accent font-semibold hover:text-accent-dark">Daftar sekarang</Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
