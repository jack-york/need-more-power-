var RepeatSlots = {
    1: "Capasitor",
    2: "Battery",
    3: "Power Per Tick",
    4: "",
    5: "",
    6: "",
    7: "",
}

var OneTimeSlots = {
    1: "Buy Workers Tab",
    2: "Worker Discount Level 1",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
}

var OneTimeUpgradesCompleat = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
}

var OneTimeUpgradesNotCompleat = {
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
}

var SlotsDtat = {
    OneTimeSlotsFilled: 2,
    RepeatSlotsFilled: 3,
}

function addTooEnd(id, slots) {
    switch (slots) {
        case "RepeatSlots":
            RepeatSlots[SlotsDtat.RepeatSlotsFilled + 1] = id
            SlotsDtat.RepeatSlotsFilled += 1
            break;
        case "OneTimeSlots":
            OneTimeSlots[SlotsDtat.OneTimeSlotsFilled + 1] = id
            SlotsDtat.OneTimeSlotsFilled += 1
            break;
        default:

    }
}

function removeSlot(id, slots) {
    var foundID = 0
    switch (slots) {
        case "RepeatSlots":
            for (i = 1; i <= SlotsDtat.RepeatSlotsFilled; i++) {
                if (foundID == 1) {
                    RepeatSlots[i - 1] = RepeatSlots[i]
                    RepeatSlots[i] = ""
                }
                if (RepeatSlots[i] == id) {
                    RepeatSlots[i] = ""
                    foundID = 1
                }
            }
            SlotsDtat.RepeatSlotsFilled -= 1
            break;
        case "OneTimeSlots":
            for (i = 1; i <= SlotsDtat.OneTimeSlotsFilled; i++) {
                if (foundID == 1) {
                    OneTimeSlots[i - 1] = OneTimeSlots[i]
                    OneTimeSlots[i] = ""
                }
                if (OneTimeSlots[i] == id) {
                    OneTimeSlots[i] = ""
                    foundID = 1
                }
            }
            SlotsDtat.OneTimeSlotsFilled -= 1
            break;
        default:

    }
}

function displayCompleatUpgrades() {

}

function slotToFunction(slot, name) {
    switch (slot) {
        case "repeat":
            switch (name) {
                case "Capasitor":
                    buyCapasitor()
                    break;
                case "Battery":
                    buyBattery()
                    break;
                case "Power Per Tick":
                    buyPowerPerTick()
                    break;
                case "Worker Speed":
                    buyWorkerSpeed()
                    break;
                default:

            }
            break;
        case "one_time":
            switch (name) {
                case "Buy Workers Tab":
                    buyWorkersTab()
                    break;
                case "Worker Discount Level 1":
                    buyWorkerDiscount(1)
                    break;
                case "Worker Discount Level 2":
                    buyWorkerDiscount(2)
                    break;
                case "Worker Discount Level 3":
                    buyWorkerDiscount(3)
                    break;
                case "Worker Discount Level 4":
                    buyWorkerDiscount(4)
                    break;
                default:

            }
            break;
        default:

    }
}

function buyWorkersTab() {
    if (PowerData.currentPower >= 200) {
        PowerData.currentPower -= 200
        TabData.workersTabAccess = 1
        document.getElementById("tab_button_3").src = "Assets/Button_Tabs_Center_workers.png"
        removeSlot("Buy Workers Tab", "OneTimeSlots")
        addTooEnd("Worker Speed", "RepeatSlots")
        updateText("Upgrades")
    }
}

function buyCapasitor() {
    if (PowerData.currentPower >= PowerStorageData.capasitorCost) {
        PowerStorageData.capasitors += 1
        PowerData.currentPower -= PowerStorageData.capasitorCost
        PowerStorageData.capasitorCost *= 1.5
        updatePowerStorage()
        updateText("Power")
        updateText("Upgrades")
    }
}

function buyBattery() {
    if (PowerData.currentPower >= PowerStorageData.batteryCost) {
        PowerStorageData.batteries += 1
        PowerData.currentPower -= PowerStorageData.batteryCost
        PowerStorageData.batteryCost *= 1.5
        updatePowerStorage()
        updateText("Power")
        updateText("Upgrades")
    }
}

function buyPowerPerTick() {
    if (PowerData.currentPower >= PowerData.powerPerTickCost) {
        PowerData.currentPower -= PowerData.powerPerTickCost
        TurbineData.turbineSpinForce += 10
        PowerData.powerPerTickCost *= 1.25
        PowerData.powerPerTick += 1
        updateText("Power")
        updateText("Upgrades")
    }
}

function buyWorkerSpeed() {
    if (PowerData.currentPower >= WorkerStatusData.workerSpeedCost) {
        PowerData.currentPower -= WorkerStatusData.workerSpeedCost
        JobEfficiencyData.energyWorkerEfficiency *= 2
        JobEfficiencyData.woodWorkerEfficiency *= 2
        JobEfficiencyData.sandWorkerEfficiency *= 2
        JobEfficiencyData.glassWorkerEfficiency *= 2
        JobEfficiencyData.ironWorkerEfficiency *= 2
        JobEfficiencyData.coalWorkerEfficiency *= 2
        JobEfficiencyData.steelWorkerEfficiency *= 2
        JobEfficiencyData.oilWorkerEfficiency *= 2
        JobEfficiencyData.plasticWorkerEfficiency *= 2
        WorkerStatusData.workerSpeedCost *= 5
        updateText("workers")
        updateText("Upgrades")
    }
}

function buyWorkerDiscount(level) {
    switch (level) {
        case 1:
            if (PowerData.currentPower >= WorkerStatusData.workerDiscountCost[0] && WorkerStatusData.workerDiscountLevel[0] == 0) {
                PowerData.currentPower -= WorkerStatusData.workerDiscountCost[0]
                costRecalculation("workers", -10)
                addTooEnd("Worker Discount Level 2", "OneTimeSlots")
                removeSlot("Worker Discount Level 1", "OneTimeSlots")
            }
            break;
        case 2:
            if (PowerData.currentPower >= WorkerStatusData.workerDiscountCost[1] && WorkerStatusData.workerDiscountLevel[1] == 0) {
                PowerData.currentPower -= WorkerStatusData.workerDiscountCost[1]
                costRecalculation("workers", -10)
                addTooEnd("Worker Discount Level 3", "OneTimeSlots")
                removeSlot("Worker Discount Level 2", "OneTimeSlots")
            }
            break;
        case 3:
            if (PowerData.currentPower >= WorkerStatusData.workerDiscountCost[2] && WorkerStatusData.workerDiscountLevel[2] == 0) {
                PowerData.currentPower -= WorkerStatusData.workerDiscountCost[2]
                costRecalculation("workers", -10)
                addTooEnd("Worker Discount Level 4", "OneTimeSlots")
                removeSlot("Worker Discount Level 3", "OneTimeSlots")
            }
            break;
        case 4:
            if (PowerData.currentPower >= WorkerStatusData.workerDiscountCost[3] && WorkerStatusData.workerDiscountLevel[3] == 0) {
                PowerData.currentPower -= WorkerStatusData.workerDiscountCost[3]
                costRecalculation("workers", -10)
                removeSlot("Worker Discount Level 4", "OneTimeSlots")
            }
            break;
        default:

    }
    updateText("Upgrades")
}



function updatePowerStorage() {
    PowerStorageData.totalPowerStorage = (PowerStorageData.capasitors * PowerStorageData.capasitorsStorage) + (PowerStorageData.batteries * PowerStorageData.batteriesStorage)
}

function costRecalculation(item, change) {
    switch (item) {
        case "workers":
            WorkerStatusData.costRatio -= WorkerStatusData.costRatio / (100 / -change)
            WorkerStatusData.workerCost = WorkerStatusData.workerBaseCost * Math.pow(WorkerStatusData.costRatio + 1, WorkerStatusData.workers)
            updateText("Workers")
            break;
        default:

    }
}
