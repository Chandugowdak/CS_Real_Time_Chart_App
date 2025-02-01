import jwt from 'jsonwebtoken'


//THIS WILL GENERATE THE TOKEN FOR THE USER
export const generateTocken = (userId, res) => {
    

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
    
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,// only server can read it
        sameSite: 'strict', // secure cookie
        secure: process.env.NODE_ENV !== 'development' // only send cookie over https
        
    })
    return token;
}