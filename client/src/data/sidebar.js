import {FaTh, FaRegChartBar, FaCommentAlt, FaUser} from 'react-icons/fa';
import {BiImageAdd} from 'react-icons/bi';
import {AiOutlineUser} from 'react-icons/ai';

const menu = [
  {
    title: 'Dashboard',
    icon: <FaTh />,
    path: '/dashboard',
  },
  {
    title: 'Add Product',
    icon: <BiImageAdd />,
    path: '/add-product',
  },
  {
    title: 'Account',
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: 'Profile',
        path: '/profile',
        icon: <FaUser />,
      },
      {
        title: 'Edit Profile',
        path: '/edit-profile',
        icon: <AiOutlineUser />,
      },
    ],
  },
  {
    title: 'Report Bug',
    icon: <FaCommentAlt />,
    path: '/contact-us',
  },
];

export default menu;
