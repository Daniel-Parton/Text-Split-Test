import React from 'react';
import Header from './header';
import Footer from './footer';


export interface LayoutProps { }

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='main-content'>
      <Header brandText='Text Split' />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
