import { useRef } from "react"

export default function Headers({activeNav, setActiveNav}) {

    const navOptions = [{home: 'Accueille'}, {contact: 'Contact'}]
    const ref = useRef(null)

    const toggleNav = () => {
        if (ref) {
            ref.current.classList.toggle('collapse')
        }
    }

    const setActiveNewNav = (e, page) => {
        e.preventDefault()

        setActiveNav({
            page: page,
            pageData: {}
        })
    }

    return <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#" onClick={(e) => setActiveNewNav(e, 'home')}>MonSite</a>
            <button onClick={toggleNav} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div ref={ref} className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {navOptions.map((option, index) => {
                        const [[key, value]] = Object.entries(option)

                        return <li key={index} className="nav-item" onClick={(e) => setActiveNewNav(e, key)}>
                            <a className={`nav-link ${activeNav === key ? 'active' : ''}`} aria-current="page" href="#">{value}</a>
                        </li>
                    })}
                </ul>
            </div>
        </div>
    </nav>
}
