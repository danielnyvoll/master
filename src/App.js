// App.js

import React, { useState, useEffect } from 'react';
import Soccer from './Soccer';


function App() {
    const [resetCount, setResetCount] = useState(0);
    const x = 5;

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Increment resetCount every x seconds
            setResetCount(prevCount => prevCount + 1);
        }, x * 1000); // x is the number of seconds for reset

        // Cleanup function to clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <Soccer key={resetCount} /> 
    );
}

export default App;
