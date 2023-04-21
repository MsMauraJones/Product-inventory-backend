//Define a schema and model for a "product" collection

const mongoose = require("mongoose");

// const Product = mongoose.model(
//     "Product",
//     mongoose.Schema({
//         productName: {
//             type: String,
//             required: true
//         },
//         owner: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Ministry',
//         },
//         ownerName: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Owner'
//         },
//         scrumMaster: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'scrumMaster',
//         },
//         developers: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Developer',
//             max: 5
//         }],
//         methodology:{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Methodology',
//         },
//         status: {
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Status',
//             required: true
//         },
//         startDate: {
//             type: Date
//         }
//     })
// );

const Product = mongoose.model(
    "Product",
    mongoose.Schema({
        productName: {
            type: String,
            required: true
        },
        ownerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Owner',
            required: true
        },
        ministryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ministry',
            required: true
        },
        scrumMasterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'scrumMaster',
            required: true
        },
        developerId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Developer',
            required: true
        }],
        methodologyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Methodology',
            required: true
        },
        statusId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Status',
            required: true
        },
        startDate: {
            type: Date
        }
    })
);


module.exports = Product;