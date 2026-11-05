/**
 * Envia uma notificação para o Discord via webhook.
 * Usado para alertar quando um pagamento Pix é confirmado.
 */
export async function notifyDiscord(embed: {
  title: string
  description: string
  color?: number
  fields?: { name: string; value: string; inline?: boolean }[]
}) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL
  if (!webhookUrl) {
    console.warn('[Discord] DISCORD_WEBHOOK_URL não configurado.')
    return
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: 'Seleto Fatal · Pagamentos',
        avatar_url: 'https://cdn-icons-png.flaticon.com/512/190/190411.png',
        embeds: [
          {
            title: embed.title,
            description: embed.description,
            color: embed.color ?? 0x2ecc40, // verde padrão
            fields: embed.fields ?? [],
            footer: { text: 'Seleto Fatal · Sistema de Agendamentos' },
            timestamp: new Date().toISOString(),
          },
        ],
      }),
      cache: 'no-store',
    })
  } catch (err) {
    console.error('[Discord] Falha ao enviar webhook:', err)
  }
}

