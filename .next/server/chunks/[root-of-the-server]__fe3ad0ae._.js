module.exports=[18622,(e,r,a)=>{r.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},56704,(e,r,a)=>{r.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},70406,(e,r,a)=>{r.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},93695,(e,r,a)=>{r.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},61724,(e,r,a)=>{r.exports=e.x("next/dist/compiled/next-server/app-route-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-route-turbo.runtime.prod.js"))},32319,(e,r,a)=>{r.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},24725,(e,r,a)=>{r.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},20635,(e,r,a)=>{r.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},14747,(e,r,a)=>{r.exports=e.x("path",()=>require("path"))},24361,(e,r,a)=>{r.exports=e.x("util",()=>require("util"))},60526,(e,r,a)=>{r.exports=e.x("node:os",()=>require("node:os"))},12057,(e,r,a)=>{r.exports=e.x("node:util",()=>require("node:util"))},59639,(e,r,a)=>{r.exports=e.x("node:process",()=>require("node:process"))},12714,(e,r,a)=>{r.exports=e.x("node:fs/promises",()=>require("node:fs/promises"))},74533,(e,r,a)=>{r.exports=e.x("node:child_process",()=>require("node:child_process"))},57764,(e,r,a)=>{r.exports=e.x("node:url",()=>require("node:url"))},43492,e=>{"use strict";e.s(["calculateOEEForOF",()=>a,"calculateRemainingTime",()=>i,"generarAlertas",()=>t]);var r=e.i(50619);async function a(e,i,t=10){try{let a=`
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
      AND cm.Rt_Cod_of = '${i}'
      AND hp.fecha_fin >= DATEADD(DAY, -${t}, GETDATE())
      AND hp.id_actividad = 2 -- Producci\xf3n
      GROUP BY cm.Rt_Rendimientonominal1 -- Agrupar para agregar correctamente
    `,n=await (0,r.executeQuery)(a,void 0,"mapex");if(0===n.length||!n[0])return null;let s=n[0],o=Math.max(0,Math.min(100,s.disponibilidad||0)),d=Math.max(0,Math.min(100,s.rendimiento||0)),p=Math.max(0,Math.min(100,s.calidad||0));return{oee:Math.round(o*d*p/1e4),rendimiento:d,disponibilidad:o,calidad:p}}catch(e){return console.error("❌ Erro ao calcular OEE para OF:",e),null}}function i(e,r){if(r>0&&e>0){let a=e/r;return a>=24?`${Math.round(a/24)}d`:`${a.toFixed(1)}h`}return"N/A"}async function t(e){try{let r=await a(e,"",1),i=[];return r&&(r.oee<60?i.push({type:"danger",message:"OEE crítico: abaixo de 60%",value:r.oee}):r.oee<75&&i.push({type:"warning",message:"OEE baixo: abaixo de 75%",value:r.oee}),r.disponibilidad<80&&i.push({type:"warning",message:"Disponibilidade baixa",value:r.disponibilidad}),r.calidad<95&&i.push({type:"warning",message:"Qualidade baixa",value:r.calidad})),i}catch(e){return console.error("Erro ao gerar alertas:",e),[]}}},13200,(e,r,a)=>{},95942,e=>{e.v(r=>Promise.all(["server/chunks/[root-of-the-server]__22f27768._.js"].map(r=>e.l(r))).then(()=>r(64673)))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__fe3ad0ae._.js.map