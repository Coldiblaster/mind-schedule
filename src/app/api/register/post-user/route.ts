// src/app/api/user/get-user-metadata/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { error: 'Body é obrigatório' },
        { status: 400 },
      );
    }

    await fetch(`${process.env.API_URL}/register`, {
      method: 'POST',
      body: JSON.stringify(body),
      cache: 'no-cache',
    });

    // Retorna os metadados privados do usuário
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao obter metadados do usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao obter metadados do usuário' },
      { status: 500 },
    );
  }
}
