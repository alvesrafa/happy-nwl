import { ErrorRequestHandler } from 'express';

import { ValidationError } from 'yup';

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, requrest, response, next) => {
  console.error(error);

  if (error instanceof ValidationError) {
    let errors: ValidationErrors = {};

    error.inner.forEach((err) => {
      errors[err.path] = err.errors;
    });
    return response
      .status(400)
      .json({ success: false, message: 'Erro de validação', errors });
  }
  return response
    .status(500)
    .json({ success: false, message: 'Erro interno no servidor' });
};
export default errorHandler;
