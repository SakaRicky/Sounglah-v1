import React from 'react'
import { Button } from '@mantine/core';
import classNames from 'classnames';
import './Button.scss';

export interface AppButtonProps {
    variant?: 'primary' | 'secondary';
    hiddenFrom?: 'xs' | 'sm' | 'md';
    disabled?: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const AppButton: React.FC<AppButtonProps> = ({ variant, hiddenFrom, disabled, onClick, children }: AppButtonProps) => {
    const className = classNames('btn', `btn-${variant}`, {'btn-disabled': disabled})

    return (
        <Button
            onClick={onClick}
            className={className}
            hiddenFrom={hiddenFrom}
        >
            {children}
        </Button>
    )
}

export default AppButton
