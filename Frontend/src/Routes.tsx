import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound';

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path={'/'} element={<App />} />
      <Route path={'*'} element={<NotFound />} />
    </Route>
  )
);

export default Router;
