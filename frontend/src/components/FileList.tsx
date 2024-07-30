import React, { useEffect } from 'react';
import { List, ListItem, Box, Text, Flex } from '@chakra-ui/react';
import DeleteButton from './DeleteButton';
import DownloadButton from './DownloadButton';

interface FileListProps {
  files: Array<{ id: string, filename: string, upload_date: string }>;
  onDelete: (id: string) => void;
  showMessage: (msg: string, status: 'success' | 'error') => void;
}

const FileList: React.FC<FileListProps> = ({ files, onDelete, showMessage }) => {
  useEffect(() => {
    console.log('Files to display:', files);
  }, [files]);

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  return (
    <Box
      mx="3vw"
      pt="14rem"
      flex="1"
      display="flex"
      flexDirection="column"
      background="secondary.default"
      overflowY="auto"
      pb="8.5rem"
    >
      <List spacing="4.5rem" textColor="black">
        {files.length > 0 ? (
          files.map((file) => (
            <ListItem key={file.id} background="white" p={4}>
              <Flex alignItems="center" justifyContent="space-between">
                <Box>
                  <Text fontWeight="bold">{file.filename}</Text>
                  <Text fontSize="sm">Uploaded on: {new Date(file.upload_date).toLocaleString()}</Text>
                </Box>
                <Flex alignItems="center">
                  <DownloadButton 
                    fileId={file.id} 
                    filename={file.filename} 
                    showMessage={showMessage} 
                  />
                  <Box ml="1rem">
                    <DeleteButton 
                      fileId={file.id} 
                      onDelete={handleDelete} 
                      showMessage={showMessage} 
                    />
                  </Box>
                </Flex>
              </Flex>
            </ListItem>
          ))
        ) : (
          <Text></Text>
        )}
      </List>
    </Box>
  );
};

export default FileList;
