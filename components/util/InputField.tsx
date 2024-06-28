import React from 'react';
import styles from './InputField.module.scss';

interface InputFieldProps {
    value: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
    value,
    placeholder = '',
    onChange,
    onKeyPress,
}) => {
    return (
        <input
            className={styles.inputField}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyPress={onKeyPress}
            autoFocus
        />
    );
};

export default InputField;
