import { storageService } from './storage.service';
import { utilService } from './util.service';


const STORAGE_KEY = "packagesDB";
_createPackages();

export const packageService = {
    query,
    remove,
    get,
    save,
    getDefaultFilter,
    getEmptyPackage,
}

async function query() {
    if (typeof window === 'undefined' || !window.localStorage) return console.log('loading')
    else return storageService.loadFromStorage(STORAGE_KEY)
}

async function get(packageId) {
    if (typeof window !== 'undefined') {
        return storageService.get(STORAGE_KEY, packageId)
    }
}

function remove(packageId) {
    return storageService.remove(STORAGE_KEY, packageId)
}

function save(p) {
    console.log(p);
    if (typeof window === 'undefined' || !window.localStorage) return console.log('loading')
    else if (p.id) {
        return storageService.put(STORAGE_KEY, p)
    }
    else return storageService.post(STORAGE_KEY, p)
}

function getEmptyPackage() {
    return {
        lobbyPackReceivedBy: '',
        lobbyPackGivenBy: '',
        apartmentReceiver: '',
        apartmentCollected: '',
        notesOnArrival: '',
        notesOnCollection: '',
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
    return { txt: "", maxPrice: "" };
}

function _createPackages() {
    if (typeof window !== 'undefined') {
        let packages = storageService.loadFromStorage(STORAGE_KEY);
        if (!packages || !packages.length) {
            packages = [
                {
                    id: utilService.generateId(),
                    dateReceived: utilService.parseDate(),
                    dateCollected: null,
                    lobbyPackReceivedBy: 'אלון',
                    lobbyPackGivenBy: '',
                    apartmentReceiver: '1111',
                    apartmentCollected: '',
                    notesOnArrival: '',
                    notesOnCollection: '',
                    amount: 1,
                    type: 'שקית',
                    color: 'אדום',
                    size: 'גדול',
                    isCollected: false,
                    isChecked: false
                },
                {
                    id: utilService.generateId(),
                    dateReceived: utilService.parseDate(),
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
                    isChecked: false
                },
                {
                    id: utilService.generateId(),
                    dateReceived: utilService.parseDate(),
                    dateCollected: null,
                    lobbyPackReceivedBy: 'אלון',
                    lobbyPackGivenBy: '',
                    apartmentReceiver: '1112',
                    apartmentCollected: '',
                    notesOnArrival: '',
                    notesOnCollection: '',
                    amount: 3,
                    type: 'חבילה',
                    color: 'כתום',
                    size: 'בינוני',
                    isCollected: true,
                    isChecked: false
                }
            ];

            for (const packageObject of packages) {
                packageObject.fullPackageDescription = getFullPackageDescription(packageObject.amount, packageObject.type, packageObject.color, packageObject.size);
            }
        }
        storageService.saveToStorage(STORAGE_KEY, packages);
    }
}