const crypto = require('crypto');

/**
 * Returns an hashed password
 *
 * @remarks
 * This method is part of the {@link core-library#Statistics | Statistics subsystem}.
 *
 * @param {string} password - Initial password.
 * @returns Hashed password.
 */
export const getHashedPassword = ( password: string ) => {
    const sha256 = crypto.createHash('sha256');
    const hash = 
        sha256.update(password)
              .digest('base64');
    return hash;
}


export const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}