
const BASE_IMG = window.location.pathname.includes('/pages/')
    ? '../src/assets/'
    : './src/assets/';

const produtos = [
    {
        id: 1,
        nome: "Cobra R-900",
        categoria: "Supermoto",
        descricao: "Motor V-twin 900cc, torque brutal de 110Nm. A Cobra R-900 domina asfalto e terra com suspenção invertida Öhlins e freios Brembo de 320mm.",
        preco: 68900,
        img: BASE_IMG + "moto1.jpg"
    },
    {
        id: 2,
        nome: "Onça GT-S",
        categoria: "Sport Touring",
        descricao: "1200cc inline-4 com 175cv. Full-fairing aerodinâmico, suspensão eletrônica semi-ativa e painel TFT de 7 polegadas. Velocidade máxima: 290 km/h.",
        preco: 94500,
        img: BASE_IMG + "moto2.jpg"
    },
    {
        id: 3,
        nome: "Gavião S-650",
        categoria: "Naked",
        descricao: "A Naked mais vendida do Brasil. Motor bicilíndrico paralelo 650cc, guidão alto e posição ergonômica ideal para o dia a dia caótico das metrópoles.",
        preco: 42700,
        img: BASE_IMG + "moto3.avif"
    },
    {
        id: 4,
        nome: "Pantanal ADV-X",
        categoria: "Adventure",
        descricao: "Feita para o Brasil profundo. Motor 800cc bicilíndrico, tração controlada electronicamente, tanque de 22L e proteção de chassi em aço reforçado.",
        preco: 78300,
        img: BASE_IMG + "moto4.jpg"
    },
    {
        id: 5,
        nome: "Boto EV-X",
        categoria: "Elétrica",
        descricao: "100% elétrica. Motor 80kW, autonomia de 320km, carregamento rápido DC em 40 minutos. Zero emissões, torque instantâneo de 175Nm. O futuro chegou.",
        preco: 112000,
        img: BASE_IMG + "moto5.jpg"
    },
    {
        id: 6,
        nome: "Piranha CR-300",
        categoria: "Café Racer",
        descricao: "Estilo clássico, coração moderno. Motor monocilíndrico 300cc, carenagem Café Racer fabricada em fibra de carbono, banco solo e exaustão Akrapovic.",
        preco: 31500,
        img: BASE_IMG + "moto6.jpg"
    }
];

/* 
   Carrinho de compras (simulado)
*/
const carrinho = [
    { id: 1, nome: "Cobra R-900",  preco: 68900, qtd: 1 },
    { id: 3, nome: "Gavião S-650", preco: 42700, qtd: 1 },
    { id: 6, nome: "Piranha CR-300", preco: 31500, qtd: 2 }
];

function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}

function renderizarProdutos() {
    const container = document.getElementById('produtos-container');
    if (!container) return;

    container.innerHTML = produtos.map(p => `
        <article class="card">
            <div class="card-img-wrap">
                <img src="${p.img}" alt="${p.nome}" loading="lazy">
            </div>
            <div class="card-info">
                <span class="card-cat">${p.categoria}</span>
                <h3>${p.nome}</h3>
                <p>${p.descricao}</p>
                <div class="card-footer">
                    <span class="preco">${formatarPreco(p.preco)}</span>
                    <a href="./pages/loja.html" class="btn-card">Ver no carrinho</a>
                </div>
            </div>
        </article>
    `).join('');
}

let descontoAplicado = false;

function calcularTotal(lista) {
    return lista.reduce((acc, item) => acc + item.preco * item.qtd, 0);
}

function renderizarCarrinho() {
    const container = document.getElementById('carrinho-container');
    const totalEl   = document.getElementById('total-valor');
    if (!container || !totalEl) return;

    container.innerHTML = carrinho.map(item => `
        <li class="carrinho-item">
            <span class="item-nome">${item.nome}</span>
            <span class="item-qtd">QTD: ${item.qtd}</span>
            <span class="item-preco">${formatarPreco(item.preco * item.qtd)}</span>
        </li>
    `).join('');

    const total = calcularTotal(carrinho);
    totalEl.innerHTML = `<span>R$</span> ${total.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;
}

function configurarDesconto() {
    const btn = document.getElementById('btn-desconto');
    const msg = document.getElementById('msg-desconto');
    const totalEl = document.getElementById('total-valor');
    if (!btn) return;

    btn.addEventListener('click', () => {
        if (descontoAplicado) return;
        descontoAplicado = true;

        const totalOriginal = calcularTotal(carrinho);
        const totalComDesconto = totalOriginal * 0.9;

        totalEl.innerHTML = `<span>R$</span> ${totalComDesconto.toLocaleString('pt-BR', { minimumFractionDigits: 0 })}`;
        msg.textContent = '✔ Desconto de 10% aplicado com sucesso!';
        btn.disabled = true;
        btn.textContent = 'Desconto já aplicado';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    renderizarCarrinho();
    configurarDesconto();

    // Marca o link ativo na nav
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => {
        if (link.getAttribute('href') === window.location.pathname.split('/').pop() ||
            (window.location.pathname.endsWith('/') && link.getAttribute('href').includes('index'))) {
            link.classList.add('ativo');
        }
    });
});
