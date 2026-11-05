import { NextResponse } from 'next/server'
import { notifyDiscord } from '@/lib/discord'

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const { amount = 350, description = 'Agendamento - Seleto Fatal' } = body

    const apiKey = process.env.PROMISSE_API_KEY?.trim()

    if (!apiKey) {
      return NextResponse.json(
        {
          error: 'MISSING_API_KEY',
          message: 'Chave PROMISSE_API_KEY não configurada no arquivo .env.local.',
        },
        { status: 500 }
      )
    }

    // A documentação oficial da PromissePay exige o valor em centavos como número inteiro (mínimo 50)
    const amountInCents = Number(amount) >= 1000 ? Math.round(Number(amount)) : Math.round(Number(amount) * 100)

    // Chamada oficial documentada em promisse.com.br/docs
    const response = await fetch('https://api.promisse.com.br/transactions', {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amountInCents,
        description,
      }),
      cache: 'no-store',
    })

    const data = await response.json().catch(() => null)

    // Sucesso retornado pela PromissePay (200 / 201)
    if (response.ok && data && (data.qrCodeBase64 || data.copyPaste || data.id)) {
      const transactionId = data.id || data._id
      const amountReais = amountInCents >= 100
        ? (amountInCents / 100).toFixed(2)
        : amountInCents

      // Notifica Discord que um Pix foi gerado e está aguardando pagamento
      await notifyDiscord({
        title: '🕐 Pix Gerado — Aguardando Pagamento',
        description: `Um novo Pix foi criado no **Seleto Fatal** e está pendente de pagamento.`,
        color: 0xf0a500, // amarelo/laranja para pendente
        fields: [
          { name: '🆔 ID da Transação', value: `\`${transactionId}\``, inline: false },
          { name: '💰 Valor', value: `R$ ${amountReais}`, inline: true },
          { name: '📋 Descrição', value: description, inline: true },
          {
            name: '⏰ Gerado em',
            value: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
            inline: false,
          },
        ],
      })

      return NextResponse.json({
        id: transactionId,
        status: data.status || 'pending',
        amount: data.amount,
        qrCodeBase64: data.qrCodeBase64,
        copyPaste: data.copyPaste || data.pixCopiaECola,
        expiresAt: data.expiresAt || data.expirationDate,
      })
    }

    // Em caso de erro vindo da PromissePay (ex: instabilidade no adquirente ElitePay)
    console.error('Erro na resposta da PromissePay:', response.status, data)
    return NextResponse.json(
      {
        error: data?.code || 'PROMISSE_API_ERROR',
        message: data?.message || 'Erro ao gerar cobrança na PromissePay.',
        details: data,
        status: response.status,
      },
      { status: response.status >= 400 && response.status < 600 ? response.status : 500 }
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno do servidor'
    console.error('Exceção ao chamar PromissePay:', error)
    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}
