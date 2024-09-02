import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie } from 'nookies';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
    destroyCookie({ res }, 'token', {
        path: '/',
    });
    res.status(200).json({ message: 'Logged out successfully' });
}
