module.exports=[18622,(e,o,r)=>{o.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,o,r)=>{o.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},70406,(e,o,r)=>{o.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,o,r)=>{o.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},61724,(e,o,r)=>{o.exports=e.x("next/dist/compiled/next-server/app-route-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-route-turbo.runtime.prod.js"))},32319,(e,o,r)=>{o.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,o,r)=>{o.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},20635,(e,o,r)=>{o.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},14747,(e,o,r)=>{o.exports=e.x("path",()=>require("path"))},24361,(e,o,r)=>{o.exports=e.x("util",()=>require("util"))},60526,(e,o,r)=>{o.exports=e.x("node:os",()=>require("node:os"))},12057,(e,o,r)=>{o.exports=e.x("node:util",()=>require("node:util"))},59639,(e,o,r)=>{o.exports=e.x("node:process",()=>require("node:process"))},12714,(e,o,r)=>{o.exports=e.x("node:fs/promises",()=>require("node:fs/promises"))},74533,(e,o,r)=>{o.exports=e.x("node:child_process",()=>require("node:child_process"))},57764,(e,o,r)=>{o.exports=e.x("node:url",()=>require("node:url"))},37591,e=>{"use strict";e.s(["GET",()=>s,"POST",()=>n,"getAllProductCosts",()=>a,"getProductCost",()=>t]);var o=e.i(12415),r=e.i(50619);async function t(e){try{let o=`
      SELECT TOP 1
        cp.cod_producto,
        0 as costo_default -- Por defecto
      FROM cfg_producto cp
      WHERE cp.cod_producto = @cod_producto
        AND cp.activo = 1
    `,t=await (0,r.executeQuery)(o,{cod_producto:e});return t&&0!==t.length||console.warn(`⚠️ Producto ${e} no encontrado, usando costo por defecto €0`),0}catch(o){return console.error(`❌ Error obteniendo costo para ${e}:`,o),0}}async function a(){try{console.log("💰 Obteniendo todos los costos de productos");let e=`
      SELECT DISTINCT
        cp.cod_producto,
        0 as costo_default -- Por defecto
      FROM cfg_producto cp
      WHERE cp.activo = 1
        AND cp.cod_producto IS NOT NULL
        AND cp.cod_producto != ''
        AND cp.cod_producto != '--'
        AND cp.cod_producto != '{0}'
    `,o=await (0,r.executeQuery)(e),t={};return o&&o.length>0&&o.forEach(e=>{t[e.cod_producto]=e.costo_default}),console.log(`💰 Costos obtenidos para ${Object.keys(t).length} productos`),t}catch(e){return console.error("❌ Error obteniendo todos los costos:",e),{}}}async function s(e){try{console.log("⚙️ Obteniendo configuración de costos");let e=`
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
    `,t=await (0,r.executeQuery)(e),a={};return t.forEach(e=>{let o=e.cod_producto;a[o]||(a[o]={cod_producto:e.cod_producto,desc_producto:e.desc_producto,costo_unitario:e.costo_unitario_default,maquinas:[],nota:"Costo configurado manualmente (no viene de MAPEX)"}),e.Cod_maquina&&a[o].maquinas.push({cod_maquina:e.Cod_maquina,desc_maquina:e.desc_maquina})}),console.log("⚙️ Configuración de costos obtenida:",Object.keys(a).length,"productos"),o.NextResponse.json({success:!0,data:a,timestamp:new Date().toISOString(),nota:"Costos por defecto: €0. Configure valores reales usando POST"})}catch(e){return console.error("❌ Error obteniendo configuración de costos:",e),o.NextResponse.json({success:!1,error:"Error al obtener configuración de costos",details:e instanceof Error?e.message:"Error desconocido",timestamp:new Date().toISOString()},{status:500})}}async function n(e){try{console.log("💾 Configurando costo personalizado");let{cod_producto:t,costo_unitario:a,maquina_id:s}=await e.json();if(!t||void 0===a)return o.NextResponse.json({success:!1,error:"Faltan parámetros requeridos: cod_producto y costo_unitario",timestamp:new Date().toISOString()},{status:400});let n=`
      SELECT cod_producto, desc_producto
      FROM cfg_producto
      WHERE cod_producto = @cod_producto
        AND activo = 1
    `,c=await (0,r.executeQuery)(n,{cod_producto:t});if(!c||0===c.length)return o.NextResponse.json({success:!1,error:`Producto ${t} no encontrado en MAPEX`,timestamp:new Date().toISOString()},{status:404});return console.log("💾 Costo configurado:",{cod_producto:t,costo_unitario:a,maquina_id:s,producto:c[0].desc_producto}),o.NextResponse.json({success:!0,message:`Costo de €${a} configurado para producto ${t}`,data:{cod_producto:t,costo_unitario:parseFloat(a),maquina_id:s,producto_descripcion:c[0].desc_producto},timestamp:new Date().toISOString()})}catch(e){return console.error("❌ Error configurando costo:",e),o.NextResponse.json({success:!1,error:"Error al configurar costo",details:e instanceof Error?e.message:"Error desconocido",timestamp:new Date().toISOString()},{status:500})}}},43492,e=>{"use strict";e.s(["calculateOEEForOF",()=>r,"calculateRemainingTime",()=>t,"generarAlertas",()=>a]);var o=e.i(50619);async function r(e,t,a=10){try{let r=`
      SELECT
        -- Disponibilidad: tiempo disponible vs tiempo total
        CASE
          WHEN SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) > 0 THEN
            ROUND(
              (SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) -
               ISNULL(SUM(CASE WHEN hp.id_actividad = 3 THEN CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT) ELSE 0 END), 0)
              ) * 100.0 /
              SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)), 2
            )
          ELSE 0
        END as disponibilidad,

        -- Rendimiento: unidades producidas vs velocidad nominal
        CASE
          WHEN cm.Rt_Rendimientonominal1 > 0 AND SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) > 0 THEN
            ROUND(
              (SUM(hp.unidades_ok + hp.unidades_nok) * 3600.0) /
              (cm.Rt_Rendimientonominal1 * (SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) / 3600.0)), 2
            )
          ELSE 0
        END as rendimiento,

        -- Calidad: unidades OK vs total producidas
        CASE
          WHEN SUM(hp.unidades_ok + hp.unidades_nok) > 0 THEN
            ROUND((SUM(hp.unidades_ok) * 100.0) / SUM(hp.unidades_ok + hp.unidades_nok), 2)
          ELSE 0
        END as calidad

      FROM cfg_maquina cm
      LEFT JOIN his_fase hf ON cm.rt_id_his_fase = hf.id_his_fase
      LEFT JOIN his_prod hp ON hf.id_his_fase = hp.id_his_fase
      WHERE cm.Cod_maquina = '${e}'
      AND cm.Rt_Cod_of = '${t}'
      AND hp.fecha_fin >= DATEADD(DAY, -${a}, GETDATE())
      AND hp.id_actividad = 2 -- Producci\xf3n
      GROUP BY cm.Rt_Rendimientonominal1 -- Agrupar para agregar correctamente
    `,s=await (0,o.executeQuery)(r,void 0,"mapex");if(0===s.length||!s[0])return null;let n=s[0],c=Math.max(0,Math.min(100,n.disponibilidad||0)),i=Math.max(0,Math.min(100,n.rendimiento||0)),d=Math.max(0,Math.min(100,n.calidad||0));return{oee:Math.round(c*i*d/1e4),rendimiento:i,disponibilidad:c,calidad:d}}catch(e){return console.error("❌ Erro ao calcular OEE para OF:",e),null}}function t(e,o){if(o>0&&e>0){let r=e/o;return r>=24?`${Math.round(r/24)}d`:`${r.toFixed(1)}h`}return"N/A"}async function a(e){try{let o=await r(e,"",1),t=[];return o&&(o.oee<60?t.push({type:"danger",message:"OEE crítico: abaixo de 60%",value:o.oee}):o.oee<75&&t.push({type:"warning",message:"OEE baixo: abaixo de 75%",value:o.oee}),o.disponibilidad<80&&t.push({type:"warning",message:"Disponibilidade baixa",value:o.disponibilidad}),o.calidad<95&&t.push({type:"warning",message:"Qualidade baixa",value:o.calidad})),t}catch(e){return console.error("Erro ao gerar alertas:",e),[]}}},98970,(e,o,r)=>{},95942,e=>{e.v(o=>Promise.all(["server/chunks/[root-of-the-server]__22f27768._.js"].map(o=>e.l(o))).then(()=>o(64673)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__c3e7e974._.js.map