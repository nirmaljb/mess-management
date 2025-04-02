const { PrismaClient } = require("@prisma/client");
const z = require("zod");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    const loginSchema = z.object({
        username: z.string().min(1, "Username is required"),
        password: z.string().min(6, "Password must be at least 6 characters")
    });

    // try {
    //     loginSchema.safeParse({ username, password });

    //     const admin = await prisma.admin.findFirst({
    //         where: {
    //             username: username
    //         }
    //     });

    //     if (!admin || admin.password !== password) {
    //         return res.status(401).json({ 
    //             success: false, 
    //             message: "Invalid credentials" 
    //         });
    //     }

    //     const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET);

    //     res.json({
    //         success: true,
    //         token
    //     });

    // } catch (err) {
    //     if (err instanceof z.ZodError) {
    //         return res.status(400).json({
    //             success: false,
    //             message: err.errors[0].message
    //         });
    //     }
    //     res.status(500).json({ 
    //         success: false, 
    //         message: "Something went wrong" ,
    //         error: err
    //     });
    // }
    if(username === 'admin' && password === 'admin1234') {
        const token = jwt.sign({ username: username }, process.env.JWT_SECRET);

        res.json({
            success: true,
            token
        });
    }else {
        res.status(500).json({ 
                    success: false, 
                    message: "Something went wrong" ,
        }); 
    }
};

const adminSignup = async(req, res) => {
    const { username, password } = req.body;
    const response = await prisma.admin.create({
        data: {
            username: username,
            password: password
        }
    });
    res.json(response);
}

module.exports = {
    adminLogin,
    adminSignup
}