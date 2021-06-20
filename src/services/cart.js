const config = {
  key: "adielsonCart",
};

class Cart {
  constructor() {
    this._items = this.getItems();
  }

  getItems() {
    this._items = JSON.parse(localStorage.getItem(config.key));
    return this._items || [];
  }

  addItem({ id, name, description, image }, cb = null) {
    const items = this.getItems();
    let exists = false;

    for (const item of items) {
      if (item.id === id) {
        item.count += 1;
        exists = true;
      }
    }

    if (!exists) {
      items.push({ id, name, description, image, count: 1 });
    }

    this._items = items;
    localStorage.setItem(config.key, JSON.stringify(this._items));

    if (cb && typeof cb === "function") {
      cb(this._items);
    }
  }

  removeItem(id, cb = null) {
    let positionToPurge = null;

    const items = this._items.map((item, i) => {
      if (item.id === id) {
        item.count -= 1;

        if (item.count <= 0) {
          positionToPurge = i;
        }
      }

      return item;
    });

    if (positionToPurge != null) {
      items.splice(positionToPurge, 1);
    }

    this._items = items;
    localStorage.setItem(config.key, JSON.stringify(this._items));

    if (cb && typeof cb === "function") {
      cb(this._items);
    }
  }
}

const cart = new Cart();

export default cart;
