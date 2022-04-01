export const home = async (req, res, next) => {
  try {
    res.render('home');
  } catch (e) {
    next(e.message);
  }
};
