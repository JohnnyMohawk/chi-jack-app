import mongoose from 'mongoose'

const newsSchema = new mongoose.Schema({
    status: { type: String },
    totalResults: { type: Number },
    articles: { type: Array }
    }, {
    timestamps: true,
})

const News = mongoose.model('News', newsSchema)

export {
    News
}