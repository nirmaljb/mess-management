const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const queryRoutes = require("./routes/queryRoutes");
const messReductionRoutes = require("./routes/messReductionRoutes");
const adminRoutes = require("./routes/adminRoutes");
// const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client")
const { v2: cloudinary } = require('cloudinary');

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = 8000

app.use('/user', userRoutes);
app.use('/payment', paymentRoutes);
app.use('/query', queryRoutes);
app.use('/mess', messReductionRoutes);
app.use('/admin', adminRoutes);


(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dptljkqqu', 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
})();


app.post("/", async (req, res) => {
    const { fullname, email, enrollment_no, dob, phone, course, department, enrolled_year, password, hostel_name, room_no, expected_graduation_year } = req.body;
    // const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await prisma.user.create({
        data: {
            photo_url: "http://placebear.com/1000/1000",
            fullname: fullname,
            email: email,
            enrollment_no: enrollment_no,
            dob: dob,
            phone: phone,
            course: course,
            department: department,
            enrolled_year: enrolled_year,
            password: password,
            hostel_name: hostel_name,
            room_no: room_no,
            expected_graduation_year: expected_graduation_year
        }
    });
    res.json(user);
});

app.post("/check", (req, res) => {
    const { password } = req.body;
    // const hashedPassword = bcrypt.hashSync(password, 10);
    // res.json({ hashedPassword });
});

app.get("/", (req,res) => {
    res.json({message: "Hello, World"});
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
})