import React from 'react';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const Header: React.FC = () => {
  return (
    <Box
      position="fixed"
      top="5rem" // Adjust according to the height of the Navbar
      left={0}
      right={0}
      zIndex={999}
      bg="white"
      px="3vw"
      py="4"
      boxShadow="md"
    >
      <Flex justify="space-between" align="center">
        <Heading size="lg" color="tertiary.default">Eisen Files</Heading>
        <Text color="tertiary.default" fontSize="lg">React-Flask-SQLite Submission</Text>
      </Flex>
    </Box>
  );
};

export default Header;
