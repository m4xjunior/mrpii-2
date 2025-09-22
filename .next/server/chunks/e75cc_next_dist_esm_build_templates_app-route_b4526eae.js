module.exports=[27886,e=>{"use strict";e.s(["handler",()=>b,"patchFetch",()=>H,"routeModule",()=>q,"serverHooks",()=>P,"workAsyncStorage",()=>M,"workUnitAsyncStorage",()=>$],27886);var a=e.i(74353),t=e.i(19310),r=e.i(20050),i=e.i(32930),n=e.i(49260),o=e.i(25482),s=e.i(36688),c=e.i(23026),d=e.i(1251),u=e.i(6621),l=e.i(93265),p=e.i(72116),m=e.i(61195),E=e.i(99119),_=e.i(93695);e.i(4079);var h=e.i(55985);e.s(["POST",()=>g],82095);var R=e.i(12415),f=e.i(50619);async function g(e){try{let{action:a,machineId:t,data:r}=await e.json();switch(console.log(`🔧 Acci\xf3n de gesti\xf3n: ${a} - M\xe1quina: ${t}`),a){case"reclassify_stops":return await T(t,r);case"merge_microstops":return await w(t,r);case"validate_causes":return await A(t,r);case"export_data":return await S(t,r);case"backup_data":return await y(t,r);case"update_targets":return await v(t,r);default:return R.NextResponse.json({success:!1,error:"Acción no reconocida"},{status:400})}}catch(e){return console.error("❌ Error en gestión:",e),R.NextResponse.json({success:!1,error:"Error en operación de gestión",message:e instanceof Error?e.message:"Error desconocido"},{status:500})}}async function T(e,a){let{stopIds:t,newCategory:r,newCause:i,reason:n}=a;try{let a=`
      UPDATE his_prod_paro
      SET
        tipo_paro = @newCategory,
        desc_paro = @newCause,
        observaciones = ISNULL(observaciones, '') + CHAR(13) + CHAR(10) +
          'Reclasificado: ' + @reason + ' - ' + FORMAT(GETDATE(), 'yyyy-MM-dd HH:mm'),
        usuario_modificacion = 'SISTEMA_GESTION',
        fecha_modificacion = GETDATE()
      WHERE id_paro IN (${t.map((e,a)=>`@stop${a}`).join(",")})
        AND id_maquina = (SELECT id_maquina FROM cfg_maquina WHERE Cod_maquina = @machineId)
    `,o={newCategory:r,newCause:i,reason:n,machineId:e,...t.reduce((e,a,t)=>(e[`stop${t}`]=a,e),{})};return await (0,f.executeQuery)(a,o),await D(e,"RECLASSIFY_STOPS",{stopIds:t,newCategory:r,newCause:i,reason:n}),R.NextResponse.json({success:!0,message:`${t.length} paradas reclasificadas correctamente`,timestamp:new Date().toISOString()})}catch(e){throw Error(`Error reclasificando paradas: ${e}`)}}async function w(e,a){let{threshold:t=120,mergeWindow:r=300}=a;try{let a=`
      WITH MicrostopsConsecutivas AS (
        SELECT
          id_paro,
          fecha_inicio,
          fecha_fin,
          duracion_minutos,
          tipo_paro,
          desc_paro,
          LAG(fecha_fin) OVER (ORDER BY fecha_inicio) as prev_end,
          LEAD(fecha_inicio) OVER (ORDER BY fecha_inicio) as next_start,
          DATEDIFF(second, LAG(fecha_fin) OVER (ORDER BY fecha_inicio), fecha_inicio) as gap_seconds
        FROM his_prod_paro hpp
        INNER JOIN cfg_maquina cm ON hpp.id_maquina = cm.id_maquina
        WHERE cm.Cod_maquina = @machineId
          AND hpp.duracion_minutos <= @threshold
          AND hpp.fecha_inicio >= DATEADD(day, -30, GETDATE())
      )
      SELECT
        id_paro,
        fecha_inicio,
        fecha_fin,
        duracion_minutos,
        tipo_paro,
        desc_paro,
        gap_seconds
      FROM MicrostopsConsecutivas
      WHERE gap_seconds <= @mergeWindow
      ORDER BY fecha_inicio
    `,i=await (0,f.executeQuery)(a,{machineId:e,threshold:t,mergeWindow:r}),n=0,o=[],s=[];for(let e of i)0===s.length||e.gap_seconds<=r?s.push(e):(s.length>1&&o.push([...s]),s=[e]);for(let e of(s.length>1&&o.push(s),o)){let a=e[0],t=e[e.length-1],r=e.reduce((e,a)=>e+a.duracion_minutos,0),i=`
        INSERT INTO his_prod_paro (
          id_maquina, fecha_inicio, fecha_fin, duracion_minutos,
          tipo_paro, desc_paro, operario, observaciones
        )
        SELECT
          id_maquina,
          @startTime,
          @endTime,
          @totalDuration,
          'MICRO_PARADA_MERGED',
          'Micro-paradas fusionadas: ' + STRING_AGG(desc_paro, ' + '),
          operario,
          'Merged de ' + @groupSize + ' micro-paradas - IDs: ' + @originalIds
        FROM his_prod_paro
        WHERE id_paro = @firstStopId
        GROUP BY id_maquina, operario
      `;await (0,f.executeQuery)(i,{startTime:a.fecha_inicio,endTime:t.fecha_fin,totalDuration:r,groupSize:e.length,originalIds:e.map(e=>e.id_paro).join(","),firstStopId:a.id_paro});let o=`
        UPDATE his_prod_paro
        SET
          observaciones = ISNULL(observaciones, '') + ' [MERGED - ' + FORMAT(GETDATE(), 'yyyy-MM-dd HH:mm') + ']',
          activo = 0
        WHERE id_paro IN (${e.map((e,a)=>`@id${a}`).join(",")})
      `,s=e.reduce((e,a,t)=>(e[`id${t}`]=a.id_paro,e),{});await (0,f.executeQuery)(o,s),n+=e.length}return await D(e,"MERGE_MICROSTOPS",{threshold:t,mergeWindow:r,groupsProcessed:o.length,stopsProcessed:n}),R.NextResponse.json({success:!0,message:`${n} micro-paradas fusionadas en ${o.length} grupos`,details:{groupsCreated:o.length,originalStops:n,threshold:t,mergeWindow:r},timestamp:new Date().toISOString()})}catch(e){throw Error(`Error mergeando micro-paradas: ${e}`)}}async function A(e,a){let{validations:t}=a;try{for(let e of t)await (0,f.executeQuery)(`
        UPDATE his_prod_paro
        SET
          validado = @validated,
          comentarios_validacion = @comments,
          fecha_validacion = GETDATE(),
          usuario_validacion = 'SISTEMA_GESTION'
        WHERE id_paro = @stopId
      `,{stopId:e.stopId,validated:+!!e.validated,comments:e.comments||""});return await D(e,"VALIDATE_CAUSES",{validationsProcessed:t.length}),R.NextResponse.json({success:!0,message:`${t.length} causas validadas correctamente`,timestamp:new Date().toISOString()})}catch(e){throw Error(`Error validando causas: ${e}`)}}async function S(e,a){let{format:t,dateRange:r,includeCharts:i}=a;try{let a=new Date(r.start),n=new Date(r.end),o=await I(e,a,n),s="";switch(t){case"excel":s=await O(o,e,i);break;case"pdf":s=await x(o,e,i);break;case"csv":s=await C(o,e)}return await D(e,"EXPORT_DATA",{format:t,dateRange:r,includeCharts:i,fileUrl:s}),R.NextResponse.json({success:!0,message:`Datos exportados en formato ${t.toUpperCase()}`,fileUrl:s,timestamp:new Date().toISOString()})}catch(e){throw Error(`Error exportando datos: ${e}`)}}async function y(e,a){let{includeHistorical:t=!0,compress:r=!0}=a;try{let a=`backup_${e}_${Date.now()}`;return await (0,f.executeQuery)(`
      SELECT *
      INTO temp_backup_${a}
      FROM his_prod hp
      INNER JOIN cfg_maquina cm ON hp.id_maquina = cm.id_maquina
      WHERE cm.Cod_maquina = @machineId
        ${t?"":"AND hp.fecha >= DATEADD(day, -90, GETDATE())"}
    `,{machineId:e}),await D(e,"BACKUP_DATA",{backupId:a,includeHistorical:t,compress:r}),R.NextResponse.json({success:!0,message:"Backup creado correctamente",backupId:a,timestamp:new Date().toISOString()})}catch(e){throw Error(`Error creando backup: ${e}`)}}async function v(e,a){let{oeeTarget:t,availabilityTarget:r,performanceTarget:i,qualityTarget:n}=a;try{return await (0,f.executeQuery)(`
      UPDATE cfg_maquina_metas
      SET
        meta_oee = @oeeTarget,
        meta_disponibilidad = @availabilityTarget,
        meta_rendimiento = @performanceTarget,
        meta_calidad = @qualityTarget,
        fecha_actualizacion = GETDATE()
      WHERE id_maquina = (SELECT id_maquina FROM cfg_maquina WHERE Cod_maquina = @machineId)

      IF @@ROWCOUNT = 0
      BEGIN
        INSERT INTO cfg_maquina_metas (
          id_maquina, meta_oee, meta_disponibilidad, meta_rendimiento, meta_calidad, fecha_actualizacion
        )
        SELECT
          id_maquina, @oeeTarget, @availabilityTarget, @performanceTarget, @qualityTarget, GETDATE()
        FROM cfg_maquina
        WHERE Cod_maquina = @machineId
      END
    `,{machineId:e,oeeTarget:t,availabilityTarget:r,performanceTarget:i,qualityTarget:n}),await D(e,"UPDATE_TARGETS",{oeeTarget:t,availabilityTarget:r,performanceTarget:i,qualityTarget:n}),R.NextResponse.json({success:!0,message:"Metas actualizadas correctamente",timestamp:new Date().toISOString()})}catch(e){throw Error(`Error actualizando metas: ${e}`)}}async function D(e,a,t){try{await (0,f.executeQuery)(`
      INSERT INTO log_management_actions (
        machine_id, action_type, action_details, timestamp, user_id
      ) VALUES (
        @machineId, @action, @details, GETDATE(), 'SISTEMA_GESTION'
      )
    `,{machineId:e,action:a,details:JSON.stringify(t)})}catch(e){console.warn("Warning: Could not log management action:",e)}}async function I(e,a,t){return{production:[],downtime:[],oee:[],costs:[]}}async function O(e,a,t){return`/exports/excel_${a}_${Date.now()}.xlsx`}async function x(e,a,t){return`/exports/report_${a}_${Date.now()}.pdf`}async function C(e,a){return`/exports/data_${a}_${Date.now()}.csv`}var N=e.i(82095);let q=new a.AppRouteRouteModule({definition:{kind:t.RouteKind.APP_ROUTE,page:"/api/management/route",pathname:"/api/management",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/Downloads/mrpii 2/src/app/api/management/route.ts",nextConfigOutput:"",userland:N}),{workAsyncStorage:M,workUnitAsyncStorage:$,serverHooks:P}=q;function H(){return(0,r.patchFetch)({workAsyncStorage:M,workUnitAsyncStorage:$})}async function b(e,a,r){var R;let f="/api/management/route";f=f.replace(/\/index$/,"")||"/";let g=await q.prepare(e,a,{srcPage:f,multiZoneDraftMode:!1});if(!g)return a.statusCode=400,a.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:T,params:w,nextConfig:A,isDraftMode:S,prerenderManifest:y,routerServerContext:v,isOnDemandRevalidate:D,revalidateOnlyGenerated:I,resolvedPathname:O}=g,x=(0,o.normalizeAppPath)(f),C=!!(y.dynamicRoutes[x]||y.routes[O]);if(C&&!S){let e=!!y.routes[O],a=y.dynamicRoutes[x];if(a&&!1===a.fallback&&!e)throw new _.NoFallbackError}let N=null;!C||q.isDev||S||(N="/index"===(N=O)?"/":N);let M=!0===q.isDev||!C,$=C&&!M,P=e.method||"GET",H=(0,n.getTracer)(),b=H.getActiveScopeSpan(),U={params:w,prerenderManifest:y,renderOpts:{experimental:{cacheComponents:!!A.experimental.cacheComponents,authInterrupts:!!A.experimental.authInterrupts},supportsDynamicResponse:M,incrementalCache:(0,i.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:null==(R=A.experimental)?void 0:R.cacheLife,isRevalidate:$,waitUntil:r.waitUntil,onClose:e=>{a.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(a,t,r)=>q.onRequestError(e,a,r,v)},sharedContext:{buildId:T}},G=new s.NodeNextRequest(e),L=new s.NodeNextResponse(a),F=c.NextRequestAdapter.fromNodeNextRequest(G,(0,c.signalFromNodeResponse)(a));try{let o=async t=>q.handle(F,U).finally(()=>{if(!t)return;t.setAttributes({"http.status_code":a.statusCode,"next.rsc":!1});let r=H.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==d.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let i=r.get("next.route");if(i){let e=`${P} ${i}`;t.setAttributes({"next.route":i,"http.route":i,"next.span_name":e}),t.updateName(e)}else t.updateName(`${P} ${e.url}`)}),s=async n=>{var s,c;let d=async({previousCacheEntry:t})=>{try{if(!(0,i.getRequestMeta)(e,"minimalMode")&&D&&I&&!t)return a.statusCode=404,a.setHeader("x-nextjs-cache","REVALIDATED"),a.end("This page could not be found"),null;let s=await o(n);e.fetchMetrics=U.renderOpts.fetchMetrics;let c=U.renderOpts.pendingWaitUntil;c&&r.waitUntil&&(r.waitUntil(c),c=void 0);let d=U.renderOpts.collectedTags;if(!C)return await (0,l.sendResponse)(G,L,s,U.renderOpts.pendingWaitUntil),null;{let e=await s.blob(),a=(0,p.toNodeOutgoingHttpHeaders)(s.headers);d&&(a[E.NEXT_CACHE_TAGS_HEADER]=d),!a["content-type"]&&e.type&&(a["content-type"]=e.type);let t=void 0!==U.renderOpts.collectedRevalidate&&!(U.renderOpts.collectedRevalidate>=E.INFINITE_CACHE)&&U.renderOpts.collectedRevalidate,r=void 0===U.renderOpts.collectedExpire||U.renderOpts.collectedExpire>=E.INFINITE_CACHE?void 0:U.renderOpts.collectedExpire;return{value:{kind:h.CachedRouteKind.APP_ROUTE,status:s.status,body:Buffer.from(await e.arrayBuffer()),headers:a},cacheControl:{revalidate:t,expire:r}}}}catch(a){throw(null==t?void 0:t.isStale)&&await q.onRequestError(e,a,{routerKind:"App Router",routePath:f,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isRevalidate:$,isOnDemandRevalidate:D})},v),a}},_=await q.handleResponse({req:e,nextConfig:A,cacheKey:N,routeKind:t.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:y,isRoutePPREnabled:!1,isOnDemandRevalidate:D,revalidateOnlyGenerated:I,responseGenerator:d,waitUntil:r.waitUntil});if(!C)return null;if((null==_||null==(s=_.value)?void 0:s.kind)!==h.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==_||null==(c=_.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});(0,i.getRequestMeta)(e,"minimalMode")||a.setHeader("x-nextjs-cache",D?"REVALIDATED":_.isMiss?"MISS":_.isStale?"STALE":"HIT"),S&&a.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let R=(0,p.fromNodeOutgoingHttpHeaders)(_.value.headers);return(0,i.getRequestMeta)(e,"minimalMode")&&C||R.delete(E.NEXT_CACHE_TAGS_HEADER),!_.cacheControl||a.getHeader("Cache-Control")||R.get("Cache-Control")||R.set("Cache-Control",(0,m.getCacheControlHeader)(_.cacheControl)),await (0,l.sendResponse)(G,L,new Response(_.value.body,{headers:R,status:_.value.status||200})),null};b?await s(b):await H.withPropagatedContext(e.headers,()=>H.trace(d.BaseServerSpan.handleRequest,{spanName:`${P} ${e.url}`,kind:n.SpanKind.SERVER,attributes:{"http.method":P,"http.target":e.url}},s))}catch(a){if(b||a instanceof _.NoFallbackError||await q.onRequestError(e,a,{routerKind:"App Router",routePath:x,routeType:"route",revalidateReason:(0,u.getRevalidateReason)({isRevalidate:$,isOnDemandRevalidate:D})}),C)throw a;return await (0,l.sendResponse)(G,L,new Response(null,{status:500})),null}}}];

//# sourceMappingURL=e75cc_next_dist_esm_build_templates_app-route_b4526eae.js.map