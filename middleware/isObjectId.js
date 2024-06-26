import mongoose from 'mongoose';

export function isObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Not a valid ID');

  next();
}
