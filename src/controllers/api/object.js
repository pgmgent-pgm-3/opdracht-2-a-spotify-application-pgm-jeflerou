/**
 * General controller for our API
 */

import { getConnection } from 'typeorm';

export const deleteObject = async (entityName, req, res, next) => {
  // TODO need to add middleware to confirm user has the correct role to preform this action
  try {
    // change the name so it can be used in output
    const readableEntityName = entityName.toLowerCase();

    // get the id from the request variables
    const { id } = req.params;

    // validate incoming variables
    if (!id)
      throw new Error(`Please provide an id to remove ${readableEntityName}.`);

    // get the repository
    const repository = getConnection().getRepository(entityName);

    // check if the id exists
    const object = await repository.findOne({ id });

    if (!object)
      throw new Error(
        `The ${readableEntityName} with id ${id} does not exist.`
      );

    // remove the object
    await repository.remove({ id });

    // send a success message
    res
      .status(200)
      .json({ status: `Deleted ${readableEntityName} with id ${id}.` });
  } catch (e) {
    next(e.message);
  }
};
