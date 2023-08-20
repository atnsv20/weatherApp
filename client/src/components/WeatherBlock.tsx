import styled from '@emotion/styled';
import { Heading, Flex, Box } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import iconMap from '../utils/iconMap';

const WeatherBlock = ({ weatherData }) => {
  const dayOfTheWeek = format(parseISO(weatherData.Date), 'EEE');

  return (
    <Flex flexDir='column' align='center' m={{ base: '10px', xl: '20px' }}>
      <Heading as='h4' size='md' fontWeight='100'>
        {dayOfTheWeek}
      </Heading>
      <IconContainer>{iconMap[weatherData.Day.Icon]}</IconContainer>
      <Heading as='h4' size='md' fontWeight='100'>
        {weatherData.Temperature.Maximum.Value}°
      </Heading>
    </Flex>
  );
};

const IconContainer = styled(Box)`
  margin: 20px 0;
  svg {
    width: 40px;
    height: 40px;
  }
`;

export default WeatherBlock;
