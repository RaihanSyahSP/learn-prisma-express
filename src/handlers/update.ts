import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  try {
    const update = await prisma.update.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: update });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getUpdates = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    res.json({ data: updates });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createUpdate = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.body.productId,
      },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        product: { connect: { id: product.id } },
      },
    });

    res.json({ data: update });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUpdate = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
      return res.status(404).json({ error: "Update not found" });
    }

    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    });

    res.json({ data: updatedUpdate });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUpdate = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true,
      },
    });

    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates];
    }, []);

    const match = updates.find((update) => update.id === req.params.id);

    if (!match) {
      return res.status(404).json({ error: "Update not found" });
    }

    const deleted = await prisma.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.json({ data: deleted });
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal server error" });
  }
};
