import React from "react";
export default function Button({ 
  variant = "primary", 
  text = "버튼", 
  onClick,
  className = ""
}) {
  const baseStyles = "w-full px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:-translate-y-0.5",
    secondary: "bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
