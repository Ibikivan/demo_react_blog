
/**
 * @param {{colorClassName: string, content: string}} param0
 */
export default function Alert({colorClassName = 'primary', content = 'Erreur inconnue'}) {

    return <div className={`alert alert-${colorClassName}`} role="alert">
        {content.toString()}
    </div>
}
