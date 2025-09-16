import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { ArrowLeft } from 'lucide-react';

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { articles } = useSelector((state: RootState) => state.articles);
  
  const article = articles.find(a => a.id === parseInt(id || ''));

  if (!article) {
    return (
      <div className="text-center text-red-400">
        <p>Статья не найдена</p>
        <button
          onClick={() => navigate('/products')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/products')}
        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад к статьям</span>
      </button>

      <img 
        src={article.image_url} 
        alt={article.title}
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
      />

      <h1 className="text-3xl font-bold text-white mb-4">{article.title}</h1>

      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 leading-relaxed">{article.summary}</p>
      </div>
    </div>
  );
};

export default ArticleDetailPage;