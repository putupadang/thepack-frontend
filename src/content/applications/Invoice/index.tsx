import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import { Edit, Delete, Visibility } from '@mui/icons-material';
import InvoiceForm from './InvoiceForm';
import AuthHook from 'src/hooks/useAuth';
import { fetcher, priceFormatter } from 'src/utils/helper';
import { toast } from 'react-toastify';
import InvoiceDetail from './Detail';

const MyTablePage = () => {
  const token = AuthHook().getTokenAuth();
  const [rows, setRows] = useState<any>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [isShowDetail, setIsShowDetail] = useState(false);

  const getData = async () => {
    const res = await fetcher('GET', '/invoice', null, token);
    setRows(res);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleView = (item: any) => {
    setSelectedRow(item);
    setIsShowDetail(true);
  };

  const handleEdit = async (editedItem: any) => {
    const params = {
      amount: editedItem.amount,
      clientName: editedItem.name,
      clientAddress: editedItem.address
    };
    const res = await fetcher(
      'PUT',
      `/invoice/${selectedRow._id}`,
      JSON.stringify(params),
      token
    );

    if (res?.number) {
      toast.success('Invoice updated successfully');
      getData();
      setIsAdding(false);
      setSelectedRow(null);
      return;
    }
  };

  const handleDelete = async (id: any) => {
    const res = await fetcher('DELETE', `/invoice/${id}`, null, token);
    if (res?.message) {
      toast.success('Invoice deleted successfully');
      getData();
      return;
    }
  };

  const handleAdd = async (newItem: any) => {
    const params = {
      amount: newItem.amount,
      clientName: newItem.name,
      clientAddress: newItem.address
    };
    const res = await fetcher(
      'POST',
      '/invoice',
      JSON.stringify(params),
      token
    );

    if (res?.number) {
      toast.success('Invoice added successfully');
      getData();
      setIsAdding(false);
      return;
    }
  };

  const handleAddButtonClick = () => {
    setIsAdding(true);
  };

  const handleCancel = () => {
    setIsAdding(false);
    setSelectedRow(null);
    setIsShowDetail(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      {isShowDetail && selectedRow ? (
        <InvoiceDetail invoice={selectedRow} backAction={handleCancel} />
      ) : (
        <>
          {isAdding ? (
            <InvoiceForm
              onAdd={handleAdd}
              onCancel={handleCancel}
              selectedRow={selectedRow}
              handleEdit={handleEdit}
            />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddButtonClick}
              style={{ marginBottom: '20px' }}
            >
              Add New Item
            </Button>
          )}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Invoice No.</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Address</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row: any) => (
                  <TableRow key={row._id}>
                    <TableCell>{row.number}</TableCell>
                    <TableCell>{priceFormatter(row.amount)}</TableCell>
                    <TableCell>{row.clientName}</TableCell>
                    <TableCell>{row.clientAddress}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="View">
                        <IconButton onClick={() => handleView(row)}>
                          <Visibility />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => {
                            setSelectedRow(row);
                            setIsAdding(true);
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => handleDelete(row._id)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
};

export default MyTablePage;
