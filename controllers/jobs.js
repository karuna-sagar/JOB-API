

const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const getAllJob = async (req, res) => {
    res.send('get all job')
}
const getJob = async (req, res) => {
    res.send('get  job');
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCode.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    res.send('update  job');
}
const deleteJob = async (req, res) => {
    res.send('delete job')
}


module.exports = { getAllJob, getJob, updateJob, deleteJob, createJob };