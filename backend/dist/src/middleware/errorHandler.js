import ApiError from '../errors/ApiError.js';
const apiErrorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        res.status(err.code).json({ msg: err.message });
        return;
    }
    res.status(500).json({ msg: 'Something went wrong.' });
};
export default apiErrorHandler;
