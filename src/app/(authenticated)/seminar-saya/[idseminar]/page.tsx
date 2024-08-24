'use client';

import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const todayDate = new Date().toISOString().slice(0, 10);

const EditSeminar = () => {
  const [formData, setFormData] = useState({
    title: '',
    maxParticipants: '',
    schedule: todayDate,
  });

  const router = useRouter();
  const params = useParams<{ idseminar: string }>();

  useEffect(() => {
    const getSeminar = async () => {
      const res = await fetch('/api/seminar/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idSeminar: params.idseminar }),
      });
      const { data } = await res.json();
      console.log('ini data', data);
      const date = new Date(data.schedule);
      const formattedDate = date.toISOString().split('T')[0];
      setFormData({
        title: data.title,
        maxParticipants: data.maxParticipants,
        schedule: formattedDate,
      });
    };

    getSeminar();
  }, []);

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
      const res = await fetch('/api/seminar/edit', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ formData, idSeminar: params.idseminar }),
      });

      if (!res.ok) {
        throw new Error('Failed to create seminar');
      }

      const result = await res.json();
      router.push('/seminar-saya');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <input
          name="title"
          required
          placeholder="Judul"
          value={formData.title}
          onChange={handleChange}
          className="border rounded-md border-black px-3 py-1 w-full shadow-custom-inset"
        />
        <input
          name="maxParticipants"
          type="text"
          required
          placeholder="Maksimal Partisipan"
          value={formData.maxParticipants}
          onChange={handleChange}
          className="border rounded-md border-black px-3 py-1 w-full shadow-custom-inset"
        />
        <input
          name="schedule"
          type="date"
          required
          value={formData.schedule}
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

export default EditSeminar;
