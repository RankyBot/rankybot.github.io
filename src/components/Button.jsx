import React from 'react';

export default function Button({ children, ...props }) {
  return (
    <button
      className="bg-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition duration-300 shadow"
      {...props}
    >
      {children}
    </button>
  );
}