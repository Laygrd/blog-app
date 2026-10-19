import { Navbar } from '@/widgets/Navbar/inxex';
import { AppRouter } from './providers/routerProvider';
import { Sidebar } from '@/widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@/entities/User/model/slice/userSlice';
import { getUserInited } from '@/entities/User';


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.initAuthData())
    }, [dispatch]);

    const initedUser = useSelector(getUserInited);

    return (
        <div className='app'>
            <Suspense fallback={''}>
                <Navbar />
                <div className='content-page'>
                    <Sidebar />
                    {initedUser && <AppRouter />}
                </div>
            </Suspense>
        </div>
    )
};

export default App;