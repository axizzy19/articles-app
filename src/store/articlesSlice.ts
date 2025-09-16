import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Article, CreateArticleData } from '../types/article';

interface ArticlesState {
  articles: Article[];
  userArticles: Article[];
  loading: boolean;
  error: string | null;
  favoriteIds: number[];
}

const loadFavoriteIds = (): number[] => {
  try {
    const serializedState = localStorage.getItem('favoriteArticles');
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Could not load favorites from localStorage', err);
    return [];
  }
};

const saveFavoriteIds = (favoriteIds: number[]) => {
  try {
    const serializedState = JSON.stringify(favoriteIds);
    localStorage.setItem('favoriteArticles', serializedState);
  } catch (err) {
    console.error('Could not save favorites to localStorage', err);
  }
};

const initialState: ArticlesState = {
  articles: [],
  userArticles: [],
  loading: false,
  error: null,
  favoriteIds: loadFavoriteIds(),
};

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async () => {
    const response = await fetch('https://api.spaceflightnewsapi.net/v4/articles');
    const data = await response.json();
    return data.results;
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const articleId = action.payload;
      const index = state.favoriteIds.indexOf(articleId);
      
      if (index === -1) {
        state.favoriteIds.push(articleId);
      } else {
        state.favoriteIds.splice(index, 1);
      }
      
      const article = state.articles.find(a => a.id === articleId);
      if (article) {
        article.featured = !article.featured;
      }
      
      const userArticle = state.userArticles.find(a => a.id === articleId);
      if (userArticle) {
        userArticle.featured = !userArticle.featured;
      }
      
      saveFavoriteIds(state.favoriteIds);
    },
    deleteArticle: (state, action: PayloadAction<number>) => {
      const articleId = action.payload;
      
      state.articles = state.articles.filter(a => a.id !== articleId);
      state.userArticles = state.userArticles.filter(a => a.id !== articleId);
      
      const favoriteIndex = state.favoriteIds.indexOf(articleId);
      if (favoriteIndex !== -1) {
        state.favoriteIds.splice(favoriteIndex, 1);
        saveFavoriteIds(state.favoriteIds);
      }
    },
    createArticle: (state, action: PayloadAction<CreateArticleData>) => {
      const newArticle: Article = {
        id: Date.now(),
        title: action.payload.title,
        summary: action.payload.summary,
        image_url: action.payload.image_url || 'https://via.placeholder.com/400x200?text=No+Image',
        url: '',
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        featured: state.favoriteIds.includes(Date.now()),
        launches: [],
        events: [],
      };
      state.articles.unshift(newArticle);
      state.userArticles.unshift(newArticle);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.map((article: Article) => ({
          ...article,
          featured: state.favoriteIds.includes(article.id)
        }));
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      });
  },
});

export const { toggleFavorite, deleteArticle, createArticle } = articlesSlice.actions;
export default articlesSlice.reducer;