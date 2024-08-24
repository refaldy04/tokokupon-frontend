import http from '@/app/helpers/http';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest) {
  const query: any = await request.json();
  console.log('Fetching data...' + query);

  if (!query) {
    return new NextResponse(
      JSON.stringify({ name: 'Please provide something to search for' }),
      { status: 400 }
    );
  }

  const fetchData = async (url: string) => {
    const token = request.cookies.get('token');
    try {
      const { data } = await http(token?.value).patch(url, query.formData, {});
      return { success: true, data };
    } catch (error: any) {
      if (error.response) {
        console.log(`Response data from ${url}:`, error.response.data);
        console.log(`Response status from ${url}:`, error.response.status);
      }
      return { success: false };
    }
  };

  let result = await fetchData('/seminar/' + query.idSeminar);

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
