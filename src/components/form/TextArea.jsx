import { useId } from "react"

/**
 * Retourne un composant input de type textArea
 * @param {{
 *  label: string, name: string, rows: number, value: string,
 *  onChange: (v: string) => null, compClasses: string, placeHolder: string, props: object, inputClasses: string
 * }} param0
 */
export default function TextArea({label, name, rows=3, value, onChange=()=>null, compClasses, placeHolder, props, inputClasses}) {

    const id = useId()

    return <div className={`textarea_container ${compClasses}`}>
        {label && <label className="form-label" htmlFor={id}>{label}</label>}
        <textarea
            name={name}
            id={id}
            rows={rows}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeHolder}
            className={`form-control ${inputClasses}`}
            {...props}
        />
    </div>
}
