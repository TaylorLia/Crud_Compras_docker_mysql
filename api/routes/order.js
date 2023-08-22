const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();

const prisma = new PrismaClient();
//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const {userId, total, products} = req.body;

    const pedido = await prisma.pedido.create({
      data: {
        usuario_id: userId, // Forneça o ID de usuário apropriado
        vlr_total: total, // Defina o valor total inicial como 0 ou ajuste conforme necessário
        status: 'PENDENTE',
      },
    });

    for(const item of products){
      console.log(item)
      await prisma.carrinho.create({
        data : {
          qtde : Number(item.quantity),
          pedido_id : pedido.id,
          produto_id : item.id,
          vlr_unitario : item.preco,
        }
      })
    }

    res.status(201).json({pedido : pedido.id});

  } catch (error) {
    console.log(error);
    res.status(500).json({msg : 'Erro ao cadastrar carrinho'});
  }
  
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json({orders : orders});
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  let result_orders = [];

  const get_name_products = async(lista_de_produtos) => {
    let nome_produtos = []
    for(let i of lista_de_produtos){
      prod = await prisma.produto.findUnique({where : {id : i.produto_id}})
      nome_produtos.push(prod)
    }
    console.log(nome_produtos)
    return nome_produtos
  }


  try {
    const orders = await prisma.pedido.findMany()
    for(const order of orders){
       let ordenet = {
        id : order.id,
        status : order.status,
        vlr_total : order.vlr_total,
        usuario : await prisma.usuario.findUnique({where : { id : order.usuario_id } }) ,
        itens : await get_name_products(await prisma.carrinho.findMany({where : {pedido_id : order.id} }))
      }
      result_orders.push(ordenet)
    }
    res.status(200).json({orders : result_orders});
  } catch (error) {
    console.log(error);
    res.status(500).json({error : err});
  }

});

// GET MONTHLY INCOME

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth } } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
