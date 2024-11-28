import React from "react";

const Loader = () => {
  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm">
      <div className="animate-pulse rounded-full border border-primary bg-primary px-6 py-1 text-xl text-black">
        Loading...
      </div>
    </div>
  );
};

export default Loader;
