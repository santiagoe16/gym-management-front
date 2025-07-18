'use client'

import TrainerSidebar from '@/components/TrainerSidebar'
import LayoutContainer from '@/layouts/LayoutContainer'

export default function TrainerLayout({ children }: { children: React.ReactNode }) {
  return (
    <TrainerSidebar>
      <main className="bg-gray-100">
        <LayoutContainer>{children}</LayoutContainer>
      </main>
    </TrainerSidebar>
  )
}