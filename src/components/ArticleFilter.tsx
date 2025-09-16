import React from 'react';

interface ArticleFilterProps {
  filter: 'all' | 'favorites';
  onFilterChange: (filter: 'all' | 'favorites') => void;
}

const ArticleFilter: React.FC<ArticleFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          filter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        Все статьи
      </button>
      <button
        onClick={() => onFilterChange('favorites')}
        className={`px-4 py-2 rounded-lg transition-colors ${
          filter === 'favorites'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
        }`}
      >
        Избранное
      </button>
    </div>
  );
};

export default ArticleFilter;