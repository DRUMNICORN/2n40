import React, { useCallback, useMemo } from 'react';
import styles from './Controls.module.scss';
import { FaSearch } from 'react-icons/fa';
import Linked from '../design/Linked';
// import { REACT_ICONS } from '@/app/defaults';
import List from './ContentList';
import { MetadataType, MetadataTypes } from '@/app/types';
// import { REACT_ICONS } from '@/app/defaults';
// import { useViewMode } from '@/hooks/useViewMode';

interface EntityFilterProps {
  param: MetadataType;
  setParam: (key: any, value: string | string[] | null) => void;
  toggleParam: (key: any, value: string) => void;
}

const Controls: React.FC<EntityFilterProps> = React.memo(({ param, setParam, toggleParam }) => {
  const handleSwap = useCallback(() => {
    if (!param) return;
    let name = param.name;
    if (param.name) toggleParam('connections', name as string);
    // setParam('name', '');
  }, [param, toggleParam]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSwap();
    }
  }, [handleSwap]);

  // Memoized metadataEntries derived from param.connections
  const metadataEntries = useMemo(() => param?.connections || [], [param]) as string[];

  const filterEntitiesClasses = `${styles.filterEntities} ${metadataEntries.length > 0 ? '' : styles.empty}`;

  return (
    <div className={styles.filter}>
      <div className={styles.filterSearchContainer}>
        <input
          className={styles.filterSearch}
          type="text"
          placeholder=""
          autoFocus
          value={param.name || ''}
          onChange={(e) => setParam('name', e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className={styles.filterSearchIcon} >
          <Linked onClick={handleSwap}>
            <FaSearch />
          </Linked>
        </div>
        {/* <Link onClick={cycleViewMode} spinOnClick={true}>
          {REACT_ICONS[mode]}
        </Link> */}
      </div>
      <div className={filterEntitiesClasses}>
        <List
          metadataEntries={metadataEntries}
          // disableClick={true}
          onEntryClick={(element) => toggleParam('connections', element as string)}
        />
      </div>
    </div>
  );
});

export default Controls;
