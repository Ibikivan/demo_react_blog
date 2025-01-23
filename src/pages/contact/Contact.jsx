import Button from "../../components/form/Button";
import CheckBox from "../../components/form/CheckBox";
import InputText from "../../components/form/InputText";
import TextArea from "../../components/form/TextArea";
import PageTitle from "../../components/PageTitle";
import { useEffect } from "react";
import { handleSumbitContact, reduceStatement } from "../../function";

export default function Contact() {

    const pageConfig = {
        pageTitle: "Contactez nous"
    }

    useEffect(() => {
        const prevTitle = document.title
        document.title = reduceStatement(pageConfig.pageTitle, 20)

        return () => document.title = prevTitle
    }, [])

    return <div className="container vstack gap-3 my-3">
        
        <PageTitle title={pageConfig.pageTitle} />
        <p className="text-start">Merci de me contacter, je suis anthousiaste à l'idée de lire ce que vous avez à dire.</p>
        
        <form className="contact_form" onSubmit={handleSumbitContact}>
            <InputText label="Email" name="email" type="email" placeHolder="Entrez votre Email..." />

            <fieldset>
                <legend>Votre message</legend>
                <InputText label="Objet" name="title" placeHolder="Entrez le titre de votre message..." />
                <TextArea label="Message" name="body" placeHolder="Entrez votre message..." />
            </fieldset>

            <CheckBox label="Me contacter par email" name="contact-me" />

            <Button buttonColor="outline-primary" content="Envoyer" type="submit" />
        </form>

    </div>
}
