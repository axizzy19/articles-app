import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Layout from './components/Layout';
import ArticlesPage from './pages/ArticlesPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import CreateArticlePage from './pages/CreateArticlePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/products" element={<ArticlesPage />} />
            <Route path="/products/:id" element={<ArticleDetailPage />} />
            <Route path="/create-product" element={<CreateArticlePage />} />
            <Route path="/" element={<Navigate to="/products" replace />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;