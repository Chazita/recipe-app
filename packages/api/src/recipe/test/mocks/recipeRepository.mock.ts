const mockedRecipeRepository = {
  find: jest.fn().mockReturnValue([]),
  findOne: jest.fn().mockImplementation(),
};

export default mockedRecipeRepository;
