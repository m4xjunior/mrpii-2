# 🎨 Theme Customizer - SCADA MRPII

## 📋 Descripción

El Theme Customizer es una funcionalidad que permite cambiar dinámicamente la apariencia de la aplicación SCADA MRPII, similar al sistema implementado en el sitio vertical. Ofrece 4 opciones de tema diferentes y guarda la preferencia del usuario.

## 🚀 Funcionalidades

### **Opciones de Tema Disponibles:**

1. **☀️ Tema Claro** (por defecto)
   - Fondo blanco
   - Textos oscuros
   - Iconos con colores originales

2. **🌙 Tema Oscuro**
   - Fondo oscuro (#1a1a1a)
   - Textos blancos
   - Cards con fondo #2d2d2d

3. **🌓 Barra Lateral Oscura**
   - Solo la sidebar con fondo oscuro
   - Contenido principal mantiene tema claro

4. **🎨 Iconos sin Color**
   - Iconos en escala de grises
   - Minimalista y profesional

## 🛠️ Implementación Técnica

### **Archivos Modificados:**

1. **`/src/app/layout.tsx`**
   - Script global para manejo de temas
   - Persistencia en localStorage
   - Eventos personalizados para React

2. **`/src/app/page.tsx`**
   - Hook `useThemeSwitcher` para estado React
   - Theme Customizer UI en todos los componentes

3. **`/src/app/globals.css`**
   - Estilos CSS para cada tema
   - Botón flotante con animación
   - Responsive design

4. **Componentes individuales:**
   - FinancialDashboard.tsx
   - HistoricalCharts.tsx
   - MachineDetailModal.tsx

### **Estructura del Sistema:**

```
🎯 Botón Flotante (⚙️)
    ↓
📱 Panel Offcanvas
    ↓
🔘 Radio Buttons (4 opciones)
    ↓
💾 localStorage (persistencia)
    ↓
🎨 Aplicación Visual
    ↓
⚛️ Estado React (sincronización)
```

## 🎮 Cómo Usar

### **1. Acceder al Customizer:**
- Busca el botón **⚙️** en la esquina inferior derecha
- Haz clic para abrir el panel

### **2. Seleccionar Tema:**
- **Tema Claro:** `Claro` (por defecto)
- **Tema Oscuro:** `Oscuro`
- **Barra Oscura:** `Barra Lateral Oscura`
- **Sin Color:** `Iconos sin Color`

### **3. Aplicación Inmediata:**
- Los cambios se aplican **instantáneamente**
- El tema se **guarda automáticamente**
- **Persiste** entre sesiones

## 🔧 Configuración Técnica

### **CSS Classes Aplicadas:**

```css
/* Tema Oscuro */
.dark-theme {
  --background: #1a1a1a;
  --foreground: #ffffff;
}

/* Barra Lateral Oscura */
.semi-dark-theme .sidebar-wrapper {
  background-color: #2d2d2d;
  color: white;
}

/* Iconos sin Color */
.colorless-icons .parent-icon i {
  color: #6c757d !important;
}
```

### **JavaScript API:**

```javascript
// Aplicar tema manualmente
applyTheme('dark'); // oscuro
applyTheme('light'); // claro
applyTheme('semi-dark'); // barra oscura
applyTheme('colorless'); // sin color

// Escuchar cambios de tema
document.addEventListener('themeChange', (e) => {
  console.log('Tema cambiado a:', e.detail.theme);
});
```

## 📱 Características Responsive

- ✅ **Botón adaptativo** (50px → 45px en móvil)
- ✅ **Panel responsive** (300px → 280px en móvil)
- ✅ **Textos adaptativos** en diferentes pantallas

## 🐛 Debugging

### **Consola del Navegador:**

```
🔧 Inicializando Theme Switcher...
📻 Radio buttons encontrados: 4
💾 Tema guardado: light
✅ Radio button seleccionado: lightmode
🎉 Theme Switcher inicializado completamente
```

### **Comandos de Debug:**

```javascript
// Ver tema actual
console.log(localStorage.getItem('scada-theme'));

// Cambiar tema manualmente
localStorage.setItem('scada-theme', 'dark');

// Recargar página para aplicar
location.reload();
```

## 🎯 Integración con Componentes

### **React Components:**

```jsx
// En cualquier componente
const { currentTheme } = useThemeSwitcher();

useEffect(() => {
  console.log('Tema actual:', currentTheme);
}, [currentTheme]);
```

### **Componentes Disponibles:**

- ✅ **Dashboard Principal** - Botón flotante y panel
- ✅ **Financial Dashboard** - Customizer integrado
- ✅ **Historical Charts** - Customizer integrado
- ✅ **Machine Detail Modal** - Customizer integrado

## 🔄 Persistencia

- ✅ **localStorage** automático
- ✅ **Carga inicial** del tema guardado
- ✅ **Selección** del radio button correcto
- ✅ **Sincronización** entre componentes

## 📊 Compatibilidad

- ✅ **Bootstrap 5** - Offcanvas y componentes
- ✅ **Next.js 14** - App Router compatible
- ✅ **TypeScript** - Totalmente tipado
- ✅ **Responsive** - Móvil y desktop

## 🚀 Próximos Pasos

- [ ] **Más temas personalizados**
- [ ] **Animaciones de transición**
- [ ] **Configuración por usuario**
- [ ] **Temas por horario (auto dark mode)**

---

## 💡 Consejos de Uso

1. **Primera vez:** El tema por defecto es "Claro"
2. **Prueba todos:** Cada tema tiene características únicas
3. **Persistencia:** El tema se mantiene entre sesiones
4. **Responsive:** Funciona perfectamente en móvil
5. **Debug:** Revisa la consola para troubleshooting

## 🐛 Solución de Problemas

### **El botón no aparece:**
- Verifica que el CSS esté cargado
- Revisa la consola por errores

### **Los temas no cambian:**
- Limpia el localStorage
- Recarga la página
- Verifica permisos del navegador

### **Problemas en móvil:**
- Los elementos son más pequeños pero funcionales
- Usa el modo landscape para mejor experiencia

---

**🎉 ¡El Theme Customizer está completamente funcional y listo para usar!**
