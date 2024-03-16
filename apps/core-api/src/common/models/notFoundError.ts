export class NotFoundError extends Error {
  constructor(id: string) {
    super(`There is not entity with the id ${id}`);
  }
}