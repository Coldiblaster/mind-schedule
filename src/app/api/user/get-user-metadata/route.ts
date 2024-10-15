// src/app/api/user/get-user-metadata/route.ts
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json(); // Captura o userId do corpo da requisição

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 },
      );
    }

    const user = await clerkClient.users.getUser(userId);

    // Retorna os metadados privados do usuário
    return NextResponse.json(user.privateMetadata);
  } catch (error) {
    console.error('Erro ao obter metadados do usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao obter metadados do usuário' },
      { status: 500 },
    );
  }
}
