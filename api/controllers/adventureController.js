// Dummy adventure data
const adventures = {
  '1': { id: 1, name: 'Mountain Adventure', description: 'Climb the highest peaks!' },
  '2': { id: 2, name: 'Beach Adventure', description: 'Relax by the ocean!' },
};

export const getAllAdventures = (req, res) => {
  res.json(Object.values(adventures));
};

export const getAdventureByCategory = (req, res) => {
  const { categoryId } = req.params;
  const adventure = adventures[categoryId];

  if (!adventure) {
    return res.status(404).json({ message: 'Adventure not found' });
  }

  res.json(adventure);
};
