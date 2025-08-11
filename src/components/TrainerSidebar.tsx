"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from 'next/image';
import logoLine from '../../public/logoLinefit.png';
import { useAuth } from "@/context/authContext";

export default function TrainerSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
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
          className="fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-50 z-30 sm:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50">
          <a
            href=""
            className={`flex items-center ps-2 mb-5 ${
              isOpen ? "pt-12" : "pt-4"
            }`}
          >
            <Image
              src={logoLine}
              className="h-15 w-44 me-3"
              alt="Line fitness logo"
            />
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/trainer/users"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                onClick={closeSidebar}
              >
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Usuarios</span>
              </Link>
            </li>
            <li>
              <Link
                href="/trainer/products"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                onClick={closeSidebar}
              >
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Productos</span>
              </Link>
            </li>
            <li>
              <Link
                href="/trainer/daily"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                onClick={closeSidebar}
              >
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 7h12v9H4V7z"/>
                  <path d="M7 10h2v2H7v-2zm4 0h2v2h-2v-2z"/>
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Resumen Diario</span>
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  closeSidebar();
                  logout();
                }}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group w-full text-left"
              >
                <svg
                  className="shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="1 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                  />
                </svg>
                <span className="flex-1 ms-2 whitespace-nowrap">Cerrar sesión</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Área del contenido principal de la página */}
      <div className="p-4 sm:ml-64">{children}</div>
    </>
  );
}
