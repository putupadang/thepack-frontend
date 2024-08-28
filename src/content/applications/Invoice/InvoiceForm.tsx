import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

const InvoiceForm = ({ onAdd, onCancel, selectedRow, handleEdit }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    if (selectedRow) {
      setName(selectedRow.clientName);
      setAddress(selectedRow.clientAddress);
      setAmount(selectedRow.amount);
    }
  }, [selectedRow]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedRow) {
      handleEdit({ name, address, amount });
    } else {
      onAdd({ name, address, amount });
    }
    setName('');
    setAddress('');
    setAmount('');
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
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
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
