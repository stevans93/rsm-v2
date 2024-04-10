const MunicipalityModel = require('../../models/municipalityModel');

const getAllMunicipality = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 2;
        const district = req.query.district || null;
        const search = req.query.search || ''
        const removeDistrict = req.query.removeDistrict || ''

        const districtSearch = district ? { district: district } : null
        const searchFilter = search ? { municipality: { $regex: search, $options: 'i' } } : null
        const removeDistrictFilter = removeDistrict ? { district: { $ne: removeDistrict } } : null

        const totalCount = await MunicipalityModel.countDocuments({ ...districtSearch, ...searchFilter, ...removeDistrictFilter });
        const totalPages = Math.ceil(totalCount / limit);

        const municipalities = await MunicipalityModel.find({ ...districtSearch, ...searchFilter, ...removeDistrictFilter })
            .skip((page - 1) * limit)
            .limit(limit);

        res.status(200).json({
            municipalities,
            currentPage: page,
            totalPages,
            totalMunicipalities: totalCount
        });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = getAllMunicipality;
