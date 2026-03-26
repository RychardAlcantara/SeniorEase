export function taskReminderEmailTemplate(taskTitle: string, userName: string, isOneHour = false): string {
  const heading = isOneHour ? "⏰ Falta 1 hora!" : "📋 Lembrete de Tarefa"
  const message = isOneHour
    ? `A tarefa abaixo vence em aproximadamente <strong>1 hora</strong>:`
    : `Você tem uma tarefa para ser concluída <strong>hoje</strong>:`
  const tip = isOneHour
    ? "💡 Acesse o SeniorEase agora para não perder o prazo."
    : "💡 Acesse o SeniorEase para marcar sua tarefa como concluída."

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Lembrete de Tarefa - SeniorEase</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background: linear-gradient(to right, #1565c0, #0d47a1); padding: 36px 40px;">
              <h1 style="margin:0; color:#ffffff; font-size:32px; font-style:italic;">SeniorEase</h1>
              <p style="margin:8px 0 0; color:#bbdefb; font-size:14px;">Plataforma acessível para você</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 40px 32px;">
              <h2 style="margin: 0 0 12px; font-size: 22px; color: #1e293b;">
                ${heading}
              </h2>
              <p style="margin: 0 0 16px; font-size: 16px; color: #475569; line-height: 1.6;">
                Olá, <strong>${userName}</strong>!
              </p>
              <p style="margin: 0 0 24px; font-size: 16px; color: #475569; line-height: 1.6;">
                ${message}
              </p>

              <!-- Task card -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td style="background:#f0f7ff; border-left: 4px solid #1565c0; border-radius: 4px; padding: 16px 20px;">
                    <p style="margin:0; font-size:18px; font-weight:bold; color:#1565c0;">
                      📋 ${taskTitle}
                    </p>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"}/dashboard"
                      style="display:inline-block; background: linear-gradient(to right, #1565c0, #0d47a1); color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold; padding:14px 36px; border-radius:8px;">
                      VER MINHAS TAREFAS
                    </a>
                  </td>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" width="100%" style="margin-top: 28px;">
                <tr>
                  <td style="background-color:#fff8e1; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 14px 16px;">
                    <p style="margin:0; font-size:13px; color:#92400e; line-height:1.5;">
                      ${tip}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
              <p style="margin:0; font-size:12px; color:#94a3b8; text-align:center; line-height:1.6;">
                Este e-mail foi enviado automaticamente pelo <strong>SeniorEase</strong>.<br/>
                © ${new Date().getFullYear()} SeniorEase. Todos os direitos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}