import React from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Divider,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@mui/material';
import { priceFormatter } from 'src/utils/helper';

const InvoiceDetail = ({ invoice, backAction }) => {
  const { number, discount, date, clientName, clientAddress, items, total } =
    invoice;

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
        </Grid>

        <Divider style={{ margin: '20px 0' }} />

        <Typography variant="h6" gutterBottom>
          Items
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Tax (GST 9%)</TableCell>
                <TableCell align="right">Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item: any, index: any) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">
                    {priceFormatter(item.price)}
                  </TableCell>
                  <TableCell align="right">
                    {priceFormatter(item.tax)}
                  </TableCell>
                  <TableCell align="right">
                    {priceFormatter(item.calculatedPrice)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Divider style={{ margin: '20px 0' }} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Discount:</Typography>
            <Typography variant="body1">{priceFormatter(discount)}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Sub Total:</Typography>
            <Typography variant="body1">{priceFormatter(total)}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Grand Total:</Typography>
            <Typography variant="body1">
              {priceFormatter(total - discount)}
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
