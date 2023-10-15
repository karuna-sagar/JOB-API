

const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const getAllJob = async (req, res) => {
    const job = await Job.find({ createdBy: req.user.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ job, count: job.length })

}
const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;

    const job = await Job.findOne({
        _id: jobId,
        createdBy: userId
    })
    if (!job) {
        throw new NotFoundError(`No job is there ${jobId}`)
    }
    res.status(StatusCodes.OK).json({ job });
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const {
        body: { company, position },
        user: { userId },
        params: { id: jobId }
    }
        = req;


    if (company === '' || position === '') {
        throw new BadRequestError('Please Provide Company and Position')
    }
    const job = await Job.findByIdAndUpdate({
        _id: jobId,
        createdBy: userId
    }, req.body, { new: true, runValidators: true })
    res.status(StatusCodes.OK).json({ job });
}
const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req;
    const job = await Job.findByIdAndRemove({
        _id: jobId,
        createdBy: userId
    })
    res.status(StatusCodes.OK).send();
}


module.exports = { getAllJob, getJob, updateJob, deleteJob, createJob };