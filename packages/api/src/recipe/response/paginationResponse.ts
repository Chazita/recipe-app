import { Recipe } from '../entities/recipe.entity';

export default function PaginationResponse(
  data: [Recipe[], number],
  page: number,
) {
  const [result, total] = data;
  const lastPage = Math.ceil(total / 10);
  const nextPage = page + 1 > lastPage ? null : page + 1;
  const prevPage = page - 1 < 1 ? null : page - 1;

  return {
    recipes: result,
    count: total,
    currentPage: +page,
    nextPage,
    prevPage,
    lastPage,
  };
}
