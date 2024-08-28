import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Button
} from '@mui/material';
import { priceFormatter } from 'src/utils/helper';

const InvoiceDetail = ({ invoice, backAction }) => {
  const {
    number,
    amount,
    date,
    clientName,
    clientAddress,
    createdAt,
    updatedAt
  } = invoice;

  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Invoice Details
        </Typography>
        <Divider style={{ marginBottom: '20px' }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Invoice Number:</Typography>
            <Typography variant="body1">{number}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Amount:</Typography>
            <Typography variant="body1">{priceFormatter(amount)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Date:</Typography>
            <Typography variant="body1">
              {new Date(date).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Client Name:</Typography>
            <Typography variant="body1">{clientName}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Client Address:</Typography>
            <Typography variant="body1">{clientAddress}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Created At:</Typography>
            <Typography variant="body1">
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">Updated At:</Typography>
            <Typography variant="body1">
              {new Date(updatedAt).toLocaleString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        onClick={backAction}
        style={{ marginTop: '20px' }}
      >
        Back
      </Button>
    </Container>
  );
};

export default InvoiceDetail;
