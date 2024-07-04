import React from 'react';
import styles from './List.module.scss'; // Import SCSS module for styling
import { ContentTypes } from '@/utils/enums';
import Linked from '../util/Linked';

interface ListComponentProps {
  items: string[]; // Replace with your actual data type
  types?: string[];
  onClick?: (label: string, type: ContentTypes) => void;
}

const ListComponent: React.FC<ListComponentProps> = ({ items, types, onClick }) => {

  const handleClick = (label: string, type: ContentTypes) => {
    if (onClick) {
      onClick(label, type);
    }
  };

  return (
    <div className={styles.listContainer}>
      <div className={styles.list}>
        {items.map((item, index) => {
          if (['name', 'location'].includes((types ? types[index] : item[0]) as ContentTypes)) {
            return null;
          }
          
          if (Array.isArray(item)) {
            return (
              <div key={index} className={styles.listItem}>
                <Linked text href={item[0]} type={(types ? types[index] : item[0]) as ContentTypes} onClick={() => handleClick(item[0], (types ? types[index] : item[0]) as ContentTypes)} />
                <ul className={styles.subList}>
                  {(item.slice(1) as unknown as string[]).map((subItem: string, subIndex: number) => (
                    <li key={subIndex} className={styles.subListItem}>
                      <Linked text href={subItem} type={(types ? types[index] : subItem) as ContentTypes} onClick={(e) => handleClick(subItem, (types ? types[index] : subItem) as ContentTypes)} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          }

          return (
            <div key={index} className={styles.listItem}>
              <Linked text href={item} type={(types ? types[index] : item[index]) as ContentTypes} onClick={ (e) => handleClick(item, (types ? types[index] : item[index]) as ContentTypes )} />
            </div>
          )
        }
        )}
      </div>
    </div>
  );
};

export default ListComponent;
