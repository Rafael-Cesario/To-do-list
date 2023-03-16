import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Authentication from './pages/Authentication';
import NotFound from './pages/NotFound';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={'/'} element={<Authentication />} />
      <Route path={'*'} element={<NotFound />} />
    </Route>
  )
);

export default Router;
