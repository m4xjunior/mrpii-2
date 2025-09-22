import { NextRequest, NextResponse } from 'next/server';
import { getAllProductCosts } from '../../scada/costs-config/route';

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Obteniendo resumen mensual');

    // Usar datos de producción actuales para calcular resumen mensual aproximado
    const productionResponse = await fetch('http://localhost:3000/api/scada/production');
    const productionResult = await productionResponse.json();

    if (!productionResult.success || !productionResult.data) {
      return NextResponse.json({
        success: false,
        message: 'No se pudieron obtener datos de producción'
      }, { status: 500 });
    }

    const machines = productionResult.data;
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    // Calcular totales mensuales aproximados
    const totalOk = machines.reduce((sum: number, machine: any) => sum + (machine.ok || 0), 0);
    const totalNok = machines.reduce((sum: number, machine: any) => sum + (machine.nok || 0), 0);
    const totalRw = machines.reduce((sum: number, machine: any) => sum + (machine.rw || 0), 0);
    const totalProduction = totalOk + totalNok + totalRw;

    // Estimar valores mensuales basados en datos actuales
    const estimatedMonthlyOk = Math.floor(totalOk * daysInMonth * 0.8); // 80% del día actual
    const estimatedMonthlyNok = Math.floor(totalNok * daysInMonth * 0.8);
    const estimatedMonthlyRw = Math.floor(totalRw * daysInMonth * 0.8);
    const estimatedMonthlyTotal = estimatedMonthlyOk + estimatedMonthlyNok + estimatedMonthlyRw;

    // Obtener costos de productos desde MAPEX
    const productCosts = await getAllProductCosts();

    // Calcular costo promedio por pieza NOK
    const costoPromedioNok = Object.keys(productCosts).length > 0
      ? Object.values(productCosts).reduce((sum, cost) => sum + cost, 0) / Object.keys(productCosts).length
      : 0; // Sin productos = costo cero

    console.log('💰 Costo promedio calculado:', {
      totalProductos: Object.keys(productCosts).length,
      costoPromedio: costoPromedioNok,
      nota: Object.keys(productCosts).length > 0
        ? 'Basado en costos reales de MAPEX'
        : 'Sin productos activos - costo cero'
    });

    const data = {
      ok: estimatedMonthlyOk,
      nok: estimatedMonthlyNok,
      rw: estimatedMonthlyRw,
      total: estimatedMonthlyTotal,
      eficiencia: totalProduction > 0 ? ((totalOk / totalProduction) * 100) : 0,
      perdidas_eur: estimatedMonthlyNok * costoPromedioNok
    };

    console.log('📊 Resumen mensual estimado:', {
      ...data,
      calculo_perdidas: costoPromedioNok > 0
        ? `${estimatedMonthlyNok} NOK × €${costoPromedioNok.toFixed(2)} = €${(estimatedMonthlyNok * costoPromedioNok).toFixed(2)}`
        : `${estimatedMonthlyNok} NOK × €0.00 = €0.00 (sin productos activos)`,
      nota: costoPromedioNok > 0
        ? 'Costo basado en configuración de productos MAPEX'
        : 'Sin productos activos - pérdidas en cero',
      costo_promedio_usado: costoPromedioNok
    });

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString(),
      note: 'Datos estimados basados en producción actual (MAPEX no disponible)'
    });
  } catch (error) {
    console.error('❌ Error en resumen mensual:', error);
    return NextResponse.json({
      success: false,
      message: 'Error al obtener resumen mensual'
    }, { status: 500 });
  }
}


