import { Button } from '@mui/material';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-5 px-3">
      <div className="border border-white rounded-md p-3 w-full lg:w-1/3">
        <h2 className="text-2xl lg:text-4xl">Judul Seminar</h2>
        <div className="flex flex-col lg:flex-row justify-between mt-5">
          <div className="flex flex-col mb-2 lg:mb-0">
            <span>Jadwal</span>
            <span>Maksimal Partisipan</span>
          </div>
          <Button variant="outlined">Daftar</Button>
        </div>
      </div>
    </main>
  );
}
