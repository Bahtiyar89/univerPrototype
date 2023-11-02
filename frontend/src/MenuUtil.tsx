
export const Menus: any = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard'
  },
  {
    id: 'hr',
    label: 'HR',
    href: '/hr'
  },
  {
    id: 'whouse',
    label: 'Склад',
    href: '/whouse'
  },
  {
    id: 'marketing',
    label: 'Маркетинг',
    href: '/marketing'
  },
  {
    id: 'finance',
    label: 'Финансы',
    href: '/finance'
  },
  {
    id: 'service',
    label: 'Сервис',
    href: '/service'
  },
  {
    id: 'crm',
    label: 'CRM',
    href: '/crm'
  },
  {
    id: 'documents',
    label: 'Документы',
    href: '/documents'
  },
  {
    id: 'report',
    label: 'Отчеты',
    href: '/report'
  },
  {
    id: 'reference',
    label: 'Справочники',
    href: '/reference'
  }
];

export const SubMenus: any = {
  'hr': [
    {
      id: 'employees',
      label: 'Список сотрудников',
      href: '/employees'
    },
    {
      id: 'employees-new',
      label: 'Новые добавленные',
      href: '/employees-new'
    },
    {
      id: 'employees-all',
      label: 'Список всех сотрудников',
      href: '/employees-all'
    },
    {
      id: 'structure',
      label: 'Структура',
      href: '/structure'
    }
  ],
  'whouse': [
    {
      id: 'supplies',
      label: 'Поступления',
      href: '/supplies'
    },
    {
      id: 'shipments',
      label: 'Реализации',
      href: '/shipments'
    },
    {
      id: 'move-outs',
      label: 'Отправки',
      href: '/move-outs'
    },
    {
      id: 'move-ins',
      label: 'Приемки',
      href: '/move-ins'
    },
    {
      id: 'returns',
      label: 'Возвраты',
      href: '/returns'
    },
    {
      id: 'loss',
      label: 'Списания',
      href: '/loss'
    }
  ],
  'marketing': [
    {
      id: 'contracts',
      label: 'Договоры',
      href: '/contracts'
    },
    {
      id: 'gen-contracts',
      label: 'Общие договоры',
      href: '/gen-contracts'
    },
    {
      id: 'sale-types',
      label: 'Типы продаж',
      href: '/sale-types'
    },
    {
      id: 'contracts-via-bank',
      label: 'Договоры через банк',
      href: '/contracts-via-bank'
    },
    {
      id: 'problem-contracts',
      label: 'Проблемные',
      href: '/problem-contracts'
    }
  ],
  'crm': [
    {
      id: 'calls-all',
      label: 'Все звонки',
      href: '/calls-all'
    },
    {
      id: 'calls-after-sale',
      label: 'Звонки после продажи',
      href: '/calls-after-sale'
    },
    {
      id: 'calls-after-service',
      label: 'Звонки после сервиса',
      href: '/calls-after-service'
    },
    {
      id: 'calls-for-service',
      label: 'Звонки ЗФ',
      href: '/calls-for-service'
    },
    {
      id: 'calls-for-monthly-payment',
      label: 'Звонки после взноса',
      href: '/calls-for-monthly-payment'
    },
    {
      id: "list-demonstration",
      label: "Список Демонстрации",
      href: "/list-demonstration",
    },
  ],
  'finance': [
    {
      id: 'service-payments',
      label: 'Сервис платежи',
      href: '/service-payments'
    },
    {
      id: 'cash-docs-out',
      label: 'Расходники',
      href: '/cash-docs-out'
    },
    {
      id: 'cash-moves-out',
      label: 'Отправки',
      href: '/cash-moves-out'
    },
    {
      id: 'cash-moves-in',
      label: 'Приемки',
      href: '/cash-moves-in'
    }
  ]
}
