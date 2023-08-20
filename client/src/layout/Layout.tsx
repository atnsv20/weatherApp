import axios from 'axios';
import { Outlet } from 'react-router-dom';
import { useQuery } from 'react-query';

import { Flex, Spinner, useColorMode, useToast } from '@chakra-ui/react';

import { useUserStore } from '../state';
import NavigationBar from '../NavigationBar';

const Layout = () => {
  const setIsMetric = useUserStore((state) => state.setIsMetric);
  const setFavorites = useUserStore((state) => state.setFavorites);

  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();

  const fetchUserConfig = async () => {
    const { data } = await axios.get('/api/userConfig');
    return data;
  };

  const fetchFavorites = async () => {
    const { data } = await axios.get('/api/favorites');
    return data;
  };

  const { isLoading: favoriteCitiesLoading } = useQuery(
    ['favorites'],
    fetchFavorites,
    {
      retry: false,
      onSuccess: (data) => {
        if (data) {
          setFavorites(data);
        }
      },
      onError: () => {
        toast({
          title: 'An error occurred.',
          description: 'Failed to grab favorites.',
          status: 'error',
          position: 'bottom-right',
        });
      },
    }
  );

  const { isLoading } = useQuery('userConfig', fetchUserConfig, {
    retry: false,
    onSuccess: (data) => {
      if (data && typeof data.isMetric !== 'undefined') {
        setIsMetric(data.isMetric);
      }
      if (data && typeof data.isDarkMode !== 'undefined') {
        if (data.isDarkMode && colorMode === 'light') {
          toggleColorMode();
        }
      }
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Failed to grab user config.',
        status: 'error',
        position: 'bottom-right',
      });
    },
  });

  if (isLoading || favoriteCitiesLoading) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <Spinner size='xl' />
      </Flex>
    );
  }

  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

export default Layout;
