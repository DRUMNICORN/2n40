import React from 'react';
import styles from './Header.module.scss';
import Title from '../design/Title';
import Hamburger from '../design/Hamburger';
import Menu from '../layout/Menu';
import Controls from '../layout/Controls';
import Logo from '../design/Logo';
import useHeader from '@/hooks/useHeader';
import { useQuery } from '@/providers/QueryProvider';
import Link from '../design/Link';

const Header: React.FC = () => {
  const { setMenuOpen, setParam, toggleParam, menuOpen, handleHamburgerClick, handleTitleClick } = useHeader();
  const { param } = useQuery();

  return (
    <nav className={styles.header}>
      <div className={styles.logo}>
          <Logo />
      </div>
      <div className={styles.name}>
        <Title onClick={handleTitleClick} />
      </div>
      <div className={styles.controls}>
        <Controls param={param} setParam={setParam} toggleParam={toggleParam} />
      </div>
      <Hamburger onClick={handleHamburgerClick} menuOpen={menuOpen} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
};

export default Header;
