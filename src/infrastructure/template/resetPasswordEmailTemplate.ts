export function resetPasswordEmailTemplate(resetLink: string): string {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Recuperação de Senha - SeniorEase</title>
</head>
<body style="margin:0; padding:0; background-color:#f3f4f6; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td align="center" style="background: linear-gradient(to right, #1565c0, #0d47a1); padding: 36px 40px;">
              <h1 style="margin:0; color:#ffffff; font-size:32px; font-style:italic; letter-spacing:1px;">
                SeniorEase
              </h1>
              <p style="margin:8px 0 0; color:#bbdefb; font-size:14px;">
                Plataforma acessível para você
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px 40px 32px;">

              <h2 style="margin: 0 0 12px; font-size: 22px; color: #1e293b;">
                Recuperação de senha
              </h2>

              <p style="margin: 0 0 16px; font-size: 16px; color: #475569; line-height: 1.6;">
                Recebemos uma solicitação para redefinir a senha da sua conta no <strong>SeniorEase</strong>.
              </p>

              <p style="margin: 0 0 28px; font-size: 16px; color: #475569; line-height: 1.6;">
                Clique no botão abaixo para criar uma nova senha. Este link é válido por <strong>1 hora</strong>.
              </p>

              <!-- Button -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a
                      href="${resetLink}"
                      style="
                        display: inline-block;
                        background: linear-gradient(to right, #1565c0, #0d47a1);
                        color: #ffffff;
                        text-decoration: none;
                        font-size: 16px;
                        font-weight: bold;
                        padding: 14px 36px;
                        border-radius: 8px;
                        letter-spacing: 0.5px;
                      "
                    >
                      REDEFINIR SENHA
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <p style="margin: 28px 0 0; font-size: 13px; color: #94a3b8; line-height: 1.6;">
                Se o botão não funcionar, copie e cole o link abaixo no seu navegador:
              </p>
              <p style="margin: 6px 0 0; font-size: 13px; word-break: break-all;">
                <a href="${resetLink}" style="color: #1565c0;">${resetLink}</a>
              </p>

              <!-- Warning -->
              <table cellpadding="0" cellspacing="0" width="100%" style="margin-top: 28px;">
                <tr>
                  <td style="background-color:#fff8e1; border-left: 4px solid #f59e0b; border-radius: 4px; padding: 14px 16px;">
                    <p style="margin:0; font-size:13px; color:#92400e; line-height:1.5;">
                      ⚠️ Se você não solicitou a recuperação de senha, ignore este e-mail.
                      Sua senha permanecerá a mesma e nenhuma alteração será feita.
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
                Este e-mail foi enviado automaticamente pelo <strong>SeniorEase</strong>. Por favor, não responda.
                <br/>
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