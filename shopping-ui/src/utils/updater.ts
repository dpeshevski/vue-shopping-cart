export default function updater({ items, id, itemToUpdate, stateToUpdate, type }: {
  items: any[], id: string, itemToUpdate: string, stateToUpdate: number | undefined, type: string }) {
    const foundItem = items.find((item: any) => item.id === id);

    if (foundItem) {
      if (type === 'increment') {
        foundItem[itemToUpdate] += 1;
        stateToUpdate = foundItem[itemToUpdate];
      } else if (type === 'decrement' && foundItem[itemToUpdate] > 0) {
        foundItem[itemToUpdate] -= 1;
        stateToUpdate = foundItem[itemToUpdate];
      }
    }

    return stateToUpdate;
  }
