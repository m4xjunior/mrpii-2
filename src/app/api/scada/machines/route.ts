import { NextRequest, NextResponse } from "next/server";
import { MachineStatus } from "../../../../../types/machine";
import { getMachinesStatus } from "../../../../../lib/data-processor";

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Iniciando busca de máquinas (pipeline consolidado)...');
    const machineStatuses: MachineStatus[] = await getMachinesStatus();

    return NextResponse.json({
      success: true,
      data: machineStatuses,
      count: machineStatuses.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Erro ao buscar máquinas:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erro ao conectar com banco de dados",
        message: error instanceof Error ? error.message : "Erro desconhecido",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
