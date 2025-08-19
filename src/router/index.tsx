import { lazy, Suspense } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from '../App';

const SignIn = lazy(() => import('../modules/auth/pages'));
const AdminLayout = lazy(() => import('../modules/layout'));
const Countries = lazy(() => import('../modules/countries/pages'));
const SubToursList = lazy(() => import('../modules/subtours/pages'));
const SubToursCreate = lazy(() => import('../modules/subtours-create/pages'))
const Mediatraining = lazy(() => import('../modules/hotel/pages'));
const Members = lazy(() => import('../modules/tours/pages'));
const HotelCreate = lazy(() => import('../modules/hotel-create/pages'))
import Loading from '../components/loadable';
import NotFound from '../components/notfound';

const Index: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index element={<SignIn />} />
        <Route path="admin-layout" element={<AdminLayout />}>
          <Route index path="countries" element={<Countries />} />
          <Route path="members" element={<Members />} />
          <Route path="events" element={<SubToursList />} />
          <Route path="events-create" element={<SubToursCreate />} />
          <Route path="hotel" element={<Mediatraining />} />
          <Route path='hotel-create' element={<HotelCreate />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default Index;
