import { CarouselBanner, Footer, Sidebar, TopMenu } from '@/components';
import { HeroUIProvider } from '@heroui/react';

export default function ShopLayout({ children }: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <HeroUIProvider>

        <TopMenu />
        <Sidebar />

        <div className="px-0 sm:px-10">

          {children}

        </div>

        <Footer />
      </HeroUIProvider>
    </main>
  );
}