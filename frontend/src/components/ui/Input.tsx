import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 mb-4">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
          ref={ref}
          className={`px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-library-wood/50 transition-colors ${
            error ? 'border-red-500' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
