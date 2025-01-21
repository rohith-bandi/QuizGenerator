// const express = require("express");
// const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const { exec } = require("child_process");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// require("dotenv").config({ path: path.join(__dirname, "../.env") });

// const app = express();
// const port = process.env.PORT || 5001;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Configure Multer for file uploads
// const upload = multer({ dest: "uploads/" });

// // Connect to MongoDB
// mongoose
//   .connect("mongodb+srv://bandirohithreddysm:Rohith0508@cluster0.xsc7g.mongodb.net/usersDB?retryWrites=true&w=majority&appName=Cluster0", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log("MongoDB connection error:", err));

// // Define Schemas
// // Contact Schema
// const contactSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   message: String,
// });
// const Contact = mongoose.model("Contact", contactSchema);

// // Question Schema
// const questionSchema = new mongoose.Schema({
//   topic: String,
//   subTopic: String,
//   questionType: String,
//   numQuestions: Number,
//   email: String, // Added email field
//   questions: [
//     {
//       question: String,
//       answer: String,
//       context: String,
//     },
//   ],
//   sourceType: { type: String, enum: ["pdf", "non-pdf"], required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const Question = mongoose.model("Quiz", questionSchema);
// const Submission = mongoose.model("Cquiz", questionSchema);

// // User Schema for Login/Registration
// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });
// const User = mongoose.model("User", userSchema);

// // API Endpoints
// // Register User
// app.post("/register", async (req, res) => {
//   const { email, password, confirmPassword } = req.body;
//   // Check if passwords match
//   if (password !== confirmPassword) {
//     return res.status(400).send({ message: "Passwords do not match" });
//   }
//   // Check if the user already exists
//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).send({ message: "User already exists" });
//   }
//   // Save user to database
//   const newUser = new User({ email, password }); // Plain-text password (not secure for production)
//   await newUser.save();
//   res.status(201).send({ message: "User registered successfully" });
// });

// // Login User
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user || user.password !== password) {
//       return res.status(400).send({ message: "Invalid email or password" });
//     }
//     res.status(200).send({ message: "Login successful" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send({ message: "Error logging in" });
//   }
// });

// // Contact Form Submission
// app.post("/api/contact", async (req, res) => {
//   const { name, email, phone, message } = req.body;

//   const newContact = new Contact({ name, email, phone, message });
//   try {
//     await newContact.save();
//     res.status(201).send("Contact saved");
//   } catch (err) {
//     res.status(400).send("Error saving contact");
//   }
// });

// // Generate Questions
// app.post("/api/generate-questions", (req, res) => {
//   const { topic, subTopic, questionType, numQuestions, email } = req.body;

//   if (!email) {
//     return res.status(400).send({ error: "Email is required" });
//   }

//   const command = `python main.py --topic "${topic}" --subTopic "${subTopic}" --questionType "${questionType}" --numQuestions ${numQuestions}`;
//   console.log("Running command:", command);

//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`Error executing main.py: ${stderr}`);
//       return res.status(500).send({ error: "Error generating questions" });
//     }

//     try {
//       const result = JSON.parse(stdout);

//       const newQuestions = new Question({
//         topic,
//         subTopic,
//         questionType,
//         numQuestions,
//         sourceType: "non-pdf",
//         email, // Save email to associate with the submission
//         questions: result.questions.map((q) => ({
//           question: q.question || "No question",
//           answer: q.answer || "No answer",
//           context: q.context || "No context",
//         })),
//       });

//       newQuestions
//         .save()
//         .then(() => {
//           console.log("Questions saved");
//           res.status(200).send(result);
//         })
//         .catch((err) => {
//           console.error("Error saving questions:", err);
//           res.status(500).send({ error: "Error saving questions to database" });
//         });
//     } catch (e) {
//       console.error("Error parsing Python output:", e);
//       res.status(500).send({ error: "Error parsing generated questions" });
//     }
//   });
// });

// // File Upload and Generate Questions
// app.post(
//   "/api/upload-and-generate-questions",
//   upload.single("file"),
//   (req, res) => {
//     const { questionType, numQuestions, email } = req.body;

//     if (!email) {
//       return res.status(400).send({ error: "Email is required" });
//     }

//     if (!req.file) {
//       return res.status(400).send({ error: "No file uploaded" });
//     }

//     const filePath = path.resolve(req.file.path);
//     const command = `python3 main.py --file "${filePath}" --questionType "${questionType}" --numQuestions ${numQuestions}`;
//     console.log("Running command:", command);

//     exec(command, (error, stdout, stderr) => {
//       fs.unlinkSync(filePath);

//       if (error) {
//         console.error(`Error executing main.py: ${stderr}`);
//         return res.status(500).send({ error: "Error generating questions" });
//       }

//       try {
//         const result = JSON.parse(stdout);

//         const newSubmission = new Submission({
//           questionType,
//           numQuestions,
//           sourceType: "pdf",
//           email, // Save email to associate with the submission
//           questions: result.questions.map((q) => ({
//             question: q.question || "No question",
//             answer: q.answer || "No answer",
//             context: q.context || "No context",
//           })),
//         });

//         newSubmission
//           .save()
//           .then(() => {
//             console.log("Submission saved");
//             res.status(200).send(result);
//           })
//           .catch((err) => {
//             console.error("Error saving submission:", err);
//             res
//               .status(500)
//               .send({ error: "Error saving submission to database" });
//           });
//       } catch (e) {
//         console.error("Error parsing Python output:", e);
//         res.status(500).send({ error: "Error parsing generated questions" });
//       }
//     });
//   }
// );

// // Fetch Submission History
// app.post("/api/submissions", async (req, res) => {
//   const { email } = req.body;

//   if (!email) {
//     return res.status(400).send({ error: "Email is required" });
//   }

//   try {
//     // Fetch submissions for the specified email
//     const nonPdfSubmissions = await Question.find({ email });
//     const pdfSubmissions = await Submission.find({ email });
//     const allSubmissions = [...pdfSubmissions, ...nonPdfSubmissions];

//     res.status(200).json({ submissions: allSubmissions });
//   } catch (err) {
//     console.error("Error fetching submissions:", err);
//     res.status(500).send({ error: "Error fetching submission history" });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });







const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { exec } = require("child_process");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
require("dotenv").config({ path: path.join(__dirname, "../.env") });


const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });


// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define Schemas
// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
});
const Contact = mongoose.model("Contact", contactSchema);

// Question Schema
const questionSchema = new mongoose.Schema({
  topic: String,
  subTopic: String,
  questionType: String,
  numQuestions: Number,
  email: String, // Added email field
  questions: [
    {
      questionType: String,
      question: String,
      options: [String],
      answer: String,
    },
  ],
  sourceType: { type: String, enum: ["pdf", "non-pdf"], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model("Quiz", questionSchema);
const Submission = mongoose.model("Cquiz", questionSchema);

// User Schema for Login/Registration
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema);

// API Endpoints
// Register User
app.post("/register", async (req, res) => {
  const { email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send({ message: "Passwords do not match" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: "User already exists" });
  }
  const newUser = new User({ email, password });
  await newUser.save();
  res.status(201).send({ message: "User registered successfully" });
});

// Login User
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    res.status(200).send({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Error logging in" });
  }
});

// Fetch Maximum Questions
app.get("/getnumques", (req, res) => {
  const { topic, subTopic } = req.query;

  if (!topic || !subTopic) {
    return res.status(400).send({ error: "Topic and Subtopic are required" });
  }

  const command =`python3 getnumques.py --topic "${topic}" --subTopic "${subTopic}"`;
  console.log("Running command:", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing getnumques.py: ${stderr}`);
      return res.status(500).send({ error: "Error fetching max questions" });
    }

    try {
      const result = JSON.parse(stdout);
      res.status(200).send(result);
    } catch (e) {
      console.error("Error parsing Python output:", e);
      res.status(500).send({ error: "Error parsing max questions output" });
    }
  });
});


// Configure Multer


app.post('/getmaxques', upload.single('file'), (req, res) => {
    const filePath = path.resolve(req.file.path); // Get the uploaded file's path
    console.log('File uploaded to:', filePath);

    const command = `python3 getmaxques.py --file "${filePath}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing getnumques.py: ${stderr}`);
            return res.status(500).send({ error: 'Error fetching max questions' });
        }

        try {
            const result = JSON.parse(stdout);
            res.status(200).send(result); // Send the response back to the client
        } catch (e) {
            console.error('Error parsing Python output:', e);
            res.status(500).send({ error: 'Error parsing max questions output', details: e.message });
        }
    });
});



// Generate Questions
app.post("/api/generate-questions", (req, res) => {
  const { topic, subTopic, questionType, numQuestions, email } = req.body;

  if (!email) {
    return res.status(400).send({ error: "Email is required" });
  }

  const command = `python3 main.py --topic "${topic}" --subTopic "${subTopic}" --questionType "${questionType}" --numQuestions ${numQuestions}`;
  console.log("Running command:", command);

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing main1.py: ${stderr}`);
      return res.status(500).send({ error: "Error generating questions" });
    }

    try {
      const result = JSON.parse(stdout);

      const newQuestions = new Question({
        topic,
        subTopic,
        questionType,
        numQuestions,
        sourceType: "non-pdf",
        email,
        questions: result.questions.map((q) => ({
          questionType: q.questionType || "Unknown",
          question: q.question || "No question",
          options: q.options || [],
          answer: q.answer || "No answer",
        })),
      });

      newQuestions
        .save()
        .then(() => {
          console.log("Questions saved");
          res.status(200).send(result);
        })
        .catch((err) => {
          console.error("Error saving questions:", err);
          res.status(500).send({ error: "Error saving questions to database" });
        });
    } catch (e) {
      console.error("Error parsing Python output:", e);
      res.status(500).send({ error: "Error parsing generated questions" });
    }
  });
});
app.post(
  "/api/upload-and-generate-questions",
  upload.single("file"),
  (req, res) => {
    const { questionType, numQuestions, email } = req.body;

    if (!email) {
      return res.status(400).send({ error: "Email is required" });
    }

    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    const filePath = path.resolve(req.file.path);
    const command = `python3 main.py --file "${filePath}" --questionType "${questionType}" --numQuestions ${numQuestions}`;
    console.log("Running command:", command);

    exec(command, (error, stdout, stderr) => {
      fs.unlinkSync(filePath);

      if (error) {
        console.error(`Error executing main1.py: ${stderr}`);
        return res.status(500).send({ error: "Error generating questions" });
      }

      try {
        const result = JSON.parse(stdout);

        const newSubmission = new Submission({
          questionType,
          numQuestions,
          sourceType: "pdf",
          email, // Save email to associate with the submission
          questions: result.questions.map((q) => ({
           
              questionType: q.questionType || "Unknown",
              question: q.question || "No question",
              options: q.options || [],
              answer: q.answer || "No answer",
          })),
        });

        newSubmission
          .save()
          .then(() => {
            console.log("Submission saved");
            res.status(200).send(result);
          })
          .catch((err) => {
            console.error("Error saving submission:", err);
            res
              .status(500)
              .send({ error: "Error saving submission to database" });
          });
      } catch (e) {
        console.error("Error parsing Python output:", e);
        res.status(500).send({ error: "Error parsing generated questions" });
      }
    });
  }
);
app.post("/api/submissions", async (req, res) => {
      const { email } = req.body;
    
      if (!email) {
        return res.status(400).send({ error: "Email is required" });
      }
    
      try {
        // Fetch submissions for the specified email
        const nonPdfSubmissions = await Question.find({ email });
        const pdfSubmissions = await Submission.find({ email });
        const allSubmissions = [...pdfSubmissions, ...nonPdfSubmissions];
    
        res.status(200).json({ submissions: allSubmissions });
      } catch (err) {
        console.error("Error fetching submissions:", err);
        res.status(500).send({ error: "Error fetching submission history" });
      }
    });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});