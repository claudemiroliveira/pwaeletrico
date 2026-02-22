// Registro do Service Worker e instalação do PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado com sucesso:', registration.scope);
        
        // Verifica atualizações
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          console.log('🔄 Nova versão do Service Worker encontrada');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // Nova versão disponível
              if (confirm('Nova versão disponível! Deseja atualizar?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        });
      })
      .catch((error) => {
        console.error('❌ Erro ao registrar Service Worker:', error);
      });
  });
}

// Detecta quando o app está instalado
let deferredPrompt;
const installButton = document.createElement('button');
installButton.id = 'install-button';
installButton.innerHTML = '📱 Instalar App';
installButton.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #4ecca3 0%, #0f3460 100%);
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 50px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  display: none;
  transition: all 0.3s;
`;

installButton.addEventListener('mouseenter', () => {
  installButton.style.transform = 'scale(1.1)';
});

installButton.addEventListener('mouseleave', () => {
  installButton.style.transform = 'scale(1)';
});

document.body.appendChild(installButton);

window.addEventListener('beforeinstallprompt', (e) => {
  // Previne o prompt automático
  e.preventDefault();
  deferredPrompt = e;
  
  // Mostra o botão de instalação
  installButton.style.display = 'block';
  
  console.log('💡 Prompt de instalação disponível');
});

installButton.addEventListener('click', async () => {
  if (!deferredPrompt) {
    return;
  }

  // Mostra o prompt de instalação
  deferredPrompt.prompt();
  
  const { outcome } = await deferredPrompt.userChoice;
  console.log(`👉 Usuário ${outcome === 'accepted' ? 'aceitou' : 'recusou'} a instalação`);
  
  if (outcome === 'accepted') {
    installButton.style.display = 'none';
  }
  
  deferredPrompt = null;
});

// Detecta quando o app foi instalado
window.addEventListener('appinstalled', () => {
  console.log('✅ PWA foi instalado com sucesso!');
  installButton.style.display = 'none';
  
  // Mostra notificação
  showNotification('App instalado com sucesso! 🎉', 'success');
});

// Detecta modo standalone (quando aberto como app instalado)
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || 
         window.navigator.standalone || 
         document.referrer.includes('android-app://');
}

if (isStandalone()) {
  console.log('📱 Executando em modo standalone (app instalado)');
  installButton.style.display = 'none';
  
  // Adiciona badge indicando modo app
  const appBadge = document.createElement('div');
  appBadge.style.cssText = `
    position: fixed;
    top: 10px;
    left: 10px;
    background: rgba(78, 204, 163, 0.2);
    color: #4ecca3;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    z-index: 999;
    backdrop-filter: blur(10px);
  `;
  appBadge.innerHTML = '📱 App Mode';
  document.body.appendChild(appBadge);
}

// Detecta conexão online/offline
window.addEventListener('online', () => {
  showNotification('✅ Conexão restaurada!', 'success');
});

window.addEventListener('offline', () => {
  showNotification('📡 Modo offline ativado', 'warning');
});

// Função para mostrar notificações
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'success' ? '#4ecca3' : type === 'warning' ? '#f39c12' : '#0f3460'};
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    font-weight: bold;
    z-index: 10000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    animation: slideDown 0.3s ease;
  `;
  
  notification.innerHTML = message;
  document.body.appendChild(notification);
  
  // Remove após 3 segundos
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Adiciona animações CSS
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(-100px);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(-100px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(animationStyle);

// Status de conexão
console.log('🌐 Status de conexão:', navigator.onLine ? 'Online' : 'Offline');

// Informações do PWA
if ('getInstalledRelatedApps' in navigator) {
  navigator.getInstalledRelatedApps().then(apps => {
    if (apps.length > 0) {
      console.log('📱 Apps relacionados instalados:', apps);
    }
  });
}
