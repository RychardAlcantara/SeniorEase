"use client"

import Navbar from "@/src/presentation/components/Navbar"
import { useContraste } from "@/src/presentation/contexts/ContrasteContext"
import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Stack from "@mui/material/Stack"
import Accordion from "@mui/material/Accordion"
import AccordionSummary from "@mui/material/AccordionSummary"
import AccordionDetails from "@mui/material/AccordionDetails"
import Divider from "@mui/material/Divider"
import { ChevronDown, HelpCircle, BookOpen, MessageCircleQuestion, Phone, Mail, LifeBuoy } from "lucide-react"
import { PrivateRoute } from "@/src/presentation/components/PrivateRoute"

const guiaSections = [
  {
    titulo: "Como criar uma tarefa",
    descricao:
      'Clique no botão "Criar nova tarefa" presente na tela principal (Início) ou na tela de Tarefas. Preencha o nome da tarefa, a data e confirme. Ela aparecerá na seção "Minhas Tarefas".',
  },
  {
    titulo: "Como concluir uma tarefa",
    descricao:
      'Na lista de tarefas, encontre a tarefa desejada e clique no botão "Concluir". A tarefa será concluída e movida para o histórico.',
  },
  {
    titulo: "Como editar uma tarefa",
    descricao:
      'No modo Avançado, cada tarefa possui um botão "Editar". Clique nele para alterar o nome ou as informações da tarefa. Após, clique em salvar para salvar as alterações.',
  },
  {
    titulo: "Como excluir uma tarefa",
    descricao:
      'No modo Avançado, cada tarefa possui um botão "Excluir". Clique nele e confirme a exclusão na janela que aparecer. Atenção: essa ação não pode ser desfeita.',
  },
  {
    titulo: "Como alterar as configurações",
    descricao:
      'Acesse o menu "Configurações" na barra de navegação. Lá você pode alterar o tamanho da fonte, espaçamento entre letras, ativar o alto contraste e escolher entre o modo Simplificado ou Avançado.',
  },
  {
    titulo: "Como ativar o Alto Contraste",
    descricao:
      "Você pode ativar o alto contraste de duas formas: pelo botão na tela principal (Início) ou pela página de Configurações. O modo alto contraste usa fundo escuro e cores vibrantes para facilitar a leitura.",
  },
  {
    titulo: "Diferença entre modo Simplificado e Avançado",
    descricao:
      "O modo Simplificado mostra apenas o essencial, com menos informações na tela. Ele é indicado para quem prefere uma navegação mais fácil e sem distrações. O modo Avançado exibe mais opções e detalhes, como estatísticas, edição e exclusão de tarefas e outras funcionalidades. Ele é indicado para quem já tem mais familiaridade com o sistema.",
  },
  {
    titulo: "Como usar a tela de Tarefas",
    descricao:
      'Na barra de navegação, clique em "Tarefas" para acessar a tela completa de gerenciamento. Lá você encontra duas abas: "Pendentes" com as tarefas a fazer e "Concluídas" com o histórico. No modo Avançado, você também pode usar o campo de busca para encontrar tarefas pelo nome, os botões de ordenação para organizar por data, o botão de editar e o botão de excluir em cada tarefa.',
  },
]

const faqItems = [
  {
    pergunta: "Minhas configurações são salvas automaticamente?",
    resposta:
      'Sim. Na tela de Configurações, todas as alterações são aplicadas e salvas automaticamente assim que você seleciona uma opção. Não é necessário clicar em nenhum botão para confirmar.',
  },
  {
    pergunta: "Como aumento o tamanho das letras?",
    resposta:
      'Acesse Configurações na barra de navegação e na seção "Tamanho da Fonte" escolha entre A- (menor), A (normal) ou A+ (maior). A alteração será aplicada automaticamente.',
  },
  {
    pergunta: "O que é o espaçamento ampliado?",
    resposta:
      "O espaçamento ampliado aumenta a distância entre as letras em toda a aplicação, facilitando a leitura para pessoas com dificuldade visual.",
  },
  {
    pergunta: "Onde vejo as tarefas que já concluí?",
    resposta:
      'Você pode ver as tarefas concluídas de duas formas: no Modo Avançado do Início, a seção "Histórico" aparece ao lado da lista de tarefas. Ou acesse a tela "Tarefas" na barra de navegação e clique na aba "Concluídas" para ver o histórico completo.',
  },
  {
    pergunta: "Como excluo uma tarefa?",
    resposta:
      'No modo Avançado, cada tarefa na lista possui um botão "Excluir". Clique nele e uma janela de confirmação será exibida. Confirme clicando em "Excluir" para remover a tarefa permanentemente. Atenção: essa ação não pode ser desfeita. No modo Simplificado, a opção de excluir não é exibida.',
  },
  {
    pergunta: "Como busco uma tarefa específica?",
    resposta:
      'No modo Avançado, na tela "Tarefas", utilize o campo de busca no topo da página. Digite parte do nome da tarefa e a lista será filtrada automaticamente, tanto na aba de pendentes quanto na de concluídas. No modo Simplificado, o campo de busca não é exibido.',
  },
  {
    pergunta: "Como ordeno as tarefas por data?",
    resposta:
      'No modo Avançado, na tela "Tarefas", ao lado do campo de busca, você encontra os botões "Mais antigas" e "Mais recentes". Clique em "Mais antigas" para ver primeiro as tarefas com datas mais próximas, ou em "Mais recentes" para ver as mais recentes no topo. No modo Simplificado, essa opção não é exibida.',
  },
  {
    pergunta: "Como volto para a tela principal?",
    resposta:
      'Clique em "Início" na barra de navegação no topo da página.',
  },
]

function HelpContent() {
  const { altoContraste } = useContraste()

  const cardSx = {
    borderRadius: 3,
    boxShadow: 3,
    backgroundColor: altoContraste ? "var(--color-hc-bg)" : "var(--color-bg-card)",
    border: altoContraste ? "2px solid var(--color-hc-accent)" : "none",
    transition: "all 0.3s ease",
  }

  const headingColor = altoContraste ? "var(--color-hc-text)" : "var(--color-text-primary)"
  const textColor = altoContraste ? "var(--color-hc-text)" : "var(--color-text-secondary)"
  const accentColor = altoContraste ? "var(--color-hc-accent)" : "var(--color-primary)"

  return (
    <PrivateRoute>
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: altoContraste ? "var(--color-hc-bg)" : "var(--color-bg-page)",
        color: altoContraste ? "var(--color-hc-text)" : "inherit",
        transition: "all 0.3s ease",
      }}
    >
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Cabeçalho */}
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1 }}>
          <LifeBuoy size={32} color={accentColor} />
          <Typography variant="h4" sx={{ fontWeight: 700, color: headingColor }}>
            Central de Ajuda
          </Typography>
        </Stack>
        <Typography variant="body1" sx={{ color: textColor, mb: 4 }}>
          Encontre aqui tudo o que precisa saber para utilizar o SeniorEase com facilidade.
        </Typography>

        {/* Guia de Uso */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <BookOpen size={24} color={accentColor} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: headingColor }}>
            Guia de Uso
          </Typography>
        </Stack>

        <Card sx={{ ...cardSx, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Stack spacing={3}>
              {guiaSections.map((section, index) => (
                <Box key={index}>
                  <Typography variant="h6" sx={{ fontWeight: 600, color: headingColor, mb: 0.5 }}>
                    {index + 1}. {section.titulo}
                  </Typography>
                  <Typography variant="body1" sx={{ color: textColor, lineHeight: 1.8 }}>
                    {section.descricao}
                  </Typography>
                  {index < guiaSections.length - 1 && (
                    <Divider sx={{ mt: 2, borderColor: altoContraste ? "var(--color-hc-accent)" : undefined, opacity: 0.4 }} />
                  )}
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <MessageCircleQuestion size={24} color={accentColor} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: headingColor }}>
            Perguntas Frequentes (FAQ)
          </Typography>
        </Stack>

        <Stack spacing={2} sx={{ mb: 4 }}>
          {faqItems.map((item, index) => (
            <Accordion
              key={index}
              disableGutters
              sx={{
                borderRadius: 3,
                backgroundColor: altoContraste ? "var(--color-hc-bg)" : "var(--color-bg-card)",
                border: altoContraste ? "2px solid var(--color-hc-accent)" : "1px solid rgba(0,0,0,0.12)",
                boxShadow: "none",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:before": { display: "none" },
                "&.Mui-expanded": { margin: 0 },
              }}
            >
              <AccordionSummary
                expandIcon={<ChevronDown size={20} color={accentColor} />}
                sx={{ px: 3, py: 1 }}
              >
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <HelpCircle size={20} color={accentColor} />
                  <Typography variant="body1" sx={{ fontWeight: 600, color: headingColor }}>
                    {item.pergunta}
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ px: 3, pb: 2 }}>
                <Typography variant="body1" sx={{ color: textColor, lineHeight: 1.8 }}>
                  {item.resposta}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Stack>

        {/* Contato / Suporte */}
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <Phone size={24} color={accentColor} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: headingColor }}>
            Precisa de mais ajuda?
          </Typography>
        </Stack>

        <Card sx={{ ...cardSx, mb: 4 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="body1" sx={{ color: textColor, mb: 2, lineHeight: 1.8 }}>
              Se não encontrou a resposta que procurava, entre em contato com a nossa equipe de suporte:
            </Typography>

            <Stack spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Phone size={18} color={accentColor} />
                <Typography variant="body1" sx={{ color: headingColor, fontWeight: 600 }}>
                  Telefone: (11) 12345-6789
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Mail size={18} color={accentColor} />
                <Typography variant="body1" sx={{ color: headingColor, fontWeight: 600 }}>
                  E-mail: suporte@seniorease.com.br
                </Typography>
              </Stack>
            </Stack>

            <Divider sx={{ my: 2.5, borderColor: altoContraste ? "var(--color-hc-accent)" : undefined, opacity: 0.4 }} />

            <Typography variant="body2" sx={{ color: textColor, fontStyle: "italic" }}>
              Horário de atendimento: Segunda a Sexta, das 8h às 18h.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
    </PrivateRoute>
  )
}

export default function HelpPage() {
  return <HelpContent />
}
