#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Desplegando en Netlify...\n');

// Verificar que Netlify CLI esté instalado
try {
  execSync('netlify --version', { stdio: 'pipe' });
  console.log('✅ Netlify CLI encontrado');
} catch (error) {
  console.log('❌ Netlify CLI no encontrado. Instalando...');
  execSync('npm install -g netlify-cli', { stdio: 'inherit' });
}

// Crear archivo de configuración para Netlify
const netlifyConfig = `
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/api/:splat"
  status = 200

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`;

fs.writeFileSync('netlify.toml', netlifyConfig);

console.log('📝 Configuración de Netlify creada');

// Desplegar
try {
  console.log('🌐 Desplegando...');
  execSync('netlify deploy --prod', { stdio: 'inherit' });
  console.log('✅ Despliegue completado');
} catch (error) {
  console.log('❌ Error en el despliegue:', error.message);
  console.log('\n🔧 Solución manual:');
  console.log('1. Ve a https://app.netlify.com');
  console.log('2. Conecta tu repositorio de GitHub');
  console.log('3. Configura las variables de entorno');
  console.log('4. Despliega');
}
