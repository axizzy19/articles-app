import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchArticles, toggleFavorite, deleteArticle } from '../store/articlesSlice';
import { useNavigate } from 'react-router-dom';
import ArticleCard from '../components/ArticleCard';
import ArticleFilter from '../components/ArticleFilter';
import { Loader2 } from 'lucide-react';

const ArticlesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { articles, loading, error } = useSelector((state: RootState) => state.articles);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');

  useEffect(() => {
    dispatch(fetchArticles());
  }, [dispatch]);

  const filteredArticles = filter === 'favorites' 
    ? articles.filter(article => article.featured)
    : articles;

  const handleToggleFavorite = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteArticle(id));
  };

  const handleArticleClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        <p>Ошибка загрузки: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <ArticleFilter filter={filter} onFilterChange={setFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDelete}
            onClick={handleArticleClick}
          />
        ))}
      </div>
      {filteredArticles.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          {filter === 'favorites' ? 'Нет избранных статей' : 'Статьи не найдены'}
        </div>
      )}
    </div>
  );
};

export default ArticlesPage;