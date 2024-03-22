const KEYS_KEY = "<keys>";
class BasicQualifiedStorage {
  constructor(id) {
    this.id = id;
  }
  #isQualified() {
    return this.id.startsWith("@");
  }
  #qualifyKey(key) {
    if (this.#isQualified()) {
      return `${this.id}/${key}`;
    }
    return `@${this.id}/${key}`;
  }
  set(key, value) {
    key = this.#qualifyKey(key);

    localStorage.setItem(key, JSON.stringify(value));
  }
  delete(key) {
    key = this.#qualifyKey(key);

    localStorage.removeItem(key);
  }
  has(key) {
    key = this.#qualifyKey(key);

    return localStorage.hasOwnProperty(key);
  }
  get(key) {
    key = this.#qualifyKey(key);

    const rawValue = localStorage.getItem(key);
    if (rawValue != null) {
      return JSON.parse(rawValue);
    }
    return null;
  }
  update(key, callback, defaultValue) {
    const value = this.get(key) ?? defaultValue;
    const newValue = callback(value);
    return this.set(key, newValue);
  }

  in(key) {
    return new QualifiedStorage(this.#qualifyKey(key));
  }
}

const keysStorage = new BasicQualifiedStorage(KEYS_KEY);
export class QualifiedStorage extends BasicQualifiedStorage {
  constructor(id) {
    console.assert(
      id != KEYS_KEY,
      `QualifiedStorage: id cannot be equal to ${JSON.stringify(KEYS_KEY)}`
    );

    super(id);
  }
  set(key, value) {
    keysStorage.update(
      this.id,
      (keys) => {
        keys.push(key);
        return keys;
      },
      []
    );

    super.set(key, value);
  }
  delete(key) {
    keysStorage.update(
      this.id,
      (keys) => {
        const index = keys.indexOf(key);
        if (index != -1) {
          keys.splice(index, 1);
        }

        return keys;
      },
      []
    );

    super.delete(key);
  }
  getAllKeys() {
    return keysStorage.get(this.id);
  }
  clear() {
    for (const key of this.getAllKeys()) {
      super.delete(key);
    }
    keysStorage.delete(this.id);
  }
}
