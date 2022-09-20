
function Messages(props) {
    const { messages } = props;
    const { currentMember } = props;

    // Funkcija prima svaku poruku i stavlja ju u jednog člana liste
    // Destrukturacija objekta message
    // Dodjeljuju se stilovi ovisno je li korisnik trenutni korisnik ili nije
    const renderMessages = (message) => {
        const { member, text } = message;
        const messageFromMe = member.id === currentMember.id;
        const style = messageFromMe ? "current-member-msg" : "msg";
        const contentStyle = messageFromMe ? "current-msg-content" : "msg-content"
        const messageColor = messageFromMe ? "current-msg-color" : "msg-color";
        return (
            <li className={style} key={Math.random()}>
                <div className={contentStyle}>
                    <div className="username">
                        {member.clientData.username}
                    </div>
                    <div className={messageColor}>
                        <p>{text}</p>
                    </div>
                </div>
            </li>
        );
    }

    /* Uzima se props messages iz App komponente i map() metoda prolazi kroz sve članove niza messages i šalju se u funkciju renderMessages()*/
    return(
        <div className="container">
            <div className="list-container">
                <ul className="msgs-list">
                    {messages.map(el => renderMessages(el))}
                </ul>
            </div>
        </div>
    )
}

export default Messages;