
const BackendErrorMessages = ({ backendErrors }) => {
    const errorMessages = Object.keys(backendErrors).map(name => {
        const message = backendErrors[name].join(" ");
        return `${name} - ${message}`;
    })

    return (
        <ul className="error-messages">
            {errorMessages.map(msg => (
                <li key={msg}>{msg}</li>
            ))}
        </ul>
    );
}

export default BackendErrorMessages;