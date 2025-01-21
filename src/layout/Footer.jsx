import { forwardRef } from "react";

export default forwardRef(function Footer({}, ref) {

    return <footer ref={ref} className="bg-secondary">
        <div>
            <h6>Adresse</h6>
            <p><a href="mailto:ibikivan1@gmail.com">ibikivan1@gmail.com</a></p>
            <p>+237 697818399 / 620174414</p>
        </div>
        <div>
            <h6>Reférence</h6>
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
                    <p>https://github.com/Ibikivan/demo_react_blog.git</p>
                </li>
            </ul>
        </div>
        <div>
            <h6>Mentions et technos</h6>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, unde impedit neque animi ipsum praesentium aliquid, architecto est consequatur aperiam odio corporis beatae. Inventore impedit a delectus exercitationem libero assumenda!</p>
        </div>
    </footer>
})
