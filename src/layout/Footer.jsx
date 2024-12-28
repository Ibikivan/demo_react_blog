import { forwardRef } from "react";

export default forwardRef(function Footer({}, ref) {

    return <footer ref={ref} className="bg-secondary">
        <div>
            <h6>Adresse</h6>
            <p>ibikivan1@gmail.com...</p>
        </div>
        <div>
            <h6>Reférence</h6>
            <ul>
                <li>Passage piéton</li>
                <li>Moustique russe</li>
                <li>Petite foulée</li>
            </ul>
        </div>
        <div>
            <h6>Note perso</h6>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam, unde impedit neque animi ipsum praesentium aliquid, architecto est consequatur aperiam odio corporis beatae. Inventore impedit a delectus exercitationem libero assumenda!</p>
        </div>
    </footer>
})
