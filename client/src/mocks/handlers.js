import { rest } from 'msw';
import { dailyForecast, twelveHourForecast, autocomplete } from '../data.js';

export const handlers = [
  rest.get(
    'http://dataservice.accuweather.com/forecasts/v1/daily/5day/:city_id',
    (req, res, ctx) => {
      const isMetric = req.url.searchParams.get('metric') === 'true';

      let mockData;

      if (isMetric) {
        mockData = dailyForecast;
      } else {
        mockData = dailyForecast;
      }

      return res(ctx.json(mockData));
    }
  ),
  rest.get(
    'http://dataservice.accuweather.com/forecasts/v1/hourly/12hour/:city_id',
    (req, res, ctx) => {
      const isMetric = req.url.searchParams.get('metric') === 'true';

      let mockData;

      if (isMetric) {
        mockData = twelveHourForecast;
      } else {
        mockData = twelveHourForecast;
      }

      return res(ctx.json(mockData));
    }
  ),
  rest.get(
    'http://dataservice.accuweather.com/locations/v1/cities/autocomplete',
    (req, res, ctx) => {
      return res(ctx.json(autocomplete));
    }
  ),
];
