import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Index from './pages';
import Authentication from './pages/Authentication';
import NotFound from './pages/NotFound';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={'*'} element={<NotFound />} />
      <Route path={'/'} element={<Authentication />} />
      <Route path={'/index'} element={<Index />} />
    </Route>
  )
);

export default Router;
