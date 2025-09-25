
import { NextResponse } from 'next/server';
import { executeQuery } from 'lib/database/connection';

const GET_MAQUINAS_QUERY = `
    SELECT 
        Id_maquina,
        Cod_maquina,
        Desc_maquina
    FROM 
        cfg_maquina
    WHERE 
        Activo = 1
    ORDER BY 
        Cod_maquina;
`;

export async function GET() {
  try {
    const result = await executeQuery<{ Id_maquina: number; Cod_maquina: string; Desc_maquina: string }>(GET_MAQUINAS_QUERY);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error al obtener la lista de máquinas:', error);
    const errorMessage = (error instanceof Error) ? error.message : 'Error desconocido en el servidor';
    return NextResponse.json({ error: 'Error al obtener la lista de máquinas.', details: errorMessage }, { status: 500 });
  }
}
