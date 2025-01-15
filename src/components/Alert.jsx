
/**
 * @param {{colorClassName: string, content: string, otherClass: string, onClick: () => null}} param0
 */
export default function Alert({colorClassName = 'primary', content = 'Erreur inconnue', otherClass, onClick = () => null}) {

    return <div onClick={() => onClick()} className={`alert alert-${colorClassName} ${otherClass}`} role="alert">
        {content.toString()}
    </div>
}
