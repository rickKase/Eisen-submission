import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import { Box, Flex, Input, IconButton } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/react';
import { FaFileUpload, FaFileAlt } from 'react-icons/fa';

interface FileUploadProps {
  onFileUploaded: () => void;
  showMessage: (msg: string, status: 'success' | 'error') => void;
}

const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(({ onFileUploaded, showMessage }, ref) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const theme = useTheme();

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      showMessage('No file selected for upload', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:5000/api/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onFileUploaded();
      setSelectedFile(null); // Reset the selected file after successful upload
      showMessage('File uploaded successfully', 'success');
    } catch (error) {
      console.error('Error uploading file', error);
      showMessage('Error uploading file', 'error');
    }
  };

  return (
    <Box
      ref={ref}
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      p={4}
      background="secondary.default"
      zIndex={1000}
      boxShadow="md"
    >
      <Box as="form" onSubmit={handleFileUpload} noValidate>
        <Flex alignItems="center" justifyContent="center">
          <Box
            as="label"
            htmlFor="file-upload"
            display="flex"
            alignItems="center"
            justifyContent="center"
            backgroundColor={theme.colors.tertiary.default}
            color="white"
            borderRadius="md"
            cursor="pointer"
            _hover={{ backgroundColor: theme.colors.white.default, color: theme.colors.black.default }}
            mr={2}
            p={2}
          >
            <FaFileAlt />
            <Input
              id="file-upload"
              type="file"
              display="none"
              onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
            />
          </Box>
          <Box
            flex="1"
            p={2}
            textAlign="left"
            textColor="white"
            mx={4}
          >
            {selectedFile ? selectedFile.name : "New File to Upload"}
          </Box>
          <Flex alignItems="center">
            <IconButton
              type="submit"
              aria-label="Upload"
              icon={<FaFileUpload />}
              backgroundColor={theme.colors.tertiary.default}
              color="white"
              borderRadius="md"
              _hover={{ backgroundColor: theme.colors.white.default, color: theme.colors.black.default }}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
});

export default FileUpload;
