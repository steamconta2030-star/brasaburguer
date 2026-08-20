const CHAVE_PRODUTOS = "brasaBurgerProdutos";

const produtosPadrao = [
  {
    id: "brasa-classico",
    nome: "Brasa Clássico",
    descricao: "Dois smash de 90g, queijo cheddar, cebola caramelizada e molho da casa no brioche.",
    preco: 26.90,
    categoria: "smash",
    disponivel: true
  },
  {
    id: "duplo-fumaca",
    nome: "Duplo Fumaça",
    descricao: "Dois smash de 90g, bacon crocante, queijo prato e maionese defumada.",
    preco: 31.90,
    categoria: "smash",
    disponivel: true
  },
  {
    id: "simples-brasa",
    nome: "Simples Brasa",
    descricao: "Um smash de 90g, queijo cheddar e picles no brioche. Direto ao ponto.",
    preco: 19.90,
    categoria: "smash",
    disponivel: true
  },
  {
    id: "costela-brioche",
    nome: "Costela no Brioche",
    descricao: "Costela desfiada 8h na brasa, queijo coalho grelhado e barbecue defumado.",
    preco: 36.90,
    categoria: "especiais",
    disponivel: true
  },
  {
    id: "brasa-especial-duplo",
    nome: "Brasa Especial Duplo",
    descricao: "Dois smash de 120g, queijo cheddar duplo, bacon, ovo e onion rings.",
    preco: 38.90,
    categoria: "especiais",
    disponivel: true
  },
  {
    id: "batata-rustica",
    nome: "Batata Rústica",
    descricao: "Porção generosa com alecrim e páprica defumada.",
    preco: 15.90,
    categoria: "acompanhamentos",
    disponivel: true
  },
  {
    id: "onion-rings",
    nome: "Onion Rings",
    descricao: "Anéis de cebola empanados e crocantes, com molho barbecue.",
    preco: 17.90,
    categoria: "acompanhamentos",
    disponivel: true
  },
  {
    id: "refrigerante-lata",
    nome: "Refrigerante Lata",
    descricao: "Coca-Cola, Guaraná ou Sprite, 350ml.",
    preco: 7.00,
    categoria: "bebidas",
    disponivel: true
  },
  {
    id: "suco-natural",
    nome: "Suco Natural",
    descricao: "Laranja, limão ou maracujá, 400ml.",
    preco: 10.00,
    categoria: "bebidas",
    disponivel: true
  }
];

let carrinho = [];

function obterProdutos() {
  const salvos = localStorage.getItem(CHAVE_PRODUTOS);

  if (!salvos) {
    localStorage.setItem(
      CHAVE_PRODUTOS,
      JSON.stringify(produtosPadrao)
    );

    return produtosPadrao;
  }

  try {
    return JSON.parse(salvos);
  } catch {
    return produtosPadrao;
  }
}

function formatarPreco(valor) {
  return Number(valor).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function criarItemProduto(produto) {
  const item = document.createElement("div");
  item.className = "item";

  item.innerHTML = `
    <div class="item-info">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
    </div>

    <div class="item-acao">
      <span class="preco">${formatarPreco(produto.preco)}</span>

      <button
        class="btn-add"
        data-id="${produto.id}"
      >
        Adicionar
      </button>
    </div>
  `;

  return item;
}

function renderizarCardapio() {
  const produtos = obterProdutos();

  const secoes = {
    smash: document.querySelector("#smash"),
    especiais: document.querySelector("#especiais"),
    acompanhamentos: document.querySelector("#acompanhamentos"),
    bebidas: document.querySelector("#bebidas")
  };

  Object.values(secoes).forEach(secao => {
    if (!secao) return;

    secao.querySelectorAll(".item").forEach(item => {
      item.remove();
    });
  });

  produtos
    .filter(produto => produto.disponivel)
    .forEach(produto => {
      const secao = secoes[produto.categoria];

      if (!secao) return;

      secao.appendChild(criarItemProduto(produto));
    });

  document.querySelectorAll(".btn-add").forEach(botao => {
    botao.addEventListener("click", () => {
      adicionarAoCarrinho(botao.dataset.id);
    });
  });
}

function adicionarAoCarrinho(idProduto) {
  const produtos = obterProdutos();

  const produto = produtos.find(item => item.id === idProduto);

  if (!produto) return;

  const existente = carrinho.find(item => item.id === produto.id);

  if (existente) {
    existente.quantidade += 1;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nome,
      preco: Number(produto.preco),
      quantidade: 1
    });
  }

  atualizarCarrinho();
}

function removerDoCarrinho(idProduto) {
  const existente = carrinho.find(item => item.id === idProduto);

  if (!existente) return;

  existente.quantidade -= 1;

  if (existente.quantidade <= 0) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
  }

  atualizarCarrinho();
}

function atualizarCarrinho() {
  const lista = document.getElementById("lista-carrinho");
  const qtdBolha = document.getElementById("qtd-bolha");
  const totalBotao = document.getElementById("total-botao");
  const totalFinal = document.getElementById("total-final");
  const btnFinalizar = document.getElementById("btn-finalizar");

  if (!lista) return;

  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = `
      <div class="carrinho-vazio">
        Seu carrinho está vazio. Adicione itens do cardápio.
      </div>
    `;
  } else {
    carrinho.forEach(item => {
      const bloco = document.createElement("div");

      bloco.className = "item-carrinho";

      bloco.innerHTML = `
        <div>
          <strong>${item.nome}</strong>
          <div>${formatarPreco(item.preco)} x ${item.quantidade}</div>
        </div>

        <div>
          <button onclick="removerDoCarrinho('${item.id}')">−</button>
          <span>${item.quantidade}</span>
          <button onclick="adicionarAoCarrinho('${item.id}')">+</button>
        </div>
      `;

      lista.appendChild(bloco);
    });
  }

  const quantidadeTotal = carrinho.reduce(
    (total, item) => total + item.quantidade,
    0
  );

  const valorTotal = carrinho.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  qtdBolha.textContent = quantidadeTotal;
  totalBotao.textContent = formatarPreco(valorTotal);
  totalFinal.textContent = formatarPreco(valorTotal);

  btnFinalizar.disabled = carrinho.length === 0;
}

function abrirCarrinho() {
  document.getElementById("overlay").classList.add("ativo");
  document.getElementById("painel-carrinho").classList.add("ativo");
}

function fecharCarrinho() {
  document.getElementById("overlay").classList.remove("ativo");
  document.getElementById("painel-carrinho").classList.remove("ativo");
}

function finalizarPedido() {
  if (carrinho.length === 0) return;

  let mensagem = "Olá! Quero fazer este pedido:%0A%0A";

  carrinho.forEach(item => {
    mensagem += `${item.quantidade}x ${item.nome} - ${formatarPreco(
      item.preco * item.quantidade
    )}%0A`;
  });

  const total = carrinho.reduce(
    (soma, item) => soma + item.preco * item.quantidade,
    0
  );

  mensagem += `%0A*Total: ${formatarPreco(total)}*`;

  /*
    Depois podemos colocar aqui o número oficial
    do WhatsApp da Brasa Burger.
  */

  const numeroWhatsApp = "";

  if (!numeroWhatsApp) {
    alert(
      "Carrinho funcionando. Na próxima etapa vamos configurar o WhatsApp da loja."
    );

    return;
  }

  window.open(
    `https://wa.me/${numeroWhatsApp}?text=${mensagem}`,
    "_blank"
  );
}

renderizarCardapio();
atualizarCarrinho();
