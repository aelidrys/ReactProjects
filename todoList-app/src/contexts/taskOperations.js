import { createContext } from "react";

export let TaskOperations = createContext(null)

export let TaskOperationsProvider = ({value, children}) => {
    return (
        <TaskOperations.Provider value={value}>
            {children}
        </TaskOperations.Provider>
    )
}