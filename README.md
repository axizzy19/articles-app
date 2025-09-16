# Articles App

## Структура компонентов

### `ArticleCard` - компонент карточки

Методы: \
`handleCardClick(e: React.MouseEvent)` - обработчик клика по карточке, перенаправляет на страницу деталей товара. \
Пропсы: \
`article: Article` - объект товара \
`onToggleFavorite: (id: number) => void` - колбэк для переключения лайка \
`onDelete: (id: number) => void` - колбэк для удаления товара \
`onClick: (id: number) => void` - колбэк для клика по карточке \

### `ArticleFilter` - компонент фильтрации

Пропсы: \
`filter: 'all' | 'favorites'` - текущий активный фильтр \
`onFilterChange: (filter: 'all' | 'favorites') => void` - колбэк смены фильтра \

### `Layout` - компонент макета

Пропсы: \
`children: React.ReactNode` - дочерние элементы для рендеринга \

## Страницы приложения

### `ArticlesPage` - главная страница со списком товаров

Методы: \
`useEffect()` - загрузка товаров при монтировании компонента \
`handleToggleFavorite(id: number)` - обработчик лайка товара \
`handleDelete(id: number)` - обработчик удаления товара \
`handleArticleClick(id: number)` - обработчик клика по карточке \
Состояния: \
`filter: 'all' | 'favorites'` - текущий активный фильтр \

### `ArticleDetailPage` - страница деталей товара
Логика: \
Получает ID товара из URL параметров, Находит товар в store по ID, Отображает детальную информацию \

### `CreateArticlesPage` - страница создания товара

Методы: \
`validateForm()` - валидация полей формы \
`handleSubmit(e: React.FormEvent)` - обработчик отправки формы \
`handleChange(e: React.ChangeEvent)` - обработчик изменения полей \
Состояния: \
`formData: { title: string; summary: string; image_url: string }` - данные формы \
`errors: { [key: string]: string }` - ошибки валидации \

## Redux Store

### `articlesSlice` - слайс управления состоянием товаров

Методы: \
`fetchArticles()` - асинхронный thunk для загрузки товаров с API \
`toggleFavorite(id: number)` - переключение статуса избранного \
`deleteArticle(id: number)` - удаление товара из store \
`createArticle(articleData)` - создание нового товара \
Состояния: \
`articles: Article[]` - массив всех товаров\
`userArticles: Article[]` - товары созданные пользователем \
`loading: boolean` - статус загрузки \
`error: string | null` - ошибки запросов \


