import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import styled from '@emotion/styled';

interface WeatherDetailProps {
  icon: JSX.Element;
  title: string;
  value: string;
}

const WeatherDetail = ({ icon, title, value }: WeatherDetailProps) => (
  <Flex align='center'>
    <IconContainer>{icon}</IconContainer>
    <Heading as='h2' size='xs' fontWeight='100' minW='110px'>
      {title}
    </Heading>
    <Text>{value}</Text>
  </Flex>
);

const IconContainer = styled(Box)`
  opacity: 0.5;
  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 5px;
    margin-right: 10px;
  }
`;

export default WeatherDetail;
