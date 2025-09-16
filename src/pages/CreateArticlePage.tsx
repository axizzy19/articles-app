import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store';
import { createArticle } from '../store/articlesSlice';
import { ArrowLeft } from 'lucide-react';

const CreateArticlePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image_url: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Заголовок обязателен';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Заголовок должен быть не менее 3 символов';
    }

    if (!formData.summary.trim()) {
      newErrors.summary = 'Описание обязательно';
    } else if (formData.summary.trim().length < 10) {
      newErrors.summary = 'Описание должно быть не менее 10 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(createArticle(formData));
      navigate('/products');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Назад к статьям</span>
      </button>

      <h1 className="text-2xl font-bold text-white mb-6">Создать новую статью</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
            Заголовок *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.title ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="Введите заголовок статьи"
          />
          {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="summary" className="block text-sm font-medium text-gray-300 mb-2">
            Описание *
          </label>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            rows={5}
            className={`w-full px-3 py-2 bg-gray-800 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.summary ? 'border-red-500' : 'border-gray-700'
            }`}
            placeholder="Введите описание статьи"
          />
          {errors.summary && <p className="mt-1 text-sm text-red-400">{errors.summary}</p>}
        </div>

        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-300 mb-2">
            URL изображения (опционально)
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Создать статью
        </button>
      </form>
    </div>
  );
};

export default CreateArticlePage;