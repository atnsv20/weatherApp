import { useQuery } from 'react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import useUserStore from '../state/userStore';

const DEFAULT_CITY_ID = '328328'; // London's key

export const useFiveDayForecast = () => {
  const { city_id = DEFAULT_CITY_ID } = useParams<{ city_id?: string }>();
  const { isMetric } = useUserStore();
  const toast = useToast();

  return useQuery(
    ['forecast', city_id, isMetric],
    async () => {
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city_id}`,
        {
          params: {
            apikey: import.meta.env.VITE_ACCU_API_KEY,
            metric: isMetric,
            details: true,
          },
        }
      );

      return response.data;
    },
    {
      retry: false,
      onError: () => {
        toast({
          title: 'An error occurred.',
          description: 'Failed to grab the 5 day forecast.',
          status: 'error',
          position: 'bottom-right',
        });
      },
    }
  );
};

export const useTwelveHourForecast = () => {
  const { city_id = DEFAULT_CITY_ID } = useParams<{ city_id?: string }>();
  const { isMetric } = useUserStore();
  const toast = useToast();

  return useQuery(
    ['hourlyForecast', city_id, isMetric],
    async () => {
      const response = await axios.get(
        `http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/${city_id}`,
        {
          params: {
            apikey: import.meta.env.VITE_ACCU_API_KEY,
            metric: isMetric,
          },
        }
      );
      return response.data;
    },
    {
      retry: false,
      onError: () => {
        toast({
          title: 'An error occurred.',
          description: 'Failed to grab the 12 hour forecast.',
          status: 'error',
          position: 'bottom-right',
        });
      },
    }
  );
};
