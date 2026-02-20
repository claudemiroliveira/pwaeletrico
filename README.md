# ⚡ PWA Elétrico Profissional

Progressive Web App completo para cálculos elétricos, dimensionamento e tabelas de referência.

## 🚀 Funcionalidades

### 📊 Calculadoras
- **Lei de Ohm e Potência**: Cálculos completos de tensão, corrente, resistência e potência
- **Potência Trifásica**: Cálculos de sistemas trifásicos (estrela e triângulo)
  - Potência ativa, reativa e aparente
  - Fator de potência
  - Tensões e correntes de linha e fase
  - Dimensionamento de corrente necessária
- **Queda de Tensão**: Cálculo para circuitos monofásicos e trifásicos
- **Dimensionamento de Disjuntores**: Seleção adequada de disjuntores
- **Conversões**: Potência (W, kW, CV, HP) e energia (kWh, Wh, J)
- **Consumo e Custo**: Análise financeira de equipamentos elétricos

### 📈 Tabelas de Referência
- Capacidade de corrente de condutores (NBR 5410)
- Bitolas de fios e cabos
- Disjuntores termomagnéticos padrão
- Tensões padrão no Brasil

### 💡 Características do PWA
- ✅ **Instalável**: Pode ser instalado no celular ou desktop
- ✅ **Offline**: Funciona sem conexão com internet
- ✅ **Responsivo**: Adapta-se a qualquer tamanho de tela
- ✅ **Rápido**: Cache local para carregamento instantâneo
- ✅ **Profissional**: Interface limpa e intuitiva

## 🎯 Cálculos de Potência Trifásica

### Fórmulas Implementadas

**Potência Aparente (S):**
```
S = √3 × VL × IL
```

**Potência Ativa (P):**
```
P = √3 × VL × IL × cos(φ)
```

**Potência Reativa (Q):**
```
Q = √3 × VL × IL × sen(φ)
```

**Corrente de Linha:**
```
IL = P / (√3 × VL × cos(φ))
```

### Conexões Suportadas
- **Estrela (Y)**: VF = VL / √3, IF = IL
- **Triângulo (Δ)**: VF = VL, IF = IL / √3

## 📱 Como Instalar

### Desktop (Chrome/Edge)
1. Abra o aplicativo no navegador
2. Clique no ícone de instalação na barra de endereços
3. Confirme a instalação

### Mobile (Android/iOS)
1. Abra no Chrome/Safari
2. Toque no botão "Instalar" quando aparecer
3. Ou use "Adicionar à tela inicial" no menu

## 🛠️ Tecnologias

- HTML5
- CSS3 (Design responsivo)
- JavaScript (ES6+)
- Service Worker (Cache offline)
- Web App Manifest

## 📋 Conformidade

- Baseado na **NBR 5410** (Instalações elétricas de baixa tensão)
- Limites de queda de tensão conforme norma
- Tabelas de capacidade de condutores atualizadas

## 🎨 Interface

- Design moderno e profissional
- Cores temáticas: Azul (#1976d2) e Amarelo (#ffc107)
- Responsivo para mobile, tablet e desktop
- Animações suaves
- Feedback visual para todas as ações

## 📊 Casos de Uso

1. **Eletricistas**: Dimensionamento rápido em campo
2. **Engenheiros**: Verificação de cálculos
3. **Estudantes**: Ferramenta de aprendizado
4. **Projetistas**: Consulta de tabelas
5. **Manutenção**: Análise de circuitos existentes

## ⚠️ Observações Importantes

- Os cálculos são baseados em condições ideais
- Sempre consulte a NBR 5410 para projetos definitivos
- Considere fatores de correção (temperatura, agrupamento)
- Para motores, considere corrente de partida
- Verifique condições específicas da instalação

## 🔐 Segurança

- Aplicativo funciona 100% no dispositivo
- Nenhum dado é enviado para servidores externos
- Privacidade total dos cálculos

## 📄 Licença

Uso livre para fins educacionais e profissionais.

---

Desenvolvido para profissionais da área elétrica 🔌⚡