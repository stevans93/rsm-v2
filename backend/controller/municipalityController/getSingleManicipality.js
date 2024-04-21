const MunicipalityModel = require("../../models/municipalityModel");

const getSingleManicipality = async (req, res) => {
  const { id } = req.params;
  const singleManicipality = await MunicipalityModel.findById({ _id: id });
  
  res.status(200).json({ singleManicipality });
};

module.exports = getSingleManicipality;
