import React from 'react';
import { Box, Flex, Image } from '@chakra-ui/react';
import logo from '../assets/images/logo_inverted.png'; // Import your logo image

const Navbar = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Box
      ref={ref}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="tertiary.default"
    >
      <Flex as="nav" alignItems="center" justifyContent="center">
        <Box className="logo">
          <Image src={logo} alt="Rick's Logo" />
        </Box>
      </Flex>
    </Box>
  );
});

export default Navbar;
