import http from '@/app/helpers/http';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Fetching data...');

  const fetchData = async (url: string) => {
    try {
      const { data } = await http().get(url);
      return { success: true, data };
    } catch (error: any) {
      if (error.response) {
        console.log(`Response data from ${url}:`, error.response.data);
        console.log(`Response status from ${url}:`, error.response.status);
      }
      return { success: false };
    }
  };

  let result = await fetchData('/seminar');

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

export async function POST(request: NextRequest) {
  const query: any = await request.json();
  console.log('Fetching data Post...');

  if (!query) {
    return new NextResponse(
      JSON.stringify({ name: 'Please provide something to search for' }),
      { status: 400 }
    );
  }

  const fetchData = async (url: string) => {
    const token = request.cookies.get('token');
    try {
      const { data } = await http(token?.value).post(url, query, {});
      return { success: true, data };
    } catch (error: any) {
      if (error.response) {
        console.log(`Response data from ${url}:`, error.response.data);
        console.log(`Response status from ${url}:`, error.response.status);
      }
      return { success: false };
    }
  };

  let result = await fetchData('/seminar');

  if (result.success) {
    let responseData;
    if (result.data.NumOfResults !== undefined) {
      // Handle /v1/search response
      responseData = result.data.Data;
    } else {
      // Handle /v2/search response
      responseData = result.data;
    }

    return new NextResponse(JSON.stringify({ data: responseData }), {
      status: 200,
    });
  }

  return new NextResponse(JSON.stringify({ data: 'Something went wrong' }), {
    status: 400,
  });
}
