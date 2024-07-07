var Userdb = require('../model/model');

exports.create = async (req,res)=>{

    // validate request
    if(!req.body){
        return res.redirect('/signup?error=Content can not be empty!');

    }

    if (!req.body.password)
    {
        return res.redirect('/signup?error=Content can not be empty!');
    }

    if(req.body.password != req.body['re-password'])
    {
        return res.redirect('/signup?error=Passwords need to match!');

    }

    const email = req.body.email;
    // Check if user already exists
    const existingUser = await Userdb.findOne({ email });
    if (existingUser) {
        return res.redirect('/signup?error=User already exists');
    }


    // new user
    const user = new Userdb({
        email : req.body.email,
        password : req.body.password,
        firstName : req.body["First-Name"],
        lastName : req.body["Last-Name"]
    })

    // save user in the database
    await user.save();
    res.redirect('/');
    
}

exports.login = (req,res)=>{

    if(!req.body.email){
        return res.redirect('/?error=Content can not be empty!');

    }

    if (!req.body.password)
    {
        return res.redirect('/?error=Content can not be empty!');
    }

    // validate request
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        const email = req.body.email;
        Userdb.find({email})
            .then(user => {
                res.redirect('/index');
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

}