import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundResult from '../components/results/NotFoundResult';
import ConsoleLayout from '../layouts/ConsoleLayout';
import AddLifeTrackerPage from '../pages/private/LifeTrackerDetail/AddLifeTracker';
import EditLifeTrackerPage from '../pages/private/LifeTrackerDetail/EditLifeTracker';
import LifeTrackerListPage from '../pages/private/LifeTrackerPage';
import UserListPage from '../pages/private/UserListPage';
import UserSelfPage from '../pages/private/UserSelfPage';

const RedirectToHomePage = () => <Navigate to="/private/overview" />;

const PrivateInnerRouter = () => (
    <ConsoleLayout>
        <Routes>
            <Route element={<RedirectToHomePage />} path="" />
            <Route element={<UserListPage />} path="system/users" />
            <Route element={<LifeTrackerListPage />} path="system/lifetrackers" />
            <Route element={<AddLifeTrackerPage />} path="system/lifetrackers/new" />
            <Route element={<EditLifeTrackerPage />} path="system/lifetrackers/:lifeTrackerId" />
            <Route element={<UserSelfPage />} path="self" />
            <Route element={<NotFoundResult />} path="*" />
        </Routes>
    </ConsoleLayout>
);

export default PrivateInnerRouter;
