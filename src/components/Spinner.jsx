import { forwardRef } from "react";

/**
 * @param {{colorClassName: string, otherClass: string}} param0
 */
export default forwardRef(function Spinner({colorClassName = 'primary', otherClass = ''}, ref) {

    return <div ref={ref} className={`spinner-border text-${colorClassName} ${otherClass}`} role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
})
