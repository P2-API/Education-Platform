import { useState } from "react";


const Homepage = () => {
    const [count, setCount] = useState(0);


    return (
        <div>
            <h1>React Typescript</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    Du har trykket her {count} gange
                </button>
            </div>
        </div>
    );
};

export default Homepage;
