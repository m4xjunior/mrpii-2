import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../../hooks/useTheme";

export const metadata: Metadata = {
  title: "SCADA - Sistema MRPII",
  description: "Sistema de monitoramento industrial SCADA baseado no MRPII",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/assets/images/favicon-32x32.png" type="image/png" />
        <link href="/assets/plugins/vectormap/jquery-jvectormap-2.0.2.css" rel="stylesheet" />
        <link href="/assets/plugins/simplebar/css/simplebar.css" rel="stylesheet" />
        <link href="/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
        <link href="/assets/plugins/metismenu/css/metisMenu.min.css" rel="stylesheet" />
        <link href="/assets/css/pace.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Roboto&display=swap" />
        <link rel="stylesheet" href="/assets/css/icons.css" />
        <link rel="stylesheet" href="/assets/css/app.css" />
        <link rel="stylesheet" href="/assets/css/dark-sidebar.css" />
        <link rel="stylesheet" href="/assets/css/dark-theme.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Removido pace.min.js para resolver erro de hidratação */}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="/assets/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/plugins/simplebar/js/simplebar.min.js"></script>
        <script src="/assets/plugins/metismenu/js/metisMenu.min.js"></script>
        <script src="/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js"></script>
        <script src="/assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js"></script>
        <script src="/assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js"></script>
        <script src="/assets/plugins/vectormap/jquery-jvectormap-in-mill.js"></script>
        <script src="/assets/plugins/vectormap/jquery-jvectormap-us-aea-en.js"></script>
        <script src="/assets/plugins/vectormap/jquery-jvectormap-uk-mill-en.js"></script>
        <script src="/assets/plugins/vectormap/jquery-jvectormap-au-mill.js"></script>
        <script src="/assets/plugins/apexcharts-bundle/js/apexcharts.min.js"></script>
        <script src="/assets/js/index2.js"></script>
        <script src="/assets/js/app.js"></script>

        {/* Theme Switcher Script */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              'use strict';

              // Función para aplicar tema
              function applyTheme(theme) {
                const body = document.body;
                const html = document.documentElement;

                // Remover todas las clases de tema
                body.classList.remove('dark-theme', 'semi-dark-theme', 'colorless-icons');
                html.classList.remove('dark-theme', 'semi-dark-theme', 'colorless-icons');

                console.log('🎨 Aplicando tema:', theme);

                switch(theme) {
                  case 'dark':
                    body.classList.add('dark-theme');
                    html.classList.add('dark-theme');
                    console.log('🌙 Tema oscuro aplicado');
                    break;
                  case 'semi-dark':
                    body.classList.add('semi-dark-theme');
                    html.classList.add('semi-dark-theme');
                    console.log('🌓 Tema semi-oscuro aplicado');
                    break;
                  case 'colorless':
                    body.classList.add('colorless-icons');
                    html.classList.add('colorless-icons');
                    console.log('🎨 Tema sin color aplicado');
                    break;
                  default:
                    console.log('☀️ Tema claro aplicado');
                    break;
                }

                // Guardar en localStorage
                localStorage.setItem('scada-theme', theme);

                // Disparar evento personalizado para React
                const event = new CustomEvent('themeChange', { detail: { theme } });
                document.dispatchEvent(event);
              }

              // Inicializar cuando el DOM esté listo
              function initThemeSwitcher() {
                console.log('🔧 Inicializando Theme Switcher...');

                // Buscar todos los radio buttons de tema
                const radioButtons = document.querySelectorAll('input[name="inlineRadioOptions"]');
                console.log('📻 Radio buttons encontrados:', radioButtons.length);

                if (radioButtons.length === 0) {
                  console.log('⏳ Esperando radio buttons...');
                  setTimeout(initThemeSwitcher, 100);
                  return;
                }

                // Cargar tema guardado
                const savedTheme = localStorage.getItem('scada-theme') || 'light';
                console.log('💾 Tema guardado:', savedTheme);

                // Seleccionar el radio button correcto
                const themeMapping = {
                  'light': 'lightmode',
                  'dark': 'darkmode',
                  'semi-dark': 'darksidebar',
                  'colorless': 'ColorLessIcons'
                };

                const correctRadio = document.getElementById(themeMapping[savedTheme]);
                if (correctRadio) {
                  correctRadio.checked = true;
                  console.log('✅ Radio button seleccionado:', correctRadio.id);
                }

                // Agregar event listeners
                radioButtons.forEach(radio => {
                  radio.addEventListener('change', function() {
                    console.log('🔄 Radio button cambiado:', this.id);

                    let theme = 'light';
                    switch(this.id) {
                      case 'lightmode':
                        theme = 'light';
                        break;
                      case 'darkmode':
                        theme = 'dark';
                        break;
                      case 'darksidebar':
                        theme = 'semi-dark';
                        break;
                      case 'ColorLessIcons':
                        theme = 'colorless';
                        break;
                    }

                    applyTheme(theme);
                  });
                });

                // Aplicar tema inicial
                applyTheme(savedTheme);

                console.log('🎉 Theme Switcher inicializado completamente');
              }

              // Inicializar
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initThemeSwitcher);
              } else {
                initThemeSwitcher();
              }

              // También intentar después de un delay
              setTimeout(initThemeSwitcher, 500);
              setTimeout(initThemeSwitcher, 1000);
            })();
          `
        }} />
      </body>
    </html>
  );
}
