export class CharacterProfile {
	public activeEngrave: ItemObject[];
	public characterName: string;
	public server: string;
	public guild: string;
	public characterClass: string;
	public characterTitle: string;
	public level: string;
	public itemLevel: string;
	public expeditionLevel: string;
	public duelLevel: string;
	public possessionLevel: string;

	public combatPower: string;
	public healthPoint: string;

	public criticalScore: string;
	public specializationScore: string;
	public suppressScore: string;
	public speedScore: string;
	public patienceScore: string;
	public skilledScore: string;

	public intelligence: string;
	public courage: string;
	public charming: string;
	public kindness: string;

	public island: string;
	public star: string;
	public heart: string;
	public picture: string;
	public mokoko: string;
	public expedition: string;
	public ignea: string;
	public leaf: string;

	public hat: ItemObject;
	public top: ItemObject;
	public bottom: ItemObject;
	public gloves: ItemObject;
	public shoulder: ItemObject;
	public weapon: ItemObject;
	public necklace: ItemObject;
	public earringOne: ItemObject;
	public earringTwo: ItemObject;
	public ringOne: ItemObject;
	public ringTwo: ItemObject;
	public abilityStone: ItemObject;
	public abilityStoneStat: AbilityStoneStat;
	public bracelet: ItemObject;

	public engravement: EquippedEngraves;
}

export class EquippedEngraves {
	first: ItemObject;
	second: ItemObject;
}

export class ItemObject {
	constructor(icon: string, name: string, stat: string = null, tier: string = null) {
		this.icon = icon;
		this.name = name;
		this.stat = stat;
		this.tier = tier;
	}
	icon: string;
	name: string;
	stat: string;
	tier: string;
}

export class AbilityStoneStat {
	buffFirst: string;
	buffSecond: string;
	debuff: string;
}
