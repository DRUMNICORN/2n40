import React from 'react';
import styles from './Header.module.scss';
import Hamburger from '../design/Hamburger';
import Logo from '../design/Logo';
import { useQuery } from '@/providers/QueryProvider';
import Controls from '../content/Controls';
import Title from './Title';
import Menu from './Menu';
import useHeader from './Header.hook';

const Header: React.FC = () => {
  const { setMenuOpen, setParam, toggleParam, menuOpen, handleHamburgerClick, handleTitleClick, handleSwap, handleKeyPress} = useHeader();
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
        <Controls param={param} setParam={setParam} toggleParam={toggleParam} handleSwap={handleSwap} handleKeyPress={handleKeyPress}/>
      </div>
      <Hamburger onClick={handleHamburgerClick} menuOpen={menuOpen} />
      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </nav>
  );
};

export default Header;
