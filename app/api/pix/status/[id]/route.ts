import { NextResponse } from 'next/server'
import { notifyDiscord } from '@/lib/discord'

// Rastreia IDs já notificados para não disparar o Discord mais de uma vez por transação
const notifiedIds = new Set<string>()

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const apiKey = process.env.PROMISSE_API_KEY

    // Se estiver em modo demonstração ou sem chave configurada
    if (!apiKey || id.startsWith('demo_')) {
      return NextResponse.json({
        id,
        status: 'pending',
        demo: true,
      })
    }

    // Consulta de status na API oficial da PromissePay
    const response = await fetch(`https://api.promisse.com.br/transactions/${id}`, {
      method: 'GET',
      headers: {
        Authorization: apiKey,
      },
      cache: 'no-store',
    })

    const data = await response.json().catch(() => null)

    if (!response.ok || !data) {
      return NextResponse.json(
        { error: 'PROMISSE_API_ERROR', status: 'unknown', details: data },
        { status: response.status || 400 }
      )
    }

    const transactionId = data.id || data._id || id
    const status: string = data.status

    // Dispara notificação no Discord ao confirmar pagamento (uma única vez por transação)
    if (status === 'paid' && !notifiedIds.has(transactionId)) {
      notifiedIds.add(transactionId)
      const amountReais =
        data.amount && data.amount >= 100
          ? (data.amount / 100).toFixed(2)
          : data.amount ?? '—'

      await notifyDiscord({
        title: '✅ Pagamento Pix Confirmado!',
        description: `Um novo agendamento foi pago via Pix no **Seleto Fatal**.`,
        color: 0x2ecc40,
        fields: [
          { name: '🆔 ID da Transação', value: `\`${transactionId}\``, inline: false },
          { name: '💰 Valor', value: `R$ ${amountReais}`, inline: true },
          {
            name: '📅 Pago em',
            value: data.paidAt ? new Date(data.paidAt).toLocaleString('pt-BR') : 'Agora',
            inline: true,
          },
        ],
      })
    }

    return NextResponse.json({
      id: transactionId,
      status,
      paidAt: data.paidAt,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Erro interno do servidor'
    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}

