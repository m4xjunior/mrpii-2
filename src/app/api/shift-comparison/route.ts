import { NextRequest, NextResponse } from 'next/server';

// Tipos para a comparação de turnos
interface ShiftComparisonData {
  turno: string;
  oee: number;
  disp: number;
  rdto: number;
  cal: number;
  horas_pp: number;
  horas_pnp: number;
  top_causa_pnp: string;
  piezas_ok: number;
  piezas_nok: number;
  piezas_rwk: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || new Date().toISOString().split('T')[0];

    // Aqui você implementaria a lógica real para buscar dados do banco de dados
    // Por enquanto, retornamos dados mockados baseados na estrutura real

    const shifts: ShiftComparisonData[] = [
      {
        turno: 'Noche',
        oee: 68.5,
        disp: 85.2,
        rdto: 78.9,
        cal: 92.1,
        horas_pp: 2.5,
        horas_pnp: 4.8,
        top_causa_pnp: 'Falla Mecánica',
        piezas_ok: 1250,
        piezas_nok: 45,
        piezas_rwk: 12,
      },
      {
        turno: 'Mañana',
        oee: 72.3,
        disp: 88.7,
        rdto: 82.4,
        cal: 94.8,
        horas_pp: 1.8,
        horas_pnp: 3.2,
        top_causa_pnp: 'Cambio de Herramienta',
        piezas_ok: 1380,
        piezas_nok: 32,
        piezas_rwk: 8,
      },
      {
        turno: 'Tarde',
        oee: 65.8,
        disp: 82.1,
        rdto: 76.5,
        cal: 90.3,
        horas_pp: 3.1,
        horas_pnp: 5.9,
        top_causa_pnp: 'Problema Eléctrico',
        piezas_ok: 1180,
        piezas_nok: 58,
        piezas_rwk: 15,
      },
    ];

    return NextResponse.json({
      success: true,
      data: shifts,
      date: date,
    });

  } catch (error) {
    console.error('Error en API shift-comparison:', error);
    return NextResponse.json({
      success: false,
      message: 'Error interno del servidor'
    }, { status: 500 });
  }
}