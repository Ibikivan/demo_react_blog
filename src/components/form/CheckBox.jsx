import { useId } from "react"

/**
 * Retourne un composant de type chekbox
 * @param {{
 *  label: string, name: string, compClasses: string, checked: boolean,
 *  onChange: (v: boolean) => null, inputClasses: string, props: object
 * }} param0 
 */
export default function CheckBox({label, name, compClasses, checked, onChange=()=>null, inputClasses, props}) {

    const id = useId()

    return <div className={`checkbox_container ${compClasses}`}>
        <input
            type="checkbox"
            name={name}
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className={`form-check-input ${inputClasses}`}
            {...props}
        />

        {label && <label className="form-check-label" htmlFor={id}>{label}</label>}
    </div>
}
