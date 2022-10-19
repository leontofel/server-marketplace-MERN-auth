import jwt from 'jsonwebtoken';

export async function verifyToken(token) {
  try{
    if(token.body.data === undefined) return false;
    const payload = jwt.verify(token.body.data, process.env.TOKEN_KEY || "TOKENkey");
    if(payload) return true;
    return true;
  } catch(err) {

    return false;
  }

}

export const TokenValidation = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json("Access denied");
  
    const payload = jwt.verify(token, process.env.TOKEN_KEY || "TOKENkey");
    if (payload) {
      next();
    }
  
  }
  
  export const isAdmin = (req, res) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).json("Insert Token");
  
    const payload = jwt.verify(token, process.env.TOKEN_KEY || "TOKENkey");
    const payloadAdm = jwt.verify(process.env.ADMIN_TOKEN, process.env.TOKEN_KEY || "TOKENkey");
    
  
    if (`${payload["user_id"]}` === payloadAdm["user_id"]) {
      return true;
    }
    return false
  
  
  }
  
  
  export const hasAuthorization = (req, res, user_id, id) => {
    const token = req.header('auth-token');
        const payload = jwt.verify(token, process.env.TOKEN_KEY || "TOKENkey");
        if (payload["user_id"] == user_id || payload["user_id"] == (process.env.ADMIN_ID)) {
          return true
        }
    return false
   
  }