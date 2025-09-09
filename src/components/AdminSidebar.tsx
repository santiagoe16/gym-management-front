"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoLine from "../../public/logoLinefit.png";
import { useAuth } from "@/context/authContext";
import { usePathname } from "next/navigation";

export default function AdminSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const getLinkClassName = (path:any) => {
    const isActive = pathname === path;
    return `flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group ${
      isActive ? "bg-gray-200 hover:bg-gray-200" : ""
    }`;
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleSidebar}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-hidden focus:ring-2 ring-2 ring-gray-300 z-50 relative"
        aria-controls="logo-sidebar"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Toggle sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/50  z-30 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-[#fafafa] shadow-[1px_0px_8px_rgba(0,0,0,0.1)]">
          <Link
            href="/admin/daily"
            className={`flex items-center ps-2 mb-5 ${
              isOpen ? "pt-12" : "pt-4"
            }`}
          >
            <Image
              src={logoLine}
              className="h-15 w-44 me-3"
              alt="Line fitness logo"
              priority
            />
          </Link>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/daily"
                className={getLinkClassName("/admin/daily")}
                onClick={closeSidebar}
              >
                <svg
                  className="w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64zM160 304L160 336C160 344.8 167.2 352 176 352L208 352C216.8 352 224 344.8 224 336L224 304C224 295.2 216.8 288 208 288L176 288C167.2 288 160 295.2 160 304zM288 304L288 336C288 344.8 295.2 352 304 352L336 352C344.8 352 352 344.8 352 336L352 304C352 295.2 344.8 288 336 288L304 288C295.2 288 288 295.2 288 304zM432 288C423.2 288 416 295.2 416 304L416 336C416 344.8 423.2 352 432 352L464 352C472.8 352 480 344.8 480 336L480 304C480 295.2 472.8 288 464 288L432 288zM160 432L160 464C160 472.8 167.2 480 176 480L208 480C216.8 480 224 472.8 224 464L224 432C224 423.2 216.8 416 208 416L176 416C167.2 416 160 423.2 160 432zM304 416C295.2 416 288 423.2 288 432L288 464C288 472.8 295.2 480 304 480L336 480C344.8 480 352 472.8 352 464L352 432C352 423.2 344.8 416 336 416L304 416zM416 432L416 464C416 472.8 423.2 480 432 480L464 480C472.8 480 480 472.8 480 464L480 432C480 423.2 472.8 416 464 416L432 416C423.2 416 416 423.2 416 432z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Resumen Diario
                </span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/users"
                className={getLinkClassName("/admin/users")}
                onClick={closeSidebar}
              >
                <svg
                  className=" w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/gyms"
                className={getLinkClassName("/admin/gyms")}
                onClick={closeSidebar}
              >
                <svg
                  className="w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M96 176C96 149.5 117.5 128 144 128C170.5 128 192 149.5 192 176L192 288L448 288L448 176C448 149.5 469.5 128 496 128C522.5 128 544 149.5 544 176L544 192L560 192C586.5 192 608 213.5 608 240L608 288C625.7 288 640 302.3 640 320C640 337.7 625.7 352 608 352L608 400C608 426.5 586.5 448 560 448L544 448L544 464C544 490.5 522.5 512 496 512C469.5 512 448 490.5 448 464L448 352L192 352L192 464C192 490.5 170.5 512 144 512C117.5 512 96 490.5 96 464L96 448L80 448C53.5 448 32 426.5 32 400L32 352C14.3 352 0 337.7 0 320C0 302.3 14.3 288 32 288L32 240C32 213.5 53.5 192 80 192L96 192L96 176z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Gimnasios</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/trainers"
                className={getLinkClassName("/admin/trainers")}
                onClick={closeSidebar}
              >
                <svg
                  className="w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Entrenadores
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/trainers-activity"
                className={getLinkClassName("/admin/trainers-activity")}
                onClick={closeSidebar}
              >
                <svg
                  className="w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                  fill="currentColor"
                >
                  <path d="M88 289.6L64.4 360.2L64.4 160C64.4 124.7 93.1 96 128.4 96L267.1 96C280.9 96 294.4 100.5 305.5 108.8L343.9 137.6C349.4 141.8 356.2 144 363.1 144L480.4 144C515.7 144 544.4 172.7 544.4 208L544.4 224L179 224C137.7 224 101 250.4 87.9 289.6zM509.8 512L131 512C98.2 512 75.1 479.9 85.5 448.8L133.5 304.8C140 285.2 158.4 272 179 272L557.8 272C590.6 272 613.7 304.1 603.3 335.2L555.3 479.2C548.8 498.8 530.4 512 509.8 512z" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap">
                  Entrenadores actividad
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className={getLinkClassName("/admin/products")}
                onClick={closeSidebar}
              >
                <svg
                  className="w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M256 144C256 108.7 284.7 80 320 80C355.3 80 384 108.7 384 144L384 192L256 192L256 144zM208 192L144 192C117.5 192 96 213.5 96 240L96 448C96 501 139 544 192 544L448 544C501 544 544 501 544 448L544 240C544 213.5 522.5 192 496 192L432 192L432 144C432 82.1 381.9 32 320 32C258.1 32 208 82.1 208 144L208 192zM232 240C245.3 240 256 250.7 256 264C256 277.3 245.3 288 232 288C218.7 288 208 277.3 208 264C208 250.7 218.7 240 232 240zM384 264C384 250.7 394.7 240 408 240C421.3 240 432 250.7 432 264C432 277.3 421.3 288 408 288C394.7 288 384 277.3 384 264z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Productos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/plans"
                className={getLinkClassName("/admin/plans")}
                onClick={closeSidebar}
              >
                <svg
                  className="w-5 h-5 ms-[6px] text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Planes</span>
              </Link>
            </li>

            <li>
              <button
                onClick={() => {
                  closeSidebar();
                  logout();
                }}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-200 group w-full text-left"
              >
                <svg
                  className="w-7 h-7 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 640"
                >
                  <path d="M224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L160 96C107 96 64 139 64 192L64 448C64 501 107 544 160 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480C142.3 480 128 465.7 128 448L128 192C128 174.3 142.3 160 160 160L224 160zM566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L438.6 169.3C426.1 156.8 405.8 156.8 393.3 169.3C380.8 181.8 380.8 202.1 393.3 214.6L466.7 288L256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L466.7 352L393.3 425.4C380.8 437.9 380.8 458.2 393.3 470.7C405.8 483.2 426.1 483.2 438.6 470.7L566.6 342.7z" />
                </svg>

                <span className="flex-1 ms-2 whitespace-nowrap">
                  Cerrar sesión
                </span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Área del contenido principal de la página */}
      <div className="sm:ml-64 bg-[#fafafa]">{children}</div>
    </>
  );
}
