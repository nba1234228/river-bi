type MenuItem = {
  key: string;
  label: string;
  icon: string;
  children?: MenuItem[];
};

export const BarMenu: MenuItem[] = [
  {
    key: 'remove',
    label: '删除',
    icon: 'icon_rb-remove',
  },
  {
    key: 'edit',
    label: '编辑',
    icon: 'icon_rb-edit',
  },
  {
    key: 'full',
    label: '全屏',
    icon: 'icon_rb-full-screen',
  },
  {
    key: 'export',
    label: '导出',
    icon: 'icon_rb-export',
    children: [
      {
        key: 'exportImage',
        label: '导出为图片',
        icon: 'icon_rb-image',
      },
      {
        key: 'exportPDF',
        label: '导出为PDF',
        icon: 'icon_rb-pdf',
      },
    ],
  },
];
