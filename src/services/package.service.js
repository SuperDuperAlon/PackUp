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

function get(packageId) {
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
    else return storageService.post(STORAGE_KEY, p)
    // }
    //         else if (p.id) {
    //         return storageService.put(STORAGE_KEY, p)
    //     } else {

}

function getEmptyPackage(name = "", amount = "", type = "", color = "", size = " ", notes = "") {
    return { name: "", amount: 1, type: "", color: "", size: " ", notes: "" };
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
                    date: utilService.parseDate(),
                    lobbyReceiver: 'אלון',
                    apartmentReceiver: '1111',
                    description: 'ssss',
                    notes: 'ssss'
                },
                {
                    id: utilService.generateId(),
                    date: utilService.parseDate(),
                    lobbyReceiver: 'אלון',
                    apartmentReceiver: '1029',
                    description: 'ssss',
                    notes: 'ssss'
                },
                {
                    id: utilService.generateId(),
                    date: utilService.parseDate(),
                    lobbyReceiver: 'אלון',
                    apartmentReceiver: '1122',
                    description: 'ssss',
                    notes: 'ssss'
                }
            ];
        }
        storageService.saveToStorage(STORAGE_KEY, packages);
    }
}