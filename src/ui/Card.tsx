import React from 'react';
import { cn } from './utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
}

const Card: React.FC<CardProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
            {...props}
        >
            {children}
        </div>
    );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}

const CardHeader: React.FC<CardHeaderProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn('flex flex-col space-y-1.5 p-6', className)}
            {...props}
        >
            {children}
        </div>
    );
};

interface CardTitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
}

const CardTitle: React.FC<CardTitleProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <p
            className={cn('text-lg font-semibold leading-none tracking-tight', className)}
            {...props}
        >
            {children}
        </p>
    );
};

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
}

const CardDescription: React.FC<CardDescriptionProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <p
            className={cn('text-sm text-muted-foreground', className)}
            {...props}
        >
            {children}
        </p>
    );
};

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
}

const CardContent: React.FC<CardContentProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn('p-6 pt-0', className)}
            {...props}
        >
            {children}
        </div>
    );
};

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}

const CardFooter: React.FC<CardFooterProps> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div
            className={cn('flex items-center p-6 pt-0', className)}
            {...props}
        >
            {children}
        </div>
    );
};

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
