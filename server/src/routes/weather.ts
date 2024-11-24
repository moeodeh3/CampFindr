import express, { Request, Response } from 'express';
import { getForecastFromResourceLocationId } from '../service/open-weather/forecast.js';
import { getResourceLocationId } from '../service/mapLegend/mapLegend.js';

export const weatherRouter = express.Router();

weatherRouter.get(
  '/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const resourceLocationId = await getResourceLocationId(Number(id));
      if (!resourceLocationId) {
        return res
          .status(404)
          .json({ error: 'Resource location id not found' });
      }

      const data = await getForecastFromResourceLocationId(resourceLocationId);

      if (!data) {
        return res.status(404).json({ error: 'Unable to get forecast' });
      }
      return res.status(200).json(data);
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Failed to fetch weather forecast ', err });
    }
  }
);
