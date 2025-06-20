import mongoose from "mongoose";
import Journal from "../models/journalSchema.js";

export const createJournal = async (req, res) => {
    try {
        const { userId, content } = req.body;
        
        const newJournal = new Journal({ userId, content });
        await newJournal.save();
        res.status(201).json(newJournal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getJournalByUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);


  try {
    const journals = await Journal.find({ userId: id, isDeleted: false });

    if (!journals.length) {
      return res.status(404).json({ message: 'No journals found for this user.' });
    }

    res.status(200).json(journals);
  } catch (error) {
    console.error('Get Journal Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};



export const getJournal = async (req, res) => {
    const { id } = req.params;
    try {
        const journal = await Journal.findById(id);
        res.status(200).json(journal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const updateJournal = async (req, res) => {
    const { id } = req.params;
    const { userId, content } = req.body;

    try {
        const updatedJournal = await Journal.findByIdAndUpdate(id, { userId, content }, { new: true });
        res.status(200).json(updatedJournal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const deleteJournal = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedJournal = await Journal.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        res.status(200).json(deletedJournal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}