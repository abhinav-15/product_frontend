// EditPriceModal.js
import React, { useState } from 'react';
import axios from 'axios';

const EditPriceModal = ({ productId, onClose, onSave }) => {
  const [newPrice, setNewPrice] = useState('');

  const handleSave = () => {
    // Send the updated price to the server
    axios.put(`https://product-d4kl.onrender.com/api/products/${productId}/update-price`, { newPrice })
      .then(response => {
        onSave(response.data);
        onClose();
      })
      .catch(error => console.error('Error updating price:', error));
  };

  return (
    <div className="modal">
      <h2>Edit Price</h2>
      <input
        type="number"
        value={newPrice}
        onChange={e => setNewPrice(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditPriceModal;
