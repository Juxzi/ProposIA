import React from 'react';

function Main() {
  return (
    <main className="main container">
      <h2 className="hero-title">Générez vos documents professionnels en 2 minutes</h2>
      <p className="hero-subtitle">Votre assistant pour des démarches administratives simplifiées</p>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">✍️</div>
          <h3 className="feature-title">Modèles automatisés</h3>
          <p className="feature-desc">Choisissez un modèle adapté à vos besoins en quelques clics.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">🖋️</div>
          <h3 className="feature-title">Personnalisation aisée</h3>
          <p className="feature-desc">Ajoutez vos informations et générez un document sur mesure.</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon" aria-hidden="true">📤</div>
          <h3 className="feature-title">Export rapide</h3>
          <p className="feature-desc">Téléchargez votre document finalisé en un clin d'œil.</p>
        </div>
      </div>
      <button className="button-primary">Se connecter</button>
    </main>
  );
}

export default Main;
