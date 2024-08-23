'use client';

import React, { useState } from 'react';

const todayDate = new Date().toISOString().slice(0, 10);

const BuatSeminar = () => {
  const [formData, setFormData] = useState({
    title: '',
    max_participant: '',
    date: todayDate,
  });

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
      const res = await fetch('/api/seminar', {
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
      console.log(result);
      // Lakukan sesuatu setelah seminar berhasil dibuat, misalnya redirect atau menampilkan pesan sukses
    } catch (error) {
      console.error('Error:', error);
      // Tampilkan pesan error kepada pengguna
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <input
          id="title"
          name="title"
          required
          placeholder="Judul"
          value={formData.title}
          onChange={handleChange}
          className="border rounded-md border-black px-3 py-1 w-full shadow-custom-inset"
        />
        <input
          id="max_participant"
          name="max_participant"
          type="text"
          required
          placeholder="Maksimal Partisipan"
          value={formData.max_participant}
          onChange={handleChange}
          className="border rounded-md border-black px-3 py-1 w-full shadow-custom-inset"
        />
        <input
          id="date"
          name="date"
          type="date"
          required
          value={formData.date}
          onChange={handleChange}
          className="border rounded-md border-black px-3 py-1 w-full shadow-custom-inset"
        />
        <div className="flex w-full">
          <button
            type="submit"
            className="border rounded-md border-black px-3 py-1 w-full bg-white shadow-custom-inset"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuatSeminar;
