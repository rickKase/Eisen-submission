import React from 'react';
import { Button, useTheme } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import axios from 'axios';

interface DownloadButtonProps {
  fileId: string;
  filename: string;
  showMessage: (msg: string, status: 'success' | 'error') => void;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ fileId, filename, showMessage }) => {
  const theme = useTheme();

  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/files/${fileId}/download`, {
        responseType: 'blob',
      });

      if (response.status === 200) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        link.remove();
        showMessage('File downloaded successfully', 'success');
      } else {
        showMessage('Error downloading file', 'error');
      }
    } catch (error) {
      console.error('Error downloading file', error);
      showMessage('Error downloading file', 'error');
    }
  };

  return (
    <Button
      onClick={handleDownload}
      backgroundColor={theme.colors.tertiary.default}
      color="white"
      borderRadius="md"
      _hover={{ backgroundColor: theme.colors.white.default, color: theme.colors.black.default }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <DownloadIcon />
    </Button>
  );
};

export default DownloadButton;
