import React, { useContext } from 'react';

const CategoryContext = React.createContext()

export function useCategory(){
    return useContext(CategoryContext)
}

export function CategoryProvider({children}){
    const category = ['Learn culture&language', 'Connect via tech', 'Explore the outdoors', 'Reading', 'Career boost', 'Hone your craft', 'Find your zen']

    const value = {
        category,
    }
    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    )
}