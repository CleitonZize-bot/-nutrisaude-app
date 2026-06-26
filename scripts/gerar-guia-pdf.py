"""
Gera o PDF "Guia de Acesso ao NutriSaude" para enviar aos alunos.
"""

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.lib.colors import HexColor, white
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    PageBreak,
    Table,
    TableStyle,
    KeepTogether,
)
from reportlab.pdfgen import canvas

# ------- Paleta de cores -------
VERDE     = HexColor("#00C472")
VERDE_ESC = HexColor("#0E7C4B")
VERDE_BG  = HexColor("#E6FAEF")
LARANJA   = HexColor("#F59E0B")
LARANJA_B = HexColor("#FFF7E6")
CINZA_TX  = HexColor("#1F2937")
CINZA_SUB = HexColor("#6B7280")
CINZA_LN  = HexColor("#E5E7EB")
AZUL_BG   = HexColor("#EFF6FF")
AZUL      = HexColor("#2563EB")

# ------- Estilos -------
styles = getSampleStyleSheet()

st_titulo = ParagraphStyle(
    "TituloGrande",
    parent=styles["Title"],
    fontName="Helvetica-Bold",
    fontSize=30,
    leading=34,
    textColor=VERDE_ESC,
    alignment=TA_CENTER,
    spaceAfter=8,
)

st_subtitulo = ParagraphStyle(
    "Subtitulo",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=14,
    leading=20,
    textColor=CINZA_SUB,
    alignment=TA_CENTER,
    spaceAfter=18,
)

st_h1 = ParagraphStyle(
    "H1",
    parent=styles["Heading1"],
    fontName="Helvetica-Bold",
    fontSize=20,
    leading=24,
    textColor=VERDE_ESC,
    spaceBefore=10,
    spaceAfter=10,
)

st_h2 = ParagraphStyle(
    "H2",
    parent=styles["Heading2"],
    fontName="Helvetica-Bold",
    fontSize=15,
    leading=20,
    textColor=CINZA_TX,
    spaceBefore=8,
    spaceAfter=6,
)

st_body = ParagraphStyle(
    "Body",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=11.5,
    leading=18,
    textColor=CINZA_TX,
    alignment=TA_JUSTIFY,
    spaceAfter=6,
)

st_body_center = ParagraphStyle(
    "BodyCenter",
    parent=st_body,
    alignment=TA_CENTER,
)

st_passo = ParagraphStyle(
    "Passo",
    parent=st_body,
    leftIndent=14,
    fontSize=11.5,
    leading=18,
)

st_callout = ParagraphStyle(
    "Callout",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=11,
    leading=17,
    textColor=CINZA_TX,
)

st_link_btn = ParagraphStyle(
    "LinkBtn",
    parent=styles["Normal"],
    fontName="Helvetica-Bold",
    fontSize=13,
    leading=18,
    textColor=white,
    alignment=TA_CENTER,
)

st_link_sub = ParagraphStyle(
    "LinkSub",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=9.5,
    leading=14,
    textColor=CINZA_SUB,
    alignment=TA_CENTER,
)

st_footer = ParagraphStyle(
    "Footer",
    parent=styles["Normal"],
    fontName="Helvetica",
    fontSize=8.5,
    leading=12,
    textColor=CINZA_SUB,
    alignment=TA_CENTER,
)


# ------- Helpers -------
def callout(texto, cor_borda=LARANJA, cor_fundo=LARANJA_B, icone="!"):
    """Caixa de aviso com borda colorida."""
    data = [[
        Paragraph(f'<font color="{cor_borda.hexval()}"><b>{icone}</b></font>',
                  ParagraphStyle("ico", parent=styles["Normal"], fontSize=18, leading=20)),
        Paragraph(texto, st_callout),
    ]]
    t = Table(data, colWidths=[0.9 * cm, 14.6 * cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), cor_fundo),
        ("BOX", (0, 0), (-1, -1), 1.2, cor_borda),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    return t


def passo_numerado(numero, texto):
    """Passo numerado com circulinho verde."""
    bola = Paragraph(
        f'<para alignment="center"><font color="white" size="13"><b>{numero}</b></font></para>',
        ParagraphStyle("num", parent=styles["Normal"], fontSize=13, leading=15),
    )
    data = [[bola, Paragraph(texto, st_passo)]]
    t = Table(data, colWidths=[0.9 * cm, 14.6 * cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), VERDE),
        ("ROUNDEDCORNERS", [4, 4, 4, 4]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return t


def botao_link(texto, url, cor=VERDE):
    """Botao grande clicavel com link."""
    para = Paragraph(
        f'<a href="{url}"><font color="white"><b>{texto}</b></font></a>',
        st_link_btn,
    )
    data = [[para]]
    t = Table(data, colWidths=[15.5 * cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), cor),
        ("TOPPADDING", (0, 0), (-1, -1), 14),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 14),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    return t


def card_recurso(emoji, titulo, descricao):
    """Card de recurso do app."""
    conteudo = Paragraph(
        f'<font size="14"><b>{emoji} {titulo}</b></font><br/>'
        f'<font size="10.5" color="{CINZA_SUB.hexval()}">{descricao}</font>',
        ParagraphStyle("card", parent=styles["Normal"], fontSize=11, leading=16,
                       textColor=CINZA_TX),
    )
    data = [[conteudo]]
    t = Table(data, colWidths=[15.5 * cm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), VERDE_BG),
        ("BOX", (0, 0), (-1, -1), 1, VERDE),
        ("LEFTPADDING", (0, 0), (-1, -1), 12),
        ("RIGHTPADDING", (0, 0), (-1, -1), 12),
        ("TOPPADDING", (0, 0), (-1, -1), 10),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 10),
    ]))
    return t


# ------- Cabecalho/rodape de cada pagina -------
def cabecalho_rodape(c, doc):
    c.saveState()
    # Faixa verde superior fina
    c.setFillColor(VERDE)
    c.rect(0, A4[1] - 0.4 * cm, A4[0], 0.4 * cm, fill=1, stroke=0)
    # Logo / nome no topo
    c.setFillColor(VERDE_ESC)
    c.setFont("Helvetica-Bold", 11)
    c.drawString(2 * cm, A4[1] - 1.1 * cm, "NutriSaude")
    c.setFillColor(CINZA_SUB)
    c.setFont("Helvetica", 9)
    c.drawRightString(A4[0] - 2 * cm, A4[1] - 1.1 * cm, "Guia de Acesso")
    # Linha separadora abaixo do topo
    c.setStrokeColor(CINZA_LN)
    c.setLineWidth(0.4)
    c.line(2 * cm, A4[1] - 1.3 * cm, A4[0] - 2 * cm, A4[1] - 1.3 * cm)
    # Rodape: numero da pagina
    c.setFillColor(CINZA_SUB)
    c.setFont("Helvetica", 9)
    c.drawCentredString(A4[0] / 2, 1 * cm, f"app.nutrisaudeapp.online  -  pagina {doc.page}")
    c.restoreState()


# ------- Conteudo do PDF -------
def construir_documento(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=2.5 * cm,
        rightMargin=2.5 * cm,
        topMargin=2 * cm,
        bottomMargin=1.6 * cm,
        title="Guia de Acesso ao NutriSaude",
        author="NutriSaude",
    )

    story = []

    # ============ PAGINA 1 - CAPA ============
    story.append(Spacer(1, 3.5 * cm))
    story.append(Paragraph("Bem-vindo(a) ao", st_subtitulo))
    story.append(Paragraph("NutriSaude", st_titulo))
    story.append(Spacer(1, 0.4 * cm))
    story.append(Paragraph(
        "Seu cardapio personalizado para uma vida mais saudavel",
        st_subtitulo,
    ))
    story.append(Spacer(1, 1.4 * cm))

    story.append(callout(
        "<b>Parabens pela compra!</b> Este guia rapido vai te mostrar como acessar o app, "
        "instala-lo no celular e aproveitar todos os recursos. Em menos de 5 minutos voce "
        "estara com seu plano alimentar funcionando.",
        cor_borda=VERDE,
        cor_fundo=VERDE_BG,
        icone="OK",
    ))

    story.append(Spacer(1, 1.2 * cm))

    indice = [
        ("1.", "Como acessar o aplicativo"),
        ("2.", "Como instalar no celular (tela inicial)"),
        ("3.", "Conhecendo as funcionalidades"),
        ("4.", "Links uteis e suporte"),
    ]
    data = [[
        Paragraph(
            f'<font color="{VERDE_ESC.hexval()}"><b>{n}</b></font>',
            ParagraphStyle("idx", parent=styles["Normal"], fontSize=13, leading=18),
        ),
        Paragraph(
            f'<font size="12" color="{CINZA_TX.hexval()}">{t}</font>',
            styles["Normal"],
        ),
    ] for n, t in indice]
    tabela_indice = Table(data, colWidths=[0.8 * cm, 14.7 * cm])
    tabela_indice.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 4),
        ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
        ("LINEBELOW", (0, 0), (-1, -2), 0.4, CINZA_LN),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ]))
    story.append(Paragraph("O que voce vai encontrar:", st_h2))
    story.append(tabela_indice)
    story.append(PageBreak())

    # ============ PAGINA 2 - COMO ACESSAR ============
    story.append(Paragraph("1. Como acessar o aplicativo", st_h1))
    story.append(Paragraph(
        "Siga estes passos simples na ordem. Voce so vai precisar fazer isso uma unica vez.",
        st_body,
    ))
    story.append(Spacer(1, 0.4 * cm))

    story.append(passo_numerado("1", "<b>Abra o link do app no seu celular:</b><br/>"
                                     '<font color="' + AZUL.hexval() + '">'
                                     '<a href="https://app.nutrisaudeapp.online">'
                                     "app.nutrisaudeapp.online</a></font>"))
    story.append(Spacer(1, 0.2 * cm))

    story.append(passo_numerado("2", "Toque em <b>&quot;Criar conta&quot;</b> "
                                     "(na parte de baixo da tela de login)."))
    story.append(Spacer(1, 0.2 * cm))

    story.append(passo_numerado("3", "Preencha seu <b>nome</b>, "
                                     "<b>e-mail</b> (use o mesmo da compra!) "
                                     "e crie uma <b>senha</b>."))
    story.append(Spacer(1, 0.2 * cm))

    story.append(passo_numerado("4", "Faca o <b>cadastro do seu perfil</b> "
                                     "(peso, altura, idade, condicoes de saude). "
                                     "O app usa esses dados para montar seu cardapio personalizado."))
    story.append(Spacer(1, 0.2 * cm))

    story.append(passo_numerado("5", "<b>Pronto!</b> O app vai liberar seu plano alimentar "
                                     "personalizado, receitas, lista de compras e mais."))

    story.append(Spacer(1, 0.6 * cm))

    story.append(callout(
        "<b>MUITO IMPORTANTE:</b> ao criar a conta, use o <b>mesmo e-mail</b> que voce "
        "utilizou no pagamento. E por esse e-mail que o sistema reconhece sua compra "
        "e libera o acesso completo automaticamente.",
        cor_borda=LARANJA,
        cor_fundo=LARANJA_B,
        icone="!",
    ))

    story.append(Spacer(1, 0.5 * cm))

    story.append(callout(
        "<b>Esqueceu a senha?</b> Na tela de login, toque em &quot;Esqueceu a senha?&quot; "
        "e digite seu e-mail. Voce recebera um link para criar uma nova senha em poucos minutos.",
        cor_borda=AZUL,
        cor_fundo=AZUL_BG,
        icone="i",
    ))

    story.append(PageBreak())

    # ============ PAGINA 3 - INSTALAR NO CELULAR ============
    story.append(Paragraph("2. Como instalar no celular", st_h1))
    story.append(Paragraph(
        "O NutriSaude funciona como um aplicativo de verdade no seu celular. "
        "Instalando, ele aparece como um icone na tela inicial - igual aos outros apps. "
        "<b>Nao precisa baixar nada da loja!</b>",
        st_body,
    ))

    story.append(Spacer(1, 0.4 * cm))

    # ANDROID
    story.append(Paragraph(
        f'<font color="{VERDE_ESC.hexval()}"><b>Para Android (Chrome)</b></font>',
        st_h2,
    ))
    story.append(passo_numerado("1", "Acesse o app pelo navegador <b>Google Chrome</b>: "
                                     "<font color='" + AZUL.hexval() + "'>app.nutrisaudeapp.online</font>"))
    story.append(Spacer(1, 0.15 * cm))
    story.append(passo_numerado("2", "Toque nos <b>3 pontinhos</b> no canto superior direito do Chrome."))
    story.append(Spacer(1, 0.15 * cm))
    story.append(passo_numerado("3", "Procure a opcao <b>&quot;Instalar aplicativo&quot;</b> "
                                     "ou <b>&quot;Adicionar a tela inicial&quot;</b> e toque nela."))
    story.append(Spacer(1, 0.15 * cm))
    story.append(passo_numerado("4", "Confirme em <b>&quot;Instalar&quot;</b>. "
                                     "Pronto - o icone do NutriSaude vai aparecer na sua tela inicial!"))

    story.append(Spacer(1, 0.6 * cm))

    # IPHONE
    story.append(Paragraph(
        f'<font color="{VERDE_ESC.hexval()}"><b>Para iPhone (Safari)</b></font>',
        st_h2,
    ))
    story.append(passo_numerado("1", "Acesse o app pelo navegador <b>Safari</b> "
                                     "(nao funciona pelo Chrome no iPhone): "
                                     "<font color='" + AZUL.hexval() + "'>app.nutrisaudeapp.online</font>"))
    story.append(Spacer(1, 0.15 * cm))
    story.append(passo_numerado("2", "Toque no botao de <b>compartilhar</b> "
                                     "(quadrado com uma seta para cima, no centro da barra inferior)."))
    story.append(Spacer(1, 0.15 * cm))
    story.append(passo_numerado("3", "Role para baixo e toque em "
                                     "<b>&quot;Adicionar a Tela de Inicio&quot;</b>."))
    story.append(Spacer(1, 0.15 * cm))
    story.append(passo_numerado("4", "Toque em <b>&quot;Adicionar&quot;</b> no canto superior direito. "
                                     "Pronto - o icone aparece na sua tela!"))

    story.append(Spacer(1, 0.5 * cm))

    story.append(callout(
        "<b>Dica:</b> depois de instalado, voce pode usar o app diretamente pelo icone, "
        "sem precisar abrir o navegador. Fica igualzinho a um app baixado da loja. "
        "Funciona ate mesmo sem internet em algumas funcionalidades.",
        cor_borda=VERDE,
        cor_fundo=VERDE_BG,
        icone="OK",
    ))

    story.append(PageBreak())

    # ============ PAGINA 4 - FUNCIONALIDADES ============
    story.append(Paragraph("3. Conhecendo as funcionalidades", st_h1))
    story.append(Paragraph(
        "O NutriSaude tem 5 abas principais. Cada uma cuida de uma parte da sua jornada "
        "para uma alimentacao mais saudavel:",
        st_body,
    ))

    story.append(Spacer(1, 0.4 * cm))

    recursos = [
        ("Hoje", "Seu cardapio do dia. Veja o que comer no cafe, almoco, lanches, "
                 "jantar e ceia. Toque em qualquer refeicao para ver a receita completa, "
                 "ingredientes e modo de preparo. Marque o que ja comeu."),
        ("Semana", "Planejamento dos 7 dias. Inclui a <b>lista de compras automatica</b> - "
                  "gerada do plano semanal, organizada por categorias. "
                  "Voce pode compartilhar via WhatsApp ou copiar com um clique."),
        ("Progresso", "Acompanhe seu peso ao longo do tempo. Registre seu peso e veja "
                     "a evolucao em um grafico. Otimo para se manter motivado(a)."),
        ("Ingredientes", "Cadastre o que voce <b>ja tem em casa</b>. O app sugere receitas "
                        "que voce pode fazer agora, sem precisar ir ao mercado."),
        ("Saude", "Lembretes de agua, refeicoes e pesagem; controle de remedios; "
                 "diario de exames e o <b>Modo Economico</b> - que troca ingredientes caros "
                 "(quinoa, salmao, amendoas...) por opcoes baratas, automaticamente."),
    ]

    for titulo, desc in recursos:
        story.append(card_recurso("", titulo, desc))
        story.append(Spacer(1, 0.25 * cm))

    story.append(Spacer(1, 0.3 * cm))

    story.append(callout(
        "<b>Adaptacao automatica:</b> se voce informou no cadastro que tem diabetes, "
        "hipertensao, colesterol ou outra condicao, o app <b>adapta automaticamente</b> "
        "todas as receitas para sua condicao - sem voce precisar fazer nada.",
        cor_borda=VERDE,
        cor_fundo=VERDE_BG,
        icone="OK",
    ))

    story.append(PageBreak())

    # ============ PAGINA 5 - LINKS UTEIS ============
    story.append(Paragraph("4. Links uteis e suporte", st_h1))
    story.append(Paragraph(
        "Salve estes links! Eles vao ser muito uteis no dia a dia.",
        st_body,
    ))

    story.append(Spacer(1, 0.5 * cm))

    # Botao 1: Acessar o app
    story.append(Paragraph(
        f'<font color="{VERDE_ESC.hexval()}"><b>ACESSAR O APLICATIVO</b></font>',
        st_h2,
    ))
    story.append(Paragraph(
        "Toque no botao abaixo para abrir o app agora mesmo:",
        st_body,
    ))
    story.append(Spacer(1, 0.2 * cm))
    story.append(botao_link("Abrir o NutriSaude", "https://app.nutrisaudeapp.online", VERDE))
    story.append(Paragraph(
        "ou digite no navegador: <b>app.nutrisaudeapp.online</b>",
        st_link_sub,
    ))

    story.append(Spacer(1, 0.7 * cm))

    # Botao 2: Grupo WhatsApp dos alunos
    story.append(Paragraph(
        f'<font color="{VERDE_ESC.hexval()}"><b>GRUPO DOS ALUNOS NO WHATSAPP</b></font>',
        st_h2,
    ))
    story.append(Paragraph(
        "Faca parte da nossa comunidade! Troque experiencias, receba dicas e "
        "tire duvidas com outros alunos:",
        st_body,
    ))
    story.append(Spacer(1, 0.2 * cm))
    story.append(botao_link(
        "Entrar no grupo do WhatsApp",
        "https://chat.whatsapp.com/CYwnPUTCCkjKAuiOWfr2Wm?s=cl&p=a&mlu=4",
        HexColor("#25D366"),
    ))

    story.append(Spacer(1, 0.7 * cm))

    # Botao 3: Suporte
    story.append(Paragraph(
        f'<font color="{VERDE_ESC.hexval()}"><b>SUPORTE - DUVIDAS PARA ACESSAR?</b></font>',
        st_h2,
    ))
    story.append(Paragraph(
        "Se voce esta com dificuldade para entrar, criar a conta ou liberar seu acesso, "
        "fale com a gente no WhatsApp. Vamos te ajudar pessoalmente:",
        st_body,
    ))
    story.append(Spacer(1, 0.2 * cm))
    story.append(botao_link(
        "Falar com o suporte",
        "https://wa.me/5564992356584?text=Ol%C3%A1%2C%20comprei%20o%20aplicativo%20e%20estou%20com%20dificuldade%20para%20acessar!",
        HexColor("#25D366"),
    ))
    story.append(Paragraph(
        "WhatsApp: (64) 99235-6584",
        st_link_sub,
    ))

    story.append(Spacer(1, 1 * cm))

    # Mensagem final
    story.append(callout(
        "<b>Obrigado por confiar no NutriSaude!</b><br/>"
        "Estamos aqui para te apoiar em cada passo da sua jornada. "
        "Seu acesso e <b>vitalicio</b> - aproveite tudo, sem pressa.",
        cor_borda=VERDE,
        cor_fundo=VERDE_BG,
        icone="<3",
    ))

    # Constroi o PDF
    doc.build(
        story,
        onFirstPage=cabecalho_rodape,
        onLaterPages=cabecalho_rodape,
    )
    print(f"PDF gerado: {output_path}")


if __name__ == "__main__":
    import os
    out = os.path.join(os.path.dirname(__file__), "..", "guia-acesso-nutrisaude.pdf")
    out = os.path.normpath(out)
    construir_documento(out)
