module.exports=[90597,e=>{"use strict";e.s(["handler",()=>M,"patchFetch",()=>k,"routeModule",()=>g,"serverHooks",()=>q,"workAsyncStorage",()=>x,"workUnitAsyncStorage",()=>y],90597);var a=e.i(74353),t=e.i(19310),i=e.i(20050),o=e.i(32930),n=e.i(49260),r=e.i(25482),s=e.i(36688),d=e.i(23026),c=e.i(1251),p=e.i(6621),_=e.i(93265),u=e.i(72116),h=e.i(61195),l=e.i(99119),f=e.i(93695);e.i(4079);var E=e.i(55985);e.s(["POST",()=>O],12326);var m=e.i(12415),R=e.i(50619),N=e.i(43492);async function O(e){try{let a,{machineId:t,tab:i}=await e.json();if(!t||!i)return m.NextResponse.json({success:!1,error:"Parâmetros machineId e tab são obrigatórios"},{status:400});switch(i){case"of":a=await C(t);break;case"paros":a=await T(t);break;case"produccion":a=await D(t);break;case"oee":a=await v(t);break;case"pedidos":a=await A(t);break;case"historico":a=await S(t);break;case"ventas":a=await I(t);break;default:return m.NextResponse.json({success:!1,error:"Tab não válida"},{status:400})}return m.NextResponse.json({success:!0,data:a,tab:i,machineId:t,timestamp:new Date().toISOString()})}catch(e){return console.error("❌ Erro ao buscar detalhes da máquina:",e),m.NextResponse.json({success:!1,error:"Erro interno do servidor",message:e instanceof Error?e.message:"Erro desconhecido"},{status:500})}}async function C(e){try{let a=`
      SELECT
        cm.Rt_Cod_of, cm.rt_Cod_producto, cm.Rt_Desc_producto,
        cm.Rt_Unidades_planning, cm.rt_dia_productivo, cm.rt_desc_turno,
        cm.Rt_Unidades_ok_of as Unidades_ok, cm.Rt_Unidades_nok_of as Rt_Unidades_nok, cm.Rt_Unidades_repro_of as Unidades_rw,
        cm.f_velocidad, cm.rt_id_his_fase, cm.rt_Desc_operario,
        ho.fecha_ini, ho.fecha_fin as fecha_fin_prevista, ho.id_his_of
      FROM cfg_maquina cm
      LEFT JOIN his_of ho ON cm.Rt_Cod_of = ho.cod_of
      WHERE cm.Cod_maquina = '${e}'
    `,t=await (0,R.executeQuery)(a,void 0,"mapex");if(0===t.length)return null;let i=t[0],o=i.Rt_Cod_of,n=i.id_his_of,r=null;try{r=await (0,N.calculateOEEForOF)(e,o)}catch(e){console.warn("⚠️ Erro ao calcular OEE para OF:",e)}let s=null;if(n){let e=`
        SELECT
          SUM(hp.unidades_ok) as total_ok,
          SUM(hp.unidades_nok) as total_nok,
          SUM(hp.unidades_repro) as total_rw,
          SUM(CAST(DATEDIFF(SECOND, hp.fecha_ini, hp.fecha_fin) AS BIGINT)) as tiempo_produccion_segundos,
          MIN(hp.fecha_ini) as fecha_inicio_real,
          MAX(hp.fecha_fin) as fecha_fin_real
        FROM his_prod hp
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${n}'
        AND hp.id_actividad = 2
      `;s=(await (0,R.executeQuery)(e,void 0,"mapex"))[0]||null}let d=null;if(n){let e=`
        SELECT
          SUM(CAST(DATEDIFF(SECOND, hpp.fecha_ini, hpp.fecha_fin) AS BIGINT)) as tiempo_paros_segundos,
          COUNT(DISTINCT hpp.Id_operario) as num_operarios
        FROM his_prod hp
        INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${n}'
      `;d=(await (0,R.executeQuery)(e,void 0,"mapex"))[0]||null}let c=[];if(n){let e=`
        SELECT
          cp.desc_paro,
          SUM(CAST(DATEDIFF(SECOND, hpp.fecha_ini, hpp.fecha_fin) AS BIGINT)) as tiempo_segundos
        FROM his_prod hp
        INNER JOIN his_prod_paro hpp ON hp.id_his_prod = hpp.id_his_prod
        INNER JOIN cfg_paro cp ON hpp.id_paro = cp.id_paro
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${n}'
        GROUP BY cp.desc_paro
        ORDER BY tiempo_segundos DESC
      `;c=await (0,R.executeQuery)(e,void 0,"mapex")}let p=[];if(n){let a=`
        SELECT
          cm.rt_desc_turno as turno,
          CONVERT(VARCHAR(10), hp.fecha_fin, 111) as fecha,
          SUM(hp.unidades_ok) as unidades_ok,
          SUM(hp.unidades_nok) as unidades_nok,
          SUM(hp.unidades_repro) as unidades_rw
        FROM his_prod hp
        INNER JOIN cfg_maquina cm ON hp.Id_maquina = cm.id_maquina
        INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
        WHERE hf.id_his_of = '${n}'
        AND cm.Cod_maquina = '${e}'
        GROUP BY cm.rt_desc_turno, CONVERT(VARCHAR(10), hp.fecha_fin, 111)
        ORDER BY fecha, turno
      `;p=await (0,R.executeQuery)(a,void 0,"mapex")}let _=s?(s.total_ok||0)+(s.total_nok||0)+(s.total_rw||0):(i.Unidades_ok||0)+(i.Rt_Unidades_nok||0)+(i.Unidades_rw||0),u=i.Rt_Unidades_planning>0?Math.round(_/i.Rt_Unidades_planning*1e4)/100:0,h=i.Rt_Unidades_planning-_,l=(0,N.calculateRemainingTime)(h,i.f_velocidad||0),f=_>0?Math.round((i.Rt_Unidades_nok||0)/_*1e4)/100:0;return{...i,cod_of:o,id_his_of:n,total_produced:_,avance_porcentaje:u,remaining_pieces:h,remaining_time:l,desviacion_porcentaje:f,oee_data:r,produccion_data:s,paros_data:d,principales_paros:c,produccion_turno:p,status:{avance_class:u>=90?"success":u>=70?"warning":"danger",tiempo_class:h>0&&i.f_velocidad>0?h/i.f_velocidad>24?"warning":"success":"info",desviacion_class:f>5?"danger":"success"}}}catch(e){return console.error("❌ Erro ao obter dados OF:",e),null}}async function T(e){try{let a=`SELECT Rt_Cod_of FROM cfg_maquina WHERE Cod_maquina = '${e}'`,t=await (0,R.executeQuery)(a,void 0,"mapex"),i=t[0]?.Rt_Cod_of||"",o=await (0,R.executeQuery)("SELECT DISTINCT id_paro, desc_paro FROM cfg_paro ORDER BY desc_paro",void 0,"mapex"),n=`
      SELECT DISTINCT substring(hof.cod_of, 1, 15) as cod_of, hof.fecha_ini
      FROM his_prod hp
      INNER JOIN his_fase hf ON hp.id_his_fase = hf.id_his_fase
      INNER JOIN his_of hof ON hf.id_his_of = hof.id_his_of
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = '${e}'
      AND hof.fecha_ini >= DATEADD(day, -7, GETDATE())
      ORDER BY hof.fecha_ini DESC
    `,r=await (0,R.executeQuery)(n,void 0,"mapex"),s=`
      SELECT TOP 50
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
      AND hpp.fecha_ini >= DATEADD(day, -7, GETDATE())
      ORDER BY hpp.fecha_ini DESC
    `,d=await (0,R.executeQuery)(s,void 0,"mapex"),c=d.length,p=d.reduce((e,a)=>e+(a.duracion_minutos||0),0),_={};return d.forEach(e=>{let a=e.desc_paro||"Sin tipo";_[a]||(_[a]={count:0,minutos:0}),_[a].count++,_[a].minutos+=e.duracion_minutos||0}),{paros:d,estadisticas:{total_paros:c,total_minutos:p,promedio_minutos:c>0?Math.round(p/c):0},paros_por_tipo:Object.entries(_).map(([e,a])=>({tipo:e,count:a.count,minutos:a.minutos,porcentaje:c>0?Math.round(a.count/c*100):0})),filtros:{of_actual:i,tipos_paro:o,ofs:r,fecha_desde:new Date(Date.now()-6048e5).toISOString().split("T")[0],fecha_hasta:new Date().toISOString().split("T")[0]}}}catch(e){return console.error("❌ Erro ao obter dados de paros:",e),{paros:[],estadisticas:{total_paros:0,total_minutos:0,promedio_minutos:0},paros_por_tipo:[],filtros:{of_actual:"",tipos_paro:[],ofs:[],fecha_desde:"",fecha_hasta:""}}}}async function D(e){let a=`
    SELECT TOP 20
      hp.fecha, hp.turno, hp.unidades_ok, hp.unidades_nok, hp.unidades_rw,
      hp.tiempo_produccion, hp.velocidad_media, hp.nom_operario
    FROM his_prod hp
    INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
    WHERE cm.Cod_maquina = '${e}'
      AND hp.fecha >= DATEADD(day, -30, GETDATE())
    ORDER BY hp.fecha DESC, hp.turno DESC
  `;return await (0,R.executeQuery)(a)}async function v(e){let a=`
    SELECT TOP 10
      fecha, turno,
      disponibilidad, rendimiento, calidad, oee,
      tiempo_planificado, tiempo_operativo, piezas_objetivo
    FROM F_his_ct
    WHERE id_maquina = (SELECT id_maquina FROM cfg_maquina WHERE Cod_maquina = '${e}')
      AND fecha >= DATEADD(day, -30, GETDATE())
    ORDER BY fecha DESC, turno DESC
  `;return await (0,R.executeQuery)(a)}async function A(e){let a=`
    SELECT TOP 20
      p.cod_pedido, p.desc_producto, p.cantidad_pedido, p.cantidad_entregada,
      p.fecha_pedido, p.fecha_entrega_prevista, p.estado_pedido
    FROM pedidos p
    INNER JOIN cfg_maquina cm ON p.id_maquina = cm.id_maquina
    WHERE cm.Cod_maquina = '${e}'
      AND p.fecha_pedido >= DATEADD(day, -60, GETDATE())
    ORDER BY p.fecha_pedido DESC
  `;return await (0,R.executeQuery)(a)}async function S(e){let a=`
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
  `;return await (0,R.executeQuery)(a)}async function I(e){let a=`
    SELECT TOP 20
      v.cod_venta, v.cliente, v.producto, v.cantidad, v.valor_venta,
      v.fecha_venta, v.estado_entrega
    FROM ventas v
    INNER JOIN cfg_maquina cm ON v.id_maquina = cm.id_maquina
    WHERE cm.Cod_maquina = '${e}'
      AND v.fecha_venta >= DATEADD(day, -90, GETDATE())
    ORDER BY v.fecha_venta DESC
  `;return await (0,R.executeQuery)(a)}var w=e.i(12326);let g=new a.AppRouteRouteModule({definition:{kind:t.RouteKind.APP_ROUTE,page:"/api/scada/machine-details/route",pathname:"/api/scada/machine-details",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/Downloads/mrpii 2/src/app/api/scada/machine-details/route.ts",nextConfigOutput:"",userland:w}),{workAsyncStorage:x,workUnitAsyncStorage:y,serverHooks:q}=g;function k(){return(0,i.patchFetch)({workAsyncStorage:x,workUnitAsyncStorage:y})}async function M(e,a,i){var m;let R="/api/scada/machine-details/route";R=R.replace(/\/index$/,"")||"/";let N=await g.prepare(e,a,{srcPage:R,multiZoneDraftMode:!1});if(!N)return a.statusCode=400,a.end("Bad Request"),null==i.waitUntil||i.waitUntil.call(i,Promise.resolve()),null;let{buildId:O,params:C,nextConfig:T,isDraftMode:D,prerenderManifest:v,routerServerContext:A,isOnDemandRevalidate:S,revalidateOnlyGenerated:I,resolvedPathname:w}=N,x=(0,r.normalizeAppPath)(R),y=!!(v.dynamicRoutes[x]||v.routes[w]);if(y&&!D){let e=!!v.routes[w],a=v.dynamicRoutes[x];if(a&&!1===a.fallback&&!e)throw new f.NoFallbackError}let q=null;!y||g.isDev||D||(q="/index"===(q=w)?"/":q);let k=!0===g.isDev||!y,M=y&&!k,U=e.method||"GET",b=(0,n.getTracer)(),F=b.getActiveScopeSpan(),H={params:C,prerenderManifest:v,renderOpts:{experimental:{cacheComponents:!!T.experimental.cacheComponents,authInterrupts:!!T.experimental.authInterrupts},supportsDynamicResponse:k,incrementalCache:(0,o.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:null==(m=T.experimental)?void 0:m.cacheLife,isRevalidate:M,waitUntil:i.waitUntil,onClose:e=>{a.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(a,t,i)=>g.onRequestError(e,a,i,A)},sharedContext:{buildId:O}},P=new s.NodeNextRequest(e),L=new s.NodeNextResponse(a),$=d.NextRequestAdapter.fromNodeNextRequest(P,(0,d.signalFromNodeResponse)(a));try{let r=async t=>g.handle($,H).finally(()=>{if(!t)return;t.setAttributes({"http.status_code":a.statusCode,"next.rsc":!1});let i=b.getRootSpanAttributes();if(!i)return;if(i.get("next.span_type")!==c.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${i.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let o=i.get("next.route");if(o){let e=`${U} ${o}`;t.setAttributes({"next.route":o,"http.route":o,"next.span_name":e}),t.updateName(e)}else t.updateName(`${U} ${e.url}`)}),s=async n=>{var s,d;let c=async({previousCacheEntry:t})=>{try{if(!(0,o.getRequestMeta)(e,"minimalMode")&&S&&I&&!t)return a.statusCode=404,a.setHeader("x-nextjs-cache","REVALIDATED"),a.end("This page could not be found"),null;let s=await r(n);e.fetchMetrics=H.renderOpts.fetchMetrics;let d=H.renderOpts.pendingWaitUntil;d&&i.waitUntil&&(i.waitUntil(d),d=void 0);let c=H.renderOpts.collectedTags;if(!y)return await (0,_.sendResponse)(P,L,s,H.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),a=(0,u.toNodeOutgoingHttpHeaders)(s.headers);c&&(a[l.NEXT_CACHE_TAGS_HEADER]=c),!a["content-type"]&&e.type&&(a["content-type"]=e.type);let t=void 0!==H.renderOpts.collectedRevalidate&&!(H.renderOpts.collectedRevalidate>=l.INFINITE_CACHE)&&H.renderOpts.collectedRevalidate,i=void 0===H.renderOpts.collectedExpire||H.renderOpts.collectedExpire>=l.INFINITE_CACHE?void 0:H.renderOpts.collectedExpire;return{value:{kind:E.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:a},cacheControl:{revalidate:t,expire:i}}}}catch(a){throw(null==t?void 0:t.isStale)&&await g.onRequestError(e,a,{routerKind:"App Router",routePath:R,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isRevalidate:M,isOnDemandRevalidate:S})},A),a}},f=await g.handleResponse({req:e,nextConfig:T,cacheKey:q,routeKind:t.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:v,isRoutePPREnabled:!1,isOnDemandRevalidate:S,revalidateOnlyGenerated:I,responseGenerator:c,waitUntil:i.waitUntil});if(!y)return null;if((null==f||null==(s=f.value)?void 0:s.kind)!==E.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==f||null==(d=f.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,o.getRequestMeta)(e,"minimalMode")||a.setHeader("x-nextjs-cache",S?"REVALIDATED":f.isMiss?"MISS":f.isStale?"STALE":"HIT"),D&&a.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let m=(0,u.fromNodeOutgoingHttpHeaders)(f.value.headers);return(0,o.getRequestMeta)(e,"minimalMode")&&y||m.delete(l.NEXT_CACHE_TAGS_HEADER),!f.cacheControl||a.getHeader("Cache-Control")||m.get("Cache-Control")||m.set("Cache-Control",(0,h.getCacheControlHeader)(f.cacheControl)),await (0,_.sendResponse)(P,L,new Response(f.value.body,{headers:m,status:f.value.status||200})),null};F?await s(F):await b.withPropagatedContext(e.headers,()=>b.trace(c.BaseServerSpan.handleRequest,{spanName:`${U} ${e.url}`,kind:n.SpanKind.SERVER,attributes:{"http.method":U,"http.target":e.url}},s))}catch(a){if(F||a instanceof f.NoFallbackError||await g.onRequestError(e,a,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isRevalidate:M,isOnDemandRevalidate:S})}),y)throw a;return await (0,_.sendResponse)(P,L,new Response(null,{status:500})),null}}}];

//# sourceMappingURL=e75cc_next_dist_esm_build_templates_app-route_96a166d6.js.map