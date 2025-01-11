import { useRef } from "react"
import { NavLink } from "react-router-dom"
import { useOnline } from "../hooks/useOnline"

export default function Headers() {

    const navOptions = [{home: 'Accueille'}, {contact: 'Contact'}]
    const ref = useRef(null)
    const isOnline = useOnline()

    const toggleNav = () => {
        if (ref) {
            ref.current.classList.toggle('collapse')
        }
    }

    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <div className="hstack">
                <NavLink className="navbar-brand" to={'/'}>MonSite</NavLink>
                <span className={`badge text-bg-${isOnline ? 'success' : 'danger'} mb-0 me-2`}>{isOnline ? "En ligne" : "hors ligne"}</span>
            </div>
            <button onClick={toggleNav} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div ref={ref} className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {navOptions.map((option, index) => {
                        const [[key, value]] = Object.entries(option)
                        const target = key === 'home' ? '' : key

                        return <li key={index} className="nav-item">
                            <NavLink className={`nav-link`} aria-current="page" to={`${target}`}>{value}</NavLink>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </nav>
}
