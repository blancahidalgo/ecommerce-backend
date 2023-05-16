const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// GET all products
router.get("/", async (req, res) => {
  // be sure to include its associated Category and Tag data
  try {
    const productData = await Product.findAll();
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// FIND a single product by its `id` value
router.get("/:id", async (req, res) => {
  // be sure to include its associated Category and Tag data
  // include : [{ model: Category, through: ProductTag, as: 'product_category' }],

  // try {
  // const productData = await Product.findByPk(req.params.id, {
  //   include: [{ model: Category, through: ProductTag }],
  // });
  const productData = await Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [{ model: Category }, { through: ProductTag, model: Tag }],
  });
  if (!productData) {
    res.status(404).json({ message: "No product found with that id!" });
    return;
  }
  res.status(200).json(productData);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
});

// NOTE FOR BELOW
/* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */

// CREATE new product
router.post("/", async (req, res) => {
  try {
    const productData = {
      product_name: req.body.product_name,
      price: req.body.price,
      stock: req.body.stock,
    };
    const product = await Product.create(productData);
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => ({
        product_id: product.id,
        tag_id,
      }));
      await ProductTag.bulkCreate(productTagIdArr);
      const updatedProduct = await Product.findOne({
        where: { id: product.id },
        include: Tag,
      });
      res.status(200).json(updatedProduct);
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// UPDATE product
router.put("/:id", (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      // find all associated tags from ProductTag
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    })
    .then((productTags) => {
      // get list of current tag_ids
      const productTagIds = productTags.map(({ tag_id }) => tag_id); // Eg. [1,3,5,7] rows from product_tag table

      // In Insomnia, you provided an array of tag Ids to put,
      // Then these next two major steps will compare and contrast your tag Ids to the current tag Ids associated with your product
      // through the product_tags table that pairs products with tags using product_id and tag_id columns
      // create filtered list of new tag_ids
      const newProductTags = req.body.tagIds
        .filter((tag_id) => !productTagIds.includes(tag_id))
        .map((tag_id) => {
          return {
            product_id: req.params.id,
            tag_id,
          };
        });
      // figure out which ones to remove
      const productTagsToRemove = productTags
        .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        ProductTag.destroy({ where: { id: productTagsToRemove } }),
        ProductTag.bulkCreate(newProductTags),
      ]);
    })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      // console.log(err);
      res.status(400).json({err:err,instructions:`
        Your request must have a body with minimally:
        {
          "product_name": "Tan Shorts",
          "tagIds": [1,2,3]
        }
      
      `});
    });
});

// DELETE product
router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with that id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
