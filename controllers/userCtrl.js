const Users = require('../models/userModel');

const userCtrl = {
    profile: async (req, res) => {
        try {
            const user = await Users.findById(req.params.id).select('-password');
        
            if(!user)
                return res.status(400).json({msg: "Хэрэглэгч олдсонгүй"});

            res.json({user});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    edituser: async (req, res) => {
        try {
            const { username, website, avatar } = req.body;
            const user = await Users.findByIdAndUpdate({_id: req.params.id}, {
                username, website, avatar
            });

            if(!username)
                return res.status(400).json({ msg: "Хэрэглэгчийн нэрээ оруулна уу." });

            if(!avatar)
                return res.status(400).json({ msg: "Зургаа оруулна уу." });

            res.json({
                msg: 'Амжилттай шинэчлэгдлээ'
            });
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userCtrl;