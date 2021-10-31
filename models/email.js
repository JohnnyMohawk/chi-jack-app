import mongoose from 'mongoose'

const emailSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, unique: true },
    }, {
    timestamps: true,
})

const Email = mongoose.model('Email', emailSchema)

export {
    Email
}