import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

interface ProductionData {
  machineId: string;
  machineName: string;
  ok: number;
  nok: number;
  rw: number;
  total: number;
  efficiency: number;
  timestamp: string;
  operator?: string;
  shift?: string;
}

interface ProductionSummary {
  totalOk: number;
  totalNok: number;
  totalRw: number;
  totalProduction: number;
  averageEfficiency: number;
  machines: ProductionData[];
  timestamp: string;
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Buscando datos de producción...');

    // Simular datos de producción (en producción vendría de la BD)
    const productionData = await getProductionData();

    // Guardar datos en JSON para histórico
    await saveProductionData(productionData);

    return NextResponse.json({
      success: true,
      data: productionData,
      summary: calculateSummary(productionData),
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error al buscar datos de producción:', error);

    return NextResponse.json({
      success: false,
      error: 'Error al conectar con banco de datos',
      message: error instanceof Error ? error.message : 'Error desconocido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

async function getProductionData(): Promise<ProductionData[]> {
  // Simular datos de producción (reemplazar con consulta real a BD)
  const machines = [
    { id: 'DOBL01', name: 'Dobladora 01', baseOk: 8500, baseNok: 45, baseRw: 12 },
    { id: 'DOBL02', name: 'Dobladora 02', baseOk: 9200, baseNok: 38, baseRw: 8 },
    { id: 'SOLD01', name: 'Soldadura 01', baseOk: 7800, baseNok: 52, baseRw: 15 },
    { id: 'SOLD02', name: 'Soldadura 02', baseOk: 8100, baseNok: 41, baseRw: 11 },
    { id: 'TROQ01', name: 'Troqueladora 01', baseOk: 7600, baseNok: 35, baseRw: 9 },
    { id: 'TERM01', name: 'Terminación 01', baseOk: 8900, baseNok: 47, baseRw: 13 },
  ];

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  // Simular variación por minuto
  const minuteVariation = Math.sin((currentHour * 60 + currentMinute) / 100) * 100;

  return machines.map(machine => ({
    machineId: machine.id,
    machineName: machine.name,
    ok: Math.floor(machine.baseOk + minuteVariation + Math.random() * 50),
    nok: Math.floor(machine.baseNok + Math.random() * 10),
    rw: Math.floor(machine.baseRw + Math.random() * 5),
    total: 0, // Se calculará en el summary
    efficiency: Math.round(85 + Math.random() * 15),
    timestamp: now.toISOString(),
    operator: `Operador ${Math.floor(Math.random() * 10) + 1}`,
    shift: currentHour < 14 ? 'Mañana' : currentHour < 22 ? 'Tarde' : 'Noche'
  }));
}

async function saveProductionData(data: ProductionData[]): Promise<void> {
  try {
    const dataDir = path.join(process.cwd(), 'data', 'production');
    const fileName = `${new Date().toISOString().split('T')[0]}.json`;

    // Crear directorio si no existe
    await fs.mkdir(dataDir, { recursive: true });

    // Leer datos existentes
    let existingData: ProductionData[] = [];
    try {
      const existingFile = await fs.readFile(path.join(dataDir, fileName), 'utf-8');
      existingData = JSON.parse(existingFile);
    } catch (error) {
      // El archivo no existe, se creará uno nuevo
    }

    // Agregar nuevos datos
    existingData.push(...data);

    // Guardar archivo
    await fs.writeFile(
      path.join(dataDir, fileName),
      JSON.stringify(existingData, null, 2),
      'utf-8'
    );

    console.log('💾 Datos de producción guardados en:', path.join(dataDir, fileName));
  } catch (error) {
    console.error('❌ Error al guardar datos de producción:', error);
  }
}

function calculateSummary(data: ProductionData[]): ProductionSummary {
  const totalOk = data.reduce((sum, item) => sum + item.ok, 0);
  const totalNok = data.reduce((sum, item) => sum + item.nok, 0);
  const totalRw = data.reduce((sum, item) => sum + item.rw, 0);
  const totalProduction = totalOk + totalNok + totalRw;
  const averageEfficiency = data.reduce((sum, item) => sum + item.efficiency, 0) / data.length;

  // Actualizar totales en cada máquina
  data.forEach(item => {
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
