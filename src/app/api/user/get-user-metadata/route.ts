'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId'); // Obtém o userId dos parâmetros da URL

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 },
      );
    }

    // Obtém o usuário do Clerk com base no userId
    const user = await clerkClient().users.getUser(userId);

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
