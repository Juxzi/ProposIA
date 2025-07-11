import React from 'react';

function Header() {
  return (
    <header className="header">
      <div className="container header-content">
        <div className="logo-title">
          <img src="/proposia.png" alt="Logo Proposia" />
          <span className="app-title">Proposia</span>
        </div>
        <button className="button-primary">Se connecter</button>
      </div>
    </header>
  );
}

export default Header;
