import styled from '@emotion/styled';
import { format } from 'date-fns';

import { Flex, Box, Heading, Text } from '@chakra-ui/react';

import WeatherDetailField from './WeatherDetailField';
import iconMap from '../utils/iconMap';

interface WeatherData {
  Icon: number;
  LongPhrase: string;
  PrecipitationProbability: number;
  ThunderstormProbability: number;
  Wind: {
    Speed: {
      Value: number;
      Unit: string;
    };
  };
}

interface DailyForecasts {
  day: WeatherData;
  night: WeatherData;
  date: string;
}

type WeatherInfoProps = {
  timeOfDay: string;
  icon: number;
  longPhrase: string;
  rainChance: number;
  thunderChance: number;
  windSpeed: number;
  windUnit: string;
};

const WeatherInfo = ({
  timeOfDay,
  icon,
  longPhrase,
  rainChance,
  thunderChance,
  windSpeed,
  windUnit,
}: WeatherInfoProps) => (
  <div>
    <Flex>
      <Box>
        <Flex align='center' mb='20px'>
          <IconContainer>{iconMap[icon]}</IconContainer>
          <Heading as='h2' size='xs' fontWeight='100'>
            {timeOfDay}
          </Heading>
        </Flex>
        <Text maxW='250px' minH='65px' mb='20px' fontSize='sm'>
          {longPhrase}
        </Text>
      </Box>
    </Flex>
    <WeatherDetailField
      icon={iconMap[12]}
      title='Rain chance'
      value={`${rainChance}%`}
    />
    <WeatherDetailField
      icon={iconMap[45]}
      title='Wind speed'
      value={`${windSpeed} ${windUnit}`}
    />
    <WeatherDetailField
      icon={iconMap[46]}
      title='Thunder chance'
      value={`${thunderChance}%`}
    />
  </div>
);

const DayNightWeatherDisplay = ({ day, night, date }: DailyForecasts) => {
  console.log('day', day)
  console.log('day', night)
  console.log('day', date)
  const dateObj = new Date(date);
  const formattedDate = format(dateObj, 'EEEE, MMM d yyyy');

  return (
    <Box maxW='550px'>
      <Text mb='30px' fontWeight={100}>
        {formattedDate}
      </Text>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        justify='space-between'
        wrap='wrap'
      >
        <WeatherInfo
          timeOfDay='Day'
          icon={day.Icon}
          longPhrase={day.LongPhrase}
          rainChance={day.PrecipitationProbability}
          thunderChance={day.ThunderstormProbability}
          windSpeed={day.Wind.Speed.Value}
          windUnit={day.Wind.Speed.Unit}
        />

        <Separator
          height={{ base: '1px', lg: 'unset' }}
          width={{ base: 'unset', lg: '1px' }}
          my={{ base: '20px', lg: '0px' }}
          mx={{ base: '0px', lg: '20px' }}
        />

        <WeatherInfo
          timeOfDay='Night'
          icon={night.Icon}
          longPhrase={night.LongPhrase}
          rainChance={night.PrecipitationProbability}
          thunderChance={night.ThunderstormProbability}
          windSpeed={night.Wind.Speed.Value}
          windUnit={night.Wind.Speed.Unit}
        />
      </Flex>
    </Box>
  );
};

const IconContainer = styled(Box)`
  opacity: 0.5;
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
    margin-right: 10px;
  }
`;

const Separator = styled(Box)`
  background-color: #e1dede;
`;

export default DayNightWeatherDisplay;
