const axios = require("axios")

const auth = async (req, res, next) => {
    
    const {authorization} = req.headers

    
    try{
        const token = authorization.replace("Bearer ", "")
        
        const response = await axios.post("http://localhost:8081/validarToken", {
            token
        })
        
        if(response.data.sucesso){
            return next()
        }else{
            return res.status(401).send("Token inválido.")
        }
    }catch(err){
        return res.status(401).send("Token inválido.")
    }
    
}

module.exports = auth