
/**
 * retourne un composant de type button paramettrable,
 * il est possible d'utiliser les couleur 'primary' ou 'outline-primary'
 * il est aussi possible d'utiliser les classes 'btn-lg' et 'btn-sm' pour la taille.
 * @param {{
 *  content: string,
 *  buttonWitdh: string,
 *  buttonColor: string,
 *  compClasses: string,
 *  type: string,
 *  disabled: boolean,
 *  onClick: () => null,
 *  props: object
 * }} param0 
 */
export default function Button({
    content,
    buttonWitdh="",
    buttonColor="primary",
    compClasses,
    type="button",
    disabled=false,
    onClick=()=>null,
    props
}) {

    return <button
        type={type}
        className={`btn btn-${buttonColor} ${compClasses}`}
        style={{width: buttonWitdh}}
        onClick={() => onClick()}
        disabled={disabled}
        {...props}
    >
        {content}
    </button>
}
