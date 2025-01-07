import { Outlet } from "react-router-dom";
import Footer from "../../layout/Footer";
import Headers from "../../layout/Headers";
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Root({ footerRef }) {

    const LazyNotFound = lazy(() => import('../../pages/not_found/PageNotFound'))
    
    return <div>
        <Headers />

        <ErrorBoundary
            FallbackComponent={LazyNotFound}
            onReset={() => console.log('page reseted')}
        >
            <Outlet />
        </ErrorBoundary>

        <Footer ref={footerRef} />
    </div>

}
