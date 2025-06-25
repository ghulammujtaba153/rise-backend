import NewsLetter from "../models/newsLetterSchema.js";



export const createLetter = async (req, res) => {
    try {
        const letter = new NewsLetter(req.body);
        await letter.save();
        res.status(200).json(letter);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};


export const getLetter = async (req, res) => {
    const {id} = req.params
    try {
        const letter = await NewsLetter.findById(id)
        res.status(200).json(letter)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getAllLetter = async (req, res) => {
    try {
        const letters = await NewsLetter.find({isDeleted: false})
        res.status(200).json(letters)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const deleteLetter = async (req, res) => {
    const {id} = req.params
    try {
        const letter = await NewsLetter.findByIdAndUpdate(id, {isDeleted: true}, {new: true})
        res.status(200).json(letter)
    } catch (error) {
        res.status(500).json(error)
    }
}