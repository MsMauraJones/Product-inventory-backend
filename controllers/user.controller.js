const db = require("../models");
const User = db.user;
const Role = db.role;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.directorBoard = (req, res) => {
    res.status(200).send("Director Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.devopsBoard = (req, res) => {
    res.status(200).send("DevOps Content.");
};


exports.getRoles = (req, res) => {
  Role.find()
    .then(roles=>{
    
      res.status(200).send(roles);

    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: error });
    });
}

exports.getUsersWithRoles = (req, res) => {
  User.find()
  .populate('roles', 'name')
  .then(users => {
    const usersWithRoles = users.map(user =>{
      return {
        userId: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles.map(role =>role._id),
        rolesName: user.roles.map(role=>role.name)
      };
    });
    res.send(usersWithRoles);
  })
  .catch(err => {
    console.log(err);
    return res.status(500).json({ error: 'Internal server error' });
  });
}

exports.getUser = (req, res) => {
  const userId = req.params.userId;

  User.findById(userId)
    .populate('roles', 'name')
    .then(user => {
      const { _id, username, email, roles } = user;
      const roleIds = roles.map(role => role._id);
      const roleNames = roles.map(role => role.name);

      const userInfo = {
        userId: _id,
        username,
        email,
        roles: roleIds,
        rolesName: roleNames
      };

      res.send(userInfo);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).json({ error: 'Internal server error' });
    });
};


exports.deleteUser = (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndDelete(userId, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ message: `User was deleted successfully.` });
  });
};

exports.searchUser = (req, res) => {
  const userName = req.params.username;

  if (!userName) {
    res.status(400).send({ message: 'Please provide a valid username' });
    return;
  }

  User.find({username: {$regex: userName}})
    .select('_id username email roles')
    .then(users =>{
      const roleIds = users.reduce((ids, user) => {
        return ids.concat(user.roles);
      }, []);

      return Role.find({ _id: { $in: roleIds } }).select('name _id');
    })
    .then(roles =>{
      const rolesMap = roles.reduce((map, role) => {
        map.set(role._id.toString(), role.name);
        return map;
      }, new Map());

      return User.find({username: {$regex: userName}})
        .select('username email roles')
        .then(users => {
          const userSearchWithRoles = users.map(user => {
            const roleNames = user.roles.map(roleId => rolesMap.get(roleId.toString()));
            return {
              userId: user._id,
              username: user.username,
              email: user.email,
              roles: roleNames,
            };
          });

          res.send(userSearchWithRoles);
        });
    })
    .catch(error => {
    console.error(error);
    res.status(500).send({ message: err });
  });
};

exports.updateUser = (req, res) => {
  const userId = req.params.userId;

  User.findByIdAndUpdate(userId, { 
      username: req.body.username,
      email: req.body.email,
      roles: req.body.roles
  }, { new: true, useFindAndModify: false }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    res.status(200).send({ message: "User updated successfully.", user });
  });
};




// original searchUser function
// exports.searchUser = (req, res) => {
//   const userName = req.params.username;

//   User.find({username: {$regex: userName}}, (err, users) => {
//     if (err) {
//       return res.status(500).send({ message: err });
//     }

//     if (users.length === 0) {
//       return res.status(404).send({ message: "No users found." });
//     }

//     res.status(200).send({ users });
//   })
// };










  