import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    // Handle Mongoose ValidationError
    if (err instanceof mongoose.Error.ValidationError) {
        const simplifiedErrors: Record<string, any> = {};

        for (const field in err.errors) {
            const fieldError = err.errors[field];
            simplifiedErrors[field] = {
                message: fieldError.message,
                name: fieldError.name,
                properties: {
                    message: fieldError.properties?.message,
                    type: fieldError.properties?.type,
                    min: fieldError.properties?.min,
                    max: fieldError.properties?.max,
                },
                kind: fieldError.kind,
                path: fieldError.path,
                value: fieldError.value,
            };
        }

        return res.status(400).json({
            message: 'Validation failed',
            success: false,
            error: {
                name: err.name,
                errors: simplifiedErrors,
            },
        });
    }

    // Handle CastError
    if (err instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            message: 'Invalid ID format',
            success: false,
            error: {
                name: err.name,
                value: err.value,
                reson: 'Id must be a 24-character hexadecimal string.',
                message: err.message
            },
        });
    }

    // Default error response
    return res.status(500).json({
        message: 'Something went wrong',
        success: false,
        error: {
            name: err.name,
            message: err.message,
        },
    });
};
