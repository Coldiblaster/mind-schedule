// src/app/api/user/get-user-metadata/route.ts
import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  try {
    const { userId, companyDataCompleted, userType } = await request.json(); // Captura o userId do corpo da requisição

    if (!userId) {
      return NextResponse.json(
        { error: 'userId é obrigatório' },
        { status: 400 },
      );
    }

    const user = await clerkClient().users.updateUserMetadata(userId, {
      privateMetadata: {
        companyDataCompleted,
        userType,
      },
    });

    // Retorna os metadados privados do usuário
    return NextResponse.json(user.privateMetadata);
  } catch (error) {
    console.error('Erro ao salvar os metadados do usuário:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar metadados do usuário' },
      { status: 500 },
    );
  }
}
