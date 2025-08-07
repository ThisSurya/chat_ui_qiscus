import React from 'react';

export default function ButtonPrimary({
  type = 'button',
  onClick,
  children,
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-blue-2/50 rounded-lg p-2 cursor-pointer ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
