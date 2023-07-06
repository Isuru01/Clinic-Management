import Stripe from "stripe";
import Event from "../models/event.model.mjs";
const stripe = new Stripe(
  "sk_test_51NOPV1BJEavTx21MkVkJoqiZuufC38PhJGE8ozfZiaq2bds7vVAavOFnLhhahPkHtXjvhW6ISZ9WbTbfjn0F3SZd004GUMQLxI"
);

const createPayment = async (req, res, next) => {
  try {
    const { event } = req.body;

    const {
      fee: { consulation, tax, service },
      doctor: { docName },
    } = await Event.findOne({ key: event })
      .populate("fee")
      .populate("doctor", "docName docFName docLName");

    const calcService = (consulation * (service / 100.0)).toFixed(2);
    const calcTotal = (consulation + parseFloat(calcService)).toFixed(2);
    const calcTax = (calcTotal * (tax / 100.0)).toFixed(2);
    const grandTotal = parseFloat(calcTotal) + parseFloat(calcTax);

    const message = `Dr.${docName} channelling session`;

    const payment = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "lkr",
            product_data: {
              name: message,
            },
            unit_amount: grandTotal * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:5173/admin/dashboard/sessions`,
      cancel_url: `http://localhost:5173/admin/dashboard/sessions`,
    });

    res.status(200).json({ url: payment.url });
  } catch (err) {
    console.log(err);
    next();
  }
};

export { createPayment };
