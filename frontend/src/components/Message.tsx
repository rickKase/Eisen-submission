import React, { useState, useEffect } from 'react';
import { Alert, AlertIcon, Box, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { FaFlagUsa } from 'react-icons/fa';

interface MessageProps {
  message: string;
  status: 'success' | 'error' | 'info';
}

const Message: React.FC<MessageProps> = ({ message, status }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000); // Hide after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  const bgColor = status === 'success' ? 'blue.500' : status === 'error' ? 'red.500' : 'gray.500';
  const borderColor = status === 'success' ? 'red.500' : status === 'error' ? 'blue.500' : 'white';

  return (
    <Box position="fixed" bottom="10px" left="50%" transform="translateX(-50%)" zIndex={1000}>
      <Alert
        status={status}
        variant="solid"
        backgroundColor={bgColor}
        borderRadius="md"
        border="2px"
        borderColor={borderColor}
        color="white"
        display="flex"
        alignItems="center"
      >
        <AlertIcon as={FaFlagUsa} color="white" />
        <Box flex="1">
          <AlertTitle fontSize="lg" fontWeight="bold">
            {status === 'success' ? 'Success!' : status === 'error' ? 'Error!' : 'Info'}
          </AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Box>
      </Alert>
    </Box>
  );
};

export default Message;
