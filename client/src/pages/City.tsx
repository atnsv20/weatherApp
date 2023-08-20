import { Flex, Box } from '@chakra-ui/react';

import DayNightWeatherDisplay from '../components/DayNightWeatherDisplay';
import WeatherBlock from '../components/WeatherBlock.js';
import TodayWeatherBlock from '../components/TodayWeatherBlock.js';
import LineChart from '../components/LineChart.js';

import {
  useFiveDayForecast,
  useTwelveHourForecast,
} from '../services/weatherService.js';

const City = () => {
  const {
    data: dailyForecast,
    isLoading: dailyLoading,
    isError: dailyError,
  } = useFiveDayForecast();
  const {
    data: twelveHourForecast = [],
    isLoading: hourlyLoading,
    isError: hourlyError,
  } = useTwelveHourForecast();

  if (dailyError || hourlyError)
    return (
      <Flex justify='center' align='center' height='calc(100% - 60px)'>
        <Box>Something went wrong...</Box>
      </Flex>
    );

  const data = twelveHourForecast?.map((item) => {
    return {
      date: item.DateTime,
      temp: item.Temperature.Value,
    };
  });

  if (dailyLoading || hourlyLoading) return <div>Loading...</div>;

  return (
    <Flex
      gap='80px'
      flexDir={{ base: 'column', lg: 'row' }}
      w='100%'
      align='center'
      justify={{ base: 'unset', lg: 'center' }}
      height='calc(100% - 60px)'
    >
      <Box marginTop={{ base: '40px', lg: 'unset' }}>
        <TodayWeatherBlock weatherData={dailyForecast} />
        <Flex justify='center' mt='80px'>
          {dailyForecast?.DailyForecasts.map((item, index) => {
            return <WeatherBlock key={index} weatherData={item} />;
          })}
        </Flex>
      </Box>
      <Flex
        flexDir='column'
        w='100%'
        maxW='550px'
        px={{ base: '20px', lg: '0px' }}
        gap='40px'
      >
        <DayNightWeatherDisplay
          day={dailyForecast?.DailyForecasts[0].Day}
          night={dailyForecast?.DailyForecasts[0].Night}
          date={dailyForecast?.DailyForecasts[0]?.Date}
        />
        <LineChart weatherData={data} />
      </Flex>
    </Flex>
  );
};

export default City;
