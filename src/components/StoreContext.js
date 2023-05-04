import { createContext, useContext, useState } from "react"

const store = createContext()

const StoreContext = function({children}){

    const [showPopUp, setShowPopUp] = useState(false)
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [toAdd, setToAdd] = useState([])

    return(
        <store.Provider
        value={{
            selectedProducts, 
            setSelectedProducts,
            toAdd,
            setToAdd,
            showPopUp,
            setShowPopUp,
        }}
        >
            {children}
        </store.Provider>
    )
}


export const UseStoreContext =() => useContext(store)
export default StoreContext