import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { 'zip-code': string } },
) {
  try {
    const { 'zip-code': zipCode } = context.params;

    const address = await fetch(
      `https://brasilapi.com.br/api/cep/v2/${zipCode.replace(/\D/g, '')}`,
    );

    if (!address.ok) {
      return NextResponse.json(
        { message: 'Zip code not found' },
        { status: 404 },
      );
    }

    const addressData = await address.json();
    return NextResponse.json(addressData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching zip code' },
      { status: 500 },
    );
  }
}
