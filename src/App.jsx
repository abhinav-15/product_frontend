// App.js

import React from 'react';
import ProductTable from './components/ProductTable';
import EditPriceModal from './components/EditPriceModal';


const App = () => {
  const [selectedProductId, setSelectedProductId] = React.useState(null);

  const handleEditPrice = (productId) => {
    setSelectedProductId(productId);
  };

  const handleSavePrice = (updatedProduct) => {
    // Update the product in the state or refetch all products from the server
  };

  return (
    <div className='bg-[#1E1E1E] w-screen h-screen overflow-x-hidden'>
      
      <h1 className='text-8xl font-bold text-center text-[#8CBE52] bg-[#4F4F4F] underline py-4'>Products</h1>
      <ProductTable onEditPrice={handleEditPrice} />
      {selectedProductId && (
        <EditPriceModal
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
          onSave={handleSavePrice}
        />
      )}
    </div>
  );
};

export default App;

