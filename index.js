const express = require("express");
const cors = require("cors");
const z = require("zod");
const app = express()

app.use(cors());
app.use(express.json());

const PORT = 8000

app.get("/", (req, res) => {
    res.json({ message: 'Server is running' });
});

app.post("/signup", (req, res) => {
    const { enroll_no, password } = req.body;
    console.log(enroll_no);
    
    const schema = z.object({
        enroll_no: z.string().min(13).max(13),
        password: z.string().min(8).max(50)
    })

    const response = schema.safeParse({ enroll_no, password });
    console.log(response);

    if(!response.success) {
        res.json({ message: 'invalid roll no', error: response.error});
    }

    return res.json({ message: response });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})