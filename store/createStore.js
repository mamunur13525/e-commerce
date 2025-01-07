import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


const updateQuantity = (items, proId, quantity) => {
    let cloneArr = [...items];
    let objIndex = cloneArr.findIndex((obj => obj._id == proId));
    if (objIndex !== -1) cloneArr[objIndex].ordered_quantity = quantity;
    return cloneArr;
}

const cartStore = create(devtools((set) => ({
    items: [],
    setCartItems: (newItems) => set((state) => ({ items: newItems })),
    addToCart: (item, quantity = 1) => {
        const newItem = {...item}
        newItem.ordered_quantity = quantity
        set((state) => ({ items: [...state.items, newItem] }))
    },
    removeToCart: (proId) => set((state) => ({ items: state.items.filter(itm => itm._id !== proId) })),
    increaseQuantity: (proId, quantity) => set((state) => ({ items: updateQuantity(state.items, proId, quantity) })),
    decreaseItemQuantity: (proId, quantity) => set((state) => ({ items: updateQuantity(state.items, proId, quantity) })),
    clearCart: () => set((state) => ({ items: [] }))
})))

const favoriteStore = create(devtools((set) => ({
    items: [],
    addToFavorite: (item) => set((state) => ({ items: [...state.items, item] })),
    removeToFavorite: (proId) => set((state) => ({ items: state.items.filter(itm => itm._id !== proId) })),
})))


const checkoutStore = create(devtools((set) => ({
    data: {},
    addToStore: (item) => set((state) => ({ data: [...state.data, item] })),
    removeAllData: () => set((state) => ({ data: {} }))
})))

const useProgressStore = create(devtools((set) => ({
    isAnimating: false,
    setIsAnimating: (isAnimating) => set(() => ({ isAnimating }))
})))

const UserData = create(devtools((set) => ({
    data: {},
    setUserData: (newData) => set((state) => ({data: newData}))
})))

const queryStore = create(devtools((set) => ({
    data: {},
    setQuery: (newQuerys) => set(() => ({data: newQuerys}))
})))

const Metadata = create(devtools((set) => ({
    data: null,
    setMetadata: (newData) => set((state) => ({data: newData}))
})))


export {
    cartStore,
    favoriteStore,
    checkoutStore,
    useProgressStore,
    UserData,
    queryStore,
    Metadata
}