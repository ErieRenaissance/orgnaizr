import { Outlet } from 'react-router-dom';
import { Header } from './header';
import { NavigationMenu } from './navigation-menu';

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 flex">
        <NavigationMenu />
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}