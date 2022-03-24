/**
 * The API user controller
 */

import typeorm from 'typeorm';

const { getConnection } = typeorm;

export const getUsers = async (req, res, next) => {
  try {
    // make sure your user provides his id
    if (!req.body.userId) throw new Error('Please provide your userId');

    // get the user repository
    const userRepository = getConnection().getRepository('User');

    // get the users and return them with status code 200
    res.status(200).json(
      await userRepository.find({
        relations: ['user_meta', 'roles'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.id)
      throw new Error('Please provide an id for the user you want to fetch');

    // make sure your user provides his id
    if (!req.body.userId) throw new Error('Please provide your userId');

    // get the user repository
    const userRepository = getConnection().getRepository('User');

    // find the user
    const user = userRepository.findOne({
      where: { id: req.body.id },
    });

    // check if user exists
    if (!user)
      throw new Error(`The user with id: ${req.body.id} does not exist.`);

    res.status(200).json(
      await userRepository.find({
        relations: ['user_meta', 'roles'],
      })
    );
  } catch (e) {
    next(e.message);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    // validate incoming body
    if (!req.body.id)
      throw new Error('Please provide an id for the user you want to delete');

    // make sure your user provides his id
    if (!req.body.userId) throw new Error('Please provide your userId');

    // get the user repository
    const userRepository = getConnection().getRepository('User');

    // find the user
    const user = userRepository.findOne({
      where: { id: req.body.id },
    });

    // check if user exists
    if (!user)
      throw new Error(`The user with id: ${req.body.id} does not exist.`);

    // remove the user
    userRepository.remove(user);

    res.status(200).json({
      status: `Deleted user with id: ${req.body.id}.`,
    });
  } catch (e) {
    next(e.message);
  }
};
