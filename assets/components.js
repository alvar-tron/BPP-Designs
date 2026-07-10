/* ══════════════════════════════════════════════════════
   COMPONENTES COMPARTIDOS — topbar, nav, footer, fab
   Web Components nativos (sin build, sin librerías).
   Cada página solo necesita <script src="assets/components.js"></script>
   en el <head> y las etiquetas <bpp-topbar>, <bpp-nav>, <bpp-footer>,
   <bpp-fab> donde corresponda. El CSS sigue viviendo en cada página
   (estos componentes no usan Shadow DOM, así que heredan los estilos
   normales del documento).
══════════════════════════════════════════════════════ */

class BppTopbar extends HTMLElement {
  connectedCallback() {
    this.className = 'topbar';
    this.innerHTML = `
      <div class="topbar-left">
        <a href="tel:+56949409721" class="topbar-link">
          <svg class="topbar-link-icon" viewBox="0 0 16 16" fill="none">
            <path d="M3 1h3l1.5 4-2 1.5c1 2 2.5 3.5 4.5 4.5L11.5 9l4 1.5V14c0 1.1-.9 2-2 2C6.4 16 0 9.6 0 3c0-1.1.9-2 2-2h1z" fill="currentColor" />
          </svg>
          +56 9 4940 9721
        </a>
        <div class="topbar-sep"></div>
        <a href="mailto:info@berriospalavecino.cl" class="topbar-link">
          <svg class="topbar-link-icon" viewBox="0 0 16 12" fill="none">
            <rect x="1" y="1" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.4" />
            <path d="M1 3l7 5 7-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
          </svg>
          info@berriospalavecino.cl
        </a>
      </div>
      <div class="topbar-spacer"></div>
      <div class="topbar-right">
        <a href="https://wa.me/56949409721" class="topbar-btn topbar-btn--wa" target="_blank" rel="noopener">
          <svg class="topbar-btn-icon" width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.52 3.66 1.427 5.18L2 22l4.957-1.396A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="currentColor" opacity=".95" />
            <path d="M8.5 8.5c.2-.5.7-.9 1.2-.9.4 0 .7.1.9.5l1.1 2.4c.1.3 0 .7-.2.9l-.5.6c.5 1 1.4 1.9 2.4 2.4l.6-.5c.2-.2.6-.3.9-.2l2.4 1.1c.4.2.5.5.5.9 0 .5-.4 1-.9 1.2-2.5 1-6.5-2-7.5-4.5-.5-1.3-.5-2.9.1-3.9z" fill="#0A2A5E" />
          </svg>
          <span class="topbar-btn-label--long">Agendar WhatsApp</span>
          <span class="topbar-btn-label--short">WhatsApp</span>
        </a>
        <a href="https://www.linkedin.com/company/bpp-abogados" class="topbar-btn topbar-btn--li" target="_blank" rel="noopener">
          <svg class="topbar-btn-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
          <span class="topbar-btn-label--long">Síguenos en LinkedIn</span>
          <span class="topbar-btn-label--short">LinkedIn</span>
        </a>
      </div>
    `;
  }
}

class BppNav extends HTMLElement {
  connectedCallback() {
    this.className = 'nav';
    this.innerHTML = `
      <a href="./index.html" class="nav-logo">
        <img src="./assets/logo-navbar.svg" alt="BPP Berríos Palavecino" width="188" height="50" />
      </a>
      <div class="nav-right">
        <ul class="nav-links">
          <li><a href="./index.html">Inicio</a></li>
          <li><a href="./BPP_Areas.html">Áreas</a></li>
          <li><a href="./BPP_Noticias.html">Noticias</a></li>
        </ul>
        <!-- Menú desplegable Nuestro Equipo -->
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" aria-haspopup="menu" aria-expanded="false">
            Nuestro Equipo <span class="arrow">▾</span>
          </button>
          <div class="nav-dropdown-menu">
            <a href="./BPP_Equipo.html" class="nav-dropdown-item">
              <span class="nav-dropdown-item-dot"></span> Nuestro equipo
            </a>
            <a href="./BPP_Estudio.html" class="nav-dropdown-item">
              <span class="nav-dropdown-item-dot"></span> El estudio
            </a>
          </div>
        </div>
        <ul class="nav-links">
          <li><a href="./BPP_Postulacion.html">Postulaciones</a></li>
        </ul>
        <!-- Menú desplegable Contacto -->
        <div class="nav-dropdown">
          <button class="nav-dropdown-toggle" aria-haspopup="menu" aria-expanded="false">
            Contacto <span class="arrow">▾</span>
          </button>
          <div class="nav-dropdown-menu">
            <a href="./BPP_Contacto.html?area=laboral" class="nav-dropdown-item" data-area="laboral">
              <span class="nav-dropdown-item-dot"></span> Defensa Laboral
            </a>
            <a href="./BPP_Contacto.html?area=civil" class="nav-dropdown-item" data-area="civil">
              <span class="nav-dropdown-item-dot"></span> Derecho Civil
            </a>
            <a href="./BPP_Contacto.html?area=penal" class="nav-dropdown-item" data-area="penal">
              <span class="nav-dropdown-item-dot"></span> Derecho Penal
            </a>
            <a href="./BPP_Contacto.html?area=administrativo" class="nav-dropdown-item" data-area="administrativo">
              <span class="nav-dropdown-item-dot"></span> Derecho Administrativo
            </a>
          </div>
        </div>
      </div>
    `;

    /* ── DROPDOWNS NAV — sincroniza aria-expanded (Nuestro Equipo + Contacto) ── */
    this.querySelectorAll('.nav-dropdown').forEach((dd) => {
      const toggle = dd.querySelector('.nav-dropdown-toggle');
      if (!toggle) return;
      const setExpanded = (v) => toggle.setAttribute('aria-expanded', v);
      dd.addEventListener('mouseenter', () => setExpanded('true'));
      dd.addEventListener('mouseleave', () => setExpanded('false'));
      dd.addEventListener('focusin', () => setExpanded('true'));
      dd.addEventListener('focusout', () => setExpanded('false'));
    });
  }
}

class BppFooter extends HTMLElement {
  connectedCallback() {
    this.className = 'footer';
    this.innerHTML = `
      <div class="footer-inner">
        <div class="footer-top">
          <div class="footer-decor-1"></div>
          <div class="footer-decor-2"></div>
          <div>
            <div class="footer-logo-wrap">
              <svg viewBox="0 0 310 310" width="127" height="127" xmlns="http://www.w3.org/2000/svg">
                <rect width="310" height="310" fill="#1B64C8" />
                <text x="28" y="178" font-family="Montserrat,Arial,sans-serif" font-weight="500" font-size="62" fill="#FFFFFF" letter-spacing="-1">BPP</text>
                <rect x="162" y="113" width="3" height="84" fill="#FFFFFF" rx="1" />
                <text x="174" y="139" font-family="Montserrat,Arial,sans-serif" font-weight="600" font-size="16" fill="#FFFFFF" letter-spacing="1.2">BERRÍOS</text>
                <text x="174" y="161" font-family="Montserrat,Arial,sans-serif" font-weight="600" font-size="16" fill="#FFFFFF" letter-spacing="1.2">PALAVECINO</text>
                <text x="174" y="183" font-family="Montserrat,Arial,sans-serif" font-weight="600" font-size="16" fill="#FFFFFF" letter-spacing="1.2">PINOCHET</text>
              </svg>
            </div>
          </div>
          <div>
            <div class="footer-col-title">El Estudio</div>
            <a href="./BPP_Estudio.html" class="footer-col-link">El estudio <span class="footer-col-link-arrow">→</span></a>
            <a href="./BPP_Equipo.html" class="footer-col-link">Nuestro equipo <span class="footer-col-link-arrow">→</span></a>
            <a href="./BPP_Postulacion.html" class="footer-col-link">Postulaciones <span class="footer-col-link-arrow">→</span></a>
            <a href="./BPP_Noticias.html" class="footer-col-link">Noticias <span class="footer-col-link-arrow">→</span></a>
          </div>
          <div>
            <div class="footer-col-title">Áreas de Práctica</div>
            <a href="./BPP_Areas.html" class="footer-col-link">Derecho Laboral <span class="footer-col-link-arrow">→</span></a>
            <a href="./BPP_Areas.html" class="footer-col-link">Litigios laborales y civiles <span class="footer-col-link-arrow">→</span></a>
            <a href="./BPP_Areas.html" class="footer-col-link">Asesoría laboral corporativa <span class="footer-col-link-arrow">→</span></a>
            <a href="./BPP_Areas.html" class="footer-col-link">Protección de datos <span class="footer-col-link-arrow">→</span></a>
            <a href="./BPP_Areas.html" class="footer-col-link" style="color:var(--blue);font-weight:500">Ver todas → <span class="footer-col-link-arrow">→</span></a>
          </div>
          <div>
            <div class="footer-col-title">Contacto</div>
            <a href="#" class="footer-col-link">Av. Apoquindo 3000, piso 15, of. 1501 <span class="footer-col-link-arrow">→</span></a>
            <a href="#" class="footer-col-link">Las Condes, Santiago <span class="footer-col-link-arrow">→</span></a>
            <a href="tel:+56949409721" class="footer-col-link">+56 9 4940 9721 <span class="footer-col-link-arrow">→</span></a>
            <a href="tel:+56223456789" class="footer-col-link">+56 2 2345 6789 <span class="footer-col-link-arrow">→</span></a>
            <a href="tel:+56223456790" class="footer-col-link">+56 2 2345 6790 <span class="footer-col-link-arrow">→</span></a>
            <a href="mailto:info@berriospalavecino.cl" class="footer-col-link">info@berriospalavecino.cl <span class="footer-col-link-arrow">→</span></a>
          </div>
        </div>
        <div class="footer-bottom">
          <span class="footer-copy">© 2026 Berríos Palavecino. Todos los derechos reservados.</span>
          <div class="footer-legal-links">
            <a href="#" class="footer-legal-link">LinkedIn</a>
            <a href="#" class="footer-legal-link">Política de privacidad</a>
            <a href="./BPP_Postulacion.html" class="footer-legal-link">Postulaciones</a>
          </div>
        </div>
      </div>
    `;
  }
}

class BppFab extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <a href="https://wa.me/56949409721" class="fab" target="_blank" rel="noopener">
        <div class="fab-icon-wrap">
          <svg class="fab-icon" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.52 3.66 1.427 5.18L2 22l4.957-1.396A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="rgba(255,255,255,0.15)" />
            <path d="M8.5 8.5c.2-.5.7-.9 1.2-.9.4 0 .7.1.9.5l1.1 2.4c.1.3 0 .7-.2.9l-.5.6c.5 1 1.4 1.9 2.4 2.4l.6-.5c.2-.2.6-.3.9-.2l2.4 1.1c.4.2.5.5.5.9 0 .5-.4 1-.9 1.2-2.5 1-6.5-2-7.5-4.5-.5-1.3-.5-2.9.1-3.9z" fill="white" />
          </svg>
        </div>
        <span class="fab-label">Agendar consulta</span>
      </a>
      <div class="fab-decor-1"></div>
      <div class="fab-decor-2"></div>
    `;
  }
}

customElements.define('bpp-topbar', BppTopbar);
customElements.define('bpp-nav', BppNav);
customElements.define('bpp-footer', BppFooter);
customElements.define('bpp-fab', BppFab);
