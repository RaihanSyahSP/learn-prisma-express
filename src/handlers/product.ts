import prisma from "../db";

export const getProducts = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      include: {
        products: true,
      },
    });
    res.json({ data: user.products });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: "There was an error getting the products" });
  }
};

export const getOneProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: id,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: "There was an error getting the product" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: "There was an error creating the product" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const updated = await prisma.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
      data: {
        name: req.body.name,
      },
    });
    res.json({ data: updated });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: "There was an error updating the product" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req.user.id,
        },
      },
    });
    res.json({ data: deleted });
  } catch (e) {
    console.log(e);
    res.status(500);
    res.json({ message: "There was an error deleting the product" });
  }
};
