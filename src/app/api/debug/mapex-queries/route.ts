import { NextRequest, NextResponse } from 'next/server';
import { testMapexQueries } from '../../../../../lib/data-processor';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testando queries MAPEX...');

    const result = await testMapexQueries();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        data: result.data,
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        message: result.message,
        error: result.data?.error,
        timestamp: new Date().toISOString()
      }, { status: 500 });
    }
  } catch (error) {
    console.error('❌ Erro no teste das queries MAPEX:', error);
    return NextResponse.json({
      success: false,
      message: 'Erro interno do servidor',
      error: error instanceof Error ? error.message : 'Erro desconhecido',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
