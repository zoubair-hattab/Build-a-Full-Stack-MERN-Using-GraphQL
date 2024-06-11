import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
export const verifyUser = async (req) => {
  try {
    const token = req.cookies['token'];
    if (!token) {
      return new Error('user doesnot exist.');
    }
    const { id } = jwt.verify(token, process.env.SECRET_TOKEN);
    const user = await User.findById(id, { password: 0 });
    if (!user) {
      throw new Error('user doesnot exist.');
    }
    return user;
  } catch (err) {
    console.error('Error in login:', err);
    throw new Error(err.message || 'Internal server error');
  }
};
