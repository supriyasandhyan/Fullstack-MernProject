import fs from 'fs';
import Product from '../Model/ProductModel.js'; // Adjust the path to your model

export const productController = async (req, res) => {
  try {
    const { name, descriptions } = req.fields;
    const { image } = req.files;

    // Validations
    if (!name) return res.status(400).send({ error: 'Name is required' });
    if (!descriptions) return res.status(400).send({ error: 'Descriptions are required' });
    if (image && image.size > 1000000) return res.status(400).send({ error: 'Image should be less than 1 MB' });

    const product = new Product({
      name,
      descriptions,
    });

    if (image) {
      product.image.data = fs.readFileSync(image.path);
      product.image.contentType = image.type;
    }

    await product.save();
    res.status(201).send({
        status:true,
         message: 'Product created successfully',
         product,
         });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

// Get all products
export const getProductsController = async (req, res) => {
  try {
    const products = await Product.find();

    // Convert image data to base64
    const productsWithImages = products.map(product => {
      const image = product.image.data
        ? `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`
        : null;

      return {
        ...product._doc,
        image
      };
    });

    res.status(200).json(productsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};


// Get a single product by ID
export const getProductByIdController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).send({ error: 'Product not found' });

    const image = product.image.data
      ? `data:${product.image.contentType};base64,${product.image.data.toString('base64')}`
      : null;

    res.status(200).json({
      ...product._doc,
      image
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};