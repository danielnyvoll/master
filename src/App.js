// App.js
import Soccer from './Soccer';
import { useSelector } from 'react-redux';


function App() {
    const reset = useSelector((state) => state.reset);

    console.log(reset);

    return (
        <Soccer key={reset} /> 
    );
}

export default App;
