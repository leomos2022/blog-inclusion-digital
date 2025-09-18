import { NextResponse } from 'next/server';
import { ConnectDB } from '@/lib/config/db';

export async function GET() {
  try {
    // Verificar conexión a la base de datos
    await ConnectDB();
    
    return NextResponse.json({ 
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      version: '1.0.0'
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json({ 
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message
    }, { status: 500 });
  }
}
