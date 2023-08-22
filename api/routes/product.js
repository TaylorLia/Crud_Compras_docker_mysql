const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const { PrismaClient } = require("@prisma/client");

const router = require("express").Router();

const prisma = new PrismaClient();

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {

  const {
    nome,
    descricao,
    preco,
    imagem,
    categoria
  } = req.body

try {  
  const produto = await prisma.produto.create({
    data : {
      nome,
      descricao,
      preco : parseFloat(preco),
      imagem,
      categoria
    }
  })

  res.status(200).json(produto)

} catch (error) {
  console.log(error);
  res.status(500).json(error)
} finally {
  await prisma.$disconnect()
}

});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT
router.get("/find/:id", async (req, res) => {
  // try {
  //   const product = await Product.findById(req.params.id);
  //   res.status(200).json(product);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  console.log('CAI AKI');
  try {
    const produto = await prisma.produto.findUnique({
      where : {
        id : Number(req.params.id)
      }
    })
    console.log(produto)
    res.status(200).json({produto});
  } catch (error) {
    console.log(error)
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {

  // products = await Product.find({
  //   categories: {
  //     $in: [qCategory],
  //   },
  // });

  
  const qCategory = req.query.category;

  try {
    let products;
     if (qCategory) {
      products = await prisma.produto.findMany({
        where : {
          categoria : qCategory
        }
      })
    } else {
      products = await prisma.produto.findMany()
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
