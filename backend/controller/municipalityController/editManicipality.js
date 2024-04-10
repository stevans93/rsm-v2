const MunicipalityModel = require("../../models/municipalityModel");

const editManicipality = async (req, res) => {
  const { id } = req.params;
  const newManicipality = req.body;

  const image = req?.file
  addImage = image ? { image: image.filename } : null

  const updateManicipality = await MunicipalityModel.findByIdAndUpdate(
    id,
    { ...newManicipality, ...addImage },
    { new: true }
  );
  res.status(200).json({ msg: "Successfully updated", updateManicipality });
};

module.exports = editManicipality;
