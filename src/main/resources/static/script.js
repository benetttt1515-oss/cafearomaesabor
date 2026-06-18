/* ============================================================
   CAFÉ AROMA & SABOR — Sistema de Gestão de Estoque
   script.js — Navegação e interações visuais
   ============================================================ */

/* ── 1. INICIALIZAÇÃO ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    iniciarNavegacaoAtiva();
    iniciarBuscaDeProdutos();
    iniciarFormularios();
    iniciarAnimacoes();
    iniciarMobileMenu();
});

/* ── 2. MARCA O ITEM ATIVO NA SIDEBAR ───────────────────────
   Compara a URL atual com o href de cada link da sidebar
   e adiciona a classe "ativo" no item correspondente.
──────────────────────────────────────────────────────────── */
function iniciarNavegacaoAtiva() {
    const paginaAtual = window.location.pathname.split('/').pop() || 'index.html';
    const itensNav = document.querySelectorAll('.sidebar-nav-item');

    itensNav.forEach(item => {
        const href = item.getAttribute('href') || '';
        if (href === paginaAtual || (paginaAtual === '' && href === 'index.html')) {
            item.classList.add('ativo');
        } else {
            item.classList.remove('ativo');
        }
    });
}

/* ── 3. LOGIN — REDIRECIONAMENTO PARA DASHBOARD ─────────────
   Ao clicar em "Entrar", valida campos e redireciona.
──────────────────────────────────────────────────────────── */


/* ── 4. LOGOUT ───────────────────────────────────────────────
   Botões de logout em qualquer página retornam ao login.
──────────────────────────────────────────────────────────── */
document.querySelectorAll('.btn-logout').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.innerHTML = '⏳ Saindo…';
        btn.disabled  = true;
        setTimeout(() => {
            window.location.href = '/';
        }, 700);
    });
});

/* ── 5. BUSCA EM TEMPO REAL NA TABELA DE PRODUTOS ───────────
   Filtra as linhas da tabela conforme o usuário digita.
──────────────────────────────────────────────────────────── */
function iniciarBuscaDeProdutos() {
    const campoBusca = document.getElementById('busca-produto');
    if (!campoBusca) return;

    campoBusca.addEventListener('input', () => {
        const termo = campoBusca.value.toLowerCase().trim();
        const linhas = document.querySelectorAll('#tabela-produtos tbody tr');

        linhas.forEach(linha => {
            const texto = linha.textContent.toLowerCase();
            linha.style.display = texto.includes(termo) ? '' : 'none';
        });

        /* Mensagem de estado vazio */
        const estadoVazio = document.getElementById('estado-vazio-busca');
        if (estadoVazio) {
            const visiveis = [...linhas].filter(l => l.style.display !== 'none');
            estadoVazio.style.display = visiveis.length === 0 ? 'block' : 'none';
        }
    });
}

/* ── 6. FORMULÁRIOS — FEEDBACKS VISUAIS ─────────────────────
   Exibe feedback ao salvar/registrar (simulado).
──────────────────────────────────────────────────────────── */
function iniciarFormularios() {

    /* Formulário de Cadastro de Produto */
    const formProduto = document.getElementById('form-produto');
    if (formProduto) {
        const btnSalvar = formProduto.querySelector('.btn-primario-sm');
        if (btnSalvar) {
            btnSalvar.addEventListener('click', (e) => {
                e.preventDefault();
                const nomeProduto = formProduto.querySelector('#prod-nome');
                if (nomeProduto && nomeProduto.value.trim() === '') {
                    nomeProduto.style.borderColor = '#8B2E2E';
                    nomeProduto.style.boxShadow   = '0 0 0 3px rgba(139,46,46,.18)';
                    nomeProduto.focus();
                    return;
                }
                exibirToast('✅ Produto salvo com sucesso!', 'ok');
                formProduto.reset();
            });
        }

        /* Remove feedback de erro ao digitar */
        formProduto.querySelectorAll('input, select, textarea').forEach(campo => {
            campo.addEventListener('input', () => {
                campo.style.borderColor = '';
                campo.style.boxShadow   = '';
            });
        });
    }

    /* Formulário de Movimentação de Estoque */
    const formMovimentacao = document.getElementById('form-movimentacao');
    if (formMovimentacao) {
        const btnRegistrar = formMovimentacao.querySelector('.btn-primario-sm');
        if (btnRegistrar) {
            btnRegistrar.addEventListener('click', (e) => {
                e.preventDefault();
                const produto = formMovimentacao.querySelector('#mov-produto');
                if (produto && produto.value === '') {
                    produto.style.borderColor = '#8B2E2E';
                    produto.focus();
                    return;
                }
                exibirToast('✅ Movimentação registrada com sucesso!', 'ok');
                adicionarMovimentacaoSimulada();
                formMovimentacao.reset();
            });
        }
    }

    /* Botão Limpar formulário */
    document.querySelectorAll('.btn-limpar').forEach(btn => {
        btn.addEventListener('click', () => {
            const form = btn.closest('form') || btn.closest('.secao');
            if (form) {
                const campos = form.querySelectorAll('input, select, textarea');
                campos.forEach(c => {
                    c.value = '';
                    c.style.borderColor = '';
                    c.style.boxShadow   = '';
                });
                /* Reseta radio para o estado inicial */
                const primeiroRadio = form.querySelector('input[type="radio"]');
                if (primeiroRadio) primeiroRadio.checked = true;
            }
        });
    });
}

/* ── 7. TOAST DE NOTIFICAÇÃO ─────────────────────────────────
   Exibe uma mensagem flutuante temporária no canto da tela.
──────────────────────────────────────────────────────────── */
function exibirToast(mensagem, tipo = 'ok') {
    /* Remove toast anterior, se houver */
    const toastExistente = document.getElementById('toast-global');
    if (toastExistente) toastExistente.remove();

    const toast = document.createElement('div');
    toast.id = 'toast-global';
    toast.textContent = mensagem;

    /* Estilos inline para o toast (independe de página) */
    Object.assign(toast.style, {
        position:     'fixed',
        bottom:       '28px',
        right:        '28px',
        padding:      '12px 20px',
        borderRadius: '10px',
        background:   tipo === 'ok' ? '#4A7C59' : '#8B2E2E',
        color:        '#FDF8F0',
        fontFamily:   'DM Sans, sans-serif',
        fontSize:     '0.875rem',
        fontWeight:   '500',
        boxShadow:    '0 6px 24px rgba(0,0,0,.22)',
        zIndex:       '9999',
        transform:    'translateY(20px)',
        opacity:      '0',
        transition:   'all .3s ease',
        maxWidth:     '320px',
    });

    document.body.appendChild(toast);

    /* Animação de entrada */
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity   = '1';
        });
    });

    /* Remove automaticamente após 3,5s */
    setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity   = '0';
        setTimeout(() => toast.remove(), 350);
    }, 3500);
}

/* ── 8. ADICIONA LINHA SIMULADA NO HISTÓRICO ─────────────────
   Simula a adição de uma movimentação no histórico da página estoque.html.
──────────────────────────────────────────────────────────── */
function adicionarMovimentacaoSimulada() {
    const tabela = document.querySelector('#tabela-historico tbody');
    if (!tabela) return;

    const formMov    = document.getElementById('form-movimentacao');
    const selProduto = formMov ? formMov.querySelector('#mov-produto') : null;
    const selTipo    = formMov ? formMov.querySelector('input[name="tipo"]:checked') : null;
    const inpQtd     = formMov ? formMov.querySelector('#mov-qtd') : null;
    const inpData    = formMov ? formMov.querySelector('#mov-data') : null;
    const inpResp    = formMov ? formMov.querySelector('#mov-responsavel') : null;

    const produto = selProduto
        ? selProduto.options[selProduto.selectedIndex]?.text || '—'
        : 'Produto';
    const tipo    = selTipo    ? selTipo.value : 'entrada';
    const qtd     = inpQtd    ? (inpQtd.value || '0') : '0';
    const data    = inpData   ? (inpData.value || new Date().toLocaleDateString('pt-BR')) : '—';
    const resp    = inpResp   ? (inpResp.value || '—') : '—';

    const tr = document.createElement('tr');
    tr.style.animation = 'fadeUp .35s ease forwards';
    tr.innerHTML = `
    <td>
      <span class="produto-nome">${escHtml(produto)}</span>
    </td>
    <td>
      <span class="badge ${tipo === 'entrada' ? 'badge-entrada' : 'badge-saida'}">
        ${tipo === 'entrada' ? '⬆ Entrada' : '⬇ Saída'}
      </span>
    </td>
    <td><strong>${escHtml(qtd)}</strong> un.</td>
    <td>${escHtml(data)}</td>
    <td>${escHtml(resp)}</td>
  `;

    /* Insere a nova linha no topo da tabela */
    tabela.insertBefore(tr, tabela.firstChild);
}

/* Utilitário: escapar HTML para evitar XSS em strings dinâmicas */
function escHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

/* ── 9. ANIMAÇÕES DE ENTRADA DOS ELEMENTOS ───────────────────
   Adiciona classe de animação aos cards e seções.
──────────────────────────────────────────────────────────── */
function iniciarAnimacoes() {
    /* Cards de dashboard */
    document.querySelectorAll('.card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.07}s`;
        card.classList.add('animar-entrada');
    });

    /* Seções de conteúdo */
    document.querySelectorAll('.secao').forEach((sec, i) => {
        sec.style.animationDelay = `${0.15 + i * 0.08}s`;
        sec.classList.add('animar-entrada');
    });
}

/* ── 10. MENU MOBILE (Hamburger) ─────────────────────────────
   Abre/fecha a sidebar em telas pequenas.
──────────────────────────────────────────────────────────── */
function iniciarMobileMenu() {
    const btnHamburger = document.getElementById('btn-menu-mobile');
    const sidebar      = document.querySelector('.sidebar');
    const overlay      = document.getElementById('sidebar-overlay');

    if (btnHamburger && sidebar) {
        btnHamburger.addEventListener('click', () => {
            sidebar.classList.toggle('aberta');
            if (overlay) overlay.classList.toggle('visivel');
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('aberta');
            overlay.classList.remove('visivel');
        });
    }
}

/* ── 11. BOTÕES EDITAR/EXCLUIR NA TABELA ─────────────────────
   Demonstração visual: Excluir remove a linha, Editar pisca.
──────────────────────────────────────────────────────────── */
document.addEventListener('click', (e) => {

    /* Excluir linha da tabela */
    if (e.target.closest('.btn-acao-excluir')) {
        const btn  = e.target.closest('.btn-acao-excluir');
        const linha = btn.closest('tr');
        if (linha) {
            if (confirm('Deseja excluir este produto?')) {
                linha.style.transition = 'opacity .3s ease, transform .3s ease';
                linha.style.opacity    = '0';
                linha.style.transform  = 'translateX(12px)';
                setTimeout(() => linha.remove(), 320);
                exibirToast('🗑️ Produto removido.', 'erro');
            }
        }
    }

    /* Editar linha (feedback visual) */
    if (e.target.closest('.btn-acao-editar')) {
        const btn  = e.target.closest('.btn-acao-editar');
        const linha = btn.closest('tr');
        if (linha) {
            linha.style.transition  = 'background .3s ease';
            linha.style.background  = 'rgba(193,125,17,.12)';
            setTimeout(() => { linha.style.background = ''; }, 1200);
            exibirToast('✏️ Modo de edição: funcionalidade de formulário disponível acima.', 'ok');
        }
    }
});

/* ── 12. DATA ATUAL NO CAMPO DE DATA ─────────────────────────
   Preenche automaticamente o campo de data com a data atual.
──────────────────────────────────────────────────────────── */
document.querySelectorAll('input[type="date"]').forEach(campo => {
    if (!campo.value) {
        const hoje = new Date().toISOString().split('T')[0];
        campo.value = hoje;
    }
});

