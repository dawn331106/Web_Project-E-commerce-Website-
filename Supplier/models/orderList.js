const mongoose = require("mongoose");

const orderListSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
    },
    orderList: {
      type: Array,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("orderList", orderListSchema);
