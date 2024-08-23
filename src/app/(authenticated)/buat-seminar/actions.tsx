export const createSeminar = async (formData: FormData) => {
  'use server';
  const data = {
    title: formData.get('title') as string,
    maxParticipants: formData.get('max_participant') as string,
    schedule: formData.get('date') as string,
  };

  await fetch('http://localhost:3000/api/seminar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data,
    }),
  });
};
