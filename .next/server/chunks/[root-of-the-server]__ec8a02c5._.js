module.exports=[18622,(o,e,r)=>{e.exports=o.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(o,e,r)=>{e.exports=o.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},70406,(o,e,r)=>{e.exports=o.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(o,e,r)=>{e.exports=o.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},61724,(o,e,r)=>{e.exports=o.x("next/dist/compiled/next-server/app-route-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-route-turbo.runtime.prod.js"))},32319,(o,e,r)=>{e.exports=o.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(o,e,r)=>{e.exports=o.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},20635,(o,e,r)=>{e.exports=o.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},14747,(o,e,r)=>{e.exports=o.x("path",()=>require("path"))},24361,(o,e,r)=>{e.exports=o.x("util",()=>require("util"))},60526,(o,e,r)=>{e.exports=o.x("node:os",()=>require("node:os"))},12057,(o,e,r)=>{e.exports=o.x("node:util",()=>require("node:util"))},59639,(o,e,r)=>{e.exports=o.x("node:process",()=>require("node:process"))},12714,(o,e,r)=>{e.exports=o.x("node:fs/promises",()=>require("node:fs/promises"))},74533,(o,e,r)=>{e.exports=o.x("node:child_process",()=>require("node:child_process"))},57764,(o,e,r)=>{e.exports=o.x("node:url",()=>require("node:url"))},37591,o=>{"use strict";o.s(["GET",()=>c,"POST",()=>n,"getAllProductCosts",()=>s,"getProductCost",()=>t]);var e=o.i(12415),r=o.i(50619);async function t(o){try{let e=`
      SELECT TOP 1
        cp.cod_producto,
        0 as costo_default -- Por defecto
      FROM cfg_producto cp
      WHERE cp.cod_producto = @cod_producto
        AND cp.activo = 1
    `,t=await (0,r.executeQuery)(e,{cod_producto:o});return t&&0!==t.length||console.warn(`⚠️ Producto ${o} no encontrado, usando costo por defecto €0`),0}catch(e){return console.error(`❌ Error obteniendo costo para ${o}:`,e),0}}async function s(){try{console.log("💰 Obteniendo todos los costos de productos");let o=`
      SELECT DISTINCT
        cp.cod_producto,
        0 as costo_default -- Por defecto
      FROM cfg_producto cp
      WHERE cp.activo = 1
        AND cp.cod_producto IS NOT NULL
        AND cp.cod_producto != ''
        AND cp.cod_producto != '--'
        AND cp.cod_producto != '{0}'
    `,e=await (0,r.executeQuery)(o),t={};return e&&e.length>0&&e.forEach(o=>{t[o.cod_producto]=o.costo_default}),console.log(`💰 Costos obtenidos para ${Object.keys(t).length} productos`),t}catch(o){return console.error("❌ Error obteniendo todos los costos:",o),{}}}async function c(o){try{console.log("⚙️ Obteniendo configuración de costos");let o=`
      SELECT DISTINCT
        cp.cod_producto,
        cp.desc_producto,
        cm.Cod_maquina,
        cm.desc_maquina,
        0 as costo_unitario_default -- Sin productos = costo cero
      FROM cfg_producto cp
      LEFT JOIN cfg_maquina cm ON cp.cod_producto = cm.rt_Cod_producto
      WHERE cp.activo = 1
        AND cp.cod_producto IS NOT NULL
        AND cp.cod_producto != ''
        AND cp.cod_producto != '--'
        AND cp.cod_producto != '{0}'
      ORDER BY cp.cod_producto, cm.Cod_maquina
    `,t=await (0,r.executeQuery)(o),s={};return t.forEach(o=>{let e=o.cod_producto;s[e]||(s[e]={cod_producto:o.cod_producto,desc_producto:o.desc_producto,costo_unitario:o.costo_unitario_default,maquinas:[],nota:"Costo configurado manualmente (no viene de MAPEX)"}),o.Cod_maquina&&s[e].maquinas.push({cod_maquina:o.Cod_maquina,desc_maquina:o.desc_maquina})}),console.log("⚙️ Configuración de costos obtenida:",Object.keys(s).length,"productos"),e.NextResponse.json({success:!0,data:s,timestamp:new Date().toISOString(),nota:"Costos por defecto: €0. Configure valores reales usando POST"})}catch(o){return console.error("❌ Error obteniendo configuración de costos:",o),e.NextResponse.json({success:!1,error:"Error al obtener configuración de costos",details:o instanceof Error?o.message:"Error desconocido",timestamp:new Date().toISOString()},{status:500})}}async function n(o){try{console.log("💾 Configurando costo personalizado");let{cod_producto:t,costo_unitario:s,maquina_id:c}=await o.json();if(!t||void 0===s)return e.NextResponse.json({success:!1,error:"Faltan parámetros requeridos: cod_producto y costo_unitario",timestamp:new Date().toISOString()},{status:400});let n=`
      SELECT cod_producto, desc_producto
      FROM cfg_producto
      WHERE cod_producto = @cod_producto
        AND activo = 1
    `,a=await (0,r.executeQuery)(n,{cod_producto:t});if(!a||0===a.length)return e.NextResponse.json({success:!1,error:`Producto ${t} no encontrado en MAPEX`,timestamp:new Date().toISOString()},{status:404});return console.log("💾 Costo configurado:",{cod_producto:t,costo_unitario:s,maquina_id:c,producto:a[0].desc_producto}),e.NextResponse.json({success:!0,message:`Costo de €${s} configurado para producto ${t}`,data:{cod_producto:t,costo_unitario:parseFloat(s),maquina_id:c,producto_descripcion:a[0].desc_producto},timestamp:new Date().toISOString()})}catch(o){return console.error("❌ Error configurando costo:",o),e.NextResponse.json({success:!1,error:"Error al configurar costo",details:o instanceof Error?o.message:"Error desconocido",timestamp:new Date().toISOString()},{status:500})}}},76262,(o,e,r)=>{},95942,o=>{o.v(e=>Promise.all(["server/chunks/[root-of-the-server]__22f27768._.js"].map(e=>o.l(e))).then(()=>e(64673)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__ec8a02c5._.js.map