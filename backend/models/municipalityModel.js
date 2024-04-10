const { Schema, model } = require("mongoose");

const MunicipalitySchema = new Schema({
    district: { type: String, default: "" },
    municipality: { type: String, default: "" },
    fullNameOfThePresident: { type: String, default: "" },
    image: { type: String, default: "" },
    profession: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    numberOfOfficials: { type: String, default: "" },
    fullNumberOfOfficials: { type: String, default: "" },
    website: { type: String, default: "" },
    numberOfApplications: { type: String, default: "" },
    fullNumberOfApplications: { type: String, default: "" },
});

const MunicipalityModel = model('municipalities', MunicipalitySchema);
module.exports = MunicipalityModel;