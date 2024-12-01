import { storageService } from './storage.service';
import { utilService } from './util.service';

const API_URL = '/api/packages';
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
    exportToCSV
}

async function query(filterBy, sortBy) {
    try {
        const response = await fetch(API_URL + '?receivingTenantFullTenantDesc=' + filterBy.receivingTenantFullTenantDesc + '&sortBy=' + sortBy.sortBy + '&sortOrder=' + sortBy.sortOrder, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch packages');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching packages:', error);
        throw error;
    }
}

async function exportToCSV() {
    try {
        const response = await fetch(API_URL + `/exportToCSV`);
        if (!response.ok) {
            throw new Error("Failed to fetch CSV");
        }
        return await response.blob(); // Return the Blob for further processing
    } catch (error) {
        console.error("Error fetching CSV:", error);
        throw error; // Re-throw to handle in the component
    }
}

async function get(packageId) {
    try {
        const response = await fetch(API_URL + '/' + packageId, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the package');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching the package:', error);
        throw error;
    }
}

async function remove(packageId) {
    return storageService.remove(STORAGE_KEY, packageId)
}

async function save(p) {
    try {
        let response;
        if (p._id) {
            response = await fetch(API_URL + '/' + p._id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(p)
            });
        } else {
            response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(p)
            });
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error saving data:', error);
    }
}

// TODO: API - check package
async function checkPackage(p) {
    if (typeof window === 'undefined' || !window.localStorage) return console.log('loading')
    return storageService.put(STORAGE_KEY, p)

}

function getEmptyPackage() {
    return {
        amount: 1,
        type: '',
        color: '',
        size: '',
        notesOnArrival: '',
        receivingTenantFullTenantDesc: null

    };
}

function getFullPackageDescription(amount,
    type,
    color,
    size) {
    return `${amount} - ${type} בגודל ${size} בצבע ${color}`;
}


function getDefaultFilter() {
    return { receivingTenantFullTenantDesc: "", isCollected: null };
}

function getDefaultSort() {
    return { sortBy: '', sortOrder: -1 }
}

// function _createPackages() {
//     if (typeof window !== 'undefined') {
//         let packages = storageService.loadFromStorage(STORAGE_KEY);
//         if (!packages || !packages.length) {
//             packages = [
//                 {
//                     id: utilService.generateId(),
//                     dateReceived: Date.now(),
//                     dateCollected: null,
//                     lobbyPackReceivedBy: 'אלון',
//                     lobbyPackGivenBy: '',
//                     notesOnArrival: '',
//                     notesOnCollection: '',
//                     amount: 1,
//                     type: 'שקית',
//                     color: 'אדום',
//                     size: 'גדול',
//                     isCollected: false,
//                 },
//                 {
//                     id: utilService.generateId(),
//                     dateReceived: Date.now(),
//                     dateCollected: null,
//                     lobbyPackReceivedBy: 'אלון',
//                     lobbyPackGivenBy: '',
//                     apartmentReceiver: '1112',
//                     apartmentCollected: '',
//                     notesOnArrival: '',
//                     notesOnCollection: '',
//                     amount: 1,
//                     type: 'קרטון',
//                     color: 'ירוק',
//                     size: 'קטן',
//                     isCollected: false,
//                 },
//                 {
//                     id: utilService.generateId(),
//                     dateReceived: Date.now(),
//                     dateCollected: Date.now(),
//                     lobbyPackReceivedBy: 'אלון',
//                     lobbyPackGivenBy: 'אלון',
//                     apartmentReceiver: '1112',
//                     apartmentCollected: '3333',
//                     notesOnArrival: '',
//                     notesOnCollection: 'נמסר',
//                     amount: 3,
//                     type: 'חבילה',
//                     color: 'כתום',
//                     size: 'בינוני',
//                     isCollected: true,
//                 }
//             ];

//             for (const packageObject of packages) {
//                 packageObject.fullPackageDescription = getFullPackageDescription(packageObject.amount, packageObject.type, packageObject.color, packageObject.size);
//             }
//         }
//         storageService.saveToStorage(STORAGE_KEY, packages);
//     }
// }