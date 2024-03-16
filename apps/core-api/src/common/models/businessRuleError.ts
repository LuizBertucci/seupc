export class BusinessRuleError extends Error {
  constructor(msg: string) {
    super(`Business Rule error: ${msg}`);
  }
}
