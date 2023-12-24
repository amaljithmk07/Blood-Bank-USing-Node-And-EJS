const express = require("express");
const userbloodroutes = express.Router();
const multer = require("multer");
const bloodbank = require("../models/userbloodschema");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//add

userbloodroutes.post("/add", upload.single("image"), (req, res) => {
  const Data = new bloodbank({
    full_name: req.body.full_name,
    blood_group: req.body.blood_group,
    gender: req.body.gender,
    date_of_birth: req.body.date_of_birth,
    phone_number: req.body.phone_number,
    address: req.body.address,
    image: req.file.filename,
  });
  Data.save()
    .then((data) => {
      // res.send(data)
      res.redirect("/api/blood/view");
    })
    .catch((err) => {
      res.send(err);
    });
});

//view

userbloodroutes.get("/results", (req, res) => {
  bloodbank
    .find()
    .then((data) => {
      res.render("results", { details: data });

      // res.send(data)
    })
    .catch((err) => {
      res.send(err);
    });
});

//view One

userbloodroutes.get("/view/:id", (req, res) => {
  bloodbank
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.render("resultone", { data });

      // res.send(data)
    })
    .catch((err) => {
      res.send(err);
    });
});

//delete one

userbloodroutes.get("/delete/:id", (req, res) => {
  bloodbank
    .deleteOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.redirect("/api/blood/view");
      // res.send('Deleted Successfully')
    })
    .catch((err) => {
      res.send(err);
    });
});

//update list

userbloodroutes.get("/list/:id", (req, res) => {
  bloodbank
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      res.render("update", { data });
    })
    .catch((err) => {
      res.send(err);
    });
});

//UpdateOne

userbloodroutes.post("/update/:id", upload.single("image"), (req, res) => {
  bloodbank
    .findOne({
      _id: req.params.id,
    })
    .then((data) => {
      (data.full_name = req.body.full_name),
        (data.blood_group = req.body.blood_group),
        (data.gender = req.body.gender),
        (data.date_of_birth = req.body.date_of_birth),
        (data.phone_number = req.body.phone_number),
        (data.address = req.body.address),
        (data.image = req.file.filename);
      data
        .save()
        .then((data) => {
          res.redirect("/api/blood/view");
          // res.send(data)
        })
        .catch((err) => {
          res.send(err);
        });
    });
});

module.exports = userbloodroutes;
