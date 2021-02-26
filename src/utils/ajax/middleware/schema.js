export default {
  properties: {
    data: {
      type: 'object',
      required: ['code', 'message', 'data'],
      properties: {
        code: {
          type: 'number'
        },
        message: {
          type: 'string'
        },
        data: {
          type: ['object', 'array']
        }
      }
    }
  }
}
