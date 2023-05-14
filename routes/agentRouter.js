const express = require("express");
const router = express.Router();
const Agent = require('../model/agent');

router.get('/', async (req, res) => {
    //res.send('Get Req');
    try {
        const agents = await Agent.find();
        res.json(agents);
    } catch (err) {
        res.send('Error:' + err);
    }
});

router.post('/', async (req, res) => {
    //res.send('Get Req');
    Agent.findOne(
        { Username: req.body.Username },
    ).then(datas => {
        if (datas) {
            res.status(200).json(datas)
        }
        else {
            res.status(401).json({ error: 'Agent not exists' })
        }
    }).catch(err => {
        res.status(500).json({ error: err.message })
    })
});

router.get('/:_id', async (req, res) => {
    try {
        const agentId = await Agent.findById(req.params._id);
        res.json(agentId);
    }
    catch (err) {
        res.send('Error:' + err);
    }
});

router.post('/addAgent', async (req, res) => {
    if (await agentExists(req.body.Username)) {
        res.status(409).json({ error: 'Username alreaday exists' })
    }
    else {
        const agentForm = new Agent({
            fullName: req.body.fullName,
            Email: req.body.Email,
            Username: req.body.Username,
            Password: req.body.Password,
            phoneNumber: req.body.phoneNumber,
            Gender: req.body.Gender,
            State: req.body.State,
            City: req.body.City,
            officeAddress: req.body.officeAddress,
            eUserType: 'agent',
        });
        try {
            agentForm.save(agentForm)
                .then(agent => {
                    res.send(agent);
                })
        }
        catch (err) {
            res.send('Error:' + err);
        }
    }
});
router.post('/agentLogin', (req, res) => {
    Agent.findOne({ Username: req.body.Username, Password: req.body.Password }).then(datas => {
        if (datas) {
            res.status(200).json(datas)

        }
        else {
            res.status(401).json({ error: 'Incorrect Username or password' })
        }
    }).catch(err => {
        res.status(500).json({ error: err.message })
    })
});
router.delete('/:_id', (req, res) => {
    Agent.findByIdAndRemove(req.params._id)
        .then(res => {
            res.json({ msg: 'Agent Deleted' })
        })
        .catch(err => {
            res.json(err)
        })
});

router.put('/', (req, res) => {
    Agent.findOneAndUpdate(
        { Username: req.body.Username },
        { $set: req.body }
    ).then(datas => {
        if (datas) {
            res.status(200).json(datas)
        }
        else {
            res.status(401).json({ error: 'Agent not exists' })
        }
    }).catch(err => {
        res.status(500).json({ error: err.message })
    })

});

const agentExists = async (Username) => {
    const agents = await Agent.findOne({ Username: Username })

    if (agents) {
        return true
    }
    else {
        return false
    }
}

module.exports = router;