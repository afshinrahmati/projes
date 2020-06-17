//create admin1
const User = require("../models/users");

const initlishz = async() => {

    try {

        const Admin = new User({
            firstname: 'sahar',
            lastname: 'vasqhi',
            userName: 'sahar',
            password: '2357xsax',
            sex: 'female',
            mobile: '09145210036',
            role: 'admin',

        });
        //admin.Save(.......)
        await Admin.save();
        const Exsit = await User.findOne({ role: 'admin' });
        if (!Exsit) {
            return console.log('admin created');
        }


    } catch (err) {
        if (err.code === 1100) {
            console.log('admin created');
        } else {
            console.log('Erro in initlishz function');
        };
        console.log('err in inlitzsh function' + err);
    };

};
module.exports = initlishz;