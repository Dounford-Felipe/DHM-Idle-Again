// ==UserScript==
// @name         DHM - Idle Again
// @namespace    http://tampermonkey.net/
// @version      1.3.0.3
// @description  Automate most of DHM features
// @author       Felipe Dounford
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.js
// @require      https://greasyfork.org/scripts/478182-pubnub-js/code/PubNub%20JS.js?version=1269788
// @match        https://dhm.idle-pixel.com/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=greasyfork.org
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
$("head").append('<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script><script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script><script src="https://cdn.pubnub.com/sdk/javascript/pubnub.7.4.1.js"></script><link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" type="text/css">');
//Toggles
window.toggleGlobalLoad = localStorage.getItem('toggleGlobalLoad') !== null ? JSON.parse(localStorage.getItem('toggleGlobalLoad')) : true
window.toggleGlobal = window.toggleGlobalLoad ? true : false
window.toggleGeodeOpen = localStorage.getItem('toggleGeodeOpen') !== null ? JSON.parse(localStorage.getItem('toggleGeodeOpen')) : false
window.toggleMineralIdentify = localStorage.getItem('toggleMineralIdentify') !== null ? JSON.parse(localStorage.getItem('toggleMineralIdentify')) : false
window.toggleNecklaceCharge = localStorage.getItem('toggleNecklaceCharge') !== null ? JSON.parse(localStorage.getItem('toggleNecklaceCharge')) : false
window.toggleTrain = localStorage.getItem('toggleTrain') !== null ? JSON.parse(localStorage.getItem('toggleTrain')) : false
window.toggleRocket = localStorage.getItem('toggleRocket') !== null ? JSON.parse(localStorage.getItem('toggleRocket')) : false
window.toggleSmelting = localStorage.getItem('toggleSmelting') !== null ? JSON.parse(localStorage.getItem('toggleSmelting')) : true
window.toggleRefinary = localStorage.getItem('toggleRefinary') !== null ? JSON.parse(localStorage.getItem('toggleRefinary')) : false
window.toggleCharcoal = localStorage.getItem('toggleCharcoal') !== null ? JSON.parse(localStorage.getItem('toggleCharcoal')) : false
window.toggleWoodcutting = localStorage.getItem('toggleWoodcutting') !== null ? JSON.parse(localStorage.getItem('toggleWoodcutting')) : true
window.toggleFarming = localStorage.getItem('toggleFarming') !== null ? JSON.parse(localStorage.getItem('toggleFarming')) : false
window.toggleBones = localStorage.getItem('toggleBones') !== null ? JSON.parse(localStorage.getItem('toggleBones')) : false
window.toggleDrink = localStorage.getItem('toggleDrink') !== null ? JSON.parse(localStorage.getItem('toggleDrink')) : false
window.toggleTreeUpgrade = localStorage.getItem('toggleTreeUpgrade') !== null ? JSON.parse(localStorage.getItem('toggleTreeUpgrade')) : false
window.toggleBrew = localStorage.getItem('toggleBrew') !== null ? JSON.parse(localStorage.getItem('toggleBrew')) : false
window.toggleExplore = localStorage.getItem('toggleExplore') !== null ? JSON.parse(localStorage.getItem('toggleExplore')) : false
window.toggleFight = localStorage.getItem('toggleFight') !== null ? JSON.parse(localStorage.getItem('toggleFight')) : false
window.toggleResetFight = localStorage.getItem('toggleResetFight') !== null ? JSON.parse(localStorage.getItem('toggleResetFight')) : false
window.toggleMonsterFind = localStorage.getItem('toggleMonsterFind') !== null ? JSON.parse(localStorage.getItem('toggleMonsterFind')) : false
window.toggleSpell = localStorage.getItem('toggleSpell') !== null ? JSON.parse(localStorage.getItem('toggleSpell')) : false
window.toggleHeal = localStorage.getItem('toggleCombatPotion') !== null ? JSON.parse(localStorage.getItem('toggleCombatPotion')) : true
window.toggleHeal = localStorage.getItem('toggleHeal') !== null ? JSON.parse(localStorage.getItem('toggleHeal')) : true
window.toggleShiny = localStorage.getItem('toggleShiny') !== null ? JSON.parse(localStorage.getItem('toggleShiny')) : false
window.toggleCousin = localStorage.getItem('toggleCousin') !== null ? JSON.parse(localStorage.getItem('toggleCousin')) : false
window.toggleBags = localStorage.getItem('toggleBags') !== null ? JSON.parse(localStorage.getItem('toggleBags')) : false
window.toggleStatue = localStorage.getItem('toggleStatue') !== null ? JSON.parse(localStorage.getItem('toggleStatue')) : false
window.toggleArtifact = localStorage.getItem('toggleArtifact') !== null ? JSON.parse(localStorage.getItem('toggleArtifact')) : false
window.toggleBoat = localStorage.getItem('toggleBoat') !== null ? JSON.parse(localStorage.getItem('toggleBoat')) : true
window.toggleEvent = true
//Mining Vars
window.scriptTrainAmount = localStorage.getItem('scriptTrainAmount') !== null ? JSON.parse(localStorage.getItem('scriptTrainAmount')) : 1
window.scriptRocket = localStorage.getItem('scriptRocket') !== null ? JSON.parse(localStorage.getItem('scriptRocket')) : 'Moon'
//Crafting Vars
window.scriptSmeltingOre = localStorage.getItem('scriptSmeltingOre') !== null ? JSON.parse(localStorage.getItem('scriptSmeltingOre')) : 'copper'
window.scriptRefinaryBar = localStorage.getItem('scriptRefinaryBar') !== null ? JSON.parse(localStorage.getItem('scriptRefinaryBar')) : 'gold'
window.scriptFoundryWood = localStorage.getItem('scriptFoundryWood') !== null ? JSON.parse(localStorage.getItem('scriptFoundryWood')) : 'cheapest'
//Woodicutting Vars
window.scriptTreeIgnore = {tree:localStorage.getItem('scriptTreeIgnore.tree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.tree')) : false,oakTree:localStorage.getItem('scriptTreeIgnore.oakTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.oakTree')) : false,willowTree:localStorage.getItem('scriptTreeIgnore.willowTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.willowTree')) : false,mapleTree:localStorage.getItem('scriptTreeIgnore.mapleTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.mapleTree')) : false,redwoodTree:localStorage.getItem('scriptTreeIgnore.redwoodTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.redwoodTree')) : false,pineTree:localStorage.getItem('scriptTreeIgnore.pineTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.pineTree')) : false,hauntedTree:localStorage.getItem('scriptTreeIgnore.hauntedTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.hauntedTree')) : false,jungleTree:localStorage.getItem('scriptTreeIgnore.jungleTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.jungleTree')) : true,lavaTree:localStorage.getItem('scriptTreeIgnore.lavaTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.lavaTree')) : false,goldTree:localStorage.getItem('scriptTreeIgnore.goldTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.goldTree')) : true,magicTree:localStorage.getItem('scriptTreeIgnore.magicTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.magicTree')) : false,appleTree:localStorage.getItem('scriptTreeIgnore.appleTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.appleTree')) : false,cactusTree:localStorage.getItem('scriptTreeIgnore.cactusTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.cactusTree')) : false,bananaTree:localStorage.getItem('scriptTreeIgnore.bananaTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.bananaTree')) : false,palmTree:localStorage.getItem('scriptTreeIgnore.palmTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.palmTree')) : false,pineappleTree:localStorage.getItem('scriptTreeIgnore.pineappleTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.pineappleTree')) : true,starfruitTree:localStorage.getItem('scriptTreeIgnore.starfruitTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeIgnore.starfruitTree')) : false,none:true}
//Farming Vars
window.scriptBonesIgnore = {bones:localStorage.getItem('scriptBonesIgnore.bones') !== null ? JSON.parse(localStorage.getItem('scriptBonesIgnore.bones')) : true,ashes:localStorage.getItem('scriptBonesIgnore.ashes') !== null ? JSON.parse(localStorage.getItem('scriptBonesIgnore.ashes')) : false,iceBones:localStorage.getItem('scriptBonesIgnore.iceBones') !== null ? JSON.parse(localStorage.getItem('scriptBonesIgnore.iceBones')) : true,zombieBones:localStorage.getItem('scriptBonesIgnore.zombieBones') !== null ? JSON.parse(localStorage.getItem('scriptBonesIgnore.zombieBones')) : true,bloodBones:localStorage.getItem('scriptBonesIgnore.bloodBones') !== null ? JSON.parse(localStorage.getItem('scriptBonesIgnore.bloodBones')) : true,fishBones:localStorage.getItem('scriptBonesIgnore.fishBones') !== null ? JSON.parse(localStorage.getItem('scriptBonesIgnore.fishBones')) : true}
//Brewing Vars
window.scriptTreeUpgrade = {tree:localStorage.getItem('scriptTreeUpgrade.tree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.tree')) : false,oakTree:localStorage.getItem('scriptTreeUpgrade.oakTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.oakTree')) : false,willowTree:localStorage.getItem('scriptTreeUpgrade.willowTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.willowTree')) : false,mapleTree:localStorage.getItem('scriptTreeUpgrade.mapleTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.mapleTree')) : false,redwoodTree:localStorage.getItem('scriptTreeUpgrade.redwoodTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.redwoodTree')) : false,pineTree:localStorage.getItem('scriptTreeUpgrade.pineTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.pineTree')) : false,hauntedTree:localStorage.getItem('scriptTreeUpgrade.hauntedTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.hauntedTree')) : false,jungleTree:localStorage.getItem('scriptTreeUpgrade.jungleTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.jungleTree')) : true,lavaTree:localStorage.getItem('scriptTreeUpgrade.lavaTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.lavaTree')) : false,goldTree:localStorage.getItem('scriptTreeUpgrade.goldTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.goldTree')) : true,magicTree:localStorage.getItem('scriptTreeUpgrade.magicTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.magicTree')) : false,appleTree:localStorage.getItem('scriptTreeUpgrade.appleTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.appleTree')) : false,cactusTree:localStorage.getItem('scriptTreeUpgrade.cactusTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.cactusTree')) : false,bananaTree:localStorage.getItem('scriptTreeUpgrade.bananaTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.bananaTree')) : false,palmTree:localStorage.getItem('scriptTreeUpgrade.palmTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.palmTree')) : false,pineappleTree:localStorage.getItem('scriptTreeUpgrade.pineappleTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.pineappleTree')) : true,starfruitTree:localStorage.getItem('scriptTreeUpgrade.starfruitTree') !== null ? JSON.parse(localStorage.getItem('scriptTreeUpgrade.starfruitTree')) : false,none:false}
//Exploring Vars
window.scriptAreaEnergy = {fields:50,forests:250,caves:1000,volcano:5000,northernFields:8000,hauntedMansion:20000,desert:50000,ocean:120000,jungle:200000,dungeonEntrance:500000,dungeon:1000000,castle:3000000,cemetery:7000000,factory:10000000,hauntedWoods:14000000,deepOcean:20000000}
window.scriptAreaTimer = {fields:900,forests:1800,caves:3600,volcano:5400,northernFields:3600*2,hauntedMansion:3600*3,desert:3600*4+1800,ocean:3600*6,jungle:3600*8,dungeonEntrance:3600*10,dungeon:3600*12,castle:3600*15,cemetery:3600*16,factory:3600*18,hauntedWoods:3600*20,deepOcean:3600*23}
window.scriptWaitTeleport = false
const artifactArray = ['brokenSwordArtifact', 'cannonBallsArtifact', 'oldCannonArtifact', 'strangeLeafArtifact', 'ancientLogArtifact', 'rainbowFlowerArtifact', 'clayVaseArtifact', 'batWingArtifact', 'skullArtifact', 'sulferArtifact', 'volcanicRockArtifact', 'volcanicSmokeArtifact', 'iceArtifact', 'snowballsArtifact', 'frozenHeadArtifact', 'spiderLegsArtifact', 'broomArtifact', 'hauntedSkullArtifact', 'scorpionsTailArtifact', 'mummyArtifact', 'egyptKingArtifact', 'fossilArtifact', 'scubaArtifact', 'sharksJawArtifact', 'strangerLeafArtifact', 'mossyRockArtifact', 'monkeySkullArtifact', 'strangeJungleLeafArtifact', 'inukshukArtifact', 'hauntedMonkeySkullArtifact', 'dungeonBrickArtifact', 'candleStickArtifact', 'skeletonKingsHeadArtifact', 'lampArtifact', 'brokenShieldArtifact', 'dragonSkullArtifact', 'tombStoneArtifact', 'zombieHandArtifact', 'ancientCrossArtifact', 'cogWheelArtifact', 'robotHelmetArtifact', 'brokenTimeMachineArtifact', 'hauntedLeavesArtifact', 'eyeballArtifact', 'ghostScanPotionArtifact', 'deepFossilArtifact', 'starfishArtifact', 'ancientScubaArtifact']
const bagsArray = ['fieldsLoot', 'forestsLoot', 'cavesLoot', 'volcanoLoot', 'northernFieldsLoot', 'hauntedMansionLoot', 'desertLoot', 'oceanLoot', 'jungleLoot', 'dungeonEntranceLoot', 'dungeonLoot', 'castleLoot', 'cemeteryLoot', 'factoryLoot', 'hauntedWoodsLoot', 'deepOceanLoot', 'shinyFieldsLoot', 'shinyForestsLoot', 'shinyCavesLoot', 'shinyVolcanoLoot', 'shinyNorthernFieldsLoot', 'shinyHauntedMansionLoot', 'shinyDesertLoot', 'shinyOceanLoot', 'shinyJungleLoot', 'shinyDungeonEntranceLoot', 'shinyDungeonLoot', 'shinyCastleLoot', 'shinyCemeteryLoot', 'shinyFactoryLoot', 'shinyHauntedWoodsLoot', 'shinyDeepOceanLoot']
window.scriptArea = localStorage.getItem('scriptArea') !== null ? JSON.parse(localStorage.getItem('scriptArea')) : 'fields'
window.scriptMonster = localStorage.getItem('scriptMonster') !== null ? JSON.parse(localStorage.getItem('scriptMonster')) : 'chicken'
window.scriptResetArea = {fields:localStorage.getItem('scriptResetArea.fields') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.fields')) : false,forests:localStorage.getItem('scriptResetArea.forests') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.forests')) : false,caves:localStorage.getItem('scriptResetArea.caves') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.caves')) : false,volcano:localStorage.getItem('scriptResetArea.volcano') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.volcano')) : false,northernFields:localStorage.getItem('scriptResetArea.northernFields') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.northernFields')) : false,hauntedMansion:localStorage.getItem('scriptResetArea.hauntedMansion') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.hauntedMansion')) : false,desert:localStorage.getItem('scriptResetArea.desert') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.desert')) : false,ocean:localStorage.getItem('scriptResetArea.ocean') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.ocean')) : false,jungle:localStorage.getItem('scriptResetArea.jungle') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.jungle')) : false,dungeonEntrance:localStorage.getItem('scriptResetArea.dungeonEntrance') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.dungeonEntrance')) : false,dungeon:localStorage.getItem('scriptResetArea.dungeon') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.dungeon')) : false,castle:localStorage.getItem('scriptResetArea.castle') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.castle')) : false,cemetery:localStorage.getItem('scriptResetArea.cemetery') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.cemetery')) : false,factory:localStorage.getItem('scriptResetArea.factory') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.factory')) : false,hauntedWoods:localStorage.getItem('scriptResetArea.hauntedWoods') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.hauntedWoods')) : false,deepOcean:localStorage.getItem('scriptResetArea.deepOcean') !== null ? JSON.parse(localStorage.getItem('scriptResetArea.deepOcean')) : false}
window.scriptCousinArea = localStorage.getItem('scriptCousinArea') !== null ? JSON.parse(localStorage.getItem('scriptCousinArea')) : 'fields'
//Cooking Vars
window.scriptBoatSend = {rowBoat:localStorage.getItem('scriptBoatSend.rowBoat') !== null ? JSON.parse(localStorage.getItem('scriptBoatSend.rowBoat')) : true,canoeBoat:localStorage.getItem('scriptBoatSend.canoeBoat') !== null ? JSON.parse(localStorage.getItem('scriptBoatSend.canoeBoat')) : true,sailBoat:localStorage.getItem('scriptBoatSend.sailBoat') !== null ? JSON.parse(localStorage.getItem('scriptBoatSend.sailBoat')) : true,highWind:localStorage.getItem('scriptBoatSend.highWind') !== null ? JSON.parse(localStorage.getItem('scriptBoatSend.highWind')) : true,steamBoat:localStorage.getItem('scriptBoatSend.steamBoat') !== null ? JSON.parse(localStorage.getItem('scriptBoatSend.steamBoat')) : true,trawler:localStorage.getItem('scriptBoatSend.trawler') !== null ? JSON.parse(localStorage.getItem('scriptBoatSend.trawler')) : true}
const oldHideAllTabs = hideAllTabs

function autoEvent() {
	if (eventName !== 'none' && (eventStatus == 'active' || eventStatus == 'fullActive') && eventLastClicked == 0) {
        sendBytes('CLICKS_EVENT')
    }
}

function autoGeodeOpen() {
	if (geode1 > 0) {
		sendBytes('OPEN_MULTIPLE_GEODE=geode1~'+geode1)
		closeSmittysDialogue('dialogue-confirm')
	}
	if (geode2 > 0) {
		sendBytes('OPEN_MULTIPLE_GEODE=geode2~'+geode2)
		closeSmittysDialogue('dialogue-confirm')
	}
	if (geode3 > 0) {
		sendBytes('OPEN_MULTIPLE_GEODE=geode3~'+geode3)
		closeSmittysDialogue('dialogue-confirm')
	}
	if (geode4 > 0) {
		sendBytes('OPEN_MULTIPLE_GEODE=geode4~'+geode4)
		closeSmittysDialogue('dialogue-confirm')
	}
	if (geode5 > 0) {
		sendBytes('OPEN_MULTIPLE_GEODE=geode5~'+geode5)
		closeSmittysDialogue('dialogue-confirm')
	}
	if (geode6 > 0) {
		sendBytes('OPEN_MULTIPLE_GEODE=geode6~'+geode6)
		closeSmittysDialogue('dialogue-confirm')
	}
}

function autoIdentify() {
	if (limeQuartzMineralUnidentified > 0) {
    	clicksItem('limeQuartzMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (fluoriteMineralUnidentified > 0) {
    	clicksItem('fluoriteMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (topazMineralUnidentified > 0) {
    	clicksItem('topazMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (blueMarbleMineralUnidentified > 0) {
    	clicksItem('blueMarbleMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (sulferMineralUnidentified > 0) {
    	clicksItem('sulferMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (purpleQuartzMineralUnidentified > 0) {
    	clicksItem('purpleQuartzMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (limoniteMineralUnidentified > 0) {
    	clicksItem('limoniteMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (crystalPrismeMineralUnidentified > 0) {
    	clicksItem('crystalPrismeMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (typeof clearMarbleMineralUnidentified !== 'undefined' && clearMarbleMineralUnidentified > 0) {
    	clicksItem('clearMarbleMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (denseMarbleMineralUnidentified > 0) {
    	clicksItem('denseMarbleMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (jadeMineralUnidentified > 0) {
    	clicksItem('jadeMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (opalMineralUnidentified > 0) {
    	clicksItem('opalMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (amethystMineralUnidentified > 0) {
    	clicksItem('amethystMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (tashmarineMineralUnidentified > 0) {
    	clicksItem('tashmarineMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (tanzaniteMineralUnidentified > 0) {
    	clicksItem('tanzaniteMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (seaCrystalMineralUnidentified > 0) {
    	clicksItem('seaCrystalMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (amberMineralUnidentified > 0) {
    	clicksItem('amberMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
	if (smoothPearlMineralUnidentified > 0) {
		clicksItem('smoothPearlMineralUnidentified');
    	closeSmittysDialogue('dialogue-confirm');
	}
}

function autoNecklaceCharge() {
	changeMineralNecklace()
}

function autoTrain() {
	if (train > 0 && trainTimer < 2 && oil >= 500000 * scriptTrainAmount) {
		sendBytes("MANAGE_TRAIN=0");
		sendBytes('COLLECT_TRAIN_FORCE');
		sendBytes('MANAGE_TRAIN='+scriptTrainAmount);
		closeSmittysDialogue('dialogue-confirm2');
	} else if (train > 0 && trainTimer == 1 && oil < 500000 * scriptTrainAmount) {
		sendBytes("MANAGE_TRAIN=0");
		sendBytes('COLLECT_TRAIN_FORCE');
		closeSmittysDialogue('dialogue-confirm2');
	}
}

function autoRocket() {
	if (rocketKm == 1) {
		sendBytes('MANAGE_ROCKET=collect2')
		closeSmittysDialogue('dialogue-confirm')
	} else if (rocket == 1 && rocketKm == 0) {
		if (scriptRocket == 'Moon' && oil >= 4000000) {
			sendBytes('MANAGE_ROCKET=send')
		} else if (scriptRocket == 'Mars' && oil >= 15000000) {
			sendBytes('MANAGE_ROCKET=send_mars')
		} else if (scriptRocket == 'Sun' & oil >= 30000000 && charcoal >= 100) {
			sendBytes('MANAGE_ROCKET=send_sun')
		}
	}
}

function autoSmelt() {
	if (smeltingCurrentOreType == 'none') {
    var oreItems = document.getElementById("sortableOres").getElementsByTagName("li")

    for (var i = 0; i < oreItems.length; i++) {
      var minimumOre = oreItems[i].querySelector(".oreMinimum").value;
      var selectedOre = oreItems[i].getAttribute("value");
      if (smeltingCurrentOreType == 'none' && window[selectedOre] >= minimumOre && (selectedOre !== 'promethium' || lava >= minimumOre) && (selectedOre !== 'titanium' || charcoal >= minimumOre) && (selectedOre !== 'ancientOre' || plasma >= minimumOre)) {
		chooseOreForFurnace(selectedOre)
		startSmelting()
		closeSmittysDialogue('dialogue-furnace2')
		console.log(selectedOre)
		break;
      }
    }
	}
}

function autoRefine() {
	if (barRefineryTimer < 2 && scriptRefinaryBar == 'gold' && oil > 500000 && goldBars > 99) {
		clicksItem('goldBarRefinery')
		sendBytes('REFINE_GOLD_BARS=goldBars')
		closeSmittysDialogue('dialogue-barRefinery');
		closeSmittysDialogue('dialogue-confirm')

	} else if (barRefineryTimer < 2 && scriptRefinaryBar == 'promethium' && oil > 2000000 && promethiumBars > 99) {
		clicksItem('goldBarRefinery')
		sendBytes('REFINE_GOLD_BARS=promethiumBars')
		closeSmittysDialogue('dialogue-barRefinery');
		closeSmittysDialogue('dialogue-confirm')
	}
}

function autoFoundry() {
	if (charcoalFoundryCurrentOreType == 0 || charcoalFoundryCurrentOreType == 'none') {
	let scriptFoundryWoodLocal = scriptFoundryWood
	if (scriptFoundryWoodLocal == 'cheapest') {
		logs > 100 ? scriptFoundryWoodLocal = 'logs'
		: oakLogs > 100 ? scriptFoundryWoodLocal = 'oakLogs'
		: willowLogs > 100 ? scriptFoundryWoodLocal = 'willowLogs'
		: mapleLogs > 100 ? scriptFoundryWoodLocal = 'mapleLogs'
		: redwoodLogs > 100 ? scriptFoundryWoodLocal = 'redwoodLogs'
		: pineLogs > 100 ? scriptFoundryWoodLocal = 'pineLogs'
		: hauntedLogs > 100 ? scriptFoundryWoodLocal = 'hauntedLogs'
		: jungleLogs > 100 ? scriptFoundryWoodLocal = 'jungleLogs'
		: lavaLogs > 100 ? scriptFoundryWoodLocal = 'lavaLogs'
		: goldLogs > 100 ? scriptFoundryWoodLocal = 'goldLogs'
		: magicLogs > 100 ? scriptFoundryWoodLocal = 'magicLogs'
		: scriptFoundryWoodLocal = 'none';
	}
	let scriptLava
	switch (scriptFoundryWoodLocal) {
		case 'logs':
		scriptLava = 1;
		break;
		case 'oakLogs':
		scriptLava = 2;
		break;
		case 'willowLogs':
		scriptLava = 3;
		break;
		case 'mapleLogs':
		scriptLava = 4;
		break;
		case 'redwoodLogs':
		scriptLava = 5;
		break;
		case 'pineLogs':
		scriptLava = 6;
		break;
		case 'hauntedLogs':
		scriptLava = 7;
		break;
		case 'jungleLogs':
		scriptLava = 8;
		break;
		case 'lavaLogs':
		scriptLava = 9;
		break;
		case 'goldLogs':
		scriptLava = 10;
		break;
		case 'magicLogs':
		scriptLava = 11;
		break;
		default:
		break;
	}
	console.log(scriptFoundryWoodLocal+' used')
	if (window[scriptFoundryWoodLocal] > 99 && lava >= scriptLava * 100 && scriptFoundryWoodLocal !== 'none') {
	sendBytes('CHARCOAL_FOUNDRY='+scriptFoundryWoodLocal+'~'+100)
	closeSmittysDialogue('dialogue-confirm')
    }
	}
}

function autoLumber() {
	if (scriptTreeIgnore[tree6] === false && treeTimer6 == 1) {
	sendBytes('CHOP_TREE=6')}
	if (scriptTreeIgnore[tree5] === false && treeTimer5 == 1) {
	sendBytes('CHOP_TREE=5')}
	if (scriptTreeIgnore[tree4] === false && treeTimer4 == 1) {
	sendBytes('CHOP_TREE=4')}
	if (scriptTreeIgnore[tree3] === false && treeTimer3 == 1) {
	sendBytes('CHOP_TREE=3')}
	if (scriptTreeIgnore[tree2] === false && treeTimer2 == 1) {
	sendBytes('CHOP_TREE=2')}
	if (scriptTreeIgnore[tree1] === false && treeTimer1 == 1) {
	sendBytes('CHOP_TREE=1')}
}

function autoPlant() {
  if (farmTimer1 < 2 || farmTimer2 < 2 || (farmTimer3 < 2 && farmUnlocked3 == 1) || (farmTimer4 < 2 && farmUnlocked4 == 1) || (farmTimer5 < 2 && farmUnlocked5 == 1) || (farmTimer6 < 2 && farmUnlocked6 == 1)) {
    var seedItems = document.getElementById("sortableSeeds").getElementsByTagName("li")

    for (var i = 0; i < seedItems.length; i++) {
      var seedCheckbox = seedItems[i].querySelector(".seed-checkbox");
      var selectedSeed = seedItems[i].getAttribute("value"); // Obter o valor do atributo 'value'
	  if (window[selectedSeed] >= 1){
      if (seedCheckbox.checked) {
        setBobsAutoReplantSeed(selectedSeed);
        closeSmittysDialogue("dialogue-bob");
        sendBytes("HARVEST_AND_PLANT_ALL");
		setTimeout(function(){closeSmittysDialogue('dialogue-confirm')},1000);
      }
	  }
    }
  }
}

function autoBones() {
	if (scriptBonesIgnore.bones === false && bones > 0) {
	sendBytes('ADD_BONEMEAL=bones~'+bones)}
	if (scriptBonesIgnore.ashes === false && ashes > 0) {
	sendBytes('ADD_BONEMEAL=ashes~'+ashes)}
	if (scriptBonesIgnore.iceBones === false && iceBones > 0) {
	sendBytes('ADD_BONEMEAL=iceBones~'+iceBones)}
	if (scriptBonesIgnore.zombieBones === false && zombieBones > 0) {
	sendBytes('ADD_BONEMEAL=zombieBones~'+zombieBones)}
	if (scriptBonesIgnore.bloodBones === false && bloodBones > 0) {
	sendBytes('ADD_BONEMEAL=bloodBones~'+bloodBones)}
	if (scriptBonesIgnore.fishBones === false && fishBones > 9) {
	sendBytes('ADD_BONEMEAL=fishBones~'+(Math.floor(fishBones/10))*10)}
}

function autoDrink() {
    var potionItems = document.getElementById("sortablePotions").getElementsByTagName("li")

    for (var i = 0; i < potionItems.length; i++) {
      var drinkCheckbox = potionItems[i].querySelector(".drink-checkbox");
      var selectedPotion = potionItems[i].getAttribute("value"); // Obter o valor do atributo 'value'

      if (drinkCheckbox.checked && window[selectedPotion] > 0 && window[selectedPotion+'Timer'] == 0) {
		sendBytes('DRINK='+selectedPotion);
        setTimeout(function(){closeSmittysDialogue('dialogue-confirm')},1000);
      }
    }
}

function autoTreeUpgrade() {
	if (woodcuttingUpgradePotionCooldown == 0 && woodcuttingUpgradePotion >= 1) {
		if (scriptTreeUpgrade[tree6] === true && woodcuttingUpgradePotionUsed6 == 0) {
			sendBytes('POTION_UPGRADE_TREE=6')}
		if (scriptTreeUpgrade[tree5] === true && woodcuttingUpgradePotionUsed5 == 0) {
			sendBytes('POTION_UPGRADE_TREE=5')}
		if (scriptTreeUpgrade[tree4] === true && woodcuttingUpgradePotionUsed4 == 0) {
			sendBytes('POTION_UPGRADE_TREE=4')}
		if (scriptTreeUpgrade[tree3] === true && woodcuttingUpgradePotionUsed3 == 0) {
			sendBytes('POTION_UPGRADE_TREE=3')}
		if (scriptTreeUpgrade[tree2] === true && woodcuttingUpgradePotionUsed2 == 0) {
			sendBytes('POTION_UPGRADE_TREE=2')}
		if (scriptTreeUpgrade[tree1] === true && woodcuttingUpgradePotionUsed1 == 0) {
			sendBytes('POTION_UPGRADE_TREE=1')}
	}
}

function autoBrew() {
    var potionItems = document.getElementById("sortablePotions").getElementsByTagName("li")

    for (var i = 0; i < potionItems.length; i++) {
      var drinkCheckbox = potionItems[i].querySelector(".drink-checkbox");
      var brewCheckbox = potionItems[i].querySelector(".brew-checkbox");
      var selectedPotion = potionItems[i].getAttribute("value"); // Obter o valor do atributo 'value'

      if (brewCheckbox.checked && drinkCheckbox.checked && window[selectedPotion] == 0) {
		sendBytes('BREW='+selectedPotion+'~1');
		setTimeout(function(){closeSmittysDialogue('dialogue-confirm')},1000);
      }
    }
}

function autoExplore() {
	if (explorerCooldown == 0) {
		let scriptAreaLocal = scriptArea
		if (energy < scriptAreaEnergy[scriptAreaLocal]) {scriptAreaLocal = 'fields'}
		sendBytes('EXPLORE='+scriptAreaLocal)
		if (toggleShiny == true || toggleMonsterFind == true) {scriptWaitTeleport = true} else {scriptWaitTeleport = false}
	}
}

function autoFight() {
	if (exploringArea !== 'none' && fightDone === 0) {
		if (scriptWaitTeleport === false || (scriptWaitTeleport === true && teleportSpellCooldown === 0)) {
			sendBytes('LOOK_FOR_FIGHT');
		}
		if (toggleShiny == false && toggleMonsterFind == false) {scriptWaitTeleport === false}
	}
}

function autoReset() {
	if (exploringArea !== 'none' && fightDone == 1 && monsterName == 'none' && resetFightingPotion >= 1 && resetFightingPotionUsed == 0) {
		if (scriptResetArea[exploringArea] === true) {
			sendBytes('DRINK=resetFightingPotion')
		}
	}
}

function autoMonsterHunt() {
	if (monsterName !== 'none' && (toggleMonsterFind == false || monsterName !== scriptMonster) && monsterName !== 'gemGoblin' && monsterName !== 'bloodGemGoblin' && shinyMonster == 0) {
		sendBytes('CAST_COMBAT_SPELL=teleportSpell')
	}
	var teleportCooldown = (teleportSpellUpgraded === 1) ? 300 : 900;
	scriptWaitTeleport = (explorerCooldown > teleportCooldown + 10) ? true : false
}

function autoHeal() {
	if (exploringArea !== 0 && monsterName !== 'none' && heroHp == 0 && hpCombatPotionUsed == 0){
		sendBytes('DRINK_COMBAT_POTION=hpCombatPotion');
	} else if (exploringArea !== 0 && monsterName !== 'none' && heroHp == 0 && superHpCombatPotionUsed == 0) {
		sendBytes('DRINK_COMBAT_POTION=superHpCombatPotion');
	} else if (exploringArea !== 0 && monsterName !== 'none' && heroHp == 0 && teleportSpellCooldown == 0) {
		sendBytes('CAST_COMBAT_SPELL=teleportSpell')
	}
}

function autoSpell() {
	if (monsterName !== 'none' && fireSpell == 1 && fireSpellCooldown == 0) {sendBytes('CAST_COMBAT_SPELL=fireSpell')}
	if (monsterName !== 'none' && reflectSpell == 1 && reflectSpellCooldown == 0) {sendBytes('CAST_COMBAT_SPELL=reflectSpell')}
	if (monsterName !== 'none' && thunderStrikeSpell == 1 && thunderStrikeSpellCooldown == 0) {sendBytes('CAST_COMBAT_SPELL=thunderStrikeSpell')}
	if (monsterName !== 'none' && lifeStealSpell == 1 && lifeStealSpellCooldown == 0) {sendBytes('CAST_COMBAT_SPELL=lifeStealSpell')}
	if (monsterName !== 'none' && sandstormSpell == 1 && sandstormSpellCooldown == 0) {sendBytes('CAST_COMBAT_SPELL=sandstormSpell')}
}

function autoCombatPot() {
	if (monsterName !== 'none' && (freezeCombatPotionFree == 1 || freezeCombatPotion >= 1) && freezeCombatPotionUsed == 0) {setTimeout(function(){sendBytes('DRINK_COMBAT_POTION=freezeCombatPotion')},15000);}
	if (monsterName !== 'none' && (ignoreDefenceCombatPotionFree == 1 || ignoreDefenceCombatPotion >= 1) && ignoreDefenceCombatPotionUsed == 0) {sendBytes('DRINK_COMBAT_POTION=ignoreDefenceCombatPotion')}
	if (monsterName !== 'none' && (ghostScanCombatPotionFree == 1 || ghostScanCombatPotion >= 1) && ghostScanCombatPotionUsed == 0) {sendBytes('DRINK_COMBAT_POTION=ghostScanCombatPotion')}
	if (monsterName !== 'none' && (strengthCombatPotionFree == 1 || strengthCombatPotion >= 1) && strengthCombatPotionUsed == 0) {sendBytes('DRINK_COMBAT_POTION=strengthCombatPotion')}
}

function autoCousin() {
	if (typeof goblinExploringArea == 'undefined' || goblinExploringArea == 'none') {
		let scriptCousinAreaLocal = scriptCousinArea
		if (energy < scriptAreaEnergy[scriptCousinAreaLocal]) {scriptCousinAreaLocal = 'fields'}
		goblinCousin=1;
		sendBytes('EXPLORE_GOBLIN='+scriptCousinAreaLocal)		
		setTimeout(function(){closeSmittysDialogue('dialogue-confirm')},1000);
	}
}

function autoBags() {
	for (var i = 0; i < bagsArray.length; i++) {
		var bag = bagsArray[i];
		if (window[bag] > 0) {
			sendBytes('OPEN_LOOT_MULTI='+bag+'~'+window[bag])
			closeSmittysDialogue('dialogue-confirm')
		}
	}
}

function autoStatue() {
	for (var i = 0; i < exploringMetalDetectorStatuesGlobal.length; i++) {
		var statue = exploringMetalDetectorStatuesGlobal[i];
		if (window[statue] > 0) {
			sendBytes('SELL_ALL_STATUES');
			closeSmittysDialogue('dialogue-confirm');
			break;
		}
	}
}

function autoArtifact() {
	for (var i = 0; i < artifactArray.length; i++) {
		var artifact = artifactArray[i];
		if (window[artifact] > 0) {
			sendBytes('CONVERT_ALL_ARTIFACTS')
			closeSmittysDialogue('dialogue-confirm')
			break;
		}
	}
}

function autoBoat() {
	if (rowBoat == 1 && scriptBoatSend.rowBoat == true && rowBoatTimer < 2) {
		if (bait > 4){
		sendBytes('CLICKS_BOAT=rowBoat')
		closeSmittysDialogue('dialogue-confirm2')
		} else {clicksItem('rowBoat');closeSmittysDialogue('dialogue-confirm2')}
	}
	if (canoeBoat == 1 && scriptBoatSend.canoeBoat == true && canoeBoatTimer < 2) {
		if (bait > 24) {
		sendBytes('CLICKS_BOAT=canoeBoat')
		closeSmittysDialogue('dialogue-confirm2')
		} else {clicksItem('canoeBoat');closeSmittysDialogue('dialogue-confirm2')}
	}
	if (scriptBoatSend.highWind == true) {
		if (sailBoat == 1 && scriptBoatSend.sailBoat == true && currentWind > 1 && sailBoatTimer < 2) {
		if (bait > 99) {
		sendBytes('CLICKS_BOAT=sailBoat')
		closeSmittysDialogue('dialogue-confirm2')
		} else {clicksItem('sailBoat');closeSmittysDialogue('dialogue-confirm2')}
		}
	} else if (sailBoat == 1 && scriptBoatSend.sailBoat == true && sailBoatTimer < 2) {
		if (bait > 99) {
		sendBytes('CLICKS_BOAT=sailBoat')
		closeSmittysDialogue('dialogue-confirm2')
		} else {clicksItem('sailBoat');closeSmittysDialogue('dialogue-confirm2')}
	}
	if (steamBoat == 1 && scriptBoatSend.steamBoat == true && steamBoatTimer < 2) {
		if (bait > 249) {
		sendBytes('CLICKS_BOAT=steamBoat')
		closeSmittysDialogue('dialogue-confirm2')
		} else {clicksItem('steamBoat');closeSmittysDialogue('dialogue-confirm2')}
	}
	if (trawler == 1 && scriptBoatSend.trawler == true && trawlerTimer < 2) {
		if (bait > 499) {
		sendBytes('CLICKS_BOAT=trawler')
		closeSmittysDialogue('dialogue-confirm2')
	} else {clicksItem('trawler');closeSmittysDialogue('dialogue-confirm2')}
	}
}

function autoCityUnlock() {
	sendBytes('CLICKS_SHOP_VOTE=9');
	sendBytes("COLLECT_VOTES")
}

window.autoCityUnlock = autoCityUnlock

function hideAllTabs2() {
	oldHideAllTabs()
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
}

window.hideAllTabs = hideAllTabs2

function autoChangeVar(variName,variValue,id) {
	localStorage.setItem(variName, JSON.stringify(variValue))
	window[variName] = variValue
	if (typeof id !== 'undefined') {
		if (variValue == true) {
			document.getElementById(id).style.color = "green"
		} else {
			document.getElementById(id).style.color = "red"
		}
		console.log(id)
	}
}

window.autoChangeVar2 = autoChangeVar;

function autoChangeObject(variName,variKey,variValue,id) {
	localStorage.setItem(variName+'.'+variKey, JSON.stringify(variValue))
	window[variName][variKey] = variValue
	if (typeof id !== 'undefined') {
		if (variValue == true) {
			document.getElementById(id).style.color = "green"
		} else {
			document.getElementById(id).style.color = "red"
		}
	}
}

window.autoChangeObject2 = autoChangeObject

function scriptAddTabs() {
	var scriptConfBar = document.createElement("div");
	let miscTab = document.querySelectorAll("#tab-misc > .main-button");
	scriptConfBar.innerHTML = `<div onclick="navigate('scriptConfig')" class="main-button" style="cursor: pointer;">
<table>
	<tbody><tr>
	<td><img src="images/whiteGear.png" class="img-small"></td>
	<td style="text-align:right;padding-right:20px;font-size:12pt;">SCRIPT CONFIG</td>
	</tr>
</tbody></table>
</div>`;
	miscTab[2].parentNode.insertBefore(scriptConfBar,miscTab[3]);
	
	var chatDiv = document.createElement("div");
	var scriptConfTab = document.createElement("div");
	var scriptConfMiningTab = document.createElement("div");
	var scriptConfCraftingTab = document.createElement("div");
	var scriptConfWoodcuttingTab = document.createElement("div");
	var scriptConfFarmingTab = document.createElement("div");
	var scriptConfSeedsTab = document.createElement("div");
	var scriptConfBrewingTab = document.createElement("div");
	var scriptConfPotionsTab = document.createElement("div");
	var scriptConfExploringTab = document.createElement("div");
	var scriptConfCookingTab = document.createElement("div");
	let gameScreen = document.querySelectorAll("#game-screen")[1];
	let logoutTab = document.getElementById('tab-logout');
	chatDiv.innerHTML = `<div id="div-chat" style="margin-top: 10px;border: 1px solid silver;background: linear-gradient(rgb(238, 238, 238), rgb(221, 221, 221));padding: 5px;">
		<div style="margin-bottom:5px;font-weight: bold;color: black;">Chat Box</div>
		<div id="messages" style="border: 1px solid grey;background-color: white;height: 200px;padding-left: 5px;overflow-y: auto;color:black;">

		</div>
		<div style="margin-top: 5px;">
			<input id="message-body" type="text" maxlength="200" size="100%" onkeydown="window.handleKeyDown(event)">
			<button onclick="window.sendChat()">Send</button>
		</div>
	</div>`
	
	scriptConfTab.innerHTML = `<div id="tab-scriptConfig" style="display:none">
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptGlobalToggle" onclick="window.autoChangeVar2('toggleGlobal',!toggleGlobal,this.id)" style="cursor: pointer; color: green;">
        <td style="padding-left: 10px;"><img src="images/whiteGear.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">SCRIPT TOGGLE</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptMiningTogglesBar" onclick="navigate('scriptConfigMining')" style="cursor: pointer; color: white;">
        <td style="padding-left: 10px;"><img src="images/miningSkill.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">MINING TOGGLES</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptCraftingTogglesBar" onclick="navigate('scriptConfigCrafting')" style="cursor: pointer; color: white;">
        <td style="padding-left: 10px;"><img src="images/craftingSkill.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">CRAFTING TOGGLES</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptWoodcuttingTogglesBar" onclick="navigate('scriptConfigWoodcutting')" style="cursor: pointer; color: white;">
        <td style="padding-left: 10px;"><img src="images/woodcuttingSkill.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">WOODCUTTING TOGGLES</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptFarmingTogglesBar" onclick="navigate('scriptConfigFarming')" style="cursor: pointer; color: white;">
        <td style="padding-left: 10px;"><img src="images/farmingSkill.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">FARMING TOGGLES</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptBrewingTogglesBar" onclick="navigate('scriptConfigBrewing')" style="cursor: pointer; color: white;">
        <td style="padding-left: 10px;"><img src="images/brewingSkill.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">BREWING TOGGLES</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptExploringTogglesBar" onclick="navigate('scriptConfigExploring')" style="cursor: pointer; color: white;">
        <td style="padding-left: 10px;"><img src="images/exploringSkill.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">EXPLORING TOGGLES</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptCookingTogglesBar" onclick="navigate('scriptConfigCooking')" style="cursor: pointer; color: white;">
        <td style="padding-left: 10px;"><img src="images/cookingSkill.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">COOKING TOGGLES</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptCityUnlock" onclick="if(isMayor == 0) {window.autoCityUnlock();console.log('City Unlocked')}" style="cursor: pointer; color: white;">
        <td style="padding-left: 10px;"><img src="images/mayorsHouse.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">CITY UNLOCK</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptGlobalToggleLoad" onclick="window.autoChangeVar2('toggleGlobalLoad',!toggleGlobalLoad,this.id)" style="cursor: pointer; color: green;">
        <td style="padding-left: 10px;"><img src="images/whiteGear.png" class="img-medium"></td>
        <td style="text-align:right;padding-right:20px;width:100%">GLOBAL TOGGLE ACTIVATED ON LOAD</td>
      </tr>
    </tbody>
  </table>
</div>`


	scriptConfMiningTab.innerHTML = `<div id="tab-scriptConfigMining" style="display:none">
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptGeodeToggle" onclick="window.autoChangeVar2('toggleGeodeOpen',!toggleGeodeOpen,this.id)" style="cursor: pointer; color: green;">
        <td style="padding-left: 10px;"><img src="images/geode5.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">GEODE OPENING</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptMineralToggle" onclick="window.autoChangeVar2('toggleMineralIdentify',!toggleMineralIdentify,this.id)" style="cursor: pointer; color: green;">
        <td style="padding-left: 10px;"><img src="images/tanzaniteMineral.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">MINERAL IDENTIFY</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptNecklaceToggle" onclick="window.autoChangeVar2('toggleNecklaceCharge',!toggleNecklaceCharge,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/mineralNecklace.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">NECKLACE CHARGE</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptTrainToggle" onclick="window.autoChangeVar2('toggleTrain',!toggleTrain,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/train.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">TRAIN</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr style="color: white;width: 100%;">
        <td style="padding-left: 10px;"><img src="images/trainTracks.png" class="img-small"></td>
        <td>
          <select name="scriptTrainAmount" onchange="window.autoChangeVar2('scriptTrainAmount',this.value)" id="scriptTrainAmount">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </td>
        <td style="text-align:right;padding-right:20px;width:100%">TRAINS TO SEND</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptRocketToggle" onclick="window.autoChangeVar2('toggleRocket',!toggleRocket,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/rocket.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">ROCKET</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr style="color: white;width: 100%;">
        <td style="padding-left: 10px;"><img src="images/mars.png" class="img-small"></td>
        <td>
          <select name="scriptRocketDestination" onchange="window.autoChangeVar2('scriptRocket',this.value)" id="scriptRocketDestination">
            <option value="Moon">Moon</option>
            <option value="Mars">Mars</option>
            <option value="Sun">Sun</option>
          </select>
        </td>
        <td style="text-align:right;padding-right:20px;width:100%">ROCKET DESTINATION</td>
      </tr>
    </tbody>
  </table>
</div>`

	scriptConfCraftingTab.innerHTML= `<div id="tab-scriptConfigCrafting" style="display:none">
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptSmeltingToggle" onclick="window.autoChangeVar2('toggleSmelting',!toggleSmelting,this.id)" style="cursor: pointer; color: green;">
        <td style="padding-left: 10px;"><img src="images/ancientFurnace.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">SMELTING</td>
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptRefinaryToggle" onclick="window.autoChangeVar2('toggleRefinary',!toggleRefinary,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/goldBarRefinery.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">REFINARY</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptRefinaryBar" style="color: white;">
        <td style="padding-left: 10px;"><img src="images/refinedGoldBars.png" class="img-small"></td>
        <td style="padding-left: 50px;">
          <select name="scriptRefinaryBarOptions" onchange="window.autoChangeVar2('scriptRefinaryBar',this.value)" id="scriptRefinaryOptions">
            <option value="gold">Gold</option>
            <option value="promethium">Promethium</option>
          </select>
        </td>
        <td style="text-align:right;padding-right:20px;width:100%">REFINARY BAR</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptFoundryToggle" onclick="window.autoChangeVar2('toggleCharcoal',!toggleCharcoal,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/charcoalFoundry.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">CHARCOAL FOUNDRY</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptFoundryWood" style="color: white;">
        <td style="padding-left: 10px;"><img src="images/lavaLogs.png" class="img-small"></td>
        <td style="padding-left: 50px;">
          <select name="scriptFoundryWoodOptions" onchange="window.autoChangeVar2('scriptFoundryWood',this.value)" id="scriptFoundryWoodOptions">
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
        <td style="text-align:right;padding-right:20px;width:100%">CHARCOAL LOG</td>
      </tr>
    </tbody>
  </table>
</div>`

	scriptConfWoodcuttingTab.innerHTML= `<div id="tab-scriptConfigWoodcutting" style="display:none">
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptLumberToggle" onclick="window.autoChangeVar2('toggleWoodcutting',!toggleWoodcutting,this.id)" style="cursor: pointer; color: green;">
        <td style="padding-left: 10px;"><img src="images/lumberjack.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">LUMBERJACK</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
    <tbody style="display: block;">
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','tree',!scriptTreeIgnore.tree,this.id)" id="treeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/tree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','oakTree',!scriptTreeIgnore.oakTree,this.id)" id="oakTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/oakTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">OAK TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','willowTree',!scriptTreeIgnore.willowTree,this.id)" id="willowTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/willowTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">WILLOW TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','mapleTree',!scriptTreeIgnore.mapleTree,this.id)" id="mapleTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/mapleTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">MAPLE TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','redwoodTree',!scriptTreeIgnore.redwoodTree,this.id)" id="redwoodTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/redwoodTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">REDWOOD TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','pineTree',!scriptTreeIgnore.pineTree,this.id)" id="pineTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/pineTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">PINE TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','hauntedTree',!scriptTreeIgnore.hauntedTree,this.id)" id="hauntedTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/hauntedTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">HAUNTED TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','jungleTree',!scriptTreeIgnore.jungleTree,this.id)" id="jungleTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/jungleTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">JUNGLE TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','lavaTree',!scriptTreeIgnore.lavaTree,this.id)" id="lavaTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/lavaTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">LAVA TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','goldTree',!scriptTreeIgnore.goldTree,this.id)" id="goldTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/goldTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">GOLD TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','magicTree',!scriptTreeIgnore.magicTree,this.id)" id="magicTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/magicTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">MAGIC TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','appleTree',!scriptTreeIgnore.appleTree,this.id)" id="appleTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/appleTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">APPLE TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','cactusTree',!scriptTreeIgnore.cactusTree,this.id)" id="cactusTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/cactusTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">CACTUS TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','bananaTree',!scriptTreeIgnore.bananaTree,this.id)" id="bananaTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/bananaTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">BANANA TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','palmTree',!scriptTreeIgnore.palmTree,this.id)" id="palmTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/palmTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">PALM TREE IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptTreeIgnore','pineappleTree',!scriptTreeIgnore.pineappleTree,this.id)" id="pineappleTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/pineappleTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">PINEAPPLE TREE IGNORE</td>
      </tr>
      <tr style="color: red;" onclick="window.autoChangeObject2('scriptTreeIgnore','starfuitTree',!scriptTreeIgnore.starfuitTree,this.id)" id="starfruitTreeIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/starfruitTree.png" class="img-small"></td>
        <td style="text-align: center;">STARFRUIT TREE IGNORE</td>
      </tr>
    </tbody>
  </table>
</div>`

	scriptConfFarmingTab.innerHTML= `<div id="tab-scriptConfigFarming" style="display:none">
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptFarmingToggle" onclick="window.autoChangeVar2('toggleFarming',!toggleFarming,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/farmer.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">HARVEST AND PLANT</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;cursor: pointer;">
    <tbody>
      <tr id="scriptSeedToggleBar" onclick="navigate('scriptConfigSeeds')" style="color: white;">
        <td style="padding-left: 10px;"><img src="images/goldLeafSeeds.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">SEED SELECTOR</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptBonesToggle" onclick="window.autoChangeVar2('toggleBones',!toggleBones,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/bonemealBin.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">BONEMEAL</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
    <tbody style="display: block;">
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBonesIgnore','bones',!scriptBonesIgnore.bones,this.id)" id="bonesIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/bones.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">BONES IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptBonesIgnore','ashes',!scriptBonesIgnore.ashes,this.id)" id="ashesIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/ashes.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">ASHES IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBonesIgnore','iceBones',!scriptBonesIgnore.iceBones,this.id)" id="iceBonesIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/iceBones.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">ICE BONES IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBonesIgnore','zombieBones',!scriptBonesIgnore.zombieBones,this.id)" id="zombieBonesIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/zombieBones.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">ZOMBIE BONES IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBonesIgnore','bloodBones',!scriptBonesIgnore.bloodBones,this.id)" id="bloodBonesIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/bloodBones.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">BLOOD BONES IGNORE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBonesIgnore','fishBones',!scriptBonesIgnore.fishBones,this.id)" id="fishBonesIgnoreToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/fishBones.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">FISH BONES IGNORE</td>
      </tr>
    </tbody>
  </table>
</div>`

	scriptConfSeedsTab.innerHTML= `<div id="tab-scriptConfigSeeds" style="display:none">
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
  <ol id="sortableSeeds" style="list-style: none;padding: 0px;border: 1px solid grey;border-radius: 6px;margin: 10px;font-size: 25px;">
    <li class="ui-state-default" value="redMushroomSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Red Mushroom Seeds<img src="images/redMushroomSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="dottedGreenLeafSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Dotted Green Leaf Seeds<img src="images/dottedGreenLeafSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="greenLeafSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Green Leaf Seeds<img src="images/greenLeafSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="limeLeafSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Lime Leaf Seeds<img src="images/limeLeafSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="goldLeafSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Gold Leaf Seeds<img src="images/goldLeafSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="crystalLeafSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Crystal Leaf Seeds<img src="images/crystalLeafSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="stripedGreenLeafSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Striped Green Leaf Seeds<img src="images/stripedGreenLeafSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="stripedGoldLeafSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Striped Gold Leaf Seeds<img src="images/stripedGoldLeafSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="stripedCrystalLeafSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Striped Crystal Leaf Seeds<img src="images/stripedCrystalLeafSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="treeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Tree Seeds<img src="images/treeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="oakTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Oak Tree Seeds<img src="images/oakTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="willowTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Willow Tree Seeds<img src="images/willowTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="mapleTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Maple Tree Seeds<img src="images/mapleTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="redwoodTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Redwood Tree Seeds<img src="images/redwoodTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="pineTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Pine Tree Seeds<img src="images/pineTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="hauntedTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Haunted Tree Seeds<img src="images/hauntedTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="jungleTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Jungle Tree Seeds<img src="images/jungleTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="lavaTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Lava Tree Seeds<img src="images/lavaTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="goldTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Gold Tree Seeds<img src="images/goldTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="magicTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Magic Tree Seeds<img src="images/magicTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="appleTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Apple Tree Seeds<img src="images/appleTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="cactusTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Cactus Tree Seeds<img src="images/cactusTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="bananaTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Banana Tree Seeds<img src="images/bananaTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="palmTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Palm Tree Seeds<img src="images/palmTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="pineappleTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Pineapple Tree Seeds<img src="images/pineappleTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="starfruitTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Starfruit Tree Seeds<img src="images/starfruitTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
    <li class="ui-state-default" value="goldAppleTreeSeeds" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="seed-checkbox"> Gold Apple Tree Seeds<img src="images/goldAppleTreeSeeds.png" class="img-small" style="padding-right: 10px;">
    </li>
  </ol>
</div>`

	scriptConfBrewingTab.innerHTML= `<div id="tab-scriptConfigBrewing" style="display:none">
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptDrinkToggle" onclick="window.autoChangeVar2('toggleDrink',!toggleDrink,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/diamondBrewingKit.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">POTION DRINK</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptBrewToggle" onclick="window.autoChangeVar2('toggleBrew',!toggleBrew,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/goldLeaf.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">POTION BREW</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;cursor: pointer;">
    <tbody>
      <tr id="scriptPotionToggleBar" onclick="navigate('scriptConfigPotions')" style="color: white;">
        <td style="padding-left: 10px;"><img src="images/researchSpeedPotion.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">POTION SELECTOR</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptTreeUpgradeToggle" onclick="window.autoChangeVar2('toggleTreeUpgrade',!toggleTreeUpgrade,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/woodcuttingUpgradePotion.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">TREE UPGRADE POTION</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
    <tbody style="display: block;">
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','tree',!scriptTreeUpgrade.tree,this.id)" id="treeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/tree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','oakTree',!scriptTreeUpgrade.oakTree,this.id)" id="oakTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/oakTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">OAK TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','willowTree',!scriptTreeUpgrade.willowTree,this.id)" id="willowTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/willowTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">WILLOW TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','mapleTree',!scriptTreeUpgrade.mapleTree,this.id)" id="mapleTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/mapleTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">MAPLE TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','redwoodTree',!scriptTreeUpgrade.redwoodTree,this.id)" id="redwoodTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/redwoodTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">REDWOOD TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','pineTree',!scriptTreeUpgrade.pineTree,this.id)" id="pineTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/pineTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">PINE TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','hauntedTree',!scriptTreeUpgrade.hauntedTree,this.id)" id="hauntedTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/hauntedTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">HAUNTED TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','jungleTree',!scriptTreeUpgrade.jungleTree,this.id)" id="jungleTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/jungleTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">JUNGLE TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','lavaTree',!scriptTreeUpgrade.lavaTree,this.id)" id="lavaTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/lavaTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">LAVA TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','goldTree',!scriptTreeUpgrade.goldTree,this.id)" id="goldTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/goldTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">GOLD TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','magicTree',!scriptTreeUpgrade.magicTree,this.id)" id="magicTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/magicTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">MAGIC TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','appleTree',!scriptTreeUpgrade.appleTree,this.id)" id="appleTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/appleTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">APPLE TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','cactusTree',!scriptTreeUpgrade.cactusTree,this.id)" id="cactusTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/cactusTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">CACTUS TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','bananaTree',!scriptTreeUpgrade.bananaTree,this.id)" id="bananaTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/bananaTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">BANANA TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','palmTree',!scriptTreeUpgrade.palmTree,this.id)" id="palmTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/palmTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">PALM TREE UPGRADE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptTreeUpgrade','pineappleTree',!scriptTreeUpgrade.pineappleTree,this.id)" id="pineappleTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/pineappleTree.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">PINEAPPLE TREE UPGRADE</td>
      </tr>
      <tr style="color: red;" onclick="window.autoChangeObject2('scriptTreeUpgrade','starfuitTree',!scriptTreeUpgrade.starfuitTree,this.id)" id="starfruitTreeUpgradeToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/starfruitTree.png" class="img-small"></td>
        <td style="text-align: center;">STARFRUIT TREE UPGRADE</td>
      </tr>
    </tbody>
  </table>
</div>`

	scriptConfPotionsTab.innerHTML= `<div id="tab-scriptConfigPotions" style="display:none">
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
    <li class="ui-state-default" value="furnaceSpeedPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">FURNACE SPEED POTION<img src="images/furnaceSpeedPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="seedFinderPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">SEED FINDER POTION<img src="images/seedFinderPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="compostPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">COMPOST POTION<img src="images/compostPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="treeCompostPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">TREE COMPOST POTION<img src="images/treeCompostPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="fishingSpeedPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">FISHING SPEED POTION<img src="images/fishingSpeedPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="woodcuttingXpPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">WOODCUTTING XP POTION<img src="images/woodcuttingXpPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="exploringSpeedPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">EXPLORER SPEED POTION<img src="images/exploringSpeedPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="baitPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">BAIT POTION<img src="images/baitPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="farmingXpPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">FARMING XP POTION<img src="images/farmingXpPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="fastCompostPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">FAST COMPOST POTION<img src="images/fastCompostPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="oilPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">OIL POTION<img src="images/oilPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="coinPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">COIN POTION<img src="images/coinPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="piratesPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">PIRATES POTION<img src="images/piratesPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="promethiumPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">PROMETHIUM POTION<img src="images/promethiumPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="rocketSpeedPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">ROCKET SPEED POTION<img src="images/rocketSpeedPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="fruitTreePotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">FRUIT TREE POTION<img src="images/fruitTreePotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="titaniumPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">TITANIUM POTION<img src="images/titaniumPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="researchSpeedPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">RESEARCH SPEED POTION<img src="images/researchSpeedPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
    <li class="ui-state-default" value="superRocketSpeedPotion" style="border-radius: 6px;background: #1a1a1a;color: white;justify-content: space-between;display: flex;">
      <input type="checkbox" class="drink-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">SUPER ROCKET SPEED POTION<img src="images/superRocketSpeedPotion.png" class="img-small" style="padding-right: 10px;"><input type="checkbox" class="brew-checkbox" style="margin-right: 30px;" onchange="window.savePotions2()">
    </li>
  </ol>
</div>`

	scriptConfExploringTab.innerHTML= `<div id="tab-scriptConfigExploring" style="display:none">
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptExploreToggle" onclick="window.autoChangeVar2('toggleExplore',!toggleExplore,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/explorer.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">EXPLORER</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptExplorerArea" style="color: white;">
        <td style="padding-left: 10px;"><img src="images/caves.png" class="img-small"></td>
        <td style="padding-left: 50px;">
          <select name="scriptAreaOptions" onchange="window.autoChangeVar2('scriptArea',this.value);window.monsterOptions2(this.value);window.autoChangeVar2('scriptMonster',document.getElementById('scriptMonsterOptions').value)" id="scriptAreaOptions">
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
        <td style="text-align:right;padding-right:20px;width:100%">EXPLORER AREA</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptFightToggle" onclick="window.autoChangeVar2('toggleFight',!toggleFight,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/combat.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">FIGHT</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptResetToggle" onclick="window.autoChangeVar2('toggleResetFight',!toggleResetFight,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/resetFightingPotion.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">RESET POTION</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
    <tbody>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','fields',!scriptResetArea.fields,this.id)" id="fieldsResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/fields.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Fields</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','forests',!scriptResetArea.forests,this.id)" id="forestsResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/forests.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Forests</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','caves',!scriptResetArea.caves,this.id)" id="cavesResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/caves.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Caves</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','volcano',!scriptResetArea.volcano,this.id)" id="volcanoResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/volcano.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Volcano</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','northernFields',!scriptResetArea.northernFields,this.id)" id="northernFieldsResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/northernFields.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Northern Fields</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','hauntedMansion',!scriptResetArea.hauntedMansion,this.id)" id="hauntedMansionResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/hauntedMansion.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Haunted Mansion</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','desert',!scriptResetArea.desert,this.id)" id="desertResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/desert.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Desert</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','ocean',!scriptResetArea.ocean,this.id)" id="oceanResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/ocean.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Ocean</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','jungle',!scriptResetArea.jungle,this.id)" id="jungleResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/jungle.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Jungle</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','dungeonEntrance',!scriptResetArea.dungeonEntrance,this.id)" id="dungeonEntranceResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/dungeonEntrance.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Dungeon Entrance</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','dungeon',!scriptResetArea.dungeon,this.id)" id="dungeonResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/dungeon.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Dungeon</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','castle',!scriptResetArea.castle,this.id)" id="castleResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/castle.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Castle</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','cemetery',!scriptResetArea.cemetery,this.id)" id="cemeteryResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/cemetery.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Cemetery</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','factory',!scriptResetArea.factory,this.id)" id="factoryResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/factory.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Factory</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','hauntedWoods',!scriptResetArea.hauntedWoods,this.id)" id="hauntedWoodsResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/hauntedWoods.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Haunted Woods</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptResetArea','deepOcean',!scriptResetArea.deepOcean,this.id)" id="deepOceanResetToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/deepOcean.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">Deep Ocean</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptMonsterFindToggle" onclick="window.autoChangeVar2('toggleMonsterFind',!toggleMonsterFind,this.id)" style="cursor: pointer; color: green;">
        <td style="padding-left: 10px;"><img src="images/skeletonMonster.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">SEARCH FOR MONSTER</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptExplorerArea" style="color: white;">
        <td style="padding-left: 10px;"><img src="images/exploringSkill.png" class="img-small"></td>
        <td style="padding-left: 50px;"><select name="scriptMonsterOptions" onchange="window.autoChangeVar2('scriptMonster',this.value)" id="scriptMonsterOptions">
          </select>
        </td>
        <td style="text-align:right;padding-right:20px;width:100%">MONSTER TO SEARCH</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptShinyToggle" onclick="window.autoChangeVar2('toggleShiny',!toggleShiny,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/shiny.gif" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">SHINY/GEM GOBLIN HUNT</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptSpellToggle" onclick="window.autoChangeVar2('toggleSpell',!toggleSpell,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/fireSpell.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">SPELL</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptCombatPotionToggle" onclick="window.autoChangeVar2('toggleCombatPotion',!toggleCombatPotion,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/ghostScanCombatPotion.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">COMBAT POTION</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptHealToggle" onclick="window.autoChangeVar2('toggleHeal',!toggleHeal,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/autoTickHeal.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">TICK HEAL</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptCousinToggle" onclick="window.autoChangeVar2('toggleCousin',!toggleCousin,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/goblinCousin.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">GOBLIN COUSIN</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptCousinArea" style="color: white;">
        <td style="padding-left: 10px;"><img src="images/fields.png" class="img-small"></td>
        <td style="padding-left: 50px;">
          <select name="scriptCousinAreaOptions" onchange="window.autoChangeVar2('scriptCousinArea',this.value)" id="scriptCousinAreaOptions">
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
        <td style="text-align:right;padding-right:20px;width:100%">COUSIN AREA</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptBagsToggle" onclick="window.autoChangeVar2('toggleBags',!toggleBags,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/fieldsLoot.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">BAGS OPENING</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptStatueToggle" onclick="window.autoChangeVar2('toggleStatue',!toggleStatue,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/bronzeStatueMetalDetector.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">STATUE SELL</td>
      </tr>
    </tbody>
  </table>
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptArtifactToggle" onclick="window.autoChangeVar2('toggleArtifact',!toggleArtifact,this.id)" style="cursor: pointer; color: red;">
        <td style="padding-left: 10px;"><img src="images/skullArtifact.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">ARTIFACT CONVERT</td>
      </tr>
    </tbody>
  </table>
</div>`

	scriptConfCookingTab.innerHTML= `<div id="tab-scriptConfigCooking" style="display:none">
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
  <table style="cursor: pointer;border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 32px;">
    <tbody>
      <tr id="scriptBoatToggle" onclick="window.autoChangeVar2('toggleBoat',!toggleBoat,this.id)" style="cursor: pointer; color: green;">
        <td style="padding-left: 10px;"><img src="images/sailBoat.png" class="img-small"></td>
        <td style="text-align:right;padding-right:20px;width:100%">BOAT</td>
      </tr>
    </tbody>
  </table>
  <table style="border: 1px solid grey;border-radius: 6px;margin: 10px 7px;background: #1a1a1a;font-size: 20px;width: 97%;">
    <tbody style="display: block;">
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBoatSend','rowBoat',!scriptBoatSend.rowBoat,this.id)" id="rowBoatSendToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/rowBoat.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">ROW BOAT</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBoatSend','canoeBoat',!scriptBoatSend.canoeBoat,this.id)" id="canoeBoatSendToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/canoeBoat.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">CANOE</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBoatSend','sailBoat',!scriptBoatSend.sailBoat,this.id)" id="sailBoatSendToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/sailBoat.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">SAIL BOAT</td>
      </tr>
      <tr style="display: inline-block; color: red; width: 50%;" onclick="window.autoChangeObject2('scriptBoatSend','highWind',!scriptBoatSend.highWind,this.id)" id="highWindSendToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/windIcon.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">WAIT HIGH WIND</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBoatSend','steamBoat',!scriptBoatSend.steamBoat,this.id)" id="steamBoatSendToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/steamBoat.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">STEAM BOAT</td>
      </tr>
      <tr style="display: inline-block; color: green; width: 50%;" onclick="window.autoChangeObject2('scriptBoatSend','trawler',!scriptBoatSend.trawler,this.id)" id="trawlerSendToggle">
        <td style="padding-left: 10px;width: 5%;"><img src="images/trawler.png" class="img-small"></td>
        <td style="text-align: center;width: 40%">TRAWLER</td>
      </tr>
    </tbody>
  </table>
</div>`;
	gameScreen.insertBefore(scriptConfTab,logoutTab);
	gameScreen.insertBefore(scriptConfMiningTab,logoutTab);
	gameScreen.insertBefore(scriptConfCraftingTab,logoutTab);
	gameScreen.insertBefore(scriptConfWoodcuttingTab,logoutTab);
	gameScreen.insertBefore(scriptConfFarmingTab,logoutTab);
	gameScreen.insertBefore(scriptConfSeedsTab,logoutTab);
	gameScreen.insertBefore(scriptConfBrewingTab,logoutTab);
	gameScreen.insertBefore(scriptConfPotionsTab,logoutTab);
	gameScreen.insertBefore(scriptConfExploringTab,logoutTab);
	gameScreen.insertBefore(scriptConfCookingTab,logoutTab);
	gameScreen.insertBefore(chatDiv,logoutTab);
}

function scriptStyleTabs() {
	document.getElementById('scriptGlobalToggle').style.color = toggleGlobal ? 'green' : 'red';
	document.getElementById('scriptGlobalToggleLoad').style.color = toggleGlobalLoad ? 'green' : 'red';
	document.getElementById('scriptGeodeToggle').style.color = toggleGeodeOpen ? 'green' : 'red';
	document.getElementById('scriptMineralToggle').style.color = toggleMineralIdentify ? 'green' : 'red';
	document.getElementById('scriptNecklaceToggle').style.color = toggleNecklaceCharge ? 'green' : 'red';
	document.getElementById('scriptTrainToggle').style.color = toggleTrain ? 'green' : 'red';
	document.getElementById('scriptTrainAmount').value = scriptTrainAmount;
	document.getElementById('scriptRocketToggle').style.color = toggleRocket ? 'green' : 'red';
	document.getElementById('scriptRocketDestination').value = scriptRocket;
	document.getElementById('scriptSmeltingToggle').style.color = toggleSmelting ? 'green' : 'red';
	document.getElementById('scriptRefinaryToggle').style.color = toggleRefinary ? 'green' : 'red';
	document.getElementById('scriptRefinaryOptions').value = scriptRefinaryBar;
	document.getElementById('scriptFoundryToggle').style.color = toggleCharcoal ? 'green' : 'red';
	document.getElementById('scriptFoundryWoodOptions').value = scriptFoundryWood;
	document.getElementById('scriptLumberToggle').style.color = toggleWoodcutting ? 'green' : 'red';
	document.getElementById('treeIgnoreToggle').style.color = scriptTreeIgnore.tree ? 'green' : 'red';
	document.getElementById('oakTreeIgnoreToggle').style.color = scriptTreeIgnore.oakTree ? 'green' : 'red';
	document.getElementById('willowTreeIgnoreToggle').style.color = scriptTreeIgnore.willowTree ? 'green' : 'red';
	document.getElementById('mapleTreeIgnoreToggle').style.color = scriptTreeIgnore.mapleTree ? 'green' : 'red';
	document.getElementById('redwoodTreeIgnoreToggle').style.color = scriptTreeIgnore.redwoodTree ? 'green' : 'red';
	document.getElementById('pineTreeIgnoreToggle').style.color = scriptTreeIgnore.pineTree ? 'green' : 'red';
	document.getElementById('hauntedTreeIgnoreToggle').style.color = scriptTreeIgnore.hauntedTree ? 'green' : 'red';
	document.getElementById('jungleTreeIgnoreToggle').style.color = scriptTreeIgnore.jungleTree ? 'green' : 'red';
	document.getElementById('lavaTreeIgnoreToggle').style.color = scriptTreeIgnore.lavaTree ? 'green' : 'red';
	document.getElementById('goldTreeIgnoreToggle').style.color = scriptTreeIgnore.goldTree ? 'green' : 'red';
	document.getElementById('magicTreeIgnoreToggle').style.color = scriptTreeIgnore.magicTree ? 'green' : 'red';
	document.getElementById('appleTreeIgnoreToggle').style.color = scriptTreeIgnore.appleTree ? 'green' : 'red';
	document.getElementById('cactusTreeIgnoreToggle').style.color = scriptTreeIgnore.cactusTree ? 'green' : 'red';
	document.getElementById('bananaTreeIgnoreToggle').style.color = scriptTreeIgnore.bananaTree ? 'green' : 'red';
	document.getElementById('palmTreeIgnoreToggle').style.color = scriptTreeIgnore.palmTree ? 'green' : 'red';
	document.getElementById('pineappleTreeIgnoreToggle').style.color = scriptTreeIgnore.pineappleTree ? 'green' : 'red';
	document.getElementById('starfruitTreeIgnoreToggle').style.color = scriptTreeIgnore.starfruitTree ? 'green' : 'red';
	document.getElementById('scriptFarmingToggle').style.color = toggleFarming ? 'green' : 'red';
	document.getElementById('scriptBonesToggle').style.color = toggleBones ? 'green' : 'red';
	document.getElementById('bonesIgnoreToggle').style.color = scriptBonesIgnore.bones ? 'green' : 'red';
	document.getElementById('ashesIgnoreToggle').style.color = scriptBonesIgnore.ashes ? 'green' : 'red';
	document.getElementById('iceBonesIgnoreToggle').style.color = scriptBonesIgnore.iceBones ? 'green' : 'red';
	document.getElementById('zombieBonesIgnoreToggle').style.color = scriptBonesIgnore.zombieBones ? 'green' : 'red';
	document.getElementById('bloodBonesIgnoreToggle').style.color = scriptBonesIgnore.bloodBones ? 'green' : 'red';
	document.getElementById('fishBonesIgnoreToggle').style.color = scriptBonesIgnore.fishBones ? 'green' : 'red';
	document.getElementById('scriptDrinkToggle').style.color = toggleDrink ? 'green' : 'red';
	document.getElementById('scriptBrewToggle').style.color = toggleBrew ? 'green' : 'red';
	document.getElementById('treeUpgradeToggle').style.color = scriptTreeUpgrade.tree ? 'green' : 'red';
	document.getElementById('oakTreeUpgradeToggle').style.color = scriptTreeUpgrade.oakTree ? 'green' : 'red';
	document.getElementById('willowTreeUpgradeToggle').style.color = scriptTreeUpgrade.willowTree ? 'green' : 'red';
	document.getElementById('mapleTreeUpgradeToggle').style.color = scriptTreeUpgrade.mapleTree ? 'green' : 'red';
	document.getElementById('redwoodTreeUpgradeToggle').style.color = scriptTreeUpgrade.redwoodTree ? 'green' : 'red';
	document.getElementById('pineTreeUpgradeToggle').style.color = scriptTreeUpgrade.pineTree ? 'green' : 'red';
	document.getElementById('hauntedTreeUpgradeToggle').style.color = scriptTreeUpgrade.hauntedTree ? 'green' : 'red';
	document.getElementById('jungleTreeUpgradeToggle').style.color = scriptTreeUpgrade.jungleTree ? 'green' : 'red';
	document.getElementById('lavaTreeUpgradeToggle').style.color = scriptTreeUpgrade.lavaTree ? 'green' : 'red';
	document.getElementById('goldTreeUpgradeToggle').style.color = scriptTreeUpgrade.goldTree ? 'green' : 'red';
	document.getElementById('magicTreeUpgradeToggle').style.color = scriptTreeUpgrade.magicTree ? 'green' : 'red';
	document.getElementById('appleTreeUpgradeToggle').style.color = scriptTreeUpgrade.appleTree ? 'green' : 'red';
	document.getElementById('cactusTreeUpgradeToggle').style.color = scriptTreeUpgrade.cactusTree ? 'green' : 'red';
	document.getElementById('bananaTreeUpgradeToggle').style.color = scriptTreeUpgrade.bananaTree ? 'green' : 'red';
	document.getElementById('palmTreeUpgradeToggle').style.color = scriptTreeUpgrade.palmTree ? 'green' : 'red';
	document.getElementById('pineappleTreeUpgradeToggle').style.color = scriptTreeUpgrade.pineappleTree ? 'green' : 'red';
	document.getElementById('scriptExploreToggle').style.color = toggleExplore ? 'green' : 'red';
	document.getElementById('scriptAreaOptions').value = scriptArea;
	document.getElementById('scriptFightToggle').style.color = toggleFight ? 'green' : 'red';
	document.getElementById('fieldsResetToggle').style.color = scriptResetArea.fields ? 'green' : 'red';
	document.getElementById('forestsResetToggle').style.color = scriptResetArea.forests ? 'green' : 'red';
	document.getElementById('cavesResetToggle').style.color = scriptResetArea.caves ? 'green' : 'red';
	document.getElementById('volcanoResetToggle').style.color = scriptResetArea.volcano ? 'green' : 'red';
	document.getElementById('northernFieldsResetToggle').style.color = scriptResetArea.northernFields ? 'green' : 'red';
	document.getElementById('hauntedMansionResetToggle').style.color = scriptResetArea.hauntedMansion ? 'green' : 'red';
	document.getElementById('desertResetToggle').style.color = scriptResetArea.desert ? 'green' : 'red';
	document.getElementById('oceanResetToggle').style.color = scriptResetArea.ocean ? 'green' : 'red';
	document.getElementById('jungleResetToggle').style.color = scriptResetArea.jungle ? 'green' : 'red';
	document.getElementById('dungeonEntranceResetToggle').style.color = scriptResetArea.dungeonEntrance ? 'green' : 'red';
	document.getElementById('dungeonResetToggle').style.color = scriptResetArea.dungeon ? 'green' : 'red';
	document.getElementById('castleResetToggle').style.color = scriptResetArea.castle ? 'green' : 'red';
	document.getElementById('cemeteryResetToggle').style.color = scriptResetArea.cemetery ? 'green' : 'red';
	document.getElementById('factoryResetToggle').style.color = scriptResetArea.factory ? 'green' : 'red';
	document.getElementById('hauntedWoodsResetToggle').style.color = scriptResetArea.hauntedWoods ? 'green' : 'red';
	document.getElementById('deepOceanResetToggle').style.color = scriptResetArea.deepOcean ? 'green' : 'red';
	document.getElementById('scriptResetToggle').style.color = toggleResetFight ? 'green' : 'red';
	document.getElementById('scriptMonsterOptions').value = scriptMonster;
	document.getElementById('scriptMonsterFindToggle').style.color = toggleMonsterFind ? 'green' : 'red';
	document.getElementById('scriptShinyToggle').style.color = toggleShiny ? 'green' : 'red';
	document.getElementById('scriptSpellToggle').style.color = toggleSpell ? 'green' : 'red';
	document.getElementById('scriptCombatPotionToggle').style.color = toggleCombatPotion ? 'green' : 'red';
	document.getElementById('scriptHealToggle').style.color = toggleHeal ? 'green' : 'red';
	document.getElementById('scriptCousinToggle').style.color = toggleCousin ? 'green' : 'red';
	document.getElementById('scriptCousinArea').value = scriptCousinArea;
	document.getElementById('scriptStatueToggle').style.color = toggleStatue ? 'green' : 'red';
	document.getElementById('scriptArtifactToggle').style.color = toggleArtifact ? 'green' : 'red';
	document.getElementById('scriptBoatToggle').style.color = toggleBoat ? 'green' : 'red';
	document.getElementById('rowBoatSendToggle').style.color = scriptBoatSend.rowBoat ? 'green' : 'red';
	document.getElementById('canoeBoatSendToggle').style.color = scriptBoatSend.canoeBoat ? 'green' : 'red';
	document.getElementById('sailBoatSendToggle').style.color = scriptBoatSend.sailBoat ? 'green' : 'red';
	document.getElementById('highWindSendToggle').style.color = scriptBoatSend.highWind ? 'green' : 'red';
	document.getElementById('steamBoatSendToggle').style.color = scriptBoatSend.steamBoat ? 'green' : 'red';
	document.getElementById('trawlerSendToggle').style.color = scriptBoatSend.trawler ? 'green' : 'red';
}

function saveOreOrder() {
  var oreItems = document.getElementById("sortableOres").getElementsByTagName("li");
  var oreOrder = [];

  for (var i = 0; i < oreItems.length; i++) {
    var oreValue = oreItems[i].getAttribute("value");
    var oreMinimum = oreItems[i].querySelector(".oreMinimum").value;


    oreOrder.push({ value: oreValue, minimum: oreMinimum });
  }

  localStorage.setItem("oreOrder", JSON.stringify(oreOrder));
}

function loadOreOrder() {
  var oreOrderData = localStorage.getItem("oreOrder");

  if (oreOrderData) {
    oreOrderData = JSON.parse(oreOrderData);
    var oreOrderList = document.getElementById("sortableOres");

    for (var i = 0; i < oreOrderData.length; i++) {
      var oreValue = oreOrderData[i].value;
      var minimum = oreOrderData[i].minimum;
      var oreItem = oreOrderList.querySelector("[value='" + oreValue + "']");
      
      oreOrderList.appendChild(oreItem);
	  var oreMinimum = oreItem.querySelector(".oreMinimum");
      oreMinimum.value = minimum
    }
  }
}

function saveSeedOrder() {
  var seedOrderList = document.getElementById("sortableSeeds");
  var seedItems = seedOrderList.getElementsByTagName("li");
  var seedOrder = [];

  for (var i = 0; i < seedItems.length; i++) {
    var seedValue = seedItems[i].getAttribute("value");
    var seedCheckbox = seedItems[i].querySelector(".seed-checkbox");
    var isChecked = seedCheckbox.checked;

    seedOrder.push({ value: seedValue, checked: isChecked });
  }

  localStorage.setItem("seedOrder", JSON.stringify(seedOrder));
}

function loadSeedOrder() {
  var seedOrderData = localStorage.getItem("seedOrder");

  if (seedOrderData) {
    seedOrderData = JSON.parse(seedOrderData);
    var seedOrderList = document.getElementById("sortableSeeds");

    for (var i = 0; i < seedOrderData.length; i++) {
      var seedValue = seedOrderData[i].value;
      var isChecked = seedOrderData[i].checked;
      var seedItem = seedOrderList.querySelector("[value='" + seedValue + "']");
      var seedCheckbox = seedItem.querySelector(".seed-checkbox");

      if (isChecked) {
        seedCheckbox.checked = true;
      } else {
        seedCheckbox.checked = false;
      }

      seedOrderList.appendChild(seedItem);
    }
  }
}

function savePotions() {
  var potionList = document.getElementById("sortablePotions");
  var potionItems = potionList.getElementsByTagName("li");
  var potionState = [];

  for (var i = 0; i < potionItems.length; i++) {
    var potionValue = potionItems[i].getAttribute("value");
    var drinkCheckbox = potionItems[i].querySelector(".drink-checkbox");
    var brewCheckbox = potionItems[i].querySelector(".brew-checkbox");
    var isDrinkChecked = drinkCheckbox.checked;
    var isBrewChecked = brewCheckbox.checked;

    potionState.push({
      value: potionValue,
      drinkChecked: isDrinkChecked,
      brewChecked: isBrewChecked
    });
  }

  localStorage.setItem("potionState", JSON.stringify(potionState));
}

window.savePotions2 = savePotions

function loadPotions() {
  var potionState = localStorage.getItem("potionState");

  if (potionState) {
    potionState = JSON.parse(potionState);
    var potionList = document.getElementById("sortablePotions");
    var potionItems = potionList.getElementsByTagName("li");

    for (var i = 0; i < potionState.length; i++) {
      var potionValue = potionState[i].value;
      var drinkCheckbox = potionItems[i].querySelector(".drink-checkbox");
      var brewCheckbox = potionItems[i].querySelector(".brew-checkbox");
      var isDrinkChecked = potionState[i].drinkChecked;
      var isBrewChecked = potionState[i].brewChecked;

      drinkCheckbox.checked = isDrinkChecked;
      brewCheckbox.checked = isBrewChecked;
    }
  }
}

function monsterOptions(monsterArea) {
    var select = document.getElementById("scriptMonsterOptions");
    select.innerHTML = "";

    if (monsterArea === "fields") {
        addOptions(select, ["chicken", "rat", "bee", "chickenGroup"]);
    } else if (monsterArea === "forests") {
        addOptions(select, ["snake", "ent", "thief"]);
    } else if (monsterArea === "caves") {
        addOptions(select, ["bear", "bat", "skeleton"]);
    } else if (monsterArea === "volcano") {
        addOptions(select, ["lavaSnake", "fireHawk", "fireMage", "fireHawkGroup"]);
    } else if (monsterArea === "northernFields") {
        addOptions(select, ["iceHawk", "frozenEnt", "golem", "iceHawkGroup"]);
    } else if (monsterArea === "hauntedMansion") {
        addOptions(select, ["ghost", "skeletonGhost", "reaper"]);
    } else if (monsterArea === "desert") {
        addOptions(select, ["desertLizard2", "scorpion", "lizard"]);
    } else if (monsterArea === "ocean") {
        addOptions(select, ["squid", "oceanShark", "pufferFish"]);
    } else if (monsterArea === "jungle") {
        addOptions(select, ["gorilla", "elephant", "tribe"]);
    } else if (monsterArea === "dungeonEntrance") {
        addOptions(select, ["gargoyle", "poisonTribe", "statue"]);
    } else if (monsterArea === "dungeon") {
        addOptions(select, ["skeletonMonks", "darkMage", "skeletonPrisoner"]);
    } else if (monsterArea === "castle") {
        addOptions(select, ["castleKnight", "dragon", "castleMage"]);
    } else if (monsterArea === "cemetery") {
        addOptions(select, ["angel", "zombie", "babySkeleton"]);
    } else if (monsterArea === "factory") {
        addOptions(select, ["robotArcher", "robotMage", "robotWheelie"]);
    } else if (monsterArea === "hauntedWoods") {
        addOptions(select, ["reaper2", "skeletonGhost2", "ghostPack"]);
    } else if (monsterArea === "deepOcean") {
        addOptions(select, ["poisonSquid", "tridentSoldier", "piranhas"]);
    }
}

window.monsterOptions2 = monsterOptions

function addOptions(select, optionsArray) {
    for (var i = 0; i < optionsArray.length; i++) {
        var option = document.createElement("option");
        var optionText = optionsArray[i].replace(/([A-Z0-9])/g, ' $1').trim();
        option.value = optionsArray[i];
        option.text = optionText.charAt(0).toUpperCase() + optionText.slice(1);
        select.appendChild(option);
    }
}

//Chat
const chatSend = () => {
        var input = document.getElementById('message-body');
        publishMessage(input.value);
        input.value = '';
};

window.sendChat = chatSend

const showMessage = (msg, sender) => {
        var messageContainer = document.createElement('div');
        var senderElement = document.createElement('strong');
        senderElement.innerText = sender + ": ";
        messageContainer.appendChild(senderElement);
        var message = document.createElement('span');
        message.innerText = msg;
		messageContainer.style.wordWrap = "break-word";
        messageContainer.appendChild(message);
        var messageArea = document.getElementById('messages');
        messageArea.appendChild(messageContainer);
        messageArea.scrollTop = messageArea.scrollHeight;
};

let pubnub;

const setupPubNub = () => {
        // Update this block with your publish/subscribe keys
        pubnub = new PubNub({
            publishKey : "pub-c-dc687e48-701e-473a-bbce-091329dcb723",
            subscribeKey : "sub-c-feab3982-e3f8-4dec-ad9c-a82105f20783",
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
            },
            presence: (presenceEvent) => {
                // handle presence
            }
        };
        pubnub.addListener(listener);

        // subscribe to a channel
        pubnub.subscribe({
            channels: ["hello_world"]
        });
};

    // publish message
const publishMessage = async (message) => {
        // With the right payload, you can publish a message, add a reaction to a message,
        // send a push notification, or send a small payload called a signal.
        const publishPayload = {
            channel : "hello_world",
            message: {
                title: "greeting",
                description: message,
                sender: username
            }
        };
        await pubnub.publish(publishPayload);
}

window.onload = function() {
  scriptAddTabs();
  setupPubNub();
  monsterOptions(scriptArea);
  scriptStyleTabs();
  $(function() {
	$("#sortableSeeds").sortable({
		update: function(event, ui) {saveSeedOrder()}
	});
	$("#sortableSeeds").disableSelection();
	$("#sortableOres").sortable({
		update: function(event, ui) {saveOreOrder()}
	});
	$("#sortableOres").disableSelection();
	});
	loadSeedOrder();
	loadOreOrder();
	loadPotions();
	var teleportCooldown = (teleportSpellUpgraded === 1) ? 300 : 900;
	scriptWaitTeleport = (explorerCooldown > teleportCooldown + 10) ? true : false
};

function handleKeyDown2(event) {
  if (event.keyCode === 13) {
    window.sendChat();
  }
}

window.handleKeyDown = handleKeyDown2

function autoGameLoop() {
    if (toggleGlobal === true) {
        if (toggleTrain === true) autoTrain();
        if (toggleRocket === true) autoRocket();
        if (toggleSmelting === true) autoSmelt();
        if (toggleRefinary === true) autoRefine();
        if (toggleCharcoal === true) autoFoundry();
        if (toggleWoodcutting === true) autoLumber();
        if (toggleFarming === true) autoPlant();
        if (toggleDrink === true) autoDrink();
        if (toggleBrew === true) autoBrew();
        if (toggleExplore === true) autoExplore();
        if (toggleFight === true) autoFight();
		if (toggleResetFight === true) autoReset();
        if (toggleCousin === true) autoCousin();
        if (toggleBoat === true) autoBoat();
		if (toggleEvent === true) autoEvent();
    }
}

function autoGameLoopSlow() {
    if (toggleGlobal === true) {
        if (toggleGeodeOpen === true) autoGeodeOpen();
        if (toggleMineralIdentify === true) autoIdentify();
        if (toggleNecklaceCharge === true) autoNecklaceCharge();
        if (toggleBones === true) autoBones();
		if (toggleTreeUpgrade === true) autoTreeUpgrade();
		if (toggleBags === true) autoBags();
        if (toggleStatue === true) autoStatue();
        if (toggleArtifact === true) autoArtifact();
    }
}

function autoGameLoopFast() {
	if (toggleGlobal === true) {
		if (toggleSpell === true) autoSpell();
		if (toggleCombatPotion === true) autoCombatPot();
		if (toggleShiny === true || toggleMonsterFind === true) autoMonsterHunt();
	}
}

function autoGameLoopVeryFast() {
	if (toggleGlobal === true) {
		if (toggleHeal === true) autoHeal();
	}
}

const gameLoopInterval = setInterval(function(){
    autoGameLoop()
}, 5000);

const gameLoopSlowInterval = setInterval(function(){
    autoGameLoopSlow()
}, 60000);

const gameLoopFastInterval = setInterval(function(){
    autoGameLoopFast()
}, 1000);

const gameLoopVeryFastInterval = setInterval(function(){
    autoGameLoopVeryFast()
}, 250);
})();