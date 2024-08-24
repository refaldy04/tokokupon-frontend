'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SimpleSnackbar from '@/components/Snackbar';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setMessage('Invalid Credentials');
        setOpen(true);
        return;
      }

      const result = await res.json();
      Cookies.set('token', result.data.token);
      router.push('/');
      // Lakukan sesuatu setelah seminar berhasil dibuat, misalnya redirect atau menampilkan pesan sukses
    } catch (error) {
      console.error('Error:', error);
      // Tampilkan pesan error kepada pengguna
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 text-black lg:w-1/3"
      >
        <input
          name="email"
          required
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border rounded-md border-black px-3 py-1 w-full shadow-custom-inset"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="border rounded-md border-black px-3 py-1 w-full shadow-custom-inset"
        />
        <div className="flex w-full">
          <button
            type="submit"
            className="border rounded-md border-black px-3 py-1 w-full bg-blue-500 text-white shadow-custom-inset"
          >
            Login
          </button>
        </div>
        <p className="text-white">
          Belum punya akun?{' '}
          <Link href="/register" className="text-blue-500">
            Daftar disini
          </Link>
        </p>
      </form>
      <SimpleSnackbar
        closeModal={() => setOpen(false)}
        open={open}
        message={message}
      />
    </div>
  );
};

export default Login;
