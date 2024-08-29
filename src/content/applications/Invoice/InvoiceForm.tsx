import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Tooltip,
  IconButton
} from '@mui/material';
import { Delete } from '@mui/icons-material';

interface Items {
  name: string;
  quantity: any;
  price: any;
}

const InvoiceForm = ({ onAdd, onCancel, selectedRow, handleEdit }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [discount, setDiscount] = useState('');
  const [items, setItems] = useState<Items[]>([]);

  useEffect(() => {
    if (selectedRow) {
      setName(selectedRow.clientName);
      setAddress(selectedRow.clientAddress);
      setDiscount(selectedRow.discount);
      setItems(selectedRow.items);
    }
  }, [selectedRow]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedRow) {
      handleEdit({ name, address, discount }, items);
    } else {
      onAdd({ name, address, discount }, items);
    }
    setName('');
    setAddress('');
    setDiscount('');
  };

  return (
    <Paper style={{ padding: '20px', marginBottom: '20px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Client Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Client Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          type="number"
          label="Discount discount"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Paper style={{ padding: '20px', marginTop: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
              Items
            </Typography>
            <Button
              onClick={() =>
                setItems([...items, { name: '', quantity: '', price: '' }])
              }
              type="button"
              variant="contained"
              color="primary"
            >
              Add Item
            </Button>
          </div>

          <div
            style={{ marginTop: '20px', maxHeight: '500px', overflow: 'auto' }}
          >
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    borderBottom: '1px solid #ccc',
                    marginBottom: '10px'
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <TextField
                      type="text"
                      label="Item Name"
                      value={item.name}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].name = e.target.value;
                        setItems(newItems);
                      }}
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      type="number"
                      label="Quantity"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].quantity = Number(e.target.value);
                        setItems(newItems);
                      }}
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      type="number"
                      label="Price"
                      value={item.price}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[index].price = Number(e.target.value);
                        setItems(newItems);
                      }}
                      fullWidth
                      margin="normal"
                      required
                    />
                    <TextField
                      disabled
                      type="text"
                      label="Tax (GST)"
                      value="9%"
                      fullWidth
                      margin="normal"
                      required
                    />
                  </div>
                  <Tooltip title="Delete" style={{ marginTop: '10px' }}>
                    <IconButton
                      onClick={() => {
                        setItems(items.filter((_, i) => i !== index));
                      }}
                      color="error"
                    >
                      <Delete
                        style={{
                          color: 'red',
                          fontSize: '40px'
                        }}
                      />
                    </IconButton>
                  </Tooltip>
                </div>
              );
            })}
          </div>
        </Paper>
        <div style={{ marginTop: '20px' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginRight: '10px' }}
          >
            {selectedRow ? 'Update' : 'Add'}
          </Button>
          <Button variant="outlined" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default InvoiceForm;
