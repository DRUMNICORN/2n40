import React, { useState } from 'react';
import styles from './ContentList.module.scss';
import { MdAdd, MdTag, MdEdit, MdUndo } from 'react-icons/md';
import Linked from '../design/Linked';
import { MetadataType, MetadataTypes } from '@/app/types';
import { REACT_ICONS } from '@/app/Icons';


interface ListViewProps {
  metadataEntries: MetadataType | string[];
  isEditable?: boolean;
  onEntryClick?: (entry: MetadataType | string) => void;
  onMetadataChange?: (entries: MetadataType) => void;
  disableClick?: boolean;
  selectedKeys?: string[];
  excludedKeys?: string[];
}

const List: React.FC<ListViewProps> = ({
  metadataEntries = {},
  isEditable = false,
  onEntryClick,
  onMetadataChange,
  disableClick = false,
  selectedKeys = [],
  excludedKeys = ['name', 'date', 'image', 'trackUrl'],
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newEntryKey, setNewEntryKey] = useState('');
  const [newEntryValue, setNewEntryValue] = useState('');

  const addEntry = () => setIsAdding(true);
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewEntryKey(e.target.value);
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewEntryValue(e.target.value);
  const handleBlur = () => setIsAdding(false);
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && newEntryKey && newEntryValue) {
      const updatedEntries = { ...metadataEntries, [newEntryKey]: newEntryValue };
      setNewEntryKey('');
      setNewEntryValue('');
      setIsAdding(false);
      if (onMetadataChange) onMetadataChange(updatedEntries as MetadataType);
    }
  };

  const determineIcon = (content: string): keyof typeof REACT_ICONS => {
    let iconKey = MetadataTypes.website;
    for (const social of Object.values(MetadataTypes)) {
      if (content.includes(social)) {
        iconKey = social;
        break;
      }
    }
    return iconKey;
  };

  const removeEntry = (key: string) => {
    if (typeof metadataEntries === 'string') return;

    const { [key]: _, ...remainingEntries } = metadataEntries as MetadataType;

    if (onMetadataChange) onMetadataChange(remainingEntries as MetadataType);
  };

  return (
    <div className={styles.metadataView} onDrag={
      e => {
        e.preventDefault();
        e.stopPropagation();
      }
    } onTouchMove={e => { e.preventDefault(); e.stopPropagation(); }}>
      {Object.entries(metadataEntries || {}).map(([key, value], index) => {
        const entryContent = `${value.toString()}`;
        const iconKey = (key ||  determineIcon(entryContent)) as keyof typeof REACT_ICONS;
        const icon = typeof value === 'string' && REACT_ICONS[iconKey];

        if (excludedKeys.includes(key)) return null;

        return (
          <Linked
            key={index}
            // preventDefault
            // stopPropagation
            disableClick={disableClick}
            // noName
            onClick={() => {
              if (isEditable) {
                removeEntry(key);
              } else if (onEntryClick) {
                if (typeof metadataEntries !== 'string') onEntryClick(value as string);
                else onEntryClick({ [key]: value });
              }
            }}
            label={entryContent}
            type={key as MetadataTypes}
          >
            {icon ? icon : <MdTag />}
          </Linked>
        );
      })}
    </div>
  );
};

export default List;
