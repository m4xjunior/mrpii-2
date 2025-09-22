module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/Downloads/mrpii 2/hooks/useTheme.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider,
    "useTheme",
    ()=>useTheme
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
'use client';
;
;
const ThemeContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useTheme = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
const ThemeProvider = ({ children })=>{
    const [theme, setThemeState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('auto');
    const [actualTheme, setActualTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('light');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load theme from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedTheme = localStorage.getItem('app-theme');
        if (savedTheme && [
            'light',
            'dark',
            'auto'
        ].includes(savedTheme)) {
            setThemeState(savedTheme);
        }
        setMounted(true);
    }, []);
    // Update actual theme based on preference and system preference
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mounted) return;
        const updateActualTheme = ()=>{
            if (theme === 'auto') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setActualTheme(prefersDark ? 'dark' : 'light');
            } else {
                setActualTheme(theme);
            }
        };
        updateActualTheme();
        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', updateActualTheme);
        return ()=>mediaQuery.removeEventListener('change', updateActualTheme);
    }, [
        theme,
        mounted
    ]);
    // Apply theme to document
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!mounted) return;
        document.documentElement.setAttribute('data-theme', actualTheme);
        document.documentElement.classList.toggle('dark', actualTheme === 'dark');
        // Update CSS custom properties
        const root = document.documentElement;
        if (actualTheme === 'dark') {
            root.style.setProperty('--bg-primary', '#1a1a1a');
            root.style.setProperty('--bg-secondary', '#2d2d2d');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#a0a0a0');
            root.style.setProperty('--border-color', '#404040');
        } else {
            root.style.setProperty('--bg-primary', '#ffffff');
            root.style.setProperty('--bg-secondary', '#f8f9fa');
            root.style.setProperty('--text-primary', '#212529');
            root.style.setProperty('--text-secondary', '#6c757d');
            root.style.setProperty('--border-color', '#dee2e6');
        }
    }, [
        actualTheme,
        mounted
    ]);
    const setTheme = (newTheme)=>{
        setThemeState(newTheme);
        localStorage.setItem('app-theme', newTheme);
    };
    const isDark = actualTheme === 'dark';
    const themeColors = {
        primary: isDark ? '#667eea' : '#5a67d8',
        secondary: isDark ? '#764ba2' : '#6b46c1',
        background: isDark ? '#1a1a1a' : '#ffffff',
        surface: isDark ? '#2d2d2d' : '#f8f9fa',
        text: isDark ? '#ffffff' : '#212529',
        textSecondary: isDark ? '#a0a0a0' : '#6c757d',
        border: isDark ? '#404040' : '#dee2e6',
        shadow: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.08)',
        success: isDark ? '#48bb78' : '#38a169',
        warning: isDark ? '#ed8936' : '#d69e2e',
        error: isDark ? '#f56565' : '#e53e3e',
        info: isDark ? '#4299e1' : '#3182ce'
    };
    if (!mounted) {
        // Return a default light theme during SSR
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
            value: {
                theme: 'light',
                actualTheme: 'light',
                setTheme: ()=>{},
                isDark: false,
                themeColors: {
                    primary: '#5a67d8',
                    secondary: '#6b46c1',
                    background: '#ffffff',
                    surface: '#f8f9fa',
                    text: '#212529',
                    textSecondary: '#6c757d',
                    border: '#dee2e6',
                    shadow: 'rgba(0,0,0,0.08)',
                    success: '#38a169',
                    warning: '#d69e2e',
                    error: '#e53e3e',
                    info: '#3182ce'
                }
            },
            children: children
        }, void 0, false, {
            fileName: "[project]/Downloads/mrpii 2/hooks/useTheme.tsx",
            lineNumber: 127,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ThemeContext.Provider, {
        value: {
            theme,
            actualTheme,
            setTheme,
            isDark,
            themeColors
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/Downloads/mrpii 2/hooks/useTheme.tsx",
        lineNumber: 155,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/Downloads/mrpii 2/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/Downloads/mrpii 2/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Downloads/mrpii 2/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__56c8f786._.js.map