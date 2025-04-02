const { PrismaClient } = require("@prisma/client")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const z = require("zod");

const prisma = new PrismaClient();

const userLogin = async (req, res) => {
    const schema = z.object({
        enrollment_no: z.string().min(13).max(13),
        password: z.string().min(8).max(50)
    });

    const response = schema.safeParse(req.body);

    if(!response.success) {
        return res.json({ success: false, message: 'Invalid enrollment number or password format', error: response.error });
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                enrollment_no: response.data.enrollment_no
            }
        });
        
        if(!user) {
            return res.json({ success: false, message: 'No student found with this enrollment number' }); 
        }
        
        if(!bcrypt.compareSync(response.data.password, user.password)) {
            return res.json({ success: false, message: 'Invalid password' });
        }
        
        const payload = {
            fullname: user.fullname,
            email: user.email
        };
        
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        
        res.json({ success: true, user: user, token: token});
    }catch(err) {
        res.json({ success: false, message: 'Something went wrong' });
    }
};

const getUser = async (req, res) => {
    const { id } = req.query;

    try {
        const response = await prisma.user.findUnique({
            where: {
                enrollment_no: id
            },
            include: {
                payment: {
                    orderBy: {
                        created_at: 'desc'
                    },
                    select: {
                        created_at: true,
                        amount: true
                    }
                },
            },
        })
        res.json(response);
    }catch(err) {
        res.status(500).json({ success: true, message: "Something went wrong" })
    }
};

module.exports = { userLogin, getUser };