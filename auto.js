// ==UserScript==
// @name         DHM - Idle Again
// @namespace    http://tampermonkey.net/
// @version      1.6
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
	'limeQuartzMineralUnidentified',
	'fluoriteMineralUnidentified',
	'topazMineralUnidentified',
	'blueMarbleMineralUnidentified',
	'sulferMineralUnidentified',
	'purpleQuartzMineralUnidentified',
	'limoniteMineralUnidentified',
	'crystalPrismeMineralUnidentified',
	'clearMarbleMineralUnidentified',
	'denseMarbleMineralUnidentified',
	'jadeMineralUnidentified',
	'opalMineralUnidentified',
	'amethystMineralUnidentified',
	'tashmarineMineralUnidentified',
	'tanzaniteMineralUnidentified',
	'seaCrystalMineralUnidentified',
	'amberMineralUnidentified',
	'smoothPearlMineralUnidentified'
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
const treesArray = [
    "oakTree",
    "willowTree",
    "mapleTree",
    "redwoodTree",
    "pineTree",
    "hauntedTree",
    "jungleTree",
    "lavaTree",
    "goldTree",
    "cactusTree",
    "bananaTree",
    "palmTree",
    "pineappleTree",
];
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
const areasArray = [
	'fields', 'forests', 'caves', 'volcano', 'northern Fields', 'haunted Mansion', 'desert', 'ocean', 'jungle', 'dungeon Entrance', 'dungeon', 'castle', 'cemetery', 'factory', 'haunted Woods', 'deep Ocean'
];
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
};
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
	'<iframe', '<button', '<script', '<html', '<link', '<div', '<footer', 'onclick', '<object', '<embed', '<form', '<meta', 'onmouseover', 'onmouseout', 'onmousemove', '<input', '<applet', 'javascript'
];
const ding = new Audio("https://github.com/Dounford-Felipe/DHM-Audio-Alerts/raw/main/ding.wav");
const sigils = [
	"pumpkin","santa_hat","easter_egg","ghost","tree","blue_party_hat","green_party_hat","pink_party_hat","red_party_hat","white_party_hat","yellow_party_hat","bunny","cat","snowman","carrot","spider","candy_cane","bat","snowflake","basket","basket_egg","skull","gift","chocolate","zombie","reindeer","hatching_chicken","mummy","bell","fancy_bell","mad_bunny"
];
let oldWeapon;
let bestHelmet;
let bestWeapon;
let bestBow;
let bestPoison = null;
let bestMage;
const cookableFood = [
	'rawSardine', 'rawChicken', 'rawTuna', 'rawSnail', 'rawPiranha', 'rawSwordfish', 'rawSeaTurtle', 'rawLobster', 'rawEel', 'rawShark', 'rawCrab', 'rawMantaRay', 'rawBloodChicken', 'rawWhale', 'rawRainbowFish'
];
(function () {
    'use strict';
const IdleAgain = {
	//Store vars that will be watched
	props: {
		username: "",
		monsterName: "none",
		heroHp: 0,
	},

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
		"toggleTreeDowngrade": false,
		"toggleBrew": false,
		"toggleExplore": false,
		"toggleFight": false,
		"toggleResetFight": false,
		"toggleMonsterFind": false,
		"toggleSpell": false,
		"lifeStealThreshold": 8,
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
		"scriptTreeDowngrade": {
			"tree": false,
			"oakTree": false,
			"willowTree": false,
			"mapleTree": false,
			"redwoodTree": false,
			"pineTree": false,
			"hauntedTree": false,
			"jungleTree": false,
			"lavaTree": false,
			"goldTree": false,
			"magicTree": false,
			"appleTree": false,
			"cactusTree": false,
			"bananaTree": false,
			"palmTree": false,
			"pineappleTree": false,
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
		"chatAutoScroll": true,
		"chatSigil": "none"
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
			setTimeout(IdleAgain.eventGlowing,300);
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
				sendBytes('OPEN_MULTIPLE_GEODE=geode' + i + '~' + window["geode" + i]);
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
		sendBytes("MINERAL_NECKLACE_ADD_TIME");
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
			let upgradeable = null;
			let timerLeft = Infinity;
			for (let i = 1; i < 7; i++) {
				if (window["woodcuttingUpgradePotionUsed" + i] == 0 && IdleAgain.scriptVars.scriptTreeUpgrade[window["tree" + i]] && window["treeTimer" + i] < timerLeft) {
					timerLeft = window["treeTimer" + i];
					upgradeable = i;
				}
			}
			if (upgradeable !== null) {
				this.logTime(window["tree" + upgradeable] + " upgraded")
				sendBytes('POTION_UPGRADE_TREE=' + upgradeable);
			}
		}
	},

	autoTreeDowngrade() {
		if (woodcuttingDowngradePotionCooldown == 0 && woodcuttingDowngradePotion >= 1) {
			let downgradeable = null;
			let timerLeft = Infinity;
			for (let i = 1; i < 7; i++) {
				if (typeof window["woodcuttingDowngradePotionUsed" + i] !== "undefined" && window["woodcuttingDowngradePotionUsed" + i] == 0 && IdleAgain.scriptVars.scriptTreeDowngrade[window["tree" + i]] && window["treeTimer" + i] < timerLeft) {
					timerLeft = window["treeTimer" + i];
					downgradeable = i;
				}
			}
			if (downgradeable !== null) {
				this.logTime(window["tree" + upgradeable] + " upgraded");
				sendBytes('POTION_DOWNGRADE_TREE=' + downgradeable);
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
		if (explorerCooldown == 0 && monsterName == "none") {
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
			if (IdleAgain.scriptVars.toggleShiny || IdleAgain.scriptVars.toggleMonsterFind) {
				scriptWaitTeleport = true;
			} else {
				scriptWaitTeleport = false;
			}
			bestHelmet = tridentSoldierHelmetPlus > 0 ? 'tridentSoldierHelmetPlus' : typeof tridentSoldierHelmet !== 'undefined' ? 'tridentSoldierHelmet' : 'titaniumHelmet';
			bestWeapon = typeof silverScimitar !== 'undefined' ? 'silverScimitar' : typeof superPoisonTrident !== 'undefined' ? 'superPoisonTrident' : typeof trident !== 'undefined' ? 'trident' : typeof mace !== 'undefined' ? 'mace' : typeof scythe !== 'undefined' ? 'scythe' : 'skeletonSword';
			bestBow = typeof enhcantedSuperBow !== "undefined" ? "enhcantedSuperBow" : typeof superBow !== "undefined" ? "superBow" : "bow";
			bestPoison = typeof superPoisonTrident !== 'undefined' ? 'superPoisonTrident' : superPoisonSpear > 0 ? 'superPoisonSpear' : typeof poisonSpear !== 'undefined' ? 'poisonSpear' : null;
			bestMage = (bloodReaperTop > 0 && bloodReaperBottom > 0 && bloodReaperHood > 0) ? 'bloodReaper' : (darkMageTop > 0 && darkMageBottom > 0 && darkMageHood > 0) ? 'darkMage' : null;
		}
	},

	autoFight() {
		if (fightDone === 0 && exploringArea !== 'none' && monsterName == "none") {
			let teleportCooldown = (teleportSpellUpgraded === 1) ? 300 : 900;
			scriptWaitTeleport = (explorerCooldown > teleportCooldown + 10) ? true : false;
			if (scriptWaitTeleport === false || (scriptWaitTeleport && teleportSpellCooldown === 0)) {
				if (infectedTimer > 0) {
					sendBytes('DRINK=cureInfectionPotion');
				}
				sendBytes('LOOK_FOR_FIGHT');
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

	canPoison() {
		return poisonEnemyTimer !== 1 && bestPoison !== null && (ignoreDefenceCombatPotionUsed == 0 || monsterDefence == 0 || ignoreDefenceCombatPotionEnemyTimer != 0)
	},

	autoPoison() {
		if (IdleAgain.canPoison()) {
			if (typeof ignoreDefenceCombatPotion !== 'undefined' && ignoreDefenceCombatPotionUsed == 0 && (ignoreDefenceCombatPotionFree == 1 || ignoreDefenceCombatPotion >= 1)) {
				sendBytes('DRINK_COMBAT_POTION=ignoreDefenceCombatPotion');
			}
			clicksItem(bestPoison);
			const poisonInterval = setInterval(() => {
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
			monsterName !== 'none' && exploringArea !== 'none' && !shield.includes('Feed') && monsterName !== 'gemGoblin' && monsterName !== 'bloodGemGoblin' && shinyMonster == 0) {
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
		if (hpCombatPotionUsed == 0 && (hpCombatPotion >= 1 || hpCombatPotionFree == 1)) {
			sendBytes('DRINK_COMBAT_POTION=hpCombatPotion');
		} else if (superHpCombatPotionUsed == 0 && (superHpCombatPotion >= 1 || typeof superHpCombatPotionFree !== 'undefined')) {
			sendBytes('DRINK_COMBAT_POTION=superHpCombatPotion');
		} else if (teleportSpellCooldown == 0 && teleportSpell == 1) {
			sendBytes('CAST_COMBAT_SPELL=teleportSpell');
		}
	},

	autoSpell() {
		if (monsterName == 'none' || fightStartTimer !== 0) {
			return;
		};

		if (reflectSpell == 1 && reflectSpellCooldown == 0) {
			const isRobotMage = monsterName !== 'robotMage' || robotMageCharge !== 0;
			const isDragon = monsterName !== 'dragon' || dragonFireCharge == 4;
			const isSkeletonCemetery = !monsterName.includes('keletonCemetery') ||  monsterCharge !== 0;
			const isReflecting = reflectSpellEnemyTimer == 0;
			if (isReflecting && isDragon && isRobotMage && isSkeletonCemetery) {
				sendBytes('CAST_COMBAT_SPELL=reflectSpell')
			}
		}

		if (fireSpell == 1 && fireSpellCooldown == 0) {
			if (bestMage === null) {
				sendBytes('CAST_COMBAT_SPELL=fireSpell')
			} else {
				IdleAgain.spellWithMage("fire")
			}
		}
		
		if (thunderStrikeSpell == 1 && thunderStrikeSpellCooldown == 0) {
			if (bestMage === null) {
				sendBytes('CAST_COMBAT_SPELL=thunderStrikeSpell')
			} else {
				IdleAgain.spellWithMage("thunderStrike")
			}
		}

		if (lifeStealSpell == 1 && lifeStealSpellCooldown == 0 && heroHp <= IdleAgain.scriptVars.lifeStealThreshold) {
			sendBytes('CAST_COMBAT_SPELL=lifeStealSpell')
			if (ranged.includes(weapon)) {
				oldWeapon = weapon;
				clicksItem(bestWeapon)
				const lsInterval = setInterval(() => {
					if (lifeStealSpellEnemyTimer == 0) {
						clicksItem(oldWeapon);
						clearInterval(lsInterval);
					}
				}, 2000);
			}
		}

		if (sandstormSpell == 1 && sandstormSpellCooldown == 0) {
			if (bestMage === null) {
				sendBytes('CAST_COMBAT_SPELL=sandstormSpell')
			} else {
				IdleAgain.spellWithMage("sandstorm")
			}
		}
	},

	spellWithMage(spell) {
		const oldHead = head
		const oldBody = body
		const oldLeg = leg

		clicksItem(bestMage + "Hood");
		clicksItem(bestMage + "Top");
		clicksItem(bestMage + "Bottom");
		
		if (staff >= 1) {
			oldWeapon = IdleAgain.canPoison() ? bestPoison : (lifeStealSpellEnemyTimer != 0 && ranged.includes(presetWeapon1)) ? bestWeapon : presetWeapon1
			clicksItem("staff");
		}

		sendBytes("CAST_COMBAT_SPELL=" + spell + "Spell");
		
		clicksItem(oldHead);
		clicksItem(oldBody);
		clicksItem(oldLeg);
		
		if (weapon == 'staff') {
			clicksItem(oldWeapon);
		}
	},

	autoCombatPot() {
		if (ghostScanCombatPotionUsed == 0 && (ghostScanCombatPotionFree == 1 || ghostScanCombatPotion >= 1)) {
			sendBytes('DRINK_COMBAT_POTION=ghostScanCombatPotion');
		}
		setTimeout(() => {
			if (monsterName !== "none" && strengthCombatPotionUsed == 0 && (strengthCombatPotionFree == 1 || (IdleAgain.scriptVars.scriptStrength[exploringArea] && strengthCombatPotion >= 1))) {
				sendBytes('DRINK_COMBAT_POTION=strengthCombatPotion');
			}
		}, 3000);
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
		bestPoison = typeof superPoisonTrident !== 'undefined' ? 'superPoisonTrident' : superPoisonSpear > 0 ? 'superPoisonSpear' : typeof poisonSpear !== 'undefined' ? 'poisonSpear' : null;
		bestMage = (bloodReaperTop > 0 && bloodReaperBottom > 0 && bloodReaperHood > 0) ? 'bloodReaper' : (darkMageTop > 0 && darkMageBottom > 0 && darkMageHood > 0) ? 'darkMage' : null;
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
		if (variValue == "toggle") {
			IdleAgain.scriptVars[variName] = !IdleAgain.scriptVars[variName];
		} else {
			IdleAgain.scriptVars[variName] = variValue;
		}
		localStorage.setItem(key, JSON.stringify(IdleAgain.scriptVars));
		if (typeof id !== 'undefined') {
			document.getElementById(id).style.color = IdleAgain.scriptVars[variName] ? "green" : "red";
		}
		this.logTime(variName + ' ' + variValue + ' ' + id);
	},

	autoChangeObject(variName, variKey, variValue, id) {
		let key = `idleAgain-${username}`;
		if (variValue == "toggle") {
			IdleAgain.scriptVars[variName][variKey] = !IdleAgain.scriptVars[variName][variKey];
		} else {
			IdleAgain.scriptVars[variName][variKey] = variValue;
		}
		localStorage.setItem(key, JSON.stringify(IdleAgain.scriptVars));
		if (typeof id !== 'undefined') {
			document.getElementById(id).style.color = IdleAgain.scriptVars[variName][variKey] ? "green" : "red";
		}
		this.logTime(variName + ' ' + variKey + ':' + variValue + ' ' + id);
	},

	toggleAutoLogin() {
		const autoLogin = JSON.parse(localStorage.getItem('autoLogin')) || false;
		localStorage.setItem('autoLogin', !autoLogin);
		if (!autoLogin) {
			document.getElementById('IdleAgain-autoLogin').style.color = "green";
		} else {
			document.getElementById('IdleAgain-autoLogin').style.color = "red";
		}
	},

	addStyle() {
		//Fix favicon
		document.head.insertAdjacentHTML("beforeend",'<link rel="icon" type="image/x-icon" href="images/favicon.ico">');

		//Idle again style
		const style = document.createElement('style');
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
			}
			.sigilBtn {
    			background-color: transparent;
    			border: 0;
			}
			.sigilBtn:hover {
    			background-color: bisque;
    			cursor: pointer;
			}
			.chatSigil {
				width: 25px;
				height: 25px;
			}`;
		document.head.appendChild(style);
	},

	addChat() {
		const chatDiv = `<div id="div-chat" style="margin-top: 10px;border: 1px solid silver;background: linear-gradient(rgb(238, 238, 238), rgb(221, 221, 221));padding: 5px;">
			<div style="display: none;position: fixed;top:20vh;" id="div-emojis"></div>
			<div style="display: none;position: fixed;top:20vh;background-color: rgb(150, 150, 150);display: flex;flex-wrap: wrap;justify-content: center;padding: 10px;width:350px" id="div-sigils"></div>
			<div style="margin-bottom:5px;font-weight: bold;color: black;justify-content: space-between;display: flex;">
				<div>
					Chat Box 
					<button onclick="IdleAgain.autoScroll()" style="cursor: pointer;">
						Auto Scroll <img src="images/check.png" class="img-tiny" id="IdleAgain-chatScroll">
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
					<button onclick="IdleAgain.toggleSigilDiv()" style="cursor: pointer;">SIGILS</button>
					<button onclick="IdleAgain.chatHelp()" style="cursor: pointer;">HELP</button>
					<button style="cursor: pointer;border: 1px solid black;border-radius: 12px;padding: 2px;margin-left:3px" id="emojis">&#128512;</button>
				</div>
			</div>
		</div>`
		const logoutTab = document.getElementById('tab-logout');
		logoutTab.insertAdjacentHTML('afterend', chatDiv);

		//Emojis
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
		document.getElementById('emojis').addEventListener('click', IdleAgain.toggleEmojiPicker);
		
		//Sigils
		const sigilDiv = document.getElementById("div-sigils");
		$(sigilDiv).draggable();
		sigils.forEach((sigil) => {
			const sigilBtn = document.createElement("button");
			sigilBtn.className = "sigilBtn";
			const img = new Image(30,30);
			img.src = "https://cdn.idle-pixel.com/images/" + sigil + "_sigil.png";
			img.onload = () => {
				sigilBtn.insertAdjacentElement("beforeend", img);
			}

			sigilBtn.addEventListener("click",()=>{
				IdleAgain.changeSigil(sigil);
			})

			sigilDiv.insertAdjacentElement("beforeend", sigilBtn);
		})

	},

	scriptAddTabs() {
		this.addStyle();
		this.addChat();

		//Add script config button on settings
		const miscTab = document.querySelectorAll("#tab-misc > .main-button")[2];
		const scriptConfBar = `<div onclick="navigate('scriptConfig')" class="main-button" style="cursor: pointer;">
				<table>
					<tbody><tr>
					<td><img src="images/whiteGear.png" class="img-small"></td>
					<td style="text-align:right;padding-right:20px;font-size:12pt;">SCRIPT CONFIG</td>
					</tr>
				</tbody></table>
			</div>`;
		miscTab.insertAdjacentHTML('afterend', scriptConfBar);

		//Config tabs
		const scriptConfTab = `<div id="tab-scriptConfig" style="display:none">
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
				<tr id="IdleAgain-toggleGlobal" onclick="IdleAgain.autoChangeVar('toggleGlobal','toggle',this.id)" style="cursor: pointer; color: green;">
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
				<tr id="IdleAgain-autoLogin" onclick="IdleAgain.toggleAutoLogin()" style="cursor: pointer; color: green;">
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

		const scriptConfMiningTab = `<div id="tab-scriptConfigMining" style="display:none">
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
				<tr id="IdleAgain-toggleGeodeOpen" onclick="IdleAgain.autoChangeVar('toggleGeodeOpen','toggle',this.id)" style="cursor: pointer; color: green;">
					<td style="padding-left: 10px;"><img src="images/geode5.png" class="img-small"></td>
					<td class="idleAgainConfTd">GEODE OPENING</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleMineralIdentify" onclick="IdleAgain.autoChangeVar('toggleMineralIdentify','toggle',this.id)" style="cursor: pointer; color: green;">
					<td style="padding-left: 10px;"><img src="images/tanzaniteMineral.png" class="img-small"></td>
					<td class="idleAgainConfTd">MINERAL IDENTIFY</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleNecklaceCharge" onclick="IdleAgain.autoChangeVar('toggleNecklaceCharge','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/mineralNecklace.png" class="img-small"></td>
					<td class="idleAgainConfTd">NECKLACE CHARGE</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleTrain" onclick="IdleAgain.autoChangeVar('toggleTrain','toggle',this.id)" style="cursor: pointer; color: red;">
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
					<select name="trainAmount" onchange="IdleAgain.autoChangeVar('scriptTrainAmount',this.value)" id="IdleAgain-trainAmount">
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
				<tr id="IdleAgain-toggleRocket" onclick="IdleAgain.autoChangeVar('toggleRocket','toggle',this.id)" style="cursor: pointer; color: red;">
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
					<select name="IdleAgain-rocketDestination" onchange="IdleAgain.autoChangeVar('scriptRocket',this.value)" id="IdleAgain-rocketDestination">
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

		const scriptConfCraftingTab = `<div id="tab-scriptConfigCrafting" style="display:none">
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
				<tr id="IdleAgain-toggleSmelting" onclick="IdleAgain.autoChangeVar('toggleSmelting','toggle',this.id)" style="cursor: pointer; color: green;">
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
				<tr id="IdleAgain-toggleRefinary" onclick="IdleAgain.autoChangeVar('toggleRefinary','toggle',this.id)" style="cursor: pointer; color: red;">
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
					<select name="scriptRefinaryBarOptions" onchange="IdleAgain.autoChangeVar('scriptRefinaryBar',this.value)" id="IdleAgain-refinaryBar">
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
				<tr id="IdleAgain-toggleCharcoal" onclick="IdleAgain.autoChangeVar('toggleCharcoal','toggle',this.id)" style="cursor: pointer; color: red;">
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
					<select name="IdleAgain-foundryWood" onchange="IdleAgain.autoChangeVar('scriptFoundryWood',this.value)" id="IdleAgain-foundryWood">
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

		const scriptConfWoodcuttingTab = `<div id="tab-scriptConfigWoodcutting" style="display:none">
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
				<tr id="IdleAgain-toggleWoodcutting" onclick="IdleAgain.autoChangeVar('toggleWoodcutting','toggle',this.id)" style="cursor: pointer; color: green;">
					<td style="padding-left: 10px;"><img src="images/lumberjack.png" class="img-small"></td>
					<td class="idleAgainConfTd">LUMBERJACK</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
				<tbody style="display: table-row;">
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','tree','toggle',this.id)" id="IdleAgain-treeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/tree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','oakTree','toggle',this.id)" id="IdleAgain-oakTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/oakTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">OAK TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','willowTree','toggle',this.id)" id="IdleAgain-willowTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/willowTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">WILLOW TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','mapleTree','toggle',this.id)" id="IdleAgain-mapleTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/mapleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">MAPLE TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','redwoodTree','toggle',this.id)" id="IdleAgain-redwoodTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/redwoodTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">REDWOOD TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','pineTree','toggle',this.id)" id="IdleAgain-pineTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/pineTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">PINE TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','hauntedTree','toggle',this.id)" id="IdleAgain-hauntedTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">HAUNTED TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','jungleTree','toggle',this.id)" id="IdleAgain-jungleTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/jungleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">JUNGLE TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','lavaTree','toggle',this.id)" id="IdleAgain-lavaTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/lavaTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">LAVA TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','goldTree','toggle',this.id)" id="IdleAgain-goldTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/goldTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">GOLD TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','magicTree','toggle',this.id)" id="IdleAgain-magicTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/magicTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">MAGIC TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','appleTree','toggle',this.id)" id="IdleAgain-appleTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/appleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">APPLE TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','cactusTree','toggle',this.id)" id="IdleAgain-cactusTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/cactusTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">CACTUS TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','bananaTree','toggle',this.id)" id="IdleAgain-bananaTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/bananaTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">BANANA TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','palmTree','toggle',this.id)" id="IdleAgain-palmTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/palmTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">PALM TREE IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','pineappleTree','toggle',this.id)" id="IdleAgain-pineappleTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/pineappleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">PINEAPPLE TREE IGNORE</td>
				</tr>
				<tr style="color: red;" onclick="IdleAgain.autoChangeObject('scriptTreeIgnore','starfuitTree','toggle',this.id)" id="IdleAgain-starfruitTreeIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/starfruitTree.png" class="img-small"></td>
					<td style="text-align: center;">STARFRUIT TREE IGNORE</td>
				</tr>
				</tbody>
			</table>
			</div>`

		const scriptConfFarmingTab = `<div id="tab-scriptConfigFarming" style="display:none">
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
				<tr id="IdleAgain-toggleFarming" onclick="IdleAgain.autoChangeVar('toggleFarming','toggle',this.id)" style="cursor: pointer; color: red;">
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
				<tr id="IdleAgain-toggleBones" onclick="IdleAgain.autoChangeVar('toggleBones','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/bonemealBin.png" class="img-small"></td>
					<td class="idleAgainConfTd">BONEMEAL</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
				<tbody style="display: table-row;">
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','bones','toggle',this.id)" id="IdleAgain-bonesIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/bones.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">BONES IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','ashes','toggle',this.id)" id="IdleAgain-ashesIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/ashes.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">ASHES IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','iceBones','toggle',this.id)" id="IdleAgain-iceBonesIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/iceBones.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">ICE BONES IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','zombieBones','toggle',this.id)" id="IdleAgain-zombieBonesIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/zombieBones.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">ZOMBIE BONES IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','bloodBones','toggle',this.id)" id="IdleAgain-bloodBonesIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/bloodBones.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">BLOOD BONES IGNORE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBonesIgnore','fishBones','toggle',this.id)" id="IdleAgain-fishBonesIgnore">
					<td style="padding-left: 10px;width: 5%;"><img src="images/fishBones.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">FISH BONES IGNORE</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleFertilize" onclick="IdleAgain.autoChangeVar('toggleFertilize','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/fertilizeSoilPotion.png" class="img-small"></td>
					<td class="idleAgainConfTd">FERTILIZE</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
				<tbody style="display: table-row;">
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','redMushroomSeeds','toggle',this.id)" id="IdleAgain-redMushroomSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/redMushroomSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">RED MUSHROOM FERTILIZE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','dottedGreenLeafSeeds','toggle',this.id)" id="IdleAgain-dottedGreenLeafSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/dottedGreenLeafSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">DOTTED GREEN LEAF FERTILIZE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','greenLeafSeeds','toggle',this.id)" id="IdleAgain-greenLeafSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/greenLeafSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">GREEN LEAF FERTILIZE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','limeLeafSeeds','toggle',this.id)" id="IdleAgain-limeLeafSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/limeLeafSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">LIME LEAF FERTILIZE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','goldLeafSeeds','toggle',this.id)" id="IdleAgain-goldLeafSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/goldLeafSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">GOLD LEAF FERTILIZE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','crystalLeafSeeds','toggle',this.id)" id="IdleAgain-crystalLeafSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/crystalLeafSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">CRYSTAL LEAF FERTILIZE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','stripedGreenLeafSeeds','toggle',this.id)" id="IdleAgain-stripedGreenLeafSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/stripedGreenLeafSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">STRIPED GREEN LEAF FERTILIZE</td>
				</tr><tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptFertilize','stripedGoldLeafSeeds','toggle',this.id)" id="IdleAgain-stripedGoldLeafSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/stripedGoldLeafSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">STRIPED GOLD LEAF FERTILIZE</td>
				</tr><tr style="color: red;" onclick="IdleAgain.autoChangeObject('scriptFertilize','stripedCrystalLeafSeeds','toggle',this.id)" id="IdleAgain-stripedCrystalLeafSeedsFertilize">
					<td style="padding-left: 10px;width: 5%;"><img src="images/stripedCrystalLeafSeeds.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">STRIPED CRYSTAL LEAF FERTILIZE</td>
				</tr></tbody>
			</table>
			</div>`

		const scriptConfSeedsTab = `<div id="tab-scriptConfigSeeds" style="display:none">
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

		const scriptConfBrewingTab = `<div id="tab-scriptConfigBrewing" style="display: none;">
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
				<tr id="IdleAgain-toggleDrink" onclick="IdleAgain.autoChangeVar('toggleDrink','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/diamondBrewingKit.png" class="img-small"></td>
					<td class="idleAgainConfTd">POTION DRINK</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleBrew" onclick="IdleAgain.autoChangeVar('toggleBrew','toggle',this.id)" style="cursor: pointer; color: red;">
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
				<tr id="IdleAgain-toggleTreeUpgrade" onclick="IdleAgain.autoChangeVar('toggleTreeUpgrade','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/woodcuttingUpgradePotion.png" class="img-small"></td>
					<td class="idleAgainConfTd">TREE UPGRADE POTION</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
				<tbody style="display: table-row;">
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','tree','toggle',this.id)" id="IdleAgain-treeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/tree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','oakTree','toggle',this.id)" id="IdleAgain-oakTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/oakTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">OAK TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','willowTree','toggle',this.id)" id="IdleAgain-willowTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/willowTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">WILLOW TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','mapleTree','toggle',this.id)" id="IdleAgain-mapleTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/mapleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">MAPLE TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','redwoodTree','toggle',this.id)" id="IdleAgain-redwoodTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/redwoodTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">REDWOOD TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','pineTree','toggle',this.id)" id="IdleAgain-pineTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/pineTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">PINE TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','hauntedTree','toggle',this.id)" id="IdleAgain-hauntedTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">HAUNTED TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','jungleTree','toggle',this.id)" id="IdleAgain-jungleTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/jungleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">JUNGLE TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','lavaTree','toggle',this.id)" id="IdleAgain-lavaTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/lavaTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">LAVA TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','goldTree','toggle',this.id)" id="IdleAgain-goldTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/goldTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">GOLD TREE UPGRADE</td>
				</tr>
				
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','appleTree','toggle',this.id)" id="IdleAgain-appleTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/appleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">APPLE TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','cactusTree','toggle',this.id)" id="IdleAgain-cactusTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/cactusTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">CACTUS TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','bananaTree','toggle',this.id)" id="IdleAgain-bananaTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/bananaTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">BANANA TREE UPGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','palmTree','toggle',this.id)" id="IdleAgain-palmTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/palmTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">PALM TREE UPGRADE</td>
				</tr>
				<tr style="color: green;" onclick="IdleAgain.autoChangeObject('scriptTreeUpgrade','pineappleTree','toggle',this.id)" id="IdleAgain-pineappleTreeUpgrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/pineappleTree.png" class="img-small"></td>
					<td style="text-align: center;">PINEAPPLE TREE UPGRADE</td>
				</tr>
				
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleTreeDowngrade" onclick="IdleAgain.autoChangeVar('toggleTreeDowngrade','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/woodcuttingDowngradePotion.png" class="img-small"></td>
					<td class="idleAgainConfTd">TREE DOWNGRADE POTION</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
				<tbody style="display: table-row;">
				
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','oakTree','toggle',this.id)" id="IdleAgain-oakTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/oakTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">OAK TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','willowTree','toggle',this.id)" id="IdleAgain-willowTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/willowTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">WILLOW TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','mapleTree','toggle',this.id)" id="IdleAgain-mapleTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/mapleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">MAPLE TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','redwoodTree','toggle',this.id)" id="IdleAgain-redwoodTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/redwoodTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">REDWOOD TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','pineTree','toggle',this.id)" id="IdleAgain-pineTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/pineTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">PINE TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','hauntedTree','toggle',this.id)" id="IdleAgain-hauntedTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">HAUNTED TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','jungleTree','toggle',this.id)" id="IdleAgain-jungleTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/jungleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">JUNGLE TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','lavaTree','toggle',this.id)" id="IdleAgain-lavaTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/lavaTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">LAVA TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','goldTree','toggle',this.id)" id="IdleAgain-goldTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/goldTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">GOLD TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','magicTree','toggle',this.id)" id="IdleAgain-magicTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/magicTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">MAGIC TREE DOWNGRADE</td>
				</tr>
				
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','cactusTree','toggle',this.id)" id="IdleAgain-cactusTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/cactusTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">CACTUS TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','bananaTree','toggle',this.id)" id="IdleAgain-bananaTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/bananaTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">BANANA TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','palmTree','toggle',this.id)" id="IdleAgain-palmTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/palmTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">PALM TREE DOWNGRADE</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','pineappleTree','toggle',this.id)" id="IdleAgain-pineappleTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/pineappleTree.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">PINEAPPLE TREE DOWNGRADE</td>
				</tr>
				<tr style="color: red;" onclick="IdleAgain.autoChangeObject('scriptTreeDowngrade','starfuitTree','toggle',this.id)" id="IdleAgain-starfruitTreeDowngrade">
					<td style="padding-left: 10px;width: 5%;"><img src="images/starfruitTree.png" class="img-small"></td>
					<td style="text-align: center;">STARFRUIT TREE DOWNGRADE</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
				<thead>
					<tr><th style="color: white;"><img src="images/strengthCombatPotion.png" class="img-small"> STRENGTH POTION</th>
				</tr></thead>
				<tbody id="strengthTableBody"></tbody>
			</table>
			</div>`

		const scriptConfPotionsTab = `<div id="tab-scriptConfigPotions" style="display:none">
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

		const scriptConfExploringTab = `<div id="tab-scriptConfigExploring" style="display: none;">
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
				<tr id="IdleAgain-toggleExplore" onclick="IdleAgain.autoChangeVar('toggleExplore','toggle',this.id)" style="cursor: pointer; color: red;">
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
					<select name="IdleAgain-areaOptions" onchange="IdleAgain.autoChangeVar('scriptArea',this.value);IdleAgain.monsterOptions(this.value);IdleAgain.autoChangeVar('scriptMonster',document.getElementById('IdleAgain-selectedMonster').value)" id="IdleAgain-areaOptions">
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
				<tr id="IdleAgain-toggleFight" onclick="IdleAgain.autoChangeVar('toggleFight','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/combat.png" class="img-small"></td>
					<td class="idleAgainConfTd">FIGHT</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleResetFight" onclick="IdleAgain.autoChangeVar('toggleResetFight','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/resetFightingPotion.png" class="img-small"></td>
					<td class="idleAgainConfTd">RESET POTION</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
				<tbody>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','fields','toggle',this.id)" id="IdleAgain-fieldsReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/fields.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Fields</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','forests','toggle',this.id)" id="IdleAgain-forestsReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/forests.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Forests</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','caves','toggle',this.id)" id="IdleAgain-cavesReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/caves.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Caves</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','volcano','toggle',this.id)" id="IdleAgain-volcanoReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/volcano.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Volcano</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','northernFields','toggle',this.id)" id="IdleAgain-northernFieldsReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/northernFields.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Northern Fields</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','hauntedMansion','toggle',this.id)" id="IdleAgain-hauntedMansionReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedMansion.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Haunted Mansion</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','desert','toggle',this.id)" id="IdleAgain-desertReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/desert.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Desert</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','ocean','toggle',this.id)" id="IdleAgain-oceanReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/ocean.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Ocean</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','jungle','toggle',this.id)" id="IdleAgain-jungleReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/jungle.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Jungle</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','dungeonEntrance','toggle',this.id)" id="IdleAgain-dungeonEntranceReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/dungeonEntrance.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Dungeon Entrance</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','dungeon','toggle',this.id)" id="IdleAgain-dungeonReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/dungeon.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Dungeon</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','castle','toggle',this.id)" id="IdleAgain-castleReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/castle.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Castle</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','cemetery','toggle',this.id)" id="IdleAgain-cemeteryReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/cemetery.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Cemetery</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','factory','toggle',this.id)" id="IdleAgain-factoryReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/factory.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Factory</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','hauntedWoods','toggle',this.id)" id="IdleAgain-hauntedWoodsReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/hauntedWoods.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Haunted Woods</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptResetArea','deepOcean','toggle',this.id)" id="IdleAgain-deepOceanReset">
					<td style="padding-left: 10px;width: 5%;"><img src="images/deepOcean.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">Deep Ocean</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleMonsterFind" onclick="IdleAgain.autoChangeVar('toggleMonsterFind','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/skeletonMonster.png" class="img-small"></td>
					<td class="idleAgainConfTd">SEARCH FOR MONSTER</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
				<tbody>
				<tr id="scriptExplorerArea" style="color: white;">
					<td style="padding-left: 10px;"><img src="images/exploringSkill.png" class="img-small"></td>
					<td style="padding-left: 50px;"><select name="selectedMonster" onchange="IdleAgain.autoChangeVar('scriptMonster',this.value)" id="IdleAgain-selectedMonster">
					</select>
					</td>
					<td class="idleAgainConfTd">MONSTER TO SEARCH</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleShiny" onclick="IdleAgain.autoChangeVar('toggleShiny','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/shiny.gif" class="img-small"></td>
					<td class="idleAgainConfTd">SHINY/GEM GOBLIN HUNT</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleSpell" onclick="IdleAgain.autoChangeVar('toggleSpell','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/fireSpell.png" class="img-small"></td>
					<td class="idleAgainConfTd">SPELL</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
				<tbody>
				<tr style="color: white;width: 100%;">
					<td style="padding-left: 10px;"><img src="images/lifeStealSpell.png" class="img-small"></td>
					<td>
					<input type="number" min="1" value="8" style="width: 50px;" onchange="IdleAgain.autoChangeVar('lifeStealThreshold',parseInt(this.value))">
					</td>
					<td class="idleAgainConfTd">Life Steal Threshold</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleCombatPotion" onclick="IdleAgain.autoChangeVar('toggleCombatPotion','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/ghostScanCombatPotion.png" class="img-small"></td>
					<td class="idleAgainConfTd">COMBAT POTION</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleHeal" onclick="IdleAgain.autoChangeVar('toggleHeal','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/autoTickHeal.png" class="img-small"></td>
					<td class="idleAgainConfTd">TICK HEAL</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleBM" onclick="IdleAgain.autoChangeVar('toggleBM','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/bloodMoonIcon.png" class="img-small"></td>
					<td class="idleAgainConfTd">BLOOD MOON</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleCousin" onclick="IdleAgain.autoChangeVar('toggleCousin','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/goblinCousin.png" class="img-small"></td>
					<td class="idleAgainConfTd">GOBLIN COUSIN</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
				<tbody>
				<tr id="IdleAgain-cousinArea" style="color: white;">
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
				<tr id="IdleAgain-toggleBags" onclick="IdleAgain.autoChangeVar('toggleBags','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/oceanLoot.png" class="img-small"></td>
					<td class="idleAgainConfTd">BAGS OPENING</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleFieldsBags" onclick="IdleAgain.autoChangeVar('toggleFieldsBags','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/fieldsLoot.png" class="img-small"></td>
					<td class="idleAgainConfTd">FIELDS BAGS OPENING</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleStatue" onclick="IdleAgain.autoChangeVar('toggleStatue','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/bronzeStatueMetalDetector.png" class="img-small"></td>
					<td class="idleAgainConfTd">STATUE SELL</td>
				</tr>
				</tbody>
			</table>
			<table class="idleAgainConfTable">
				<tbody>
				<tr id="IdleAgain-toggleArtifact" onclick="IdleAgain.autoChangeVar('toggleArtifact','toggle',this.id)" style="cursor: pointer; color: red;">
					<td style="padding-left: 10px;"><img src="images/skullArtifact.png" class="img-small"></td>
					<td class="idleAgainConfTd">ARTIFACT CONVERT</td>
				</tr>
				</tbody>
			</table>
			</div>`

		const scriptConfCookingTab = `<div id="tab-scriptConfigCooking" style="display:none">
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
				<tr id="IdleAgain-toggleBoat" onclick="IdleAgain.autoChangeVar('toggleBoat','toggle',this.id)" style="cursor: pointer; color: green;">
					<td style="padding-left: 10px;"><img src="images/sailBoat.png" class="img-small"></td>
					<td class="idleAgainConfTd">BOAT</td>
				</tr>
				</tbody>
			</table>
			<table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
				<tbody style="display: table-row;">
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','rowBoat','toggle',this.id)" id="IdleAgain-rowBoatSend">
					<td style="padding-left: 10px;width: 5%;"><img src="images/rowBoat.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">ROW BOAT</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','canoeBoat','toggle',this.id)" id="IdleAgain-canoeBoatSend">
					<td style="padding-left: 10px;width: 5%;"><img src="images/canoeBoat.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">CANOE</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','sailBoat','toggle',this.id)" id="IdleAgain-sailBoatSend">
					<td style="padding-left: 10px;width: 5%;"><img src="images/sailBoat.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">SAIL BOAT</td>
				</tr>
				<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','highWind','toggle',this.id)" id="IdleAgain-highWindSend">
					<td style="padding-left: 10px;width: 5%;"><img src="images/windIcon.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">WAIT HIGH WIND</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','steamBoat','toggle',this.id)" id="IdleAgain-steamBoatSend">
					<td style="padding-left: 10px;width: 5%;"><img src="images/steamBoat.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">STEAM BOAT</td>
				</tr>
				<tr style="display: inline-block; color: green; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptBoatSend','trawler','toggle',this.id)" id="IdleAgain-trawlerSend">
					<td style="padding-left: 10px;width: 5%;"><img src="images/trawler.png" class="img-small"></td>
					<td style="text-align: center;width: 40%">TRAWLER</td>
				</tr>
				</tbody>
			</table>
			</div>`;

		const logoutTab = document.getElementById('tab-logout');
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
				IdleAgain.saveOreOrder();
			}
		});

		let seeds = [
			"red Mushroom Seeds", "dotted Green Leaf Seeds", "green Leaf Seeds", "lime Leaf Seeds", "gold Leaf Seeds", "crystal Leaf Seeds", "striped Green Leaf Seeds", "striped Gold Leaf Seeds", "striped Crystal Leaf Seeds", "tree Seeds", "oak Tree Seeds", "willow Tree Seeds", "maple Tree Seeds", "redwood Tree Seeds", "pine Tree Seeds", "haunted Tree Seeds", "jungle Tree Seeds", "lava Tree Seeds", "gold Tree Seeds", "magic Tree Seeds", "apple Tree Seeds", "cactus Tree Seeds", "banana Tree Seeds", "palm Tree Seeds", "pineapple Tree Seeds", "starfruit Tree Seeds", "gold Apple Tree Seeds"
		];
		let sortableSeeds = document.getElementById('sortableSeeds');
		seeds.forEach(function(seed) {
			let seedLi = `<li class="ui-state-default sortableItem" value="${seed.replaceAll(' ','')}" class="idleAgainSortables">
		<input type="checkbox" class="seed-checkbox"> ${seed.toUpperCase()}<img src="images/${seed.replaceAll(' ','')}.png" class="img-small" style="padding-right: 10px;">
		</li>`;
			sortableSeeds.insertAdjacentHTML('beforeend', seedLi);
		});

		new Sortable(sortableSeeds, {
			animation: 150,
			onChange: function() {
				IdleAgain.saveSeedOrder();
			}
		});

		let strengthTableBody = document.getElementById('strengthTableBody');
		areasArray.forEach((area) => {
			let areaTr = `<tr style="display: inline-block; color: red; width: 50%;" onclick="IdleAgain.autoChangeObject('scriptStrength','${area.replace(" ","")}','toggle',this.id)" id="IdleAgain-${area.replace(" ","")}Strength">
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

		//Compare Bar
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

		//Heat Needed / Cook all
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

		//Grow time
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

		//Bonemeal needed
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
					localStorage.setItem(`idleAgain-${username}`, JSON.stringify(scriptVars));
					localStorage.setItem(`idleAgain-oreOrder${username}`, importedData[1]);
					loadOreOrder();
					localStorage.setItem(`idleAgain-potionState${username}`, importedData[2]);
					loadPotions();
					localStorage.setItem(`idleAgain-seedOrder${username}`, importedData[3]);
					loadSeedOrder();
				};
			}
		});

		IdleAgain.addWikiButton();
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
		const bolVars = [
			"toggleGlobal","toggleGeodeOpen","toggleMineralIdentify","toggleNecklaceCharge","toggleTrain","toggleRocket","toggleSmelting","toggleRefinary","toggleCharcoal","toggleWoodcutting","toggleFarming","toggleBones","toggleFertilize","toggleDrink","toggleBrew","toggleTreeUpgrade","toggleExplore","toggleFight","toggleResetFight","toggleMonsterFind","toggleShiny","toggleSpell","toggleCombatPotion","toggleHeal","toggleBM","toggleCousin","toggleBags","toggleFieldsBags","toggleStatue","toggleArtifact","toggleBoat"
		]
		bolVars.forEach((id) => {
			document.getElementById("IdleAgain-" + id).style.color = IdleAgain.scriptVars[id] ? "green" : "red";
		})

		const fertilizableSeeds = [
			"redMushroomSeeds","dottedGreenLeafSeeds","greenLeafSeeds","limeLeafSeeds","goldLeafSeeds","crystalLeafSeeds","stripedGreenLeafSeeds","stripedGoldLeafSeeds","stripedCrystalLeafSeeds"
		];
		fertilizableSeeds.forEach((seed) => {
			document.getElementById("IdleAgain-" + seed + "Fertilize").style.color = IdleAgain.scriptVars.scriptFertilize[seed] ? "green" : "red";
		})


		bonesArray.forEach((bone) => {
			document.getElementById("IdleAgain-" + bone + "Ignore").style.color = IdleAgain.scriptVars.scriptBonesIgnore[bone] ? "green" : "red";
		})
		//Fish Bones is not in the array because of the autoBones function
		document.getElementById("IdleAgain-fishBonesIgnore").style.color = IdleAgain.scriptVars.scriptBonesIgnore.fishBones ? "green" : "red";


		treesArray.forEach((tree) => {
			document.getElementById("IdleAgain-" + tree + "Ignore").style.color = IdleAgain.scriptVars.scriptTreeIgnore[tree] ? "green" : "red";
			document.getElementById("IdleAgain-" + tree + "Upgrade").style.color = IdleAgain.scriptVars.scriptTreeUpgrade[tree] ? "green" : "red";
			document.getElementById("IdleAgain-" + tree + "Downgrade").style.color = IdleAgain.scriptVars.scriptTreeDowngrade[tree] ? "green" : "red";
		})

		//Tree and apple tree can't be downgraded
		document.getElementById("IdleAgain-treeIgnore").style.color = IdleAgain.scriptVars.scriptTreeIgnore.tree ? "green" : "red";
		document.getElementById("IdleAgain-treeUpgrade").style.color = IdleAgain.scriptVars.scriptTreeUpgrade.tree ? "green" : "red";
		document.getElementById("IdleAgain-appleTreeIgnore").style.color = IdleAgain.scriptVars.scriptTreeIgnore.appleTree ? "green" : "red";
		document.getElementById("IdleAgain-appleTreeUpgrade").style.color = IdleAgain.scriptVars.scriptTreeUpgrade.appleTree ? "green" : "red";

		//Starfruit and magic tree can't be upgraded
		document.getElementById("IdleAgain-magicTreeIgnore").style.color = IdleAgain.scriptVars.scriptTreeIgnore.magicTree ? "green" : "red";
		document.getElementById("IdleAgain-magicTreeDowngrade").style.color = IdleAgain.scriptVars.scriptTreeDowngrade.magicTree ? "green" : "red";
		document.getElementById("IdleAgain-starfruitTreeIgnore").style.color = IdleAgain.scriptVars.scriptTreeIgnore.starfruitTree ? "green" : "red";
		document.getElementById("IdleAgain-starfruitTreeDowngrade").style.color = IdleAgain.scriptVars.scriptTreeDowngrade.starfruitTree ? "green" : "red";


		areasArray.forEach((area) => {
			area = area.replace(" ","");
			document.getElementById("IdleAgain-" + area + "Strength").style.color = IdleAgain.scriptVars.scriptStrength[area] ? "green" : "red";
			document.getElementById("IdleAgain-" + area + "Reset").style.color = IdleAgain.scriptVars.scriptResetArea[area] ? "green" : "red";
		})

		boatsArray.forEach((boat) => {
			document.getElementById("IdleAgain-" + boat + "Send").style.color = IdleAgain.scriptVars.scriptBoatSend[boat] ? "green" : "red";
		})
		//Sail and high wind are not part of the array because of the autoBoat
		document.getElementById("IdleAgain-sailBoatSend").style.color = IdleAgain.scriptVars.scriptBoatSend.sailBoat ? "green" : "red";
		document.getElementById("IdleAgain-highWindSend").style.color = IdleAgain.scriptVars.scriptBoatSend.highWind ? "green" : "red";

		document.getElementById('IdleAgain-autoLogin').style.color = JSON.parse(localStorage.getItem('autoLogin')) ? 'green' : 'red';
		document.getElementById('IdleAgain-trainAmount').value = IdleAgain.scriptVars.scriptTrainAmount;
		document.getElementById('IdleAgain-rocketDestination').value = IdleAgain.scriptVars.scriptRocket;
		document.getElementById('IdleAgain-refinaryBar').value = IdleAgain.scriptVars.scriptRefinaryBar;
		document.getElementById('IdleAgain-foundryWood').value = IdleAgain.scriptVars.scriptFoundryWood;
		document.getElementById('IdleAgain-areaOptions').value = IdleAgain.scriptVars.scriptArea;
		IdleAgain.monsterOptions(IdleAgain.scriptVars.scriptArea);
		document.getElementById('IdleAgain-selectedMonster').value = IdleAgain.scriptVars.scriptMonster;
		document.getElementById('IdleAgain-cousinArea').value = IdleAgain.scriptVars.scriptCousinArea;
		document.getElementById('IdleAgain-chatScroll').src = IdleAgain.scriptVars.chatAutoScroll ? 'images/check.png' : 'images/x.png';
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
		saveData += JSON.stringify(IdleAgain.scriptVars) + ',,,';
		saveData += localStorage.getItem(`idleAgain-oreOrder${username}`) !== null ? localStorage.getItem(`idleAgain-oreOrder${username}`) + ',,,' : 'empty,,,';
		saveData += localStorage.getItem(`idleAgain-potionState${username}`) !== null ? localStorage.getItem(`idleAgain-potionState${username}`) + ',,,' : 'empty,,,';
		saveData += localStorage.getItem(`idleAgain-seedOrder${username}`) !== null ? localStorage.getItem(`idleAgain-seedOrder${username}`) : 'empty';
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
		let select = document.getElementById("IdleAgain-selectedMonster");
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
		document.getElementById('message-body').value = "";

		if (blockedHTML.some(item => inputValue.includes(item))) {
			inputValue = "";
			IdleAgain.showMessage("<b>Something you sent is not allowed, please remove anything that can cause problems to others before trying again.</b>", 'ChatBot');
			return;
		}

		IdleAgain.publishMessage(inputValue);
	},

	clearChat() {
		document.getElementById('messages').innerHTML = '';
	},

	autoScroll() {
		IdleAgain.scriptVars.chatAutoScroll = !IdleAgain.scriptVars.chatAutoScroll;
		document.getElementById('IdleAgain-chatScroll').src = IdleAgain.scriptVars.chatAutoScroll ? 'images/check.png' : 'images/x.png';
	},

	changeSigil(sigil) {
		if (!sigils.includes(sigil)) {return}
		IdleAgain.scriptVars.chatSigil = sigil;
	},

	chatHelp() {
		IdleAgain.showMessage('Use <b>img="image-url"</b> to send images', 'ChatBot');
	},

	showMessage(msg, sender, sigil) {
		//Block unsafe html
		if (blockedHTML.some(item => msg.includes(item))) {
			msg = 'This message was blocked for safety';
		}
		//Clickable links
		if (msg.includes('https') || msg.includes('www')) {
			msg = msg.replace(/(?:https:\/\/)?www.(.*?[\S]+)/g,"<a href='https://www.$1' target='_blank'>$1</a>")
		}
		//Images
		if (msg.match(/img=(["].*?["])/g)) {
			msg = msg.replace(/img=(["].*?["])/g, '<img src=$1 class="img-small">');
		}
		let messageContainer = document.createElement('div');
		let senderElement = document.createElement('strong');

		//Message time, sender and sigil
		const date = new Date();
		const hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
		const min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
		senderElement.innerHTML = '[' + hour + ':' + min + '] '

		if (sigil !== undefined && sigil !== "none") {
			const sigilImg = new Image();
			sigilImg.src = "https://cdn.idle-pixel.com/images/" + sigil + "_sigil.png"
			sigilImg.onload = ()=> {
				senderElement.innerHTML += sigilImg;
			}
		}

		senderElement.innerHTML += sender + ": ";

		messageContainer.appendChild(senderElement);
		const message = document.createElement('span');
		message.innerHTML = msg;
		messageContainer.style.overflowWrap = "break-word";
		messageContainer.appendChild(message);

		const messageArea = document.getElementById('messages');
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
				IdleAgain.showMessage(messageEvent.message.description, messageEvent.message.sender, messageEvent.message.sigil);
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
				sender: username,
				sigil: IdleAgain.scriptVars.chatSigil
			}
		};
		await pubnub.publish(publishPayload);
	},

	toggleEmojiPicker() {
		let emojiPicker = document.getElementById("div-emojis");
		emojiPicker.style.display = emojiPicker.style.display === "none" ? "block" : "none";
	},

	toggleSigilDiv() {
		let sigilsDiv = document.getElementById("div-sigils");
		sigilsDiv.style.display = sigilsDiv.style.display === "none" ? "block" : "none";
	},

	setWatchers() {
		Object.defineProperty(window, "username", {
			get() {
			  	return IdleAgain.props.username;
			},
			set(val) {
			  	IdleAgain.props.username = val;
			  	IdleAgain.onLogin();
			}
		});
		Object.defineProperty(window, "monsterName", {
			get() {
			  	return IdleAgain.props.monsterName;
			},
			set(val) {
			  	IdleAgain.props.monsterName = val;
				if (IdleAgain.scriptVars.toggleGlobal && val !== "none" && (IdleAgain.scriptVars.toggleShiny || IdleAgain.scriptVars.toggleMonsterFind)) {
					IdleAgain.autoMonsterHunt();
				}
			}
		});
		Object.defineProperty(window, "heroHp", {
			get() {
			  	return IdleAgain.props.heroHp;
			},
			set(val) {
			  	IdleAgain.props.heroHp = val;
				if (IdleAgain.scriptVars.toggleGlobal && IdleAgain.scriptVars.toggleHeal && val == 0) {
					IdleAgain.autoHeal();
				}
			}
		});
		Object.defineProperty(window, "infectedTimer", {
			get() {
				return IdleAgain.props.infectedTimer;
			},
			set(val) {
				IdleAgain.props.infectedTimer = val;
				if (val > 0) {sendBytes('DRINK=cureInfectionPotion')};
			}
		});
	},

	initialize() {
		IdleAgain.setWatchers();
		IdleAgain.setupPubNub(); //Chat
		IdleAgain.scriptAddTabs();

		if (JSON.parse(localStorage.getItem('IdleAgain-Config')) === false) {
			alert('You need to config the Idle Again Script');
			localStorage.setItem('IdleAgain-Config', true);
		}

		//Use version number to show new notification when needed
		/* if (JSON.parse(localStorage.getItem('IdleAgain-Notification')) !== "1.6") {
			const message = "This is a notification that changes based on version";
			alert(message);
			IdleAgain.showMessage(message,"Idle Again");
			localStorage.setItem('IdleAgain-Notification', "1.6");
		} */

		//IdleAgain.addCombatUI();
		document.addEventListener("keydown", IdleAgain.handleKeyDown);
	},

	onLogin() {
		navigate('exploreSelect');
		navigate('main');
		IdleAgain.loadUserVars();
		IdleAgain.scriptStyleTabs();
		IdleAgain.loadSeedOrder();
		IdleAgain.loadOreOrder();
		IdleAgain.loadPotions();
		
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

		IdleAgain.logTime("Logged with " + username);
	},

	handleKeyDown(e) {
		if (document.getElementById("message-body").matches(":focus")) {
			//Send message with Enter
			if (e.key === "Enter") {
				IdleAgain.sendChat();
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
			if (IdleAgain.scriptVars.toggleTreeDowngrade) IdleAgain.autoTreeDowngrade();
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
		}
	},

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