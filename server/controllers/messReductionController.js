const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getUserRequest = async (req, res) => {
    const { id } = req.query;
    try {
        const response = await prisma.request.findMany({
            where: {
                enrollment_no: id
            }
        });
        res.json(response);
    }catch(err) {
        res.status(500).json({ succes: false, message: "Something went wrong", error: err})
    }
}

const submitRequest = async (req, res) => {
    const { enrollment_no, starting_date, ending_date, reason, description } = req.body;
    // console.log(req.body);

    let data = {
        enrollment_no,
        starting_date,
        ending_date,
        reason,
    }

    if(description !== '') {
        data = {
            enrollment_no,
            starting_date,
            ending_date,
            reason,
            description
        }
    }

    try {
        const response = await prisma.request.create({
            data: data
        });

        console.log(response);

        res.json(response);

    }catch(err) {
        res.status(500).json({ success: false, message: "Something went wrong", error: err });
    }
};

const getAllRequest = async (req, res) => {
    try {
        const requests = await prisma.request.findMany({
            where: {
                status: "pending"
            },
            include: {
                user: {
                    select: {
                        fullname: true,
                    }
                }
            }
        });
        res.json(requests);
    }catch(error) {
        res.status(500).json({ success: false, message: 'Something went wrong', error: error });
    }
};

const approveRequest = async (req, res) => {
    const { request_id } = req.body;
    try {
        const response = await prisma.request.updateMany({
            where: {
                id: request_id
            },
            data: {
                status: "approved"
            }
        }); 
        res.json(response);
    }catch(err) {
        res.status(500).json({ success: false, message: "Something went wrong", error: err });
    }
};

const rejectRequest = async (req, res) => {
    const { request_id } = req.body;
    try {
        const response = await prisma.request.updateMany({
            where: {
                id: request_id
            },
            data: {
                status: "rejected"
            }
        });   
        res.json(response);
    }catch(err) {
        res.status(500).json({ success: false, message: "Something went wrong", error: err });
    }
};

module.exports = {
    getUserRequest,
    submitRequest,
    getAllRequest,
    approveRequest,
    rejectRequest
}