import React from 'react';
import styles from './Impressum.module.scss';
import { ContentTypes } from '@/app/types';
import Linked from '@/components/util/Linked';

const Impressum: React.FC = () => {
  return (
    <div className={styles.impressumPage}>
      <div className={styles.impressumContainer}>
        <h1>Impressum</h1>

        <div className={styles.sectionsContainer}>
          <section className={styles.section}>
            <h2>Haftungsausschluss (Disclaimer)</h2>
            <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.</p>
            <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.</p>
            <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
          </section>

          <section className={styles.section}>
            <h2>Urheberrecht</h2>
            <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
          </section>

          <section className={styles.section}>
            <h2>Datenschutz</h2>
            <ul className={styles.privacyList}>
              <li>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich.</li>
              <li>Soweit personenbezogene Daten erhoben werden, erfolgt dies auf freiwilliger Basis.</li>
              <li>Personenbezogene Daten werden nicht ohne Ihre ausdrückliche Zustimmung an Dritte weitergegeben.</li>
              <li>Keine Nutzung von Kontaktdaten für unaufgeforderte Werbung und Informationsmaterialien.</li>
            </ul>
          </section>
        </div>

        <div className={styles.personCard}>
          <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV und Angaben gemäß § 5 TMG:</h2>
          <div className={styles.personalInfo}>
            <Linked type={ContentTypes.name} label="Robin Seerig" />
            <Linked type={ContentTypes.tel} label="+4917632583072" />
            <Linked type={ContentTypes.mail} label="robin@seerig.de" />
            <Linked type={ContentTypes.address} label="Erich Mühsam Straße 6 09112 Chemnitz" />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Impressum;
