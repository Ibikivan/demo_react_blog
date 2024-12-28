import { useId } from "react"

/**
 * Crée un composant input de type text ou dérivé 'text, email, ou search...'
 * @param {{
 *  label: string, name: string, type: string, value: string,
 *  onChange: (v: string) => null, compClasses: string, placeHolder: string, props: object, inputClasses: string
 * }} param0 
 */
export default function InputText({label, name, type='text', value, onChange=()=>null, compClasses, placeHolder, props, inputClasses}) {

    const id = useId()

    return <div className={`input_container ${compClasses}`}>
        {label && <label className="form-label" htmlFor={id}>{label}</label>}
        <input
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeHolder}
            className={`form-control ${inputClasses}`}
            {...props}
        />
    </div>
}
