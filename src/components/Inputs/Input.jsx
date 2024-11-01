import React, { useState, forwardRef } from 'react';
import { Controller } from 'react-hook-form';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Input = forwardRef(
  (
    {
      name,
      control,
      type = 'text',
      placeholder,
      icon: Icon,
      className = '',
      errorMessage,
      onChange,
      ...props
    },
    ref
  ) => {
    const [hidePassword, setHidePassword] = useState(true);
    const isPassword = type === 'password';

    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className={`relative ${className}`}>
            {Icon && (
              <Icon className="absolute text-gray-400 top-3 left-3" size={20} />
            )}
            <input
              {...field}
              {...props}
              ref={ref}
              type={isPassword && hidePassword ? 'password' : 'text'}
              placeholder={placeholder}
              value={field.value ?? ''} // Ensure value is not undefined
              className={`w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 ${
                error ? 'border-red-500' : 'focus:ring-red-500'
              }`}
              onChange={(e) => {
                field.onChange(e);
                if (onChange) {
                  onChange(name, e.target.value);
                }
              }}
            />
            {isPassword && (
              <button
                type="button"
                onClick={() => setHidePassword((prev) => !prev)}
                className="absolute text-gray-400 cursor-pointer top-3 right-3"
              >
                {hidePassword ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            )}
            {error && (
              <span className="text-xs text-red-500">{error.message}</span>
            )}
          </div>
        )}
      />
    );
  }
);

export default Input;
