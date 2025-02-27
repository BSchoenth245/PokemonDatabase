const PokemonDatabase = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Mickey2025!",
    database: "pokemondatabase"
});

class tblMoves {
    constructor(strMoveID, strMoveName, strDamage, strDescription, intNumEnergy){
        this.moveID = strMoveID;
        this.moveName = strMoveName;
        this.damage = strDamage;
        this.descript = strDescription;
        this.numEnergy = intNumEnergy;
    }
}

class tblPokemon {
    constructor(strPkmID, strPkmName, strPkmType, intPkmHP, strAbilityID, strMove1ID, strMove2ID, intNumCopies, boolIsEvo){
        this.PokemonID = strPkmID;
        this.pkmName = strPkmName;
        this.pkmType = strPkmType;
        this.pkmHP = intPkmHP;
        this.abilityID = strAbilityID;
        this.move1ID = strMove1ID;
        this.move2ID = strMove2ID;
        this.numCopies = intNumCopies;
        this.isEvo = boolIsEvo;
    }
}

class tblAbility {
    constructor(strAbilityID, strAbilityName, strDescription){
        this.abilityID = strAbilityID;
        this.abilName = strAbilityName;
        this.descript = strDescription;
    }
}