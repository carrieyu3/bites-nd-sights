const express = require('express');
const path = require('path');
const axios = require('axios');
const fs = require('fs');
var Userdb = require('../model/model');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');



exports.index = (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'views', 'index.html');
    console.log(`Serving file from: ${filePath}`);

    res.sendFile(filePath);

}

exports.login = (req, res) => {
    const filePath = path.join(__dirname, '..', '..','views', 'login.html');
    console.log(`Serving file from: ${filePath}`);
    res.sendFile(filePath);
}

exports.signup = (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'views', 'signup.html');
    console.log(`Serving file from: ${filePath}`);
    res.sendFile(filePath);
}


exports.explore = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.render('explorepage', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
};




async function getAllPosts() {
    try {
        const users = await Userdb.find();
        let allPosts = [];
        users.forEach(user => {
            user.posts.forEach(post => {
                post.imageURL = `/images/${post.image}`;
                allPosts.push(post);
            });
        });

        // Sort posts by createdAt in descending order (newest first)
        allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        return allPosts;
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
}

exports.explore = async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.render('explorepage', { posts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching posts');
    }
};

exports.getImage = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching image with ID:', id); // Debugging log
        const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });

        let objectId;
        try {
            objectId = new ObjectId(id);
        } catch (err) {
            console.error('Invalid ObjectId format:', id); // Debugging log
            return res.status(400).send('Invalid image ID');
        }

        const downloadStream = bucket.openDownloadStream(objectId);
        downloadStream.on('error', (err) => {
            console.error('Error in downloadStream:', err); // Debugging log
            res.status(404).send('Image not found');
        });
        downloadStream.pipe(res);
    } catch (error) {
        console.error('Error in getImage:', error); // Debugging log
        res.status(500).send('Error retrieving image');
    }
};


// exports.getImage = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const bucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'images' });

//         const downloadStream = bucket.openDownloadStream(ObjectId(id));
//         downloadStream.on('error', () => {
//             res.status(404).send('Image not found');
//         });
//         downloadStream.pipe(res);
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error retrieving image');
//     }
// };


// async function getAllPosts() {
//     try {
//         const users = await Userdb.find();
//         let allPosts = [];
//         users.forEach(user => {
//             user.posts.forEach(post => {
//                 post.imageURL = `/images/${post.image}`;
//                 allPosts.push(post);
//             });
//         });

//         // Sort posts by createdAt in descending order (newest first)
//         allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

//         return allPosts;
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         throw error;
//     }
// }


// exports.explore = async (req, res) => {
//     try {
//         const posts = await getAllPosts();
//         res.render('explorepage', { posts });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Error fetching posts');
//     }
// };