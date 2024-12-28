import { forwardRef } from "react";

/**
 * @param {{colorClassName: string}} param0
 */
export default forwardRef(function Spinner({colorClassName = 'primary'}, ref) {

    return <div ref={ref} className={`spinner-border text-${colorClassName}`} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
})
