import React, { useCallback, useMemo } from 'react';
import styles from './Controls.module.scss';
import { FaSearch } from 'react-icons/fa';
import Link from '../design/Link';
// import { VIEW_ICONS } from '@/app/defaults';
import List from './ContentList';
import { MetadataType, ViewType } from '@/app/types';
// import { VIEW_ICONS } from '@/app/defaults';
// import { useViewMode } from '@/hooks/useViewMode';

interface EntityFilterProps {
  // cycleViewMode: () => void;
  // mode: string;
  param: MetadataType;
  setParam: (key: any, value: string | string[] | null) => void;
  toggleParam: (key: any, value: string) => void;
}

const Controls: React.FC<EntityFilterProps> = React.memo(({ param, setParam, toggleParam }) => {
  // const nextMode = mode === ViewType.Carousel ? ViewType.CalendarDays : ViewType.Carousel;
  // const { mode, cycleViewMode} = useViewMode();
  // Memoized callbacks
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
          <Link onClick={handleSwap}>
            <FaSearch />
          </Link>
        </div>
        {/* <Link onClick={cycleViewMode} spinOnClick={true}>
          {VIEW_ICONS[mode]}
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
