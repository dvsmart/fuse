import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    // {
    //     id       : 'applications',
    //     title    : 'Applications',
    //     translate: 'NAV.APPLICATIONS',
    //     type     : 'group',
    //     children : [
    //         {
    //             id       : 'sample',
    //             title    : 'Sample',
    //             translate: 'NAV.SAMPLE.TITLE',
    //             type     : 'item',
    //             icon     : 'email',
    //             url      : '/sample',
    //             badge    : {
    //                 title    : '25',
    //                 translate: 'NAV.SAMPLE.BADGE',
    //                 bg       : '#F44336',
    //                 fg       : '#FFFFFF'
    //             }
    //         }
    //     ]
    // },
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'analytics',
                        title: 'Analytics',
                        type : 'item',
                        url  : '/apps/dashboards/analytics'
                    },
                    {
                        id   : 'project',
                        title: 'Project',
                        type : 'item',
                        url  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                id       : 'calendar',
                title    : 'Calendar',
                translate: 'NAV.CALENDAR',
                type     : 'item',
                icon     : 'today',
                url      : '/apps/calendar'
            },
            {
                id       : 'chat',
                title    : 'Chat',
                translate: 'NAV.CHAT',
                type     : 'item',
                icon     : 'chat',
                url      : '/apps/chat',
                badge    : {
                    title: '13',
                    bg   : '#09d261',
                    fg   : '#FFFFFF'
                }
            },
            {
                id       : 'file-manager',
                title    : 'File Manager',
                translate: 'NAV.FILE_MANAGER',
                type     : 'item',
                icon     : 'folder',
                url      : '/apps/file-manager'
            },
            {
                id       : 'to-do',
                title    : 'To-Do',
                translate: 'NAV.TODO',
                type     : 'item',
                icon     : 'check_box',
                url      : '/apps/todo',
                badge    : {
                    title: '3',
                    bg   : '#FF6F00',
                    fg   : '#FFFFFF'
                }
            }
        ]
    },
];
