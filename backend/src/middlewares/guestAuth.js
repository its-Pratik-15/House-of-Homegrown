const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to handle guest authentication
const guestAuth = (req, res, next) => {
    try {
        // Check for authorization header
        const authHeader = req.headers.authorization;
        let token = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }

        if (token) {
            try {
                // Verify existing token
                const decoded = jwt.verify(token, JWT_SECRET);
                req.user = decoded;
                req.isGuest = decoded.type === 'guest';
                req.userId = decoded.userId;
                req.guestId = decoded.guestId;
            } catch (error) {
                // Token is invalid, create new guest session
                const guestId = uuidv4();
                const guestToken = jwt.sign(
                    { 
                        guestId, 
                        type: 'guest',
                        createdAt: new Date().toISOString()
                    },
                    JWT_SECRET,
                    { expiresIn: '30d' } // Guest sessions expire in 30 days
                );

                req.isGuest = true;
                req.guestId = guestId;
                req.guestToken = guestToken;
                
                // Set the token in response header for client to store
                res.setHeader('X-Guest-Token', guestToken);
            }
        } else {
            // No token provided, create new guest session
            const guestId = uuidv4();
            const guestToken = jwt.sign(
                { 
                    guestId, 
                    type: 'guest',
                    createdAt: new Date().toISOString()
                },
                JWT_SECRET,
                { expiresIn: '30d' }
            );

            req.isGuest = true;
            req.guestId = guestId;
            req.guestToken = guestToken;
            
            // Set the token in response header for client to store
            res.setHeader('X-Guest-Token', guestToken);
        }

        next();
    } catch (error) {
        console.error('Guest auth middleware error:', error);
        
        // Fallback: create new guest session
        const guestId = uuidv4();
        const guestToken = jwt.sign(
            { 
                guestId, 
                type: 'guest',
                createdAt: new Date().toISOString()
            },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        req.isGuest = true;
        req.guestId = guestId;
        req.guestToken = guestToken;
        res.setHeader('X-Guest-Token', guestToken);
        
        next();
    }
};

// Helper function to generate guest token
const generateGuestToken = () => {
    const guestId = uuidv4();
    const token = jwt.sign(
        { 
            guestId, 
            type: 'guest',
            createdAt: new Date().toISOString()
        },
        JWT_SECRET,
        { expiresIn: '30d' }
    );
    
    return { guestId, token };
};

module.exports = { guestAuth, generateGuestToken };