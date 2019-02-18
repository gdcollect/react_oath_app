import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router({strict:true});

//Import User Model
import User from "../models/userSchema";

//Import JWT Key
import { Keys } from "../config/keys";

//@ Description > Getting All Of The Users
//@ Route > /user/
//@ Access Control > Public
router.route('/').get((req, res, next) => {
  return User
    .find()
    .sort({ date: -1 })
    .select(' name email username _id date password ')
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(404).json({
          success: false,
          message: `users not found...`,
          users: null
        });
      }
      let newUsers = users.map(user => {
        return { 
          name: user.name,
          email: user.email,
          username: user.username,
          date: user.date,
          id: user._id,
          password: user.password
        }
      });
      return res.status(200).json({
        success: true,
        message: `getting all of users...`,
        users: newUsers
      });
    })
    .catch(err => {
      throw err.message;
    });
});


//@ Description > Posting Users to the DataBase
//@ Route > /user/create
//@ Access Control > Public
router.route('/create').post((req, res, next) => {
  return User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          success: false,
          message: `email already in use...`
        });
      }
      return User.findOne({ username: req.body.username }).exec()
    })
    .then(user => {
      if (user) {
        return res.status(409).json({
          success: false,
          message: `username already in use...`
        });
      }
      return bcrypt.hash(req.body.password, 12);
    })
    .then(hashedPassword => {
      let newUser = User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword
      });
      return newUser
        .save();
    })
    .then(user => {
      let createdUser = {
        name: user.name,
        email: user.email,
        username: user.username,
        id: user._id,
        date: user.date
      };
      return res.status(200).json({
        success: true,
        message: `user successfully created...`,
        user: createdUser
      });
    })
    .catch(err => {
      throw err.message;
    });
});


//@ Description > Delete Users from Database
//@ Route > /user/:id
//@ Access Control > Private
router.route('/:id').delete((req, res, next) => {
  const userId = req.params.id;
  if (!req.isAuth) {
    console.log(`unauthorized...`);
    return res.status(401).json({
      authenticated: false,
      message: `unauthorized...`
    });
  }

  return User
    .findOne({ _id: userId })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(409).json({
          success: false,
          message: `user not found...`
        });
      }
      return User.deleteOne({ _id: userId }).exec();
    })
    .then(deletedUser => {
      return res.status(200).json({
        success: true,
        message: `user successfully deleted..`,
        deleted: deletedUser
      });
    })
    .catch(err => {
      throw err.message;
    });
});


//@ Description > Authenticate User
//@ Route > /user/authenticate
//@ Access Control > Public
router.route('/authenticate').post((req, res, next) => {
  let rightUser = null;
  return User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(409).json({
          authenticated: false,
          message: `user not found...`
        });
      }
      rightUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(isMatch => {
      if (!isMatch) {
        return res.status(409).json({
          authenticated: false,
          message: `invalid password...`
        });
      }
      let token = jwt.sign(
        {
          name: rightUser.name,
          email: rightUser.email,
          username: rightUser.username,
          id: rightUser._id
        }, 
        Keys.JWT_KEY, 
        {
          expiresIn: '1h'
        }
      );
      console.log(`authenticated successfully...`);
      return res.status(200).json({
        authenticated: true,
        message: `authenticated successfully...`,
        token: `Bearer ${token}`,
        user: {
          name: rightUser.name,
          email: rightUser.email,
          username: rightUser.username,
          id: rightUser._id
        }
      });
    })
    .catch(err => {
      throw err.message;
    });
});


//@ Description > Getting Current User
//@ Route > /user/current
//@ Access Control > Private
router.route('/current').get((req, res, next) => {
  if (!req.isAuth) {
    console.log(`unauthorized...`);
    return res.status(401).json({
      authenticated: false,
      message: `unauthorized...`
    });
  }
  return User
    .findById(req.userId)
    .exec()
    .then(user => {
      if (!user) {
        return res.status(401).json({
          authenticated: false,
          message: `unauthorized...`
        });
      }
      return res.status(401).json({
        authenticated: true,
        currentUser: {
          name: user.name,
          email: user.email,
          username: user.username,
          id: user._id
        }
      });
    })
    .catch(err => {
      throw err.message;
    });
});


export default router;