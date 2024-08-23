import http from '@/app/helpers/http';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const query: any = await request.json();
  console.log('Fetching data...');

  if (!query) {
    return new NextResponse(
      JSON.stringify({ name: 'Please provide something to search for' }),
      { status: 400 }
    );
  }

  const fetchData = async (url: string) => {
    try {
      const { data } = await http().post(url, query, {});
      return { success: true, data };
    } catch (error: any) {
      if (error.response) {
        console.log(`Response data from ${url}:`, error.response.data);
        console.log(`Response status from ${url}:`, error.response.status);
      } else if (error.request) {
        console.log(`No response received from ${url}:`, error.request);
      }
      console.log(`Error message from ${url}:`, error);
      return { success: false };
    }
  };

  let result = await fetchData('/user');

  if (result.success) {
    let responseData;

    responseData = result.data;

    return new NextResponse(JSON.stringify({ data: responseData }), {
      status: 200,
    });
  }

  return new NextResponse(JSON.stringify({ data: 'Something went wrong' }), {
    status: 400,
  });
}
