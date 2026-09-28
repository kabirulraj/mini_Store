import productModel from "../model/product.model.js"


// GET ALL PRODUCTS
export const getProductsController = async (req, res) => {
  try {
    const allProducts = await productModel.find();

    res.status(200).json({
      message: "All products fetched",
      data: allProducts,
    });
  } catch (error) {
    console.log("error in get allNotes", error);
  }
};


// GET A SINGLE PRODUCT
export const getSingleProductController = async (req, res) => {
  try {
    let productId = req.params.id;

    let product = await productModel.findById(productId);

    res.status(200).json({
      message: "Product Fetched Successfully",
      data: product,
    });
  } catch (error) {
    console.log("error in single product api", error);
  }
};


// CREATE PRODUCT
export const createProductController = async (req, res) => {
  try {
    let { name, description, price, stock } = req.body;

    let newProduct = await NotesModel.create({
      name, description, price, stock
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({
     message: "Internal Server Error"
    })
  }
};


// UPDATE NOTE
export const updateProductController = async (req, res) => {
  try {
    let productId = req.params.id;
    let body = req.body;

    let updatedProduct = await productModel.findByIdAndUpdate(productId, body, { new: true});

    return res.status(200).json({
      message: "Product Updated Successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};


// DELETE NOTE
export const deleteProductController = async (req, res)=>{
    try {
        let ProductId = req.params.id
        await productModel.findByIdAndDelete(ProductId)

        return res.status(200).json({
            message: "Note Deleted Successfully", 
        })
        
    } catch (error) {
        return res.status(500).json({
      message: "Internal Server error",
    });
    }
}
