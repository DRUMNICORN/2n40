import React from 'react';
import styles from './List.module.scss'; // Import SCSS module for styling
import Linked, { MetadataTypes } from '../util/Linked';

interface ListComponentProps {
  items: string[]; // Replace with your actual data type
  types?: string[];
  onClick?: (label: string, type: MetadataTypes) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({ items, types, onClick }) => {

  const handleClick = (label: string, type: MetadataTypes) => {
    if (onClick) {
      onClick(label, type);
    }
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.list}>
        {items.map((item, index) => {
          // ignore name
          if (((types ? types[index] : item[0]) as MetadataTypes) === 'name') {
            return null;
          }
          
          // check if item is an array
          if (Array.isArray(item)) {
            return (
              <div key={index} className={styles.listItem}>
                <Linked label={item[0]} type={(types ? types[index] : item[0]) as MetadataTypes} onClick={() => handleClick(item[0], (types ? types[index] : item[0]) as MetadataTypes)} />
                <ul className={styles.subList}>
                  {(item.slice(1) as unknown as string[]).map((subItem: string, subIndex: number) => (
                    <li key={subIndex} className={styles.subListItem}>
                      <Linked label={subItem} type={(types ? types[index] : subItem) as MetadataTypes} onClick={(e) => handleClick(subItem, (types ? types[index] : subItem) as MetadataTypes)} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <div key={index} className={styles.listItem}>
              {/* <Linked label={item} type={(types[index] as MetadataTypes)} onClick={onClick} /> */}
              <Linked label={item} type={(types ? types[index] : item[index]) as MetadataTypes} onClick={ (e) => handleClick(item, (types ? types[index] : item[index]) as MetadataTypes )} />
            </div>
          )
        }
        )}
      </div>
    </div>
  );
};

export default ListComponent;
