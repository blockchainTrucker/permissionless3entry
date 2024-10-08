import { v4 as uuid } from 'uuid';

const NavbarDefaultRoutes = [
    {
        id: uuid(),
        menuitem: 'Virtual Therapist',
        link: '/virtual-therapist',
    },
    {
        id: uuid(),
        menuitem: 'Meditation',
        link: '/meditation',
    },
    {
        id: uuid(),
        menuitem: 'Journaling',
        link: '/journaling',
    },
    {
        id: uuid(),
        menuitem: 'EMDR Therepy',
        link: '/emdr-therapy',
    },
];

export default NavbarDefaultRoutes;
