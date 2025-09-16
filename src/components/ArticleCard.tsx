import React from 'react';
import { Article } from '../types/article';
import { Heart, Trash2 } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  onClick: (id: number) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onToggleFavorite,
  onDelete,
  onClick,
}) => {
  const handleCardClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.action-button')) {
      onClick(article.id);
    }
  };

  const truncatedSummary = article.summary.length > 100 
    ? article.summary.substring(0, 100) + '...' 
    : article.summary;

  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
    >
      <img 
        src={article.image_url} 
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
          {truncatedSummary}
        </p>
        <div className="flex justify-between items-center mt-auto pt-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(article.id);
            }}
            className={`action-button p-2 rounded-full transition-colors ${
              article.featured 
                ? 'text-red-500 hover:bg-red-500/20' 
                : 'text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Heart className={`w-5 h-5 ${article.featured ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(article.id);
            }}
            className="action-button p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-700 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;