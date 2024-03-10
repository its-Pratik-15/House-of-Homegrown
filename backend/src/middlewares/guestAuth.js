const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware to handle guest authentication
const guestAuth = (req, res, next) => {
    try {
        // Check for authorization header first, then cookies
        const authHeader = req.headers.authorization;
        let token = null;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        } else if (req.cookies && req.cookies.guest_token) {
            token = req.cookies.guest_token;
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
                
                // Set both header and cookie
                res.setHeader('X-Guest-Token', guestToken);
                res.cookie('guest_token', guestToken, {
                    httpOnly: false, // Allow JavaScript access
                    secure: false, // Set to true in production with HTTPS
                    sameSite: 'lax',
                    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
                });
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
            
            // Set both header and cookie
            res.setHeader('X-Guest-Token', guestToken);
            res.cookie('guest_token', guestToken, {
                httpOnly: false, // Allow JavaScript access
                secure: false, // Set to true in production with HTTPS
                sameSite: 'lax',
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
            });
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
        
        // Set both header and cookie
        res.setHeader('X-Guest-Token', guestToken);
        res.cookie('guest_token', guestToken, {
            httpOnly: false,
            secure: false,
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });
        
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