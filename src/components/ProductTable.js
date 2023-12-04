




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Category from './Category';
import filter from '../data';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(filter);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' for ascending, 'desc' for descending
  const [selectedSort, setSelectedSort] = useState('default'); // 'default', 'asc', 'desc'

  useEffect(() => {
    // Fetch products from the server
    axios.get('http://localhost:8070/api/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const updatePrice = (productId, newPrice) => {
    axios.put(`http://localhost:8070/api/products/${productId}/update-price`, null, {
      params: {
        newPrice: newPrice
      }
    })
    .then(response => {
      const updatedProduct = response.data;
      alert(`Price updated successfully! New price: $${updatedProduct.price.toFixed(2)}`);
    })
    .catch(error => console.error('Error updating product price:', error));
  };

  const handlePriceChange = (productId, newPrice) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, price: newPrice } : product
      )
    );
  };

  const handleCategoryClick = (clickedCategory) => {
    setSelectedCategory(clickedCategory);
  };

  const handleSortToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSortSelect = (selectedValue) => {
    setSelectedSort(selectedValue);
  };

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory.title)
    : products;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (selectedSort === 'asc') {
      return a.price - b.price;
    } else if (selectedSort === 'desc') {
      return b.price - a.price;
    } else {
      return 0; // no sorting
    }
  });

      const handleReset = () => {
    // Reset the prices to their original values
    // You need a way to store the original values, you can add a 'originalPrice' property to each product
    setProducts(prevProducts =>
      prevProducts.map(product =>
        ({ ...product, price: product.originalPrice || product.price })
      )
    );

    alert('Prices reset successfully!');
  };


  return (
    <div className='h-fit'>
      <Category category={categories} setCategory={setCategories} handleCategoryClick={handleCategoryClick} />
      <div className='flex items-center gap-3'>
       
        <label htmlFor="sortDropdown" className="text-[#9CCC65] relative text-4xl right-[-1210px] font-semibold ">Sort by Price:</label>
        <select
          id="sortDropdown"
          className='border-[2px] rounded-md py-1 px-2 text-black text-2xl font-semibold transition-all duration-200 mt-5 ml-[1250px] bg-[#9CCC65]'
          value={selectedSort}
          onChange={(e) => handleSortSelect(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
      <table className='text-[#9CCC65] m-5'>
        <thead className='border-[2px] py-5 '>
          <tr className='text-2xl  py-4'>
            <th className='border-[2px] text-2xl'>ID</th>
            <th className='border-[2px] text-2xl'>Name</th>
            <th className='border-[2px] text-2xl'>Category</th>
           <th className='border-[2px] text-2xl'>Price</th>
            <th className='border-[2px] text-2xl'>Description</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody className='border-[2px] ml-6'>
          {sortedProducts.map(product => (
            <tr key={product.id}>
              <td className='border-[2px] m-5  p-5 text-2xl font-semibold'>{product.id}</td>
              <td className='border-[2px] m-5  p-5 text-2xl font-semibold'>{product.name}</td>
              <td className='border-[2px] m-5  p-5 text-2xl font-semibold'>{product.category}</td>
              <td className='border-[2px] m-5  p-5 text-2xl font-semibold'>
                <input
                  type="number"
                  value={product.price}
                  className='bg-[#888888] text-center text-black'
                  onChange={(e) => handlePriceChange(product.id, e.target.value)}
                />
              </td>
              <td className='border-[2px] m-5 p-5 text-2xl font-semibold'>{product.description}</td>
              <td className='border-[2px] m-5'>
                <img className='w-[300px]' src={product.image} alt={`Product ${product.id}`} />
              </td>
              <td className='border-[2px] m-5 p-5'>
                <button 
                className='bg-[#9CCC65] text-black font-semibold rounded-md border-[2px] py-1 px-2 '
                onClick={() => updatePrice(product.id, product.price)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <button onClick={handleReset} className='border-[2px] rounded-md py-2 px-5 text-3xl font-semibold text-black bg-[#9CCC65] flex mx-auto mt-5'>Reset</button>
      </div>
    </div>
  );
};

export default ProductTable;


