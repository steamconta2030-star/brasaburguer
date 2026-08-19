// Troque pelo número real da hamburgueria (com DDI + DDD, só números)
const NUMERO_WHATSAPP = "5500000000000";

let carrinho = {};

document.querySelectorAll(".btn-add").forEach((btn) => {
  btn.addEventListener("click", () => {
    const nome = btn.dataset.nome;
    const preco = parseFloat(btn.dataset.preco);
    if (!carrinho[nome]) carrinho[nome] = { preco, qtd: 0 };
    carrinho[nome].qtd += 1;
    atualizarCarrinho();
    btn.textContent = "Adicionado ✓";
    setTimeout(() => (btn.textContent = "Adicionar"), 800);
  });
});

function alterarQtd(nome, delta) {
  if (!carrinho[nome]) return;
  carrinho[nome].qtd += delta;
  if (carrinho[nome].qtd <= 0) delete carrinho[nome];
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const itens = Object.entries(carrinho);
  const totalQtd = itens.reduce((s, [, v]) => s + v.qtd, 0);
  const totalPreco = itens.reduce((s, [, v]) => s + v.qtd * v.preco, 0);

  document.getElementById("qtd-bolha").textContent = totalQtd;
  document.getElementById("total-botao").textContent = formatarPreco(totalPreco);
  document.getElementById("total-final").textContent = formatarPreco(totalPreco);
  document.getElementById("botao-carrinho").style.display = totalQtd > 0 ? "flex" : "none";
  document.getElementById("btn-finalizar").disabled = totalQtd === 0;

  const lista = document.getElementById("lista-carrinho");
  if (itens.length === 0) {
    lista.innerHTML =
      '<div class="carrinho-vazio">Seu carrinho está vazio. Adicione itens do cardápio.</div>';
    return;
  }
  lista.innerHTML = itens
    .map(
      ([nome, v]) => `
      <div class="linha-carrinho">
        <div>
          <div class="nome">${nome}</div>
          <div class="qtd-controle">
            <button onclick="alterarQtd('${nome}', -1)">−</button>
            <span>${v.qtd}</span>
            <button onclick="alterarQtd('${nome}', 1)">+</button>
          </div>
        </div>
        <div class="preco-linha">${formatarPreco(v.preco * v.qtd)}</div>
      </div>
    `
    )
    .join("");
}

function formatarPreco(valor) {
  return "R$ " + valor.toFixed(2).replace(".", ",");
}

function abrirCarrinho() {
  document.getElementById("painel-carrinho").classList.add("aberto");
  document.getElementById("overlay").style.display = "block";
}
function fecharCarrinho() {
  document.getElementById("painel-carrinho").classList.remove("aberto");
  document.getElementById("overlay").style.display = "none";
}

function finalizarPedido() {
  const itens = Object.entries(carrinho);
  if (itens.length === 0) return;
  let mensagem = "Olá! Quero fazer o seguinte pedido:%0A%0A";
  let total = 0;
  itens.forEach(([nome, v]) => {
    mensagem += `${v.qtd}x ${nome} - ${formatarPreco(v.preco * v.qtd)}%0A`;
    total += v.qtd * v.preco;
  });
  mensagem += `%0ATotal: ${formatarPreco(total)}`;
  window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${mensagem}`, "_blank");
}

// destaca categoria ativa ao rolar
const links = document.querySelectorAll("#nav-categorias a");
const secoes = document.querySelectorAll("section.categoria");
window.addEventListener("scroll", () => {
  let atual = secoes[0].id;
  secoes.forEach((sec) => {
    if (window.scrollY >= sec.offsetTop - 90) atual = sec.id;
  });
  links.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + atual));
});
