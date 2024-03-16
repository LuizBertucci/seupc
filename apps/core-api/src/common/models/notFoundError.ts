export class NotFoundError extends Error {
  constructor(id: string) {
    super(`There is no entity with the id ${id}`);
  }
}
