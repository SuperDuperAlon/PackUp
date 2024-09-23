import { storageService } from './storage.service';
import { utilService } from './util.service';


const STORAGE_KEY = "packagesDB";
// _createPackages();

export const packageService = {
    query,
    remove,
    get,
    save,
    checkPackage,
    getDefaultFilter,
    getDefaultSort,
    getEmptyPackage,
}

async function query(filterBy, sortBy) {
    if (typeof window === 'undefined' || !window.localStorage) return
    var packages = await storageService.query(STORAGE_KEY)
    if (filterBy.receivingTenantFullTenantDesc) {
        console.log(packages);
        console.log(filterBy.receivingTenantFullTenantDesc);
        

        packages = packages.filter(p => p.receivingTenantFullTenantDesc &&p.receivingTenantFullTenantDesc.includes(filterBy.receivingTenantFullTenantDesc))
    }

    if (filterBy.idArray) {
        packages = packages.filter(obj => ids.includes(obj.id))
    }
    if (sortBy.by === 'dateReceived') {
        packages = packages.sort((a, b) => {
            if (sortBy.asc) {
                return a.dateReceived - b.dateReceived
            } else {
                return b.dateReceived - a.dateReceived
            }
        })
    }

    if (sortBy.by === 'apartmentReceiver') {
        packages = packages.sort((a, b) => {
            if (sortBy.asc) {
                return a.apartmentReceiver.localeCompare(b.apartmentReceiver)
            } else {
                return b.apartmentReceiver.localeCompare(a.apartmentReceiver)
            }
        })
    }
    if (sortBy.by === 'notesOnArrival') {
        packages = packages.sort((a, b) => {
            if (sortBy.asc) {
                return a.notesOnArrival.localeCompare(b.notesOnArrival)
            } else {
                return b.notesOnArrival.localeCompare(a.notesOnArrival)
            }
        })
    }

    if (sortBy.by === 'lobbyPackReceivedBy') {
        packages = packages.sort((a, b) => {
            if (sortBy.asc) {
                return a.lobbyPackReceivedBy.localeCompare(b.lobbyPackReceivedBy)
            } else {
                return b.lobbyPackReceivedBy.localeCompare(a.lobbyPackReceivedBy)
            }
        })
    }

    if (sortBy.by === 'fullPackageDescription') {
        packages = packages.sort((a, b) => {
            if (sortBy.asc) {
                return a.fullPackageDescription.localeCompare(b.fullPackageDescription)
            } else {
                return b.fullPackageDescription.localeCompare(a.fullPackageDescription)
            }
        })
    }
    return packages
}

async function get(packageId) {
    if (typeof window !== 'undefined') {
        return storageService.get(STORAGE_KEY, packageId)
    }
}

async function remove(packageId) {
    return storageService.remove(STORAGE_KEY, packageId)
}

async function save(p) {
    console.log(p);
    if (typeof window === 'undefined' || !window.localStorage) return console.log('loading')
    else if (p.id) {
        return storageService.put(STORAGE_KEY, p)
    }
    else return storageService.post(STORAGE_KEY, p)
}

async function checkPackage(p) {
    if (typeof window === 'undefined' || !window.localStorage) return console.log('loading')
    return storageService.put(STORAGE_KEY, p)

}


function getEmptyPackage() {
    return {
        amount: 1,
        type: '',
        color: '',
        size: ''
    };
}

function getFullPackageDescription(amount,
    type,
    color,
    size) {
    return `${amount} - ${type} בגודל ${size} בצבע ${color}`;
}

function getDefaultFilter() {
    return { receivingTenantFullTenantDesc: "" };
}

function getDefaultSort() {
    return { by: '', asc: true }
}

function _createPackages() {
    if (typeof window !== 'undefined') {
        let packages = storageService.loadFromStorage(STORAGE_KEY);
        if (!packages || !packages.length) {
            packages = [
                {
                    id: utilService.generateId(),
                    dateReceived: Date.now(),
                    dateCollected: null,
                    lobbyPackReceivedBy: 'אלון',
                    lobbyPackGivenBy: '',
                    notesOnArrival: '',
                    notesOnCollection: '',
                    amount: 1,
                    type: 'שקית',
                    color: 'אדום',
                    size: 'גדול',
                    isCollected: false,
                },
                {
                    id: utilService.generateId(),
                    dateReceived: Date.now(),
                    dateCollected: null,
                    lobbyPackReceivedBy: 'אלון',
                    lobbyPackGivenBy: '',
                    apartmentReceiver: '1112',
                    apartmentCollected: '',
                    notesOnArrival: '',
                    notesOnCollection: '',
                    amount: 1,
                    type: 'קרטון',
                    color: 'ירוק',
                    size: 'קטן',
                    isCollected: false,
                },
                {
                    id: utilService.generateId(),
                    dateReceived: Date.now(),
                    dateCollected: Date.now(),
                    lobbyPackReceivedBy: 'אלון',
                    lobbyPackGivenBy: 'אלון',
                    apartmentReceiver: '1112',
                    apartmentCollected: '3333',
                    notesOnArrival: '',
                    notesOnCollection: 'נמסר',
                    amount: 3,
                    type: 'חבילה',
                    color: 'כתום',
                    size: 'בינוני',
                    isCollected: true,
                }
            ];

            for (const packageObject of packages) {
                packageObject.fullPackageDescription = getFullPackageDescription(packageObject.amount, packageObject.type, packageObject.color, packageObject.size);
            }
        }
        storageService.saveToStorage(STORAGE_KEY, packages);
    }
}