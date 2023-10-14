const getAllJob = async (req, res) => {
    res.send('get all job')
}
const getJob = async (req, res) => {
    res.send('get  job');
}
const createJob = async (req, res) => {
    res.json(req.body);
}
const updateJob = async (req, res) => {
    res.send('update  job');
}
const deleteJob = async (req, res) => {
    res.send('delete job')
}


module.exports = { getAllJob, getJob, updateJob, deleteJob, createJob };