const router = require("express").Router();
const stripe = require("stripe")("sk_test_51NKOC3IP0saOLRhOpP5xyHMVEag7tfJHo5cyZWEl2tCAqDVIHbNve55nAwHhZeJheCzxZ8ZPb2lXqcufW1hxAFYo003kMP3IRZ");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.post("/payment", async (req, res) => {

  const updatePedido = await prisma.pedido.update({
    where : {
      id : req.body.pedido
    },
    data : {
        status : "PAGO"
    }
  })

  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd", //dolar
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
