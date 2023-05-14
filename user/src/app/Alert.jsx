const Alert = ({ message, type }) => {
    const color = type === 'error' ? 'red' : 'green';

    return (
        <div className={`bg-${color}-300 border border-${color}-400 text-${color}-700 px-4 py-3 rounded relative`} role="alert">
            <strong className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}!</strong>
            <span className="block sm:inline"> {message}</span>
        </div>
    );
};

export { Alert };
