import express, { Request, Response } from 'express';
import { getResourceLocationDetails } from '../service/resource/resourceLegend.js';

const resourceRouter = express.Router();

resourceRouter.get(
  '/:id',
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const data = await getResourceLocationDetails(Number(id));
      if (!data) {
        return res.status(404).json({ error: 'Resource location not found' });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching resource location:', error);
      return res
        .status(500)
        .json({ error: 'Failed to fetch resource location' });
    }
  }
);

export default resourceRouter;
