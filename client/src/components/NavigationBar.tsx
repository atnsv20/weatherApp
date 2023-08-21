import { useState, useRef } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { useMutation } from 'react-query';
import { debounce } from 'lodash';
import { useQuery } from 'react-query';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Icon,
  Collapse,
  useColorModeValue,
  Input,
  useOutsideClick,
  useColorMode,
  useToast,
} from '@chakra-ui/react';

import useUserStore from '../state/userStore.js';

import { Link } from 'react-router-dom';

import { RxChevronRight as ChevronRightIcon } from 'react-icons/rx';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { RiCelsiusLine } from 'react-icons/ri';
import { TbLetterF } from 'react-icons/tb';
import { AiTwotoneStar } from 'react-icons/ai';

interface NavItem {
  label: string;
  subLabel: string;
  id: string;
  closePopover: () => void;
}

const NavigationBar = () => {
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const isMetric = useUserStore((state) => state.isMetric);

  const updateUserConfig = async (userConfig) => {
    await axios.post('/api/setUserConfig', userConfig);
  };

  const mutation = useMutation(updateUserConfig, {
    onSuccess: () => {
      console.log('User config updated successfully!');
    },
    onError: (error) => {
      console.error('Failed to update user config:', error);
      toast({
        title: 'An error occurred.',
        description: 'Failed to update user config.',
        status: 'error',
        position: 'bottom-right',
      });
    },
  });

  const onToggleThemeColor = () => {
    const isDarkMode = colorMode === 'light';
    toggleColorMode();

    const userConfig = {
      isDarkMode,
      isMetric,
    };

    mutation.mutate(userConfig);
  };

  const onToggleMetric = () => {
    const newUserConfig = {
      isDarkMode: colorMode === 'light',
      isMetric: !isMetric,
    };

    useUserStore.setState({ isMetric: !isMetric });

    mutation.mutate(newUserConfig);
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Flex>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={1}
        >
          <IconButton
            variant='ghost'
            colorScheme='black'
            aria-label='Call Sage'
            fontSize={colorMode === 'light' ? '15px' : '20px'}
            icon={colorMode === 'light' ? <BsFillMoonFill /> : <BsSunFill />}
            onClick={onToggleThemeColor}
          />
          <IconButton
            variant='ghost'
            colorScheme='black'
            aria-label='Call Sage'
            fontSize='20px'
            icon={isMetric ? <TbLetterF /> : <RiCelsiusLine />}
            onClick={onToggleMetric}
          />
        </Stack>
      </Flex>
    </Box>
  );
};

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const toast = useToast();

  const containerRef = useRef(null);
  const [query, setQuery] = useState('');
  const [inputValue, setInputValue] = useState('');

  const fetchSearchData = async () => {
    const response = await axios.get(
      `http://dataservice.accuweather.com/locations/v1/cities/autocomplete`,
      {
        params: {
          apikey: import.meta.env.VITE_ACCU_API_KEY,
          q: query,
        },
      }
    );
    return response.data;
  };

  const { data, isLoading } = useQuery(['searchData', query], fetchSearchData, {
    enabled: !!query,
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Failed to fetch search data',
        status: 'error',
        position: 'bottom-right',
      });
    },
  });

  const handleQueryChange = debounce((searchTerm) => {
    setQuery(searchTerm);
    setIsOpen(!!searchTerm); // Open the popover if there's input, close it otherwise
  }, 500);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input value only contains Latin letters
    if (/^[a-zA-Z]*$/.test(inputValue)) {
      handleQueryChange(inputValue);
      setInputValue(inputValue);
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick({
    ref: containerRef,
    handler: () => {
      setIsOpen(false);
    },
  });

  return (
    <Stack direction={'row'} spacing={4}>
      <Flex position='relative' ref={containerRef}>
        <Input
          onChange={handleInputChange}
          value={inputValue}
          placeholder='Search'
          size='sm'
          width='200px'
          variant='outline'
        />
        <Collapse in={isOpen}>
          <LocationsDropdownContainer>
            {isLoading ? (
              <Box p={4}>Loading...</Box>
            ) : (
              <>
                {data &&
                  data.map((item) => (
                    <LocationOption
                      label={item.LocalizedName}
                      subLabel={item.Country.LocalizedName}
                      id={item.Key}
                      closePopover={() => setIsOpen(false)}
                    />
                  ))}
              </>
            )}
          </LocationsDropdownContainer>
        </Collapse>
      </Flex>
      <Link to='/favorites'>
        <Box
          p={2}
          fontSize={'sm'}
          fontWeight={500}
          color={linkColor}
          display={{ base: 'none', sm: 'block' }}
          _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
          }}
        >
          Favorites
        </Box>

        <IconButton
          variant='ghost'
          colorScheme='black'
          aria-label='Call Sage'
          fontSize='20px'
          display={{ base: 'block', sm: 'none' }}
          icon={<AiTwotoneStar />}
        />
      </Link>
    </Stack>
  );
};

const LocationOption = ({ label, id, subLabel, closePopover }: NavItem) => {
  const textColor = useColorModeValue('gray.900', 'gray.900');
  return (
    <Link to={`/city/${id}?ci=${label}&co=${subLabel}`}>
      <Box
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('blue.50', 'gray.900') }}
        onClick={closePopover}
      >
        <Stack direction={'row'} align={'center'}>
          <Box>
            <Text
              transition={'all .3s ease'}
              _groupHover={{ color: 'blue.400' }}
              fontWeight={500}
              color={textColor}
            >
              {label}
            </Text>
            <Text
              transition={'all .3s ease'}
              fontSize={'sm'}
              color={textColor}
              _groupHover={{ color: 'blue.400' }}
            >
              {subLabel}
            </Text>
          </Box>
          <Flex
            transition={'all .3s ease'}
            transform={'translateX(-10px)'}
            opacity={0}
            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
            justify={'flex-end'}
            align={'center'}
            flex={1}
          >
            <Icon color={'blue.400'} w={5} h={5} as={ChevronRightIcon} />
          </Flex>
        </Stack>
      </Box>
    </Link>
  );
};

const LocationsDropdownContainer = styled(Box)`
  position: absolute;
  width: 100%;
  border: 1px solid;
  border-color: var(--chakra-colors-gray-200);
  background-color: var(--chakra-colors-white);
  border-radius: 10px;
  z-index: 1000;
  margin-top: 0px;
  left: 0;
  top: 40px;
`;

export default NavigationBar;
