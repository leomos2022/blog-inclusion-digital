import { assets } from '@/Assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <header className="py-8 px-5 md:px-12 lg:px-28">
      {/* Top: Logo + Botón */}
      <div className="flex justify-between items-center mb-8">
        <Image 
          src={assets.logo} 
          width={180} 
          height={60}
          alt="Logo"
          className="object-contain"
        />

        {/* Botón Get started */}
        <button className="flex items-center gap-2 font-medium py-3 px-6 border-2 border-black bg-white text-black shadow-[4px_4px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:bg-black hover:text-white active:shadow-none active:translate-x-[2px] active:translate-y-[2px]">
          Inicio
          <Image 
            src={assets.arrow} 
            alt="Arrow icon" 
            width={18} 
            height={18} 
          />
        </button>
      </div>

      {/* Sección Blogs (título + descripción + newsletter) */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">Últimos Blogs</h1>

        <p className="text-gray-600 max-w-2xl mx-auto mb-8 text-base sm:text-lg leading-relaxed">
          Crear un correo electrónico es el primer paso para acceder a la mayoría de servicios digitales. 
          Solo necesitas elegir un nombre de usuario, una contraseña segura y completar unos pocos datos personales. 
          Con tu email podrás registrarte en aplicaciones, recibir notificaciones y mantenerte comunicado.
        </p>

        {/* Input + Botón unificados — con margen inferior claro */}
        <div className="flex justify-center mb-16">
          <div className="flex w-[340px] sm:w-[450px] border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            <input
              type="email"
              placeholder="Ingresa tu correo"
              className="flex-grow px-4 py-3 text-base sm:text-lg outline-none placeholder-gray-500"
            />
            <button className="px-6 py-3 font-medium text-base sm:text-lg bg-black text-white transition-colors duration-200 hover:bg-gray-800 active:bg-black">
              Suscríbete
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
