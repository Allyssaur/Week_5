class Pokemon {
    constructor(name, dexNumber) {
        this.name = name;
        this.dexNumber = dexNumber;
    }

    describe() {
        return `${this.dexNumber}) ${this.name}`;
    }
}

class Party {
    constructor(name) {
        this.name = name;
        this.pokemons = [];
    }

    addPokemon(name) {
        if(name instanceof Pokemon) {
            this.pokemons.push(name);
        } else {
            throw new Error(`Can only add an instance of Pokemon.  ${name} is not a Pokemon.`);
        }
    }

    describe() {
        return `${this.name}: ${this.pokemons.length}/6 Pokemon on their team.`;
    }
}

class Menu {
    constructor() {
        this.partys = [];
        this.selectedParty = null;
    }

    start() {
        let select = this.showMainMenu();
        while (select != 0) {
            switch(select) {
                case '1' :
                    this.createParty();
                    break;
                case '2':
                    this.viewParty();
                    break;
                case '3':
                    this.deleteParty();
                    break;
                case'4':
                    this.displayAllParties();
                    break;
                default:
                    select = 0;
            }

            select = this.showMainMenu();
        }

        alert('Goodbye!');
    }

    showMainMenu() {
        return prompt(`
        0) Exit
        1) Create New Party
        2) View Party
        3) Delete Party
        4) Display All Parties
        `)
    }

    showPartyMenu(partyInfo) {
        return prompt(`
        0) Back
        1) Add Pokemon to Party
        2) Delete Pokemon from Party
        
        ---

        ${partyInfo}
        `);

    }

    displayAllParties() {
        let partyString = '';
        for(let i = 0; i < this.partys.length; i++) {
            partyString += i + ') ' + this.partys[i].name + '\n';
        }
        alert(partyString);
    }

    createParty() {
        let name = prompt('Enter name for new party:');
        this.partys.push(new Party(name));
    }

    viewParty() {
        let index = prompt('Enter the index of the party you wish to view:');
        if (index > -1 && index < this.partys.length) {
          this.selectedParty = this.partys[index];
          let description = 'Party Name: ' + this.selectedParty.name + '\n'; 

          description += ' ' + this.selectedParty.describe() + '\n ';

          for (let i = 0; i < this.selectedParty.pokemons.length; i++) {
            description += i + ') ' + this.selectedParty.pokemons[i].describe() + '\n';
        }

        let selection = this.showPartyMenu(description);
        switch(selection) {
            case '1':
                this.addMon();
                break;
            case '2':
                this.deletePokmeon();
            }
        }
    }

    deleteParty() {
        let index = prompt('Enter the index of the party you wish to delete: ');
        if (index > -1 && index < this.partys.length) {
            this.partys.splice(index, 1);
        }
    }

    addMon() {
        let name = prompt('Enter name of the Pokemon to Add to Your Party: ');
        let dexNumber = prompt('Enter Pokedex Number for the Pokemon: ');
        this.selectedParty.pokemons.push(new Pokemon(name, dexNumber));
    }
    deletePokemon() {
        let index = prompt('Enter the index of the Pokemon you wish to delete: ');
        if (index > -1 && index < this.selectedParty.pokemons.length); {
            this.selectedParty.pokemons.splice(index, 1);
        }
    }
}



let menu = new Menu();
menu.start();