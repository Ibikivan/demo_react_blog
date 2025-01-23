import { forwardRef } from "react";
import FooterPastille from "../components/FooterPastille";
import bootstrap from "../assets/bootstrap.svg"
import reactQuery from "../assets/react-query.svg"
import framerMotion from "../assets/framer-motion.svg"
import react from "../assets/react.svg"

export default forwardRef(function Footer({}, ref) {

    const footerPastilles = [
        {
            url: 'https://getbootstrap.com/',
            packageName: 'Bootstrap',
            icon: bootstrap
        },
        {
            url: 'https://tanstack.com/query/latest/docs/framework/react/overview',
            packageName: 'react-query',
            icon: reactQuery
        },
        {
            url: 'https://motion.dev/',
            packageName: 'framer-motion',
            icon: framerMotion
        },
        {
            url: 'https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary',
            packageName: 'react-error-boundary',
            icon: react
        }
    ]

    return <footer ref={ref} className="bg-secondary p-5">
        <div className="mentions">
            <h5>Mentions et technos</h5>
            <p>Ceci est une application de démonstration : un mini-blog basé sur l'API de <a href="https://jsonplaceholder.typicode.com/" target="_blank">JSONPlaceholder</a>, mettant en œuvre un aperçu des fonctionnalités et des bibliothèques clés de l'environnement React.js.</p>

            <div>
                <h6>Points à considérer :</h6>
                <p>Comportement et UX - Performance et Optimisations - Gestion des Erreurs - Efficacité et Propreté du <a href="https://github.com/Ibikivan/demo_react_blog.git" target="_blank">code</a> - Fonctionalité Js et React avancés</p>
            </div>

            <div className="pastille_group">
                {footerPastilles.map((pastille, index) => <FooterPastille key={`${pastille.packageName}-${index}`} pastille={pastille} />)}
            </div>
        </div>

        <div className="footer_others">
            <div>
                <h5>Adresses</h5>
                <p><a href="mailto:ibikivan1@gmail.com">ibikivan1@gmail.com</a></p>
                <p>+237 697818399 / 620174414</p>
            </div>

            <div>
                <h5>Reférence</h5>
                <ul>
                    <li>
                        <h6>Github :</h6>
                        <p><a href="https://github.com/Ibikivan/" target="_blank">https://github.com/Ibikivan/</a></p>
                    </li>
                    <li>
                        <h6>LinkedIn :</h6>
                        <p><a href="https://linkedin.com/in/evanel-roche-njiepue-ngaleu-355bb61a9" target="_blank">www.linkedin.com/in/evanel-roche-njiepue-ngaleu-355bb61a9</a></p>
                    </li>
                    <li>
                        <h6>Project repo url :</h6>
                        <p><a href="https://github.com/Ibikivan/demo_react_blog.git" target="_blank">https://github.com/Ibikivan/demo_react_blog.git</a></p>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
})
