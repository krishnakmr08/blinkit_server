import Product from "../../models/product.js";

export const getProductsByCategoryId = async (req, reply) => {
  const { categoryID } = req.params;

  try {
    const products = await Product.find({ category: categoryID })
      .select("-category")
      .exec();

    return reply.send(products);
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};
