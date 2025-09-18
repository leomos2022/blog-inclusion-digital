import { Outfit } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/Components/ToastProvider';

const outfit = Outfit({ subsets: ['latin'] ,weight:["400","500","600","700"] })

export const metadata = {
  title: 'Blog de Inclusión Digital',
  description: 'Aprende conceptos básicos de tecnología digital para la inclusión social',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <ToastProvider />
        {children}
      </body>
    </html>
  )
}
