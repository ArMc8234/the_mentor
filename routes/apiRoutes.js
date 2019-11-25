var db = require("../models");
var Sequelize = require('sequelize');

  // Api deparment list //
var passport = require("passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    // res.json("/members");
    res.json("/home");
  });
//
  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });
//
  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
//
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Get all examples
  app.get("/api/departments", function(req, res) {
    db.Department.findAll({}).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });

  app.get("/api/employees", function(req, res) {
    db.Employee.findAll({}).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });
  
  app.get('/api/employee',function(req,res ){
      db.Employee.findAll({}).then(function(e) {
        res.json(e);
      });
  });
  // Api titles list //
  app.get('/api/title', function(req,res){
    db.Title.findAll({}).then(function (e) { 
        res.json(e);
     });
  });
  // Api project list //
  app.get('/api/project', function(req,res){
    db.Project.findAll({}).then(function (e) { 
        res.json(e);
     });
  });
  //
  app.get('/api/position',function(req,res ){
      db.Position.findAll({}).then(function(e) {
        res.json(e);
      });
  });
  //find managers and executive //
  app.get('/api/status', function (req,res) {
    const Op = Sequelize.Op;
    db.Employee.findAll({
      where:{
        [Op.or]: [{TitleId: 2}, {TitleId: 1}, {TitleId:3}]
      }
    }).then(function (e) { 
        res.json(e)
      });
  });

  // Create a new example
  app.post("/api/departments", function(req, res) {
    db.Department.create(req.body).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });
  
  //new employee form post//
  app.post("/api/employee", function(req, res) {
    db.Employee.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      gender: req.body.gender,
      salary: req.body.salary,
      birth_date: req.body.birth_date,
      hire_date: req.body.hire_date,
      education: req.body.education,
      email: req.body.email,
      DepartmentId:req.body.DepartmentId,
      TitleId: req.body.TitleId,
      PositionId: req.body.PositionId,
    
    }
    
    ).then(function(dbEmployee) {
        res.json(dbEmployee);
    });
  });

  // Delete an example by id
  app.delete("/api/departments/:id", function(req, res) {
    db.Department.destroy({ where: { id: req.params.id } }).then(function(dbDepartment) {
      res.json(dbDepartment);
    });
  });

  //route for list of mentors
  app.delete("/api/employees/:id", function(req, res) {
    db.Employee.destroy({ where: { id: req.params.id } }).then(function(dbEmployee) {
      res.json(dbEmployee);
    });
  });

  app.get("/api/sample_data",(req, res) => {
    db.Employee.findAll({
      include:[
        {
          model: db.Department
        }
      ]
    }).then(function(e) {
      res.json(e);
    });
    });

    app.get("/api/sample_data1",(req, res) => {
      db.Employee.findAll({
        include:[
          {
            model: db.Title
          }
        ]
      }).then(function(e) {
        res.json(e);
      });
      });
};
