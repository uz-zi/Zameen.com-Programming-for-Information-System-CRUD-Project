//https://github.com/uz-zi/CultureConnect
//https://github.com/uz-zi/Automotive-Studio
const User = require("../models/users.model");
const PropertyPost = require('../models/proprtyPosts.model');
const bcrypt = require("bcrypt");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const { Sequelize, Op } = require('sequelize');

// multer setup to uploads the image
const directory = path.join(__dirname, '..', 'uploads', 'images');

fs.mkdirSync(directory, { recursive: true });

const image_storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const image_fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(gif|GIF|jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
    req.fileValidationError = "Only image files are allowed!";
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

const image_upload = multer({
  storage: image_storage,
  fileFilter: image_fileFilter,
});

const createPropertyPost = async (req, res) => {
  image_upload.single("image")(req, res, async function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: err.message });
    }

    try {
      const {
        title,
        description,
        price,
        propertyType,
        address,
        city,
        area,
        bedrooms,
        bathrooms,
        sizeInSqFt,
      } = req.body;

      let imagePath = null;
      if (req.file) {
        imagePath = `/uploads/images/${req.file.filename}`;
      }

      const newPost = await PropertyPost.create({
        Title: title,
        Description: description,
        Price: price,
        PropertyType: propertyType,
        Address: address,
        City: city,
        Area: area,
        Bedrooms: bedrooms || null,
        Bathrooms: bathrooms || null,
        SizeInSqFt: sizeInSqFt,
        UserID: 1,
        Image: imagePath || null
      });

      res.status(201).json({
        success: true,
        message: 'Post created successfully',
        post: newPost
      });
    } catch (error) {
      console.error('Create Post Error:', error);
      res.status(500).json({
        message: 'Failed to create post',
        error: error.message
      });
    }
  });
};


const signUpUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    console.log("Hashed password:", hashedPassword);
    const newUser = await User.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      Email: req.body.Email,
      Password: hashedPassword,
      PhoneNumber: req.body.PhoneNumber,
    });

    res.status(201).json({ message: "User created successfully", userId: newUser.UserID });
  } catch (error) {
    console.error("Error in signUpUser: ", error);
    res.status(500).send(error.message);
  }
};

const signInUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    console.log("===========", req.body);

    if (!Email || !Password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ where: { Email } });
    console.log("================found email")

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    console.log("Plain password:", Password);
    console.log("Hashed password from DB:", user.Password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("================found password")

    return res.status(200).json({
      userId: user.UserID,
      role: user.role,
      message: "Login successful",
    });

  } catch (error) {
    console.error("Error in signInUser:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const userId = req.query.id;

    const user = await User.findOne({
      where: { UserID: userId },
      attributes: { exclude: ['Password'] }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    console.log("----------", user)
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const filterPosts = async (req, res) => {
  try {
    const { minPrice, maxPrice, propertyType, bedrooms } = req.query;
    const whereClause = {};

    if (minPrice) {
      whereClause.Price = { [Op.gte]: Number(minPrice) };
    }

    if (maxPrice) {
      whereClause.Price = {
        ...(whereClause.Price || {}),
        [Op.lte]: Number(maxPrice),
      };
    }

    if (propertyType) {
      whereClause.PropertyType = propertyType;
    }

    if (bedrooms) {
      whereClause.Bedrooms = Number(bedrooms);
    }

    const posts = await PropertyPost.findAll({
      where: whereClause,
      order: [['createdAt', 'DESC']],
    });

    res.json(posts);
  } catch (error) {
    console.error('Error filtering posts:', error);
    res.status(500).json({ error: 'Server error while filtering posts' });
  }
};

const getAllPropertyPosts = async (req, res) => {
  try {
    const posts = await PropertyPost.findAll();
    res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
  }
};

// resolved error using the Chatgpt
const searchPosts = async (req, res) => {
  try {
    const search = req.query.search;

    if (!search) {
      return res.status(400).json({ error: 'Search query missing' });
    }

    const posts = await PropertyPost.findAll({
      where: {
        [Op.or]: [
          { City: { [Op.iLike]: `%${search}%` } },
          { Area: { [Op.iLike]: `%${search}%` } },
          Sequelize.where(
            Sequelize.cast(Sequelize.col('PropertyType'), 'TEXT'),
            { [Op.iLike]: `%${search}%` }
          ),
          { Title: { [Op.iLike]: `%${search}%` } },
          { Description: { [Op.iLike]: `%${search}%` } }
        ]
      }
    });

    res.json(posts);
  } catch (error) {
    console.error('Error searching posts:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getPropertyPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const propertyPost = await PropertyPost.findOne({
      where: { PostID: postId },
      include: [{ model: User, attributes: ['FirstName'] }]
    });

    if (!propertyPost) {
      return res.status(404).json({ message: 'Property post not found' });
    }

    console.log("--------------------",propertyPost);
    res.json(propertyPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching property post' });
  }
};

const updatePropertyPost = async (req, res) => {
  image_upload.single("image")(req, res, async function (err) {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ message: err.message });
    }

    const postId = req.params.id;

    // Destructure lowercase keys from frontend
    const {
      title,
      description,
      price,
      propertyType,
      address,
      city,
      area,
      bedrooms,
      bathrooms,
      sizeInSqFt,
    } = req.body;

    console.log("Received from frontend:", req.body);

    try {
      const post = await PropertyPost.findOne({
        where: { PostID: postId }
      });

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Post not found'
        });
      }

      // Handle new image upload
      let newImagePath = post.Image;

      if (req.file) {
        newImagePath = `/uploads/images/${req.file.filename}`;

        // Delete old image if it exists
        if (post.Image) {
          const oldImagePath = path.join(__dirname, '..', post.Image);
          fs.unlink(oldImagePath, (err) => {
            if (err) console.error("Failed to delete old image:", err.message);
          });
        }
      }
      debugger
      await post.update({
        Title: title,
        Description: description,
        Price: price,
        PropertyType: propertyType,
        Address: address,
        City: city,
        Area: area,
        Bedrooms: bedrooms,
        Bathrooms: bathrooms,
        SizeInSqFt: sizeInSqFt,
        Image: newImagePath,
      });

      console.log("Updated post:", post.dataValues);

      return res.status(200).json({
        success: true,
        message: 'Property post updated successfully',
        data: post,
      });

    } catch (error) {
      console.error('Update error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update property post',
        error: error.message
      });
    }
  });
};



const deletePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    const post = await PropertyPost.findOne({
      where: { PostID: postId }
    });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    await post.destroy();
    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Server error while deleting post' });
  }
};



module.exports = {
  signInUser,
  signUpUser,
  userProfile,
  createPropertyPost,
  getAllPropertyPosts,
  getPropertyPostById,
  updatePropertyPost,
  deletePost,
  searchPosts,
  filterPosts
}