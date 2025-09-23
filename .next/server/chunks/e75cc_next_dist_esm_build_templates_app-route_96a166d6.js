module.exports=[90597,e=>{"use strict";e.s(["handler",()=>M,"patchFetch",()=>k,"routeModule",()=>g,"serverHooks",()=>q,"workAsyncStorage",()=>y,"workUnitAsyncStorage",()=>x],90597);var a=e.i(74353),t=e.i(19310),o=e.i(20050),i=e.i(32930),r=e.i(49260),n=e.i(25482),s=e.i(36688),d=e.i(23026),c=e.i(1251),p=e.i(6621),_=e.i(93265),u=e.i(72116),h=e.i(61195),l=e.i(99119),f=e.i(93695);e.i(4079);var E=e.i(55985);e.s(["POST",()=>O],12326);var m=e.i(12415),R=e.i(50619),N=e.i(43492);async function O(e){try{let a,{machineId:t,tab:o}=await e.json();if(!t||!o)return m.NextResponse.json({success:!1,error:"Parâmetros machineId e tab são obrigatórios"},{status:400});switch(o){case"of":a=await v(t);break;case"paros":a=await C(t);break;case"produccion":a=await T(t);break;case"oee":a=await D(t);break;case"pedidos":a=await A(t);break;case"historico":a=await S(t);break;case"ventas":a=await w(t);break;default:return m.NextResponse.json({success:!1,error:"Tab não válida"},{status:400})}return m.NextResponse.json({success:!0,data:a,tab:o,machineId:t,timestamp:new Date().toISOString()})}catch(e){return console.error("❌ Erro ao buscar detalhes da máquina:",e),m.NextResponse.json({success:!1,error:"Erro interno do servidor",message:e instanceof Error?e.message:"Erro desconhecido"},{status:500})}}async function v(e){try{let a=`
      SELECT
        cm.Rt_Cod_of, cm.rt_Cod_producto, cm.Rt_Desc_producto,
        cm.Rt_Unidades_planning, cm.rt_dia_productivo, cm.rt_desc_turno,
        cm.Rt_Unidades_ok_of as Unidades_ok, cm.Rt_Unidades_nok_of as Rt_Unidades_nok, cm.Rt_Unidades_repro_of as Unidades_rw,
        cm.f_velocidad, cm.rt_id_his_fase, cm.rt_Desc_operario,
        ho.fecha_ini, ho.fecha_fin as fecha_fin_prevista, ho.id_his_of
      FROM cfg_maquina cm
      LEFT JOIN his_of ho ON cm.Rt_Cod_of = ho.cod_of
      WHERE cm.Cod_maquina = '${e}'
    `,t=await (0,R.executeQuery)(a,void 0,"mapex");if(0===t.length)return null;let o=t[0],i=o.Rt_Cod_of,r=o.id_his_of,n=null;try{n=await (0,N.calculateOEEForOF)(e,i)}catch(e){console.warn("⚠️ Erro ao calcular OEE para OF:",e)}let s=null;if(r){let e=`
        SELECT
          SUM(hp.unidades_ok) as total_ok,
          SUM(hp.unidades_nok) as total_nok,
          SUM(hp.unidades_repro) as total_rw,
          SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) as tiempo_produccion_segundos,
          MIN(hp.fecha_ini) as fecha_inicio_real,
          MAX(hp.fecha_fin) as fecha_fin_real
        FROM his_prod hp
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${r}'
        AND hp.id_actividad = 2
      `;s=(await (0,R.executeQuery)(e,void 0,"mapex"))[0]||null}let d=null;if(r){let e=`
        SELECT
          SUM(CAST(DATEDIFF(SECOND, hpp.fecha_ini, hpp.fecha_fin) AS BIGINT)) as tiempo_paros_segundos,
          COUNT(DISTINCT hpp.Id_operario) as num_operarios
        FROM his_prod hp
        INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${r}'
      `;d=(await (0,R.executeQuery)(e,void 0,"mapex"))[0]||null}let c=[];if(r){let e=`
        SELECT
          cp.desc_paro,
          SUM(CAST(DATEDIFF(SECOND, hpp.fecha_ini, hpp.fecha_fin) AS BIGINT)) as tiempo_segundos
        FROM his_prod hp
        INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
        INNER JOIN cfg_paro cp ON hpp.id_paro = cp.id_paro
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${r}'
        GROUP BY cp.desc_paro
        ORDER BY tiempo_segundos DESC
      `;c=await (0,R.executeQuery)(e,void 0,"mapex")}let p=[];if(r){let a=`
        SELECT
          cm.rt_desc_turno as turno,
          CONVERT(VARCHAR(10), hp.fecha_fin, 111) as fecha,
          SUM(hp.unidades_ok) as unidades_ok,
          SUM(hp.unidades_nok) as unidades_nok,
          SUM(hp.unidades_repro) as unidades_rw
        FROM his_prod hp
        INNER JOIN cfg_maquina cm ON hp.Id_maquina = cm.id_maquina
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${r}'
        AND cm.Cod_maquina = '${e}'
        GROUP BY cm.rt_desc_turno, CONVERT(VARCHAR(10), hp.fecha_fin, 111)
        ORDER BY fecha, turno
      `;p=await (0,R.executeQuery)(a,void 0,"mapex")}let _=s?(s.total_ok||0)+(s.total_nok||0)+(s.total_rw||0):(o.Unidades_ok||0)+(o.Rt_Unidades_nok||0)+(o.Unidades_rw||0),u=o.Rt_Unidades_planning>0?Math.round(_/o.Rt_Unidades_planning*1e4)/100:0,h=o.Rt_Unidades_planning-_,l=(0,N.calculateRemainingTime)(h,o.f_velocidad||0),f=_>0?Math.round((o.Rt_Unidades_nok||0)/_*1e4)/100:0;return{...o,cod_of:i,id_his_of:r,total_produced:_,avance_porcentaje:u,remaining_pieces:h,remaining_time:l,desviacion_porcentaje:f,oee_data:n,produccion_data:s,paros_data:d,principales_paros:c,produccion_turno:p,status:{avance_class:u>=90?"success":u>=70?"warning":"danger",tiempo_class:h>0&&o.f_velocidad>0?h/o.f_velocidad>24?"warning":"success":"info",desviacion_class:f>5?"danger":"success"}}}catch(e){return console.error("❌ Erro ao obter dados OF:",e),null}}async function C(e){try{let a=`SELECT Rt_Cod_of FROM cfg_maquina WHERE Cod_maquina = '${e}'`,t=await (0,R.executeQuery)(a,void 0,"mapex"),o=t[0]?.Rt_Cod_of||"",i=await (0,R.executeQuery)("SELECT DISTINCT id_paro, desc_paro FROM cfg_paro ORDER BY desc_paro",void 0,"mapex"),r=`
      SELECT DISTINCT substring(hof.cod_of, 1, 15) as cod_of, hof.fecha_ini
      FROM his_prod hp
      INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
      INNER JOIN his_of hof ON hf.id_his_of = hof.id_his_of
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${e}'
      AND hof.fecha_ini >= DATEADD(day, -7, GETDATE())
      ORDER BY hof.fecha_ini DESC
    `,n=await (0,R.executeQuery)(r,void 0,"mapex"),s=`
      SELECT
        hpp.fecha_ini,
        hpp.fecha_fin,
        DATEDIFF(MINUTE, hpp.fecha_ini, hpp.fecha_fin) as duracion_minutos,
        cp.id_paro,
        cp.desc_paro,
        substring(hof.cod_of, 1, 15) as cod_of,
        hpp.Id_operario,
        COALESCE(hpo.observaciones, '') as observaciones
      FROM his_prod hp
      INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
      INNER JOIN cfg_paro cp ON hpp.id_paro = cp.id_paro
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
      INNER JOIN his_of hof ON hf.id_his_of = hof.id_his_of
      LEFT JOIN his_paro_obs hpo ON hpo.his_paro = hpp.his_paro
      WHERE cm.Cod_maquina = '${e}'
      AND hpp.fecha_ini >= DATEADD(day, -30, GETDATE())
      ORDER BY hpp.fecha_ini DESC
    `,d=await (0,R.executeQuery)(s,void 0,"mapex"),c=d.length,p=d.reduce((e,a)=>e+(a.duracion_minutos||0),0),_={};return d.forEach(e=>{let a=e.desc_paro||"Sin tipo";_[a]||(_[a]={count:0,minutos:0}),_[a].count++,_[a].minutos+=e.duracion_minutos||0}),{paros:d,estadisticas:{total_paros:c,total_minutos:p,promedio_minutos:c>0?Math.round(p/c):0},paros_por_tipo:Object.entries(_).map(([e,a])=>({tipo:e,count:a.count,minutos:a.minutos,porcentaje:c>0?Math.round(a.count/c*100):0})),filtros:{of_actual:o,tipos_paro:i,ofs:n,fecha_desde:new Date(Date.now()-6048e5).toISOString().split("T")[0],fecha_hasta:new Date().toISOString().split("T")[0]}}}catch(e){return console.error("❌ Erro ao obter dados de paros:",e),{paros:[],estadisticas:{total_paros:0,total_minutos:0,promedio_minutos:0},paros_por_tipo:[],filtros:{of_actual:"",tipos_paro:[],ofs:[],fecha_desde:"",fecha_hasta:""}}}}async function T(e){let a=`
    SELECT TOP 20
      hp.fecha, hp.turno, hp.unidades_ok, hp.unidades_nok, hp.unidades_rw,
      hp.tiempo_produccion, hp.velocidad_media, hp.nom_operario
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
    WHERE cm.Cod_maquina = '${e}'
      AND hp.fecha >= DATEADD(day, -30, GETDATE())
    ORDER BY hp.fecha DESC, hp.turno DESC
  `;try{return await (0,R.executeQuery)(a,void 0,"mapex")}catch(e){return console.warn("⚠️ Error al obtener datos - retornando datos vacíos"),[]}}async function D(e){let a=`
    SELECT TOP 10
      fecha, turno,
      disponibilidad, rendimiento, calidad, oee,
      tiempo_planificado, tiempo_operativo, piezas_objetivo
    FROM F_his_ct
    WHERE id_maquina = (SELECT id_maquina FROM cfg_maquina WHERE Cod_maquina = '${e}')
      AND fecha >= DATEADD(day, -30, GETDATE())
    ORDER BY fecha DESC, turno DESC
  `;try{return await (0,R.executeQuery)(a,void 0,"mapex")}catch(e){return console.warn("⚠️ Error al obtener datos - retornando datos vacíos"),[]}}async function A(e){try{let a=`
      SELECT TOP 20
        p.cod_pedido, p.desc_producto, p.cantidad_pedido, p.cantidad_entregada,
        p.fecha_pedido, p.fecha_entrega_prevista, p.estado_pedido
      FROM pedidos p
      INNER JOIN cfg_maquina cm ON p.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${e}'
        AND p.fecha_pedido >= DATEADD(day, -60, GETDATE())
      ORDER BY p.fecha_pedido DESC
    `;return await (0,R.executeQuery)(a,void 0,"sage")}catch(e){return console.warn("⚠️ Banco SAGE não disponível para pedidos - retornando dados vazios"),[]}}async function S(e){let a=`
    SELECT
      CAST(hp.fecha AS DATE) as fecha,
      SUM(hp.unidades_ok) as total_ok,
      SUM(hp.unidades_nok) as total_nok,
      SUM(hp.unidades_rw) as total_rw,
      AVG(CASE WHEN hp.unidades_ok + hp.unidades_nok + hp.unidades_rw > 0
               THEN (hp.unidades_ok * 100.0) / (hp.unidades_ok + hp.unidades_nok + hp.unidades_rw)
               ELSE 0 END) as eficiencia_diaria
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
    WHERE cm.Cod_maquina = '${e}'
      AND hp.fecha >= DATEADD(day, -90, GETDATE())
    GROUP BY CAST(hp.fecha AS DATE)
    ORDER BY fecha DESC
  `;try{return await (0,R.executeQuery)(a,void 0,"mapex")}catch(e){return console.warn("⚠️ Error al obtener datos - retornando datos vacíos"),[]}}async function w(e){try{let a=`
      SELECT TOP 20
        v.cod_venta, v.cliente, v.producto, v.cantidad, v.valor_venta,
        v.fecha_venta, v.estado_entrega
      FROM ventas v
      INNER JOIN cfg_maquina cm ON v.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${e}'
        AND v.fecha_venta >= DATEADD(day, -90, GETDATE())
      ORDER BY v.fecha_venta DESC
    `;return await (0,R.executeQuery)(a,void 0,"sage")}catch(e){return console.warn("⚠️ Banco SAGE não disponível para vendas - retornando dados vazios"),[]}}var I=e.i(12326);let g=new a.AppRouteRouteModule({definition:{kind:t.RouteKind.APP_ROUTE,page:"/api/scada/machine-details/route",pathname:"/api/scada/machine-details",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/Downloads/mrpii 2/src/app/api/scada/machine-details/route.ts",nextConfigOutput:"",userland:I}),{workAsyncStorage:y,workUnitAsyncStorage:x,serverHooks:q}=g;function k(){return(0,o.patchFetch)({workAsyncStorage:y,workUnitAsyncStorage:x})}async function M(e,a,o){var m;let R="/api/scada/machine-details/route";R=R.replace(/\/index$/,"")||"/";let N=await g.prepare(e,a,{srcPage:R,multiZoneDraftMode:!1});if(!N)return a.statusCode=400,a.end("Bad Request"),null==o.waitUntil||o.waitUntil.call(o,Promise.resolve()),null;let{buildId:O,params:v,nextConfig:C,isDraftMode:T,prerenderManifest:D,routerServerContext:A,isOnDemandRevalidate:S,revalidateOnlyGenerated:w,resolvedPathname:I}=N,y=(0,n.normalizeAppPath)(R),x=!!(D.dynamicRoutes[y]||D.routes[I]);if(x&&!T){let e=!!D.routes[I],a=D.dynamicRoutes[y];if(a&&!1===a.fallback&&!e)throw new f.NoFallbackError}let q=null;!x||g.isDev||T||(q="/index"===(q=I)?"/":q);let k=!0===g.isDev||!x,M=x&&!k,U=e.method||"GET",b=(0,r.getTracer)(),F=b.getActiveScopeSpan(),H={params:v,prerenderManifest:D,renderOpts:{experimental:{cacheComponents:!!C.experimental.cacheComponents,authInterrupts:!!C.experimental.authInterrupts},supportsDynamicResponse:k,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:null==(m=C.experimental)?void 0:m.cacheLife,isRevalidate:M,waitUntil:o.waitUntil,onClose:e=>{a.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(a,t,o)=>g.onRequestError(e,a,o,A)},sharedContext:{buildId:O}},P=new s.NodeNextRequest(e),L=new s.NodeNextResponse(a),B=d.NextRequestAdapter.fromNodeNextRequest(P,(0,d.signalFromNodeResponse)(a));try{let n=async t=>g.handle(B,H).finally(()=>{if(!t)return;t.setAttributes({"http.status_code":a.statusCode,"next.rsc":!1});let o=b.getRootSpanAttributes();if(!o)return;if(o.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${o.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let i=o.get("next.route");if(i){let e=`${U} ${i}`;t.setAttributes({"next.route":i,"http.route":i,"next.span_name":e}),t.updateName(e)}else t.updateName(`${U} ${e.url}`)}),s=async r=>{var s,d;let c=async({previousCacheEntry:t})=>{try{if(!(0,i.getRequestMeta)(e,"minimalMode")&&S&&w&&!t)return a.statusCode=404,a.setHeader("x-nextjs-cache","REVALIDATED"),a.end("This page could not be found"),null;let s=await n(r);e.fetchMetrics=H.renderOpts.fetchMetrics;let d=H.renderOpts.pendingWaitUntil;d&&o.waitUntil&&(o.waitUntil(d),d=void 0);let c=H.renderOpts.collectedTags;if(!x)return await (0,_.sendResponse)(P,L,s,H.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),a=(0,u.toNodeOutgoingHttpHeaders)(s.headers);c&&(a[l.NEXT_CACHE_TAGS_HEADER]=c),!a["content-type"]&&e.type&&(a["content-type"]=e.type);let t=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=l.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,o=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=l.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:E.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:a},cacheControl:{revalidate:t,expire:o}}}}catch(a){throw(null==t?void 0:t.isStale)&&await g.onRequestError(e,a,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isRevalidate:M,isOnDemandRevalidate:S})},A),a}},f=await g.handleResponse({req:e,nextConfig:C,cacheKey:q,routeKind:t.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:D,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:w,responseGenerator:c,waitUntil:o.waitUntil});if(!x)return null;if((null==f||null==(s=f.value)?void 0:s.kind)!==E.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==f||null==(d=f.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,i.getRequestMeta)(e,"minimalMode")||a.setHeader("x-nextjs-cache",S?"REVALIDATED":f.isMiss?"MISS":f.isStale?"STALE":"HIT"),T&&a.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,u.fromNodeOutgoingHttpHeaders)(f.value.headers);return(0,i.getRequestMeta)(e,"minimalMode")&&x||m.delete(l.NEXT_CACHE_TAGS_HEADER),!f.cacheControl||a.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,h.getCacheControlHeader)(f.cacheControl)),await (0,_.sendResponse)(P,L,new Response(f.value.body,{headers:m,status:f.value.status||200})),null};F?await s(F):await b.withPropagatedContext(e.headers,()=>b.trace(c.BaseServerSpan.handleRequest,{spanName:`${U} ${e.url}`,kind:r.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},s))}catch(a){if(F||a instanceof f.NoFallbackError||await g.onRequestError(e,a,{routerKind:"App Router",routePath:y,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isRevalidate:M,isOnDemandRevalidate:S})}),x)throw a;return await (0,_.sendResponse)(P,L,new Response(null,{status:500})),null}}}];

//# sourceMappingURL=e75cc_next_dist_esm_build_templates_app-route_96a166d6.js.map