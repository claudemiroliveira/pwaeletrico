alert("JS CARREGOU");
// =============================
// MENU LATERAL - NAVEGAÇÃO
// =============================
document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".section");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            const target = button.dataset.section;

            // remove ativo do menu
            buttons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            // esconder todas seções
            sections.forEach(section => {
                section.classList.remove("active");
            });

            // mostrar selecionada
            document.getElementById(target).classList.add("active");

        });

    });

});



// PWA Installation
let deferredPrompt;
const installPrompt = document.getElementById('installPrompt');
const installBtn = document.getElementById('installBtn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installPrompt.classList.add('show');
});

installBtn.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    deferredPrompt = null;
    installPrompt.classList.remove('show');
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(reg => console.log('Service Worker registrado', reg))
        .catch(err => console.log('Erro no Service Worker', err));
}


// Lei de Ohm Calculator
function calcularOhm() {
    const v = parseFloat(document.getElementById('ohm_v').value) || 0;
    const i = parseFloat(document.getElementById('ohm_i').value) || 0;
    const r = parseFloat(document.getElementById('ohm_r').value) || 0;
    const p = parseFloat(document.getElementById('ohm_p').value) || 0;
    
    let resultados = [];
    
    // Calculate based on what's provided
    if (v && i) {
        const calcR = v / i;
    // =============================
// NAVEGAÇÃO DAS SEÇÕES (NOVO MENU)
// =============================



            // mostra seção selecionada
            const activeSection = document.getElementById(target);
            if(activeSection){
                activeSection.style.display = "block";
            }

        });

    });

});    const calcP = v * i;
        resultados.push(`Resistência calculada: ${calcR.toFixed(2)} Ω`);
        resultados.push(`Potência calculada: ${calcP.toFixed(2)} W`);
    }
    
    if (v && r) {
        const calcI = v / r;
        const calcP = (v * v) / r;
        resultados.push(`Corrente calculada: ${calcI.toFixed(2)} A`);
        resultados.push(`Potência calculada: ${calcP.toFixed(2)} W`);
    }
    
    if (i && r) {
        const calcV = i * r;
        const calcP = i * i * r;
        resultados.push(`Tensão calculada: ${calcV.toFixed(2)} V`);
        resultados.push(`Potência calculada: ${calcP.toFixed(2)} W`);
    }
    
    if (p && v) {
        const calcI = p / v;
        const calcR = (v * v) / p;
        resultados.push(`Corrente calculada: ${calcI.toFixed(2)} A`);
        resultados.push(`Resistência calculada: ${calcR.toFixed(2)} Ω`);
    }
    
    if (p && i) {
        const calcV = p / i;
        const calcR = p / (i * i);
        resultados.push(`Tensão calculada: ${calcV.toFixed(2)} V`);
        resultados.push(`Resistência calculada: ${calcR.toFixed(2)} Ω`);
    }
    
    mostrarResultado('ohm_result', resultados);
}

// Potência Trifásica Calculator
function calcularTrifasica() {
    const v = parseFloat(document.getElementById('tri_v').value);
    const i = parseFloat(document.getElementById('tri_i').value);
    const fp = parseFloat(document.getElementById('tri_fp').value);
    
    const p = parseFloat(document.getElementById('tri_p').value);
    const v2 = parseFloat(document.getElementById('tri_v2').value);
    const fp2 = parseFloat(document.getElementById('tri_fp2').value);
    
    let resultados = [];
    
    if (v && i && fp) {
        const sqrt3 = Math.sqrt(3);
        const S = sqrt3 * v * i; // Potência Aparente
        const P = S * fp; // Potência Ativa
        const Q = Math.sqrt(S * S - P * P); // Potência Reativa
        
        resultados.push(`<strong>Resultados do Sistema Trifásico:</strong>`);
        resultados.push(`Potência Aparente (S): ${S.toFixed(2)} VA`);
        resultados.push(`Potência Ativa (P): ${P.toFixed(2)} W (${(P/1000).toFixed(2)} kW)`);
        resultados.push(`Potência Reativa (Q): ${Q.toFixed(2)} VAR`);
        resultados.push(`Fator de Potência: ${fp.toFixed(2)}`);
    }
    
    if (p && v2 && fp2) {
        const sqrt3 = Math.sqrt(3);
        const calcI = p / (sqrt3 * v2 * fp2);
        const S = sqrt3 * v2 * calcI;
        const Q = Math.sqrt(S * S - p * p);
        
        resultados.push(`<strong>Corrente Necessária:</strong>`);
        resultados.push(`Corrente de Linha (IL): ${calcI.toFixed(2)} A`);
        resultados.push(`Potência Aparente (S): ${S.toFixed(2)} VA`);
        resultados.push(`Potência Reativa (Q): ${Q.toFixed(2)} VAR`);
    }
    
    mostrarResultado('tri_result', resultados);
}

// Queda de Tensão Calculator
function calcularQueda() {
    const tipo = document.getElementById('queda_tipo').value;
    const v = parseFloat(document.getElementById('queda_v').value);
    const i = parseFloat(document.getElementById('queda_i').value);
    const l = parseFloat(document.getElementById('queda_l').value);
    const s = parseFloat(document.getElementById('queda_s').value);
    
    const rho = 0.0178; // Resistividade do cobre
    let deltaV;
    
    if (tipo === 'monofasico') {
        deltaV = (2 * rho * l * i) / s;
    } else {
        deltaV = (Math.sqrt(3) * rho * l * i) / s;
    }
    
    const percentual = (deltaV / v) * 100;
    
    let resultados = [];
    resultados.push(`<strong>Resultados da Queda de Tensão:</strong>`);
    resultados.push(`Queda de Tensão: ${deltaV.toFixed(2)} V`);
    resultados.push(`Percentual: ${percentual.toFixed(2)}%`);
    
    if (percentual > 4) {
        resultados.push(`<span style="color: var(--danger);">⚠️ ATENÇÃO: Queda acima de 4% - NBR 5410</span>`);
        resultados.push(`Recomendação: Aumentar a seção do condutor ou reduzir o comprimento.`);
    } else {
        resultados.push(`<span style="color: var(--success);">✓ Dentro do limite de 4% - NBR 5410</span>`);
    }
    
    mostrarResultado('queda_result', resultados);
}

// Dimensionamento de Disjuntores
function calcularDisjuntor() {
    const p = parseFloat(document.getElementById('disj_p').value);
    const v = parseFloat(document.getElementById('disj_v').value);
    const fp = parseFloat(document.getElementById('disj_fp').value);
    
    let corrente;
    if (v === 380) {
        corrente = p / (Math.sqrt(3) * v * fp);
    } else {
        corrente = p / (v * fp);
    }
    
    // Disjuntores padrão
    const disjuntores = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100, 125, 150, 175, 200, 225, 250];
    const disjuntor = disjuntores.find(d => d >= corrente) || disjuntores[disjuntores.length - 1];
    
    // Condutores recomendados
    const condutores = {
        1.5: 15.5, 2.5: 21, 4: 28, 6: 36, 10: 50, 16: 68, 25: 89, 35: 111, 
        50: 134, 70: 171, 95: 207, 120: 239, 150: 272, 185: 310, 240: 364
    };
    
    let secao = 1.5;
    for (let [s, cap] of Object.entries(condutores)) {
        if (cap >= corrente * 1.25) {
            secao = parseFloat(s);
            break;
        }
    }
    
    let resultados = [];
    resultados.push(`<strong>Dimensionamento do Circuito:</strong>`);
    resultados.push(`Corrente do Circuito: ${corrente.toFixed(2)} A`);
    resultados.push(`<strong>Disjuntor Recomendado: ${disjuntor} A</strong>`);
    resultados.push(`<strong>Seção do Condutor: ${secao} mm²</strong>`);
    resultados.push(`Capacidade do Condutor: ${condutores[secao]} A`);
    
    mostrarResultado('disj_result', resultados);
}

// NOVA FUNCIONALIDADE: Montagem de Quadro Elétrico
let circuitos = [];

function adicionarCircuito() {
    const nome = document.getElementById('circ_nome').value;
    const tipo = document.getElementById('circ_tipo').value;
    const potencia = parseFloat(document.getElementById('circ_potencia').value);
    const tensao = parseFloat(document.getElementById('circ_tensao').value);
    const comprimento = parseFloat(document.getElementById('circ_comprimento').value);
    const fp = parseFloat(document.getElementById('circ_fp').value);
    
    if (!nome || !potencia) {
        alert('Preencha o nome e a potência do circuito!');
        return;
    }
    
    const circuito = {
        id: Date.now(),
        nome,
        tipo,
        potencia,
        tensao,
        comprimento,
        fp
    };
    
    circuitos.push(circuito);
    atualizarListaCircuitos();
    limparFormularioCircuito();
}

function limparFormularioCircuito() {
    document.getElementById('circ_nome').value = '';
    document.getElementById('circ_potencia').value = '';
    document.getElementById('circ_comprimento').value = '15';
    document.getElementById('circ_fp').value = '1';
}

function removerCircuito(id) {
    circuitos = circuitos.filter(c => c.id !== id);
    atualizarListaCircuitos();
}

function atualizarListaCircuitos() {
    const lista = document.getElementById('circuitos_lista');
    
    if (circuitos.length === 0) {
        lista.innerHTML = '<p style="color: #999; padding: 1rem;">Nenhum circuito adicionado</p>';
        return;
    }
    
    let html = '';
    circuitos.forEach(circ => {
        const corrente = circ.potencia / (circ.tensao * circ.fp);
        html += `
            <div class="circuit-item">
                <div>
                    <strong>${circ.nome}</strong><br>
                    <small>Tipo: ${getTipoNome(circ.tipo)} | ${circ.potencia}W | ${circ.tensao}V | ${corrente.toFixed(2)}A</small>
                </div>
                <button class="btn btn-danger" onclick="removerCircuito(${circ.id})" style="padding: 0.5rem 1rem;">🗑️</button>
            </div>
        `;
    });
    
    lista.innerHTML = html;
}

function getTipoNome(tipo) {
    const tipos = {
        'iluminacao': 'Iluminação',
        'tomada': 'Tomadas',
        'tomada_esp': 'Tomadas Específicas',
        'chuveiro': 'Chuveiro',
        'ar': 'Ar Condicionado',
        'motor': 'Motor',
        'outros': 'Outros'
    };
    return tipos[tipo] || tipo;
}

function calcularQuadro() {
    if (circuitos.length === 0) {
        alert('Adicione circuitos ao quadro!');
        return;
    }
    
    let potenciaTotal = 0;
    let correnteTotal = 0;
    let resultados = [];
    
    resultados.push('<h3 style="color: var(--primary);">📊 Resumo do Quadro Elétrico</h3>');
    resultados.push('<div style="margin: 1rem 0;">');
    
    // Tabela de circuitos
    resultados.push('<table style="width: 100%; margin-bottom: 1rem;">');
    resultados.push('<thead><tr><th>Circuito</th><th>Potência (W)</th><th>Tensão (V)</th><th>Corrente (A)</th><th>Disjuntor (A)</th><th>Cabo (mm²)</th></tr></thead>');
    resultados.push('<tbody>');
    
    circuitos.forEach(circ => {
        const corrente = circ.potencia / (circ.tensao * circ.fp);
        correnteTotal += corrente;
        potenciaTotal += circ.potencia;
        
        // Dimensionar disjuntor
        const disjuntores = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100];
        const disjuntor = disjuntores.find(d => d >= corrente) || 100;
        
        // Dimensionar cabo
        const condutores = {
            1.5: 15.5, 2.5: 21, 4: 28, 6: 36, 10: 50, 16: 68, 25: 89, 35: 111, 50: 134
        };
        
        let secao = 1.5;
        for (let [s, cap] of Object.entries(condutores)) {
            if (cap >= corrente * 1.25) {
                secao = parseFloat(s);
                break;
            }
        }
        
        resultados.push(`<tr>
            <td><strong>${circ.nome}</strong></td>
            <td>${circ.potencia}</td>
            <td>${circ.tensao}</td>
            <td>${corrente.toFixed(2)}</td>
            <td>${disjuntor}</td>
            <td>${secao}</td>
        </tr>`);
    });
    
    resultados.push('</tbody></table>');
    resultados.push('</div>');
    
    // Resumo geral
    resultados.push('<div class="circuit-summary">');
    resultados.push('<h4>📈 Totais do Quadro</h4>');
    resultados.push(`<p><strong>Potência Total Instalada:</strong> ${potenciaTotal.toFixed(2)} W (${(potenciaTotal/1000).toFixed(2)} kW)</p>`);
    resultados.push(`<p><strong>Corrente Total:</strong> ${correnteTotal.toFixed(2)} A</p>`);
    
    // Dimensionar disjuntor geral
    const disjuntoresGerais = [40, 50, 63, 70, 80, 100, 125, 150, 175, 200];
    const disjuntorGeral = disjuntoresGerais.find(d => d >= correnteTotal) || 200;
    resultados.push(`<p><strong>Disjuntor Geral Recomendado:</strong> ${disjuntorGeral} A</p>`);
    
    // Dimensionar cabo de entrada
    const condutoresEntrada = {
        10: 50, 16: 68, 25: 89, 35: 111, 50: 134, 70: 171, 95: 207, 120: 239
    };
    
    let secaoEntrada = 10;
    for (let [s, cap] of Object.entries(condutoresEntrada)) {
        if (cap >= correnteTotal * 1.25) {
            secaoEntrada = parseFloat(s);
            break;
        }
    }
    
    resultados.push(`<p><strong>Cabo de Entrada Recomendado:</strong> ${secaoEntrada} mm²</p>`);
    resultados.push(`<p><strong>Número de Circuitos:</strong> ${circuitos.length}</p>`);
    resultados.push('</div>');
    
    // Recomendações
    resultados.push('<div class="info-box" style="margin-top: 1rem;">');
    resultados.push('<h4>💡 Recomendações NBR 5410</h4>');
    resultados.push('<ul style="margin-left: 1.5rem;">');
    resultados.push('<li>Reserve espaço para circuitos futuros (mínimo 20%)</li>');
    resultados.push('<li>Instale DR (Dispositivo Residual) de 30mA em circuitos de tomadas e áreas molhadas</li>');
    resultados.push('<li>Separe circuitos de iluminação e tomadas</li>');
    resultados.push('<li>Identifique todos os circuitos no quadro</li>');
    resultados.push('<li>Verifique a queda de tensão em cada circuito</li>');
    resultados.push('</ul>');
    resultados.push('</div>');
    
    mostrarResultado('quadro_result', resultados);
}

function limparCircuitos() {
    if (confirm('Deseja realmente limpar todos os circuitos?')) {
        circuitos = [];
        atualizarListaCircuitos();
        document.getElementById('quadro_result').innerHTML = '';
    }
}

// Conversão de Potência
function converterPotencia(origem) {
    const conversoes = {
        w: 1,
        kw: 1000,
        cv: 735.5,
        hp: 745.7
    };
    
    const valor = parseFloat(document.getElementById(`conv_${origem}`).value) || 0;
    const emWatts = valor * conversoes[origem];
    
    for (let unidade in conversoes) {
        if (unidade !== origem) {
            document.getElementById(`conv_${unidade}`).value = (emWatts / conversoes[unidade]).toFixed(4);
        }
    }
}

// Conversão de Energia
function converterEnergia(origem) {
    const conversoes = {
        kwh: 3600000,
        wh: 3600,
        j: 1
    };
    
    const valor = parseFloat(document.getElementById(`ener_${origem}`).value) || 0;
    const emJoules = valor * conversoes[origem];
    
    for (let unidade in conversoes) {
        if (unidade !== origem) {
            document.getElementById(`ener_${unidade}`).value = (emJoules / conversoes[unidade]).toFixed(4);
        }
    }
}

// Calculadora de Consumo
function calcularConsumo() {
    const pot = parseFloat(document.getElementById('cons_pot').value);
    const horas = parseFloat(document.getElementById('cons_horas').value);
    const dias = parseFloat(document.getElementById('cons_dias').value);
    const tarifa = parseFloat(document.getElementById('cons_tarifa').value);
    
    const consumoDiario = (pot * horas) / 1000; // kWh/dia
    const consumoMensal = consumoDiario * dias; // kWh/mês
    const custoMensal = consumoMensal * tarifa;
    const custoAnual = custoMensal * 12;
    
    let resultados = [];
    resultados.push(`<strong>Resultados do Consumo:</strong>`);
    resultados.push(`Consumo Diário: ${consumoDiario.toFixed(3)} kWh`);
    resultados.push(`Consumo Mensal: ${consumoMensal.toFixed(2)} kWh`);
    resultados.push(`Consumo Anual: ${(consumoMensal * 12).toFixed(2)} kWh`);
    resultados.push(`<hr style="margin: 1rem 0;">`);
    resultados.push(`<strong style="color: var(--danger);">Custo Mensal: R$ ${custoMensal.toFixed(2)}</strong>`);
    resultados.push(`<strong>Custo Anual: R$ ${custoAnual.toFixed(2)}</strong>`);
    
    mostrarResultado('cons_result', resultados);
}

// Helper function to display results
function mostrarResultado(elementId, resultados) {
    const element = document.getElementById(elementId);
    
    if (resultados.length === 0) {
        element.innerHTML = '<div class="warning-box">Preencha os campos necessários para calcular.</div>';
        return;
    }
    
    let html = '<div class="result-box"><h3>✅ Resultados</h3>';
    resultados.forEach(resultado => {
        html += `<div class="result-item">${resultado}</div>`;
    });
    html += '</div>';
    
    element.innerHTML = html;
}

// NOVA FUNCIONALIDADE: Exportar PDF
async function exportarPDF(secao) {
    // Get jsPDF from global scope
    const { jsPDF } = window.jspdf;
    
    if (!jsPDF) {
        alert('Biblioteca PDF não carregada. Por favor, recarregue a página.');
        return;
    }
    
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = 20;
    
    // Header
    doc.setFillColor(25, 118, 210);
    doc.rect(0, 0, pageWidth, 25, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.text('⚡ PWA Elétrico Profissional', pageWidth / 2, 15, { align: 'center' });
    
    y = 35;
    doc.setTextColor(0, 0, 0);
    
    // Seção específica
    const secaoElement = document.getElementById(secao);
    const titulo = secaoElement.querySelector('h2').textContent;
    
    doc.setFontSize(16);
    doc.setTextColor(25, 118, 210);
    doc.text(titulo, 15, y);
    y += 10;
    
    // Linha divisória
    doc.setDrawColor(200, 200, 200);
    doc.line(15, y, pageWidth - 15, y);
    y += 10;
    
    doc.setFontSize(11);
    doc.setTextColor(0, 0, 0);
    
    // Conteúdo por seção
    switch(secao) {
        case 'ohm':
            exportarSecaoOhm(doc, y, pageWidth);
            break;
        case 'trifasica':
            exportarSecaoTrifasica(doc, y, pageWidth);
            break;
        case 'queda':
            exportarSecaoQueda(doc, y, pageWidth);
            break;
        case 'disjuntor':
            exportarSecaoDisjuntor(doc, y, pageWidth);
            break;
        case 'quadro':
            await exportarSecaoQuadro(doc, y, pageWidth, pageHeight);
            break;
        case 'bitolas':
            exportarSecaoBitolas(doc, y, pageWidth, pageHeight);
            break;
        case 'conversao':
            exportarSecaoConversao(doc, y, pageWidth);
            break;
        case 'consumo':
            exportarSecaoConsumo(doc, y, pageWidth);
            break;
    }
    
    // Footer
    const dataHora = new Date().toLocaleString('pt-BR');
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text(`Gerado em: ${dataHora}`, pageWidth / 2, pageHeight - 10, { align: 'center' });
    
    // Salvar PDF
    doc.save(`PWA_Eletrico_${secao}_${Date.now()}.pdf`);
}

function exportarSecaoOhm(doc, y, pageWidth) {
    const resultado = document.getElementById('ohm_result').innerText;
    
    if (resultado) {
        const linhas = doc.splitTextToSize(resultado, pageWidth - 30);
        doc.text(linhas, 15, y);
    } else {
        doc.text('Nenhum cálculo realizado ainda.', 15, y);
    }
}

function exportarSecaoTrifasica(doc, y, pageWidth) {
    const resultado = document.getElementById('tri_result').innerText;
    
    if (resultado) {
        const linhas = doc.splitTextToSize(resultado, pageWidth - 30);
        doc.text(linhas, 15, y);
    } else {
        doc.text('Nenhum cálculo realizado ainda.', 15, y);
    }
}

function exportarSecaoQueda(doc, y, pageWidth) {
    const resultado = document.getElementById('queda_result').innerText;
    
    if (resultado) {
        const linhas = doc.splitTextToSize(resultado, pageWidth - 30);
        doc.text(linhas, 15, y);
    } else {
        doc.text('Nenhum cálculo realizado ainda.', 15, y);
    }
}

function exportarSecaoDisjuntor(doc, y, pageWidth) {
    const resultado = document.getElementById('disj_result').innerText;
    
    if (resultado) {
        const linhas = doc.splitTextToSize(resultado, pageWidth - 30);
        doc.text(linhas, 15, y);
    } else {
        doc.text('Nenhum cálculo realizado ainda.', 15, y);
    }
}

async function exportarSecaoQuadro(doc, y, pageWidth, pageHeight) {
    if (circuitos.length === 0) {
        doc.text('Nenhum circuito adicionado ao quadro.', 15, y);
        return;
    }
    
    // Título
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Lista de Circuitos', 15, y);
    y += 8;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    
    // Cabeçalho da tabela
    const colWidths = [60, 30, 25, 25, 25];
    const colX = // =============================
// MENU LATERAL PWA ELÉTRICO
// =============================

document.addEventListener("DOMContentLoaded", () => {

    console.log("✅ PWA iniciado");

    const botoes = document.querySelectorAll(".nav-btn");
    const secoes = document.querySelectorAll(".section");

    function abrirSecao(id) {

        // esconder todas
        secoes.forEach(sec => {
            sec.classList.remove("active");
        });

        // remover destaque dos botões
        botoes.forEach(btn => {
            btn.classList.remove("active");
        });

        // mostrar seção correta
        const alvo = document.getElementById(id);

        if (alvo) {
            alvo.classList.add("active");
            console.log("Abrindo seção:", id);
        } else {
            console.error("Seção não encontrada:", id);
        }

        // destacar botão clicado
        const botaoAtivo = document.querySelector(`[data-section="${id}"]`);
        if (botaoAtivo) botaoAtivo.classList.add("active");

        // salvar última aba (PWA profissional)
        localStorage.setItem("ultimaSecao", id);
    }

    // clique nos botões
    botoes.forEach(botao => {
        botao.addEventListener("click", () => {
            const secao = botao.dataset.section;
            abrirSecao(secao);
        });
    });

    // abrir última aba usada
    const ultima = localStorage.getItem("ultimaSecao") || "ohm";
    abrirSecao(ultima);

});[15, 75, 105, 130, 155];
    
    doc.setFillColor(240, 240, 240);
    doc.rect(15, y - 5, pageWidth - 30, 8, 'F');
    doc.setFont(undefined, 'bold');
    doc.text('Circuito', colX[0], y);
    doc.text('Potência (W)', colX[1], y);
    doc.text('Tensão (V)', colX[2], y);
    doc.text('Corrente (A)', colX[3], y);
    doc.text('Disjuntor (A)', colX[4], y);
    y += 8;
    doc.setFont(undefined, 'normal');
    
    // Dados
    let potenciaTotal = 0;
    let correnteTotal = 0;
    
    circuitos.forEach((circ, index) => {
        if (y > pageHeight - 30) {
            doc.addPage();
            y = 20;
        }
        
        const corrente = circ.potencia / (circ.tensao * circ.fp);
        potenciaTotal += circ.potencia;
        correnteTotal += corrente;
        
        const disjuntores = [6, 10, 13, 16, 20, 25, 32, 40, 50, 63, 70, 80, 100];
        const disjuntor = disjuntores.find(d => d >= corrente) || 100;
        
        doc.text(circ.nome.substring(0, 25), colX[0], y);
        doc.text(circ.potencia.toString(), colX[1], y);
        doc.text(circ.tensao.toString(), colX[2], y);
        doc.text(corrente.toFixed(2), colX[3], y);
        doc.text(disjuntor.toString(), colX[4], y);
        y += 7;
    });
    
    // Totais
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(15, y, pageWidth - 15, y);
    y += 8;
    
    doc.setFont(undefined, 'bold');
    doc.setFontSize(11);
    doc.text('Resumo do Quadro', 15, y);
    y += 8;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(10);
    
    doc.text(`Potência Total: ${potenciaTotal.toFixed(2)} W (${(potenciaTotal/1000).toFixed(2)} kW)`, 15, y);
    y += 6;
    doc.text(`Corrente Total: ${correnteTotal.toFixed(2)} A`, 15, y);
    y += 6;
    
    const disjuntoresGerais = [40, 50, 63, 70, 80, 100, 125, 150, 175, 200];
    const disjuntorGeral = disjuntoresGerais.find(d => d >= correnteTotal) || 200;
    doc.text(`Disjuntor Geral Recomendado: ${disjuntorGeral} A`, 15, y);
    y += 6;
    
    const condutoresEntrada = {
        10: 50, 16: 68, 25: 89, 35: 111, 50: 134, 70: 171, 95: 207, 120: 239
    };
    
    let secaoEntrada = 10;
    for (let [s, cap] of Object.entries(condutoresEntrada)) {
        if (cap >= correnteTotal * 1.25) {
            secaoEntrada = parseFloat(s);
            break;
        }
    }
    
    doc.text(`Cabo de Entrada Recomendado: ${secaoEntrada} mm²`, 15, y);
}

function exportarSecaoBitolas(doc, y, pageWidth, pageHeight) {
    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.text('Capacidade de Corrente - Condutores de Cobre (PVC)', 15, y);
    y += 8;
    doc.setFont(undefined, 'normal');
    doc.setFontSize(9);
    
    // Tabela de bitolas
    const bitolas = [
        [1.5, 15.5, 'Iluminação, tomadas (até 1500W)'],
        [2.5, 21, 'Tomadas de uso geral (até 2200W)'],
        [4, 28, 'torneira elétrica até 4000W, ar condionado até 18.000BTUs'],
        [6, 36, 'Chuveiros até 7700W, ar condicionado acima de 18 até 30.000BTUs'],
        [10, 50, 'Alimentadores, ar condicionado acima de 30.000BTUs'],
        [16, 68, 'Circuitos de distribuição'],
        [25, 89, 'Alimentadores gerais'],
        [35, 111, 'Alimentadores principais'],
        [50, 134, 'Entrada de energia']
    ];
    
    const colX = [15, 40, 70];
    
    doc.setFillColor(240, 240, 240);
    doc.rect(15, y - 5, pageWidth - 30, 7, 'F');
    doc.setFont(undefined, 'bold');
    doc.text('Seção (mm²)', colX[0], y);
    doc.text('Corrente (A)', colX[1], y);
    doc.text('Aplicação', colX[2], y);
    y += 7;
    doc.setFont(undefined, 'normal');
    
    bitolas.forEach(([secao, corrente, aplicacao]) => {
        if (y > pageHeight - 20) {
            doc.addPage();
            y = 20;
        }
        doc.text(secao.toString(), colX[0], y);
        doc.text(corrente.toString(), colX[1], y);
        const linhas = doc.splitTextToSize(aplicacao, 100);
        doc.text(linhas, colX[2], y);
        y += 7;
    });
}

function exportarSecaoConversao(doc, y, pageWidth) {
    const w = document.getElementById('conv_w').value;
    const kw = document.getElementById('conv_kw').value;
    const cv = document.getElementById('conv_cv').value;
    const hp = document.getElementById('conv_hp').value;
    
    if (w || kw || cv || hp) {
        doc.text('Conversões de Potência:', 15, y);
        y += 7;
        if (w) doc.text(`Watts: ${w} W`, 20, y), y += 6;
        if (kw) doc.text(`Kilowatts: ${kw} kW`, 20, y), y += 6;
        if (cv) doc.text(`Cavalos-vapor: ${cv} CV`, 20, y), y += 6;
        if (hp) doc.text(`Horse Power: ${hp} HP`, 20, y), y += 6;
    } else {
        doc.text('Nenhuma conversão realizada.', 15, y);
    }
}

function exportarSecaoConsumo(doc, y, pageWidth) {
    const resultado = document.getElementById('cons_result').innerText;
    
    if (resultado) {
        const linhas = doc.splitTextToSize(resultado, pageWidth - 30);
        doc.text(linhas, 15, y);
    } else {
        doc.text('Nenhum cálculo de consumo realizado.', 15, y);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    atualizarListaCircuitos();
});
