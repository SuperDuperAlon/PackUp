const { LuPackageCheck } = require("react-icons/lu")

const colors = [
    'אדום',
    "כחול",
    "לבן",
    "אפור",
    "צהוב",
    "כתום",
    "שחור",
    "תכלת",
]

const apartments = [
    1001,
    1002,
    1003,
    1004,
    1005,
    1006,
    1007,
    1008,
    1009,
    1010,
    1011,
    1012,
    1013,
    1014,
    1015,
    1016,
    1017,
    1018,
    1019,
    1020,
]

const firstNames = [
    "אור",
    "אביב",
    "אברהם",
    "דוד",
    "דוני",
    "דון",
    "שי",
    "שלמה",
    "שלום",
    "שמעון",
    "שרון",
    "שרונה",
    "מוטי",
    "מיכאל",
    "מירי",
    "מירון",
]

const lastNames = [
    "אברהם",
    "אביב",
    "אור",
    "דוד",
    "שי",
    "שלום",
    "שרון",
    "מיכאל",
    "מירון",
    "כהן"
]

const size = [
    "קטן",
    "בינוני",
    "גדול",
]

const type = [
    'חבילה',
    'קופסא',
    'מעטפה',
    'שקית'
]

const amount = [
    1,
    2,
    3,
    4,
    5
]


export const boxes = [
    {
        idx: 0,
        icon: <LuPackageCheck />,
        name: 'חבילות',
        link: '/packages'
    },
    {
        idx: 1,
        icon: <LuPackageCheck />,
        name: 'אורחים',
        link: '/tenant/customers'
    },
    {
        idx: 2,
        icon: <LuPackageCheck />,
        name: 'רכבים',
        link: '/tenant/cars'
    },
    {
        idx: 3,
        icon: <LuPackageCheck />,
        name: 'מפתחות',
        link: '/tenant/drivers'
    },
    {
        idx: 4,
        icon: <LuPackageCheck />,
        name: 'זיהוי פנים',
        link: '/tenant/contacts'

    },
    {
        idx: 5,
        icon: <LuPackageCheck />,
        name: 'תקלות',
        link: '/tenant/problems'
    },
    {
        idx: 6,
        icon: <LuPackageCheck />,
        name: 'חדר כושר',
        link: '/tenant/rooms'
    },
    {
        idx: 7,
        icon: <LuPackageCheck />,
        name: 'הודעות',
        link: '/tenant/messages'
    },
    {
        idx: 8,
        icon: <LuPackageCheck />,
        name: 'הגדרות',
        link: '/tenant/settings'
    }
]