const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();
const submitQueries = async (req, res) => {
    const { subject, category, description, image, enrollment_no } = req.body;
    // console.log(req.body);
    try {

        const query = await prisma.query.create({
            data: {
                enrollment_no,
                category,
                query: description.trim(),
                subject: subject
            }
        });

        console.log(query);
        
        res.json({ success: true, query });
    }catch(err) {
        res.status(500).json({ success: false, message: "Something went wrong", error: err });
    }
};

const getAllQueries = async (req, res) => {
    try {
        const queries = await prisma.query.findMany({
            include: {
               user: {
                    select: {
                        fullname: true,
                        enrollment_no: true,
                    }
               } 
            }
        });
        res.json(queries);
    }catch(err) {
        res.status(500).json({ success: false, message: "Something went wrong", error: err });
    }  
};

const getUserQueries = async (req, res) => {
    const { id } = req.query;
    try {
        const userQueries = await prisma.query.findMany({
            where: {
                enrollment_no: id
            }
        });
        
        res.json(userQueries);
    }catch(err) {
        res.status(500).json({ success: false, message: "Something went wrong", error: err });
    }
};

const resolveQuery = async (req, res) => {
    const { query_id } = req.body;
    try {
        console.log("reached here..");
        const response = await prisma.query.updateMany({
            where: {
                id: query_id
            },
            data: {
                status: "resolved"
            }
        }); 
        console.log("reached here...");  
        res.json(response);
    }catch(err) {
        res.status(500).json({ success: false, message: "Something went wrong", error: err });
    }
};

const rejectQuery = async (req, res) => {
    const { query_id } = req.body;
    try {
        const response = await prisma.query.updateMany({
            where: {
                id: query_id
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
    getUserQueries,
    getAllQueries,
    submitQueries,
    resolveQuery,
    rejectQuery
}