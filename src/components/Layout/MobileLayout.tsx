import { type ReactNode } from 'react';

interface MobileLayoutProps {
  children: ReactNode;
}

function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="w-full max-w-[430px] min-h-screen bg-white shadow-lg">
      {children}
    </div>
  );
}

export default MobileLayout;
