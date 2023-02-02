const express = require("express");
const router = express.Router();
const Company = require('../model/companyModel');

router.get('/', async (req, res) => {
    //res.send('Get Req');
    try {
        const companies = await Company.find();
        res.json(companies);
    } catch (err) {
        res.send('Error:' + err);
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const companyId = await Company.findById(req.params._id);
        res.json(companyId);
    }
    catch (err) {
        res.send('Error:' + err);
    }
});

router.post('/addCompany', async (req, res) => {
    if (await companyExists(req.body.companyName)) {
        res.status(409).json({ error: 'Cargo alreaday exists' })
    }
    else{
        const companyForm = new Company({
            companyName:req.body.companyName,
            Email:req.body.Email,
            GSTNo:req.body.GSTNo,
            phoneNumber:req.body.phoneNumber,
            State:req.body.State,
            stateCode:req.body.stateCode,
            Address:req.body.Address
        });
        try {
            companyForm.save(companyForm)
                .then(company => {
                    res.send(company);
                })
        }
        catch (err) {
            res.send('Error:' + err);
        }
    }
});

const companyExists = async (companyName) => {
    const companies = await Company.findOne({ companyName: companyName })

    if (companies) {
        return true
    }
    else {
        return false
    }
}

module.exports = router;