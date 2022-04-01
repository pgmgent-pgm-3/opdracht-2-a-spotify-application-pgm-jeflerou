/**
 * filter non existing roles
 */

export default (req, res, next) => {
  try {
    const roles = ['admin', 'editor', 'reader'];
    if (roles.includes(req.body.role)) {
      next();
    }
    req.formErrors = [
      {
        message: `de rol ${req.body.role} bestaat niet`,
      },
    ];
    return next();
  } catch (e) {
    next(e.message);
  }
};
