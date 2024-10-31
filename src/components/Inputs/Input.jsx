import React, { useState, forwardRef } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Input = forwardRef(
  (
    {
      type = 'text',
      placeholder,
      icon: Icon,
      className = '',
      errorMessage,
      ...field
    },
    ref
  ) => {
    const [hidePassword, setHidePassword] = useState(true);
    const isPassword = type === 'password';

    return (
      <div className={`relative ${className}`}>
        {Icon && (
          <Icon className="absolute text-gray-400 top-3 left-3" size={20} />
        )}
        <input
          {...field}
          ref={ref} // Make sure the ref is passed here
          type={isPassword && hidePassword ? 'password' : 'text'}
          placeholder={placeholder}
          className={`w-full py-2 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 ${
            errorMessage ? 'border-red-500' : 'focus:ring-red-500'
          }`}
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
        {errorMessage && (
          <span className="text-xs text-red-500 ">{errorMessage}</span>
        )}
      </div>
    );
  }
);

export default Input;
