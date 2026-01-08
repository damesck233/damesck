import { ReactNode } from 'react';

interface AppleStyleIconProps {
    children: ReactNode;
    colorScheme?: 'blue' | 'indigo' | 'purple' | 'pink' | 'orange' | 'green' | 'teal' | 'gray' | 'red' | 'yellow';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const AppleStyleIcon = ({
    children,
    colorScheme = 'blue',
    size = 'md',
    className = ''
}: AppleStyleIconProps) => {
    const sizeClasses = {
        sm: 'w-8 h-8 rounded-lg',
        md: 'w-10 h-10 rounded-xl',
        lg: 'w-12 h-12 rounded-2xl',
        xl: 'w-16 h-16 rounded-[20px]'
    };

    const colorStyles = {
        blue: 'bg-blue-500 shadow-blue-500/30',
        indigo: 'bg-indigo-500 shadow-indigo-500/30',
        purple: 'bg-purple-500 shadow-purple-500/30',
        pink: 'bg-pink-500 shadow-pink-500/30',
        orange: 'bg-orange-500 shadow-orange-500/30',
        green: 'bg-green-500 shadow-green-500/30',
        teal: 'bg-teal-500 shadow-teal-500/30',
        gray: 'bg-gray-500 shadow-gray-500/30',
        red: 'bg-red-500 shadow-red-500/30',
        yellow: 'bg-yellow-500 shadow-yellow-500/30'
    };

    return (
        <div className={`
      relative flex items-center justify-center 
      shadow-lg ${sizeClasses[size]} ${colorStyles[colorScheme]} 
      text-white ${className}
    `}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-50 rounded-[inherit]"></div>
            <div className="relative z-10 w-1/2 h-1/2">
                {children}
            </div>
        </div>
    );
};

export const AppleLearningIcon = ({ className }: { className?: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path d="M11.7 2.805a.75.75 0 01.6 0A60.65 60.65 0 0122.83 8.72a.75.75 0 01-.231 1.337 49.949 49.949 0 00-9.902 3.912l-.003.002-.34.18a.75.75 0 01-.707 0A50.009 50.009 0 007.553 12c-.199-.074-.398-.147-.599-.22l-.355-.13a.75.75 0 010-1.415c.516-.188 1.034-.377 1.553-.565l.59-.214a51.155 51.155 0 018.66-2.583c-2.73-1.01-5.69-1.92-8.527-2.738a53.791 53.791 0 00-4.665-1.127.75.75 0 01.45-1.442c1.78.556 3.498 1.156 5.143 1.782l.334.129.626.239z" />
            <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75 51.585 51.585 0 009.682 3.79l.36.128c.196.07.394.138.591.205.216.072.411.137.587.193.35.112.634.205.856.28.441.148.783.275 1.05.378a.75.75 0 11-.53 1.405c-.214-.081-.497-.184-1.077-.38-.215-.072-.53-.178-1.002-.33a49.19 49.19 0 01-1.32-.477 50.115 50.115 0 01-10.208-4.12.75.75 0 01-.75-.75z" clipRule="evenodd" />
            <path d="M2.52 14.331a.75.75 0 01.53.943 51.579 51.579 0 001.323 5.483.75.75 0 01-1.478.262 50.096 50.096 0 01-1.318-5.745.75.75 0 01.943-.943z" />
        </svg>
    )
}
