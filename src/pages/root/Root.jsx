import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../../layout/Footer";
import Headers from "../../layout/Headers";
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Spinner from "../../components/Spinner";

export default function Root({ footerRef }) {

    const LazyNotFound = lazy(() => import('../../pages/not_found/PageNotFound'))
    const {state} = useNavigation()
    
    return <div className="vstack">
        <Headers />

        <ErrorBoundary
            FallbackComponent={LazyNotFound}
            onReset={() => console.log('page reseted')}
        >
            {state === 'loading' && <Spinner otherClass='align-self-center' />}
            <Outlet />
        </ErrorBoundary>

        <Footer ref={footerRef} />
    </div>

}
