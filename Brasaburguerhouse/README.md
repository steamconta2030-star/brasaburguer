# Brasa Burger House — Cardápio Online

Cardápio digital com carrinho de compras para a hamburgueria **Brasa Burger House**. O cliente monta o pedido no site e finaliza direto pelo WhatsApp, com a lista de itens e o total já formatados na mensagem.

Identidade visual na mesma linha do cardápio da pizzaria (Braseiro Pizzas): tons de carvão, dourado, tijolo e verde-erva.

## Estrutura do projeto

```
brasa-burger-repo/
├── index.html          # estrutura da página e do cardápio
├── css/
│   └── style.css       # todo o visual (cores, tipografia, layout, carrinho)
├── js/
│   └── script.js       # lógica do carrinho e finalização do pedido
├── assets/              # pasta para imagens dos lanches (logo, fotos, etc.)
└── README.md
```

## Antes de publicar

1. **Troque o número de WhatsApp.**
   Abra `js/script.js` e edite a primeira linha:
   ```js
   const NUMERO_WHATSAPP = "5500000000000";
   ```
   Use o formato `55` + DDD + número, só números, sem espaços ou símbolos.

2. **Ajuste o cardápio.**
   Em `index.html`, cada item tem nome, descrição e preço. Edite os textos e os valores em `data-preco` para refletir o cardápio real.

3. **(Opcional) Adicione fotos.**
   Coloque as imagens em `assets/` e referencie no HTML dentro de cada `.item-info`, por exemplo:
   ```html
   <img src="assets/brasa-classico.jpg" alt="Brasa Clássico" />
   ```

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub e envie estes arquivos:
   ```
   git init
   git add .
   git commit -m "Cardápio inicial Brasa Burger House"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```
2. No repositório, vá em **Settings → Pages**.
3. Em "Source", selecione a branch `main` e a pasta `/ (root)`.
4. Salve. Em alguns minutos o site estará disponível em:
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`

Esse link é o que você vai usar para impulsionar com anúncios (tráfego pago).

## Rodar localmente

Basta abrir o arquivo `index.html` no navegador — não precisa de servidor nem instalação, é só HTML, CSS e JavaScript puro.
