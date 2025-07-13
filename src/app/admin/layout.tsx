'use client'

import Sidebar from '@/components/Sidebar'
import LayoutContainer from '@/layouts/LayoutContainer'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Sidebar>
      <main className="min-h-screen bg-gray-100">
        <LayoutContainer>{children}</LayoutContainer>
      </main>
    </Sidebar>
  )
}