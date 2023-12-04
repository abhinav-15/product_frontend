// // Category.js
// import React from 'react';

// const Category = ({ category, setCategory }) => {
//   const handleCategoryClick = (title) => {
//     setCategory(title);
//   };

//   return (
//     <div>
//       {category.map(category => (
//         <button key={category.id} onClick={() => handleCategoryClick(category.title)}>
//           {category.title}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Category;


// const Category = ({ category, setCategory }) => {
//     const handleCategoryClick = (clickedCategory) => {
//       setCategory(clickedCategory);
//     };
  
//     return (
//       <div>
//         {category.map(categoryItem => (
//           <button key={categoryItem.id} onClick={() => handleCategoryClick(categoryItem)}>
//             {categoryItem.title}
//           </button>
//         ))}
//       </div>
//     );
//   };
  
//   export default Category;


// Category.js
// import React from 'react';

// const Category = ({ category, setCategory, handleCategoryClick }) => {
//   return (
//     <div className='flex flex-row gap-3 mt-8'>
//       {category.map(categoryItem => (
//         <button className='border-[2px] rounded-md py-1 px-2 text-black text-2xl font-semibold transition-all duration-200 mx-auto bg-[#9CCC65]' key={categoryItem.id} onClick={() => handleCategoryClick(categoryItem)}>
//           {categoryItem.title}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Category;

import React from 'react';

const Category = ({ category, setCategory, handleCategoryClick }) => {
  const handleDropdownChange = (event) => {
    const selectedCategory = category.find(item => item.title === event.target.value);
    handleCategoryClick(selectedCategory);
  };

  return (
    <div className='flex flex-row gap-3 mt-8  ml-[1000px]'>
      <label htmlFor="categoryDropdown" className="text-[#9CCC65] relative text-4xl right-[-270px] font-semibold ">Category:</label>
      <select
        id="categoryDropdown"
        className='border-[2px] rounded-md py-1 px-2 text-black text-2xl  ml-[300px] font-semibold transition-all duration-200 mx-auto bg-[#9CCC65]'
        onChange={handleDropdownChange}
      >
        <option value="">All Categories</option>
        {category.map(categoryItem => (
          <option key={categoryItem.id} value={categoryItem.title}>
            {categoryItem.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Category;

