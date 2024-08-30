const mongoose = require("mongoose")

const bcrypt= require('bcrypt')

const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type : Number, 
    },
    work: {
        type: String,
        enum: ["chef", "waiter", "manager" ],
        required: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true  
        
    },
    address : {
        type : String,
    },
    salary: {
    type: Number,
    required :true
    },
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String

    }

})

personSchema.pre('save', async function (next) {
    const person = this;

    if (!person.isModified('password')) return next();
    
    try {
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        person.password = hashedPassword; 

        next();
    } catch (error) {
        return next(error);
    }
});


personSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch =await bcrypt.compare(candidatePassword , this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const Person =mongoose.model("Person", personSchema);

module.exports= Person;