import React, { useEffect, useState } from 'react';
import CategoryFilter from './CategoryFilter';
import ColorFilter from './ColorFilter';
import PriceRange from './PriceRange';
import RatingFilter from './RatingFilter';
import Button from '../Button';

const FilterSidebar = ({ products, setFilterData }) => {
    const [maxPrice, setMaxPrice] = useState()
    // const [filteredData, setFilteredData] = useState([])
    const [priceData, setPriceData] = useState([])
    const [ratingData, setRatingData] = useState([])
    const [categoryField, setCategoryField] = useState([])
    
    useEffect(() => {
        if(products) {
            let price = 0
            for (let i = 0; i < products.length; i++) {
                if(products[i].base_price > price) {
                    price = products[i].base_price
                }
            }
            setMaxPrice(price)
        }
    }, [products])

    useEffect(() => {
        if(products) {
            let commonData = []; // Create an array for common items in another two arrays.
            for (let i = 0; i < priceData.length; i++) {
                for (let j = 0; j < ratingData.length; j++) {
                    if (priceData[i].id == ratingData[j].id) { // If the item is common in both arrays
                        commonData.push(priceData[i]); // Push common items to the array
                    }
                }
            }

            const categoryData = commonData?.filter(data => data.category === (categoryField.fruits ? 'fruits' : '') || data.category === (categoryField.vegetables ? 'vegetables' : '') || data.category === (categoryField.nuts ? 'nuts' : ''))
            
            if(categoryField.fruits || categoryField.vegetables || categoryField.nuts) {
                setFilterData(categoryData)
            }
            else {
                setFilterData(commonData)
            }
        }
    }, [priceData, ratingData, categoryField])
    return (
        <div className='flex flex-col gap-5'>
            <p className='mb-6 text-xl uppercase font-semibold'>Filter:</p>
            <div>
                <PriceRange maxPrice={maxPrice} products={products} setPriceData={setPriceData} />
            </div>
            <div>
                <ColorFilter />
            </div>
            <div>
                <RatingFilter products={products} setRatingData={setRatingData} />
            </div>
            <div>
                <CategoryFilter products={products} setCategoryField={setCategoryField} />
            </div>
        </div>
    );
};

export default FilterSidebar;