import React from 'react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-6">
          Welcome to WebFramework
        </h1>
        <p className="text-2xl text-slate-300 mb-12 max-w-2xl">
          A production-grade React framework built for performance, clarity, and developer experience.
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/docs"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Get Started
          </a>
          <a
            href="/examples"
            className="px-6 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition"
          >
            View Examples
          </a>
        </div>
      </div>
    </div>
  );
}
