/* eslint-disable default-param-last */
class ResponseFormatter {
  static success(message, data, pagination, status = true) {
    return {
      status,
      message,
      data,
      errors: [],
      pagination,
    };
  }

  static successWithPagination(message, data, status = true, pagination = {}) {
    return {
      status,
      message,
      data,
      errors: [],
      pagination,
    };
  }

  static error(message, errors = [], status = false) {
    return {
      status,
      message,
      data: null,
      errors,
    };
  }
}

module.exports = ResponseFormatter;
