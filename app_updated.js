/* =====================================================
   SISTEMA TESTE GRÁTIS + PRO (7 DIAS)
===================================================== */

// registra primeiro uso
if (!localStorage.getItem("dataInstalacao")) {
    localStorage.setItem("dataInstalacao", Date.now());
}

const DIAS_GRATIS = 7;

// verifica período grátis
function periodoGratisAtivo() {
    const inicio = localStorage.getItem("dataInstalacao");
    if (!inicio) return false;

    const diasPassados =
        (Date.now() - inicio) / (1000 * 60 * 60 * 24);

    return diasPassados <= DIAS_GRATIS;
}

// verifica se usuário é PRO
function usuarioPRO() {

    if (localStorage.getItem("licencaPRO") === "true") {
        return true;
    }

    if (periodoGratisAtivo()) {
        return true;
    }

    return false;
}

// dias restantes (opcional mostrar na tela)
function diasRestantes() {
    const inicio = localStorage.getItem("dataInstalacao");

    const diasPassados =
        (Date.now() - inicio) / (1000 * 60 * 60 * 24);

    return Math.max(
        0,
        Math.ceil(DIAS_GRATIS - diasPassados)
    );
}

// aviso padrão
function avisoPRO() {
    alert(
        "🔒 Seu teste grátis terminou.\n\n" +
        "Ative a versão PRO para continuar usando esta função."
    );
}

// ativação manual (simula pagamento)
function ativarPRO() {
    localStorage.setItem("licencaPRO", "true");
    alert("✅ Versão PRO ativada!");
}


/* =====================================================
   SUAS FUNÇÕES NORMAIS DO APP (mantidas)
===================================================== */


// ===== GERAR ORÇAMENTO =====
function gerarOrcamento() {

    // 🔒 BLOQUEIO PRO
    if (!usuarioPRO()) {
        avisoPRO();
        return;
    }

    const nome = document.getElementById("nomeCliente").value;
    const servico = document.getElementById("servico").value;
    const valor = document.getElementById("valor").value;

    const resultado = `
Cliente: ${nome}
Serviço: ${servico}
Valor: R$ ${valor}
Data: ${new Date().toLocaleDateString()}
`;

    document.getElementById("resultadoOrcamento").innerText = resultado;
}


// ===== EXPORTAR PDF =====
async function exportarPDF(secao) {

    // 🔒 BLOQUEIO PRO
    if (!usuarioPRO()) {
        avisoPRO();
        return;
    }

    const elemento = document.getElementById(secao);

    const canvas = await html2canvas(elemento);

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
    pdf.save("orcamento.pdf");
}


/* =====================================================
   EXEMPLO DE CALCULADORA (continua grátis)
===================================================== */

function calcularOhm() {

    const tensao = Number(document.getElementById("tensao").value);
    const resistencia = Number(document.getElementById("resistencia").value);

    if (!tensao || !resistencia) {
        alert("Preencha os valores.");
        return;
    }

    const corrente = tensao / resistencia;

    document.getElementById("resultadoOhm").innerText =
        "Corrente: " + corrente.toFixed(2) + " A";
}
