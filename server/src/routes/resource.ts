import express, { Request, Response } from 'express';
import { getResourceLocationDetails } from '../service/resource/resourceLegend.js';
import { getResourceLocationId } from '../service/mapLegend/mapLegend.js';

export const resourceRouter = express.Router();

resourceRouter.get(
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

      const data = await getResourceLocationDetails(resourceLocationId);
      if (!data) {
        return res.status(404).json({ error: 'Resource location not found' });
      }
      return res.status(200).json(data);
    } catch (err) {
      return res
        .status(500)
        .json({ error: 'Failed to fetch resource location ', err });
    }
  }
);
