import myPlugin from '@/global/plugins/myPlugin';

const plugins: { [key: string]: any }[] = [
  {
    myPlugin,
    name: 'myPlugin',
    options: {},
  },
];

export default plugins;
