module.exports = [
"[project]/Downloads/mrpii 2/.next-internal/server/app/api/scada/production/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/fs/promises [external] (fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs/promises", () => require("fs/promises"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/Downloads/mrpii 2/src/app/api/scada/production/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/mrpii 2/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/fs/promises [external] (fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/path [external] (path, cjs)");
;
;
;
async function GET(request) {
    try {
        console.log('🔍 Buscando datos de producción...');
        // Simular datos de producción (en producción vendría de la BD)
        const productionData = await getProductionData();
        // Guardar datos en JSON para histórico
        await saveProductionData(productionData);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: productionData,
            summary: calculateSummary(productionData),
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('❌ Error al buscar datos de producción:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$mrpii__2$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Error al conectar con banco de datos',
            message: error instanceof Error ? error.message : 'Error desconocido',
            timestamp: new Date().toISOString()
        }, {
            status: 500
        });
    }
}
async function getProductionData() {
    // Simular datos de producción (reemplazar con consulta real a BD)
    const machines = [
        {
            id: 'DOBL01',
            name: 'Dobladora 01',
            baseOk: 8500,
            baseNok: 45,
            baseRw: 12
        },
        {
            id: 'DOBL02',
            name: 'Dobladora 02',
            baseOk: 9200,
            baseNok: 38,
            baseRw: 8
        },
        {
            id: 'SOLD01',
            name: 'Soldadura 01',
            baseOk: 7800,
            baseNok: 52,
            baseRw: 15
        },
        {
            id: 'SOLD02',
            name: 'Soldadura 02',
            baseOk: 8100,
            baseNok: 41,
            baseRw: 11
        },
        {
            id: 'TROQ01',
            name: 'Troqueladora 01',
            baseOk: 7600,
            baseNok: 35,
            baseRw: 9
        },
        {
            id: 'TERM01',
            name: 'Terminación 01',
            baseOk: 8900,
            baseNok: 47,
            baseRw: 13
        }
    ];
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    // Simular variación por minuto
    const minuteVariation = Math.sin((currentHour * 60 + currentMinute) / 100) * 100;
    return machines.map((machine)=>({
            machineId: machine.id,
            machineName: machine.name,
            ok: Math.floor(machine.baseOk + minuteVariation + Math.random() * 50),
            nok: Math.floor(machine.baseNok + Math.random() * 10),
            rw: Math.floor(machine.baseRw + Math.random() * 5),
            total: 0,
            efficiency: Math.round(85 + Math.random() * 15),
            timestamp: now.toISOString(),
            operator: `Operador ${Math.floor(Math.random() * 10) + 1}`,
            shift: currentHour < 14 ? 'Mañana' : currentHour < 22 ? 'Tarde' : 'Noche'
        }));
}
async function saveProductionData(data) {
    try {
        const dataDir = __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(process.cwd(), 'data', 'production');
        const fileName = `${new Date().toISOString().split('T')[0]}.json`;
        // Crear directorio si no existe
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].mkdir(dataDir, {
            recursive: true
        });
        // Leer datos existentes
        let existingData = [];
        try {
            const existingFile = await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].readFile(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, fileName), 'utf-8');
            existingData = JSON.parse(existingFile);
        } catch (error) {
        // El archivo no existe, se creará uno nuevo
        }
        // Agregar nuevos datos
        existingData.push(...data);
        // Guardar archivo
        await __TURBOPACK__imported__module__$5b$externals$5d2f$fs$2f$promises__$5b$external$5d$__$28$fs$2f$promises$2c$__cjs$29$__["default"].writeFile(__TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, fileName), JSON.stringify(existingData, null, 2), 'utf-8');
        console.log('💾 Datos de producción guardados en:', __TURBOPACK__imported__module__$5b$externals$5d2f$path__$5b$external$5d$__$28$path$2c$__cjs$29$__["default"].join(dataDir, fileName));
    } catch (error) {
        console.error('❌ Error al guardar datos de producción:', error);
    }
}
function calculateSummary(data) {
    const totalOk = data.reduce((sum, item)=>sum + item.ok, 0);
    const totalNok = data.reduce((sum, item)=>sum + item.nok, 0);
    const totalRw = data.reduce((sum, item)=>sum + item.rw, 0);
    const totalProduction = totalOk + totalNok + totalRw;
    const averageEfficiency = data.reduce((sum, item)=>sum + item.efficiency, 0) / data.length;
    // Actualizar totales en cada máquina
    data.forEach((item)=>{
        item.total = item.ok + item.nok + item.rw;
    });
    return {
        totalOk,
        totalNok,
        totalRw,
        totalProduction,
        averageEfficiency: Math.round(averageEfficiency * 100) / 100,
        machines: data,
        timestamp: new Date().toISOString()
    };
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__89914b2e._.js.map