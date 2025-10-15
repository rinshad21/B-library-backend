const Order = require("../Models/order/ordermodel");

const createAOrder = async (req, res) => {
  try {
    const NewOrder = await Order(req.body);
    const savedOrder = await NewOrder.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "some error occured couldn't comeplete order",
    });
  }
};

const getOrderbyEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ email }).sort({ createdAt: -1 });
    if (!orders) {
      res.status(500).json({
        success: false,
        message: "order not found",
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    console.error("error fetching drders", error);
    res.status(500).json({
      success: false,
      message: "some error occured couldn't comeplete order",
    });
  }
};
module.exports = {
  createAOrder,
  getOrderbyEmail,
};
