'use client';

import SimpleSnackbar from '@/components/Snackbar';
import { Seminar } from '@/interface/seminar';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Home() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getSeminar = async () => {
      const res = await fetch('/api/seminar', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setSeminars(data.data);
    };

    getSeminar();
  }, []);

  const handleJoin = async (idSeminar: number) => {
    try {
      await fetch('/api/seminar/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idSeminar }),
      });

      setMessage('Berhasil join seminar');
      setOpen(true);
    } catch (error) {
      setMessage('Gagal join seminar');
      setOpen(true);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 py-5 px-3">
      {seminars.length
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
                <Button
                  variant="outlined"
                  onClick={() => handleJoin(seminar.id)}
                >
                  Daftar
                </Button>
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
}
