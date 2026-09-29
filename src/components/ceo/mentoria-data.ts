export interface Slide {
  title: string;
  bullets: string[];
  highlight?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  slides: Slide[];
}

export interface Mentoria {
  id: string;
  title: string;
  description: string;
  category: string;
  lessons: Lesson[];
}

export const mentorias: Mentoria[] = [
  {
    id: "posicionamento-estrategico",
    title: "Posicionamento Estratégico",
    description: "Como posicionar sua empresa no mercado para atrair os clientes certos",
    category: "Estratégia",
    lessons: [
      {
        id: "pe-1", title: "Fundamentos do Posicionamento", description: "Entenda o que é posicionamento e por que ele define o sucesso do seu negócio.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Fundamentos do Posicionamento", bullets: ["O que é posicionamento de mercado", "Por que empresas bem posicionadas crescem mais rápido", "Os 3 pilares: diferenciação, relevância e credibilidade"], highlight: "Posicionar é escolher ser o melhor em algo específico." },
          { title: "O Erro Mais Comum", bullets: ["Tentar agradar todo mundo", "Competir apenas por preço", "Não comunicar o diferencial", "Copiar concorrentes sem estratégia"] },
          { title: "Cases de Sucesso", bullets: ["Empresa A: de genérica a líder de nicho em 6 meses", "Empresa B: triplicou o ticket médio com reposicionamento", "O padrão em comum: clareza + coragem"] },
          { title: "Exercício Prático", bullets: ["Defina em 1 frase o que torna sua empresa única", "Liste 3 motivos pelos quais um cliente escolhe você", "Identifique o que você faz melhor que qualquer concorrente"] },
        ],
      },
      {
        id: "pe-2", title: "Análise de Mercado e Concorrência", description: "Mapeie seus concorrentes e encontre oportunidades de diferenciação.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Análise de Mercado", bullets: ["Como mapear o cenário competitivo", "Ferramentas gratuitas para pesquisa de mercado", "Identificando tendências e oportunidades"], highlight: "Quem conhece o mercado, domina o jogo." },
          { title: "Matriz de Concorrência", bullets: ["Como criar sua matriz de concorrência", "Analisar pontos fortes e fracos dos competidores", "Encontrar espaços não ocupados no mercado"] },
          { title: "Oportunidades Escondidas", bullets: ["Nichos mal atendidos", "Demandas não resolvidas pelos concorrentes", "Tendências emergentes no seu segmento"] },
          { title: "Plano de Ação", bullets: ["Monte sua matriz competitiva com 5 concorrentes", "Identifique 3 gaps de mercado", "Defina sua estratégia de diferenciação"] },
        ],
      },
      {
        id: "pe-3", title: "Definindo seu Público Ideal", description: "Construa a persona do cliente que gera mais lucro para sua empresa.", videoUrl: "", duration: "22min",
        slides: [
          { title: "Seu Público Ideal", bullets: ["Diferença entre público-alvo e persona", "Por que o cliente ideal é mais lucrativo", "Como identificar quem realmente valoriza seu trabalho"], highlight: "Vender para todos é vender para ninguém." },
          { title: "Construindo a Persona", bullets: ["Dados demográficos essenciais", "Dores, desejos e frustrações", "Comportamento de compra", "Onde busca informação"] },
          { title: "Validação da Persona", bullets: ["Entreviste seus melhores clientes", "Analise dados de vendas anteriores", "Teste hipóteses com campanhas segmentadas"] },
        ],
      },
      {
        id: "pe-4", title: "Proposta de Valor Única", description: "Crie uma mensagem irresistível que destaque sua empresa.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Proposta de Valor", bullets: ["O que é uma proposta de valor única (PVU)", "Fórmula: Resultado + Diferencial + Prova", "Exemplos de PVUs poderosas"], highlight: "Sua proposta de valor é a razão pela qual o cliente escolhe você." },
          { title: "Construindo sua PVU", bullets: ["Identifique o resultado principal que você entrega", "Destaque o que torna seu método diferente", "Adicione provas sociais e garantias"] },
          { title: "Comunicando sua PVU", bullets: ["Como usar em anúncios e landing pages", "Scripts de vendas baseados na PVU", "Alinhando toda a equipe à mensagem"] },
        ],
      },
      {
        id: "pe-5", title: "Branding e Identidade", description: "Alinhe sua marca visual e verbal ao seu posicionamento.", videoUrl: "", duration: "20min",
        slides: [
          { title: "Branding Estratégico", bullets: ["Marca não é logo — é percepção", "Os 5 elementos da identidade de marca", "Consistência gera confiança"], highlight: "Sua marca é o que dizem de você quando você não está na sala." },
          { title: "Identidade Visual", bullets: ["Cores que comunicam seus valores", "Tipografia e hierarquia visual", "Aplicações práticas: redes sociais, site, materiais"] },
          { title: "Tom de Voz", bullets: ["Defina como sua marca fala", "Exemplos de tom profissional vs. informal", "Guia prático de comunicação da marca"] },
        ],
      },
      {
        id: "pe-6", title: "Precificação Estratégica", description: "Defina preços que reflitam seu valor e atraiam o público certo.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Precificação Estratégica", bullets: ["Preço baixo atrai problema, preço justo atrai valor", "3 modelos de precificação: custo, mercado e valor", "Como aumentar preços sem perder clientes"], highlight: "Preço é posicionamento. Preço baixo = marca fraca." },
          { title: "Ancoragem de Preço", bullets: ["Técnica de ancoragem para valorizar suas ofertas", "Criando pacotes e bundles estratégicos", "Upsell e downsell inteligente"] },
          { title: "Implementação", bullets: ["Calcule seu preço ideal baseado em valor", "Comunique o aumento com confiança", "Monitore a resposta do mercado"] },
        ],
      },
      {
        id: "pe-7", title: "Comunicação e Canais", description: "Escolha os canais certos para transmitir seu posicionamento.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Canais de Comunicação", bullets: ["Onde seu público ideal consome conteúdo", "Estratégia omnichannel simplificada", "Menos canais, mais profundidade"], highlight: "Esteja onde seu cliente está, não onde todo mundo está." },
          { title: "Conteúdo por Canal", bullets: ["Instagram: visual + storytelling", "LinkedIn: autoridade + networking", "Google: intenção de busca + SEO", "WhatsApp: relacionamento + vendas"] },
          { title: "Plano de Comunicação", bullets: ["Monte seu calendário editorial", "Defina frequência e formatos", "Métricas de acompanhamento por canal"] },
        ],
      },
      {
        id: "pe-8", title: "Plano de Ação de Posicionamento", description: "Monte seu plano prático de implementação.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Plano de Ação", bullets: ["Resumo das decisões estratégicas", "Cronograma de implementação em 90 dias", "Prioridades: o que fazer primeiro"], highlight: "Estratégia sem execução é ilusão." },
          { title: "Checklist de Implementação", bullets: ["✅ Persona definida", "✅ PVU criada", "✅ Preços ajustados", "✅ Canais selecionados", "✅ Identidade alinhada"] },
          { title: "Próximos Passos", bullets: ["Agende sua sessão de mentoria para revisão", "Compartilhe seu plano com a equipe", "Defina responsáveis e prazos para cada ação"] },
        ],
      },
    ],
  },
  {
    id: "funil-vendas-inteligente",
    title: "Funil de Vendas Inteligente",
    description: "Construa um funil que converte leads em clientes de forma previsível",
    category: "Vendas",
    lessons: [
      {
        id: "fv-1", title: "Fundamentos do Funil", description: "Entenda as etapas do funil e como elas se conectam.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Fundamentos do Funil de Vendas", bullets: ["O que é um funil e por que ele é essencial", "As 4 etapas: Atração → Interesse → Decisão → Ação", "Diferença entre funil de marketing e funil de vendas"], highlight: "Sem funil, você depende de sorte. Com funil, você tem previsibilidade." },
          { title: "Diagnóstico do seu Funil Atual", bullets: ["Onde seus leads entram hoje?", "Quantos se perdem em cada etapa?", "Qual sua taxa de conversão atual?"] },
          { title: "Arquitetura do Funil Ideal", bullets: ["Desenhe o funil para seu negócio", "Defina gatilhos de passagem entre etapas", "Automatize o que for possível"] },
        ],
      },
      {
        id: "fv-2", title: "Aquisição de Leads", description: "Estratégias para atrair leads qualificados no topo do funil.", videoUrl: "", duration: "32min",
        slides: [
          { title: "Aquisição de Leads", bullets: ["Tráfego pago vs. orgânico: quando usar cada um", "Lead magnets que funcionam em 2024", "Landing pages que convertem acima de 30%"], highlight: "Lead bom é lead que já chega querendo comprar." },
          { title: "Fontes de Tráfego", bullets: ["Meta Ads: público frio e lookalike", "Google Ads: capturando intenção de compra", "Conteúdo orgânico: longo prazo e autoridade"] },
          { title: "Otimização de Captura", bullets: ["Formulários simples vs. completos", "CTAs que geram ação imediata", "Testes A/B para maximizar conversão"] },
        ],
      },
      {
        id: "fv-3", title: "Qualificação de Leads", description: "Como separar leads quentes dos frios de forma eficiente.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Qualificação de Leads", bullets: ["Lead scoring: pontue seus leads automaticamente", "Critérios de qualificação: BANT e SPIN", "Automatize a triagem com formulários inteligentes"], highlight: "Não trate todos os leads igual. Priorize quem está pronto." },
          { title: "Implementação Prática", bullets: ["Configure seu sistema de pontuação", "Crie alertas para leads quentes", "Defina o handoff entre marketing e vendas"] },
        ],
      },
      {
        id: "fv-4", title: "Nutrição de Leads", description: "Conteúdo e automações para aquecer leads ao longo do tempo.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Nutrição de Leads", bullets: ["Sequências de e-mail que educam e vendem", "Conteúdo por etapa do funil", "Remarketing inteligente"], highlight: "83% dos leads não estão prontos para comprar. Nutra-os." },
          { title: "Automações de Nutrição", bullets: ["Fluxos de e-mail automatizados", "Segmentação por comportamento", "Gatilhos de reengajamento"] },
        ],
      },
      {
        id: "fv-5", title: "Conversão em Cliente", description: "Técnicas de fechamento e gatilhos mentais para converter.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Conversão em Cliente", bullets: ["Os 6 gatilhos mentais mais poderosos", "Scripts de fechamento para WhatsApp e reunião", "Como lidar com objeções comuns"], highlight: "Fechar é consequência de um bom processo." },
          { title: "Técnicas de Fechamento", bullets: ["Fechamento por alternativa", "Fechamento por urgência real", "Fechamento por prova social"] },
        ],
      },
      {
        id: "fv-6", title: "Follow-up Estratégico", description: "Como fazer follow-up sem ser invasivo.", videoUrl: "", duration: "22min",
        slides: [
          { title: "Follow-up Estratégico", bullets: ["80% das vendas acontecem após o 5º contato", "Cadência ideal de follow-up", "Templates prontos para cada situação"], highlight: "A maioria desiste no 2º contato. A venda está no 5º." },
          { title: "Automação do Follow-up", bullets: ["Ferramentas para automatizar lembretes", "Mensagens personalizadas em escala", "Quando parar de fazer follow-up"] },
        ],
      },
      {
        id: "fv-7", title: "Métricas do Funil", description: "KPIs essenciais para medir e otimizar cada etapa.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Métricas do Funil", bullets: ["CPL, CPA, LTV, ROI — o que significam", "Dashboard de vendas essencial", "Como identificar gargalos no funil"], highlight: "O que não é medido, não é gerenciado." },
          { title: "Análise e Otimização", bullets: ["Identifique a etapa com maior perda", "Teste soluções com prioridade", "Revise métricas semanalmente"] },
        ],
      },
      {
        id: "fv-8", title: "Automação do Funil", description: "Ferramentas e fluxos para automatizar seu funil.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Automação do Funil", bullets: ["CRM: organize seus leads automaticamente", "Chatbots para qualificação 24/7", "Integrações entre plataformas"], highlight: "Automatize o repetitivo, humanize o estratégico." },
          { title: "Stack de Ferramentas", bullets: ["CRM recomendados por porte", "Ferramentas de automação de marketing", "Integrações via Zapier/Make"] },
        ],
      },
      {
        id: "fv-9", title: "Otimização Contínua", description: "Testes A/B e melhorias incrementais no funil.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Otimização Contínua", bullets: ["Metodologia de testes A/B", "O que testar primeiro para maior impacto", "Ciclos de otimização semanal e mensal"], highlight: "Pequenas melhorias geram grandes resultados compostos." },
        ],
      },
      {
        id: "fv-10", title: "Funil para Diferentes Segmentos", description: "Adapte o funil ao seu nicho de mercado.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Funis por Segmento", bullets: ["Funil para serviços de alto ticket", "Funil para e-commerce", "Funil para negócios locais", "Funil para SaaS e recorrência"], highlight: "Não existe funil universal. Adapte ao seu mercado." },
        ],
      },
      {
        id: "fv-11", title: "Cases de Sucesso", description: "Análise de funis reais que geram resultado.", videoUrl: "", duration: "22min",
        slides: [
          { title: "Cases de Sucesso", bullets: ["Empresa X: de 3% para 18% de conversão", "Empresa Y: reduziu o ciclo de venda de 45 para 12 dias", "Os padrões em comum dos funis que funcionam"], highlight: "Aprenda com quem já fez." },
        ],
      },
      {
        id: "fv-12", title: "Escala do Funil", description: "Como escalar seu funil mantendo a qualidade.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Escalando o Funil", bullets: ["Quando é hora de escalar", "Como aumentar investimento sem perder ROI", "Contratação e processos para volume"], highlight: "Escalar é replicar o que funciona." },
          { title: "Plano de Escala", bullets: ["Defina metas de escala em 90 dias", "Monte seu time comercial", "Automatize e delegue"] },
        ],
      },
    ],
  },
  {
    id: "presenca-digital",
    title: "Presença Digital",
    description: "Domine redes sociais e tráfego pago para gerar leads qualificados",
    category: "Marketing",
    lessons: [
      {
        id: "pd-1", title: "Panorama Digital", description: "Visão geral das plataformas e onde seu público está.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Panorama Digital 2024", bullets: ["Onde os brasileiros estão online", "Plataformas por faixa etária e poder aquisitivo", "Tendências que vão dominar os próximos 12 meses"], highlight: "O digital não é opcional. É onde seu cliente decide comprar." },
          { title: "Escolhendo suas Batalhas", bullets: ["Não precisa estar em todas as plataformas", "Critérios para escolher onde investir", "Estratégia de presença mínima viável"] },
        ],
      },
      {
        id: "pd-2", title: "Instagram para Negócios", description: "Estratégias de conteúdo e crescimento no Instagram.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Instagram para Negócios", bullets: ["Perfil otimizado: bio, destaques e feed", "Os 4 tipos de conteúdo que geram resultado", "Reels vs. Stories vs. Carrossel: quando usar cada um"], highlight: "Instagram é vitrine. Seu conteúdo é o vendedor." },
          { title: "Estratégia de Conteúdo", bullets: ["Calendário editorial semanal", "Hashtags estratégicas por nicho", "Horários de maior engajamento"] },
        ],
      },
      {
        id: "pd-3", title: "Google Meu Negócio", description: "Otimize sua presença local e apareça nas buscas.", videoUrl: "", duration: "20min",
        slides: [
          { title: "Google Meu Negócio", bullets: ["Configure e otimize seu perfil", "Fotos, posts e atualizações regulares", "Gestão de avaliações e reputação"], highlight: "97% dos consumidores buscam negócios locais no Google." },
        ],
      },
      {
        id: "pd-4", title: "Tráfego Pago — Meta Ads", description: "Fundamentos de anúncios no Facebook e Instagram.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Meta Ads — Fundamentos", bullets: ["Estrutura: Campanha → Conjunto → Anúncio", "Objetivos de campanha: qual escolher", "Públicos: frio, morno e quente"], highlight: "Tráfego pago é acelerador. Sem estratégia, é gasto." },
          { title: "Criando Anúncios que Vendem", bullets: ["Copy persuasiva: gancho + dor + solução + CTA", "Criativos que param o scroll", "Testes A/B para encontrar o vencedor"] },
          { title: "Otimização e Escala", bullets: ["Métricas essenciais: CTR, CPC, CPL, ROAS", "Quando matar ou escalar um anúncio", "Orçamento ideal para começar"] },
        ],
      },
      {
        id: "pd-5", title: "Tráfego Pago — Google Ads", description: "Campanhas de pesquisa e display no Google.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Google Ads — Fundamentos", bullets: ["Rede de Pesquisa vs. Display vs. YouTube", "Palavras-chave: correspondência ampla, frase e exata", "Estrutura de campanha eficiente"], highlight: "Google captura quem já está procurando. É intenção pura." },
          { title: "Otimização de Campanhas", bullets: ["Palavras-chave negativas essenciais", "Extensões de anúncio que aumentam CTR", "Quality Score e como melhorá-lo"] },
        ],
      },
      {
        id: "pd-6", title: "Conteúdo que Converte", description: "Como criar posts e vídeos que geram leads.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Conteúdo que Converte", bullets: ["Framework AIDA para posts", "Storytelling aplicado a negócios", "CTAs que geram ação real"], highlight: "Conteúdo bom educa. Conteúdo excelente vende educando." },
        ],
      },
      {
        id: "pd-7", title: "Landing Pages Eficientes", description: "Páginas de captura que convertem visitantes em leads.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Landing Pages", bullets: ["Elementos essenciais de uma LP de alta conversão", "Above the fold: o que precisa estar ali", "Formulários otimizados para cada objetivo"], highlight: "Uma boa landing page converte 30%+. A média é 3%." },
        ],
      },
      {
        id: "pd-8", title: "E-mail Marketing", description: "Sequências de e-mail para nutrir e converter.", videoUrl: "", duration: "22min",
        slides: [
          { title: "E-mail Marketing", bullets: ["Por que e-mail ainda é o canal com maior ROI", "Sequência de boas-vindas perfeita", "Segmentação para personalização em escala"], highlight: "E-mail marketing gera R$42 para cada R$1 investido." },
        ],
      },
      {
        id: "pd-9", title: "Análise de Resultados", description: "Leia métricas e tome decisões baseadas em dados.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Análise de Resultados", bullets: ["Google Analytics 4: métricas essenciais", "Relatórios semanais simplificados", "Tomada de decisão baseada em dados"] },
        ],
      },
      {
        id: "pd-10", title: "Plano de Presença Digital", description: "Monte seu calendário e estratégia completa.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Seu Plano Digital", bullets: ["Defina 2-3 canais prioritários", "Monte o calendário editorial do mês", "Defina orçamento e metas por canal", "Revise resultados semanalmente"] },
        ],
      },
    ],
  },
  {
    id: "gestao-equipe-comercial",
    title: "Gestão de Equipe Comercial",
    description: "Lidere sua equipe de vendas com métricas e processos eficientes",
    category: "Gestão",
    lessons: [
      {
        id: "ge-1", title: "Perfil do Vendedor Ideal", description: "Como contratar e formar vendedores de alta performance.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Perfil do Vendedor Ideal", bullets: ["Competências técnicas vs. comportamentais", "Onde encontrar bons vendedores", "Processo seletivo que filtra os melhores"], highlight: "Contrate caráter, treine habilidade." },
          { title: "Onboarding Comercial", bullets: ["Primeiros 30 dias do novo vendedor", "Materiais e scripts de treinamento", "Metas progressivas de ramp-up"] },
        ],
      },
      {
        id: "ge-2", title: "Processos Comerciais", description: "Crie processos claros para padronizar a operação.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Processos Comerciais", bullets: ["Playbook de vendas: o manual do vendedor", "Pipeline de vendas padronizado", "Ferramentas de CRM essenciais"], highlight: "Processo bom faz vendedor médio vender como top performer." },
        ],
      },
      {
        id: "ge-3", title: "Metas e Indicadores", description: "Defina metas realistas e acompanhe KPIs.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Metas e KPIs", bullets: ["Como definir metas SMART para vendas", "KPIs por etapa do funil", "Dashboard comercial essencial"], highlight: "Meta sem acompanhamento é desejo." },
          { title: "Comissionamento", bullets: ["Modelos de comissão que motivam", "Fixo vs. variável: encontre o equilíbrio", "Bonificações por resultado de equipe"] },
        ],
      },
      {
        id: "ge-4", title: "Treinamento Contínuo", description: "Rotinas de capacitação para manter a equipe afiada.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Treinamento Contínuo", bullets: ["Role-plays semanais: simule vendas reais", "Análise de ligações e reuniões gravadas", "Biblioteca de objeções e respostas"], highlight: "Vendedor que para de treinar, para de vender." },
        ],
      },
      {
        id: "ge-5", title: "Liderança Comercial", description: "Como liderar vendedores com motivação e resultado.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Liderança Comercial", bullets: ["Líder coach vs. líder cobrador", "Como motivar sem depender de dinheiro", "Cultura de alta performance"], highlight: "O líder não faz vendas. Ele faz vendedores." },
        ],
      },
      {
        id: "ge-6", title: "Reuniões e Feedbacks", description: "Estruture reuniões produtivas e feedbacks construtivos.", videoUrl: "", duration: "29min",
        slides: [
          { title: "Reuniões e Feedbacks", bullets: ["Daily de vendas: 15 min que transformam resultados", "Feedback SBI: Situação, Comportamento, Impacto", "1:1 semanal com cada vendedor"], highlight: "Feedback é presente. Quem não recebe, não cresce." },
        ],
      },
    ],
  },
  {
    id: "modelo-negocio-escalavel",
    title: "Modelo de Negócio Escalável",
    description: "Estruture sua empresa para crescer sem perder qualidade",
    category: "Estratégia",
    lessons: [
      {
        id: "mn-1", title: "Fundamentos de Escala", description: "O que significa escalar e quando é o momento certo.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Fundamentos de Escala", bullets: ["Crescer vs. escalar: qual a diferença?", "Sinais de que sua empresa está pronta", "Os 3 pré-requisitos para escalar"], highlight: "Escalar é crescer sem que os custos cresçam na mesma proporção." },
          { title: "Armadilhas da Escala", bullets: ["Escalar o caos: o erro mais caro", "Crescer sem margem: a ilusão do faturamento", "Depender do dono: o gargalo invisível"] },
        ],
      },
      {
        id: "mn-2", title: "Modelo de Receita Recorrente", description: "Como criar previsibilidade financeira.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Receita Recorrente", bullets: ["MRR e ARR: as métricas que investidores amam", "Como transformar vendas pontuais em recorrência", "Modelos: assinatura, retainer, SaaS"], highlight: "Receita recorrente é o santo graal dos negócios." },
        ],
      },
      {
        id: "mn-3", title: "Processos e SOPs", description: "Documente processos para operar sem depender de você.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Processos e SOPs", bullets: ["O que é um SOP e por que ele liberta o dono", "Como documentar processos de forma simples", "Ferramentas para criar sua base de conhecimento"], highlight: "Se só você sabe fazer, seu negócio não escala." },
        ],
      },
      {
        id: "mn-4", title: "Tecnologia e Automação", description: "Ferramentas que permitem crescer com eficiência.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Tecnologia e Automação", bullets: ["Stack tecnológica essencial por porte", "Automações que economizam 20h/semana", "IA aplicada a pequenas empresas"], highlight: "Automatize o operacional. Foque no estratégico." },
        ],
      },
      {
        id: "mn-5", title: "Cultura Organizacional", description: "Construa uma cultura que sustente o crescimento.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Cultura Organizacional", bullets: ["Valores que guiam decisões", "Rituais que fortalecem a cultura", "Como manter a cultura ao crescer"] },
        ],
      },
      {
        id: "mn-6", title: "Gestão Financeira para Escala", description: "Controle financeiro para decisões de expansão.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Gestão Financeira", bullets: ["Fluxo de caixa para crescimento", "Margem de contribuição por produto/serviço", "Quando e como buscar investimento"] },
        ],
      },
      {
        id: "mn-7", title: "Parcerias Estratégicas", description: "Alavancas de crescimento via parcerias.", videoUrl: "", duration: "22min",
        slides: [
          { title: "Parcerias Estratégicas", bullets: ["Tipos de parceria: indicação, co-marketing, integração", "Como abordar potenciais parceiros", "Estruturando acordos win-win"] },
        ],
      },
      {
        id: "mn-8", title: "Expansão de Mercado", description: "Como entrar em novos mercados com segurança.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Expansão de Mercado", bullets: ["Sinais de que é hora de expandir", "Pesquisa de mercado simplificada", "MVP para novos mercados"] },
        ],
      },
      {
        id: "mn-9", title: "Plano de Escala", description: "Monte seu roadmap de crescimento.", videoUrl: "", duration: "24min",
        slides: [
          { title: "Seu Plano de Escala", bullets: ["Roadmap de 90 dias para escala", "Defina métricas de sucesso", "Monte seu time de crescimento", "Revise e ajuste mensalmente"] },
        ],
      },
    ],
  },
  {
    id: "atendimento-retencao",
    title: "Atendimento e Retenção",
    description: "Técnicas para fidelizar clientes e aumentar o LTV",
    category: "Relacionamento",
    lessons: [
      {
        id: "ar-1", title: "Experiência do Cliente", description: "Como criar uma jornada memorável para o cliente.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Experiência do Cliente", bullets: ["Mapeie a jornada completa do cliente", "Momentos de verdade: onde encantar", "Customer Success vs. Suporte: qual a diferença"], highlight: "Clientes não compram produtos. Compram experiências." },
          { title: "Wow Moments", bullets: ["Pequenos gestos que geram grande impacto", "Personalização em escala", "Cases de experiências memoráveis"] },
        ],
      },
      {
        id: "ar-2", title: "Atendimento de Excelência", description: "Padrões e scripts para encantar no atendimento.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Atendimento de Excelência", bullets: ["Os 5 pilares do atendimento excepcional", "Scripts que resolvem e encantam", "Tempo de resposta: o fator decisivo"], highlight: "Bom atendimento retém. Atendimento excelente multiplica." },
        ],
      },
      {
        id: "ar-3", title: "Pós-venda Estratégico", description: "Transforme compradores em fãs da sua marca.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Pós-venda Estratégico", bullets: ["Onboarding do cliente: primeiros 7 dias", "Check-ins programados", "Pesquisas de satisfação que geram insights"] },
        ],
      },
      {
        id: "ar-4", title: "Programa de Fidelidade", description: "Crie incentivos para o cliente voltar.", videoUrl: "", duration: "22min",
        slides: [
          { title: "Programa de Fidelidade", bullets: ["Modelos de fidelidade por tipo de negócio", "Gamificação aplicada a retenção", "Indicação premiada: clientes trazendo clientes"], highlight: "Cliente fiel custa 5x menos que cliente novo." },
        ],
      },
      {
        id: "ar-5", title: "Gestão de Reclamações", description: "Transforme problemas em oportunidades de fidelização.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Gestão de Reclamações", bullets: ["Reclamação é presente: mude sua perspectiva", "Framework de resolução em 4 passos", "Como transformar detratores em promotores"] },
        ],
      },
      {
        id: "ar-6", title: "Métricas de Retenção", description: "NPS, churn e LTV — entenda e melhore seus números.", videoUrl: "", duration: "28min",
        slides: [
          { title: "Métricas de Retenção", bullets: ["NPS: o que é e como medir", "Churn: identifique e reduza cancelamentos", "LTV: aumente o valor do cliente ao longo do tempo"], highlight: "Aumentar retenção em 5% aumenta lucro em 25-95%." },
        ],
      },
      {
        id: "ar-7", title: "Upsell e Cross-sell", description: "Aumente o ticket médio com ofertas inteligentes.", videoUrl: "", duration: "27min",
        slides: [
          { title: "Upsell e Cross-sell", bullets: ["Diferença entre upsell e cross-sell", "Timing perfeito para ofertar", "Ofertas que agregam valor real ao cliente"], highlight: "Vender mais para quem já compra é 7x mais fácil." },
        ],
      },
    ],
  },
];

export const imersoes: Mentoria[] = [
  {
    id: "imersao-metodo-nvl",
    title: "Estrutura Completa do Método NVL",
    description: "Entenda cada etapa do método e como aplicar na sua empresa de forma prática e escalável",
    category: "Método",
    lessons: [
      {
        id: "im-1", title: "Visão Geral do Método NVL", description: "A filosofia e estrutura completa do método.", videoUrl: "", duration: "30min",
        slides: [
          { title: "O Método NVL", bullets: ["O que é o Método NVL e sua origem", "Os 3 pilares: Estratégia, Execução e Escala", "Por que funciona para diferentes segmentos"], highlight: "NVL é o caminho mais rápido entre onde você está e onde quer chegar." },
          { title: "As 5 Fases do Método", bullets: ["Fase 1: Diagnóstico e Posicionamento", "Fase 2: Estruturação do Funil", "Fase 3: Ativação e Tráfego", "Fase 4: Conversão e Vendas", "Fase 5: Escala e Recorrência"] },
          { title: "Resultados Comprovados", bullets: ["Média de 3x no faturamento em 6 meses", "Mais de 200 empresas transformadas", "Aplicável a serviços, produtos e negócios locais"] },
        ],
      },
      {
        id: "im-2", title: "Diagnóstico Empresarial Profundo", description: "Como fazer um raio-X completo do negócio.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Diagnóstico Empresarial", bullets: ["As 7 áreas de análise: finanças, vendas, marketing, operação, equipe, produto, gestão", "Ferramentas de diagnóstico rápido", "Como priorizar o que resolver primeiro"], highlight: "Sem diagnóstico preciso, qualquer remédio é chute." },
          { title: "Matriz de Prioridade", bullets: ["Urgente vs. Importante: a matriz de Eisenhower aplicada", "Quick wins: resultados em 7 dias", "Projetos de médio prazo: resultados em 90 dias"] },
        ],
      },
      {
        id: "im-3", title: "Implementação Fase a Fase", description: "O passo a passo para aplicar cada fase do método.", videoUrl: "", duration: "40min",
        slides: [
          { title: "Implementação Prática", bullets: ["Checklist da Fase 1: posicionamento e persona", "Checklist da Fase 2: funil e automações", "Checklist da Fase 3: tráfego e conteúdo"], highlight: "Execução imperfeita supera planejamento perfeito." },
          { title: "Fases 4 e 5", bullets: ["Checklist da Fase 4: scripts, follow-up e fechamento", "Checklist da Fase 5: processos, equipe e escala", "Cronograma de 90 dias para todas as fases"] },
        ],
      },
    ],
  },
  {
    id: "imersao-crescimento",
    title: "Estratégias Avançadas de Crescimento",
    description: "Técnicas de alto impacto para acelerar resultados: funil, tráfego, conversão e retenção",
    category: "Crescimento",
    lessons: [
      {
        id: "ic-1", title: "Growth Hacking para PMEs", description: "Estratégias de crescimento acelerado para pequenas e médias empresas.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Growth Hacking para PMEs", bullets: ["O que é growth hacking e como adaptar para seu negócio", "Os 3 loops de crescimento: viral, pago e conteúdo", "Experimentos rápidos: teste, meça, aprenda"], highlight: "Crescimento não é sorte. É sistema." },
          { title: "Alavancas de Crescimento", bullets: ["Aumente tráfego sem aumentar orçamento", "Otimize conversão com testes A/B simples", "Aumente ticket médio com ofertas inteligentes", "Aumente frequência de compra com recorrência"] },
        ],
      },
      {
        id: "ic-2", title: "Funil de Alta Conversão", description: "Construa um funil otimizado para máxima conversão.", videoUrl: "", duration: "40min",
        slides: [
          { title: "Funil de Alta Conversão", bullets: ["Anatomia de um funil que converte 20%+", "Copy que vende: os 7 elementos obrigatórios", "Gatilhos mentais avançados aplicados ao funil"], highlight: "Um funil bem feito vende enquanto você dorme." },
          { title: "Otimização Avançada", bullets: ["Heatmaps e gravações de sessão", "Testes multivariados", "Segmentação dinâmica por comportamento"] },
        ],
      },
      {
        id: "ic-3", title: "Tráfego Avançado", description: "Estratégias de tráfego para escalar investimento com ROI.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Tráfego Avançado", bullets: ["Escala horizontal vs. vertical de campanhas", "Lookalike audiences avançadas", "Retargeting em camadas: 3, 7, 14 e 30 dias"], highlight: "Escalar tráfego é ciência, não intuição." },
          { title: "Budget e ROI", bullets: ["Como calcular o orçamento ideal por canal", "ROAS mínimo por segmento", "Quando pausar, quando dobrar a aposta"] },
        ],
      },
      {
        id: "ic-4", title: "Retenção e LTV", description: "Estratégias para maximizar o valor de cada cliente.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Retenção e LTV", bullets: ["O custo de adquirir vs. reter um cliente", "Programas de fidelidade que funcionam", "Upsell e cross-sell estratégicos", "Comunidade como ferramenta de retenção"], highlight: "O cliente mais barato é o que já comprou de você." },
        ],
      },
    ],
  },
  {
    id: "imersao-vendas",
    title: "Treinamento Intensivo de Vendas",
    description: "Workshops práticos para dominar o processo de vendas do diagnóstico ao fechamento",
    category: "Vendas",
    lessons: [
      {
        id: "iv-1", title: "Mentalidade de Vendedor de Elite", description: "Desenvolva a mentalidade que separa os top performers.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Mentalidade de Elite", bullets: ["Os 5 hábitos dos melhores vendedores", "Como lidar com rejeição e objeção", "Disciplina > Motivação: rotina do vendedor de alta performance"], highlight: "Vender não é convencer. É ajudar a decidir." },
          { title: "Preparação Diária", bullets: ["Rotina matinal do vendedor", "Estudo de clientes antes de cada contato", "Metas diárias vs. metas mensais"] },
        ],
      },
      {
        id: "iv-2", title: "Diagnóstico Comercial", description: "Como fazer um diagnóstico que gera valor e vende.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Diagnóstico Comercial", bullets: ["Perguntas poderosas que revelam a dor real", "Técnica SPIN: Situação, Problema, Implicação, Necessidade", "Como apresentar o diagnóstico como uma solução"], highlight: "Quem diagnostica bem, vende naturalmente." },
          { title: "Script de Diagnóstico", bullets: ["Abertura: rapport em 30 segundos", "Investigação: as 10 perguntas essenciais", "Transição: do diagnóstico à apresentação da solução"] },
        ],
      },
      {
        id: "iv-3", title: "Apresentação de Proposta", description: "Como apresentar sua oferta de forma irresistível.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Apresentação de Proposta", bullets: ["Estrutura: Problema → Solução → Prova → Oferta → CTA", "Ancoragem de preço: a arte de criar percepção de valor", "Como usar cases e depoimentos na proposta"], highlight: "Proposta boa não vende preço. Vende transformação." },
        ],
      },
      {
        id: "iv-4", title: "Fechamento e Objeções", description: "Técnicas avançadas de fechamento e contorno de objeções.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Fechamento e Objeções", bullets: ["As 12 objeções mais comuns e como responder cada uma", "Técnica do 'e se': eliminando barreiras uma a uma", "Fechamento por compromisso progressivo"], highlight: "Toda objeção é um pedido disfarçado de mais informação." },
          { title: "Scripts de Fechamento", bullets: ["Fechamento direto: 'Vamos começar?'", "Fechamento por alternativa: 'Prefere o plano A ou B?'", "Fechamento por urgência real: escassez genuína"] },
        ],
      },
      {
        id: "iv-5", title: "Follow-up que Fecha", description: "Sequências de follow-up que convertem leads parados.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Follow-up que Fecha", bullets: ["A cadência ideal: dias 1, 3, 7, 14, 30", "Templates de mensagem por etapa", "Quando insistir e quando soltar", "Reativação de leads frios"], highlight: "80% das vendas acontecem entre o 5º e 12º contato." },
        ],
      },
    ],
  },
  {
    id: "imersao-visao-empresarial",
    title: "Visão Empresarial Profunda",
    description: "Análise de mercado, posicionamento estratégico e construção de uma marca forte",
    category: "Estratégia",
    lessons: [
      {
        id: "ive-1", title: "Pensamento Estratégico", description: "Como pensar como um CEO e tomar decisões de alto impacto.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Pensamento Estratégico", bullets: ["Visão de longo prazo vs. urgências do dia a dia", "Frameworks de decisão: matriz de impacto vs. esforço", "Como analisar cenários e antecipar movimentos do mercado"], highlight: "O CEO que só apaga incêndio nunca constrói nada." },
          { title: "Planejamento Estratégico", bullets: ["OKRs simplificados para PMEs", "Planejamento trimestral vs. anual", "Indicadores que todo CEO deve acompanhar"] },
        ],
      },
      {
        id: "ive-2", title: "Análise de Mercado Avançada", description: "Ferramentas e métodos para entender profundamente seu mercado.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Análise de Mercado", bullets: ["SWOT dinâmica: atualize trimestralmente", "As 5 Forças de Porter aplicadas ao seu negócio", "Análise de tendências e cenários futuros"], highlight: "Conheça seu mercado melhor do que seu concorrente e você já venceu." },
        ],
      },
      {
        id: "ive-3", title: "Construção de Marca", description: "Como criar uma marca que as pessoas lembram e confiam.", videoUrl: "", duration: "35min",
        slides: [
          { title: "Construção de Marca", bullets: ["Marca é percepção: como construir percepção de valor", "Os 7 elementos do brand equity", "Storytelling de marca: sua história como diferencial"], highlight: "Marca forte cobra mais, vende mais e retém mais." },
          { title: "Branding na Prática", bullets: ["Defina sua promessa de marca em 1 frase", "Crie seu manifesto de marca", "Consistência visual e verbal em todos os pontos de contato"] },
        ],
      },
      {
        id: "ive-4", title: "Inovação e Diferenciação", description: "Como se diferenciar em mercados saturados.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Inovação e Diferenciação", bullets: ["Oceano Azul: crie mercados sem concorrência", "Inovação incremental vs. disruptiva", "Como testar novas ideias com baixo risco"], highlight: "Não seja melhor. Seja diferente." },
        ],
      },
    ],
  },
  {
    id: "imersao-networking",
    title: "Networking com Empresários",
    description: "Conexão direta com outros empresários que estão crescendo com o método NVL",
    category: "Relacionamento",
    lessons: [
      {
        id: "in-1", title: "A Arte do Networking Estratégico", description: "Como construir uma rede de contatos valiosa.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Networking Estratégico", bullets: ["Networking não é trocar cartão. É construir relacionamento", "Os 3 tipos de contatos que todo empresário precisa", "Como ser memorável em eventos e encontros"], highlight: "Seu network é seu net worth." },
          { title: "Construindo sua Rede", bullets: ["Mapeie os 50 contatos mais importantes do seu mercado", "Estratégia de aproximação: dê antes de pedir", "Mantenha contato regular com sua rede-chave"] },
        ],
      },
      {
        id: "in-2", title: "Parcerias que Multiplicam", description: "Como criar parcerias estratégicas entre empresários.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Parcerias que Multiplicam", bullets: ["Identificando oportunidades de parceria", "Modelos: indicação cruzada, co-criação, joint ventures", "Como estruturar acordos que beneficiem ambos"], highlight: "1 + 1 = 11 quando as parcerias são estratégicas." },
        ],
      },
      {
        id: "in-3", title: "Comunidade e Mastermind", description: "O poder de estar cercado por empresários de alto nível.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Comunidade e Mastermind", bullets: ["Como criar seu grupo de mastermind", "Regras de um mastermind produtivo", "O efeito de estar na sala certa com as pessoas certas"], highlight: "Você é a média das 5 pessoas com quem mais convive." },
        ],
      },
    ],
  },
  {
    id: "imersao-pos-imersao",
    title: "Acompanhamento Pós-Imersão",
    description: "Mentorias exclusivas após a imersão para garantir a implementação das estratégias",
    category: "Acompanhamento",
    lessons: [
      {
        id: "ip-1", title: "Plano de Ação 90 Dias", description: "Monte seu plano prático de implementação pós-imersão.", videoUrl: "", duration: "30min",
        slides: [
          { title: "Plano de Ação 90 Dias", bullets: ["Mês 1: fundações — posicionamento, funil, processos", "Mês 2: ativação — tráfego, conteúdo, vendas", "Mês 3: escala — automação, equipe, otimização"], highlight: "Os próximos 90 dias definem os próximos 5 anos." },
          { title: "Compromissos Semanais", bullets: ["3 ações prioritárias por semana", "Check-in semanal de progresso", "Ajustes rápidos baseados em resultados"] },
        ],
      },
      {
        id: "ip-2", title: "Mentoria de Acompanhamento", description: "Sessões de mentoria para ajustar a rota.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Mentoria de Acompanhamento", bullets: ["Como aproveitar ao máximo cada sessão", "Prepare-se: traga dados, não opiniões", "Accountability: comprometa-se com metas semanais"], highlight: "Mentoria sem ação é entretenimento caro." },
        ],
      },
      {
        id: "ip-3", title: "Métricas de Implementação", description: "Acompanhe seus resultados e comprove o ROI da imersão.", videoUrl: "", duration: "25min",
        slides: [
          { title: "Métricas de Implementação", bullets: ["Dashboard pós-imersão: o que acompanhar", "Comparativo antes vs. depois: faturamento, leads, conversão", "Como documentar aprendizados e criar seu playbook"], highlight: "O que é medido, melhora. O que é comemorado, se repete." },
        ],
      },
    ],
  },
];
