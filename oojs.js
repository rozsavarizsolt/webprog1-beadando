class Character {
    constructor(name, type) {
      this.name = name;
      this.type = type;
      this.health = Math.floor(Math.random() * 100) + 1;
      this.strength = Math.floor(Math.random() * 50) + 1;
    }
  
    describe() {
      return `${this.name} (${this.type}) – Életerő: ${this.health}, Erő: ${this.strength}`;
    }
  }
  
  class Warrior extends Character {
    constructor(name) {
      super(name, 'Harcos');
      this.armor = Math.floor(Math.random() * 30) + 1;
    }
  
    describe() {
      return super.describe() + `, Páncél: ${this.armor}`;
    }
  }
  
  function generateCharacter() {
    const names = ['Aron', 'Bella', 'Cyrus', 'Dana', 'Elon'];
    const name = names[Math.floor(Math.random() * names.length)];
    const char = new Warrior(name);
  
    const div = document.createElement('div');
    div.textContent = char.describe();
    div.style.padding = '0.5rem';
    div.style.margin = '0.5rem 0';
    div.style.border = '1px solid #555';
    div.style.borderRadius = '10px';
    document.getElementById('characters').appendChild(div);
  }
  