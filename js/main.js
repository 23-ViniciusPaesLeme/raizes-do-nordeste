// ESTADO GLOBAL
let usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado")) || null;
let categoriaAtual = "todos";

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatarRegiao(regiao) {
  const regioes = {
    "nordeste": "Nordeste",
    "sudeste": "Sudeste",
    "centro-oeste": "Centro-Oeste",
    "sul": "Sul"
  };

  return regioes[regiao] || "Nenhuma região selecionada";
}

function produtoDisponivelPorPeriodo(produto) {
  if (!produto.sazonal) return true;

  const hoje = new Date();
  const mesDiaAtual = `${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(
    hoje.getDate()
  ).padStart(2, "0")}`;

  return mesDiaAtual >= produto.sazonal.inicio && mesDiaAtual <= produto.sazonal.fim;
}

function calcularPromocao(carrinho) {
  const subtotal = carrinho.reduce((soma, p) => soma + p.preco, 0);

  const temPratoNordestino = carrinho.some(p =>
    p.regiao === "nordeste" && p.categoria === "pratos"
  );

  const campanhaAtiva = true;

  let desconto = 0;
  let nomePromocao = null;

  if (campanhaAtiva && subtotal >= 60 && temPratoNordestino) {
    desconto = 10;
    nomePromocao = "Campanha Regional Nordestina";
  }

  return {
    subtotal,
    desconto,
    total: subtotal - desconto,
    promocao: nomePromocao
  };
}

// LGPD
function aceitarLGPD() {
  localStorage.setItem("lgpdAceito", "true");

  const banner = document.getElementById("lgpdBanner");
  if (banner) {
    banner.classList.add("d-none");
  }
}

function verificarLGPD() {
  const banner = document.getElementById("lgpdBanner");
  if (!banner) return;

  const aceito = localStorage.getItem("lgpdAceito");

  if (aceito === "true") {
    banner.classList.add("d-none");
  } else {
    banner.classList.remove("d-none");
  }
}

// AJUSTE DE ALTURA
function ajustarAlturaNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  document.documentElement.style.setProperty(
    "--navbar-height",
    `${navbar.offsetHeight}px`
  );
}

// MENU
function atualizarMenu() {
  const logado = !!usuarioLogado;

  document.querySelectorAll(".auth-only").forEach(el => {
    el.classList.toggle("d-none", !logado);
  });

  document.getElementById("login-btn")?.classList.toggle("d-none", logado);
  document.getElementById("logout-btn")?.classList.toggle("d-none", !logado);
}

function logout(e) {
  e?.preventDefault();

  localStorage.removeItem("usuarioLogado");
  usuarioLogado = null;

  atualizarMenu();
  alert("Você saiu da conta.");
  window.location.href = "./index.html";
}

// MENU HAMBURGER
function configurarToggler() {
  const toggler = document.querySelector(".custom-toggler");
  if (!toggler) return;

  toggler.addEventListener("click", () => {
    toggler.classList.toggle("active");
  });
}

// CADASTRO
function configurarCadastro() {
  const form = document.getElementById("formCadastro");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value;
    const confirmar = document.getElementById("confirmarSenha").value;
    const aceiteLgpd = document.getElementById("aceiteLgpd");

    if (!nome || !email || !senha || !confirmar) {
      alert("Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (senha !== confirmar) {
      alert("As senhas não coincidem.");
      return;
    }

    if (aceiteLgpd && !aceiteLgpd.checked) {
      alert("Para continuar, aceite o termo de privacidade.");
      return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (usuarios.some(u => u.email === email)) {
      alert("Este e-mail já está cadastrado.");
      return;
    }

    const novoUsuario = {
      nome,
      email,
      senha,
      pontos: 0,
      lgpd: true
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));
    localStorage.setItem("lgpdAceito", "true");

    usuarioLogado = novoUsuario;

    alert(`Cadastro realizado com sucesso, ${nome}!`);
    window.location.href = "./index.html";
  });
}

// LOGIN
function configurarLogin() {
  const form = document.getElementById("formLogin");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const senha = document.getElementById("loginSenha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);

    if (!usuario) {
      alert("E-mail ou senha incorretos.");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    usuarioLogado = usuario;

    alert(`Bem-vindo de volta, ${usuario.nome}!`);
    window.location.href = "./index.html";
  });
}

// CARRINHO
function atualizarContadorCarrinho() {
  const contador = document.getElementById("cart-count");
  if (!contador) return;

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  contador.textContent = carrinho.length;
}

function configurarCarrinho() {
  const linkCarrinho = document.querySelector(".fa-shopping-cart")?.closest("a");
  if (!linkCarrinho) return;

  linkCarrinho.addEventListener("click", e => {
    if (!usuarioLogado) {
      e.preventDefault();
      alert("Faça login para acessar o carrinho.");
      window.location.href = "./login.html";
    }
  });
}

function adicionarAoCarrinho(idProduto) {
  const regiaoSelecionada = localStorage.getItem("regiaoSelecionada");

  if (!regiaoSelecionada) {
    alert("Selecione sua região antes de adicionar produtos.");
    return;
  }

  if (!usuarioLogado) {
    alert("Faça login para adicionar produtos ao carrinho.");
    window.location.href = "./login.html";
    return;
  }

  const produto = produtos.find(p => p.id === idProduto);
  if (!produto) return;

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.push(produto);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  atualizarContadorCarrinho();
  alert(`${produto.nome} foi adicionado ao carrinho.`);
}

// CARDÁPIO
function renderizarProdutos() {
  const lista = document.getElementById("listaProdutos");
  const aviso = document.getElementById("avisoRegiao");
  const select = document.getElementById("filtroRegiao");
  const busca = document.getElementById("campoBusca");
  const botoesCategoria = document.querySelectorAll(".categoria");

  if (!lista || typeof produtos === "undefined") return;

  const regiao = select?.value || "";
  const textoBusca = busca?.value.toLowerCase().trim() || "";

  lista.innerHTML = "";

  if (!regiao) {
    aviso?.classList.remove("d-none");
    busca?.setAttribute("disabled", "true");

    botoesCategoria.forEach(btn => {
      btn.setAttribute("disabled", "true");
    });

    localStorage.removeItem("regiaoSelecionada");
    return;
  }

  aviso?.classList.add("d-none");
  busca?.removeAttribute("disabled");

  botoesCategoria.forEach(btn => {
    btn.removeAttribute("disabled");
  });

  localStorage.setItem("regiaoSelecionada", regiao);

  const filtrados = produtos.filter(p => {
    const porRegiao = p.regiao === regiao || p.regiao === "todas";
    const porCategoria = categoriaAtual === "todos" || p.categoria === categoriaAtual;
    const porBusca =
      p.nome.toLowerCase().includes(textoBusca) ||
      p.descricao.toLowerCase().includes(textoBusca);
    const porPeriodo = produtoDisponivelPorPeriodo(p);

    return porRegiao && porCategoria && porBusca && porPeriodo;
  });

  if (filtrados.length === 0) {
    lista.innerHTML = `
      <div class="col-12 text-center py-5">
        <i class="fas fa-search fa-2x text-muted mb-3"></i>
        <h5 class="fw-bold">Nenhum produto encontrado</h5>
        <p class="text-muted">Tente outro termo, categoria ou período de disponibilidade.</p>
      </div>
    `;
    return;
  }

  filtrados.forEach(p => {
    lista.innerHTML += `
      <div class="col-12 col-sm-6 col-lg-4">
        <article class="card h-100 shadow-sm border-0 card-produto">
          <img src="${p.imagem}" class="card-img-top img-produto" alt="${p.nome}">

          <div class="card-body d-flex flex-column">
            <span class="badge bg-success align-self-start mb-2 text-capitalize">
              ${p.categoria}
            </span>

            ${
              p.sazonal
                ? `<span class="badge bg-warning text-dark align-self-start mb-2">Produto sazonal</span>`
                : ""
            }

            <h5 class="card-title fw-bold">${p.nome}</h5>

            <p class="card-text text-muted small flex-grow-1">
              ${p.descricao}
            </p>

            <div class="d-flex justify-content-between align-items-center">
              <strong class="preco-produto">${formatarMoeda(p.preco)}</strong>

              <button class="btn btn-success btn-sm" onclick="adicionarAoCarrinho(${p.id})">
                Adicionar
              </button>
            </div>
          </div>
        </article>
      </div>
    `;
  });
}

// CARRINHO PAGE
function renderizarCarrinho() {
  const lista = document.getElementById("listaCarrinho");
  const subtotal = document.getElementById("subtotalCarrinho");
  const total = document.getElementById("totalCarrinho");

  if (!lista) return;

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  lista.innerHTML = "";

  if (carrinho.length === 0) {
    lista.innerHTML = `
      <div class="card border-0 shadow-sm">
        <div class="card-body text-center py-5">
          <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
          <h5 class="fw-bold">Seu carrinho está vazio</h5>
          <p class="text-muted">Adicione produtos do cardápio para continuar.</p>
          <a href="./cardapio.html" class="btn btn-success">Ver cardápio</a>
        </div>
      </div>
    `;

    if (subtotal) subtotal.textContent = formatarMoeda(0);
    if (total) total.textContent = formatarMoeda(0);
    return;
  }

  const promocao = calcularPromocao(carrinho);

  if (subtotal) subtotal.textContent = formatarMoeda(promocao.subtotal);
  if (total) total.textContent = formatarMoeda(promocao.total);

  carrinho.forEach((p, i) => {
    lista.innerHTML += `
      <div class="card shadow-sm border-0 item-carrinho">
        <div class="card-body d-flex align-items-center gap-3">
          <img src="${p.imagem}" class="img-carrinho" alt="${p.nome}">

          <div class="flex-grow-1">
            <h6 class="fw-bold mb-1">${p.nome}</h6>
            <small class="text-muted d-block">${p.descricao}</small>
            <strong class="text-success d-block mt-1">${formatarMoeda(p.preco)}</strong>
          </div>

          <button class="btn btn-outline-danger btn-sm" onclick="removerItemCarrinho(${i})">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    `;
  });

  if (promocao.desconto > 0) {
    lista.innerHTML += `
      <div class="alert alert-success mt-3">
        🎉 <strong>${promocao.promocao}</strong><br>
        Desconto aplicado: ${formatarMoeda(promocao.desconto)}
      </div>
    `;
  }
}

function removerItemCarrinho(index) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  carrinho.splice(index, 1);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  renderizarCarrinho();
  atualizarContadorCarrinho();
}

function limparCarrinho() {
  localStorage.removeItem("carrinho");

  renderizarCarrinho();
  atualizarContadorCarrinho();
}

// PEDIDOS / PAGAMENTO EXTERNO
function finalizarPedido() {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  const modalEl = document.getElementById("modalPagamento");
  const processando = document.getElementById("pagamentoProcessando");
  const aprovado = document.getElementById("pagamentoAprovado");

  if (modalEl && processando && aprovado) {
    processando.classList.remove("d-none");
    aprovado.classList.add("d-none");

    const modal = new bootstrap.Modal(modalEl);
    modal.show();

    setTimeout(() => {
      processando.classList.add("d-none");
      aprovado.classList.remove("d-none");

      setTimeout(() => {
        registrarPedidoAposPagamento(carrinho);
      }, 1500);
    }, 2000);

    return;
  }

  registrarPedidoAposPagamento(carrinho);
}

function registrarPedidoAposPagamento(carrinho) {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  const promocao = calcularPromocao(carrinho);

  const novoPedido = {
    id: Date.now(),
    data: new Date().toLocaleString("pt-BR"),
    status: "Em preparo",
    pagamento: "Aprovado - integração externa simulada",
    itens: carrinho,
    subtotal: promocao.subtotal,
    desconto: promocao.desconto,
    promocao: promocao.promocao,
    total: promocao.total
  };

  pedidos.push(novoPedido);

  localStorage.setItem("pedidos", JSON.stringify(pedidos));
  localStorage.removeItem("carrinho");

  adicionarPontosFidelidade(Math.floor(promocao.total));
  atualizarContadorCarrinho();

  setTimeout(() => {
    window.location.href = "./meus-pedidos.html";
  }, 500);
}

function renderizarPedidos() {
  const lista = document.getElementById("listaPedidos");
  if (!lista) return;

  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];

  lista.innerHTML = "";

  if (pedidos.length === 0) {
    lista.innerHTML = `
      <div class="col-12">
        <div class="card border-0 shadow-sm text-center p-5">
          <i class="fas fa-receipt fa-3x text-muted mb-3"></i>
          <h5 class="fw-bold">Nenhum pedido encontrado</h5>
          <p class="text-muted">Faça um pedido no cardápio para acompanhar por aqui.</p>
          <a href="./cardapio.html" class="btn btn-success">Ver cardápio</a>
        </div>
      </div>
    `;
    return;
  }

  [...pedidos].reverse().forEach(p => {
    lista.innerHTML += `
      <div class="col-12 col-lg-6">
        <article class="card pedido-card shadow-sm border-0 h-100">
          <div class="card-body p-4">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <div>
                <h5 class="fw-bold mb-1">Pedido #${p.id}</h5>
                <small class="text-muted">${p.data}</small>
              </div>

              <span class="badge bg-warning text-dark">${p.status}</span>
            </div>

            <p class="text-muted small">
              ${p.itens.map(item => item.nome).join(", ")}
            </p>

            ${
              p.pagamento
                ? `<p class="small text-success mb-2">
                    <i class="fas fa-credit-card me-1"></i>${p.pagamento}
                  </p>`
                : ""
            }

            ${
              p.promocao
                ? `<p class="small text-success mb-2">
                    🎉 ${p.promocao}: desconto de ${formatarMoeda(p.desconto)}
                  </p>`
                : ""
            }

            <div class="pedido-status my-3">
              <div class="status-step active">
                <i class="fas fa-check"></i>
                <span>Recebido</span>
              </div>

              <div class="status-step active">
                <i class="fas fa-utensils"></i>
                <span>Em preparo</span>
              </div>

              <div class="status-step">
                <i class="fas fa-bag-shopping"></i>
                <span>Pronto</span>
              </div>
            </div>

            ${
              p.subtotal && p.desconto
                ? `<div class="d-flex justify-content-between align-items-center mt-2 small text-muted">
                    <span>Subtotal</span>
                    <span>${formatarMoeda(p.subtotal)}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center mt-1 small text-success">
                    <span>Desconto</span>
                    <span>- ${formatarMoeda(p.desconto)}</span>
                  </div>`
                : ""
            }

            <div class="d-flex justify-content-between align-items-center mt-3">
              <strong>Total</strong>
              <strong class="text-success">${formatarMoeda(p.total)}</strong>
            </div>
          </div>
        </article>
      </div>
    `;
  });
}

// PERFIL
function renderizarPerfil() {
  const nomeTitulo = document.getElementById("perfilNome");
  const emailTitulo = document.getElementById("perfilEmail");
  const inputNome = document.getElementById("perfilInputNome");
  const inputEmail = document.getElementById("perfilInputEmail");
  const inputRegiao = document.getElementById("perfilRegiao");

  if (!nomeTitulo) return;

  if (!usuarioLogado) {
    alert("Faça login para acessar o perfil.");
    window.location.href = "./login.html";
    return;
  }

  const regiao = localStorage.getItem("regiaoSelecionada");

  nomeTitulo.textContent = usuarioLogado.nome || "Cliente";
  emailTitulo.textContent = usuarioLogado.email || "email@email.com";

  if (inputNome) inputNome.value = usuarioLogado.nome || "";
  if (inputEmail) inputEmail.value = usuarioLogado.email || "";
  if (inputRegiao) inputRegiao.value = formatarRegiao(regiao);
}

// FIDELIDADE
function calcularPontosFidelidade() {
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  return pedidos.reduce((total, pedido) => total + Math.floor(pedido.total), 0);
}

function adicionarPontosFidelidade(pontos) {
  if (!usuarioLogado) return;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  usuarioLogado.pontos = (usuarioLogado.pontos || 0) + pontos;

  const usuariosAtualizados = usuarios.map(usuario => {
    if (usuario.email === usuarioLogado.email) {
      return usuarioLogado;
    }

    return usuario;
  });

  localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
}

function renderizarFidelidade() {
  const pontosEl = document.getElementById("pontosFidelidade");
  const barraEl = document.getElementById("barraFidelidade");

  if (!pontosEl) return;

  if (!usuarioLogado) {
    alert("Faça login para acessar o programa de fidelidade.");
    window.location.href = "./login.html";
    return;
  }

  const pontos = usuarioLogado.pontos || calcularPontosFidelidade();
  const progresso = Math.min((pontos / 400) * 100, 100);
  const recompensasResgatadas = JSON.parse(localStorage.getItem("recompensasResgatadas")) || [];

  pontosEl.textContent = `${pontos} pts`;

  if (barraEl) {
    barraEl.style.width = `${progresso}%`;
  }

  const botoesResgate = document.querySelectorAll("[data-pontos-resgate]");

  botoesResgate.forEach(botao => {
    const pontosNecessarios = Number(botao.dataset.pontosResgate);
    const card = botao.closest(".recompensa-card");
    const nomeRecompensa = card?.querySelector("h5")?.textContent.trim();

    botao.classList.remove("btn-success");
    botao.classList.add("btn-outline-success");

    if (recompensasResgatadas.includes(nomeRecompensa)) {
      botao.textContent = "Resgatado";
      botao.classList.remove("btn-outline-success");
      botao.classList.add("btn-success");
      botao.setAttribute("disabled", "true");
      botao.onclick = null;
      return;
    }

    if (pontos >= pontosNecessarios) {
      botao.removeAttribute("disabled");
      botao.textContent = "Resgatar";
      botao.onclick = () => {
        resgatarRecompensa(nomeRecompensa, pontosNecessarios);
      };
    } else {
      botao.setAttribute("disabled", "true");
      botao.textContent = "Resgatar";
      botao.onclick = null;
    }
  });
}

function resgatarRecompensa(nomeRecompensa, pontosNecessarios) {
  if (!usuarioLogado) return;

  if ((usuarioLogado.pontos || 0) < pontosNecessarios) {
    alert("Você não possui pontos suficientes para resgatar esta recompensa.");
    return;
  }

  usuarioLogado.pontos -= pontosNecessarios;

  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuariosAtualizados = usuarios.map(usuario => {
    if (usuario.email === usuarioLogado.email) {
      return usuarioLogado;
    }

    return usuario;
  });

  const recompensasResgatadas = JSON.parse(localStorage.getItem("recompensasResgatadas")) || [];

  if (!recompensasResgatadas.includes(nomeRecompensa)) {
    recompensasResgatadas.push(nomeRecompensa);
  }

  localStorage.setItem("usuarios", JSON.stringify(usuariosAtualizados));
  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
  localStorage.setItem("recompensasResgatadas", JSON.stringify(recompensasResgatadas));

  alert(`Recompensa "${nomeRecompensa}" resgatada com sucesso!`);

  renderizarFidelidade();
}

// CATEGORIAS
function configurarCategorias() {
  const botoes = document.querySelectorAll(".categoria");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      botoes.forEach(item => {
        item.classList.remove("active", "btn-success");
        item.classList.add("btn-outline-success");
      });

      btn.classList.add("active", "btn-success");
      btn.classList.remove("btn-outline-success");

      categoriaAtual = btn.dataset.categoria;
      renderizarProdutos();
    });
  });
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  verificarLGPD();

  ajustarAlturaNavbar();
  window.addEventListener("resize", ajustarAlturaNavbar);

  atualizarMenu();
  atualizarContadorCarrinho();

  configurarCadastro();
  configurarLogin();
  configurarCarrinho();
  configurarToggler();
  configurarCategorias();

  document.getElementById("logout-btn")?.addEventListener("click", logout);
  document.getElementById("filtroRegiao")?.addEventListener("change", renderizarProdutos);
  document.getElementById("campoBusca")?.addEventListener("input", renderizarProdutos);
  document.getElementById("btnLimparCarrinho")?.addEventListener("click", limparCarrinho);
  document.getElementById("btnFinalizarPedido")?.addEventListener("click", finalizarPedido);

  renderizarProdutos();
  renderizarCarrinho();
  renderizarPedidos();
  renderizarPerfil();
  renderizarFidelidade();
});