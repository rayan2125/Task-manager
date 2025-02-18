import express from "express";

const App = express();

App.get("/", (req, res) => {
    res.send("Hello, Render!");
});

const PORT = process.env.PORT || 3000;

App.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default App;
