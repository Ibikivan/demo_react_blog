
import bootstrap from '../assets/bootstrap.svg'

export default function FooterPastille({pastille}) {
    
    return <a href={pastille.url} target="_blank" className='pastille'>
        <img src={pastille.icon} alt="bootstrap icon" className='pastille_icon' />
        <span>{pastille.packageName}</span>
    </a>
}
