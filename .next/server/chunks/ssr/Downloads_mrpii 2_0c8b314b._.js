module.exports=[17812,a=>{"use strict";a.s(["ThemeProvider",()=>c,"useTheme",()=>d]);var b=a.i(22020);let c=(0,b.registerClientReference)(function(){throw Error("Attempted to call ThemeProvider() from the server but ThemeProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/Downloads/mrpii 2/hooks/useTheme.tsx <module evaluation>","ThemeProvider"),d=(0,b.registerClientReference)(function(){throw Error("Attempted to call useTheme() from the server but useTheme is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/Downloads/mrpii 2/hooks/useTheme.tsx <module evaluation>","useTheme")},91996,a=>{"use strict";a.s(["ThemeProvider",()=>c,"useTheme",()=>d]);var b=a.i(22020);let c=(0,b.registerClientReference)(function(){throw Error("Attempted to call ThemeProvider() from the server but ThemeProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/Downloads/mrpii 2/hooks/useTheme.tsx","ThemeProvider"),d=(0,b.registerClientReference)(function(){throw Error("Attempted to call useTheme() from the server but useTheme is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"[project]/Downloads/mrpii 2/hooks/useTheme.tsx","useTheme")},81982,a=>{"use strict";a.i(17812);var b=a.i(91996);a.n(b)},75114,a=>{"use strict";a.s(["default",()=>e,"metadata",()=>d]);var b=a.i(95775),c=a.i(81982);let d={title:"SCADA - Sistema MRPII",description:"Sistema de monitoramento industrial SCADA baseado no MRPII"};function e({children:a}){return(0,b.jsxs)("html",{lang:"pt-BR",children:[(0,b.jsxs)("head",{children:[(0,b.jsx)("link",{rel:"icon",href:"/assets/images/favicon-32x32.png",type:"image/png"}),(0,b.jsx)("link",{href:"/assets/plugins/vectormap/jquery-jvectormap-2.0.2.css",rel:"stylesheet"}),(0,b.jsx)("link",{href:"/assets/plugins/simplebar/css/simplebar.css",rel:"stylesheet"}),(0,b.jsx)("link",{href:"/assets/plugins/perfect-scrollbar/css/perfect-scrollbar.css",rel:"stylesheet"}),(0,b.jsx)("link",{href:"/assets/plugins/metismenu/css/metisMenu.min.css",rel:"stylesheet"}),(0,b.jsx)("link",{href:"/assets/css/pace.min.css",rel:"stylesheet"}),(0,b.jsx)("link",{rel:"stylesheet",href:"/assets/css/bootstrap.min.css"}),(0,b.jsx)("link",{rel:"stylesheet",href:"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600&family=Roboto&display=swap"}),(0,b.jsx)("link",{rel:"stylesheet",href:"/assets/css/icons.css"}),(0,b.jsx)("link",{rel:"stylesheet",href:"/assets/css/app.css"}),(0,b.jsx)("link",{rel:"stylesheet",href:"/assets/css/dark-sidebar.css"}),(0,b.jsx)("link",{rel:"stylesheet",href:"/assets/css/dark-theme.css"}),(0,b.jsx)("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"})]}),(0,b.jsxs)("body",{children:[(0,b.jsx)(c.ThemeProvider,{children:a}),(0,b.jsx)("script",{src:"https://code.jquery.com/jquery-3.6.0.min.js"}),(0,b.jsx)("script",{src:"/assets/js/bootstrap.bundle.min.js"}),(0,b.jsx)("script",{src:"/assets/plugins/simplebar/js/simplebar.min.js"}),(0,b.jsx)("script",{src:"/assets/plugins/metismenu/js/metisMenu.min.js"}),(0,b.jsx)("script",{src:"/assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js"}),(0,b.jsx)("script",{src:"/assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js"}),(0,b.jsx)("script",{src:"/assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js"}),(0,b.jsx)("script",{src:"/assets/plugins/vectormap/jquery-jvectormap-in-mill.js"}),(0,b.jsx)("script",{src:"/assets/plugins/vectormap/jquery-jvectormap-us-aea-en.js"}),(0,b.jsx)("script",{src:"/assets/plugins/vectormap/jquery-jvectormap-uk-mill-en.js"}),(0,b.jsx)("script",{src:"/assets/plugins/vectormap/jquery-jvectormap-au-mill.js"}),(0,b.jsx)("script",{src:"/assets/plugins/apexcharts-bundle/js/apexcharts.min.js"}),(0,b.jsx)("script",{src:"/assets/js/index2.js"}),(0,b.jsx)("script",{src:"/assets/js/app.js"}),(0,b.jsx)("script",{dangerouslySetInnerHTML:{__html:`
            (function() {
              'use strict';

              // Funci\xf3n para aplicar tema
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

              // Inicializar cuando el DOM est\xe9 listo
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

              // Tambi\xe9n intentar despu\xe9s de un delay
              setTimeout(initThemeSwitcher, 500);
              setTimeout(initThemeSwitcher, 1000);
            })();
          `}})]})]})}}];

//# sourceMappingURL=Downloads_mrpii%202_0c8b314b._.js.map