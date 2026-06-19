import React from 'react';

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 to-dark-900">
      <div className="text-center">
        <div className="relative inline-block">
          <div className="w-20 h-20 border-4 border-secondary-400 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="mt-6 text-white text-xl font-semibold animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;