import Student from '../models/studentModel.js'

export const create = async (req, res) => {
    try {
        const studentData = new Student(req.body);
        if (!studentData) {
            return res.status(404).json({ msg: 'User data not found' });
        }
        const savedData = await studentData.save();
        res.status(200).json({
            message: 'Data saved successfully',
            data: savedData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAll = async (req, res) => {
    try {
        const studentData = await Student.find();
        if (!studentData) {
            return res.status(404).json({ msg: 'User data not found' });
        }
        res.status(200).json(studentData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Student.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User data not found' });
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Student.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User data not found' });
        }
        const updatedData = await Student.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({
            message: 'Data updated successfully',
            data: updatedData
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteData = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await Student.findById(id);
        if (!userExist) {
            return res.status(404).json({ msg: 'User data not found' });
        }
        await Student.findByIdAndDelete(id);
        res.status(200).json({ msg: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
