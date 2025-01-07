import { Suspense } from "react";
import { useRouteError } from "react-router-dom";

export default function PageNotFound({error, resetErrorBoundary}) {

    const routeEror = useRouteError()

    return <Suspense fallback={<div>Chargement de la page...</div>}>
        <div className="container">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Oups !</strong> {error?.toString() || routeEror?.error?.toString() || error?.toString()}
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="alert"
                    aria-label="Close"
                    onClick={resetErrorBoundary}
                ></button>
            </div>
        </div>
    </Suspense>
}
