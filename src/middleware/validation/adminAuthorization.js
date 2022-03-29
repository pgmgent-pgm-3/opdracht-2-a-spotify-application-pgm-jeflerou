/**
 * authorization of admin user
 */

export const validateAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (token.role.name !== 'admin') {
      res
        .status(500)
        .json({ status: `only an admin can preform this action.` });
    }
    res.next();
  } catch (e) {
    next(e.message);
  }
};
