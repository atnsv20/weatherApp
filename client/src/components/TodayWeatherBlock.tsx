import { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import { useSearchParams, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { Flex, Box, Heading, useToast } from '@chakra-ui/react';

import iconMap from '../utils/iconMap';
import useUserStore from '../state/userStore';

import { AiTwotoneStar } from 'react-icons/ai';

const DEFAULT_CITY_ID = '328328'; // London's key

const TodayWeatherBlock = ({ weatherData }) => {
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const { city_id = DEFAULT_CITY_ID } = useParams<{ city_id?: string }>();

  const city = searchParams.get('ci');
  const country = searchParams.get('co');

  const favoriteCities = useUserStore((state) => state.favorites);
  const isMetric = useUserStore((state) => state.isMetric);

  const setFavorites = useUserStore((state) => state.setFavorites);
  const [isFavorite, setFavorite] = useState(
    (favoriteCities || []).some((item) => item.key === city_id)
  );

  const addFavorite = async (favorite) => {
    await axios.post('/api/favorites/add', favorite);

    setFavorites([...favoriteCities, favorite]);
    setFavorite(true);
  };

  const removeFavorite = async (favorite) => {
    await axios.post('/api/favorites/remove', favorite);

    setFavorites(favoriteCities.filter((item) => item.key !== favorite.key));
    setFavorite(false);
  };

  const mutateAdd = useMutation(addFavorite, {
    onSuccess: () => {
      toast({
        title: 'Added to favorites',
        position: 'bottom-right',
      });
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Failed to update favorites',
        status: 'error',
        position: 'bottom-right',
      });
    },
  });

  const mutateRemove = useMutation(removeFavorite, {
    onSuccess: () => {
      toast({
        title: 'Removed from favorites',
        position: 'bottom-right',
      });
    },
    onError: () => {
      toast({
        title: 'An error occurred.',
        description: 'Failed to update favorites',
        status: 'error',
        position: 'bottom-right',
      });
    },
  });

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    e.preventDefault();

    const currentCity = {
      key: city_id,
      city: city || 'London',
      country: country || 'UK',
    };

    if (isFavorite) {
      mutateRemove.mutate(currentCity);
    } else {
      mutateAdd.mutate(currentCity);
    }
  };

  return (
    <Flex flexDir='column' align='center'>
      <IconContainer>
        {iconMap[weatherData.DailyForecasts[0].Day.Icon]}
      </IconContainer>
      <Heading as='h3' size='lg' textTransform='uppercase'>
        {weatherData.DailyForecasts[0].Day.IconPhrase}
      </Heading>
      <Flex>
        <Heading
          opacity='0.6'
          as='h4'
          size='sm'
          mb='2rem'
          textTransform='uppercase'
        >
          {city || 'London'}, {country || 'UK'}
        </Heading>
        <FavoriteButton onClick={handleFavoriteClick} fill='red'>
          <AiTwotoneStar fill={isFavorite ? 'orange' : 'gray'} />
        </FavoriteButton>
      </Flex>
      <Heading as='h1' size='4xl' fontWeight='100'>
        {weatherData.DailyForecasts[0].Temperature.Maximum.Value}
        {isMetric ? '°' : ''}
      </Heading>
    </Flex>
  );
};

const IconContainer = styled(Box)`
  margin-bottom: 40px;
  svg {
    width: 80px;
    height: 80px;
  }
`;

const FavoriteButton = styled(Box)`
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;

export default TodayWeatherBlock;
