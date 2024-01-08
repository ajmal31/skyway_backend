
const server = async(app, port) => {

    let response= await app.listen(port, (err) => {
        if (err) console.error(`Error starting the server: ${err}`);
        else console.log(`payment service listening on Port ${port} 🕺🍡`);
    });
    
}
export default server