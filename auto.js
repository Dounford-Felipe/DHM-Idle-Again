// ==UserScript==
// @name         DHM - Idle Again
// @namespace    http://tampermonkey.net/
// @version      1.5.4.9
// @description  Automate most of DHM features
// @author       Felipe Dounford
// @require      https://greasyfork.org/scripts/461221-hack-timer-js-by-turuslan/code/Hack%20Timerjs%20By%20Turuslan.js?version=1159560
// @require      https://greasyfork.org/scripts/478182-pubnub-js/code/PubNub%20JS.js?version=1269788
// @require      https://update.greasyfork.org/scripts/482500/1297545/Sortable%20JS.js
// @require      https://cdn.jsdelivr.net/npm/emoji-mart@5.5.2/dist/browser.js
// @match        https://dhm.idle-pixel.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// @license      MIT
// @downloadURL https://update.greasyfork.org/scripts/475537/DHM%20-%20Idle%20Again.user.js
// @updateURL https://update.greasyfork.org/scripts/475537/DHM%20-%20Idle%20Again.meta.js
// ==/UserScript==

const mineralArray = [
	'limeQuartzMineralUnidentified','fluoriteMineralUnidentified','topazMineralUnidentified','blueMarbleMineralUnidentified','sulferMineralUnidentified','purpleQuartzMineralUnidentified','limoniteMineralUnidentified','crystalPrismeMineralUnidentified','clearMarbleMineralUnidentified','denseMarbleMineralUnidentified','jadeMineralUnidentified','opalMineralUnidentified','amethystMineralUnidentified','tashmarineMineralUnidentified','tanzaniteMineralUnidentified','seaCrystalMineralUnidentified','amberMineralUnidentified','smoothPearlMineralUnidentified'
];
const foundryLava = {
	'logs': 1,
	'oakLogs': 2,
	'willowLogs': 3,
	'mapleLogs': 4,
	'redwoodLogs': 5,
	'pineLogs': 6,
	'hauntedLogs': 7,
	'jungleLogs': 8,
	'lavaLogs': 9,
	'goldLogs': 10,
	'magicLogs': 11
};
const bonesArray = [
	"bones","ashes","iceBones","zombieBones","bloodBones"
];
const scriptAreaEnergy = {
	fields: 50,
	forests: 250,
	caves: 1000,
	volcano: 5000,
	northernFields: 8000,
	hauntedMansion: 20000,
	desert: 50000,
	ocean: 120000,
	jungle: 200000,
	dungeonEntrance: 500000,
	dungeon: 1000000,
	castle: 3000000,
	cemetery: 7000000,
	factory: 10000000,
	hauntedWoods: 14000000,
	deepOcean: 20000000
};
const scriptAreaTimer = {
	fields: 900,
	forests: 1800,
	caves: 3600,
	volcano: 5400,
	northernFields: 3600 * 2,
	hauntedMansion: 3600 * 3,
	desert: 3600 * 4 + 1800,
	ocean: 3600 * 6,
	jungle: 3600 * 8,
	dungeonEntrance: 3600 * 10,
	dungeon: 3600 * 12,
	castle: 3600 * 15,
	cemetery: 3600 * 16,
	factory: 3600 * 18,
	hauntedWoods: 3600 * 20,
	deepOcean: 3600 * 23
};
const vanillaEnemies = {
	"fields": ["chicken", "rat", "bee", "chickenGroup"],
	"forests": ["snake", "ent", "thief"],
	"caves": ["bear", "bat", "skeleton"],
	"volcano": ["lavaSnake", "fireHawk", "fireMage", "fireHawkGroup"],
	"northernFields": ["iceHawk", "frozenEnt", "golem", "iceHawkGroup"],
	"hauntedMansion": ["ghost", "skeletonGhost", "reaper"],
	"desert": ["desertLizard2", "scorpion", "lizard"],
	"ocean": ["squid", "oceanShark", "pufferFish"],
	"jungle": ["gorilla", "elephant", "tribe"],
	"dungeonEntrance": ["gargoyle", "poisonTribe", "statue"],
	"dungeon": ["skeletonMonks", "darkMage", "skeletonPrisoner"],
	"castle": ["castleKnight", "dragon", "castleMage"],
	"cemetery": ["angel", "zombie", "babySkeleton"],
	"factory": ["robotArcher", "robotMage", "robotWheelie"],
	"hauntedWoods": ["reaper2", "skeletonGhost2", "ghostPack"],
	"deepOcean": ["poisonSquid", "tridentSoldier", "piranhas"]
}
const artifactArray = [
	'brokenSwordArtifact', 'cannonBallsArtifact', 'oldCannonArtifact', 'strangeLeafArtifact', 'ancientLogArtifact', 'rainbowFlowerArtifact', 'clayVaseArtifact', 'batWingArtifact', 'skullArtifact', 'sulferArtifact', 'volcanicRockArtifact', 'volcanicSmokeArtifact', 'iceArtifact', 'snowballsArtifact', 'frozenHeadArtifact', 'spiderLegsArtifact', 'broomArtifact', 'hauntedSkullArtifact', 'scorpionsTailArtifact', 'mummyArtifact', 'egyptKingArtifact', 'fossilArtifact', 'scubaArtifact', 'sharksJawArtifact', 'strangerLeafArtifact', 'mossyRockArtifact', 'monkeySkullArtifact', 'strangeJungleLeafArtifact', 'inukshukArtifact', 'hauntedMonkeySkullArtifact', 'dungeonBrickArtifact', 'candleStickArtifact', 'skeletonKingsHeadArtifact', 'lampArtifact', 'brokenShieldArtifact', 'dragonSkullArtifact', 'tombStoneArtifact', 'zombieHandArtifact', 'ancientCrossArtifact', 'cogWheelArtifact', 'robotHelmetArtifact', 'brokenTimeMachineArtifact', 'hauntedLeavesArtifact', 'eyeballArtifact', 'ghostScanPotionArtifact', 'deepFossilArtifact', 'starfishArtifact', 'ancientScubaArtifact'
];
const bagsArray = [
	'fieldsLoot', 'forestsLoot', 'cavesLoot', 'volcanoLoot', 'northernFieldsLoot', 'hauntedMansionLoot', 'desertLoot', 'oceanLoot', 'jungleLoot', 'dungeonEntranceLoot', 'dungeonLoot', 'castleLoot', 'cemeteryLoot', 'factoryLoot', 'hauntedWoodsLoot', 'deepOceanLoot', 'shinyFieldsLoot', 'shinyForestsLoot', 'shinyCavesLoot', 'shinyVolcanoLoot', 'shinyNorthernFieldsLoot', 'shinyHauntedMansionLoot', 'shinyDesertLoot', 'shinyOceanLoot', 'shinyJungleLoot', 'shinyDungeonEntranceLoot', 'shinyDungeonLoot', 'shinyCastleLoot', 'shinyCemeteryLoot', 'shinyFactoryLoot', 'shinyHauntedWoodsLoot', 'shinyDeepOceanLoot'
];
const boatsArray = [
	"rowBoat","canoeBoat","steamBoat","trawler"
];
const baitsUsed = [
	5,25,250,500
];
let scriptWaitTeleport = true;
const melee = [
	'rustySword', 'stinger', 'ironDagger', 'skeletonSword', 'enchantedSkeletonSword', 'scythe', 'enchantedScythe', 'poisonSpear', 'superPoisonSpear', 'mace', 'trident', 'superPoisonTrident', 'silverScimitar'
];
const ranged = [
	"bow", "superBow", "enchantedSuperBow"
];
let pubnub = {};
const blockedHTML = [
	'<iframe', '<button', '<script', '<html', '<link', '<div', '<footer', 'onclick', '<object', '<embed', '<form', '<meta', 'onmouseover', 'onmouseout', 'onmousemove', '<input', '<applet', 'javascript:'
];
const ding = new Audio("https://github.com/Dounford-Felipe/DHM-Audio-Alerts/raw/main/ding.wav");
let oldWeapon;
let bestWeapon;
let bestBow;
let bestPoison;
let bestMage;
const cookableFood = [
	'rawSardine', 'rawChicken', 'rawTuna', 'rawSnail', 'rawPiranha', 'rawSwordfish', 'rawSeaTurtle', 'rawLobster', 'rawEel', 'rawShark', 'rawCrab', 'rawMantaRay', 'rawBloodChicken', 'rawWhale', 'rawRainbowFish'
];
(function () {
    'use strict';
document.head.insertAdjacentHTML('beforeend', '<script src="https://cdn.pubnub.com/sdk/javascript/pubnub.7.4.1.js">');
const IdleAgain = {
	//Configs
	scriptVars: {
		"toggleGlobal": false,
		"toggleMap": true,
		"toggleGeodeOpen": false,
		"toggleMineralIdentify": false,
		"toggleNecklaceCharge": false,
		"toggleTrain": false,
		"toggleRocket": false,
		"toggleSmelting": true,
		"toggleRefinary": false,
		"toggleCharcoal": false,
		"toggleWoodcutting": true,
		"toggleFarming": false,
		"toggleBones": false,
		"toggleFertilize": false,
		"toggleDrink": false,
		"toggleTreeUpgrade": false,
		"toggleBrew": false,
		"toggleExplore": false,
		"toggleFight": false,
		"toggleResetFight": false,
		"toggleMonsterFind": false,
		"toggleSpell": false,
		"toggleCombatPotion": false,
		"toggleHeal": true,
		"toggleShiny": false,
		"toggleCombatSwap": true,
		"toggleBM": false,
		"toggleCousin": false,
		"toggleBags": false,
		"toggleFieldsBags": false,
		"toggleStatue": false,
		"toggleArtifact": false,
		"toggleBoat": true,
		"toggleEvent": true,
		"scriptTrainAmount": 1,
		"scriptRocket": "moon",
		"scriptSmeltingOre": "copper",
		"scriptRefinaryBar": "gold",
		"scriptFoundryWood": "cheapest",
		"scriptTreeIgnore": {
			"tree": false,
			"oakTree": false,
			"willowTree": false,
			"mapleTree": false,
			"redwoodTree": false,
			"pineTree": false,
			"hauntedTree": false,
			"jungleTree": true,
			"lavaTree": false,
			"goldTree": true,
			"magicTree": false,
			"appleTree": false,
			"cactusTree": false,
			"bananaTree": false,
			"palmTree": false,
			"pineappleTree": true,
			"starfruitTree": false,
			"none": true
		},
		"scriptBonesIgnore": {
			"bones": true,
			"ashes": false,
			"iceBones": true,
			"zombieBones": true,
			"bloodBones": true,
			"fishBones": true
		},
		"scriptFertilize": {
			"redMushroomSeeds": false,
			"dottedGreenLeafSeeds": false,
			"greenLeafSeeds": false,
			"limeLeafSeeds": false,
			"goldLeafSeeds": false,
			"crystalLeafSeeds": false,
			"stripedGreenLeafSeeds": false,
			"stripedGoldLeafSeeds": false,
			"stripedCrystalLeafSeeds": false
		},
		"scriptTreeUpgrade": {
			"tree": false,
			"oakTree": false,
			"willowTree": false,
			"mapleTree": false,
			"redwoodTree": false,
			"pineTree": false,
			"hauntedTree": false,
			"jungleTree": true,
			"lavaTree": false,
			"goldTree": true,
			"magicTree": false,
			"appleTree": false,
			"cactusTree": false,
			"bananaTree": false,
			"palmTree": false,
			"pineappleTree": true,
			"starfruitTree": false,
			"none": false
		},
		"scriptStrength": {
			"fields": false,
			"forests": false,
			"caves": false,
			"volcano": false,
			"northernFields": false,
			"hauntedMansion": false,
			"desert": false,
			"ocean": false,
			"jungle": false,
			"dungeonEntrance": false,
			"dungeon": false,
			"castle": false,
			"cemetery": true,
			"factory": true,
			"hauntedWoods": true,
			"deepOcean": true
		},
		"scriptArea": "fields",
		"scriptResetArea": {
			"fields": false,
			"forests": false,
			"caves": false,
			"volcano": false,
			"northernFields": false,
			"hauntedMansion": false,
			"desert": false,
			"ocean": false,
			"jungle": false,
			"dungeonEntrance": false,
			"dungeon": false,
			"castle": false,
			"cemetery": false,
			"factory": false,
			"hauntedWoods": false,
			"deepOcean": false
		},
		"scriptMonster": "chicken",
		"scriptCousinArea": "fields",
		"scriptBoatSend": {
			"rowBoat": true,
			"canoeBoat": true,
			"sailBoat": true,
			"highWind": true,
			"steamBoat": true,
			"trawler": true
		},
		"chatAutoScroll": true
	},

	logTime(extraInfo) {
		const date = new Date();
		const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		console.log('[' + hour + ':' + min + '] ' + extraInfo);
	},

	autoEvent() {
		if (eventName !== 'none') {
			if ((eventStatus == 'active' || eventStatus == 'fullActive') && eventLastClicked == 'none') {
				sendBytes('CLICKS_EVENT');
			}
			if (eventStatus == 'fullActive') {
				IdleAgain.eventGlowing();
			}
		}
	},
	
	eventGlowing() {
		if (eventStatus == 'fullActive') {
			sendBytes('CLICKS_EVENT');
			setTimeout(IdleAgain.eventGlowing,300)
		}
	},

	autoMap() {
		if (treasureMap !== 0) {
			switch (treasureMap) {
				case 1:
					if (shrimp > 0) {
						sendBytes('CONSUME=shrimp~1');
					}
					break;
				case 2:
					clicksItem('timeMachine');
					break
				case 3:
					if (smeltingCurrentOreType == 'none') {
						sendBytes("SMELT=gold~1");
					}
					break
				case 4:
					if (furnaceSpeedPotion > 0) {
						sendBytes('DRINK=furnaceSpeedPotion');
					}
					break
				case 5:
					if (dottedGreenLeaf > 0) {
						sendBytes('SELL=dottedGreenLeaf~1');
					}
					break
				case 6:
					viewTreesChopped();	
					break
				case 7:
					clicksItem('bloodCrystals');
					break
			}
		}
		if (greenTreasureMap !== 0) {
			switch (greenTreasureMap) {
				case 1:
					if (iceBones > 0) {
						sendBytes('ADD_BONEMEAL=iceBones~1');
					}
					break;
				case 2:
					if ((charcoalFoundryCurrentOreType == 0 || charcoalFoundryCurrentOreType == 'none') && lava > 0) {
						sendBytes('CHARCOAL_FOUNDRY=logs~1');
					}
					break;
				case 3:
					let oldMachineOn = crushersOn;
					sendBytes("TURN_ON=crushers~4");
					sendBytes("TURN_ON=crushers~" + oldMachineOn);
					break;
				case 4:
					if (goldLeaf > 0) {
						sendBytes('SELL=goldLeaf~1');
					}
					break;
				case 5:
					clicksItem('titaniumMetalDetector');
					break;
				case 6:
					navigate('bloodShop-enrichedPotions');
					sendBytes('VISITS_ENRICHED_POTIONS_SHOP');
					break;
				case 7:
					clicksItem('wells');
					break;
			}
		}
	},

	autoGeodeOpen() {
		for (let i = 1; i < 7; i++) {
			if (window["geode" + i] > 0) {
				sendBytes('OPEN_MULTIPLE_GEODE=geode1~' + window["geode" + i]);
				closeSmittysDialogue('dialogue-confirm');
			}
		}
	},

	autoIdentify() {
		mineralArray.forEach((mineral) => {
			if (typeof window[mineral] !== 'undefined' && window[mineral] > 0) {
				clicksItem(mineral);
				closeSmittysDialogue('dialogue-confirm');
			}
		})
	},

	autoNecklaceCharge() {
		changeMineralNecklace();
	},

	autoTrain() {
		if (train > 0 && trainTimer < 2) {
			if (oil >= 500000 * IdleAgain.scriptVars.scriptTrainAmount) {
				sendBytes("MANAGE_TRAIN=0");
				sendBytes('COLLECT_TRAIN_FORCE');
				sendBytes('MANAGE_TRAIN=' + IdleAgain.scriptVars.scriptTrainAmount);
				closeSmittysDialogue('dialogue-confirm2');
				this.logTime("Train sent");
			} else if (trainTimer == 1) {
				sendBytes("MANAGE_TRAIN=0");
				sendBytes('COLLECT_TRAIN_FORCE');
				closeSmittysDialogue('dialogue-confirm2');
				this.logTime("Train collected");
			}
		}
	},

	autoRocket() {
		if (rocketKm == 1) {
			sendBytes('MANAGE_ROCKET=collect2');
			closeSmittysDialogue('dialogue-confirm');
			this.logTime("Rocket collected");
		} else if (rocket == 1 && rocketKm == 0) {
			if (IdleAgain.scriptVars.scriptRocket == 'Moon' && oil >= 4000000) {
				sendBytes('MANAGE_ROCKET=send');
				this.logTime("Rocket sent to " + this.scriptVars.scriptRocket)
			} else if (IdleAgain.scriptVars.scriptRocket == 'Mars' && oil >= 15000000) {
				sendBytes('MANAGE_ROCKET=send_mars');
				this.logTime("Rocket sent to " + this.scriptVars.scriptRocket)
			} else if (IdleAgain.scriptVars.scriptRocket == 'Sun' && oil >= 30000000 && charcoal >= 100) {
				sendBytes('MANAGE_ROCKET=send_sun');
				this.logTime("Rocket sent to " + this.scriptVars.scriptRocket)
			}
		}
	},

	autoSmelt() {
		if (smeltingCurrentOreType == 'none') {
			let oreItems = document.getElementById("sortableOres").getElementsByTagName("li");

			for (let i = 0; i < oreItems.length; i++) {
				let minimumOre = oreItems[i].querySelector(".oreMinimum").value;
				let selectedOre = oreItems[i].getAttribute("value");
				if (window[selectedOre] >= minimumOre && (selectedOre !== 'promethium' || lava >= minimumOre) && (selectedOre !== 'titanium' || charcoal >= minimumOre) && (selectedOre !== 'ancientOre' || plasma >= minimumOre)) {
					chooseOreForFurnace(selectedOre);
					startSmelting();
					closeSmittysDialogue('dialogue-furnace2');
					IdleAgain.logTime("Smelt " + selectedOre);
					break;
				}
			}
		}
	},

	autoRefine() {
		if (barRefineryTimer < 2) {
			if (IdleAgain.scriptVars.scriptRefinaryBar == 'gold' && oil > 500000 && goldBars > 99) {
				clicksItem('goldBarRefinery');
				sendBytes('REFINE_GOLD_BARS=goldBars');
				closeSmittysDialogue('dialogue-barRefinery');
				closeSmittysDialogue('dialogue-confirm');
				this.logTime("Refinary Gold");

			} else if (IdleAgain.scriptVars.scriptRefinaryBar == 'promethium' && oil > 2000000 && promethiumBars > 99) {
				clicksItem('goldBarRefinery');
				sendBytes('REFINE_GOLD_BARS=promethiumBars');
				closeSmittysDialogue('dialogue-barRefinery');
				closeSmittysDialogue('dialogue-confirm');
				this.logTime("Refinary Promethium");
			}
		}
	},

	autoFoundry() {
		if (charcoalFoundryCurrentOreType == 0 || charcoalFoundryCurrentOreType == 'none') {
			let scriptFoundryWoodLocal = IdleAgain.scriptVars.scriptFoundryWood;
			if (scriptFoundryWoodLocal === 'cheapest') {
				scriptFoundryWoodLocal = logs > 100 ? 'logs' :
					oakLogs > 100 ? 'oakLogs' :
					willowLogs > 100 ? 'willowLogs' :
					mapleLogs > 100 ? 'mapleLogs' :
					redwoodLogs > 100 ? 'redwoodLogs' :
					pineLogs > 100 ? 'pineLogs' :
					hauntedLogs > 100 ? 'hauntedLogs' :
					jungleLogs > 100 ? 'jungleLogs' :
					lavaLogs > 100 ? 'lavaLogs' :
					goldLogs > 100 ? 'goldLogs' :
					magicLogs > 100 ? 'magicLogs' :
					'none';
			}
			
			if (scriptFoundryWoodLocal !== 'none' && lava >= foundryLava[scriptFoundryWoodLocal] * 100 && window[scriptFoundryWoodLocal] > 99) {
				sendBytes('CHARCOAL_FOUNDRY=' + scriptFoundryWoodLocal + '~' + 100);
				closeSmittysDialogue('dialogue-confirm');
				IdleAgain.logTime("Foundry " + scriptFoundryWoodLocal)
			}
		}
	},

	autoLumber() {
		for (let i = 1; i < 7; i++) {
			if (window["treeTimer" + i] === 1 && IdleAgain.scriptVars.scriptTreeIgnore[window["tree" + i]] === false) {
				sendBytes('CHOP_TREE=' + i);
			}
		}
	},

	autoPlant() {
		if (farmTimer1 < 2 || farmTimer2 < 2 || (farmTimer3 < 2 && farmUnlocked3 == 1) || (farmTimer4 < 2 && farmUnlocked4 == 1) || (farmTimer5 < 2 && farmUnlocked5 == 1) || (farmTimer6 < 2 && farmUnlocked6 == 1)) {
			let seedItems = document.getElementById("sortableSeeds").getElementsByTagName("li");

			for (let i = 0; i < seedItems.length; i++) {
				let seedCheckbox = seedItems[i].querySelector(".seed-checkbox");
				let selectedSeed = seedItems[i].getAttribute("value");
				if (seedCheckbox.checked && window[selectedSeed] >= 1 && bonemeal >= seedsArrayGlobal[selectedSeed].bonemealCost) {
					setBobsAutoReplantSeed(selectedSeed);
					closeSmittysDialogue("dialogue-bob");
					sendBytes("HARVEST_AND_PLANT_ALL");
					setTimeout(function() {
						closeSmittysDialogue('dialogue-confirm');
					}, 300);
					break;
				}
			}
		}
	},

	autoBones() {
		bonesArray.forEach((bone) => {
			if (window[bone] > 0 && IdleAgain.scriptVars.scriptBonesIgnore[bone] === false) {
				sendBytes("ADD_BONEMEAL=" + bone + "~" + window[bone]);
			}
		})
		if (fishBones > 9 && IdleAgain.scriptVars.scriptBonesIgnore.fishBones === false) {
			sendBytes('ADD_BONEMEAL=fishBones~' + (Math.floor(fishBones / 10)) * 10);
		}
	},

	autoFertilize() {
		if (fertilizeSoilPotion >= 1) {
			for (let i = 1; i < 7; i++) {
				if (window["fertilizeSoil" + i] == 0 && IdleAgain.scriptVars.scriptFertilize[window["farm" + i]]) {
					sendBytes('PLANT=fertilizeSoilPotion~' + i);
				}
			}
		}
	},

	getBonemealNeeded() {
		let bonemealNeeded = 0;
		for (let i = 0; i < seedsArrayGlobal.length; i++) {
			bonemealNeeded += window[seedsArrayGlobal[i].itemName] ? seedsArrayGlobal[i].bonemealCost * window[seedsArrayGlobal[i].itemName] : 0;
		}
		document.getElementById('bonemealNeeded').innerText = bonemealNeeded.toLocaleString('en-us');
	},

	getTimeNeeded() {
		let timeNeeded = 0;
		let plotsUnlocked = farmUnlocked6 == 1 ? 6 : farmUnlocked5 == 1 ? 5 : farmUnlocked4 == 1 ? 4 : farmUnlocked3 == 1 ? 3 : 2;
		for (let i = 0; i < seedsArrayGlobal.length; i++) {
			timeNeeded += window[seedsArrayGlobal[i].itemName] ? seedsArrayGlobal[i].growtime * window[seedsArrayGlobal[i].itemName] : 0;
		}
		// Divided by 10 because for the speed potion
		document.getElementById('growTimeNeeded').innerText = formatTime(timeNeeded / 10 / plotsUnlocked);
	},

	autoDrink() {
		let potionItems = document.getElementById("sortablePotions").getElementsByTagName("li");

		for (let i = 0; i < potionItems.length; i++) {
			let drinkCheckbox = potionItems[i].querySelector(".drink-checkbox");
			let selectedPotion = potionItems[i].getAttribute("value");

			if (drinkCheckbox.checked && window[selectedPotion + 'Timer'] == 0 && window[selectedPotion] > getMaxPotionsToDrinkEffeciantly(selectedPotion)) {
				sendBytes('MULTI_DRINK=' + selectedPotion + "~" + getMaxPotionsToDrinkEffeciantly(selectedPotion));
				setTimeout(function() {
					closeSmittysDialogue('dialogue-confirm');
				}, 300);
			}
		}
	},

	autoTreeUpgrade() {
		if (woodcuttingUpgradePotionCooldown == 0 && woodcuttingUpgradePotion >= 1) {
			for (let i = 1; i < 7; i++) {
				if (IdleAgain.scriptVars.scriptTreeUpgrade[window["tree" + i]] && window["woodcuttingUpgradePotionUsed" + i] == 0) {
					this.logTime(window["tree" + i] + " upgraded")
					sendBytes('POTION_UPGRADE_TREE=' + i);
				}
			}
		}
	},

	autoBrew() {
		let potionItems = document.getElementById("sortablePotions").getElementsByTagName("li");

		for (let i = 0; i < potionItems.length; i++) {
			let drinkCheckbox = potionItems[i].querySelector(".drink-checkbox");
			let brewCheckbox = potionItems[i].querySelector(".brew-checkbox");
			let selectedPotion = potionItems[i].getAttribute("value");

			if (brewCheckbox.checked && drinkCheckbox.checked && window[selectedPotion] < getMaxPotionsToDrinkEffeciantly(selectedPotion)) {
				sendBytes('BREW=' + selectedPotion + '~' + getMaxPotionsToDrinkEffeciantly(selectedPotion));
				setTimeout(function() {
					closeSmittysDialogue('dialogue-confirm');
				}, 300);
			}
		}
	},

	autoExplore() {
		if (explorerCooldown == 0) {
			let scriptAreaLocal = IdleAgain.scriptVars.scriptArea;
			if (scriptAreaLocal == 'dungeon' && dungeonKey == 0) {
				scriptAreaLocal = 'dungeonEntrance';
			}
			let areaCost = scriptAreaEnergy[scriptAreaLocal];
			if (totalDonations >= 32) {
				areaCost = scriptAreaEnergy[scriptAreaLocal] * 0.8;
			}
			if (energy < areaCost) {
				scriptAreaLocal = 'fields';
			}
			sendBytes('EXPLORE=' + scriptAreaLocal);
			this.logTime("Exploring " + scriptAreaLocal);
			if (IdleAgain.scriptVars.toggleShiny == true || IdleAgain.scriptVars.toggleMonsterFind == true) {
				scriptWaitTeleport = true;
			} else {
				scriptWaitTeleport = false;
			}
			bestWeapon = typeof silverScimitar !== 'undefined' ? 'silverScimitar' : typeof superPoisonTrident !== 'undefined' ? 'superPoisonTrident' : typeof trident !== 'undefined' ? 'trident' : typeof mace !== 'undefined' ? 'mace' : typeof scythe !== 'undefined' ? 'scythe' : 'skeletonSword';
			bestBow = typeof enhcantedSuperBow !== "undefined" ? "enhcantedSuperBow" : typeof superBow !== "undefined" ? "superBow" : "bow";
			bestPoison = typeof superPoisonTrident !== 'undefined' ? 'superPoisonTrident' : superPoisonSpear > 0 ? 'superPoisonSpear' : typeof poisonSpear !== 'undefined' ? 'poisonSpear' : '';
			bestMage = (bloodReaperTop > 0 && bloodReaperBottom > 0 && bloodReaperHood > 0) ? 'bloodReaper' : (darkMageTop > 0 && darkMageBottom > 0 && darkMageHood > 0) ? 'darkMage' : '';
		}
	},

	autoFight() {
		if (fightDone === 0 && exploringArea !== 'none') {
			let teleportCooldown = (teleportSpellUpgraded === 1) ? 300 : 900;
			scriptWaitTeleport = (explorerCooldown > teleportCooldown + 10) ? true : false;
			if (scriptWaitTeleport === false || (scriptWaitTeleport && teleportSpellCooldown === 0)) {
				if (infectedTimer > 0) {
					sendBytes('DRINK=cureInfectionPotion');
				}
				sendBytes('LOOK_FOR_FIGHT');
				IdleAgain.autoPoison();
				setTimeout(function() {
					if (monsterName == 'pufferFish') {
						clicksItem('bow');
						clicksItem('superBow');
						clicksItem('enchantedSuperBow');
					}
				}, 3000);
			}
			if (IdleAgain.scriptVars.toggleShiny == false && IdleAgain.scriptVars.toggleMonsterFind == false) {
				scriptWaitTeleport = false;
			}
		}
	},

	autoPoison() {
		if (bestPoison !== '' && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) {
			clicksItem(bestPoison);
			const poisonInterval = setInterval(function() {
				if (poisonEnemyTimer == 1) {
					clicksItem(presetWeapon1);
					clearInterval(poisonInterval);
				}
			}, 2000);
		}
	},

	autoReset() {
		if (fightDone == 1 && resetFightingPotionUsed == 0 && exploringArea !== 'none' && monsterName == 'none' && resetFightingPotion >= 1 ) {
			if (IdleAgain.scriptVars.scriptResetArea[exploringArea]) {
				sendBytes('DRINK=resetFightingPotion');
			}
		}
	},

	autoMonsterHunt() {
		//Never teleport out if bird feed is equiped or if the monster is gem goblin/shiny
		if (
			monsterName !== 'none' 
			&& exploringArea !== 'none'
			&& !shield.includes('Feed') 
			&& monsterName !== 'gemGoblin' 
			&& monsterName !== 'bloodGemGoblin' 
			&& shinyMonster == 0
		) {
			if (IdleAgain.scriptVars.toggleMonsterFind) {
				const monster = IdleAgain.scriptVars.scriptMonster.toLocaleLowerCase();

				//Avoid fighting Desert Lizard and skeleton ghost
				const isLizard = monster === "lizard" && (monsterName === 'lizard' || monsterName === 'bloodLizard');
				const isGhost = monster === "ghost" && monsterName == "ghost";
				const isHunted = monster !== "ghost" && monster !== "lizard" && monsterName.toLocaleLowerCase().includes(monster)

				if (isLizard || isGhost || isHunted) {
					return;
				}
			}
			sendBytes('CAST_COMBAT_SPELL=teleportSpell');
		}

		let teleportCooldown = (teleportSpellUpgraded == 1) ? 300 : 900;
		scriptWaitTeleport = (explorerCooldown > teleportCooldown + 10) ? true : false;
	},

	autoHeal() {
		if (monsterName !== "none" && heroHp == 0) {
			if (hpCombatPotionUsed == 0 && (hpCombatPotion >= 1 || hpCombatPotionFree == 1)) {
				sendBytes('DRINK_COMBAT_POTION=hpCombatPotion');
			} else if (superHpCombatPotionUsed == 0 && (superHpCombatPotion >= 1 || typeof superHpCombatPotionFree !== 'undefined')) {
				sendBytes('DRINK_COMBAT_POTION=superHpCombatPotion');
			} else if (teleportSpellCooldown == 0 && teleportSpell == 1) {
				sendBytes('CAST_COMBAT_SPELL=teleportSpell');
			}
		}
	},

	autoSpell() {
		if (monsterName !== 'none') {
			if (monsterName !== 'none' && fireSpell == 1 && fireSpellCooldown == 0) {
				if (bestMage != '') {
					let oldHead = head;
					let oldBody = body;
					let oldLeg = leg;
					clicksItem(bestMage + 'Hood');
					clicksItem(bestMage + 'Top');
					clicksItem(bestMage + 'Bottom');
					if (staff >= 1) {
						oldWeapon = (poisonEnemyTimer == 0 && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1;
						clicksItem('staff');
					}
					sendBytes('CAST_COMBAT_SPELL=fireSpell');
					if (monsterName == 'bloodGolem') {
						clicksItem(oldHead);
						clicksItem(oldBody);
						clicksItem(oldLeg);
					} else {
						clicksItem(presetHead1);
						clicksItem(presetBody1);
						clicksItem(presetLeg1);
					}
					clicksItem(oldWeapon);
					if (weapon == 'staff') {
						oldWeapon = (poisonEnemyTimer == 0 && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1;
						clicksItem(oldWeapon);
					}
				} else {
					sendBytes('CAST_COMBAT_SPELL=fireSpell');
				}
			}
			if (monsterName !== 'none' && reflectSpell == 1 && reflectSpellCooldown == 0) {
				if ((monsterName !== 'robotMage' || robotMageCharge !== 0) && (monsterName !== 'dragon' || dragonFireCharge == 4) && (!monsterName.includes('keletonCemetery') || monsterCharge !== 0) && reflectSpellEnemyTimer == 0) {
					sendBytes('CAST_COMBAT_SPELL=reflectSpell');
				}
			}
			if (monsterName !== 'none' && thunderStrikeSpell == 1 && thunderStrikeSpellCooldown == 0) {
				if (sandstormSpellUpgraded == 1) {
					if (sandstormSpellEnemyTimer > 0 || sandstormSpellCooldown > 10) {
						if (bestMage != '') {
							let oldHead = head;
							let oldBody = body;
							let oldLeg = leg;
							clicksItem(bestMage + 'Hood');
							clicksItem(bestMage + 'Top');
							clicksItem(bestMage + 'Bottom');
							if (staff >= 1) {
								oldWeapon = (poisonEnemyTimer == 0 && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1;
								clicksItem('staff');
							}
							sendBytes('CAST_COMBAT_SPELL=thunderStrikeSpell');
							if (monsterName == 'bloodGolem') {
								clicksItem(oldHead);
								clicksItem(oldBody);
								clicksItem(oldLeg);
							} else {
								clicksItem(presetHead1);
								clicksItem(presetBody1);
								clicksItem(presetLeg1);
							}
							clicksItem(oldWeapon);
							if (weapon == 'staff') {
								oldWeapon = (poisonEnemyTimer == 0 && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1;
								clicksItem(oldWeapon);
							}
						} else {
							sendBytes('CAST_COMBAT_SPELL=thunderStrikeSpell');
						}
					}
				} else {
					if (bestMage != '') {
						let oldHead = head;
						let oldBody = body;
						let oldLeg = leg;
						clicksItem(bestMage + 'Hood');
						clicksItem(bestMage + 'Top');
						clicksItem(bestMage + 'Bottom');
						if (staff >= 1) {
							oldWeapon = (poisonEnemyTimer == 0 && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1;
							clicksItem('staff');
						}
						sendBytes('CAST_COMBAT_SPELL=thunderStrikeSpell');
						if (monsterName == 'bloodGolem') {
							clicksItem(oldHead);
							clicksItem(oldBody);
							clicksItem(oldLeg);
						} else {
							clicksItem(presetHead1);
							clicksItem(presetBody1);
							clicksItem(presetLeg1);
						}
						clicksItem(oldWeapon);
						if (weapon == 'staff') {
							oldWeapon = (poisonEnemyTimer == 0 && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1;
							clicksItem(oldWeapon);
						}
					} else {
						sendBytes('CAST_COMBAT_SPELL=thunderStrikeSpell');
					}
				}
			}
			if (monsterName !== 'none' && lifeStealSpell == 1 && lifeStealSpellCooldown == 0 && heroHp <= 8) {
				sendBytes('CAST_COMBAT_SPELL=lifeStealSpell');
				if (ranged.includes(weapon)) {
					clicksItem(bestWeapon);
				}
			}
			if (monsterName !== 'none' && sandstormSpell == 1 && typeof sandstormSpellCooldown !== 'undefined') {
				if (sandstormSpellCooldown == 0) {
					if (bestMage != '') {
						let oldHead = head;
						let oldBody = body;
						let oldLeg = leg;
						clicksItem(bestMage + 'Hood');
						clicksItem(bestMage + 'Top');
						clicksItem(bestMage + 'Bottom');
						if (staff >= 1) {
							oldWeapon = (poisonEnemyTimer == 0 && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1;
							clicksItem('staff');
						}
						sendBytes('CAST_COMBAT_SPELL=sandstormSpell');
						if (monsterName == 'bloodGolem') {
							clicksItem(oldHead);
							clicksItem(oldBody);
							clicksItem(oldLeg);
						} else {
							clicksItem(presetHead1);
							clicksItem(presetBody1);
							clicksItem(presetLeg1);
						}
						clicksItem(oldWeapon);
						if (weapon == 'staff') {
							oldWeapon = (poisonEnemyTimer == 0 && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)) ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1;
							clicksItem(oldWeapon);
						}
					} else {
						sendBytes('CAST_COMBAT_SPELL=sandstormSpell');
					}
				}
			}
		}
	},

	autoCombatPot() {
		if (monsterName !== 'none') {
			if (freezeCombatPotionUsed == 0 && (freezeCombatPotionFree == 1 || freezeCombatPotion >= 1)) {
				setTimeout(function() {
					sendBytes('DRINK_COMBAT_POTION=freezeCombatPotion');
				}, 19000);
			}
			if (typeof ignoreDefenceCombatPotion !== 'undefined' && ignoreDefenceCombatPotionUsed == 0 && (ignoreDefenceCombatPotionFree == 1 || ignoreDefenceCombatPotion >= 1)) {
				sendBytes('DRINK_COMBAT_POTION=ignoreDefenceCombatPotion');
			}
			if (ghostScanCombatPotionUsed == 0 && (ghostScanCombatPotionFree == 1 || ghostScanCombatPotion >= 1)) {
				sendBytes('DRINK_COMBAT_POTION=ghostScanCombatPotion');
			}
			setTimeout(function() {
				if (monsterName !== "none" && strengthCombatPotionUsed == 0 && (strengthCombatPotionFree == 1 || (IdleAgain.scriptVars.scriptStrength[exploringArea] && strengthCombatPotion >= 1))) {
					sendBytes('DRINK_COMBAT_POTION=strengthCombatPotion');
				}
			}, 3000);
		}
	},

	autoCombatSwap() {
		if (typeof monsterName === 'string' && monsterName !== 'none') {
			if (monsterName.includes('castleMage') || monsterName.includes('robotMage') || monsterName.includes('pufferFish')) {
				if ((monsterName == 'castleMage2' || monsterName == 'robotMage2' || monsterName == 'pufferFish') && melee.includes(weapon)) {
					clicksItem(bestBow);
				} else if ((monsterName == 'castleMage3' || monsterName == 'robotMage') && ranged.includes(weapon)) {
					clicksItem(bestWeapon);
				}
			}
		}
	},

	autoBM() {
		if ($('#explore-select-area').children(':last').attr("onclick") == 'setAreaScreenByIndex(17);navigate("explore");' && bloodMoonTimer <= 60) {
			sendBytes('STARE_BLOOD_MOON');
			setTimeout(function() {
				closeSmittysDialogue('dialogue-confirm');
			}, 300);
		}
	},

	autoCousin() {
		if (typeof goblinExploringArea == 'undefined' || goblinExploringArea == 'none') {
			let scriptCousinAreaLocal = IdleAgain.scriptVars.scriptCousinArea;
			if (energy < scriptAreaEnergy[scriptCousinAreaLocal]) {
				scriptCousinAreaLocal = 'fields';
			}
			goblinCousin = 1;
			sendBytes('EXPLORE_GOBLIN=' + scriptCousinAreaLocal);
			setTimeout(function() {
				closeSmittysDialogue('dialogue-confirm');
			}, 300);
		}
	},

	autoBags() {
		for (let i = 0; i < bagsArray.length; i++) {
			let bag = bagsArray[i];
			if (window[bag] > 0) {
				sendBytes('OPEN_LOOT_MULTI=' + bag + '~' + window[bag]);
				closeSmittysDialogue('dialogue-confirm');
			}
		}
	},

	autoFieldsBags() {
		if (window.fieldsLoot > 0) {
			sendBytes('OPEN_LOOT_MULTI=fieldsLoot~' + window.fieldsLoot);
			closeSmittysDialogue('dialogue-confirm');
		}
		if (window.shinyFieldsLoot > 0) {
			sendBytes('OPEN_LOOT_MULTI=shinyFieldsLoot~' + window.shinyFieldsLoot);
			closeSmittysDialogue('dialogue-confirm');
		}
	},

	autoStatue() {
		for (let i = 0; i < exploringMetalDetectorStatuesGlobal.length; i++) {
			let statue = exploringMetalDetectorStatuesGlobal[i];
			if (window[statue] > 0) {
				sendBytes('SELL_ALL_STATUES');
				closeSmittysDialogue('dialogue-confirm');
				break;
			}
		}
	},

	autoArtifact() {
		for (let i = 0; i < artifactArray.length; i++) {
			let artifact = artifactArray[i];
			if (window[artifact] > 0) {
				sendBytes('CONVERT_ALL_ARTIFACTS');
				closeSmittysDialogue('dialogue-confirm');
				break;
			}
		}
	},

	cookAll() {
		for (let i = 0; i < cookableFood.length; i++) {
			if (window[cookableFood[i]] > 0) {
				sendBytes('COOK=' + cookableFood[i] + '~' + window[cookableFood[i]]);
			}
		}
	},

	getHeatNeeded() {
		let heatNeeded = 0;
		for (let i = 0; i < cookableFood.length; i++) {
			heatNeeded += foodArrayGlobal[cookableFood[i]].heatRequired * window[cookableFood[i]];
		}
		document.getElementById('heatNeeded').innerText = heatNeeded.toLocaleString('en-us');
	},

	autoBoat() {
		boatsArray.forEach((boat,index) => {
			if (window[boat + "Timer"] < 2 && window[boat] == 1 && IdleAgain.scriptVars.scriptBoatSend[boat]) {
				if (bait >= baitsUsed[index]) {
					sendBytes('CLICKS_BOAT=' + boat);
					closeSmittysDialogue('dialogue-confirm2');
				} else {
					clicksItem(boat);
					closeSmittysDialogue('dialogue-confirm2');
				}
			}
		})
		if (sailBoatTimer < 2 && sailBoat == 1 && IdleAgain.scriptVars.scriptBoatSend.sailBoat == true && (IdleAgain.scriptVars.scriptBoatSend.highWind == false || currentWind > 1)) {
			if (bait > 99) {
				sendBytes('CLICKS_BOAT=sailBoat');
				closeSmittysDialogue('dialogue-confirm2');
			} else {
				clicksItem('sailBoat');
				closeSmittysDialogue('dialogue-confirm2');
			}
		}
	},

	autoCityUnlock() {
		sendBytes('CLICKS_SHOP_VOTE=9');
		sendBytes("COLLECT_VOTES");
	},

	loadUserVars() {
		let key = `idleAgain-${username}`;
		let loadedVars;
		if (localStorage.getItem(key)) {
			loadedVars = JSON.parse(localStorage.getItem(key));
		}
		bestWeapon = typeof silverScimitar !== 'undefined' ? 'silverScimitar' : typeof superPoisonTrident !== 'undefined' ? 'superPoisonTrident' : typeof trident !== 'undefined' ? 'trident' : typeof mace !== 'undefined' ? 'mace' : typeof scythe !== 'undefined' ? 'scythe' : 'skeletonSword';
		bestBow = typeof enhcantedSuperBow !== "undefined" ? "enhcantedSuperBow" : typeof superBow !== "undefined" ? "superBow" : "bow";
		bestPoison = typeof superPoisonTrident !== 'undefined' ? 'superPoisonTrident' : superPoisonSpear > 0 ? 'superPoisonSpear' : typeof poisonSpear !== 'undefined' ? 'poisonSpear' : '';
		bestMage = (bloodReaperTop > 0 && bloodReaperBottom > 0 && bloodReaperHood > 0) ? 'bloodReaper' : (darkMageTop > 0 && darkMageBottom > 0 && darkMageHood > 0) ? 'darkMage' : '';
		//If a new config was added since the last save it will not break the save
		for (const key in this.scriptVars) {
			if (!(key in loadedVars)) {
			  loadedVars[key] = this.scriptVars[key];
			}
		}
		this.scriptVars = loadedVars;
	},

	autoChangeVar(variName, variValue, id) {
		let key = `idleAgain-${username}`;
		IdleAgain.scriptVars[variName] = variValue;
		localStorage.setItem(key, JSON.stringify(IdleAgain.scriptVars));
		if (typeof id !== 'undefined') {
			if (variValue) {
				document.getElementById(id).style.color = "green";
			} else {
				document.getElementById(id).style.color = "red";
			}
			console.log(id);
		}
		this.logTime(variName + ' ' + variValue + ' ' + id);
	},

	autoChangeObject(variName, variKey, variValue, id) {
		let key = `idleAgain-${username}`;
		IdleAgain.scriptVars[variName][variKey] = variValue;
		localStorage.setItem(key, JSON.stringify(IdleAgain.scriptVars));
		if (typeof id !== 'undefined') {
			if (variValue) {
				document.getElementById(id).style.color = "green";
			} else {
				document.getElementById(id).style.color = "red";
			}
		}
		this.logTime(variName + ' ' + variKey + ':' + variValue + ' ' + id);
	},

	toggleAutoLogin() {
		const autoLogin = JSON.parse(localStorage.getItem('autoLogin')) || false;
		localStorage.setItem('autoLogin', !autoLogin);
		if (!autoLogin) {
			document.getElementById('scriptLoginToggle').style.color = "green";
		} else {
			document.getElementById('scriptLoginToggle').style.color = "red";
		}
	},

	scriptAddTabs() {
		let style = document.createElement('style');
		style.innerHTML = `
			.idleAgainConfTable {
				cursor: pointer;
				border: 1px solid grey;
				border-radius: 6px;
				margin: 10px 7px;
				background: #1a1a1a;
				font-size: 32px;
			}
			.idleAgainConfTd {
				text-align:right;
				padding-right:20px;
				width:100%;
			}
			.idleAgainSortables {
				border-radius: 6px;
				background: #1a1a1a;
				color: white;
				justify-content: space-between;
				display: flex;
			}
			.sortableItem {
				border-radius: 6px;
				background: #1a1a1a !important;
				color: white !important;
				justify-content: space-between;
				display: flex;
			}`;
		document.head.appendChild(style);
		let miscTab = document.querySelectorAll("#tab-misc > .main-button")[2];
		let scriptConfBar = `<div onclick="navigate('scriptConfig')" class="main-button" style="cursor: pointer;">
	<table>
		<tbody><tr>
		<td><img src="images/whiteGear.png" class="img-small"></td>
		<td style="text-align:right;padding-right:20px;font-size:12pt;">SCRIPT CONFIG</td>
		</tr>
	</tbody></table>
	</div>`;
		miscTab.insertAdjacentHTML('afterend', scriptConfBar);

		let chatDiv = `<div id="div-chat" style="margin-top: 10px;border: 1px solid silver;background: linear-gradient(rgb(238, 238, 238), rgb(221, 221, 221));padding: 5px;">
			<div style="display: none;position: fixed;top:20vh;" id="div-emojis"></div>
			<div style="margin-bottom:5px;font-weight: bold;color: black;justify-content: space-between;display: flex;">
				<div>
					Chat Box 
					<button onclick="IdleAgain.autoScroll()" style="cursor: pointer;">
						Auto Scroll <img src="images/check.png" class="img-tiny" id="scriptAutoScroll">
					</button>
				</div>
				<button onclick="IdleAgain.clearChat()">Clear</button>
			</div>
			<div id="messages" style="border: 1px solid grey;background-color: white;height: 200px;padding-left: 5px;overflow-y: auto;color:black;user-select:text;">

			</div>
			<input id="message-body" type="text" maxlength="150" size="100%" style="margin-top: 5px;">
			<div style="margin-top: 5px;justify-content: space-between;display: flex;">
				<button onclick="IdleAgain.sendChat()">Send</button>
				<div>
					<button onclick="IdleAgain.chatHelp()" style="cursor: pointer;">HELP</button>
					<button style="cursor: pointer;border: 1px solid black;border-radius: 12px;padding: 2px;" id="emojis">&#128512;</button>
				</div>
			</div>
		</div>`

		let scriptConfTab = `<div id="tab-scriptConfig" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('main');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptGlobalToggle" onclick="IdleAgain.autoChangeVar('toggleGlobal',!IdleAgain.scriptVars.toggleGlobal,this.id)" style="cursor: pointer; color: green;">
			<td style="padding-left: 10px;"><img src="images/whiteGear.png" class="img-medium"></td>
			<td class="idleAgainConfTd">SCRIPT TOGGLE</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptMiningTogglesBar" onclick="navigate('scriptConfigMining')" style="cursor: pointer; color: white;">
			<td style="padding-left: 10px;"><img src="images/miningSkill.png" class="img-medium"></td>
			<td class="idleAgainConfTd">MINING TOGGLES</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptCraftingTogglesBar" onclick="navigate('scriptConfigCrafting')" style="cursor: pointer; color: white;">
			<td style="padding-left: 10px;"><img src="images/craftingSkill.png" class="img-medium"></td>
			<td class="idleAgainConfTd">CRAFTING TOGGLES</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptWoodcuttingTogglesBar" onclick="navigate('scriptConfigWoodcutting')" style="cursor: pointer; color: white;">
			<td style="padding-left: 10px;"><img src="images/woodcuttingSkill.png" class="img-medium"></td>
			<td class="idleAgainConfTd">WOODCUTTING TOGGLES</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptFarmingTogglesBar" onclick="navigate('scriptConfigFarming')" style="cursor: pointer; color: white;">
			<td style="padding-left: 10px;"><img src="images/farmingSkill.png" class="img-medium"></td>
			<td class="idleAgainConfTd">FARMING TOGGLES</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptBrewingTogglesBar" onclick="navigate('scriptConfigBrewing')" style="cursor: pointer; color: white;">
			<td style="padding-left: 10px;"><img src="images/brewingSkill.png" class="img-medium"></td>
			<td class="idleAgainConfTd">BREWING TOGGLES</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptExploringTogglesBar" onclick="navigate('scriptConfigExploring')" style="cursor: pointer; color: white;">
			<td style="padding-left: 10px;"><img src="images/exploringSkill.png" class="img-medium"></td>
			<td class="idleAgainConfTd">EXPLORING TOGGLES</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptCookingTogglesBar" onclick="navigate('scriptConfigCooking')" style="cursor: pointer; color: white;">
			<td style="padding-left: 10px;"><img src="images/cookingSkill.png" class="img-medium"></td>
			<td class="idleAgainConfTd">COOKING TOGGLES</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptCityUnlock" onclick="if(isMayor == 0) {IdleAgain.autoCityUnlock();IdleAgain.logTime('City Unlocked')}" style="cursor: pointer; color: white;">
			<td style="padding-left: 10px;"><img src="images/mayorsHouse.png" class="img-medium"></td>
			<td class="idleAgainConfTd">CITY UNLOCK</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptLoginToggle" onclick="IdleAgain.toggleAutoLogin()" style="cursor: pointer; color: green;">
			<td style="padding-left: 10px;"><img src="images/whiteGear.png" class="img-medium"></td>
			<td class="idleAgainConfTd">AUTO LOGIN</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptExportImport" style="cursor: pointer;color: white;text-align: center;">
			<td style="padding-right:20px;border-right: 1px solid white;" onclick="IdleAgain.scriptExportConfig()">EXPORT CONFIG</td>
		<td id="scriptImportConfig">IMPORT CONFIG</td>
		<td style="display:none;"><input type="file" id="saveInput"></td>
		</tr>
		</tbody>
	</table>
	</div>`


		let scriptConfMiningTab = `<div id="tab-scriptConfigMining" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfig');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptGeodeToggle" onclick="IdleAgain.autoChangeVar('toggleGeodeOpen',!IdleAgain.scriptVars.toggleGeodeOpen,this.id)" style="cursor: pointer; color: green;">
			<td style="padding-left: 10px;"><img src="images/geode5.png" class="img-small"></td>
			<td class="idleAgainConfTd">GEODE OPENING</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptMineralToggle" onclick="IdleAgain.autoChangeVar('toggleMineralIdentify',!IdleAgain.scriptVars.toggleMineralIdentify,this.id)" style="cursor: pointer; color: green;">
			<td style="padding-left: 10px;"><img src="images/tanzaniteMineral.png" class="img-small"></td>
			<td class="idleAgainConfTd">MINERAL IDENTIFY</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptNecklaceToggle" onclick="IdleAgain.autoChangeVar('toggleNecklaceCharge',!IdleAgain.scriptVars.toggleNecklaceCharge,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/mineralNecklace.png" class="img-small"></td>
			<td class="idleAgainConfTd">NECKLACE CHARGE</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptTrainToggle" onclick="IdleAgain.autoChangeVar('toggleTrain',!IdleAgain.scriptVars.toggleTrain,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/train.png" class="img-small"></td>
			<td class="idleAgainConfTd">TRAIN</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr style="color: white;width: 100%;">
			<td style="padding-left: 10px;"><img src="images/trainTracks.png" class="img-small"></td>
			<td>
			<select name="scriptTrainAmount" onchange="IdleAgain.autoChangeVar('scriptTrainAmount',this.value)" id="scriptTrainAmount">
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
				<option value="4">4</option>
				<option value="5">5</option>
			</select>
			</td>
			<td class="idleAgainConfTd">TRAINS TO SEND</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptRocketToggle" onclick="IdleAgain.autoChangeVar('toggleRocket',!IdleAgain.scriptVars.toggleRocket,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/rocket.png" class="img-small"></td>
			<td class="idleAgainConfTd">ROCKET</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr style="color: white;width: 100%;">
			<td style="padding-left: 10px;"><img src="images/mars.png" class="img-small"></td>
			<td>
			<select name="scriptRocketDestination" onchange="IdleAgain.autoChangeVar('scriptRocket',this.value)" id="scriptRocketDestination">
				<option value="Moon">Moon</option>
				<option value="Mars">Mars</option>
				<option value="Sun">Sun</option>
			</select>
			</td>
			<td class="idleAgainConfTd">ROCKET DESTINATION</td>
		</tr>
		</tbody>
	</table>
	</div>`

		let scriptConfCraftingTab = `<div id="tab-scriptConfigCrafting" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfig');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptSmeltingToggle" onclick="IdleAgain.autoChangeVar('toggleSmelting',!IdleAgain.scriptVars.toggleSmelting,this.id)" style="cursor: pointer; color: green;">
			<td style="padding-left: 10px;"><img src="images/ancientFurnace.png" class="img-small"></td>
			<td class="idleAgainConfTd">SMELTING</td>
		</tr>
		</tbody>
	</table>
	<ol id="sortableOres" style="list-style: none;padding: 0px;border: 1px solid grey;border-radius: 6px;margin: 10px;font-size: 25px;" class="ui-sortable">
		<li class="ui-state-default ui-sortable-handle" value="copper" style="border-radius: 6px; background: rgb(26, 26, 26); color: white; justify-content: space-between; display: flex;">
		<img src="images/bronzeBars.png" class="img-small" style="padding-right: 10px;">Bronze Bar<input type="number" class="oreMinimum" min="1" placeholder="Minimum to Smelt" value="1">
		</li>
		<li class="ui-state-default ui-sortable-handle" value="iron" style="border-radius: 6px; background: rgb(26, 26, 26); color: white; justify-content: space-between; display: flex;">
		<img src="images/ironBars.png" class="img-small" style="padding-right: 10px;">Iron Bar<input type="number" class="oreMinimum" min="1" placeholder="Minimum to Smelt" value="1">
		</li>
		<li class="ui-state-default ui-sortable-handle" value="silver" style="border-radius: 6px; background: rgb(26, 26, 26); color: white; justify-content: space-between; display: flex;">
		<img src="images/silverBars.png" class="img-small" style="padding-right: 10px;">Silver Bar<input type="number" class="oreMinimum" min="1" placeholder="Minimum to Smelt" value="1">
		</li>
		<li class="ui-state-default ui-sortable-handle" value="gold" style="border-radius: 6px; background: rgb(26, 26, 26); color: white; justify-content: space-between; display: flex;">
		<img src="images/goldBars.png" class="img-small" style="padding-right: 10px;">Gold Bar<input type="number" class="oreMinimum" min="1" placeholder="Minimum to Smelt" value="1">
		</li>
		<li class="ui-state-default ui-sortable-handle" value="promethium" style="border-radius: 6px; background: rgb(26, 26, 26); color: white; justify-content: space-between; display: flex;">
		<img src="images/promethiumBars.png" class="img-small" style="padding-right: 10px;">Promethium Bar<input type="number" class="oreMinimum" min="1" placeholder="Minimum to Smelt" value="1">
		</li>
		<li class="ui-state-default ui-sortable-handle" value="titanium" style="border-radius: 6px; background: rgb(26, 26, 26); color: white; justify-content: space-between; display: flex;">
		<img src="images/titaniumBars.png" class="img-small" style="padding-right: 10px;">Titanium Bar<input type="number" class="oreMinimum" min="1" placeholder="Minimum to Smelt" value="1">
		</li>
		<li class="ui-state-default ui-sortable-handle" value="ancientOre" style="border-radius: 6px; background: rgb(26, 26, 26); color: white; justify-content: space-between; display: flex;">
		<img src="images/ancientBars.png" class="img-small" style="padding-right: 10px;">Ancient Bar<input type="number" class="oreMinimum" min="1" placeholder="Minimum to Smelt" value="1">
		</li>
	</ol>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptRefinaryToggle" onclick="IdleAgain.autoChangeVar('toggleRefinary',!IdleAgain.scriptVars.toggleRefinary,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/goldBarRefinery.png" class="img-small"></td>
			<td class="idleAgainConfTd">REFINARY</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr id="scriptRefinaryBar" style="color: white;">
			<td style="padding-left: 10px;"><img src="images/refinedGoldBars.png" class="img-small"></td>
			<td style="padding-left: 50px;">
			<select name="scriptRefinaryBarOptions" onchange="IdleAgain.autoChangeVar('scriptRefinaryBar',this.value)" id="scriptRefinaryOptions">
				<option value="gold">Gold</option>
				<option value="promethium">Promethium</option>
			</select>
			</td>
			<td class="idleAgainConfTd">REFINARY BAR</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptFoundryToggle" onclick="IdleAgain.autoChangeVar('toggleCharcoal',!IdleAgain.scriptVars.toggleCharcoal,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/charcoalFoundry.png" class="img-small"></td>
			<td class="idleAgainConfTd">CHARCOAL FOUNDRY</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr id="scriptFoundryWood" style="color: white;">
			<td style="padding-left: 10px;"><img src="images/lavaLogs.png" class="img-small"></td>
			<td style="padding-left: 50px;">
			<select name="scriptFoundryWoodOptions" onchange="IdleAgain.autoChangeVar('scriptFoundryWood',this.value)" id="scriptFoundryWoodOptions">
				<option value="cheapest">Cheapest</option>
				<option value="logs">Logs</option>
				<option value="oakLogs">Oak Logs</option>
				<option value="willowLogs">Willow Logs</option>
				<option value="mapleLogs">Maple Logs</option>
				<option value="redwoodLogs">Redwood Logs</option>
				<option value="pineLogs">Pine Logs</option>
				<option value="hauntedLogs">Haunted Logs</option>
				<option value="jungleLogs">Jungle Logs</option>
				<option value="lavaLogs">Lava Logs</option>
				<option value="goldLogs">Gold Logs</option>
				<option value="magicLogs">Magic Logs</option>
			</select>
			</td>
			<td class="idleAgainConfTd">CHARCOAL LOG</td>
		</tr>
		</tbody>
	</table>
	</div>`

		let scriptConfWoodcuttingTab = `<div id="tab-scriptConfigWoodcutting" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfig');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptLumberToggle" onclick="IdleAgain.autoChangeVar('toggleWoodcutting',!IdleAgain.scriptVars.toggleWoodcutting,this.id)" style="cursor: pointer; color: green;">
			<td style="padding-left: 10px;"><img src="images/lumberjack.png" class="img-small"></td>
			<td class="idleAgainConfTd">LUMBERJACK</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
		<tbody style="display: table-row;">
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','tree',!IdleAgain.scriptVars.scriptTreeIgnore.tree,this.id)" id="treeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/tree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','oakTree',!IdleAgain.scriptVars.scriptTreeIgnore.oakTree,this.id)" id="oakTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/oakTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">OAK TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','willowTree',!IdleAgain.scriptVars.scriptTreeIgnore.willowTree,this.id)" id="willowTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/willowTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">WILLOW TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','mapleTree',!IdleAgain.scriptVars.scriptTreeIgnore.mapleTree,this.id)" id="mapleTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/mapleTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">MAPLE TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','redwoodTree',!IdleAgain.scriptVars.scriptTreeIgnore.redwoodTree,this.id)" id="redwoodTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/redwoodTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">REDWOOD TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','pineTree',!IdleAgain.scriptVars.scriptTreeIgnore.pineTree,this.id)" id="pineTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/pineTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">PINE TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','hauntedTree',!IdleAgain.scriptVars.scriptTreeIgnore.hauntedTree,this.id)" id="hauntedTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">HAUNTED TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','jungleTree',!IdleAgain.scriptVars.scriptTreeIgnore.jungleTree,this.id)" id="jungleTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/jungleTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">JUNGLE TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','lavaTree',!IdleAgain.scriptVars.scriptTreeIgnore.lavaTree,this.id)" id="lavaTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/lavaTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">LAVA TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','goldTree',!IdleAgain.scriptVars.scriptTreeIgnore.goldTree,this.id)" id="goldTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/goldTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">GOLD TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','magicTree',!IdleAgain.scriptVars.scriptTreeIgnore.magicTree,this.id)" id="magicTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/magicTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">MAGIC TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','appleTree',!IdleAgain.scriptVars.scriptTreeIgnore.appleTree,this.id)" id="appleTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/appleTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">APPLE TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','cactusTree',!IdleAgain.scriptVars.scriptTreeIgnore.cactusTree,this.id)" id="cactusTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/cactusTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">CACTUS TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','bananaTree',!IdleAgain.scriptVars.scriptTreeIgnore.bananaTree,this.id)" id="bananaTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/bananaTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">BANANA TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','palmTree',!IdleAgain.scriptVars.scriptTreeIgnore.palmTree,this.id)" id="palmTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/palmTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">PALM TREE IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','pineappleTree',!IdleAgain.scriptVars.scriptTreeIgnore.pineappleTree,this.id)" id="pineappleTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/pineappleTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">PINEAPPLE TREE IGNORE</td>
		</tr>
		<tr style="color: red;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','starfuitTree',!IdleAgain.scriptVars.scriptTreeIgnore.starfuitTree,this.id)" id="starfruitTreeIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/starfruitTree.png" class="img-small"></td>
			<td style="text-align: center;">STARFRUIT TREE IGNORE</td>
		</tr>
		</tbody>
	</table>
	</div>`

		let scriptConfFarmingTab = `<div id="tab-scriptConfigFarming" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfig');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptFarmingToggle" onclick="IdleAgain.autoChangeVar('toggleFarming',!IdleAgain.scriptVars.toggleFarming,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/farmer.png" class="img-small"></td>
			<td class="idleAgainConfTd">HARVEST AND PLANT</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;cursor: pointer;">
		<tbody>
		<tr id="scriptSeedToggleBar" onclick="navigate('scriptConfigSeeds')" style="color: white;">
			<td style="padding-left: 10px;"><img src="images/goldLeafSeeds.png" class="img-small"></td>
			<td class="idleAgainConfTd">SEED SELECTOR</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptBonesToggle" onclick="IdleAgain.autoChangeVar('toggleBones',!IdleAgain.scriptVars.toggleBones,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/bonemealBin.png" class="img-small"></td>
			<td class="idleAgainConfTd">BONEMEAL</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
		<tbody style="display: table-row;">
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','bones',!IdleAgain.scriptVars.scriptBonesIgnore.bones,this.id)" id="bonesIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/bones.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">BONES IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','ashes',!IdleAgain.scriptVars.scriptBonesIgnore.ashes,this.id)" id="ashesIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/ashes.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">ASHES IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','iceBones',!IdleAgain.scriptVars.scriptBonesIgnore.iceBones,this.id)" id="iceBonesIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/iceBones.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">ICE BONES IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','zombieBones',!IdleAgain.scriptVars.scriptBonesIgnore.zombieBones,this.id)" id="zombieBonesIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/zombieBones.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">ZOMBIE BONES IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','bloodBones',!IdleAgain.scriptVars.scriptBonesIgnore.bloodBones,this.id)" id="bloodBonesIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/bloodBones.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">BLOOD BONES IGNORE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','fishBones',!IdleAgain.scriptVars.scriptBonesIgnore.fishBones,this.id)" id="fishBonesIgnoreToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/fishBones.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">FISH BONES IGNORE</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptFertilizeToggle" onclick="IdleAgain.autoChangeVar('toggleFertilize',!IdleAgain.scriptVars.toggleFertilize,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/fertilizeSoilPotion.png" class="img-small"></td>
			<td class="idleAgainConfTd">FERTILIZE</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
		<tbody style="display: table-row;">
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','redMushroomSeeds',!IdleAgain.scriptVars.scriptFertilize.redMushroomSeeds,this.id)" id="MushroomFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/redMushroomSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">RED MUSHROOM FERTILIZE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','dottedGreenLeafSeeds',!IdleAgain.scriptVars.scriptFertilize.dottedGreenLeafSeeds,this.id)" id="dottedGreenFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/dottedGreenLeafSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">DOTTED GREEN LEAF FERTILIZE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','greenLeafSeeds',!IdleAgain.scriptVars.scriptFertilize.greenLeafSeeds,this.id)" id="greenLeafFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/greenLeafSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">GREEN LEAF FERTILIZE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','limeLeafSeeds',!IdleAgain.scriptVars.scriptFertilize.limeLeafSeeds,this.id)" id="limeLeafFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/limeLeafSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">LIME LEAF FERTILIZE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','goldLeafSeeds',!IdleAgain.scriptVars.scriptFertilize.goldLeafSeeds,this.id)" id="goldLeafFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/goldLeafSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">GOLD LEAF FERTILIZE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','crystalLeafSeeds',!IdleAgain.scriptVars.scriptFertilize.crystalLeafSeeds,this.id)" id="crystalLeafFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/crystalLeafSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">CRYSTAL LEAF FERTILIZE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','stripedGreenLeafSeeds',!IdleAgain.scriptVars.scriptFertilize.stripedGreenLeafSeeds,this.id)" id="stripedGreenLeafFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/stripedGreenLeafSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">STRIPED GREEN LEAF FERTILIZE</td>
		</tr><tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','stripedGoldLeafSeeds',!IdleAgain.scriptVars.scriptFertilize.stripedGoldLeafSeeds,this.id)" id="stripedGoldLeafFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/stripedGoldLeafSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">STRIPED GOLD LEAF FERTILIZE</td>
		</tr><tr style="color: red;" onclick="IdleAgain.autoChangeObject('scriptFertilize','stripedCrystalLeafSeeds',!IdleAgain.scriptVars.scriptFertilize.stripedCrystalLeafSeeds,this.id)" id="stripedCrystalLeafFertilizeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/stripedCrystalLeafSeeds.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">STRIPED CRYSTAL LEAF FERTILIZE</td>
		</tr></tbody>
	</table>
	</div>`

		let scriptConfSeedsTab = `<div id="tab-scriptConfigSeeds" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfigFarming');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr id="scriptSeedsInfo" style="color: white;">
			<td style="padding-left: 10px;"></td>
			<td style="text-align: center;padding-right:20px;width: 100%;">
			<p>PRIORITY WILL BE DEFINED BASED ON THE POSITION OF THE SEED</p>
			<p>DRAG AND DROP ONCE AFTER CHECKING BOXES</p>
			</td>
		</tr>
		</tbody>
	</table>
	<ol id="sortableSeeds" style="list-style: none;padding: 0px;border: 1px solid grey;border-radius: 6px;margin: 10px;font-size: 25px;"></ol>
	</div>`

		let scriptConfBrewingTab = `<div id="tab-scriptConfigBrewing" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfig');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptDrinkToggle" onclick="IdleAgain.autoChangeVar('toggleDrink',!IdleAgain.scriptVars.toggleDrink,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/diamondBrewingKit.png" class="img-small"></td>
			<td class="idleAgainConfTd">POTION DRINK</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptBrewToggle" onclick="IdleAgain.autoChangeVar('toggleBrew',!IdleAgain.scriptVars.toggleBrew,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/goldLeaf.png" class="img-small"></td>
			<td class="idleAgainConfTd">POTION BREW</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;cursor: pointer;">
		<tbody>
		<tr id="scriptPotionToggleBar" onclick="navigate('scriptConfigPotions')" style="color: white;">
			<td style="padding-left: 10px;"><img src="images/researchSpeedPotion.png" class="img-small"></td>
			<td class="idleAgainConfTd">POTION SELECTOR</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptTreeUpgradeToggle" onclick="IdleAgain.autoChangeVar('toggleTreeUpgrade',!IdleAgain.scriptVars.toggleTreeUpgrade,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/woodcuttingUpgradePotion.png" class="img-small"></td>
			<td class="idleAgainConfTd">TREE UPGRADE POTION</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
		<tbody style="display: table-row;">
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','tree',!IdleAgain.scriptVars.scriptTreeUpgrade.tree,this.id)" id="treeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/tree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','oakTree',!IdleAgain.scriptVars.scriptTreeUpgrade.oakTree,this.id)" id="oakTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/oakTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">OAK TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','willowTree',!IdleAgain.scriptVars.scriptTreeUpgrade.willowTree,this.id)" id="willowTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/willowTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">WILLOW TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','mapleTree',!IdleAgain.scriptVars.scriptTreeUpgrade.mapleTree,this.id)" id="mapleTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/mapleTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">MAPLE TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','redwoodTree',!IdleAgain.scriptVars.scriptTreeUpgrade.redwoodTree,this.id)" id="redwoodTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/redwoodTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">REDWOOD TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','pineTree',!IdleAgain.scriptVars.scriptTreeUpgrade.pineTree,this.id)" id="pineTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/pineTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">PINE TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','hauntedTree',!IdleAgain.scriptVars.scriptTreeUpgrade.hauntedTree,this.id)" id="hauntedTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">HAUNTED TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','jungleTree',!IdleAgain.scriptVars.scriptTreeUpgrade.jungleTree,this.id)" id="jungleTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/jungleTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">JUNGLE TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','lavaTree',!IdleAgain.scriptVars.scriptTreeUpgrade.lavaTree,this.id)" id="lavaTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/lavaTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">LAVA TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','goldTree',!IdleAgain.scriptVars.scriptTreeUpgrade.goldTree,this.id)" id="goldTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/goldTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">GOLD TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','magicTree',!IdleAgain.scriptVars.scriptTreeUpgrade.magicTree,this.id)" id="magicTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/magicTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">MAGIC TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','appleTree',!IdleAgain.scriptVars.scriptTreeUpgrade.appleTree,this.id)" id="appleTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/appleTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">APPLE TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','cactusTree',!IdleAgain.scriptVars.scriptTreeUpgrade.cactusTree,this.id)" id="cactusTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/cactusTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">CACTUS TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','bananaTree',!IdleAgain.scriptVars.scriptTreeUpgrade.bananaTree,this.id)" id="bananaTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/bananaTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">BANANA TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','palmTree',!IdleAgain.scriptVars.scriptTreeUpgrade.palmTree,this.id)" id="palmTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/palmTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">PALM TREE UPGRADE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','pineappleTree',!IdleAgain.scriptVars.scriptTreeUpgrade.pineappleTree,this.id)" id="pineappleTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/pineappleTree.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">PINEAPPLE TREE UPGRADE</td>
		</tr>
		<tr style="color: red;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','starfuitTree',!IdleAgain.scriptVars.scriptTreeUpgrade.starfuitTree,this.id)" id="starfruitTreeUpgradeToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/starfruitTree.png" class="img-small"></td>
			<td style="text-align: center;">STARFRUIT TREE UPGRADE</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
		<thead>
			<th style="color: white;"><img src="images/strengthCombatPotion.png" class="img-small"> STRENGTH POTION</th>
		</thead>
		<tbody id="strengthTableBody"></tbody>
	</table>
	</div>`

		let scriptConfPotionsTab = `<div id="tab-scriptConfigPotions" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfigBrewing');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr id="scriptPotionsInfo" style="color: white;">
			<td style="padding-left: 10px;"></td>
			<td style="text-align: center;padding-right:20px;width: 100%;">IT WILL ONLY BREW IF DRINK IS ALSO SELECTED AND DOES NOT CHECK THE INGREDIENTS</td>
		</tr>
		</tbody>
	</table>
	<div class="ui-state-default" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;margin: 10px;font-size: 25px;">
		<p style="
		margin-top: 0px;
		margin-bottom: 0px;
		padding-left: 10px;
		">DRINK</p>
		<p style="
		margin-top: 0px;
		margin-bottom: 0px;
		padding-left: 0px;
		padding-right: 10px;
		">BREW</p>
	</div>
	<ol id="sortablePotions" style="list-style: none;padding: 0px;border: 1px solid grey;border-radius: 6px;margin: 10px;font-size: 25px;">
	</ol>
	</div>`

		let scriptConfExploringTab = `<div id="tab-scriptConfigExploring" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfig');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptExploreToggle" onclick="IdleAgain.autoChangeVar('toggleExplore',!IdleAgain.scriptVars.toggleExplore,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/explorer.png" class="img-small"></td>
			<td class="idleAgainConfTd">EXPLORER</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr id="scriptExplorerArea" style="color: white;">
			<td style="padding-left: 10px;"><img src="images/caves.png" class="img-small"></td>
			<td style="padding-left: 50px;">
			<select name="scriptAreaOptions" onchange="IdleAgain.autoChangeVar('scriptArea',this.value);IdleAgain.monsterOptions(this.value);IdleAgain.autoChangeVar('scriptMonster',document.getElementById('scriptMonsterOptions').value)" id="scriptAreaOptions">
				<option value="fields">Fields</option>
				<option value="forests">Forests</option>
				<option value="caves">Caves</option>
				<option value="volcano">Volcano</option>
				<option value="northernFields">Northern Fields</option>
				<option value="hauntedMansion">Haunted Mansion</option>
				<option value="desert">Desert</option>
				<option value="ocean">Ocean</option>
				<option value="jungle">Jungle</option>
				<option value="dungeonEntrance">Dungeon Entrance</option>
				<option value="dungeon">Dungeon</option>
				<option value="castle">Castle</option>
				<option value="cemetery">Cemetery</option>
				<option value="factory">Factory</option>
				<option value="hauntedWoods">Haunted Woods</option>
				<option value="deepOcean">Deep Ocean</option>
			</select>
			</td>
			<td class="idleAgainConfTd">EXPLORER AREA</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptFightToggle" onclick="IdleAgain.autoChangeVar('toggleFight',!IdleAgain.scriptVars.toggleFight,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/combat.png" class="img-small"></td>
			<td class="idleAgainConfTd">FIGHT</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptResetToggle" onclick="IdleAgain.autoChangeVar('toggleResetFight',!IdleAgain.scriptVars.toggleResetFight,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/resetFightingPotion.png" class="img-small"></td>
			<td class="idleAgainConfTd">RESET POTION</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
		<tbody>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','fields',!IdleAgain.scriptVars.scriptResetArea.fields,this.id)" id="fieldsResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/fields.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Fields</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','forests',!IdleAgain.scriptVars.scriptResetArea.forests,this.id)" id="forestsResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/forests.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Forests</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','caves',!IdleAgain.scriptVars.scriptResetArea.caves,this.id)" id="cavesResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/caves.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Caves</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','volcano',!IdleAgain.scriptVars.scriptResetArea.volcano,this.id)" id="volcanoResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/volcano.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Volcano</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','northernFields',!IdleAgain.scriptVars.scriptResetArea.northernFields,this.id)" id="northernFieldsResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/northernFields.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Northern Fields</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','hauntedMansion',!IdleAgain.scriptVars.scriptResetArea.hauntedMansion,this.id)" id="hauntedMansionResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedMansion.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Haunted Mansion</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','desert',!IdleAgain.scriptVars.scriptResetArea.desert,this.id)" id="desertResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/desert.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Desert</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','ocean',!IdleAgain.scriptVars.scriptResetArea.ocean,this.id)" id="oceanResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/ocean.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Ocean</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','jungle',!IdleAgain.scriptVars.scriptResetArea.jungle,this.id)" id="jungleResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/jungle.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Jungle</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','dungeonEntrance',!IdleAgain.scriptVars.scriptResetArea.dungeonEntrance,this.id)" id="dungeonEntranceResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/dungeonEntrance.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Dungeon Entrance</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','dungeon',!IdleAgain.scriptVars.scriptResetArea.dungeon,this.id)" id="dungeonResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/dungeon.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Dungeon</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','castle',!IdleAgain.scriptVars.scriptResetArea.castle,this.id)" id="castleResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/castle.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Castle</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','cemetery',!IdleAgain.scriptVars.scriptResetArea.cemetery,this.id)" id="cemeteryResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/cemetery.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Cemetery</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','factory',!IdleAgain.scriptVars.scriptResetArea.factory,this.id)" id="factoryResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/factory.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Factory</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','hauntedWoods',!IdleAgain.scriptVars.scriptResetArea.hauntedWoods,this.id)" id="hauntedWoodsResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedWoods.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Haunted Woods</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','deepOcean',!IdleAgain.scriptVars.scriptResetArea.deepOcean,this.id)" id="deepOceanResetToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/deepOcean.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">Deep Ocean</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptMonsterFindToggle" onclick="IdleAgain.autoChangeVar('toggleMonsterFind',!IdleAgain.scriptVars.toggleMonsterFind,this.id)" style="cursor: pointer; color: green;">
			<td style="padding-left: 10px;"><img src="images/skeletonMonster.png" class="img-small"></td>
			<td class="idleAgainConfTd">SEARCH FOR MONSTER</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr id="scriptExplorerArea" style="color: white;">
			<td style="padding-left: 10px;"><img src="images/exploringSkill.png" class="img-small"></td>
			<td style="padding-left: 50px;"><select name="scriptMonsterOptions" onchange="IdleAgain.autoChangeVar('scriptMonster',this.value)" id="scriptMonsterOptions">
			</select>
			</td>
			<td class="idleAgainConfTd">MONSTER TO SEARCH</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptShinyToggle" onclick="IdleAgain.autoChangeVar('toggleShiny',!IdleAgain.scriptVars.toggleShiny,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/shiny.gif" class="img-small"></td>
			<td class="idleAgainConfTd">SHINY/GEM GOBLIN HUNT</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptSpellToggle" onclick="IdleAgain.autoChangeVar('toggleSpell',!IdleAgain.scriptVars.toggleSpell,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/fireSpell.png" class="img-small"></td>
			<td class="idleAgainConfTd">SPELL</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptCombatPotionToggle" onclick="IdleAgain.autoChangeVar('toggleCombatPotion',!IdleAgain.scriptVars.toggleCombatPotion,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/ghostScanCombatPotion.png" class="img-small"></td>
			<td class="idleAgainConfTd">COMBAT POTION</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptHealToggle" onclick="IdleAgain.autoChangeVar('toggleHeal',!IdleAgain.scriptVars.toggleHeal,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/autoTickHeal.png" class="img-small"></td>
			<td class="idleAgainConfTd">TICK HEAL</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptBloodMoonToggle" onclick="IdleAgain.autoChangeVar('toggleBM',!IdleAgain.scriptVars.toggleBM,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/bloodMoonIcon.png" class="img-small"></td>
			<td class="idleAgainConfTd">BLOOD MOON</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptCousinToggle" onclick="IdleAgain.autoChangeVar('toggleCousin',!IdleAgain.scriptVars.toggleCousin,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/goblinCousin.png" class="img-small"></td>
			<td class="idleAgainConfTd">GOBLIN COUSIN</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
		<tbody>
		<tr id="scriptCousinArea" style="color: white;">
			<td style="padding-left: 10px;"><img src="images/fields.png" class="img-small"></td>
			<td style="padding-left: 50px;">
			<select name="scriptCousinAreaOptions" onchange="IdleAgain.autoChangeVar('scriptCousinArea',this.value)" id="scriptCousinAreaOptions">
				<option value="fields">Fields</option>
				<option value="forests">Forests</option>
				<option value="caves">Caves</option>
				<option value="volcano">Volcano</option>
				<option value="northernFields">Northern Fields</option>
				<option value="hauntedMansion">Haunted Mansion</option>
				<option value="desert">Desert</option>
				<option value="ocean">Ocean</option>
				<option value="jungle">Jungle</option>
				<option value="dungeonEntrance">Dungeon Entrance</option>
				<option value="dungeon">Dungeon</option>
				<option value="castle">Castle</option>
				<option value="cemetery">Cemetery</option>
				<option value="factory">Factory</option>
				<option value="hauntedWoods">Haunted Woods</option>
				<option value="deepOcean">Deep Ocean</option>
			</select>
			</td>
			<td class="idleAgainConfTd">COUSIN AREA</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptBagsToggle" onclick="IdleAgain.autoChangeVar('toggleBags',!IdleAgain.scriptVars.toggleBags,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/oceanLoot.png" class="img-small"></td>
			<td class="idleAgainConfTd">BAGS OPENING</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptFieldsBagsToggle" onclick="IdleAgain.autoChangeVar('toggleFieldsBags',!IdleAgain.scriptVars.toggleFieldsBags,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/fieldsLoot.png" class="img-small"></td>
			<td class="idleAgainConfTd">FIELDS BAGS OPENING</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptStatueToggle" onclick="IdleAgain.autoChangeVar('toggleStatue',!IdleAgain.scriptVars.toggleStatue,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/bronzeStatueMetalDetector.png" class="img-small"></td>
			<td class="idleAgainConfTd">STATUE SELL</td>
		</tr>
		</tbody>
	</table>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptArtifactToggle" onclick="IdleAgain.autoChangeVar('toggleArtifact',!IdleAgain.scriptVars.toggleArtifact,this.id)" style="cursor: pointer; color: red;">
			<td style="padding-left: 10px;"><img src="images/skullArtifact.png" class="img-small"></td>
			<td class="idleAgainConfTd">ARTIFACT CONVERT</td>
		</tr>
		</tbody>
	</table>
	</div>`

		let scriptConfCookingTab = `<div id="tab-scriptConfigCooking" style="display:none">
	<div class="main-button-lighter">
		<table>
		<tbody>
			<tr onclick="navigate('scriptConfig');playPreviousMenuSound();" style="cursor: pointer;">
			<td><img src="images/back.png" class="img-small"></td>
			<td class="back-label">BACK</td>
			</tr>
		</tbody>
		</table>
	</div>
	<table class="idleAgainConfTable">
		<tbody>
		<tr id="scriptBoatToggle" onclick="IdleAgain.autoChangeVar('toggleBoat',!IdleAgain.scriptVars.toggleBoat,this.id)" style="cursor: pointer; color: green;">
			<td style="padding-left: 10px;"><img src="images/sailBoat.png" class="img-small"></td>
			<td class="idleAgainConfTd">BOAT</td>
		</tr>
		</tbody>
	</table>
	<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
		<tbody style="display: table-row;">
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','rowBoat',!IdleAgain.scriptVars.scriptBoatSend.rowBoat,this.id)" id="rowBoatSendToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/rowBoat.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">ROW BOAT</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','canoeBoat',!IdleAgain.scriptVars.scriptBoatSend.canoeBoat,this.id)" id="canoeBoatSendToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/canoeBoat.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">CANOE</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','sailBoat',!IdleAgain.scriptVars.scriptBoatSend.sailBoat,this.id)" id="sailBoatSendToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/sailBoat.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">SAIL BOAT</td>
		</tr>
		<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','highWind',!IdleAgain.scriptVars.scriptBoatSend.highWind,this.id)" id="highWindSendToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/windIcon.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">WAIT HIGH WIND</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','steamBoat',!IdleAgain.scriptVars.scriptBoatSend.steamBoat,this.id)" id="steamBoatSendToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/steamBoat.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">STEAM BOAT</td>
		</tr>
		<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','trawler',!IdleAgain.scriptVars.scriptBoatSend.trawler,this.id)" id="trawlerSendToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/trawler.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">TRAWLER</td>
		</tr>
		</tbody>
	</table>
	</div>`;
		let logoutTab = document.getElementById('tab-logout');
		logoutTab.insertAdjacentHTML('afterend', chatDiv);
		logoutTab.insertAdjacentHTML('afterend', scriptConfCookingTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfExploringTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfPotionsTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfBrewingTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfSeedsTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfFarmingTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfWoodcuttingTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfCraftingTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfMiningTab);
		logoutTab.insertAdjacentHTML('afterend', scriptConfTab);

		let sortableOres = document.getElementById('sortableOres');
		new Sortable(sortableOres, {
			animation: 150,
			onChange: function() {
				saveOreOrder();
			}
		});

		let seeds = [
			"red Mushroom Seeds", "dotted Green Leaf Seeds", "green Leaf Seeds", "lime Leaf Seeds", "gold Leaf Seeds", "crystal Leaf Seeds", "striped Green Leaf Seeds", "striped Gold Leaf Seeds", "striped Crystal Leaf Seeds", "tree Seeds", "oak Tree Seeds", "willow Tree Seeds", "maple Tree Seeds", "redwood Tree Seeds", "pine Tree Seeds", "haunted Tree Seeds", "jungle Tree Seeds", "lava Tree Seeds", "gold Tree Seeds", "magic Tree Seeds", "apple Tree Seeds", "cactus Tree Seeds", "banana Tree Seeds", "palm Tree Seeds", "pineapple Tree Seeds", "starfruit Tree Seeds", "gold Apple Tree Seeds"
		];
		let sortableSeedsOl = document.getElementById('sortableSeeds');
		seeds.forEach(function(seed) {
			let seedLi = `<li class="ui-state-default sortableItem" value="${seed.replaceAll(' ','')}" class="idleAgainSortables">
		<input type="checkbox" class="seed-checkbox"> ${seed.toUpperCase()}<img src="images/${seed.replaceAll(' ','')}.png" class="img-small" style="padding-right: 10px;">
		</li>`;
			sortableSeedsOl.insertAdjacentHTML('beforeend', seedLi);
		});

		let sortableSeeds = document.getElementById('sortableSeeds');
		new Sortable(sortableSeeds, {
			animation: 150,
			onChange: function() {
				saveSeedOrder();
			}
		});

		let areas = [
			'fields', 'forests', 'caves', 'volcano', 'northern Fields', 'haunted Mansion', 'desert', 'ocean', 'jungle', 'dungeon Entrance', 'dungeon', 'castle', 'cemetery', 'factory', 'haunted Woods', 'deep Ocean'
		];
		let strengthTableBody = document.getElementById('strengthTableBody');
		areas.forEach(function(area) {
			let areaTr = `<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptStrength','${area.replace(" ","")}',!IdleAgain.scriptVars.scriptStrength.${area.replace(" ","")},this.id)" id="${area.replace(" ","")}StrengthToggle">
			<td style="padding-left: 10px;width: 5%;"><img src="images/${area.replace(" ","")}.png" class="img-small"></td>
			<td style="text-align: center;width: 40%">${area.toUpperCase()}</td>
		</tr>`;
			strengthTableBody.insertAdjacentHTML('beforeend', areaTr);
		});

		let potionsList = [
			"furnace Speed Potion", "seed Finder Potion", "compost Potion", "tree Compost Potion", "fishing Speed Potion", "woodcutting Xp Potion", "exploring Speed Potion", "bait Potion", "farming Xp Potion", "fast Compost Potion", "oil Potion", "coin Potion", "pirates Potion", "promethium Potion", "rocket Speed Potion", "fruit Tree Potion", "titanium Potion", "research Speed Potion", "super Rocket Speed Potion"
		];
		let sortablePotionsOl = document.getElementById('sortablePotions');
		potionsList.forEach(function(potion) {
			let potionli = `<li class="ui-state-default sortableItem" value="${potion.replaceAll(' ','')}" class="idleAgainSortables">
			<input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="IdleAgain.savePotions()">${potion.toUpperCase()}<img src="images/${potion.replaceAll(' ','')}.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="IdleAgain.savePotions()">
			</li>`;
			sortablePotionsOl.insertAdjacentHTML('beforeend', potionli);
		});

		let compareBar = `<a href="https://dounford-felipe.github.io/DHM-Compare/" target="_blank" style="text-decoration:none;">
			<div class="main-button">
				<table>
					<tbody><tr>
						<td><img src="https://raw.githubusercontent.com/Dounford-Felipe/DHM-Compare/main/images/favicon.ico" class="img-small"></td>
						<td class="back-label">COMPARE TOOL</td>
					</tr></tbody>
				</table>
			</div>
		</a>`;
		let profileLink = document.getElementById('your-profile-link');
		profileLink.insertAdjacentHTML('afterend', compareBar);

		let cookAllItem = `<div class="main-button-lighter" id="scriptCook" style="background-color: rgb(0, 77, 0);">
		<table>
			<tbody>
				<tr>
					<td style="width: 20%; position: relative;"><img src="images/heat.png" class="img-medium"></td>
					<td class="main-button-table-tr-td2">
						<span class="main-button-span-item-owned" id="heatNeeded">0</span><span> HEAT NEEDED</span>
						<hr class="no-space">
						<span class="main-button-span-desc" onclick="IdleAgain.getHeatNeeded()" style="background-color: darkcyan;padding: 4px;">GET HEAT NEEDED</span>
						<span class="main-button-span-desc" onclick="IdleAgain.cookAll()" style="background-color: darkcyan;padding: 4px;margin-left: 10px;">COOK ALL</span>
					</td>
				</tr>
			</tbody>
		</table>
		</div>`
		let energyItemBox = document.getElementById('item-box-energy');
		energyItemBox.insertAdjacentHTML('afterend', cookAllItem);

		let growTimeNeededItem = `<div class="main-button-lighter" id="scriptgrowTimeNeeded" style="background-color: rgb(26, 51, 0);">
		<table>
			<tbody>
				<tr>
					<td style="width: 20%; position: relative;"><img src="images/clock.png" class="img-medium"></td>
					<td class="main-button-table-tr-td2" style="padding-bottom: 6px;">
						<span class="main-button-span-item-owned" id="growTimeNeeded">TIME TO GROW ALL</span>
						<hr class="no-space">
						<span class="main-button-span-desc" onclick="IdleAgain.getTimeNeeded()" style="background-color: darkcyan;padding: 4px;">	GET TIME NEEDED TO GROW ALL</span>
					</td>
				</tr>
			</tbody>
		</table>
		</div>`

		let bonemealNeededItem = `<div class="main-button-lighter" id="scriptBonemealNeeded" style="background-color: rgb(26, 51, 0);">
		<table>
			<tbody>
				<tr>
					<td style="width: 20%; position: relative;"><img src="images/ashes.png" class="img-medium"></td>
					<td class="main-button-table-tr-td2" style="padding-bottom: 6px;">
						<span class="main-button-span-item-owned" id="bonemealNeeded">0</span><span> BONEMEAL NEEDED</span>
						<hr class="no-space">
						<span class="main-button-span-desc" onclick="IdleAgain.getBonemealNeeded()" style="background-color: darkcyan;padding: 4px;">	GET BONEMEAL NEEDED</span>
					</td>
				</tr>
			</tbody>
		</table>
		</div>`
		let bonemealBinItemBox = document.getElementById('item-box-bonemealBin');
		bonemealBinItemBox.insertAdjacentHTML('afterend', growTimeNeededItem);
		bonemealBinItemBox.insertAdjacentHTML('afterend', bonemealNeededItem);

		$("#div-emojis").draggable()
		const pickerOptions = {
			onEmojiSelect: function(emoji) {
				document.getElementById('message-body').value += emoji.native
			},
			maxFrequentRows: 1
		}
		const picker = new EmojiMart.Picker(pickerOptions)
		picker.style.height = '350px'
		document.getElementById("div-emojis").appendChild(picker)
		document.getElementById('emojis').addEventListener('click', toggleEmojiPicker)

		document.getElementById('scriptImportConfig').addEventListener('click', function() {
			document.getElementById('saveInput').click();
		});
		document.getElementById('saveInput').addEventListener('change', function() {
			let fileInput = this;
			if (fileInput.files.length > 0) {
				let file = fileInput.files[0];
				let reader = new FileReader();
				reader.readAsText(file);
	
				reader.onload = function(e) {
					let importedData = e.target.result;
	
					importedData = importedData.split(',,,');
					IdleAgain.scriptVars = JSON.parse(importedData[0]);
					scriptStyleTabs();
					localStorage.setItem(`idleAgain-${IdleAgain.username}`, JSON.stringify(scriptVars));
					localStorage.setItem(`idleAgain-oreOrder${IdleAgain.username}`, importedData[1]);
					loadOreOrder();
					localStorage.setItem(`idleAgain-potionState${IdleAgain.username}`, importedData[2]);
					loadPotions();
					localStorage.setItem(`idleAgain-seedOrder${IdleAgain.username}`, importedData[3]);
					loadSeedOrder();
				};
			}
		});

		document.getElementById('fight-button').querySelectorAll('td')[0].setAttribute('onclick', 'clicksFightButton();IdleAgain.autoPoison();');
		document.getElementById('fight-button').querySelectorAll('td')[1].setAttribute('onclick', 'clicksFightButton();IdleAgain.autoPoison();');

		addWikiButton();
	},

	addWikiButton() {
		let itemBox = document.querySelectorAll('[id^="item-box-"]');
		itemBox = Array.from(itemBox);
		itemBox = itemBox.filter(function(element) {
			return !element.id.startsWith("item-box-amount");
		});
		for (let i = 0; i < itemBox.length; i++) {
			let wikiURL = itemBox[i].id.substr(9).replace(/([A-Z0-9])/g, ' $1').trim();
			wikiURL = wikiURL.charAt(0).toUpperCase() + wikiURL.slice(1);
			let wikiButton = document.createElement("a");
			wikiButton.href = 'https://diamondhuntmobile.fandom.com/wiki/' + wikiURL;
			wikiButton.target = '_blank';
			wikiButton.style.position = 'absolute';
			wikiButton.style.top = '0';
			wikiButton.innerHTML = '<img src="images/wiki.png" style="width:25px;height:25px;">';
			itemBox[i].querySelector('td').style.position = 'relative';
			itemBox[i].querySelector('td').appendChild(wikiButton);
		}
	},

	scriptStyleTabs() {
		document.getElementById('scriptGlobalToggle').style.color = IdleAgain.scriptVars.toggleGlobal ? 'green' : 'red';
		document.getElementById('scriptLoginToggle').style.color = JSON.parse(localStorage.getItem('autoLogin')) ? 'green' : 'red';
		document.getElementById('scriptGeodeToggle').style.color = IdleAgain.scriptVars.toggleGeodeOpen ? 'green' : 'red';
		document.getElementById('scriptMineralToggle').style.color = IdleAgain.scriptVars.toggleMineralIdentify ? 'green' : 'red';
		document.getElementById('scriptNecklaceToggle').style.color = IdleAgain.scriptVars.toggleNecklaceCharge ? 'green' : 'red';
		document.getElementById('scriptTrainToggle').style.color = IdleAgain.scriptVars.toggleTrain ? 'green' : 'red';
		document.getElementById('scriptTrainAmount').value = IdleAgain.scriptVars.scriptTrainAmount;
		document.getElementById('scriptRocketToggle').style.color = IdleAgain.scriptVars.toggleRocket ? 'green' : 'red';
		document.getElementById('scriptRocketDestination').value = IdleAgain.scriptVars.scriptRocket;
		document.getElementById('scriptSmeltingToggle').style.color = IdleAgain.scriptVars.toggleSmelting ? 'green' : 'red';
		document.getElementById('scriptRefinaryToggle').style.color = IdleAgain.scriptVars.toggleRefinary ? 'green' : 'red';
		document.getElementById('scriptRefinaryOptions').value = IdleAgain.scriptVars.scriptRefinaryBar;
		document.getElementById('scriptFoundryToggle').style.color = IdleAgain.scriptVars.toggleCharcoal ? 'green' : 'red';
		document.getElementById('scriptFoundryWoodOptions').value = IdleAgain.scriptVars.scriptFoundryWood;
		document.getElementById('scriptLumberToggle').style.color = IdleAgain.scriptVars.toggleWoodcutting ? 'green' : 'red';
		document.getElementById('treeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.tree ? 'green' : 'red';
		document.getElementById('oakTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.oakTree ? 'green' : 'red';
		document.getElementById('willowTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.willowTree ? 'green' : 'red';
		document.getElementById('mapleTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.mapleTree ? 'green' : 'red';
		document.getElementById('redwoodTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.redwoodTree ? 'green' : 'red';
		document.getElementById('pineTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.pineTree ? 'green' : 'red';
		document.getElementById('hauntedTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.hauntedTree ? 'green' : 'red';
		document.getElementById('jungleTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.jungleTree ? 'green' : 'red';
		document.getElementById('lavaTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.lavaTree ? 'green' : 'red';
		document.getElementById('goldTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.goldTree ? 'green' : 'red';
		document.getElementById('magicTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.magicTree ? 'green' : 'red';
		document.getElementById('appleTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.appleTree ? 'green' : 'red';
		document.getElementById('cactusTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.cactusTree ? 'green' : 'red';
		document.getElementById('bananaTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.bananaTree ? 'green' : 'red';
		document.getElementById('palmTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.palmTree ? 'green' : 'red';
		document.getElementById('pineappleTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.pineappleTree ? 'green' : 'red';
		document.getElementById('starfruitTreeIgnoreToggle').style.color = IdleAgain.scriptVars.scriptTreeIgnore.starfruitTree ? 'green' : 'red';
		document.getElementById('scriptFarmingToggle').style.color = IdleAgain.scriptVars.toggleFarming ? 'green' : 'red';
		document.getElementById('scriptBonesToggle').style.color = IdleAgain.scriptVars.toggleBones ? 'green' : 'red';
		document.getElementById('bonesIgnoreToggle').style.color = IdleAgain.scriptVars.scriptBonesIgnore.bones ? 'green' : 'red';
		document.getElementById('ashesIgnoreToggle').style.color = IdleAgain.scriptVars.scriptBonesIgnore.ashes ? 'green' : 'red';
		document.getElementById('iceBonesIgnoreToggle').style.color = IdleAgain.scriptVars.scriptBonesIgnore.iceBones ? 'green' : 'red';
		document.getElementById('zombieBonesIgnoreToggle').style.color = IdleAgain.scriptVars.scriptBonesIgnore.zombieBones ? 'green' : 'red';
		document.getElementById('bloodBonesIgnoreToggle').style.color = IdleAgain.scriptVars.scriptBonesIgnore.bloodBones ? 'green' : 'red';
		document.getElementById('fishBonesIgnoreToggle').style.color = IdleAgain.scriptVars.scriptBonesIgnore.fishBones ? 'green' : 'red';
		document.getElementById('scriptFertilizeToggle').style.color = IdleAgain.scriptVars.toggleFertilize ? 'green' : 'red';
		document.getElementById('MushroomFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.redMushroomSeeds ? 'green' : 'red';
		document.getElementById('dottedGreenFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.dottedGreenLeafSeeds ? 'green' : 'red';
		document.getElementById('greenLeafFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.greenLeafSeeds ? 'green' : 'red';
		document.getElementById('limeLeafFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.limeLeafSeeds ? 'green' : 'red';
		document.getElementById('goldLeafFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.goldLeafSeeds ? 'green' : 'red';
		document.getElementById('crystalLeafFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.crystalLeafSeeds ? 'green' : 'red';
		document.getElementById('stripedGreenLeafFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.stripedGreenLeafSeeds ? 'green' : 'red';
		document.getElementById('stripedGoldLeafFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.stripedGoldLeafSeeds ? 'green' : 'red';
		document.getElementById('stripedCrystalLeafFertilizeToggle').style.color = IdleAgain.scriptVars.scriptFertilize.stripedCrystalLeafSeeds ? 'green' : 'red';
		document.getElementById('scriptDrinkToggle').style.color = IdleAgain.scriptVars.toggleDrink ? 'green' : 'red';
		document.getElementById('scriptBrewToggle').style.color = IdleAgain.scriptVars.toggleBrew ? 'green' : 'red';
		document.getElementById('scriptTreeUpgradeToggle').style.color = IdleAgain.scriptVars.toggleTreeUpgrade ? 'green' : 'red';
		document.getElementById('treeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.tree ? 'green' : 'red';
		document.getElementById('oakTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.oakTree ? 'green' : 'red';
		document.getElementById('willowTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.willowTree ? 'green' : 'red';
		document.getElementById('mapleTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.mapleTree ? 'green' : 'red';
		document.getElementById('redwoodTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.redwoodTree ? 'green' : 'red';
		document.getElementById('pineTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.pineTree ? 'green' : 'red';
		document.getElementById('hauntedTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.hauntedTree ? 'green' : 'red';
		document.getElementById('jungleTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.jungleTree ? 'green' : 'red';
		document.getElementById('lavaTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.lavaTree ? 'green' : 'red';
		document.getElementById('goldTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.goldTree ? 'green' : 'red';
		document.getElementById('magicTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.magicTree ? 'green' : 'red';
		document.getElementById('appleTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.appleTree ? 'green' : 'red';
		document.getElementById('cactusTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.cactusTree ? 'green' : 'red';
		document.getElementById('bananaTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.bananaTree ? 'green' : 'red';
		document.getElementById('palmTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.palmTree ? 'green' : 'red';
		document.getElementById('pineappleTreeUpgradeToggle').style.color = IdleAgain.scriptVars.scriptTreeUpgrade.pineappleTree ? 'green' : 'red';
		document.getElementById('fieldsStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.fields ? 'green' : 'red';
		document.getElementById('forestsStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.forests ? 'green' : 'red';
		document.getElementById('cavesStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.caves ? 'green' : 'red';
		document.getElementById('volcanoStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.volcano ? 'green' : 'red';
		document.getElementById('northernFieldsStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.northernFields ? 'green' : 'red';
		document.getElementById('hauntedMansionStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.hauntedMansion ? 'green' : 'red';
		document.getElementById('desertStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.desert ? 'green' : 'red';
		document.getElementById('oceanStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.ocean ? 'green' : 'red';
		document.getElementById('jungleStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.jungle ? 'green' : 'red';
		document.getElementById('dungeonEntranceStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.dungeonEntrance ? 'green' : 'red';
		document.getElementById('dungeonStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.dungeon ? 'green' : 'red';
		document.getElementById('castleStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.castle ? 'green' : 'red';
		document.getElementById('cemeteryStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.cemetery ? 'green' : 'red';
		document.getElementById('factoryStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.factory ? 'green' : 'red';
		document.getElementById('hauntedWoodsStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.hauntedWoods ? 'green' : 'red';
		document.getElementById('deepOceanStrengthToggle').style.color = IdleAgain.scriptVars.scriptStrength.deepOcean ? 'green' : 'red';
		document.getElementById('scriptExploreToggle').style.color = IdleAgain.scriptVars.toggleExplore ? 'green' : 'red';
		document.getElementById('scriptAreaOptions').value = IdleAgain.scriptVars.scriptArea;
		IdleAgain.monsterOptions(IdleAgain.scriptVars.scriptArea);
		document.getElementById('scriptFightToggle').style.color = IdleAgain.scriptVars.toggleFight ? 'green' : 'red';
		document.getElementById('fieldsResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.fields ? 'green' : 'red';
		document.getElementById('forestsResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.forests ? 'green' : 'red';
		document.getElementById('cavesResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.caves ? 'green' : 'red';
		document.getElementById('volcanoResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.volcano ? 'green' : 'red';
		document.getElementById('northernFieldsResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.northernFields ? 'green' : 'red';
		document.getElementById('hauntedMansionResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.hauntedMansion ? 'green' : 'red';
		document.getElementById('desertResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.desert ? 'green' : 'red';
		document.getElementById('oceanResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.ocean ? 'green' : 'red';
		document.getElementById('jungleResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.jungle ? 'green' : 'red';
		document.getElementById('dungeonEntranceResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.dungeonEntrance ? 'green' : 'red';
		document.getElementById('dungeonResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.dungeon ? 'green' : 'red';
		document.getElementById('castleResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.castle ? 'green' : 'red';
		document.getElementById('cemeteryResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.cemetery ? 'green' : 'red';
		document.getElementById('factoryResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.factory ? 'green' : 'red';
		document.getElementById('hauntedWoodsResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.hauntedWoods ? 'green' : 'red';
		document.getElementById('deepOceanResetToggle').style.color = IdleAgain.scriptVars.scriptResetArea.deepOcean ? 'green' : 'red';
		document.getElementById('scriptResetToggle').style.color = IdleAgain.scriptVars.toggleResetFight ? 'green' : 'red';
		document.getElementById('scriptMonsterOptions').value = IdleAgain.scriptVars.scriptMonster;
		document.getElementById('scriptMonsterFindToggle').style.color = IdleAgain.scriptVars.toggleMonsterFind ? 'green' : 'red';
		document.getElementById('scriptShinyToggle').style.color = IdleAgain.scriptVars.toggleShiny ? 'green' : 'red';
		document.getElementById('scriptSpellToggle').style.color = IdleAgain.scriptVars.toggleSpell ? 'green' : 'red';
		document.getElementById('scriptCombatPotionToggle').style.color = IdleAgain.scriptVars.toggleCombatPotion ? 'green' : 'red';
		document.getElementById('scriptHealToggle').style.color = IdleAgain.scriptVars.toggleHeal ? 'green' : 'red';
		document.getElementById('scriptBloodMoonToggle').style.color = IdleAgain.scriptVars.toggleBM ? 'green' : 'red';
		document.getElementById('scriptCousinToggle').style.color = IdleAgain.scriptVars.toggleCousin ? 'green' : 'red';
		document.getElementById('scriptCousinArea').value = IdleAgain.scriptVars.scriptCousinArea;
		document.getElementById('scriptBagsToggle').style.color = IdleAgain.scriptVars.toggleBags ? 'green' : 'red';
		document.getElementById('scriptFieldsBagsToggle').style.color = IdleAgain.scriptVars.toggleFieldsBags ? 'green' : 'red';
		document.getElementById('scriptStatueToggle').style.color = IdleAgain.scriptVars.toggleStatue ? 'green' : 'red';
		document.getElementById('scriptArtifactToggle').style.color = IdleAgain.scriptVars.toggleArtifact ? 'green' : 'red';
		document.getElementById('scriptBoatToggle').style.color = IdleAgain.scriptVars.toggleBoat ? 'green' : 'red';
		document.getElementById('rowBoatSendToggle').style.color = IdleAgain.scriptVars.scriptBoatSend.rowBoat ? 'green' : 'red';
		document.getElementById('canoeBoatSendToggle').style.color = IdleAgain.scriptVars.scriptBoatSend.canoeBoat ? 'green' : 'red';
		document.getElementById('sailBoatSendToggle').style.color = IdleAgain.scriptVars.scriptBoatSend.sailBoat ? 'green' : 'red';
		document.getElementById('highWindSendToggle').style.color = IdleAgain.scriptVars.scriptBoatSend.highWind ? 'green' : 'red';
		document.getElementById('steamBoatSendToggle').style.color = IdleAgain.scriptVars.scriptBoatSend.steamBoat ? 'green' : 'red';
		document.getElementById('trawlerSendToggle').style.color = IdleAgain.scriptVars.scriptBoatSend.trawler ? 'green' : 'red';
		document.getElementById('scriptAutoScroll').src = IdleAgain.scriptVars.chatAutoScroll ? 'images/check.png' : 'images/x.png';
	},

	saveOreOrder() {
		let key = `idleAgain-oreOrder${username}`;
		let oreItems = document.getElementById("sortableOres").getElementsByTagName("li");
		let oreOrder = [];

		for (let i = 0; i < oreItems.length; i++) {
			let oreValue = oreItems[i].getAttribute("value");
			let oreMinimum = oreItems[i].querySelector(".oreMinimum").value;

			oreOrder.push({
				value: oreValue,
				minimum: oreMinimum
			});
		}

		localStorage.setItem(key, JSON.stringify(oreOrder));
	},

	loadOreOrder() {
		let key = `idleAgain-oreOrder${username}`;
		let oreOrderData = localStorage.getItem(key);

		if (oreOrderData) {
			oreOrderData = JSON.parse(oreOrderData);
			let oreOrderList = document.getElementById("sortableOres");

			for (let i = 0; i < oreOrderData.length; i++) {
				let oreValue = oreOrderData[i].value;
				let minimum = oreOrderData[i].minimum;
				let oreItem = oreOrderList.querySelector("[value='" + oreValue + "']");

				oreOrderList.appendChild(oreItem);
				let oreMinimum = oreItem.querySelector(".oreMinimum");
				oreMinimum.value = minimum;
			}
		}
	},

	saveSeedOrder() {
		let key = `idleAgain-seedOrder${username}`;
		let seedOrderList = document.getElementById("sortableSeeds");
		let seedItems = seedOrderList.getElementsByTagName("li");
		let seedOrder = [];

		for (let i = 0; i < seedItems.length; i++) {
			let seedValue = seedItems[i].getAttribute("value");
			let seedCheckbox = seedItems[i].querySelector(".seed-checkbox");
			let isChecked = seedCheckbox.checked;

			seedOrder.push({
				value: seedValue,
				checked: isChecked
			});
		}

		localStorage.setItem(key, JSON.stringify(seedOrder));
	},

	loadSeedOrder() {
		let key = `idleAgain-seedOrder${username}`;
		let seedOrderData = localStorage.getItem(key);

		if (seedOrderData) {
			seedOrderData = JSON.parse(seedOrderData);
			let seedOrderList = document.getElementById("sortableSeeds");

			for (let i = 0; i < seedOrderData.length; i++) {
				let seedValue = seedOrderData[i].value;
				let isChecked = seedOrderData[i].checked;
				let seedItem = seedOrderList.querySelector("[value='" + seedValue + "']");
				let seedCheckbox = seedItem.querySelector(".seed-checkbox");

				if (isChecked) {
					seedCheckbox.checked = true;
				} else {
					seedCheckbox.checked = false;
				}

				seedOrderList.appendChild(seedItem);
			}
		}
	},

	savePotions() {
		let key = `idleAgain-potionState${username}`;
		let potionList = document.getElementById("sortablePotions");
		let potionItems = potionList.getElementsByTagName("li");
		let potionState = [];

		for (let i = 0; i < potionItems.length; i++) {
			let potionValue = potionItems[i].getAttribute("value");
			let drinkCheckbox = potionItems[i].querySelector(".drink-checkbox");
			let brewCheckbox = potionItems[i].querySelector(".brew-checkbox");
			let isDrinkChecked = drinkCheckbox.checked;
			let isBrewChecked = brewCheckbox.checked;

			potionState.push({
				value: potionValue,
				drinkChecked: isDrinkChecked,
				brewChecked: isBrewChecked
			});
		}

		localStorage.setItem(key, JSON.stringify(potionState));
	},

	loadPotions() {
		let key = `idleAgain-potionState${username}`;
		let potionState = localStorage.getItem(key);

		if (potionState) {
			potionState = JSON.parse(potionState);
			let potionList = document.getElementById("sortablePotions");
			let potionItems = potionList.getElementsByTagName("li");

			for (let i = 0; i < potionState.length; i++) {
				let potionValue = potionState[i].value;
				let drinkCheckbox = potionItems[i].querySelector(".drink-checkbox");
				let brewCheckbox = potionItems[i].querySelector(".brew-checkbox");
				let isDrinkChecked = potionState[i].drinkChecked;
				let isBrewChecked = potionState[i].brewChecked;

				drinkCheckbox.checked = isDrinkChecked;
				brewCheckbox.checked = isBrewChecked;
			}
		}
	},

	scriptExportConfig() {
		let saveData = '';
		saveData += JSON.stringify(scriptVars) + ',,,';
		saveData += localStorage.getItem(`idleAgain-oreOrder${IdleAgain.username}`) !== null ? localStorage.getItem(`idleAgain-oreOrder${IdleAgain.username}`) + ',,,' : 'empty,,,';
		saveData += localStorage.getItem(`idleAgain-potionState${IdleAgain.username}`) !== null ? localStorage.getItem(`idleAgain-potionState${IdleAgain.username}`) + ',,,' : 'empty,,,';
		saveData += localStorage.getItem(`idleAgain-seedOrder${IdleAgain.username}`) !== null ? localStorage.getItem(`idleAgain-seedOrder${IdleAgain.username}`) : 'empty';
		let a = document.createElement("a");
		let file = new Blob([saveData], {
			type: 'text/plain'
		});
		a.href = URL.createObjectURL(file);
		a.download = 'IdleAgain-' + username;
		a.click();
	},

	monsterOptions(monsterArea) {
		const enemiesInArea = vanillaEnemies[monsterArea];
		let select = document.getElementById("scriptMonsterOptions");
		select.innerHTML = "";

		for (let i = 0; i < enemiesInArea.length; i++) {
			let option = document.createElement("option");
			let optionText = enemiesInArea[i].replace(/([A-Z0-9])/g, ' $1').trim();
			option.value = enemiesInArea[i];
			option.text = optionText.charAt(0).toUpperCase() + optionText.slice(1);
			select.appendChild(option);
		}
	},

	//Chat
	sendChat() {
		let inputValue = document.getElementById('message-body').value.slice(-150);
		if (blockedHTML.some(item => inputValue.includes(item))) {
			inputValue = '';
			showMessage("<b>Something you sent is not allowed to be send, please remove anything that can cause problems to others before trying again.</b>", 'ChatBot');
		} else if (inputValue.match(/img=(["].*?["])/g)) {
			inputValue = inputValue.replace(/img=(["].*?["])/g, '<img src=$1 class="img-small">');
			publishMessage(inputValue);
		} else {
			publishMessage(inputValue);
		}
		document.getElementById('message-body').value = '';
	},

	clearChat() {
		document.getElementById('messages').innerHTML = '';
	},

	autoScroll() {
		IdleAgain.scriptVars.chatAutoScroll = !IdleAgain.scriptVars.chatAutoScroll;
		document.getElementById('scriptAutoScroll').src = IdleAgain.scriptVars.chatAutoScroll ? 'images/check.png' : 'images/x.png';
	},

	chatHelp() {
		showMessage('Use <b>img="image-url"</b> to send images<br>Use "/help" to see all bot commands', 'ChatBot');
	},

	showMessage(msg, sender) {
		if (blockedHTML.some(item => msg.includes(item))) {
			msg = 'This message was blocked for safety';
		}
		if (msg.startsWith('https') || msg.startsWith('www')) {
			msg = '<a href=' + msg + ' target="_blank">' + msg + '</a>';
		}
		let messageContainer = document.createElement('div');
		let senderElement = document.createElement('strong');
		const date = new Date();
		const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		senderElement.innerText = '[' + hour + ':' + min + '] ' + sender + ": ";
		messageContainer.appendChild(senderElement);
		let message = document.createElement('span');
		message.innerHTML = msg;
		messageContainer.style.overflowWrap = "break-word";
		messageContainer.appendChild(message);
		let messageArea = document.getElementById('messages');
		messageArea.appendChild(messageContainer);
		if (msg.includes('@' + username) || (msg.includes('@everyone') && sender == 'felipewolf')) {
			message.style.backgroundColor = 'gold';
			ding.play();
		}
		if (IdleAgain.scriptVars.chatAutoScroll) {
			messageArea.scrollTop = messageArea.scrollHeight;
		}
	},

	setupPubNub() {
		// Update this block with your publish/subscribe keys
		pubnub = new PubNub({
			publishKey: "pub-c-dc687e48-701e-473a-bbce-091329dcb723",
			subscribeKey: "sub-c-feab3982-e3f8-4dec-ad9c-a82105f20783",
			userId: "myUniqueUserId"
		});
		// add listener
		const listener = {
			status: (statusEvent) => {
				if (statusEvent.category === "PNConnectedCategory") {
					console.log("Connected");
				}
			},
			message: (messageEvent) => {
				showMessage(messageEvent.message.description, messageEvent.message.sender);
			}
		};
		pubnub.addListener(listener);

		// subscribe to a channel
		pubnub.subscribe({
			channels: ["hello_world"]
		});
	},

	// publish message
	async publishMessage(message) {
		// With the right payload, you can publish a message, add a reaction to a message,
		// send a push notification, or send a small payload called a signal.
		const publishPayload = {
			channel: "hello_world",
			message: {
				title: "greeting",
				description: message,
				sender: username
			}
		};
		await pubnub.publish(publishPayload);
	},

	toggleEmojiPicker() {
		let emojiPicker = document.getElementById("div-emojis");
		emojiPicker.style.display = (emojiPicker.style.display === "none" || emojiPicker.style.display === "") ? "block" : "none";
	},

	initialize() {
		setupPubNub(); //Chat
		scriptAddTabs();
		initLoginNotifications();

		if (JSON.parse(localStorage.getItem('IANotification'))) {
			alert('You need to config the Idle Again Script');
			localStorage.setItem('IANotification', true);
		}
		
		//IdleAgain.addCombatUI();
		document.addEventListener("keydown", IdleAgain.handleKeyDown);
	},

	initLoginNotifications() {
		let loginObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutationRecord) {
				if (document.getElementById("game-screen").style.display !== "none") {
					navigate('exploreSelect');
					navigate('main');
					setTimeout(function() {
						onLogin()
					}, 10000);
				}
			});
		});

		let loginTarget = document.getElementById('game-screen');
		loginObserver.observe(loginTarget, {
			attributes: true,
			attributeFilter: ['style']
		});


		let reloadObserver = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutationRecord) {
				if (document.getElementById("dialogue-reconnecting").style.display !== "none") {
					IdleAgain.logTime("Reloading")
					setTimeout(function() {
						IdleAgain.location.reload();
					}, 10000);
				}
			});
		});

		let reloadTarget = document.getElementById('dialogue-reconnecting');
		reloadObserver.observe(reloadTarget, {
			attributes: true,
			attributeFilter: ['style']
		});
	},

	onLogin() {
		loadUserVars();
		scriptStyleTabs();
		loadSeedOrder();
		loadOreOrder();
		loadPotions();
		
		let teleportCooldown = (teleportSpellUpgraded === 1) ? 300 : 900;
		scriptWaitTeleport = (explorerCooldown > teleportCooldown + 10) ? true : false;

		localStorage.setItem('lastLogin', username);

		const gameLoopInterval = setInterval(function() {
			IdleAgain.autoGameLoop();
		}, 5000);

		const gameLoopSlowInterval = setInterval(function() {
			IdleAgain.autoGameLoopSlow();
		}, 60000);

		const gameLoopFastInterval = setInterval(function() {
			IdleAgain.autoGameLoopFast();
		}, 750);

		const gameLoopVeryFastInterval = setInterval(function() {
			IdleAgain.autoGameLoopVeryFast();
		}, 250);

		IdleAgain.logTime("Logged with " + username);
	},

	handleKeyDown(e) {
		if (document.getElementById("message-body").matches(":focus")) {
			//Send message with Enter
			if (e.key === "Enter") {
				IdleAgain.sendChat();
			}
		} else if (!document.getElementById("tab-customCombat").style.display == "none") {
			switch (e.key) {
				//Presets
				case "1": websocket.send('PRESET_LOAD=1~1'); break;
				case "2": websocket.send('PRESET_LOAD=2~1'); break;
				case "3": websocket.send('PRESET_LOAD=3~1'); break;
				case "4": websocket.send('PRESET_LOAD=4~1'); break;
				case "5": websocket.send('PRESET_LOAD=5~1'); break;

				//Spells
				case "q": IdleAgain.spell('heal'); break;
				case "w": IdleAgain.spell('fire'); break;
				case "e": IdleAgain.spell('reflect'); break;
				case "r": IdleAgain.spell('invisibility'); break;
				case "t": IdleAgain.spell('invisibility'); break;
				case "y": IdleAgain.spell('invisibility'); break;
				case "q": IdleAgain.spell('heal'); break;

				//Potions
				case "a": IdleAgain.spell('fire'); break;
				case "s": IdleAgain.spell('reflect'); break;
				case "d": IdleAgain.spell('invisibility'); break;
				case "f": IdleAgain.spell('invisibility'); break;
				case "g": IdleAgain.spell('invisibility'); break;
			}
		}
	},

	autoGameLoop() {
		if (IdleAgain.scriptVars.toggleGlobal) {
			if (IdleAgain.scriptVars.toggleWoodcutting) IdleAgain.autoLumber();
			if (IdleAgain.scriptVars.toggleFertilize) IdleAgain.autoFertilize();
			if (IdleAgain.scriptVars.toggleFarming) IdleAgain.autoPlant();
			if (IdleAgain.scriptVars.toggleDrink) IdleAgain.autoDrink();
			if (IdleAgain.scriptVars.toggleBrew) IdleAgain.autoBrew();
			if (IdleAgain.scriptVars.toggleExplore) IdleAgain.autoExplore();
			if (IdleAgain.scriptVars.toggleFight) IdleAgain.autoFight();
			if (IdleAgain.scriptVars.toggleResetFight) IdleAgain.autoReset();
			if (IdleAgain.scriptVars.toggleCousin) IdleAgain.autoCousin();
			if (IdleAgain.scriptVars.toggleEvent) IdleAgain.autoEvent();
		}
	},

	autoGameLoopSlow() {
		if (IdleAgain.scriptVars.toggleGlobal) {
			if (IdleAgain.scriptVars.toggleTrain) IdleAgain.autoTrain();
			if (IdleAgain.scriptVars.toggleRocket) IdleAgain.autoRocket();
			if (IdleAgain.scriptVars.toggleGeodeOpen) IdleAgain.autoGeodeOpen();
			if (IdleAgain.scriptVars.toggleMineralIdentify) IdleAgain.autoIdentify();
			if (IdleAgain.scriptVars.toggleNecklaceCharge) IdleAgain.autoNecklaceCharge();
			if (IdleAgain.scriptVars.toggleSmelting) IdleAgain.autoSmelt();
			if (IdleAgain.scriptVars.toggleRefinary) IdleAgain.autoRefine();
			if (IdleAgain.scriptVars.toggleCharcoal) IdleAgain.autoFoundry();
			if (IdleAgain.scriptVars.toggleBones) IdleAgain.autoBones();
			if (IdleAgain.scriptVars.toggleTreeUpgrade) IdleAgain.autoTreeUpgrade();
			if (IdleAgain.scriptVars.toggleBM) IdleAgain.autoBM();
			if (IdleAgain.scriptVars.toggleBags) IdleAgain.autoBags();
			if (IdleAgain.scriptVars.toggleFieldsBags) IdleAgain.autoFieldsBags();
			if (IdleAgain.scriptVars.toggleStatue) IdleAgain.autoStatue();
			if (IdleAgain.scriptVars.toggleArtifact) IdleAgain.autoArtifact();
			if (IdleAgain.scriptVars.toggleBoat) IdleAgain.autoBoat();
			if (IdleAgain.scriptVars.toggleMap) IdleAgain.autoMap();
		}
	},

	autoGameLoopFast() {
		if (IdleAgain.scriptVars.toggleGlobal) {
			if (IdleAgain.scriptVars.toggleCombatSwap) IdleAgain.autoCombatSwap();
			if (IdleAgain.scriptVars.toggleSpell) IdleAgain.autoSpell();
			if (monsterName !== "none" && (IdleAgain.scriptVars.toggleShiny || IdleAgain.scriptVars.toggleMonsterFind)) IdleAgain.autoMonsterHunt();
			if (IdleAgain.scriptVars.toggleCombatPotion) IdleAgain.autoCombatPot();
		}
	},

	autoGameLoopVeryFast() {
		if (IdleAgain.scriptVars.toggleGlobal) {
			if (IdleAgain.scriptVars.toggleHeal) IdleAgain.autoHeal();
		}
	}

};
window.IdleAgain = IdleAgain;

//Trick the game into thinking you have the tab visible all the time
Object.defineProperty(document, 'hidden', {
	configurable: true,
	get: function() {
		return false;
	}
});

//Make sure the new tabs are hidden too
const oldHideAllTabs = window.hideAllTabs;
window.hideAllTabs = function() {
	oldHideAllTabs();
	document.getElementById("tab-scriptConfig").style.display = "none";
	document.getElementById("tab-scriptConfigMining").style.display = "none";
	document.getElementById("tab-scriptConfigCrafting").style.display = "none";
	document.getElementById("tab-scriptConfigWoodcutting").style.display = "none";
	document.getElementById("tab-scriptConfigFarming").style.display = "none";
	document.getElementById("tab-scriptConfigSeeds").style.display = "none";
	document.getElementById("tab-scriptConfigBrewing").style.display = "none";
	document.getElementById("tab-scriptConfigPotions").style.display = "none";
	document.getElementById("tab-scriptConfigExploring").style.display = "none";
	document.getElementById("tab-scriptConfigCooking").style.display = "none";
};

window.addEventListener("load", IdleAgain.initialize);

//Auto login, sometimes this timeout your account
if (JSON.parse(localStorage.getItem('autoLogin')) === true) {
	let lastUser = localStorage.getItem('lastLogin');
	document.querySelector('#login-preset-' + lastUser + ' tbody tr td:first-child').click();
}
})();