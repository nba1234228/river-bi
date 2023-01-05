import { App } from 'vue';
import {
  Button,
  //   Typography,
  Divider,
  //   Grid,
  //   Layout,
  Space,
  //   Affix,
  Breadcrumb,
  Dropdown,
  Menu,
  PageHeader,
  Pagination,
  Steps,
  AutoComplete,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  //   Mentions,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TimePicker,
  //   Transfer,
  //   TreeSelect,
  //   Upload,
  Avatar,
  Badge,
  Calendar,
  Card,
  //   Carousel,
  Collapse,
  Comment,
  Descriptions,
  Empty,
  Image,
  List,
  Popover,
  Statistic,
  Table,
  Tabs,
  Tag,
  // Timeline,
  Tooltip,
  Tree,
  Alert,
  Drawer,
  Modal,
  Popconfirm,
  // Progress,
  // Result,
  //   Skeleton,
  Spin,
  Anchor,
  BackTop,
  ConfigProvider,
} from 'ant-design-vue';

// 因为按需加载不支持动态主题切换，所以使用 全局部分注册 方式
const registerAntdComp = (app: App) =>
  app
    .use(Button)
    // .use(Typography)
    .use(Divider)
    //   .use(Grid)
    //   .use(Layout)
    .use(Space)
    //   .use(Affix)
    .use(Breadcrumb)
    .use(Dropdown)
    .use(Menu)
    .use(PageHeader)
    .use(Pagination)
    .use(Steps)
    .use(AutoComplete)
    .use(Cascader)
    .use(Checkbox)
    .use(DatePicker)
    .use(Form)
    .use(Input)
    .use(InputNumber)
    //   .use(Mentions)
    .use(Radio)
    .use(Rate)
    .use(Select)
    .use(Slider)
    .use(Switch)
    .use(TimePicker)
    //   .use(Transfer)
    //   .use(TreeSelect)
    //   .use(Upload)
    .use(Avatar)
    .use(Badge)
    .use(Calendar)
    .use(Card)
    //   .use(Carousel)
    .use(Collapse)
    .use(Comment)
    .use(Descriptions)
    .use(Empty)
    .use(Image)
    .use(List)
    .use(Popover)
    .use(Statistic)
    .use(Table)
    .use(Tabs)
    .use(Tag)
    // .use(Timeline)
    .use(Tooltip)
    .use(Tree)
    .use(Alert)
    .use(Drawer)
    .use(Modal)
    .use(Popconfirm)
    // .use(Progress)
    // .use(Result)
    //   .use(Skeleton)
    .use(Spin)
    .use(Anchor)
    .use(BackTop)
    .use(ConfigProvider);

export default registerAntdComp;
