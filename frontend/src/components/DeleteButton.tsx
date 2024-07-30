import React, { useState } from 'react';
import { Button, useTheme } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

interface DeleteButtonProps {
  fileId: string;
  onDelete: (id: string) => void;
  showMessage: (msg: string, status: 'success' | 'error') => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ fileId, onDelete, showMessage }) => {
  const [confirm, setConfirm] = useState(false);
  const theme = useTheme();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/files/${fileId}`);
      if (response.status === 200) {
        onDelete(fileId); // Update the parent component state
        showMessage('File deleted successfully', 'success');
      } else {
        showMessage('Error deleting file', 'error');
      }
    } catch (error) {
      console.error('Error deleting file', error);
      showMessage('Error deleting file', 'error');
    }
  };

  const handleClick = () => {
    if (confirm) {
      handleDelete();
      setConfirm(false);
    } else {
      setConfirm(true);
    }
  };

  const handleMouseLeave = () => {
    setConfirm(false);
  };

  return (
    <Button
      backgroundColor={confirm ? '#ff0000' : theme.colors.red[600]}
      color="white"
      onClick={handleClick}
      onMouseLeave={handleMouseLeave}
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={confirm ? 2 : 4}
      _hover={{
        backgroundColor: confirm ? '#ff0000' : theme.colors.red[700],
      }}
    >
      {confirm ? 'Ya Sure?' : <DeleteIcon />}
    </Button>
  );
};

export default DeleteButton;
