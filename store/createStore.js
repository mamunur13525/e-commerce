import { create } from 'zustand'
import { devtools } from 'zustand/middleware'


const updateQuantity = (items, proId, quantity) => {
    let cloneArr = [...items];
    let objIndex = cloneArr.findIndex((obj => obj.id == proId));
    if (objIndex !== -1) cloneArr[objIndex].quantity = quantity;
    return cloneArr;
}

const cartStore = create(devtools((set) => ({
    items: [],
    addToCart: (item) => set((state) => ({ items: [...state.items, item] })),
    removeToCart: (proId) => set((state) => ({ items: state.items.filter(itm => itm.id !== proId) })),
    increaseQuantity: (proId, quantity) => set((state) => ({ items: updateQuantity(state.items, proId, quantity) })),
    decreaseItemQuantity: (proId, quantity) => set((state) => ({ items: updateQuantity(state.items, proId, quantity) }))
})))

const favoriteStore = create(devtools((set) => ({
    items: [],
    addToFavorite: (item) => set((state) => ({ items: [...state.items, item] })),
    removeToFavorite: (proId) => set((state) => ({ items: state.items.filter(itm => itm.id !== proId) })),
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


export {
    cartStore,
    favoriteStore,
    checkoutStore,
    useProgressStore
}