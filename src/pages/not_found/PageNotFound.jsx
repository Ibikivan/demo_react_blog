
export default function PageNotFound({error, resetErrorBoundary}) {

    return <div className="container">
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
            <strong>Error :</strong> {error.toString()}
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={resetErrorBoundary}
            ></button>
        </div>
    </div>
}
