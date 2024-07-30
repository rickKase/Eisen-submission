import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChakraProvider, Flex } from '@chakra-ui/react';
import theme from './themes/theme';
import Navbar from './components/Navbar';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import Message from './components/Message';
import { NavbarHeightContext } from './context/NavbarHeightContext';
import { FooterHeightContext } from './context/FooterHeightContext';
import axios from 'axios';

const App: React.FC = () => {
  const [navbarHeight, setNavbarHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const navbarRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const [files, setFiles] = useState<Array<{ id: string; filename: string; upload_date: string }>>([]);
  const [message, setMessage] = useState<{ text: string; status: 'success' | 'error' | 'info' } | null>(null);

  const fetchFiles = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/files');
      console.log('Fetched files:', response.data);
      setFiles(response.data);
    } catch (error) {
      console.error('Error fetching files', error);
    }
  }, []);

  const updateHeights = useCallback(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.clientHeight);
    }

    if (footerRef.current) {
      setFooterHeight(footerRef.current.clientHeight);
    }
  }, []);

  useEffect(() => {
    updateHeights();

    window.addEventListener('resize', updateHeights);
    return () => window.removeEventListener('resize', updateHeights);
  }, [updateHeights]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  // Use effect to clear the message after 3 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleFileDelete = (id: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
    fetchFiles();
    setMessage({ text: 'File deleted successfully', status: 'success' });
  };

  const handleFileUpload = () => {
    fetchFiles();
    setMessage({ text: 'File uploaded successfully', status: 'success' });
  };

  const handleFileDownload = (msg: string, status: 'success' | 'error') => {
    setMessage({ text: msg, status });
  };

  return (
    <ChakraProvider theme={theme}>
      <NavbarHeightContext.Provider value={navbarHeight}>
        <FooterHeightContext.Provider value={footerHeight}>
          <Flex direction="column" minHeight="100vh">
            <Navbar ref={navbarRef} />
            <Header />
            <FileList files={files} onDelete={handleFileDelete} showMessage={handleFileDownload} />
            <FileUpload ref={footerRef} onFileUploaded={handleFileUpload} showMessage={handleFileDownload} />
            {message && <Message message={message.text} status={message.status} />}
          </Flex>
        </FooterHeightContext.Provider>
      </NavbarHeightContext.Provider>
    </ChakraProvider>
  );
};

export default App;
