const MunicipalityModel = require('../../models/municipalityModel');

const deleteMunicipality = async (req, res) => {
  const id = req.params.id || '';

  try {
    const toDelete = await MunicipalityModel.findById(id);
    if (toDelete) {
      await MunicipalityModel.deleteOne({ _id: id })

      return res.status(200).json('deleted')

    }
  } catch (error) {
    console.log(error)
    return res.status(400).json(error.message)
  }
}

module.exports = deleteMunicipality;