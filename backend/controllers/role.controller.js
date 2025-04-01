const { Role } = require('../models');

exports.createRole = async (req, res) => {
  try {
    const { role_name } = req.body;

    const role_name_lower = role_name.toLowerCase();
    const roleExist = await Role.findOne({where: {role_name: role_name_lower}});
    if(roleExist) 
      return res.status(400).json({status: false, message: "role sudah tersedia"});

    const mustRole = ["user", "affiliator", "admin"]
    if(!mustRole.includes(role_name_lower)) {
      res.status(400).json({status: false, message: "role tidak sesuai dengan kategori. nama role yang mesti di input (user, affiliator, admin)"});
    }
    
    const newRole = await Role.create({ role_name: role_name.toLowerCase() });
    res.status(201).json({status: true, data: newRole});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.findAll();
    if (roles.length === 0) return res.status(404).json({status: false, message: "roles is not defined"});
    res.json({status: true, result: roles});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRoleById = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ status: false, message: "Role not found" });
    res.json({status: true, result: role});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { role_name } = req.body;
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ status: false, message: "Role not found" });

    role.role_name = role_name.toLowerCase() ;
    await role.save();
    res.json({status: true, result:role});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findByPk(req.params.id);
    if (!role) return res.status(404).json({ status: false, message: "Role not found" });

    await role.destroy();
    res.json({ message: "Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
