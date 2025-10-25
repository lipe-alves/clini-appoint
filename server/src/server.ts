import app from "./app";

const PORT = parseInt(process.env.PORT || "5000", 10);
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`API endpoints available at http://${HOST}:${PORT}/v1`);
});
