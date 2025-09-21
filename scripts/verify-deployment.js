#!/usr/bin/env node

import axios from 'axios';

const BASE_URL = process.env.RENDER_EXTERNAL_URL || process.env.VERCEL_URL || 'http://localhost:3000';

async function verifyDeployment() {
  console.log('🔍 Verificando despliegue...\n');

  const endpoints = [
    { name: 'Health Check', url: '/api/health' },
    { name: 'Blog API', url: '/api/blog' },
    { name: 'Questions API', url: '/api/questions' },
    { name: 'Email API', url: '/api/email' },
    { name: 'User Responses API', url: '/api/user-responses' },
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Verificando ${endpoint.name}...`);
      const response = await axios.get(`${BASE_URL}${endpoint.url}`, {
        timeout: 10000,
        headers: {
          'User-Agent': 'Deployment-Verifier/1.0'
        }
      });
      
      if (response.status === 200) {
        console.log(`✅ ${endpoint.name}: OK (${response.status})`);
      } else {
        console.log(`⚠️  ${endpoint.name}: Status ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        console.log(`❌ ${endpoint.name}: Error ${error.response.status} - ${error.response.statusText}`);
      } else if (error.code === 'ECONNREFUSED') {
        console.log(`❌ ${endpoint.name}: Conexión rechazada - ¿Está ejecutándose el servidor?`);
      } else {
        console.log(`❌ ${endpoint.name}: ${error.message}`);
      }
    }
  }

  console.log('\n🎯 Verificación completada');
  console.log('\n📋 URLs importantes:');
  console.log(`   Blog principal: ${BASE_URL}/`);
  console.log(`   Panel admin: ${BASE_URL}/admin`);
  console.log(`   Health check: ${BASE_URL}/api/health`);
  console.log(`   Sanity Studio: ${BASE_URL}/studio`);
  console.log('\n🔧 Variables de entorno requeridas:');
  console.log('   NEXT_PUBLIC_SANITY_PROJECT_ID');
  console.log('   NEXT_PUBLIC_SANITY_DATASET');
  console.log('   SANITY_API_TOKEN');
}

verifyDeployment().catch(console.error);
