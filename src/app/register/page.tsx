'use client';

import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SimpleSnackbar from '@/components/Snackbar';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      setMessage('Password tidak sama');
      setOpen(true);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error('Failed to create seminar');
      }

      const result = await res.json();
      console.log({ 'ini result': result });
      setMessage('Berhasil Register');
      setOpen(true);
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
          name="username"
          required
          placeholder="Username"
          value={formData.username}
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
        <input
          name="confirmPassword"
          type="password"
          required
          placeholder="Konfirmasi password"
          value={formData.confirmPassword}
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
          Sudah punya akun?{' '}
          <Link href="/login" className="text-blue-500">
            Login disini
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

export default Register;
