const validateMarginMiddleware = (req, res, next) => {
    // console.log(req.body);
    const { total_margin, final_margin } = req.body;
  
    if ((final_margin && final_margin > 100)) {
      return res.status(400).json({ message: 'Margin cannot exceed 100%' });
    }
  
    next();
  };
  
  module.exports = validateMarginMiddleware;
  