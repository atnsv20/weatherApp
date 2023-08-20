import {
  Box,
  Flex,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import useUserStore from '../state/userStore.js';

import { RxChevronRight as ChevronRightIcon } from 'react-icons/rx';
import { AiTwotoneStar } from 'react-icons/ai';

const Favorites = () => {
  const bgColor = useColorModeValue('blue.50', 'gray.900');
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const favoriteCities = useUserStore((state) => state.favorites);

  return (
    <Flex justify='center'>
      <Box maxW='550px' mt='40px'>
        {favoriteCities.map((item) => {
          return (
            <Link
              key={item.key}
              to={`/city/${item.key}?ci=${item.city}&co=${item.country}`}
            >
              <Box
                role={'group'}
                display={'block'}
                p={2}
                rounded={'md'}
                _hover={{ bg: bgColor }}
                minW='400px'
                borderBottom={'1px solid rgba(0,0,0,0.07)'}
              >
                <Stack direction={'row'} align={'center'}>
                  <AiTwotoneStar />
                  <Box>
                    <Text
                      transition={'all .3s ease'}
                      _groupHover={{ color: 'blue.400' }}
                      fontWeight={500}
                      color={textColor}
                    >
                      {item.city}
                    </Text>
                    <Text fontSize={'sm'}>{item.country}</Text>
                  </Box>
                  <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{
                      opacity: '100%',
                      transform: 'translateX(0)',
                    }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}
                  >
                    <Icon
                      color={'blue.400'}
                      w={5}
                      h={5}
                      as={ChevronRightIcon}
                    />
                  </Flex>
                </Stack>
              </Box>
            </Link>
          );
        })}
      </Box>
    </Flex>
  );
};

export default Favorites;
