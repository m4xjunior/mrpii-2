import { NextRequest, NextResponse } from 'next/server';

// Tipos baseados no contrato da API
interface ShiftSummary {
  cod_of: string;
  maquina: string;
  operador: string;
  turno: string;
  inicio: string;
  fin_previsto: string;
  fin_estimado: string;
  setup_min: number;
  kpi: {
    oee: number;
    disp: number;
    rdto: number;
    cal: number;
  };
  produccion: {
    ok: number;
    nok: number;
    rwk: number;
    total: number;
  };
  pp_min: number;
  pnp_min: number;
}

interface ShiftSeries {
  oee: Array<{ t: string; v: number }>;
  disp: Array<{ t: string; v: number }>;
  rdto: Array<{ t: string; v: number }>;
  cal: Array<{ t: string; v: number }>;
  produccion_tramos: Array<{
    t: string;
    ok: number;
    nok: number;
    rwk: number;
  }>;
}

interface ShiftIncident {
  ini: string;
  fin: string;
  tipo: 'PP' | 'PNP';
  causa_l1: string;
  causa_l2: string;
  operario: string;
  seg: number;
  obs: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    const shift = searchParams.get('shift') as 'noche' | 'mañana' | 'tarde';
    const excludeSetup = searchParams.get('excludeSetup') === 'true';

    if (!date || !shift) {
      return NextResponse.json({
        success: false,
        message: 'Parâmetros obrigatórios: date e shift'
      }, { status: 400 });
    }

    // Aqui você implementaria a lógica real para buscar dados do banco de dados
    // Por enquanto, retornamos dados mockados baseados na estrutura real

    // Simular busca no banco de dados
    const summary: ShiftSummary = {
      cod_of: `2025-SEC09-2678-${date}-${shift}`,
      maquina: 'M-001',
      operador: 'Fernanda',
      turno: shift,
      inicio: `${date}T${shift === 'noche' ? '22:00:00' : shift === 'mañana' ? '06:00:00' : '14:00:00'}Z`,
      fin_previsto: `${date}T${shift === 'noche' ? '06:00:00' : shift === 'mañana' ? '14:00:00' : '22:00:00'}Z`,
      fin_estimado: `${date}T${shift === 'noche' ? '05:45:00' : shift === 'mañana' ? '13:50:00' : '21:55:00'}Z`,
      setup_min: excludeSetup ? 0 : 45,
      kpi: {
        oee: excludeSetup ? 0.892 : 0.852,
        disp: excludeSetup ? 0.941 : 0.921,
        rdto: excludeSetup ? 0.895 : 0.875,
        cal: excludeSetup ? 0.958 : 0.948,
      },
      produccion: {
        ok: 1250,
        nok: 45,
        rwk: 12,
        total: 1307,
      },
      pp_min: excludeSetup ? 0 : 30,
      pnp_min: 60,
    };

    // Gerar séries temporais
    const series: ShiftSeries = {
      oee: [],
      disp: [],
      rdto: [],
      cal: [],
      produccion_tramos: [],
    };

    // Gerar dados por hora baseado no turno
    const startHour = shift === 'noche' ? 22 : shift === 'mañana' ? 6 : 14;
    const endHour = shift === 'noche' ? 6 : shift === 'mañana' ? 14 : 22;

    for (let hour = startHour; hour !== endHour; hour = (hour + 1) % 24) {
      const timestamp = `${date}T${hour.toString().padStart(2, '0')}:00:00Z`;

      series.oee.push({
        t: timestamp,
        v: excludeSetup ? 0.85 + Math.random() * 0.1 : 0.82 + Math.random() * 0.08
      });

      series.disp.push({
        t: timestamp,
        v: excludeSetup ? 0.92 + Math.random() * 0.05 : 0.89 + Math.random() * 0.06
      });

      series.rdto.push({
        t: timestamp,
        v: excludeSetup ? 0.87 + Math.random() * 0.08 : 0.84 + Math.random() * 0.07
      });

      series.cal.push({
        t: timestamp,
        v: excludeSetup ? 0.94 + Math.random() * 0.04 : 0.92 + Math.random() * 0.05
      });

      series.produccion_tramos.push({
        t: timestamp,
        ok: Math.floor(80 + Math.random() * 20),
        nok: Math.floor(1 + Math.random() * 5),
        rwk: Math.floor(Math.random() * 3),
      });

      if (hour === endHour) break; // Evitar loop infinito
    }

    // Gerar incidentes
    const incidents: ShiftIncident[] = [
      {
        ini: '14:15',
        fin: '14:45',
        tipo: 'PP',
        causa_l1: 'Cambio de herramienta',
        causa_l2: 'Mantenimiento preventivo',
        operario: 'Fernanda',
        seg: 1800,
        obs: 'Cambio programado de herramienta'
      },
      {
        ini: '15:45',
        fin: '16:05',
        tipo: 'PNP',
        causa_l1: 'Falla eléctrica',
        causa_l2: 'Cortocircuito en motor',
        operario: 'Fernanda',
        seg: 1200,
        obs: 'Falla en sistema eléctrico'
      },
      {
        ini: '16:22',
        fin: '16:34',
        tipo: 'PP',
        causa_l1: 'Ajuste de calidad',
        causa_l2: 'Calibración de sensores',
        operario: 'Fernanda',
        seg: 720,
        obs: 'Verificación de calidad programada'
      },
      {
        ini: '17:58',
        fin: '18:23',
        tipo: 'PP',
        causa_l1: 'Mantenimiento preventivo',
        causa_l2: 'Lubricación de componentes',
        operario: 'Fernanda',
        seg: 1500,
        obs: 'Mantenimiento preventivo semanal'
      },
      {
        ini: '19:12',
        fin: '19:27',
        tipo: 'PNP',
        causa_l1: 'Problema de material',
        causa_l2: 'Falta de suministro',
        operario: 'Fernanda',
        seg: 900,
        obs: 'Espera por reposición de material'
      },
    ];

    return NextResponse.json({
      success: true,
      summary,
      series,
      incidents,
    });

  } catch (error) {
    console.error('Erro na API shift-summary:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor'
    }, { status: 500 });
  }
}