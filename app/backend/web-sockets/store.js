class Store {
  constructor() {
    this.storage = [];
  }

  add(connectionDetails) {
    this.storage.push({
      ...connectionDetails
    });
  }

  update(id, data) {
    const wsElementIndex = this.storage.findIndex(ws => ws.id === id);

    this.storage[wsElementIndex] = {
      ...this.storage[wsElementIndex],
      ...data
    };
  }

  get(id) {
    return this.storage.find(ws => ws.id === id);
  }

  all() {
    return [...this.storage];
  }

  remove(id) {
    const wsElementIndex = this.storage.findIndex(ws => ws.id === id);

    this.storage.splice(wsElementIndex, 1);
  }
}

class SingletonStore {
  constructor() {
    if (!SingletonStore.instance) {
      SingletonStore.instance = new Store();
    }

    return SingletonStore.instance;
  }
}

const singletonStore = new SingletonStore();
Object.freeze(singletonStore);

export default singletonStore;
