import type { NextApiRequest, NextApiResponse } from 'next';
import cloudinary from '@/utils/cloudinary';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp },
      process.env.CLOUDINARY_API_SECRET!
    );

    res.status(200).json({ signature, timestamp, cloudName: process.env.CLOUDINARY_CLOUD_NAME, apiKey: process.env.CLOUDINARY_API_KEY });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
