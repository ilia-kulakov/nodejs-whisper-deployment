import { Whisper } from '../database.js';

const getAll = () => Whisper.find().populate('author', 'username');

const getById = (id) =>
  Whisper.findById({ _id: id }).populate('author', 'username');

const create = async (message, authorId) => {
  const newWhisper = Whisper.create({ message, author: authorId });
  (await newWhisper).save();
  return newWhisper;
};

const updateById = async (id, message) =>
  Whisper.findOneAndUpdate({ _id: id }, { message }, { new: false });

const deleteById = async (id) => Whisper.deleteOne({ _id: id });

export { getAll, getById, create, updateById, deleteById };
