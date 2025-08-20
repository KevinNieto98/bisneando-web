import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import Image from 'next/image';
import { FaCcVisa, FaCcMastercard, FaBitcoin, FaFacebook, FaInstagram, FaTiktok, FaPhone, FaEnvelope, FaShoppingCart } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-[#0A2A5E] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contacto */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contacto</h3>
          <p className="text-sm mb-2 flex items-center gap-2"><FaPhone /> 504 3190-4443</p>
          <p className="text-sm mb-2 flex items-center gap-2"><FaEnvelope /> servicioalcliente@bisneando.com</p>
          <p className="text-sm flex items-center gap-2"><FaShoppingCart /> compras@bisneando.com</p>
        </div>

        {/* Términos y Condiciones */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Términos y Condiciones</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shipping-policy" className="hover:underline">Políticas de Envío</Link></li>
            <li><Link href="/privacy-policy" className="hover:underline">Política de Privacidad</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:underline">Términos y Condiciones</Link></li>
          </ul>
        </div>

        {/* Métodos de Pago */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Métodos de Pago</h3>
          <div className="flex gap-4 text-3xl">
            <FaCcVisa />
            <FaCcMastercard />
            <FaBitcoin />
          </div>
        </div>

        {/* Redes Sociales */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Nuestras Redes Sociales</h3>
          <div className="flex gap-4 text-2xl">
            <Link href="https://facebook.com" target="_blank" aria-label="Facebook"><FaFacebook /></Link>
            <Link href="https://instagram.com" target="_blank" aria-label="Instagram"><FaInstagram /></Link>
            <Link href="https://tiktok.com" target="_blank" aria-label="TikTok"><FaTiktok /></Link>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-300 mt-8">
        <p>© Bisneando {new Date().getFullYear()}. Todos los derechos reservados</p>
      </div>
    </footer>
  )
}
