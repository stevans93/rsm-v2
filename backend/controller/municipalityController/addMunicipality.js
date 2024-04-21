const MunicipalityModel = require('../../models/municipalityModel');

const addMunicipality = (req, res) => {
    const municipality = req.body;
    const file = req.file;

    const addNewMunicipality = new MunicipalityModel({ ...municipality, image: file.filename });

    addNewMunicipality.save()
        .then((addNewMunicipality) => {
            res.status(200).json('ok')
        })
        .catch((err) => {
            console.log(err);
        });
}

module.exports = addMunicipality;