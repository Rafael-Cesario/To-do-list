import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Index from './pages';
import Authentication from './pages/Authentication';
import NotFound from './pages/NotFound';
import TodoList from './pages/TodoList';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={'*'} element={<NotFound />} />
      <Route path={'/'} element={<Authentication />} />
      <Route path={'/index'} element={<Index />} />
      <Route path={'/:listName'} element={<TodoList />} />
    </Route>
  )
);

export default Router;
