// Sistema de Licença PRO - 7 dias gratuitos
class LicenseManager {
  constructor() {
    this.TRIAL_DAYS = 7;
    this.STORAGE_KEY = 'calceletrica_first_use';
    this.LICENSE_KEY = 'calceletrica_license';
    this.init();
  }

  init() {
    // Registra primeira utilização se não existir
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const firstUse = new Date().getTime();
      localStorage.setItem(this.STORAGE_KEY, firstUse);
      console.log('Primeira utilização registrada');
    }
    
    // Verifica status da licença
    this.checkLicense();
  }

  checkLicense() {
    const firstUse = parseInt(localStorage.getItem(this.STORAGE_KEY));
    const now = new Date().getTime();
    const daysPassed = Math.floor((now - firstUse) / (1000 * 60 * 60 * 24));
    
    console.log(`Dias desde a primeira utilização: ${daysPassed}`);
    
    if (daysPassed >= this.TRIAL_DAYS) {
      const hasLicense = localStorage.getItem(this.LICENSE_KEY);
      
      if (!hasLicense) {
        this.showTrialExpiredModal();
        return false;
      }
    }
    
    // Atualiza contador de dias restantes
    this.updateTrialCounter(this.TRIAL_DAYS - daysPassed);
    return true;
  }

  getDaysRemaining() {
    const firstUse = parseInt(localStorage.getItem(this.STORAGE_KEY));
    const now = new Date().getTime();
    const daysPassed = Math.floor((now - firstUse) / (1000 * 60 * 60 * 24));
    return Math.max(0, this.TRIAL_DAYS - daysPassed);
  }

  isTrialActive() {
    return this.getDaysRemaining() > 0;
  }

  hasLicense() {
    return localStorage.getItem(this.LICENSE_KEY) !== null;
  }

  activateLicense(licenseKey) {
    // Validação simples de chave (você pode implementar uma validação mais robusta)
    if (this.validateLicenseKey(licenseKey)) {
      localStorage.setItem(this.LICENSE_KEY, licenseKey);
      alert('✅ Licença PRO ativada com sucesso!');
      location.reload();
      return true;
    } else {
      alert('❌ Chave de licença inválida!');
      return false;
    }
  }

  validateLicenseKey(key) {
    // Validação de exemplo - substitua por sua própria lógica
    // Formato: CALC-XXXX-XXXX-XXXX
    const pattern = /^CALC-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;
    return pattern.test(key);
  }

  updateTrialCounter(daysRemaining) {
    const counterElement = document.getElementById('trial-counter');
    if (counterElement && daysRemaining > 0) {
      counterElement.innerHTML = `
        <div class="trial-badge">
          ⏱️ Trial: ${daysRemaining} dia${daysRemaining !== 1 ? 's' : ''} restante${daysRemaining !== 1 ? 's' : ''}
          <button onclick="licenseManager.showActivationModal()" class="btn-activate">
            Ativar PRO
          </button>
        </div>
      `;
      counterElement.style.display = 'block';
    } else if (counterElement) {
      counterElement.style.display = 'none';
    }
  }

  showTrialExpiredModal() {
    const modal = document.createElement('div');
    modal.className = 'license-modal';
    modal.innerHTML = `
      <div class="license-modal-content">
        <div class="license-modal-header">
          <h2>⏰ Período Trial Expirado</h2>
        </div>
        <div class="license-modal-body">
          <p>Seu período de teste de <strong>7 dias</strong> expirou.</p>
          <p>Para continuar usando todas as funcionalidades da <strong>Calculadora Elétrica PRO</strong>, adquira uma licença.</p>
          
          <div class="license-benefits">
            <h3>✨ Benefícios da Versão PRO:</h3>
            <ul>
              <li>✅ Acesso ilimitado a todas as calculadoras</li>
              <li>✅ Modo offline completo</li>
              <li>✅ Exportação de orçamentos em PDF</li>
              <li>✅ Suporte prioritário</li>
              <li>✅ Atualizações gratuitas</li>
            </ul>
          </div>

          <div class="license-input-group">
            <label for="license-key-input">Já possui uma licença?</label>
            <input 
              type="text" 
              id="license-key-input" 
              placeholder="CALC-XXXX-XXXX-XXXX"
              maxlength="19"
            />
            <button onclick="licenseManager.activateLicenseFromModal()" class="btn-primary">
              Ativar Licença
            </button>
          </div>

          <div class="license-purchase">
            <p><strong>Não possui uma licença?</strong></p>
            <button onclick="licenseManager.purchaseLicense()" class="btn-purchase">
              💳 Adquirir Licença PRO - R$ 47,00
            </button>
          </div>
        </div>
        <div class="license-modal-footer">
          <p>Contato: <a href="mailto:contato@calceletrica.com">contato@calceletrica.com</a></p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Bloqueia interação com a página
    document.body.style.overflow = 'hidden';
  }

  showActivationModal() {
    const modal = document.createElement('div');
    modal.className = 'license-modal';
    modal.id = 'activation-modal';
    modal.innerHTML = `
      <div class="license-modal-content activation-modal">
        <button class="modal-close" onclick="licenseManager.closeActivationModal()">×</button>
        <div class="license-modal-header">
          <h2>🔑 Ativar Licença PRO</h2>
        </div>
        <div class="license-modal-body">
          <div class="license-input-group">
            <label for="license-key-input-2">Digite sua chave de licença:</label>
            <input 
              type="text" 
              id="license-key-input-2" 
              placeholder="CALC-XXXX-XXXX-XXXX"
              maxlength="19"
            />
            <button onclick="licenseManager.activateLicenseFromModal()" class="btn-primary">
              Ativar Licença
            </button>
          </div>

          <div class="license-purchase">
            <p><strong>Ainda não possui uma licença?</strong></p>
            <button onclick="licenseManager.purchaseLicense()" class="btn-purchase">
              💳 Adquirir Licença PRO - R$ 47,00
            </button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  closeActivationModal() {
    const modal = document.getElementById('activation-modal');
    if (modal) {
      modal.remove();
    }
  }

  activateLicenseFromModal() {
    const input = document.getElementById('license-key-input') || 
                  document.getElementById('license-key-input-2');
    const licenseKey = input.value.trim().toUpperCase();
    
    if (licenseKey) {
      this.activateLicense(licenseKey);
    } else {
      alert('⚠️ Por favor, digite uma chave de licença válida.');
    }
  }

  purchaseLicense() {
    // Aqui você pode integrar com um sistema de pagamento
    // Por exemplo: Mercado Pago, PagSeguro, Stripe, etc.
    alert('🛒 Redirecionando para a página de compra...\n\nEm breve você receberá sua chave de licença por e-mail.');
    
    // Exemplo de redirecionamento
    // window.open('https://seusite.com/comprar-licenca', '_blank');
  }

  resetTrial() {
    // Método para resetar o trial (apenas para testes)
    localStorage.removeItem(this.STORAGE_KEY);
    localStorage.removeItem(this.LICENSE_KEY);
    alert('Trial resetado! Recarregue a página.');
  }
}

// Inicializa o gerenciador de licenças
const licenseManager = new LicenseManager();

// Adiciona estilos CSS para os modais
const style = document.createElement('style');
style.textContent = `
  .license-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .license-modal-content {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 20px;
    max-width: 600px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    animation: slideIn 0.3s ease;
    position: relative;
  }

  @keyframes slideIn {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .license-modal-header {
    background: linear-gradient(135deg, #0f3460 0%, #533483 100%);
    padding: 25px;
    border-radius: 20px 20px 0 0;
    color: white;
    text-align: center;
  }

  .license-modal-header h2 {
    margin: 0;
    font-size: 28px;
  }

  .license-modal-body {
    padding: 30px;
    color: #e0e0e0;
  }

  .license-modal-body p {
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 15px;
  }

  .license-benefits {
    background: rgba(255, 255, 255, 0.05);
    padding: 20px;
    border-radius: 10px;
    margin: 20px 0;
  }

  .license-benefits h3 {
    color: #4ecca3;
    margin-top: 0;
  }

  .license-benefits ul {
    list-style: none;
    padding: 0;
  }

  .license-benefits li {
    padding: 8px 0;
    font-size: 15px;
  }

  .license-input-group {
    margin: 25px 0;
  }

  .license-input-group label {
    display: block;
    margin-bottom: 10px;
    color: #4ecca3;
    font-weight: bold;
  }

  .license-input-group input {
    width: 100%;
    padding: 15px;
    border: 2px solid #0f3460;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 16px;
    font-family: monospace;
    letter-spacing: 2px;
    margin-bottom: 15px;
    box-sizing: border-box;
  }

  .license-input-group input:focus {
    outline: none;
    border-color: #4ecca3;
  }

  .btn-primary, .btn-purchase {
    width: 100%;
    padding: 15px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-primary {
    background: linear-gradient(135deg, #4ecca3 0%, #0f3460 100%);
    color: white;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(78, 204, 163, 0.4);
  }

  .btn-purchase {
    background: linear-gradient(135deg, #f39c12 0%, #e74c3c 100%);
    color: white;
    margin-top: 10px;
  }

  .btn-purchase:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(243, 156, 18, 0.4);
  }

  .license-purchase {
    text-align: center;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .license-modal-footer {
    background: rgba(0, 0, 0, 0.3);
    padding: 15px;
    text-align: center;
    border-radius: 0 0 20px 20px;
  }

  .license-modal-footer a {
    color: #4ecca3;
    text-decoration: none;
  }

  .trial-badge {
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #f39c12 0%, #e74c3c 100%);
    color: white;
    padding: 12px 20px;
    border-radius: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    font-weight: bold;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  .btn-activate {
    background: white;
    color: #e74c3c;
    border: none;
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
  }

  .btn-activate:hover {
    transform: scale(1.1);
  }

  .modal-close {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: white;
    font-size: 30px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 1;
  }

  .modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }

  .activation-modal {
    max-width: 500px;
  }

  @media (max-width: 768px) {
    .license-modal-content {
      width: 95%;
      max-height: 95vh;
    }

    .trial-badge {
      top: 10px;
      right: 10px;
      font-size: 12px;
      padding: 8px 12px;
    }
  }
`;

document.head.appendChild(style);

// Adiciona contador de trial na página
const trialCounter = document.createElement('div');
trialCounter.id = 'trial-counter';
document.body.appendChild(trialCounter);

// Para testes - remova em produção
console.log('Sistema de Licença carregado');
console.log('Dias restantes:', licenseManager.getDaysRemaining());
console.log('Trial ativo:', licenseManager.isTrialActive());
console.log('Tem licença:', licenseManager.hasLicense());
