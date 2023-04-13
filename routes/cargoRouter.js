const express = require("express");
const router = express.Router();
const Cargo = require('../model/cargoModel');

router.get('/', async (req, res) => {
    //res.send('Get Req');
    try {
        const cargos = await Cargo.find();
        res.json(cargos);
    } catch (err) {
        res.send('Error:' + err);
    }
});

router.get('/:_id', async (req, res) => {
    try {
        const cargoId = await Cargo.findById(req.params._id);
        res.json(cargoId);
    }
    catch (err) {
        res.send('Error:' + err);
    }
});

router.post('/cargoDetails', async (req, res) => {
    const cargoForm = new Cargo({
        senderCompany:req.body.senderCompany,
        receiverCompany:req.body.receiverCompany,
        invoiceNo: req.body.invoiceNo,
        Date: req.body.Date,
        From: req.body.From,
        To: req.body.To,
        noOfArticles: req.body.noOfArticles,
        packingMode: req.body.packingMode,
        Description: req.body.Description,
        actualWeight: req.body.actualWeight,
        doubleWeight: req.body.doubleWeight,
        chargeWeight: req.body.chargeWeight,
        ewayBillNo: req.body.ewayBillNo,
        Rate: req.body.Rate,
        Freight: req.body.Freight,
        Handling: req.body.Handling,
        gatePass: req.body.gatePass,
        doorDelivery: req.body.doorDelivery,
        CGST: req.body.CGST,
        SGST: req.body.SGST,
        IGST: req.body.IGST,
        grandTotal: req.body.grandTotal,
        Value: req.body.Value,
        paymentMode: req.body.paymentMode,
    });
    try {
        cargoForm.save(cargoForm)
            .then(cargo => {
                res.send(cargo);
            })
    }
    catch (err) {
        res.send('Error:' + err);
    }
});

router.put('/', (req, res) => {
    Cargo.findOneAndUpdate(
        { _id: req.body._id },
        { $set: req.body }
    ).then(datas => {
        if (datas) {
            res.status(200).json(datas)
        }
        else {
            res.status(401).json({ error: 'Cargo not exists' })
        }
    }).catch(err => {
        res.status(500).json({ error: err.message })
    })
});

router.delete('/:_id', (req, res) => {
    Cargo.findByIdAndRemove(req.params._id)
        .then(res => {
            res.json({ msg: 'Cargo Deleted' })
        })
        .catch(err => {
            res.json(err)
        })
});


module.exports = router;