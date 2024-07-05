import React from 'react';
import styles from './Controls.module.scss';
import Linked from '../../util/Linked';
import InputField from '@/components/util/InputField';
import ListComponent from '../../view/ListComponent';
import { MetadataType } from '@/exports/interfaces';
import { ContentTypes } from '@/exports/enums';

interface ControlsComponentProps {
    param: MetadataType;
    handleSwap: () => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    setParam: (key: any, value: string | string[] | null) => void;
    toggleParam: (key: any, value: string) => void;
    metadataEntries?: string[];
}

const Controls: React.FC<ControlsComponentProps> = ({
    param,
    handleSwap,
    handleKeyPress,
    setParam,
    toggleParam,
    metadataEntries,
}) => {
    const filterEntitiesClasses = `${styles.filterEntities} ${(metadataEntries || []).length > 0 ? '' : styles.empty}`;

    return (
        <div className={styles.filter}>
            <div className={styles.filterSearchContainer}>
                <InputField
                    value={param.name as string || ''}
                    placeholder=""
                    onChange={(e) => setParam('name', e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <div className={styles.filterSearchIcon}>
                    <Linked onClick={handleSwap} type={ContentTypes.search} />
                </div>
                <div className={filterEntitiesClasses}>
                    <ListComponent
                        items={metadataEntries || []}
                        onClick={(label, type) => {
                            toggleParam('connections', label);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default React.memo(Controls);
