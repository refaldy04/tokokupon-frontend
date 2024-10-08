'use client';

import SimpleSnackbar from '@/components/Snackbar';
import { Seminar } from '@/interface/seminar';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SeminarSaya = () => {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const router = useRouter();

  const getSeminar = async () => {
    const res = await fetch('/api/seminar/created', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    setSeminars(data.data);
  };

  useEffect(() => {
    getSeminar();
  }, []);

  const handleDelete = async (idSeminar: number) => {
    try {
      await fetch('/api/seminar/created', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idSeminar }),
      });

      setMessage('Berhasil dihapus');
      setOpen(true);
      getSeminar();
    } catch (error) {
      setMessage('Gagal dihapus');
      setOpen(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 py-5 px-3">
      <div>
        <h1 className="text-3xl">Seminar Saya</h1>
      </div>
      {seminars.length && typeof seminars === 'object'
        ? seminars.map((seminar) => (
            <div
              className="border border-white rounded-md p-3 w-full lg:w-1/3"
              key={seminar.id}
            >
              <h2 className="text-2xl">{seminar.title}</h2>
              <div className="flex flex-col lg:flex-row justify-between mt-5">
                <div className="flex flex-col mb-2 lg:mb-0">
                  <span>{seminar.schedule}</span>
                  <span>{seminar.maxParticipants}</span>
                </div>
                <div className="flex gap-2 items-center">
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(seminar.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="outlined"
                    color="warning"
                    size="small"
                    onClick={() => router.push(`/seminar-saya/${seminar.id}`)}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          ))
        : 'No Data'}
      <SimpleSnackbar
        closeModal={() => setOpen(false)}
        open={open}
        message={message}
      />
    </main>
  );
};

export default SeminarSaya;
