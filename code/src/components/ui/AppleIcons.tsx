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
