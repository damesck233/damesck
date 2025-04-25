import React from 'react';

const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">博客</h1>
      <div className="split-card">
        <div className="split-card-header flex items-center pl-6">
          <h2 className="text-xl font-semibold">最新文章</h2>
        </div>
        <div className="split-card-body">
          <p>博客页面内容将在此显示</p>
        </div>
      </div>
    </div>
  );
};

export default Blog; 