import React, { useState, createContext, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = (props) => {
    const [tasksList, setTasksList] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/task').then(res => {
            setTasksList(res.data);
            /* console.log(res.data[0]); */
            setLoaded(true);
        });
        axios.get('http://127.0.0.1:8000/api/todolist').then(res => {
            console.log(res.data[0].Task);
        });
    }, []);

    return(
        <div>{!loaded ? 
            <h1>Loading</h1>
                :
            <AppContext.Provider value={[tasksList, setTasksList]}>
                {props.children}
            </AppContext.Provider>
        }</div>
    );
}