import { useState } from "react";

function Input(props) {
    const { onSendMessage } = props;

    const [text, setText] = useState("");

    const handleValueChange = (event) => {
        setText(event.target.value);
    }

    // Funkcija prekida osvježavanje aplikacije svaki put kad je nova poruka poslana
    // Ažurira se stanje tako da se očisti polje za buduće unose
    // Poruka se šalje u funkciju uz pomoć funkcije iz propsa
    const onFormSubmit = (e) => {
        e.preventDefault();
        if(text === "") {
            alert("Write a message!");
        } else {
            setText("");
            onSendMessage(text);
        }
    }

    // Pritiskom na gumb korisnik šalje poruku
    return (
        <div className="input-container">
            <form onSubmit={e => onFormSubmit(e)} className="form">
                <input type="text" onChange={handleValueChange} placeholder="Write your message" autoFocus={true} value={text} className="input"/>
                <button className="btn">SEND</button>
            </form>
        </div>
    );
}

export default Input;