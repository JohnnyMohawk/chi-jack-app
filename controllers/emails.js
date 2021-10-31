import { Email } from "../models/email.js";

const create = async (req, res) => {
    try {
        const email = await new Email(req.body)
        await email.save()
        
        return res.status(201).json(email)
    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

export {
    create
}