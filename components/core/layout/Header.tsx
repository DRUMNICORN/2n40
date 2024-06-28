import React from 'react';
import styles from './Header.module.scss';
import Hamburger from '../design/Hamburger';
import Logo from '../design/Logo';
import useHeader from '@/hooks/useHeader';
import { useQuery } from '@/providers/QueryProvider';
import ControlsContainer from '../content/ControlsContainer';
import Title from './Title';
import Menu from './Menu';

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
        <ControlsContainer param={param} setParam={setParam} toggleParam={toggleParam} />
      </div>
      <Hamburger onClick={handleHamburgerClick} menuOpen={menuOpen} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
};

export default Header;
