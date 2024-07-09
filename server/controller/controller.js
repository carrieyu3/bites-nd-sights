var Userdb = require('../model/model');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const mongoose = require('mongoose');
const crypto = require('crypto');

// Configure multer for memory storage
const storages = multer.memoryStorage();
const upload = multer({ storage: storages });

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text) {
    let iv = Buffer.from(text.iv, 'hex');
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

function generateRandomString() {
    const length = Math.floor(Math.random() * 6) + 7; // Generates a random number between 7 and 12
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters[randomIndex];
    }
    
    return result;
}

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
        return res.redirect('/signup?error=Email already in use');
    }

    const username = req.body.username;
    
    // Check if user already exists
    const checkUsername = await Userdb.findOne({ username });
    if (checkUsername) {
        return res.redirect('/signup?error=Username already exist');
    }


    // new user
    const user = new Userdb({
        email : req.body.email,
        password : req.body.password,
        firstName : req.body["First-Name"],
        lastName : req.body["Last-Name"],
        username: req.body.username,
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
    const email = req.body.email;
    const Erand = encrypt(email);
    Userdb.find({email})
        .then(user => 
        {
            res.redirect(`/index?encryptedEmail=${Erand.encryptedData}&_k_=${Erand.iv}`);
        })
        .catch(err => {
            res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
        })
}

//upload.single('image'), async
exports.uploadpost = [
    upload.single('image'), // Apply multer middleware
    async (req, res) => {
        try {

            const placeName = req.body.placeName;
            const placeLocation = req.body.placeLocation;
            const image = req.body.picture;
            const description = req.body.description;

            const encryptedEmails = req.body.encryptedEmail;
            const key = req.body.k;
            

            const email = decrypt({ iv: key, encryptedData: encryptedEmails });            ;


            console.log(email);
            if (!image) {
                return res.redirect('/?error=No file uploaded!');
            }

            // Use the existing GridFSBucket with the established db connection
            const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });
            const uploadStream = bucket.openUploadStream(image.originalname);
            uploadStream.end(image.buffer);

            // Get the file id from GridFS
            uploadStream.on('finish', async () => {
                const fileId = uploadStream.id;

                // Find the user by email and add the post
                const user = await Userdb.findOne({ email });
                if (user) {
                    const newPost = {
                        placeName,
                        placeLocation,
                        image: fileId.toString(),
                        description,
                    };
                    user.posts.push(newPost);
                    await user.save();
                    res.redirect(`/explore?encryptedEmail=${encryptedEmails}&_k_=${key}`);
                } else {
                    res.status(404).send('User not found');
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error uploading file');
        }
    }
];


